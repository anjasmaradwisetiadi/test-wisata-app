<template>
    <div id="DarggableComponent">
        <VueDraggable
            v-model="list"
            animation="150"
            ghostClass="ghost"
            class="container"
            >
            <div v-for="item in list" :key="item.id" class="item">
                {{ item.name }}
            </div>
        </VueDraggable>
        <div class="flex w-full justify-center align-center mt-10">
            <button class="bg-red-300 py-3 px-6 mr-2" 
                @click="onSubmit()"
            >
                Submit data
            </button>
            <button class="bg-red-300 py-3 px-6 mr-2" 
                @click="onFilteringDefault()"
            >
                Filtering Default
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, onBeforeMount } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
const list = ref(
    [
      {
        name: 'Joao 1',
        order: 1,
        id: 1,
      },
      {
        name: 'Juan',
        order: 4,
        id: 4,
      },
      {
        name: 'Joao 2',
        order: 1,
        id: 11,
      },
      {
        name: 'Joao 3',
        order: 1,
        id: 12,
      },
      {
        name: 'Jean',
        order: 2,
        id: 2,
      },
      {
        name: 'Johanna',
        order: 3,
        id: 3,
      },
    ]
)

function onSubmit(){
    let newResult = []
    console.log("list = ")
    console.log(list.value)
    list.value.forEach((item, index)=>{
        console.log("item = ", index)
        console.log(item)
        const payload = {
            name: item?.name,
            order: (index+1),
            id: item?.id
        }
        newResult.push(payload)
    })
    console.log("newResult submit = ")
    console.log(newResult)
}

function onFilteringDefault(){
    let newResult = [];
    const result = list.value.sort((before, after)=>{
        if (before.order < after.order) {
            return -1;
        }
        if (before.order > after.order) {
            return 1;
        }
        return 0;
    })

    console.log("result = ")
    console.log(result)
    result.forEach((item, index)=>{
        const payload = {
            name: item?.name,
            order: (index+1),
            id: item?.id
        }
        newResult.push(payload)
    })

    console.log("newResult filter defaullt = ")
    console.log(newResult)
}
</script>

<style scoped>
.container {
  margin-top: 20rem;
  display: grid;
  gap: 10px;
  justify-content: center;
  align-content: center;
}
.item {
  width: 200px;
  background-color: red;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: move;
}
</style>