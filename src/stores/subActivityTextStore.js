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
                this.subActivitiesText = response?.data?.texts
                this.loading = false;
                this.resetState()
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },

    // need delete thi data not used
    async subActivitiesTextCreate(payload) {
        this.loading = true;
            instanceAxios.get(`texts?activity_id=${payload.activity_id}`)
            .then((response)=>{
                const isHaveList = response?.data?.texts?.length
                if(!isHaveList){
                    instanceAxios.post('text', payload)
                    .then((response)=>{
                        if(response?.data?.message?.toLowerCase() === 'success'){
                            const payloadCreate = {
                                status: true,
                                message: 'create'
                            }
                            this.createResponse = payloadCreate
                        }
                        this.loading = false;
                    })
                    .catch((error)=>{
                        this.errorResponse = true
                        this.loading = false;
                    })
                }
                this.loading = false;
                this.resetState()
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })

    },
    // async subActivitiesTextDetail(id) {
    //     this.loading = true;
    //     await instanceAxios.get(`text/${id}`)
    //         .then((response)=>{
    //             this.detailResponse = response.data.text
    //             this.loading = false;
    //         })
    //         .catch((error)=>{
    //             this.errorResponse = true
    //             this.loading = false;
    //         })
    // },

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
