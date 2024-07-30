<template>
    <div id="ActivityTextComponent" class="flex justify-center min-h-screen ">
        <div class="relative overflow-y-auto overflow-x-hidden z-1 container">
            <div class="flex flex-row fixed justify-between px-4 container bg-gray-50 dark:bg-gray-900 mt-24 lg:mt-24 py-3 lg:pt-10 ">
                <div>
                    <h1 class="lg:text-3xl md:text-3xl text-xl font-bold">ACTIVITY</h1>
                </div>
                <div class="flex justify-center align-center md:px-6 lg:px-6 px-4 py-2 rounded-full bg-sky-400 hover:bg-sky-600 text-sm text-white cursor-pointer"
                    @click="onEdit()"
                >
                    <template v-if="!isEdit">
                        <span class="material-icons-outlined md:text-2xl lg:text-2xl text-lg">
                            edit
                        </span>
                        <h1 class="md:text-2xl lg:text-2xl text-lg">&nbsp;Edit</h1>
                    </template>
                    <template v-if="isEdit">
                        <span class="material-icons-outlined md:text-2xl lg:text-2xl text-lg">
                            done
                        </span>
                        <h1 class="md:text-2xl lg:text-2xl text-lg">&nbsp;Submit</h1>
                    </template>
                </div>
            </div>
            <div class="flex flex-row flex-wrap justify-center mt-24 lg:mt-28 pt-20 lg:pt-24 px-4">
                <template
                    v-if="!isEdit"
                >
                    <div class="w-full">
                        <label for="inputBody">Note: </label>
                        <div class="bg-white shadow-lg lg:p-8 p-4 border border-gray-300 rounded-lg">
                            <div class="card-body">
                                <div class="information-html" v-html="information"></div>
                            </div>
                        </div>
                    </div>
                </template>
                <template 
                    v-if="isEdit"
                >
                    <div class="w-full">
                        <label for="inputBody">Note: </label>
                        <quill-editor 
                            id="inputBody" 
                            v-model:content="information" 
                            content-type="html" 
                            placeholder="Write your information....">
                        </quill-editor>
                    </div>

                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { QuillEditor } from '@vueup/vue-quill'
import { ref, reactive, watch, computed, onMounted, onBeforeMount } from 'vue';
import '@/css/format-text.css'

const textDefault = `<p class="default-text">Fill your text....</p>`
const information = ref(textDefault);
// const idActivityText = ref('');
const isEdit = ref(false)

onMounted(()=>{

})

function onEdit(){
    isEdit.value = !isEdit.value
    if(isEdit.value){
        console.log("edit activity text")
    } else {
        console.log("submit activity text")
    }

}
</script>

<style>

</style>