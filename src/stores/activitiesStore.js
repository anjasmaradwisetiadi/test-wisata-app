import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/instanceAxios'

export const useActivitiesStore = defineStore('activities', {
  state : () =>{
    return {
     loading: false,
     activities: null,
     createResponse: null,
     detailResponse: null,
     updateResponse: null,
     deleteResponse: null,
    }
  },

  actions:{
    async activitiesList() {
        await instanceAxios.get('activities')
            .then((response)=>{
                console.log("response = ") 
                console.log(response)
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
            })
    },
    async activitiesCreate(payload) {
        await instanceAxios.post('activities', payload)
            .then((response)=>{
                console.log("response = ")
                console.log(response)
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
            })
    },
    async activitiesDetail(id, payload) {
        await instanceAxios.get(`activities/${id}`, payload)
            .then((response)=>{
                console.log("response = ")
                console.log(response)
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
            })
    },
    async activitiesEdit(id, payload) {
        await instanceAxios.post(`activities/${id}`, payload)
            .then((response)=>{
                console.log("response = ")
                console.log(response)
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
            })
    },

    async activitiesDelete(id, payload) {
        await instanceAxios.delete(`activities/${id}`, payload)
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
