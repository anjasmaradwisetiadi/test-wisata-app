<template>
    <div id="Another Page">
        <main class="mt-12 relative flex min-h-screen justify-center align-center overflow-y-auto overflow-x-hidden z-1 pb-28">
            <div class="flex justify-center items-center py-4">
                <p class="font-bold text-base">Page {{ nameRoutePath }}</p>
            </div>

        </main>
        <Loading v-if="dashboardStore.loading"></Loading>
    </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, onBeforeMount } from 'vue';
import Loading from '../../components/Loading.vue'
import {useDashboardStore} from '../../stores/dashboard';
import { useRouter } from 'vue-router';

const router = useRouter();

const nameRoutePath = ref('');

const dashboardStore = useDashboardStore();
watch(() => router.currentRoute.value, fetchData, { immediate: true })

onMounted(()=>{
    dashboardStore.simulateLoading()
})

onBeforeMount(()=>{
    const paramsRoute = router.currentRoute.value.name;
    nameRoutePath.value = paramsRoute
})

async function fetchData(data) {
    nameRoutePath.value = data.name;
}

</script>

<style scoped>
    .page-not-found{
        position: relative;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        display: flex;
    }
</style>