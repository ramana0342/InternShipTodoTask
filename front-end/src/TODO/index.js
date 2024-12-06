import React from "react";
import UserRegister from "./Register";
import UserLogin from "./Login";
import UserActivity from "./UersTasks";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NavLink, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";


const App = () => {
    const userToken = JSON.parse(sessionStorage.getItem("Token"))
    const [LoginStatus, setLoginStatus] = useState(userToken)
    //console.log(userToken)
    const LogOutStatue = () => {
        sessionStorage.clear();
        setLoginStatus()

    }
    return (<>

        <BrowserRouter>

            <div className="header">
                <NavLink to="/showUserTasks/" ><b><img className="TODOTASK-IMG" src="https://w7.pngwing.com/pngs/972/511/png-transparent-todo-sketch-note-list-tasks-thumbnail.png" /></b></NavLink>
                <NavLink to="/UserLogin/">  {LoginStatus ? <b onClick={() => { LogOutStatue() }}><img className="LogOut-img" src="https://t4.ftcdn.net/jpg/00/58/78/73/240_F_58787395_Rki4S1Q0wCgn5HeVbb9beMbyc8XCHrAZ.jpg" /></b> : <b><img className="Login-img" src="https://t4.ftcdn.net/jpg/00/33/02/97/360_F_33029732_Lx9kbkjzSoK211qimAgfiRY9DTdLnB4z.jpg" /></b>}</NavLink>
            </div>

            <div className="content">
                <Routes>
                    <Route path="/" element={<UserRegister />}></Route>
                    <Route path="/UserLogin/" element={<UserLogin LoginStatus={LoginStatus} setLoginStatus={setLoginStatus} />}></Route>
                    <Route path="/showUserTasks/" element={LoginStatus ? <UserActivity /> : <Navigate to="/" />}></Route>
                </Routes>
            </div>

        </BrowserRouter>

    </>)
}


export default App