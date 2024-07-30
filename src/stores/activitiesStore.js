import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/instanceAxios'
import { useSubActivitiesTextStore } from './subActivityTextStore'

const subActivitiesTextStore =  useSubActivitiesTextStore()

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

        await instanceAxios.get(`activities?page=${payload.page}&limit=${payload.limit}`)
            .then((response)=>{
                this.activities = response.data
                this.loading = false;
                this.resetState()
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },
    async activitiesCreate(payload) {
        this.loading = true;
        await instanceAxios.post('activities', payload)
            .then((response)=>{
                const payloadCreate = {
                    status: true,
                    message: 'create'
                }
                this.createResponse = payloadCreate
                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },
    async activitiesDetail(id, type="activity_task") {
        this.loading = true;
        await instanceAxios.get(`activities/${id}`)
            .then((response)=>{
                this.detailResponse = response.data.data
                // need delete
                // if(type === 'activity_text'){
                //     const payloadCreateTextTask = {
                //         activity_id: response.data?.data?.id,
                //         text: `<p class="default-text">Fill your note....</p>`
                //     }
                //     subActivitiesTextStore.subActivitiesTextCreate(payloadCreateTextTask)
                // }
                this.loading = false;
                this.resetState()
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },
    async activitiesEdit(id, payload) {
        this.loading = true;
        await instanceAxios.patch(`activities/${id}`, payload)
            .then((response)=>{
                const payloadUpdate = {
                    status: true,
                    message: 'update'
                }
                this.updateResponse = payloadUpdate;
                this.loading = false;
            })
            .catch((error)=>{
                this.loading = false;
            })
    },

    async activitiesDelete(id) {
        this.loading = true;
        await instanceAxios.delete(`activities/${id}`)
            .then((response)=>{
                const payloadDelete = {
                    status: true,
                    message: 'delete'
                }
                this.deleteResponse = payloadDelete;
                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = true;
                this.loading = false;
            })
    },

    async resetState() {
        this.createResponse= null;
        this.updateResponse= null;
        this.deleteResponse= null;
    }

  },

  getters: {
    doubleCount: (state) => state.count * 2,
  }
})
