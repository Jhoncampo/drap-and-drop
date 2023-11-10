import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import React, { useEffect, useState } from "react";

const initialTodos = JSON.parse(localStorage.getItem("todo")) || [
    { id: 1, text: "Aprender React" },
    { id: 2, text: "Aprender Js" },
    { id: 3, text: "Aprender Next" },
    { id: 4, text: "Aprender Node" },
];
const App = () => {
    const [todos, setTodos] = useState(initialTodos);
    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todos));
        console.log("prueba")
    }, [todos]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const startIndex = result.source.index;
        const endIndex = result.destination.index;

        const copyArray = [...todos];
        const [reorderedItem] = copyArray.splice(startIndex, 1);
        copyArray.splice(endIndex, 0, reorderedItem);
        setTodos(copyArray)
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h1>Todo app</h1>
            <Droppable droppableId="todos">
                {(dropppableProvider) => (
                    <ul
                        ref={dropppableProvider.innerRef}
                        {...dropppableProvider.droppableProps}
                    >
                        {todos.map((todo, index) => (
                            <Draggable
                                index={index}
                                key={todo.id}
                                draggableId={`${todo.id}`}
                            >
                                {(draggableProvider) => (
                                    <li
                                        ref={draggableProvider.innerRef}
                                        {...draggableProvider.dragHandleProps}
                                        {...draggableProvider.draggableProps}
                                    >
                                        {todo.text}
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {dropppableProvider.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default App;
