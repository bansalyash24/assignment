import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFilter, sortTasks } from '../store/taskSlice';

function Operations() {
    const dispatch=useDispatch()
    const handleFilter=(e)=>{
       dispatch(changeFilter(e.target.value))
    }
  return (
    <div className="flex flex-col md:flex-row items-center my-4 justify-center">
      <div className="mb-2 md:mb-0 md:mr-4">
        <label className="mr-2 text-blue-500 font-semibold">Sort By</label>
        <select
          name="sort"
          className="p-2 border rounded border-blue-500 focus:outline-none focus:border-blue-700"
          onChange={(e)=>{
            dispatch(sortTasks(e.target.value))
          }}
        >
          <option value="id">Id</option>
          <option value="name">Name</option>
        </select>
      </div>
      <div>
        <label className="mr-2 text-green-500 font-semibold">Filter</label>
        <select
          name="filter"
          className="p-2 border rounded border-green-500 focus:outline-none focus:border-green-700"
          onChange={handleFilter}
        >
          <option value="All">All</option>
          <option value="Done">Done</option>
          <option value="Undone">Undone</option>
        </select>
      </div>
    </div>
  );
}

export default Operations;
