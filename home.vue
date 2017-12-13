<template>
    <div>  <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="home-banner-container">
            <!-- DYNAMIC BANNERS -->
            <slick ref="slick" :options="slickOptions">
                <div v-for="banner in homeBanners" v-if="homeBanners">
                    <router-link :to="banner.url" class="">
                        <div class="home-banner" v-bind:style="{ backgroundImage: 'url(' + banner.image_url + ')' }"></div>
                    </router-link>
                </div>
            </slick>
        
            <!--<slick ref="slick" :options="slickOptions">-->
            <!--    <div v-for="banner in homeBanners" v-if="homeBanners">-->
            <!--        <router-link :to="banner.url" class="">-->
            <!--            <div class="home-banner" style="background-image: url(https://picsum.photos/1920/1400)"></div>-->
            <!--        </router-link>-->
            <!--    </div>-->
            <!--</slick>-->
        </div>
    </div>
</template>
<style>
    .slideshow {
  position: relative;
  z-index: 1;
  height: 100%;
  max-width: 700px;
  margin: 50px auto;
  
  * {
    outline: none;
  }
  
  .slider {
    box-shadow: 0 20px 50px -25px rgba(0, 0, 0, 1);
  }
  
  .slider-track {
    transition: all 1s cubic-bezier(0.7, 0, 0.3, 1);
  }
  
  .item {
    height: 100%;
    position: relative;
    z-index: 1;
    
    img {
      width: 100%;
      transition: all 1s cubic-bezier(0.7, 0, 0.3, 1);
      transform: scale(1.2);
    }
    
    &.slick-active img {
      transform: scale(1);
    }
  }
}
</style>
<div v-bind:style="styleObject"></div>
                <!--<div :style="{ fontSize: size + 'px' }"></div>-->
<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue!vue-slick"], function(Vue, moment, tz, VueMoment, Meta, slick) {
        Vue.use(Meta);
        return Vue.component("home-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    slickOptions: {
                        arrows: true,
                        autoplay: true,
                        // cssEase: 'linear',
                        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
                        dots: false,
                        fade: true,
                        infinite: true,
                        slidesToShow: 1,
                        speed: 500,
                        prevArrow: '.prev',
                        nextArrow: '.next'
                    }
                }
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                homeBanners () {
                    console.log(_.orderBy(this.$store.state.results.banners, ['position'], ['asc']));
                    return _.orderBy(this.$store.state.results.banners, ['position'], ['asc']);
                },
            },
            methods: {
                
            }
        })
    })
</script>
