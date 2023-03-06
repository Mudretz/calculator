import { FC } from "react";
import eye from "../icons/eye.svg";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import selector from "../icons/selector.svg";
import { statusConstructor, statusRun } from "../store/display";

type Props = {
    isValid: boolean;
};

const Switch: FC<Props> = ({ isValid }) => {
    const status = useAppSelector((state) => state.display.statusSwitch);
    const dispatch = useAppDispatch();
    const handleChange = (item: string) => {
        if (item === "Constructor" && status !== "Constructor") {
            dispatch(statusConstructor());
        };
        if (item === "Runtime" && isValid) {
            dispatch(statusRun());
        };
    };
    return (
        <div className="switch">
            <div
                className={
                    "switch-item" + (status === "Runtime" ? " active" : "")
                }
                onClick={() => handleChange("Runtime")}
                data-item={"runtime"}
            >
                <img src={eye} alt="Картинка" />
                <p>Runtime</p>
            </div>
            <div
                className={
                    "switch-item" + (status === "Constructor" ? " active" : "")
                }
                onClick={() => handleChange("Constructor")}
                data-item={"constuctor"}
            >
                <img src={selector} alt="Картинка" />
                <p>Constructor</p>
            </div>
        </div>
    );
};

export default Switch;
