/*
MIT License

Copyright (c) 2023 Petteri Kautonen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import * as React from "react";
import { styled } from "styled-components";
import classNames from "classnames";
import { ScrollView, TabPanel, TextArea } from "devextreme-react";
import dxTextArea, { InitializedEvent, ValueChangedEvent } from "devextreme/ui/text_area";
import { Item as TabItem } from "devextreme-react/tab-panel";
import { CommonProps } from "../Types";
import { useLocalize } from "../../i18n";
import { usePasteImageMarkdown } from "../../hooks/UsePasteImageMarkdown";
import { useDocumentReady } from "../../hooks/UseDocumentReady";
import { MarkDownViewStyled } from "./MarkDownView";

/**
 * The props for the {@link MarkdownTextEditor} component.
 */
type MarkdownTextEditorProps = {
    /** The markdown text value. */
    markDown: string | undefined;
    /** A value indicating whether to use monospaced font in the markdown editor. */
    monospacedFont?: boolean;
    /** A value indicating whether the Markdown image pasting is enabled. **Disable if clipboard is being listened elsewhere.** */
    imagePasteEnabled: boolean;
    /** A callback to store the changed markdown value. */
    setMarkDown: (value: string | undefined) => void;
} & CommonProps;

/**
 * A tabbed component for markdown editing and previewing.
 * @param param0 The component props: {@link MarkdownTextEditorProps}.
 * @returns A component.
 */
const MarkdownTextEditor = ({
    className, //
    markDown,
    monospacedFont,
    imagePasteEnabled,
    setMarkDown,
}: MarkdownTextEditorProps) => {
    const le = useLocalize("entries");
    const textAreaRef = React.useRef<dxTextArea>();
    const [textAreaElement, setTextAreaElement] = React.useState<HTMLTextAreaElement | null>(null);
    const [initialized, setInitialized] = React.useState(false);

    usePasteImageMarkdown(textAreaElement, imagePasteEnabled);

    const onValueChanged = React.useCallback(
        (e: ValueChangedEvent) => {
            setMarkDown(e.value);
        },
        [setMarkDown]
    );

    const textAreaInitialized = React.useCallback((e: InitializedEvent) => {
        setInitialized(true);
        textAreaRef.current = e.component;
    }, []);

    const getTextAreaElement = React.useCallback(() => {
        const elem = (textAreaRef.current?.element().querySelectorAll(".dx-texteditor-input")[0] ?? null) as HTMLTextAreaElement | null;
        if (elem) {
            setTextAreaElement(elem);
        }
    }, []);

    useDocumentReady(getTextAreaElement, [initialized]);

    return (
        <TabPanel //
            className={classNames(MarkdownTextEditor.name, className)}
        >
            <TabItem //
                title={le("entryNotesEdit")}
            >
                <TextArea //
                    className="Editor-textArea"
                    readOnly={false}
                    value={markDown}
                    onValueChanged={onValueChanged}
                    onInitialized={textAreaInitialized}
                />
            </TabItem>
            <TabItem //
                title={le("entryNotesPreview")}
            >
                <ScrollView>
                    <MarkDownViewStyled //
                        markDown={markDown}
                        monospacedFont={monospacedFont}
                    />
                </ScrollView>
            </TabItem>
        </TabPanel>
    );
};

const MarkdownTextEditorStyled = styled(MarkdownTextEditor)`
    .Editor-textArea {
        font-family: ${props => (props.monospacedFont === true ? "monospace" : "system-ui")};
        height: 100%;
    }
`;

export { MarkdownTextEditorStyled };
