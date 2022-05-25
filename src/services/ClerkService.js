import axios from 'axios'

const CLERK_URL = 'http://localhost:8071/clerk';

class ClerkService{
    getClerk(){
        return axios.get(CLERK_URL);
    }

    addClerk(clerk){
        return axios.post(CLERK_URL + "/addclerk",clerk)
    }

    getClerkById(clerkId){
        return axios.get(CLERK_URL + '/find/' + clerkId);

    }

    editClerk(clerk, clerkId){
        return axios.put(CLERK_URL + '/update/' + clerkId, clerk)    
    }

    deleteClerk(clerkId){
        return axios.delete(CLERK_URL + '/delete/' + clerkId);
    }


}

export default new ClerkService()