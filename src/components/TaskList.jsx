import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { rearrangeTasks, removeTasks, updateTasks } from "../store/taskSlice";
import { Link } from "react-router-dom";
import { MdCreate, MdDelete } from "react-icons/md";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Operations from "./Operations";

const TaskList = () => {
  const { tasks ,filter} = useSelector((store) => store.tasks);
  const dispatch = useDispatch();
  const dragEnd = (result) => {
    const { source, destination } = result;
    if (!destination?.index || !source?.index) return;
    if (source.index === destination.index) return;
    dispatch(rearrangeTasks({ index1: source.index, index2: destination.index }));
  };
  
  return (
    <>
    <Operations/>
    <DragDropContext onDragEnd={dragEnd}>
      <div className="mx-auto mt-8 max-w-screen-md sm:max-w-screen-sm cursor-pointer">
        <Droppable droppableId="Task-list">
          {(provided) => (
            <ul
              className="list-disc pl-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks?.map((task, index) => (
                <Draggable
                  draggableId={task.id.toString()}
                  index={index}
                  key={task.id}
                >
                  {(provided) => (
                    <li
                      className={`flex flex-col items-center md:flex-row justify-between p-4 bg-white rounded shadow-md mb-2 bg-slate-200 transition-transform transform-gpu hover:scale-105 ${((filter==='Done' && !task.completed) || (filter==='Undone' && task.completed)) ? 'hidden':''}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="flex items-center mb-2 md:mb-0 md:mr-4">
                        <span className="mr-2 text-gray-500">{task.id}</span>
                        <img
                          src={
                            !task?.url
                              ? "https://via.placeholder.com/50"
                              : task?.url
                          }
                          alt="Task icon"
                          className="mr-2 rounded-full w-8 h-8 md:w-10 md:h-10"
                        />
                        <span
                          className={`flex-grow ${
                            task.completed ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>

                      <div className="flex items-center mt-2 md:mt-0">
                        <button
                          onClick={() => dispatch(updateTasks({ id: task.id }))}
                          className={`mr-2 py-1 px-2 rounded text-xs md:text-sm ${
                            task.completed
                              ? "bg-green-500 text-white"
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          {!task.completed ? "Done" : "Undone"}
                        </button>
                        <button
                          onClick={() => dispatch(removeTasks({ id: task.id }))}
                          className="bg-red-500 text-white py-1 px-2 rounded text-xs md:text-sm"
                        >
                          <MdDelete />
                        </button>
                        <Link
                          to={`/edit/${task.id}`}
                          className="mx-2 bg-yellow-500 text-white py-1 px-2 rounded text-xs md:text-sm"
                        >
                          <MdCreate />
                        </Link>
                      </div>
                    </li>
                    
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
    </>

  );
};

export default TaskList;
