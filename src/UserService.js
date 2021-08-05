import axios from 'axios';

const PATH = "http://localhost:8585/project/users";

class UserService {

    getUsers(){
        return axios.get(PATH);
    }

    createUser(user){
        return axios.post(PATH, user);
    }

    updateUser(user){
        return axios.put(PATH, user);
    }

    delete(id){
        return axios.delete(PATH + '/' + id);
    }
}

export default new UserService()