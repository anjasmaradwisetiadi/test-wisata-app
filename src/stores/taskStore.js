import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/instanceAxios'

export const useTaskStore = defineStore('task', {
    state : () =>{
        return {
            loading: false,
            activities: null,
            createResponse: null,
            createBatchResponse: null,
            detailResponse: null,
            updateResponse: null,
            deleteResponse: null,
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
        async tasksCreate(payload) {
            await instanceAxios.post('tasks', payload)
                .then((response)=>{
                    console.log("response = ")
                    console.log(response)
                })
                .catch((error)=>{
                    console.log("error = ")
                    console.log(error)
                })
        },
    
        async tasksCreateBatch(payload) {
            await instanceAxios.post('tasks/batch', payload)
                .then((response)=>{
                    console.log("response = ")
                    console.log(response)
                })
                .catch((error)=>{
                    console.log("error = ")
                    console.log(error)
                })
        },
        async tasksDetail(id, payload) {
            await instanceAxios.get(`tasks/${id}`, payload)
                .then((response)=>{
                    console.log("response = ")
                    console.log(response)
                })
                .catch((error)=>{
                    console.log("error = ")
                    console.log(error)
                })
        },
        async tasksEdit(id, payload) {
            await instanceAxios.post(`tasks/${id}`, payload)
                .then((response)=>{
                    console.log("response = ")
                    console.log(response)
                })
                .catch((error)=>{
                    console.log("error = ")
                    console.log(error)
                })
        },
    
        async tasksDelete(id, payload) {
            await instanceAxios.delete(`tasks/${id}`, payload)
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
