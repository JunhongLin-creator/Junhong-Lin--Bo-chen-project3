import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import './Homepage.css';
import SearchResult from './SearchResult';
import axios from 'axios';


export default function Homepage(){

    const navigate = useNavigate();

    const [searchData,setSearchData] = useState({
        job:''
    });

    const searchResultComponent = [];
    let display = 'inactive';

    return(
        <div>
            <input type="text" value={searchData.job} onChange={(e)=>{
                const jobName = e.target.value;
                setSearchData({
                    ...searchData,
                    job:jobName,
                })
            }}/>
            <button onClick={()=>{
                axios.get('api/search',searchData)
                    .then(response=>{
                        console.log(response);
                        const {result} = response.body;//result is a list of {title,location,company}
                        for (let i = 0; i < result.length; i++) {
                            const job = result[i];
                            searchResultComponent.push(<SearchResult title = {job.title} location = {job.location} company = {job.company} 
                            description = {job.description} email = {job.email} date = {job.date}  />)
                        }
                    })
                    .catch(e=>console.log(e));
            }}>Search</button>
            <div class = {display}>
                <h3>Search result (click on them to show job detail):</h3>
                {searchResultComponent}
            </div>
        </div>
    )
    
    
}