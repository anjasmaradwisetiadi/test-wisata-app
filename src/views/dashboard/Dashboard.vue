<template>
    <div id="Dashboard" class="flex flex-col min-h-screen">
        <main class="mt-12 relative flex-grow min-h-[96vh-12rem] overflow-y-auto overflow-x-hidden z-1 pb-28">
            <!-- <Profile></Profile> -->
            <!-- <CarouselNews></CarouselNews> -->
            <!-- <UserStatus></UserStatus> -->
        </main>
        <Loading v-if="dashboardStore.loading"></Loading>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Profile from './Profile.vue'
import UserStatus from './UserStatus.vue';
import {useDashboardStore} from '../../stores/dashboard';
import CarouselNews from './CarouselNews.vue';
import Loading from '../../components/Loading.vue'

const dashboardStore = useDashboardStore();


</script>

<style scoped>

</style>