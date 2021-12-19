import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import './JobDetail.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';


export default function JobDetail() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const job = useSelector((state)=>state.job);
    const user = useSelector((state)=>state.user);
    const {title,location,company,description,email,date} = job;
    let favoriteStatus = checkFavorite(job);
    let isActive = "loggedout";
    if(user.status==true&&user.username==job.creator){
        isActive = "loggedin";
    }

    return(
        <div>
            <div class='header'>
                <button onClick={()=>{
                    if(user.status===false){//logged out
                        navigate('./login');
                        return;
                    }
                    //send message to server to add favorite
                    // TODO: handle favorites

                    // if(favoriteStatus){
                    //     job.favorites.remove()
                    // }else{
                    //     job.favorites.push({
                    //         title: title,
                    //         location: location,
                    //         company : company,
                    //         description:description,
                    //         email:email,
                    //         date:date,
                    //     })
                    // }
                    
                }}>
                    Favorite
                </button>
                <div>
                    {()=>{
                        if(favoriteStatus){
                            return "Liked";
                        }
                    }}
                </div>
                <button class={isActive} onClick={()=>{
                    axios.put('api/editJob',job)
                        .then(res=>{
                            console.log(res);
                            navigate('./edit/edit');
                        })
                        .catch(e=>{console.log(e)});
                }}>
                    Edit
                </button>
                <button class={isActive} onClick={()=>{
                    navigate('/');
                    axios.delete('api/editJob',job)
                    .then(res=>{
                        dispatch({
                            type:'delete',
                        })
                    })
                    .catch(e=>{console.log(e)});
                }}>
                    Delete
                </button>
            </div>


            <h1>Title: {title} </h1>
            <h3>Company: {company} Location: {location} </h3>
            <h4>Email: <a href={"mailto:"+email}>{email}</a> Posting date:{date} </h4>
            <p>Description: {description}</p>

        </div>
    )
}

function checkFavorite(job){
    let favorites = job.favorites;
    for (const object of favorites) {
        const {title,location,company,date} = object;
        if(title.equals(job.title)
        &&location.equals(job.location)
        &&company.equals(job.company)
        &&date.equals(job.date)){
            return true;
        } 
    }
    return false;
}