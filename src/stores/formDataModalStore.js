import { defineStore } from 'pinia'

export const useFormDataModalStore = defineStore('formDataModalStore', {
  state : () =>{
    return {
      isOpenModalGlobal: false,
      nameModal : '',
      responseModalGlobal: null,
      idData: ''
      // loading: false,
    }
  },

  actions:{
    onActivatedModal(payload) {
      this.isOpenModalGlobal = payload.isOpenModalGlobal;
      this.nameModal = payload.nameModal;
      this.responseModalGlobal = payload.responseModalGlobal;
      this.idData = payload.id ? payload.id : ''
    },
    onDeactivatedModal(){
      this.isOpenModalGlobal = false;
      this.nameModal = '';
      this.responseModalGlobal = false;
      this.idData = '';
    }
  },

  getters: {
    doubleCount: (state) => state.count * 2,
  }
})
