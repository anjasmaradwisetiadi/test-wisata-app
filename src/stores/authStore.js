import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/instanceAxios'

export const useAuthStore = defineStore('auth', {
  state : () =>{
    return {
      loading: false,
    }
  },

  actions:{
    async login(payload) {
        await instanceAxios.post('auth/login', payload)
            .then((response)=>{
                console.log("response = ")
                console.log(response)
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
            })
    },
    async logout(){
        await instanceAxios.post('auth/logout', payload)
            .then((response)=>{
                console.log("response = ")
                console.log(response)
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
            })
    }
  },

  getters: {
    doubleCount: (state) => state.count * 2,
  }
})
