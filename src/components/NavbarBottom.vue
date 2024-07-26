<template>
    <div id="NavbarBottom" class="fixed bottom-0 z-10">
        <footer class="flex flex-row justify-start w-screen title text-center pb-3 pt-2 border-b-2 px-3 border-t z-10 bg-white shadow-top-nabvar">
            <div class="w-2/12" >
                <router-link class="text-center leading-3" to="/dashboard">
                    <div class="flex justify-center">
                        <span 
                            class="material-icons-outlined text-gray-500" 
                            :class="nameRoutePath === 'dashboard' ? 'icon-active': ''"
                            style="font-size: 24px;">
                                home
                        </span>
                    </div>
                    <div 
                        class="text-xs text-gray-500 font-semibold"
                        :class="nameRoutePath === 'dashboard' ? 'word-active': ''"
                    >
                        Home
                    </div>
                </router-link>
            </div>
            <div class="w-2/12">
                <router-link class="text-center leading-3" to="/attendance">
                    <div class="flex justify-center">
                        <span 
                            class="material-icons text-gray-500" 
                            :class="nameRoutePath === 'attendance' ? 'icon-active': ''"
                            style="font-size: 24px;"
                        >
                            event_available
                        </span>
                    </div>
                    <div 
                        class="text-xs text-gray-500 font-semibold"
                        :class="nameRoutePath === 'attendance' ? 'word-active': ''"
                    >
                        Attendance
                    </div>
                </router-link>
            </div>
            <div class=" relative flex-row w-4/12">
                <router-link class="flex relative justify-center z-20" to="/checkout">
                    <div class="custom-style-checkout-icon z-20 absolute w-14 h-14 bg-red-primary flex justify-center items-center rounded-full shadow-top-checkout-icon">
                        <span 
                            class="material-icons text-white" 
                            style="font-size: 24px;">
                            exit_to_app
                        </span>
                    </div>
                </router-link>
                <div class="w-6 h-6">

                </div>
                <div class="relative text-xs text-red-primary font-semibold">
                    Checkout
                </div>
                 
            </div>
            <div class="w-2/12">
                <router-link class="text-center leading-3" to="/form">
                    <div class="flex justify-center">
                        <span 
                            class="material-icons text-gray-500" 
                            style="font-size: 24px;"
                            :class="nameRoutePath === 'form' ? 'icon-active': ''"
                        >
                            assignment
                        </span>
                    </div>
                    <div 
                        class="text-xs text-gray-500 font-semibold"
                        :class="nameRoutePath === 'form' ? 'word-active': ''"
                    >
                        Form
                    </div>
                </router-link>
            </div>
            <div class="w-2/12">
                <router-link class="text-center leading-3" to="/setting">
                    <div class="flex justify-center">
                        <span 
                            class="material-icons text-gray-500" 
                            :class="nameRoutePath === 'setting' ? 'icon-active': ''"
                            style="font-size: 24px;">
                            settings
                        </span>
                    </div>
                    <div 
                        class="text-xs text-gray-500 font-semibold"
                        :class="nameRoutePath === 'setting' ? 'word-active': ''"
                    >
                        Setting
                    </div>
                </router-link>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const nameRoutePath = ref('');
watch(() => router.currentRoute.value, fetchData, { immediate: true })

onBeforeMount(()=>{
    const paramsRoute = router.currentRoute.value.name;
    nameRoutePath.value = paramsRoute
})

async function fetchData(data) {
    nameRoutePath.value = data.name;
}

</script>

<style scoped>
.icon-active{
    color: #f83723;
}
.word-active{
    color: #f83723;
}
.shadow-top-nabvar{
    box-shadow: 0px 10px 10px 10px rgb(0 0 0 / 0.18);
}
.shadow-top-checkout-icon{
    box-shadow: 0px -3px 6px 2px rgb(0 0 0 / 0.20);
}
.custom-style-checkout-icon{
    top: -40px;
}
</style>