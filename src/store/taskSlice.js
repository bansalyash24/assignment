import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    filter:'All',
  },
  reducers: {
    addTasks: (state, action) => {
      state.tasks.push(...action.payload);
    },
    removeTasks: (state, action) => {
      let taskId = action.payload.id;
      return {...state,tasks:state.tasks.filter((task)=>task.id!==taskId)}
    },
    updateTasks: (state, action) => {
      let taskId = action.payload.id;
      return {...state,tasks:state.tasks.map((task) => {
        return (task.id === taskId) ? {...task, completed:!task.completed} : task
      })}
    },
    editTasks:(state,action)=>{
        let orgtask=action.payload
        return {...state,tasks:state.tasks.map((task) => {
            return (task.id === orgtask.id) ? orgtask : task
        })}
    },
    rearrangeTasks:(state,action)=>{
        const {index1,index2}=action.payload
        const [reorderedItem]=state.tasks.splice(index1,1)
        state.tasks.splice(index2,0,reorderedItem)
    },
    changeFilter:(state,action)=>{
        state.filter=action.payload
    },
    sortTasks:(state,action)=>{
        if(action.payload==='id') state.tasks.sort((task1,task2)=>task1.id-task2.id)
        else if(action.payload==='name') state.tasks.sort((task1,task2)=>task1.title.localeCompare(task2.title))
    }
  },
});

export const {addTasks,removeTasks,updateTasks,editTasks,rearrangeTasks,changeFilter,sortTasks}=taskSlice.actions;
export default taskSlice.reducer