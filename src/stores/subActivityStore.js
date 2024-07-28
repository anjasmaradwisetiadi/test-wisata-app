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
                this.subActivities = this.orderingDefaultList(response.data);
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
              this.subActivities = this.orderingByFiltering(response.data);
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
    },

    orderingDefaultList(data){
      let newOrderTasks = [];
      const result = data.tasks.sort((before, after)=>{
          if (before.order < after.order) {
              return -1;
          }
          if (before.order > after.order) {
              return 1;
          }
          return 0;
      })

      result.forEach((item, index)=>{
          const payload = {
            "id": item?.id,
            "activity_id": item?.activity_id,
            "title": item?.title,
            "is_active": item?.is_active,
            "priority": item?.priority,
            "order": (index+1),
            "created_at": item?.created_at,
            "updated_at": item?.updated_at
        }
          newOrderTasks.push(payload)  
      })

      const newResponse = {
        "message": data?.message,
        "paging": data?.paging,
        "tasks": newOrderTasks
      }
      console.log("orderingDefaultSubActivitiesList = ")
      console.log(newResponse)

      return newResponse
    },

    orderingByFiltering(data){
      result.forEach((item, index)=>{
          const payload = {
            "id": item?.id,
            "activity_id": item?.activity_id,
            "title": item?.title,
            "is_active": item?.is_active,
            "priority": item?.priority,
            "order": (index+1),
            "created_at": item?.created_at,
            "updated_at": item?.updated_at
        }
          newOrderTasks.push(payload)  
      })

      const newResponse = {
        "message": data?.message,
        "paging": data?.paging,
        "tasks": newOrderTasks
      }
      console.log("orderingByFiltering = ")
      console.log(newResponse)

      return newResponse
    }


  },

  getters: {
    doubleCount: (state) => state.count * 2,
  }
})
