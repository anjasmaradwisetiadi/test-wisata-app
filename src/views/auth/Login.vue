<template>
    <!-- ********* trigger loading   -->
  <div v-if="getLoading">
    <div
        id="modal-bg" class="w-full h-full z-20 absolute top-0 absolute blur-background">
    </div>
    <div 
        class="sm:w-[385px] sm:min-w-[30vw] min-w-[60vw] min-h-[30vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 top-1/2 left-1/2 -translate-x-1/2 absolute z-20">
        <img src="../../assets/animated/spinner.svg" alt="spinner">
    </div>
  </div>
  <!-- ********* form   -->
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen  min-h-screen">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form 
                class="space-y-4 md:space-y-6" action="#"
                @submit="onSubmit($event)"
              >     
                  <div class="flex flex-col">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com">
                        <span class="invalid-feedback" v-if="isEmail"> Please fill email required</span>
                        <span class="invalid-feedback" v-if="!isEmail && isFormatEmail"> Please fill use email format correct</span>
                    </div>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <span class="invalid-feedback" v-if="isPassword"> Please fill password required</span>
                      
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
                  <div class="flex w-full  justify-center">
                    <button 
                        type="submit"
                        class="flex w-full justify-center align-center md:px-6 lg:px-6 px-4 py-2 rounded-full bg-sky-400 hover:bg-sky-600 text-sm text-white cursor-pointer text-xl">
                            Submit
                    </button>
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { utilize } from '@/utilize';
import { errorHandle } from '@/utilize/HandleError';
import { useAuthStore } from '@/stores/authStore';
import Swal from 'sweetalert2';

const authStore = useAuthStore()
const router = useRouter();

const isEmail = ref(false);
const isFormatEmail = ref(false);
const isPassword = ref(false);

const getLoginResponse = computed(()=>{
    return authStore.loginResponse
})

const getLoading = computed(()=>{
    return authStore.loading;
})

watch(getLoginResponse, (newValue, oldValue)=>{
    if(newValue && newValue?.message === 'Success'){
        Swal.fire({
            title: "Success Login",
            text: "You will redirect to dashboard",
            icon: "success",
            confirmButtonColor: '#38bdf8',
            confirmButtonText: "Yes",
        }).then((result)=>{
            if (result.isConfirmed || result.isDismissed) {
                router.push('/activity')
            }
        })
    } else {
        errorHandle.errorMessage(newValue.data.message)
    }
})

const onSubmit = ($event) => {
    $event.preventDefault();

    if(checkValidity($event)){
        const payload = {
            email: $event.target.email.value,
            password: $event.target.password.value
        }
        authStore.login(payload)
    } else {
        errorHandle.errorMessage('Check your field email or password')
    }
}

const checkValidity = (data) =>{
   const requiredEmail =  data.target.email.value.length ? false : true;
   const formatEmail = utilize.emailFormat(data.target.email.value) ? false : true;
   const requiredPassword = data.target.password.value.length ? false : true;

   isEmail.value = requiredEmail;
   isFormatEmail.value = formatEmail;
   isPassword.value =  requiredPassword;

   return !requiredEmail && !requiredPassword && !formatEmail
}
</script>

<style scoped>

.blur-background{
    background-color: rgba(255,255,255, 0.8);
}

</style>