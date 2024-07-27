import axios from "axios"
import Swal from "sweetalert2"
import instanceAxios from "./instanceAxios"

export const errorHandle = {
  errorMessage(text = 'Something wrong please contact your admin'){
    Swal.fire({
      title: "Something Wrong",
      text: text,
      icon: "error",
      confirmButtonColor: '#38bdf8'
    })
  },

  sessionExpired(text){
    Swal.fire({
      title: "Warning",
      text: text,
      icon: "warning",
      confirmButtonColor: '#38bdf8'
    })
  },

  logOut(){
    localStorage.removeItem('user');
    window.location.href = "/authentication/sign-in";
  }, 

  async refreshToken(refreshToken){
    return await instanceAxios.post('auth/refresh-token', {
      refresh_token: refreshToken,
    });
  
  }
}


export const responseMessage = {
  ACCESS_TOKEN_EXPIRED: "token has been expired",
  REFRESH_TOKEN_EXPIRED: "refresh token has been expired",
}
