import { defineStore } from 'pinia'
import {notificationData} from '../assets/dataDummy/notificationData'

export const useNotificationStore = defineStore('notification', {
  state : () =>{
    return {
      notification: notificationData
    }
  },

  actions:{

  },

  getters: {

  }
})
