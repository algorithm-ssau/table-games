import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Table from './Table';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Login from "./Login";

ReactDOM.render(
  <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route exact path="/Add" element={<App/>}></Route>
        <Route exact path="/Table" element={<Table/>}></Route>
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
