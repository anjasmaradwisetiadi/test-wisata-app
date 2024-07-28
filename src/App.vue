
<template>
  <div id="app w-full">
    <div
      class="flex flex-col justify-center"
    >
      <template v-if="nameRoutePath !== 'login'">
        <Navbar></Navbar>
      </template>
      <section class="bg-gray-50 dark:bg-gray-900">
        <RouterView />
      </section>
      <!-- <template v-if="nameRoutePath !== 'notification'">
        <NavbarBottom></NavbarBottom>
      </template> -->
    </div>
  </div>

</template>

<script setup>
import { ref, reactive, watch, onMounted, onUpdated, onBeforeMount, computed} from 'vue';
import Navbar from '../src/components/Navbar.vue'
import NavbarBottom from './components/NavbarBottom.vue'
import { useAuthStore } from './stores/authStore';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore()

let windowWidth = ref(0);
let viewMobile = ref(true);
const nameRoutePath = ref('');

const checkAutoLogout = computed(()=>{
  return authStore.checkUserExpired()
})

watch(windowWidth, (newValue, oldValue)=>{
  if (newValue >= 576) {
        return viewMobile.value = false
      } else {
        return viewMobile.value = true
      }
})

watch(checkAutoLogout, (newValue, oldValue)=>{
  if(newValue){
    authStore.autoLogout();
  }
})

watch(() => router.currentRoute.value, fetchData, { immediate: true })

onBeforeMount(()=>{
  authStore.autoLogout()
})

onMounted(()=>{
  onResize
  authStore.autoLogout()
})

onUpdated(()=>{
  window.addEventListener('resize', onResize)
})

function onResize() {
      windowWidth.value = window.innerWidth
      if (windowWidth.value >= 576) {
        return viewMobile.value = false
      } else {
        return viewMobile.value = true
      }
}

async function fetchData(data) {
    nameRoutePath.value = data.name;
}



</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
