<template>
    <div id="CarouselNews" v-if="!getLoading">
        <Carousel :items-to-show="1.15" :autoplay="2000" :wrap-around="true">
            <Slide v-for="(item, index) in getNews" :key="index">
                <div class="carousel__item">
                    <div class="flex flex-col w-80 p-2">
                        <div class="flex flex-row">
                            <div class="flex w-1/2 items-center">
                                <div class="text-sm">
                                    <img class="w-8 h-8 rounded-full" :src="imageSrc(item.image)" alt="user_profile">
                                </div>
                                <div class="text-sm font-bold text-red-primary ml-2">
                                    {{item.name}}
                                </div>
                            </div>
                            <div class="w-1/2 text-right leading-3 text-xs">
                                <div>
                                    {{item.day}}
                                </div>
                                <div>
                                    {{item.date}}
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 text-xs text-justify">
                            {{getTruncateWord(item.description, 236)}}
                        </div>
                    </div>
                </div>
            </Slide>
            <template #addons>
                <Pagination />
            </template>
        </Carousel>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel'
  import {useDashboardStore} from '../../stores/dashboard';
  import {utilize} from '../../utilize/index'
  import {collectUrl} from '../../utilize/collectUrl'
  
  import 'vue3-carousel/dist/carousel.css'
  import { mapState } from 'pinia';
  
  export default defineComponent({
    name: 'CarouselNews',
    components: {
      Carousel,
      Slide,
      Navigation,
      Pagination
    },
    data: () => ({
        // carousel settings
        settings: {
        itemsToShow: 1,
        snapAlign: 'center',
        },
        // breakpoints are mobile first
        // any settings not specified will fallback to the carousel settings
        breakpoints: {
            // 700px and up
            700: {
                itemsToShow: 3.5,
                snapAlign: 'center',
            },
            // 1024 and up
            1024: {
                itemsToShow: 5,
                snapAlign: 'start',
            },
        },

        dataDummyNews: {
            name: "Alice",
            day: 'Senin',
            date: "30 Mei 2022",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer viewed Lorem Ipsum is simply dummy text of the printing and",
            image:'src/assets/image/user_1.png'
        },
        collectUrl: collectUrl,
        utilize: utilize
    }),
    computed:{
        ...mapState(useDashboardStore,{
            getNews(store){
                return store.news.data;
            },
            getLoading(store){
                return store.loading;
            }
        },
        )
    },
    
    methods:{
        getTruncateWord(data, length){
            return utilize.truncateWord(data, length)
        },
        // imageCallUrl use vite
        imageSrc(selectedItem) {
            return new URL(`${selectedItem}`, import.meta.url).href;
        }
    }
  })
</script>
<style scoped>
/* start style custom slider carousel */
.carousel__item {
  min-height: 160px;
  width: 100%;
  background-color: white;
  color: black;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 3px 2px rgb(0 0 0 / 0.16);
}

.carousel__slide {
  padding: 0px 6px;
  margin: 10px 0px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

::v-deep .carousel__pagination{
    margin: 4px 0px !important;
}
::v-deep .carousel__pagination-button--active::after{
    background-color: red;
}

::v-deep .carousel__pagination-button::after{
    display: block !important;
    content: '' !important;
    width: 10px !important;
    height: 10px !important;
    border-radius: 50% !important;
}
/* end style custom slider carousel */
</style>