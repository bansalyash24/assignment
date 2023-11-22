import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editTasks } from "../store/taskSlice";

const EditTask = () => {
  const { id } = useParams();
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { tasks } = useSelector((store) => store.tasks);
  const [task, setTask] = useState({
    id: null,
    title: null,
    completed: null,
    url:null
  });

  useEffect(() => {
    let selectedTask = tasks.find((task) => task.id == id);
    setTask(selectedTask || { id: null, title: null, completed: null });
  }, [tasks, id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(editTasks(task));
  };

  const handleChange=(e)=>{
    setTask({...task,url:URL.createObjectURL(e.target.files[0])})
    navigate('/')
  }
  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      <form>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Change image:
        </label>
        <img src={task?.url ? task?.url : "https://via.placeholder.com/50"} alt="image"/>
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="border rounded p-2 w-full"
          onChange={handleChange}
        />
      </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Task Title:
          </label>
          <input
            type="text"
            value={task?.title || ""}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Task Status:
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task?.completed}
              onChange={(e) =>
                setTask({ ...task, completed: !task?.completed })
              }
              className="mr-2"
            />
            <span>{task?.completed ? "Done" : "Not done"}</span>
          </div>
        </div>

        <button
          type="submit"
          onClick={handleUpdate}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask