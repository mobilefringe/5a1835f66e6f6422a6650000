<template>
    <div> <!-- Without an outer container div this component template will not render -->
        <np-loader v-if="!dataLoaded"></np-loader>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <div class="margin-90 hidden-mobile"></div>
                <div class="image-container">
                    <div class="prev"></div>
                    <slick ref="slick" :options="slickOptionsOne">
                        <div v-for="banner in historyBanners" v-if="historyBanners">
                            <img :src="banner.image_url" class="" alt="">
                            <div class="page-container">
                                <h5 class="details-slider-title">{{ banner.name }}</h5>
                            </div>
                        </div>
                    </slick>
                    <div class="next"></div>
                </div>
                <div class="page-container">
                    <div class="row">
                        <div class="col-md-8">
                            <h2>The History of NorthPark</h2>
                            <div class="history-desc" v-if="historyPage" v-html="historyPage.body"></div>
                            <div class="hidden-mobile">
                                <router-link to="/our-story/photo-gallery">
                                    <p class="details-link">View History Photo Gallery <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
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
                    <div class="prev"></div>
                    <slick ref="slick" :options="slickOptionsTwo">
                        <div v-for="banner in historyBanners" v-if="historyBanners">
                            <img :src="banner.image_url" class="" alt="">
                            <div class="page-container">
                                <h5 class="details-slider-title">{{ banner.name }}</h5>
                            </div>
                        </div>
                    </slick>
                    <div class="next"></div>
                </div>
                <div class="page-container">
                    <div class="row">
                        <div class="col-md-8 col-md-push-4">
                            <h2>The 50th Anniversary</h2>
                            <div class="history-desc" v-if="anniversaryPage" v-html="anniversaryPage.body"></div>
                            <div class="hidden-mobile">
                                <router-link to="/our-story/photo-gallery">
                                    <p class="details-link">
                                        View 50th Anniversary Photo Gallery
                                        <i class="fa fa-angle-double-right" aria-hidden="true"></i>
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
                    <page-breadcrumb></page-breadcrumb>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "vue-meta", "vue!vue-slick"], function (Vue, Vuex, Meta, slick) {
        Vue.use(Meta);
        return Vue.component("history-component", {
            template: template, // the variable template will be injected
            data: function () {
                return {
                    dataLoaded: false,
                    currentPage: null,
                    historyPage: null,
                    anniversaryPage: null,
                    slickOptionsOne: {
                        arrows: true,
                        autoplay: true,
                        cssEase: 'linear',
                        dots: false,
                        fade: true,
                        infinite: true,
                        nextArrow: '.next',
                        prevArrow: '.prev',
                        slidesToShow: 1,
                        speed: 1000
                    },
                    slickOptionsTwo: {
                        arrows: true,
                        autoplay: true,
                        cssEase: 'linear',
                        dots: false,
                        fade: true,
                        infinite: true,
                        nextArrow: '.next',
                        prevArrow: '.prev',
                        slidesToShow: 1,
                        speed: 1000
                    }
                }
            },
            created() {
                this.loadData().then(response => {
                    this.historyPage = response[1].data;
                    this.anniversaryPage = response[2].data;
                    this.dataLoaded = true;
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
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "repos"), this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/northpark-history.json"}), this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/northpark-50th-anniversary.json"})]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                }
            }
        });
    });
</script>
