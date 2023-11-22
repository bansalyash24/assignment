import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import EditTask  from "./components/EditTask";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route exact path="/" element={<TaskList />} />
            <Route exact path="add" element={<TaskForm />} />
            <Route exact path="edit/:id" element={<EditTask />} />
          </Route>
          <Route path="*" element={<><h1>404 ! Page not found</h1></>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
);
