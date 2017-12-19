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
                    welcomeMessage: null,
                    slickOptions: {
                        arrows: true,
                        autoplay: true,
                        autoplaySpeed: 6000,
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
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    // WELCOME MESSAGE
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/api/v3/northpark/messages.json"}).then(response => {
                        vm.welcomeMessage = response.data;
                        console.log(response.data)
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });
                })
            },
            beforeRouteUpdate(to, from, next) {
                // WELCOME MESSAGE
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/api/v3/northpark/messages.json"}).then(response => {
                    this.welcomeMessage = response.data;
                    console.log(response.data)
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
            },
            computed: {
                homeBanners() {
                    console.log(_.orderBy(this.$store.state.results.banners, ['position'], ['asc']));
                    return _.orderBy(this.$store.state.results.banners, ['position'], ['asc']);
                },
                property(){
                    return this.$store.getters.getProperty;
                },
                currentMessage() {
                    console.log(this.welcomeMessage)
                }
            },
        })
    })
</script>
