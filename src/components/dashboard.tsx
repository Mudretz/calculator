import { FC, MouseEvent } from "react";
import { useDrag } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { addItemDash } from "../store/display";
import { Props } from "../types/types";

const dashboardItem = ["/", "x", "-", "+"];

const Dashboard: FC<Props> = ({ id, board }) => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.display.statusSwitch);
    const boardList = useAppSelector((state) => state.componentList.entities);
    const isFind = boardList.find((item) => item.id === id);
    
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "components",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    const handleClick = (item: string) => {
        dispatch(addItemDash(item));
    };

    const handleMouseUp = (item: string) => (event: MouseEvent) => {
        if (event.target instanceof Element) {
            if (event.target.textContent === item) {
                event.target.classList.remove("mouseDown");
            };
        };
    };

    const handleMouseDown = (item: string) => (event: MouseEvent) => {
        if (event.target instanceof Element) {
            if (event.target.textContent === item) {
                event.target.classList.add("mouseDown");
            };
        };
    };

    if (status === "Runtime") {
        return (
            <div
                className={
                    "dashboard" +
                    (isFind && !board ? " unactive-calculator" : "")
                }
                ref={isFind && !board ? null : drag}
            >
                {dashboardItem.map((item) => (
                    <div
                        className="dashboard-item runtime-dashboard"
                        onClick={() => handleClick(item)}
                        onMouseDown={handleMouseDown(item)}
                        onMouseUp={handleMouseUp(item)}
                        key={item}
                    >
                        {item}
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div
                className={
                    "dashboard" +
                    (isFind && !board ? " unactive-calculator" : "")
                }
                ref={isFind && !board ? null : drag}
            >
                {dashboardItem.map((item) => (
                    <div className="dashboard-item" key={item}>
                        {item}
                    </div>
                ))}
            </div>
        );
    };
};

export default Dashboard;
