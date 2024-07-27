import { defineStore } from 'pinia'

export const useDeleteDataModalStore = defineStore('deleteDataModal', {
  state : () =>{
    return {
      count: 0,
    }
  },

  actions:{
    increment() {
      this.count++
    },
    decrement(){
      this.count--
    }
  },

  getters: {
    doubleCount: (state) => state.count * 2,
  }
})
