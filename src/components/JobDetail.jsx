import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';


export default function JobDetail() {
    // TODO: handle favorites

    const navigate = useNavigate();

    const job = useSelector((state)=>state.job);
    const user = useSelector((state)=>state.user);
    const {title,location,company,description,email,date} = job;
    let favoriteStatus = checkFavorite(job);

    return(
        <div>
            <div class='header'>
                <button onClick={()=>{
                    if(user.status===false){//logged out
                        navigate('./login');
                        return;
                    }
                    if(favoriteStatus){
                        job.favorites.remove()
                    }else{
                        job.favorites.push({
                            title: title,
                            location: location,
                            company : company,
                            description:description,
                            email:email,
                            date:date,
                        })
                    }
                    
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