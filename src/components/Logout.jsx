import React from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';


export default function Logout(props) {
    const navigate = useNavigate();
    return (<button onClick={() => axios.post('/api/user/logout')
    .then(() => navigate('/'))
    .catch(console.error)
  }>Logout</button>);
}