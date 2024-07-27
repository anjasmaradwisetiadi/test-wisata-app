import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/instanceAxios'

export const useSubActivityModalStore = defineStore('subActivityModal', {
  state : () =>{
    return {
        loading: false,
        isOpenModalGlobal: false,
        nameModal: '',
        responseModalGlobal: {
            title: 'Delete Data',
            message: 'Are you sure want delete this data ?'
        } 

    }
  },

  actions:{
    async triggerSubActivityModal() {
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
