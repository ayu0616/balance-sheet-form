import { CSSProperties } from "react";
import CheckAdded from "./CheckAdded";
import CurrentAmount from "./CurrentAmount";

export const SubContent = (props: { containerCss: CSSProperties }) => {
    return (
        <div id="added-container" className="mx-auto px-3 w-100 overflow-auto" style={props.containerCss}>
            <CurrentAmount />
            <CheckAdded />
        </div>
    );
};
