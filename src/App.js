import React from "react";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";


const App = ({children}) => {
  
  return (
    <>
      <Header/>
      <Outlet/>
      </>
  );
};

export default App;
