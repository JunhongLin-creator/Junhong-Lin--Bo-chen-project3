
const job = {
    title: '',
    location: '',
    company: '', 
    description: '',
    email: '',
    date: '',
    favorites:[],
}

export default function jobReducer(state,action){

    if(state==undefined){
        return job;
    }

    if(action.type=='redirect'){
        state.title = action.title;
        state.location = action.location;
        state.company = action.company;
        state.description = action.description;
        state.email = action.email;
        state.date = action.date;
    }
}