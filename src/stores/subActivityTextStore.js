import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/instanceAxios'

export const useSubActivitiesTextStore = defineStore('subActivitiesText', {
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

        await instanceAxios.get(`texts?activity_id=${id}`, )
            .then((response)=>{
                this.subActivitiesText = response?.data
                this.loading = false;
                this.resetState()
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
                const payloadUpdate = {
                    status: true,
                    message: 'update'
                }
                this.updateResponse = payloadUpdate
                this.loading = false;
            })
            .catch((error)=>{
                this.loading = false;
            })
    },


    async resetState() {
        this.createResponse= null;
        this.updateResponse= null;
        this.deleteResponse= null;
    },

  },

  getters: {
  }
})
