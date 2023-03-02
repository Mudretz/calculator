import { FC } from "react";
import icon from "./icon.svg"
import eye from "./eye.svg"
import selector from "./selector.svg"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

const App: FC = () => {
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index)
            return;
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="main">
                <div className="container">
                    <div className="switch">
                        <div className="switch-item">
                            <img src={eye} alt="Картинка" />
                            <p>Runtime</p>
                        </div>
                        <div className="switch-item unactive">
                            <img src={selector} alt="Картинка" /> 
                            Constructor
                        </div>
                    </div>
                    <Droppable droppableId="list">
                        {(provided) => (
                            <div className="calculator" ref={provided.innerRef} {...provided.droppableProps}>
                                <Draggable draggableId="display" index={0}>
                                    {(provided) => (
                                        <div className="display" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                            <div className="display-text-field">0</div>
                                        </div>
                                    )}
                                </Draggable>
                                <Draggable draggableId="dashboard" index={1}>
                                    {(provided) => (
                                        <div className="dashboard" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                            <div className="dashboard-item">/</div>
                                            <div className="dashboard-item">x</div>
                                            <div className="dashboard-item">-</div>
                                            <div className="dashboard-item">+</div>
                                        </div>
                                    )}
                                </Draggable>
                                <Draggable draggableId="number-display" index={2}>
                                    {(provided) => (
                                        <div className="number-display" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                            <div className="number-display-item">7</div>
                                            <div className="number-display-item">8</div>
                                            <div className="number-display-item">9</div>
                                            <div className="number-display-item">4</div>
                                            <div className="number-display-item">5</div>
                                            <div className="number-display-item">6</div>
                                            <div className="number-display-item">1</div>
                                            <div className="number-display-item">2</div>
                                            <div className="number-display-item">3</div>
                                            <div className="number-display-item item-zero">0</div>
                                            <div className="number-display-item">,</div>
                                        </div>
                                    )}
                                </Draggable>
                                <Draggable draggableId="button-equall" index={3}>
                                    {(provided) => (
                                        <div className="button-equall" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                            <div className="button-equall-item">
                                                =
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="list-drop">
                        {(provided) => (
                            <div className="palette" ref={provided.innerRef} {...provided.droppableProps}>
                                <div className="palette-item">
                                    <img src={icon} alt="Картинка" />
                                    <p className="palette-text">Перетащите сюда</p>
                                    <p>Любой элемент <br/> из левой панели</p>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    );
};

export default App;
