<template>
    <div>  <!-- for some reason if you do not put an outer container div this component template will not render -->
        <!--<div  style="background-image: url(https://picsum.photos/1920/1400);"></div>-->
        <slick ref="slick" :options="slickOptions">
            <div v-for="banner in homeBanners" v-if="homeBanners">
                <div class="home-banner-container" v-bind:style="{ backgroundImage: 'url(' + banner.image_url + ')' }">

                    <router-link :to="banner.url" class=""></router-link>
                </div>
            </div>
        </slick>
    </div>
</template>
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
                        cssEase: 'linear',
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
