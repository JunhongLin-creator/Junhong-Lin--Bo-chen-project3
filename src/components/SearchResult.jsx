import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function SearchResult(props){
    const navigate = useNavigate();

    const {title,location,company,description,email,date} = props;

    const dispatch = useDispatch();

    return(
        <div>
            <div onClick={()=>{
                dispatch({
                    type:'redirect',
                    title: title,
                    location: location,
                    company : company,
                    description:description,
                    email:email,
                    date:date,
                });
                navigate('./jobDetail');
            }}>
            Title: {title} Location: {location} Company: {company}
            </div>
        </div>
    )
}