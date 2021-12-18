import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function Login(){
    const navigate = useNavigate();


    const [userData,setUserData] = useState({
        password: '',
        username: '',
    })

    const dispatch = useDispatch();

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
            <button onClick={()=>{
                axios.post('api/users',userData)
                    .then(response=>{
                        const state = response.body;
                        if(state == 'nonExistentUser'){
                            setMessage('Can not Log in!Username does not exists!');
                        }
                        else if(state =='IncorrectPassword'){
                            setMessage('Can not Log in!Password is incorrect!');
                        }else if(state=='success'){
                            navigate("/");
                            dispatch({
                                type:'login',
                                username:userData.username,
                            });
                        }
                    })
                    .catch(e=>console.log(e));
            }}>
                Log in
            </button>

        </div>
    )
}