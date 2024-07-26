<template>
    <div id="Profile" v-if="!dashboardStore.loading">
        <div class="flex flex-col px-3">
            <div class="py-2">Hi, Good Morning ?</div>
            <div class="px-3 py-5 text-sm text-white bg-gradient-to-r from-red-primary to-red-secondary rounded-lg shadow-md">
                <div class="flex flex-row">
                    <div class="w-2/12">
                        <img class="w-14 h-14 rounded-full" :src="imageSrc(getDashboard.image)" alt="user_profile">
                    </div>
                    <div class="w-5/12 pl-2 leading-4">
                        <div class="text-base font-semibold">
                            {{ getDashboard.name }}
                        </div>
                        <div class="text-xs font-extralight">
                            {{ getDashboard.position }}
                        </div>
                    </div>
                    <div class="w-5/12 text-right leading-4">
                        <div class="text-xs font-extralight">
                            Member Since
                        </div>
                        <div class="text-base font-semibold">
                            {{ utilize.convertTimeDate(getDashboard.member_since) }}
                        </div>
                    </div>
                </div>
                <div class="flex mt-4 items-end">
                    <div class="w-1/2">
                        <div class="text-xs font-extralight">
                            Location
                        </div>
                        <div class="font-semibold">
                            {{ getDashboard.location }}
                        </div>
                    </div>
                    <div class="w-1/2 text-right">
                        <div class="font-extralight">
                            ICO
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-4 text-black">
                <div>
                    <div class="text-base font-bold">
                        Today's Activity
                    </div>
                </div>
                <div class="flex p-2 text-sm text-center justify-center">
                    <div class="w-3/12">
                        <div class="mb-1">
                            <span class="material-icons-outlined icon-active text-red-primary" style="font-size: 28px;">
                                schedule
                            </span>
                        </div>
                        <div class="font-bold">
                            {{ utilize.convertTimeHours(getDashboard.check_in) }}
                        </div>
                        <div class="text-xs font-extralight">
                            Check in
                        </div>
                    </div>
                    <div class="w-6/12">
                        <div>
                            <span class="material-icons-outlined icon-active text-red-primary" style="font-size: 28px;">
                                update
                            </span>
                        </div>
                        <div class="font-bold text-base text-red-primary">
                            {{ utilize.convertTimeBetween(getDashboard.start_working, getDashboard.current_working) }}
                        </div>
                        <div class="text-xs font-extralight">
                            Working Hours
                        </div>
                    </div>
                    <div class="w-3/12">
                        <div class="mb-1">
                            <span class="material-icons-outlined icon-active text-red-primary" style="font-size: 28px;">
                                info
                            </span>
                        </div>
                        <div class="font-bold">
                            {{ utilize.convertTimeHours(getDashboard.check_out) }}
                        </div>
                        <div class="text-xs font-extralight">
                            Check Out
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import {useDashboardStore} from '../../stores/dashboard';
import {utilize} from '../../utilize/index'
import {collectUrl} from '../../utilize/collectUrl'

const dashboardStore = useDashboardStore();
const getDashboard = reactive(dashboardStore.user.data);

// imageCallUrl use vite
function imageSrc(selectedItem) {
    return new URL(`${selectedItem}`, import.meta.url).href;
}
</script>

<style scoped>

</style>