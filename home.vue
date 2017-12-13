<template>
    <div>  <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="home-banner-container">
            <!-- DYNAMIC BANNERS -->
            <slick ref="slick" :options="slickOptions">
                <div v-for="banner in homeBanners" v-if="homeBanners">
                    <div class="columns">
                        <router-link :to="banner.url" class="">
                            <div class="home-banner" v-bind:style="{ backgroundImage: 'url(' + banner.image_url + ')' }"></div>
                            <!--<div class="hero-text">{{ banner.name }}</div>-->
                            <div class="hero-text">The Art of Shopping</div>
                        </router-link>
                    </div>
                </div>
            </slick>
        
            <!--<slick ref="slick" :options="slickOptions">-->
            <!--    <div v-for="banner in homeBanners" v-if="homeBanners">-->
            <!--        <div class="columns">-->
            <!--            <router-link :to="banner.url" class="">-->
            <!--                <div class="home-banner" style="background-image: url(https://picsum.photos/1920/1400)"></div>-->
            <!--                <div class="hero-text">Dummy text in here 1</div>-->
            <!--            </router-link>-->
            <!--        </div>-->
            <!--    </div>-->
            <!--</slick>-->
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
                        autoplaySpeed: 5000,
                        cssEase: 'linear',
                        dots: false,
                        fade: true,
                        infinite: true,
                        slidesToShow: 1,
                        speed: 1600,
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
