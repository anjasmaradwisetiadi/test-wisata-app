import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/instanceAxios'

export const useSubActivityModalStore = defineStore('subActivityModal', {
  state : () =>{
    return {
        loading: false,
    }
  },

  actions:{
    async taskList() {
        await instanceAxios.get('tasks')
            .then((response)=>{
                console.log("response = ")
                console.log(response)
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
            })
    },
  },

  getters: {
    doubleCount: (state) => state.count * 2,
  }
})
