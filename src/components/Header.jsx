import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addTasks } from '../store/taskSlice';
import TaskList from './TaskList';

export default function Header() {
  const dispatch = useDispatch();
  const initializeData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await res.json();
    dispatch(addTasks(data));
  };
  
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (load) {
      initializeData();
      setLoad(false);
    }
  }, [load]);

  return (
    <div>
      <nav className="bg-teal-500 p-4">
        <div className="container mx-auto">
          <div className="flex items-center">
            <div className="text-white">
              <Link to="/">Task List</Link>
            </div>
            <div className="ml-4 text-white">
              <Link to="/add">Add Task</Link>
            </div>
          </div>
        </div>
      </nav>

    </div>
  );
}
