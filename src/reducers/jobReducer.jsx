const job = {
    title: '',
    location: '',
    company: '', 
    description: '',
    email: '',
    date: '',
    website:'',
    creator:'',
}

export default function jobReducer(state,action){

    if(state==undefined){
        return job;
    }

    if(action.type=='update'){
        state.title = action.title;
        state.location = action.location;
        state.company = action.company;
        state.description = action.description;
        state.email = action.email;
        if(action.date!=undefined){
            state.date=action.date;
        }
        if(action.website!=undefined){
            state.website=action.website;
        }
        if(action.creator!=undefined){
            state.creator=action.creator;
        }
    }

    if(action.type=='delete'){
        for (const key in state) {
            if (Object.hasOwnProperty.call(state, key)) {
                state[key] = '';                
            }
        }
    }

}