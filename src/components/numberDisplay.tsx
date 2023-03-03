import { FC, MouseEvent } from "react";
import { useDrag } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { addItemDisplay, addItemSecondValue } from "../store/display";
import { Props } from "../types/types";

const numberDisplayItem = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","];

const NumberDisplay: FC<Props> = ({ id, board }) => {
    const boardList = useAppSelector(state => state.componentList.entities);
    const status = useAppSelector(state => state.display.statusSwitch);
    const isFind = boardList.find((item) => item.id === id);
    const dispatch = useAppDispatch();
    const displayValue = useAppSelector(state => state.display.entities);
    const displaySecondValue = useAppSelector(state => state.display.secondEntities);
    const displayDash = useAppSelector(state => state.display.dash);
    const [{isDragging}, drag] = useDrag(() => ({
        type: "image",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    const handleClick = (item: string) => {
        if (displayDash) {
            if (displaySecondValue.indexOf(",") !== -1 && item === ",") {
            } else if (!displaySecondValue && item === ",")
            { } else {
                dispatch(addItemSecondValue(item));
            }
        } else if (displayValue.indexOf(",") !== -1 && item === ",") {

        } else if (!displayValue && item === ",") {

        } else {
            dispatch(addItemDisplay(item));
        }
    }
    const handleMouseUp = (item: string) => (event: MouseEvent) => {
        if (event.target instanceof Element) {
            if (event.target.textContent === item) {
                event.target.classList.remove("mouseDown")
            }
        }
    }

    const handleMouseDown = (item: string) => (event: MouseEvent) => {
        if (event.target instanceof Element) {
            if (event.target.textContent === item) {
                event.target.classList.add("mouseDown")
            }
        }
    }
    if (status === "Runtime") {
        return (
            <div className={"number-display" + (isFind && !board ? " unactive-calculator" : "")} ref={isFind && !board ? null : drag}>
                {numberDisplayItem.map((item) => (
                    <div
                        className={"number-display-item runtime-number" + (item === "0" ? " item-zero" : "")}
                        key={item}
                        onClick={() => handleClick(item)}
                        onMouseDown={handleMouseDown(item)}
                        onMouseUp={handleMouseUp(item)}
                    >
                        {item}
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div className={"number-display" + (isFind && !board ? " unactive-calculator" : "")} ref={isFind && !board ? null : drag}>
                {numberDisplayItem.map((item) => (
                    <div
                        className={"number-display-item" + (item === "0" ? " item-zero" : "")}
                        key={item}
                    >
                        {item}
                    </div>
                ))}
            </div>
        );
    }
}
 
export default NumberDisplay;