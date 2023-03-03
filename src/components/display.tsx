import { FC } from "react";
import { useDrag } from "react-dnd";
import { useAppSelector } from "../hooks/hook";
import { Props } from "../types/types";

const Display: FC<Props> = ({ id, board }) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: "image",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))
    const boardList = useAppSelector(state => state.componentList.entities);
    const isFind = boardList.find((item) => item.id === id);
    const displayValue = useAppSelector(state => state.display.entities);
    const displayDash = useAppSelector(state => state.display.dash);
    const displaySecondValue = useAppSelector(state => state.display.secondEntities);
    const result = useAppSelector(state => state.display.result);
    return (
        <div className={"display"+ (isFind && !board ? " unactive-calculator" : "")} ref={isFind && !board ? null : drag}>
            <div className="display-text-field">
                {!result ? (displayDash ? `${displayDash} ${displaySecondValue}` : displayValue) : result}
            </div>
        </div>
    );
}
 
export default Display;