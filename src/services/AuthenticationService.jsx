import axios from "axios";


class AuthenticationService { 

    saveUser(user){
      return axios.post('http://localhost:8111/api/user/save',user)
    }

    login(params){
      return axios.post('http://localhost:8111/api/login',params);
    }

     logout(){
       sessionStorage.removeItem("access_token");
       sessionStorage.setItem("isLogin",false);
       window.location.href='/login';
     }

}


export default new AuthenticationService();