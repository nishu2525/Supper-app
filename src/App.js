import "./App.css";
import Login from "./components/login/Login";
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home_page/Home";
import List from "./components/Movies/List";
import Category from "./components/category_pg/Category";

const App = () => {
  return (
 
      <div>
        <BrowserRouter>
        <Routes >
          <Route path="/" element={<Login />} />
          <Route path="/Category_page" element={<Category />}/> 
          <Route path="/Home" element={<Home />}/>
          <Route path='/movies' element={<List />}></Route>
        </Routes>
        </BrowserRouter>
      </div>
  
  );
};

export default App;
 