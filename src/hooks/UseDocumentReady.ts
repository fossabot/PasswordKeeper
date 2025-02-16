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

/**
 * A custom hook to call a callback when the document is ready. E.g. the `DOMContentLoaded` fires or the `document.readyState` is "complete".
 * @param documentReadyCallback A call back to call when the document is ready.
 * @param deps Additional dependencies for the hook state.
 */
const useDocumentReady = (documentReadyCallback: (() => void) | null, deps?: React.DependencyList | undefined) => {
    React.useEffect(() => {
        if (documentReadyCallback) {
            if (document.readyState === "complete") {
                documentReadyCallback?.();
            } else {
                document.addEventListener("DOMContentLoaded", documentReadyCallback);

                return () => document.removeEventListener("DOMContentLoaded", documentReadyCallback);
            }
        }
    }, [documentReadyCallback, deps]);
};

export { useDocumentReady };
