import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
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
