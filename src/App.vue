
<template>
  <div id="app w-full">
    <div
      class="flex flex-col justify-center"
    >
      <Navbar></Navbar>
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
import { ref, reactive, watch, onMounted, onUpdated} from 'vue';
import Navbar from '../src/components/Navbar.vue'
import NavbarBottom from './components/NavbarBottom.vue'
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

let windowWidth = ref(0);
let viewMobile = ref(true);
const nameRoutePath = ref('');

watch(windowWidth, (newValue, oldValue)=>{
  if (newValue >= 576) {
        return viewMobile.value = false
      } else {
        return viewMobile.value = true
      }
})

watch(() => router.currentRoute.value, fetchData, { immediate: true })

onMounted(()=>{
  onResize

  axios({
      method: 'GET',
      url: 'https://tall-masks-appear-lazily.a276.dcdg.xyz/discovery-service/api/v1/profiles',
      headers:
          {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjQ2YjU0Mzk3OGY2NjUwODU2MTIxOSIsIm5hbWUiOiJ1c2VyIiwicm9sZSI6Miwic3ViIjoidXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTkwMzgwMTN9.WXCTPLQ4Kq501maKdKTfv-gK1X41bQdHcN8ZP8QCDw8'
          }
    })
    .then((response)=>{
          console.log("response = ")
          console.log(response)
      })
      .catch((error)=>{
          console.log("error message = ");
          console.log(error)
          // Swal.fire({
          //     title: "Something Wrong",
          //     text: error?.response?.data?.message,
          //     icon: "error",
          // })
    })
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
