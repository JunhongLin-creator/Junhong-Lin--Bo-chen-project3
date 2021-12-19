import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Register(){

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [userData,setUserData] = useState({
        password: '',
        username: '',
        passwordVerify:'',
    })

    const [message,setMessage] = useState(''); 

    return(
        <div>
            <h3>Input Name and password</h3>
            <h5>Username:</h5>
            <input type="text" value = {userData.username} onChange={(e)=>{
                const username = e.target.value;
                setUserData({
                    ...userData,
                    username:username
                })
            }}/>
            <h5>Password:</h5>
            <input type="password" value={userData.password} onChange={(e)=>{
                const password = e.target.value;
                setUserData({
                    ...userData,
                    password:password
                })
            }}/>
            <h5>Password Verification:</h5>
            <input type="password" value={userData.passwordVerify} onChange={(e)=>{
                const password = e.target.value;
                setUserData({
                    ...userData,
                    passwordVerify:password
                })
            }}/>
            <button onClick={()=>{
                if(userData.password!==userData.passwordVerify){
                    setMessage('Password and password verification don\'t match');
                    return;
                }
                axios.post('/user',userData)
                    .then(response=>{
                        console.log("username:"+response);
                        const state = response.body;
                        if(state === 'usernameExists'){
                            setMessage('Can not register!Username already exists!');
                        }else if(state==='success'){
                            navigate("/");
                            dispatch({
                                type:'login',
                                username:userData.username,
                            });
                        }
                    })
                    .catch(e=>console.log(e));
            }}>Register New User</button>
            <h5>{message}</h5>
        </div>
    )
}