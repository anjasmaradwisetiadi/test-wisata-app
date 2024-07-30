import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/instanceAxios'

export const useSubActivitiesStore = defineStore('subActivities', {
  state : () =>{
    return {
     loading: false,
     subActivitiesText: null,
     createResponse: null,
     detailResponse: null,
     updateResponse: null,
     deleteResponse: null,
     errorResponse: false,
    }
  },

  actions:{
    async subActivitiesTextList(id) {
        this.loading = true;
        this.resetState()
        await instanceAxios.get(`text`)
            .then((response)=>{

                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },
    async subActivitiesTextCreate(payload) {
        this.loading = true;
        await instanceAxios.post('text', payload)
            .then((response)=>{

                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },
    async subActivitiesTextDetail(id) {
        this.loading = true;
        await instanceAxios.get(`text/${id}`)
            .then((response)=>{
                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },

    async subActivitiesTextEdit(id, payload) {
        this.loading = true;
        await instanceAxios.patch(`text/${id}`, payload)
            .then((response)=>{

                this.loading = false;
            })
            .catch((error)=>{
                this.loading = false;
            })
    },

    async subActivitiesTextDelete(id) {
        this.loading = true;
        await instanceAxios.delete(`text/${id}`)
            .then((response)=>{

                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = true;
                this.loading = false;
            })
    },



    async resetState() {
        this.createResponse= null;
        this.detailResponse= null;
        this.updateResponse= null;
        this.deleteResponse= null;
    },

  },

  getters: {
  }
})
