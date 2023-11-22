import React, { useState } from 'react';
import { addTasks } from '../store/taskSlice';
import { useDispatch, useSelector } from 'react-redux';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [image,setImage]=useState('')
  const { tasks } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTasks([{ id: tasks.length + 1, title, completed: false,url:image }]));
      setTitle('');
      setImage('')
    }
  };
  const handleChange=(e)=>{
    setImage(URL.createObjectURL(e.target.files[0]))
  }
  console.log(image)
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 rounded-lg bg-gray-100">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Upload an image:
        </label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="border rounded p-2 w-full"
          onChange={handleChange}
        />
        <img src={image} alt='show-img'/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Enter a title:
        </label>
        <input
          type="text"
          placeholder="Add a new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="appearance-none bg-transparent border-none w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none border-b-2 border-teal-500"
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
