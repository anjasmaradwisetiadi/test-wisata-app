import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/instanceAxios'

export const useAuthStore = defineStore('auth', {
  state : () =>{
    return {
      loading: false,
      loginResponse: null,
      logoutresponse: null
    }
  },

  actions:{
    async login(payload) {
        this.loading = true;
        await instanceAxios.post('auth/login', payload)
            .then((resp)=>{
                this.loginResponse = resp.data
                localStorage.setItem('user', JSON.stringify(resp.data.data));
                this.loading = false;
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
                this.loginResponse = error.response
                this.loading = false;
            })
    },
    async logout(){
        this.loading = true;
        await instanceAxios.post('auth/logout', payload)
            .then((response)=>{
                console.log("response = ")
                console.log(response)
                this.loading = false;
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
                this.loading = false;
            })
    }
  },

  getters: {
    getterLoading(state) {
        return state.loading;
    }
  }
})
