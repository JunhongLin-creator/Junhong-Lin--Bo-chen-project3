import { bindActionCreators } from "@reduxjs/toolkit";

const user = {
    status: false,//false stands for log out, true stands for logged in
    username:'default username',
}

export default function userReducer(state,action){
    if(state==undefined){
        return user;
    }

    if(action.type=='login'){
        state.status = true;

        // const {username} = action;
        // state.username = username;
    }

    if(action.type ='logout'){
        state.status = false;
        state.username = '';
    }
}