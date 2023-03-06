import { FC, useState } from "react";
import icon from "./icons/icon.svg";
import { useDrop } from "react-dnd";
import { Drop } from "./types/types";
import { useAppDispatch, useAppSelector } from "./hooks/hook";
import { addComponent } from "./store/componentList";
import Dashboard from "./components/Dashboard";
import NumberDisplay from "./components/NumberDisplay";
import ButtonEquall from "./components/ButtonEquall";
import Switch from "./components/Switch";
import Display from "./components/Display";

const listComponents = [
    { id: 1, Components: Display },
    { id: 2, Components: Dashboard },
    { id: 3, Components: NumberDisplay },
    { id: 4, Components: ButtonEquall }
];

const App: FC = () => {
    const [board, setBoard] = useState<Drop[]>([]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "components",
        drop: (item: Drop) => addComponentsToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.display.statusSwitch);

    const addComponentsToBoard = (id: number) => {
        const componentList = listComponents.filter(
            (component) => id === component.id
        );
        setBoard((board) => {
            const isValid = board.find((component) => component.id === id);
            if (!isValid) {
                dispatch(
                    addComponent({
                        id: componentList[0].id,
                        name: componentList[0].Components.name
                    })
                );
                if (componentList[0].Components.name === "Display") {
                    return [componentList[0], ...board];
                }
                return [...board, componentList[0]];
            } else {
                return [...board];
            }
        });
    };
    const isValid = board.length > 0;

    return (
        <div className="main">
            <div className="container">
                <Switch isValid={isValid} />
                {status === "Constructor" ? (
                    <div className="calculator">
                        {listComponents.map(({ id, Components }) => (
                            <Components key={id} id={id} board={false} />
                        ))}
                    </div>
                ) : (
                    <div className="calculator"></div>
                )}
                <div
                    className={
                        (isValid ? "calculator" : "palette") +
                        (isOver && !isValid ? " active-palette" : "") +
                        (isOver && isValid ? " active-calculator" : "")
                    }
                    ref={drop}
                >
                    {isValid ? null : (
                        <div className="palette-item">
                            <img src={icon} alt="Картинка" />
                            <p className="palette-text">Перетащите сюда</p>
                            <p>
                                Любой элемент <br /> из левой панели
                            </p>
                        </div>
                    )}
                    {board.map(({ id, Components }) => (
                        <Components key={id} id={id} board={true} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
