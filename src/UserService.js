import axios from 'axios';

const PATH = "http://109.227.122.143:8080/users";

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