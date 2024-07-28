import { defineStore } from 'pinia'

export const useFormDataModalStore = defineStore('formDataModalStore', {
  state : () =>{
    return {
      isOpenModalGlobal: false,
      nameModal : '',
      responseModalGlobal: null,
      // loading: false,
    }
  },

  actions:{
    onActivatedModal(payload) {
      this.isOpenModalGlobal = payload.isOpenModalGlobal;
      this.nameModal = payload.nameModal;
      this.responseModalGlobal = payload.responseModalGlobal;
    },
    onDeactivatedModal(){
      this.isOpenModalGlobal = false;
      this.nameModal = '';
      this.responseModalGlobal = false;
    }
  },

  getters: {
    doubleCount: (state) => state.count * 2,
  }
})
