import { FC } from "react";
import { useDrag } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { doResult } from "../store/display";
import { Props } from "../types/types";

const ButtonEquall: FC<Props> = ({ id, board }) => {
    const dispatch = useAppDispatch();
    const displayValue = useAppSelector(state => state.display.entities);
    const displaySecondValue = useAppSelector(state => state.display.secondEntities);
    const boardList = useAppSelector(state => state.componentList.entities);
    const isFind = boardList.find((item) => item.id === id);
    const status = useAppSelector(state => state.display.statusSwitch);
    const [{isDragging}, drag] = useDrag(() => ({
        type: "image",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))
    const dash = useAppSelector(state => state.display.dash);
    const handleClick = () => {
        if (displayValue && displaySecondValue) {
            dispatch(doResult(dash));
        }
    };
    if (status === "Runtime") {
        return (
            <div 
                className={"button-equall"+ (isFind && !board ? " unactive-calculator" : "")}
                ref={isFind && !board ? null : drag}
                onClick={handleClick}
            >
                <div className="button-equall-item runtime-button-equall">
                    =
                </div>
            </div>
        );
    } else {
        return (
            <div 
                className={"button-equall"+ (isFind && !board ? " unactive-calculator" : "")}
                ref={isFind && !board ? null : drag}
            >
                <div className="button-equall-item">
                    =
                </div>
            </div>
        );
    }
}
 
export default ButtonEquall;