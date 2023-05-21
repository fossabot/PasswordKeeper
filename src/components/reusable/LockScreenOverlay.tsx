import * as React from "react";
import classNames from "classnames";
import styled from "styled-components";

type Props = {
    className?: string;
    lockText?: string;
    fontWeight?: string;
    backgroundOpacity?: number;
    backgroundColor?: string;
    foreColor?: string;
    foreOpacity?: number;
    fontSize?: string;
    visible: boolean;
    onClick?: () => void;
};

const LockScreenOverlay = ({
    //
    className,
    lockText,
    visible,
    onClick,
}: Props) => {
    if (!visible) {
        return null;
    }

    return (
        <div //
            onClick={onClick}
            className={classNames(LockScreenOverlay.name, className)}
        >
            {lockText}
        </div>
    );
};

// Code derived from: https://css-tricks.com/converting-color-spaces-in-javascript/
const hexOpacityToRgba = (color: string, opacity: number) => {
    let r = "0x",
        g = "0x",
        b = "0x";

    color = color.slice(1); // Remove the starting #-character.

    if (color.length === 6) {
        r += color.slice(0, 2);
        g += color.slice(2, 4);
        b += color.slice(4, 6);
    } else if (color.length === 3) {
        r += color.slice(0, 1);
        g += color.slice(1, 2);
        b += color.slice(2, 3);
    }

    return `rgba(${Number.parseInt(r, 16)},${Number.parseInt(g, 16)},${Number.parseInt(b, 16)},${opacity})`;
};

export default styled(LockScreenOverlay)`
    // CSS Styling derived from: https://medium.com/before-semicolon/how-to-create-custom-modal-dialog-in-react-108b83e5a501
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: ${props => hexOpacityToRgba(props.backgroundColor ?? "#000000", props.backgroundOpacity ?? 0.5)};
    color: ${props => hexOpacityToRgba(props.foreColor ?? "#FFFFFF", props.foreOpacity ?? 1)};
    display: flex;
    align-content: center;
    font-weight: ${props => props.fontWeight ?? "normal"};
    font-size: ${props => props.fontSize ?? "xx-large"};
    justify-content: center;
    flex-wrap: wrap;
`;
