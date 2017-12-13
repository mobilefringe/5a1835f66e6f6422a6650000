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
    .no-overflow {
  overflow: hidden;
}
.columns{
  position:relative;
}
.hero-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 550px;
  position: relative;
  width: 100%;
}
.hero-text {
  font-size: 50px;
  color: white;;
   position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
.slick-slider { overflow: hidden; }
.slick-slider div.slick-active .hero-image {
  -webkit-animation: myMove 8s 1 ease-in-out;
  -moz-animation: myMove 8s 1 ease-in-out;
  -o-animation: myMove 8s 1 ease-in-out;
  -ms-animation: myMove 8s 1 ease-in-out;
  animation: myMove 8s 1 ease-in-out;
}
@keyframes myMove {
  from { transform: scale(1.0,1.0); transform-origin: 50% 50%; }
  to { transform: scale(1.1,1.1); transform-origin: 50% 0%; }
}
@-webkit-keyframes myMove {
  from { -webkit-transform: scale(1.0,1.0); -webkit-transform-origin: 50% 50%; }
  to { -webkit-transform: scale(1.1,1.1); -webkit-transform-origin: 50% 0%;  }
}
@-o-keyframes myMove {
  from { -o-transform: scale(1.0,1.0); -o-transform-origin: 50% 50%; }
  to { -o-transform: scale(1.1,1.1); -o-transform-origin: 50% 0%;  }
}
@-moz-keyframes myMove {
  from { -moz-transform: scale(1.0,1.0); -moz-transform-origin: 50% 50%; }
  to { -moz-transform: scale(1.1,1.1); -moz-transform-origin: 50% 0%; }
}
@-ms-keyframes myMove {
  from { -ms-transform: scale(1.0,1.0); -ms-transform-origin: 50% 50%; }
  to { -ms-transform: scale(1.1,1.1); -ms-transform-origin: 50% 0%; }
}
</style>
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
