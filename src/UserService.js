import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/project/rest/persons";

class UserService {

    getEmployees(){
        return axios.get(USER_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(USER_API_BASE_URL, employee);
    }

    updateEmployee(employee, employeeId){
        return axios.put(USER_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(USER_API_BASE_URL + '/' + employeeId);
    }
}

export default new UserService()