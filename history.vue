<template>
    <div v-if="dataLoaded"> <!-- Without an outer container div this component template will not render -->
        <div class="margin-90 hidden-mobile"></div>
        <div class="image-container">
            <slick ref="slick" :options="slickOptions">
                <div v-for="banner in historyBanners" v-if="historyBanners">
                    <img :src="banner.image_url" class="" alt="">
                    <div class="page-container">
                        <h5 class="details-slider-title">{{ banner.name }}</h5>    
                    </div>
                </div>
            </slick>
        </div>
        <div class="page-container">
            <div class="row">
                <div class="col-md-8">
                    <h2>The History of NorthPark</h2>
                    <div class="history-desc" v-if="historyPage" v-html="historyPage.body"></div>
                    <div class="hidden-mobile">
                        <router-link to="/our-story/photo-gallery">
                            <p class="details-link">
                                View History Photo Gallery <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                            </p>
                        </router-link>    
                    </div>
                </div>
                <hr class="visible-mobile">
                <div class="col-md-4">
                    <div class="sidebar">
                        <p class="quote">Every company has a special responsibility to enrich the lives of its customers and the community. It should serve as a catalyst to link art and business for the benefit of all.</p>
                        <p class="quote-byline">-Raymond D. Nasher</p>
                    </div>    
                </div>
                
            </div>
        </div>
        <div class="margin-60 hidden-mobile"></div>
        <div class="image-container">
            <slick ref="slick" :options="slickOptions">
                <div v-for="banner in historyBanners" v-if="historyBanners">
                    <img :src="banner.image_url" class="" alt="">
                    <div class="page-container">
                        <h5 class="details-slider-title">{{ banner.name }}</h5>    
                    </div>
                </div>
            </slick>
        </div>
        <div class="page-container">
            <div class="row">
                <div class="col-md-8 col-md-push-4">
                    <h2>The 50th Anniversary</h2>
                    <div class="history-desc" v-if="anniversaryPage" v-html="anniversaryPage.body"></div>
                    <div class="hidden-mobile">
                        <router-link to="/our-story/photo-gallery">
                            <p class="details-link">
                                View 50th Anniversary Photo Gallery <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                            </p>
                        </router-link>    
                    </div>
                </div>
                <hr class="visible-mobile">
                <div class="col-md-4 col-md-pull-8">
                    <div class="sidebar-left">
                        <p class="quote">THE 50TH ANNIVERSARY OF NORTHPARK CENTER LOREM IPSUM DOLOR SIT AMET, CONSECTETUER ADIPISCING ELIT, SED DIAM NONUMMY NIBH EUISMOD TINCIDUNT UT LAOREET DOLORE MAGNA AL.</p>
                        <p class="quote-byline">-Nancy A. Nasher</p>
                    </div>    
                </div>
            </div>
        </div>
        <div class="page-container">
            <div class="margin-30"></div>
            <div class="row">
                <div class="col-md-12">
                    <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i> History</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "vuex", "vue-meta", "vue!vue-slick"], function(Vue, Vuex, Meta, slick) {
        Vue.use(Meta);
        return Vue.component("history-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dataLoaded: false,
                    breadcrumb: null,
                    currentPage: null,
                    historyPage: null,
                    anniversaryPage: null,
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
            created(){
                this.$store.dispatch("getData", "repos").then(response => {
                    this.dataLoaded = true
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                });
                
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-history.json"}).then(response => {
                    this.historyPage = response.data;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
                
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-50th-anniversary.json"}).then(response => {
                    this.anniversaryPage = response.data;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'repos',
                    'findRepoByName',
                    'processedEvents',
                ]),
                historyBanners() {
                    return this.findRepoByName('history banners').images;
                },
            }
        });
    });
</script>
