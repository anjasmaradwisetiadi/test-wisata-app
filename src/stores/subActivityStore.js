import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/instanceAxios'

export const useSubActivitiesStore = defineStore('subActivities', {
  state : () =>{
    return {
     loading: false,
     subActivities: null,
     createResponse: null,
     detailResponse: null,
     updateResponse: null,
     deleteResponse: null,
     errorResponse: false
    }
  },

  actions:{
    async subActivitiesList(id) {
        this.loading = true;
        this.resetState()
        await instanceAxios.get(`tasks?activity_id=${id}`)
            .then((response)=>{
                this.subActivities = response.data
                this.loading = false;
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
                this.errorResponse = true
                this.loading = false;
            })
    },
    async subActivitiesListFilter(id, payload) {
      this.loading = true;
      this.resetState()
      await instanceAxios.get(`tasks?activity_id=${id}${payload}`)
          .then((response)=>{
              this.subActivities = response.data
              this.loading = false;
          })
          .catch((error)=>{
              console.log("error = ")
              console.log(error)
              this.errorResponse = true
              this.loading = false;
          })
   },
    async subActivitiesCreate(payload) {
        this.loading = true;
        await instanceAxios.post('tasks', payload)
            .then((response)=>{
                const payloadCreate = {
                    status: true,
                    message: 'create'
                }
                this.createResponse = payloadCreate
                this.loading = false;
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
                this.errorResponse = true
                this.loading = false;
            })
    },
    async subActivitiesDetail(id) {
        this.loading = true;
        await instanceAxios.get(`tasks/${id}`)
            .then((response)=>{
                this.detailResponse = response.data
                this.loading = false;
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
                this.errorResponse = true
                this.loading = false;
            })
    },
    async subActivitiesEdit(id, payload) {
        this.loading = true;
        await instanceAxios.patch(`tasks/${id}`, payload)
            .then((response)=>{
                const payloadUpdate = {
                    status: true,
                    message: 'update'
                }
                this.updateResponse = payloadUpdate;
                this.loading = false;
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
                this.loading = false;
            })
    },

    async subActivitiesDelete(id) {
        this.loading = true;
        await instanceAxios.delete(`tasks/${id}`)
            .then((response)=>{
                const payloadDelete = {
                    status: true,
                    message: 'delete'
                }
                this.deleteResponse = payloadDelete;
                this.loading = false;
            })
            .catch((error)=>{
                console.log("error = ")
                console.log(error)
                this.errorResponse = true;
                this.loading = false;
            })
    },

    async resetState() {
        this.createResponse= null;
        this.detailResponse= null;
        this.updateResponse= null;
        this.deleteResponse= null;
    }

  },

  getters: {
    doubleCount: (state) => state.count * 2,
  }
})
