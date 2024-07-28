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
     errorResponse: false
    }
  },

  actions:{
    async activitiesList(payload) {
        this.loading = true;
        await instanceAxios.get(`activities?page=${payload.page}&limit=${payload.limit}&search=${payload.search}`)
            .then((response)=>{
                this.activities = response.data
                this.loading = false;
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
                this.errorResponse = true
                this.loading = false;
            })
    },
    async activitiesCreate(payload) {
        this.loading = true;
        await instanceAxios.post('activities', payload)
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
    },
    async activitiesDetail(id) {
        this.loading = true;
        await instanceAxios.get(`activities/${id}`)
            .then((response)=>{
                this.detailResponse = response.data.data
                this.loading = false;
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
                this.errorResponse = true
                this.loading = false;
            })
    },
    async activitiesEdit(id, payload) {
        this.loading = true;
        await instanceAxios.post(`activities/${id}`, payload)
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
    },

    async activitiesDelete(id, payload) {
        this.loading = true;
        await instanceAxios.delete(`activities/${id}`, payload)
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
    },

  },

  getters: {
    doubleCount: (state) => state.count * 2,
  }
})
