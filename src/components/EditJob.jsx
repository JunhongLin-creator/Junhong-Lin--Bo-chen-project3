import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';


export default function EditJob(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const job = useSelector(store=>store.job);

    const [jobState,setJobState] = useState(job);

    //check whether this form is used to create/edit page
    const isEdit = useParams().edit;
    if(isEdit==='edit'){
        console.log('succuess')
        return;
    }

    return (
        <div>
            <h3>Create/Edit/Delete Job detail pages</h3>
            <h5>Job title</h5>
            <input type="text" value ={jobState.title} onChange={e=>{
                const title = e.target.value;
                setJobState({
                    ...jobState,
                    title:title,
                })
            }} />
                        <h5>Company Name</h5>
            <input type="text" value ={jobState.company} onChange={e=>{
                const company = e.target.value;
                setJobState({
                    ...jobState,
                    company:company,
                })
            }} />
                        <h5>Location</h5>
            <input type="text" value ={jobState.location} onChange={e=>{
                const location = e.target.value;
                setJobState({
                    ...jobState,
                    location:location,
                })
            }} />
                        <h5>Description</h5>
            <input type="text" value ={jobState.description} onChange={e=>{
                const description = e.target.value;
                setJobState({
                    ...jobState,
                    description:description,
                })
            }} />
                        <h5>Email</h5>
            <input type="text" value ={jobState.email} onChange={e=>{
                const email = e.target.value;
                setJobState({
                    ...jobState,
                    email:email,
                })
            }} />
                        <h5>Company Website(optional)</h5>
            <input type="text" value ={jobState.website} onChange={e=>{
                const website = e.target.value;
                setJobState({
                    ...jobState,
                    website:website,
                })
            }} />
            <button onClick={()=>{
                //verify input
                if(jobState.title==undefined||jobState.company==undefined
                    ||jobState.location==undefined||jobState.description==undefined
                    ||jobState.email==undefined){
                        alert("title,company,location,description and email are required!");
                        return;
                    }
                //axios
                axios.post("api/editJob",jobState)
                    .then(res=>{
                        console.log(res);
                         const {title,location,company,description,email,date} = res.body;
                        dispatch({
                            type:'update',
                            title: title,
                            location: location,
                            company : company,
                            description:description,
                            email:email,
                            date:date,
                        });
                    })
                    .catch(e=>{console.log(e)});
            }}>
                Submit
            </button>
        </div>
    );
}