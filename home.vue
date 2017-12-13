<template>
    <div>  <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="home-banner-container">
            <!-- DYNAMIC BANNERS -->
            <!--<slick ref="slick" :options="slickOptions">-->
            <!--    <div v-for="banner in homeBanners" v-if="homeBanners">-->
            <!--        <router-link :to="banner.url" class="">-->
            <!--            <div class="home-banner" v-bind:style="{ backgroundImage: 'url(' + banner.image_url + ')' }"></div>-->
            <!--        </router-link>-->
            <!--    </div>-->
            <!--</slick>-->
        
            <slick ref="slick" :options="slickOptions">
                <div class="columns">
                    <div v-for="banner in homeBanners" v-if="homeBanners">
                        <router-link :to="banner.url" class="">
                            <div class="home-banner" style="background-image: url(https://picsum.photos/1920/1400)"></div>
                            <div class="hero-text">Dummy text in here 1</div>
                        </router-link>
                    </div>
                </div>
            </slick>
            
            
            
            <div class="hero-slider">
  <div class="columns">
    <div class="hero-image" style="background-image: url('http://lorempixel.com/output/city-q-c-1900-500-6.jpg')">      
    </div>
    
  </div>
        </div>
    </div>
</template>

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
