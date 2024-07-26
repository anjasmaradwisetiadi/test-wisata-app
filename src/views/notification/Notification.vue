<template>
    <div id="Notification" >
        <div class="mt-14">
            <template v-if="getNotification.data?.length && !dashboardStore.loading">
                <div 
                class="cursor-pointer "
                v-for="(data, index) in getNotification.data"
                :class="data.status === 'Unread'? 'bg-blue-100':''"
                :key="index">
                <div class="px-3 p-2">
                    <div
                        class="flex">
                        <div class="w-3/12 flex relative">
                            <div class="flex items-center bg-gradient-to-r from-red-primary to-red-secondary relative flex justify-center rounded-lg w-24 max-h-14 mb-10 shadow-md z-1 p-4">
                                <img 
                                    class="w-10 h-10 rounded-lg"
                                    :src="imageSrc(data.image)" alt="user_1"
                                >
                            </div>
                            <span
                                v-if="data.thumbnail === 'check'"
                                class="absolute flex justify-end items-end w-24 h-16 mb-2 pr-0.5 text-white z-2">
                                    <span class="flex justify-center items-center bg-green-400 material-icons rounded-full h-5 w-5 p-1 " style="font-size: 14px;">
                                        check
                                    </span>
                            </span>
                            <span
                                v-if="data.thumbnail === 'close'"
                                class="absolute flex justify-end items-end w-24 h-16 mb-2 pr-0.5 text-white z-2">
                                    <span class="flex justify-center items-center bg-red-700 material-icons rounded-full h-5 w-5 p-1 " style="font-size: 14px;">
                                        close
                                    </span>
                            </span>
                            <span
                                v-if="data.thumbnail === 'next'"
                                class="absolute flex justify-end items-end w-24 h-16 mb-2 pr-0.5 text-white z-2">
                                    <span class="flex justify-center items-center bg-blue-400 material-icons rounded-full h-5 w-5 p-1 " style="font-size: 14px;">
                                        arrow_forward
                                    </span>
                            </span>
                        </div>
                        <div class="flex flex-col w-6/12 pl-3 pr-2 text-sm">
                            <div class="font-bold mb-1">
                                {{utilize.truncateWord(data.name, 17)}}
                            </div>
                            <div class="text-justify leading-4">
                                {{utilize.truncateWord(data.description, 116)}}
                            </div>
                        </div>
                        <div class="w-3/12 text-center text-gray-500 text-sm text-right pr-1">
                            {{ utilize.convertDiffTime(epochDateStart ,data.date) }}
                        </div>
                    </div>
                </div>
            </div>
            </template>

            <template v-if="!getNotification.data?.length">
                <div class="flex justify-center items-center text-center min-h-screen">
                    <div class="font-bold text-base">
                        Data Not Found
                    </div>   
                </div>
            </template>
        </div>
        <Loading v-if="dashboardStore.loading"></Loading>
    </div>
</template>

<script setup>
import { reactive, onMounted, } from 'vue';
import {useNotificationStore} from '../../stores/notification';
import {useDashboardStore} from '../../stores/dashboard';
import {utilize} from '../../utilize/index'
import {collectUrl} from '../../utilize/collectUrl'
import Loading from '../../components/Loading.vue'
import dayjs from "dayjs";

const notificationStore = useNotificationStore();
const dashboardStore = useDashboardStore();
const getNotification = reactive(notificationStore.notification);
// tanggal 29-05-2024
const epochDateStart = '1716940800'

onMounted(()=>{
    dashboardStore.simulateLoading();
})

function imageSrc(selectedItem) {
    return new URL(`${selectedItem}`, import.meta.url).href;
}

</script>

<style scoped>

</style>