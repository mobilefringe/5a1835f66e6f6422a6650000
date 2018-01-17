<template>
    <div v-if="dataLoaded" v-cloak><!-- without an outer container div this component template will not render -->
        <div class="home-banner-container">
            <!-- DYNAMIC BANNERS -->
            <slick ref="slick" :options="slickOptions">
                <div v-for="banner in homeBanners" v-if="homeBanners">
                    <div class="columns">
                        <!--<router-link :to="banner.url" class="">-->
                            <div class="home-banner" v-bind:style="{ backgroundImage: 'url(' + banner.image_url + ')' }"></div>
                        <!--</router-link>-->
                    </div>
                </div>
            </slick>
            <div class="hero-text" v-if="currentMessage">{{ currentMessage.title }}</div>
        </div>
    </div>
</template>
<script>
    define(["Vue", "vuex", "vue-meta", "vue!vue-slick"], function(Vue, Vuex, Meta, slick){
        Vue.use(Meta);
        return Vue.component("home-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    //dataLoaded: false,
                    welcomeMessage: null,
                    currentMessage: null,
                    slickOptions: {
                        arrows: false,
                        autoplay: true,
                        autoplaySpeed: 6000,
                        cssEase: 'linear',
                        dots: false,
                        fade: true,
                        infinite: true,
                        slidesToShow: 1,
                        speed: 1600
                    }
                }
            },
            created(){
                this.loadData().then(response => {
                    this.dataLoaded = true;      
                });
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/api/v3/northpark/messages.json"}).then(response => {
                    this.welcomeMessage = response.data;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
            },
            watch: {
                welcomeMessage: function() {
                    this.currentMessage = this.welcomeMessage.messages.welcome[0].messages[0]
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property'
                ]),
                homeBanners() {
                    return _.orderBy(this.$store.state.banners, ['position'], ['asc']);
                }
            },
            methods: {
                loadData: async function() {
                    try{
                        let results = await Promise.all([this.$store.dispatch("getData", "banners")]);
                    } catch(e){
                        console.log("Error loading data: " + e.message);    
                    }
                }
            }
        })
    })
</script>