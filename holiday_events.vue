<template>
    <div> <!-- without an outer container div this component template will not render -->
        <np-loader v-if="!dataLoaded"></np-loader>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <div v-if="sectionOne">
                    <div class="gallery-banner" v-lazy:background-image="sectionOne.image_url"></div>
                    <div class="margin-90 hidden-mobile"></div>
                    <div class="page-container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="art-quote-container">
                                    <blockquote>
                                        <h1 class="art-quote">{{ sectionOne.description }}</h1>
                                        <p class="art-quote-subtext">-{{ sectionOne.name }}</p>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="image-container">
                    <div class="row image-row">
                        <div class="col-sm-6 col-md-4" v-if="sectionTwo">
                            <div class="hover-container">
                                <div class="hover-image" v-lazy:background-image="sectionTwo.image_url"></div>
                                <span v-if="sectionTwo.url">
                                    <router-link :to="sectionTwo.url">
                                        <div class="hover-text-container hover-scale">
                                            <div class="hover-text">
                                                <h2>{{ sectionTwo.name }}</h2>
                                                <h4>{{ sectionTwo.description }}</h4>
                                                <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                            </div>
                                        </div>
                                    </router-link>
                                </span>
                                <span v-if="!sectionTwo.url">
                                    <a :href="sectionTwo.image_url" :data-lightbox="sectionTwo.name">
                                        <div  class="hover-text-container hover-scale">
                                            <div class="hover-text">
                                                <h2>{{ sectionTwo.name }}</h2>
                                                <h4>{{ sectionTwo.description }}</h4>
                                                <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                            </div>
                                        </div>
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-4" v-if="sectionThree">
                            <div class="hover-container">
                                <div class="hover-image" v-lazy:background-image="sectionThree.image_url"></div>
                                <span v-if="sectionThree.url">
                                    <router-link :to="sectionThree.url">
                                        <div class="hover-text-container hover-scale">
                                            <div class="hover-text">
                                                <h2>{{ sectionThree.name }}</h2>
                                                <h4>{{ sectionThree.description }}</h4>
                                                <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                            </div>
                                        </div>
                                    </router-link>
                                </span>
                                <span v-if="!sectionThree.url">
                                    <a :href="sectionThree.image_url" :data-lightbox="sectionThree.name">
                                        <div class="hover-text-container hover-scale">
                                            <div class="hover-text">
                                                <h2>{{ sectionThree.name }}</h2>
                                                <h4>{{ sectionThree.description }}</h4>
                                                <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                            </div>
                                        </div>
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-4 hidden-mobile" v-if="sectionFour">
                            <div class="hover-container">
                                <div class="hover-image" v-lazy:background-image="sectionFour.image_url"></div>
                                <span v-if="sectionFour.url">
                                    <router-link :to="sectionFour.url">
                                        <div class="hover-text-container hover-scale">
                                            <div class="hover-text">
                                                <h2>{{ sectionFour.name }}</h2>
                                                <h4>{{ sectionFour.description }}</h4>
                                                <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                            </div>
                                        </div>
                                    </router-link>
                                </span>
                                <span v-if="!sectionFour.url">
                                    <a :href="sectionFour.image_url" :data-lightbox="sectionFour.name">
                                        <div class="hover-text-container hover-scale">
                                            <div class="hover-text">
                                                <h2>{{ sectionFour.name }}</h2>
                                                <h4>{{ sectionFour.description }}</h4>
                                                <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                            </div>
                                        </div>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="image-row">
                    <div class="hover-container" v-if="sectionFive">
                        <div class="hover-image max-height" v-lazy:background-image="sectionFive.image_url"></div>
                        <span v-if="sectionFive.url">
                            <router-link :to="sectionFive.url">
                                <div class="hover-text-container hover-scale">
                                    <div class="hover-text">
                                        <h2>{{ sectionFive.name }}</h2>
                                        <h4>{{ sectionFive.description }}</h4>
                                        <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                    </div>
                                </div>
                            </router-link>
                        </span>
                        <span v-if="!sectionFive.url">
                            <a :href="sectionFive.image_url" :data-lightbox="sectionFive.name">
                                <div class="hover-text-container hover-scale">
                                    <div class="hover-text">
                                        <h2>{{ sectionFive.name }}</h2>
                                        <h4>{{ sectionFive.description }}</h4>
                                        <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                    </div>
                                </div>
                            </a>
                        </span>
                    </div>
                </div>
                <div class="page-container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="story-content" v-if="currentPage" v-html="currentPage.body"></div>
                        </div>
                    </div>
                </div>
                <div class="image-container">
                    <div class="row image-row">
                        <div class="col-sm-6">
                            <div class="hover-container" v-if="sectionSix">
                                <div class="hover-image" v-lazy:background-image="sectionSix.image_url"></div>
                                <span v-if="sectionSix.url">
                                    <router-link :to="sectionSix.url">
                                        <div class="hover-text-container hover-scale">
                                            <div class="hover-text">
                                                <h2>{{ sectionSix.name }}</h2>
                                                <h4>{{ sectionSix.description }}</h4>
                                                <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                            </div>
                                        </div>
                                    </router-link>
                                </span>
                                <span v-if="!sectionSix.url">
                                    <a :href="sectionSix.image_url" :data-lightbox="sectionSix.name">
                                        <div class="hover-text-container hover-scale">
                                            <div class="hover-text">
                                                <h2>{{ sectionSix.name }}</h2>
                                                <h4>{{ sectionSix.description }}</h4>
                                                <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                            </div>
                                        </div>
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="hover-container" v-if="sectionSeven">
                                <div class="hover-image" v-lazy:background-image="sectionSeven.image_url"></div>
                                <span v-if="sectionSeven.url">
                                    <router-link :to="sectionSeven.url">
                                        <div class="hover-text-container hover-scale">
                                            <div class="hover-text">
                                                <h2>{{ sectionSeven.name }}</h2>
                                                <h4>{{ sectionSeven.description }}</h4>
                                                <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                            </div>
                                        </div>
                                    </router-link>
                                </span>
                                <span v-if="!sectionSeven.url">
                                    <a :href="sectionSeven.image_url" :data-lightbox="sectionSeven.name">
                                        <div class="hover-text-container hover-scale">
                                            <div class="hover-text">
                                                <h2>{{ sectionSeven.name }}</h2>
                                                <h4>{{ sectionSeven.description }}</h4>
                                                <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                            </div>
                                        </div>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row image-row">
                        <div class="col-md-12">
                            <div class="hover-container" v-if="sectionEight">
                                <div class="hover-image mid-height" v-lazy:background-image="sectionEight.image_url"></div>
                                <span v-if="sectionEight.url">
                                    <div class="hover-text-container hover-scale">
                                        <div class="hover-text">
                                            <h2>{{ sectionEight.name }}</h2>
                                            <h4>{{ sectionEight.description }}</h4>
                                            <router-link :to="sectionEight.url">
                                                <h5>Learn More&nbsp;
                                                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                                                </h5>
                                            </router-link>
                                        </div>
                                    </div>
                                </span>
                                <span v-if="!sectionEight.url"> 
                                    <a :href="sectionEight.image_url" :data-lightbox="sectionEight.name">
                                        <div class="hover-text-container hover-scale">
                                            <div class="hover-text">
                                                <h2>{{ sectionEight.name }}</h2>
                                                <h4>{{ sectionEight.description }}</h4>
                                                <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                            </div>
                                        </div>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <page-breadcrumb></page-breadcrumb>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "jquery", "vue-meta", "lightbox", "vue-lazy-load"], function (Vue, Vuex, jQuery, Meta, Lightbox, VueLazyload) {
        Vue.use(Meta);
        Vue.use(Lightbox);
        Vue.use(VueLazyload);
        return Vue.component("holiday-event-component", {
            template: template, // the variable template will be injected
            data: function () {
                return {
                    dataLoaded: false,
                    currentPage: null,
                }
            },
            created() {
                this.loadData().then(response => {
                    this.currentPage = response[1].data;
                    this.dataLoaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'repos',
                    'findRepoByName'
                ]),
                images() {
                    return this.findRepoByName("Special Exhibition").images
                },
                sectionOne() {
                    var sectionID = 35548
                    return _.find(this.images, function (o) { return o.id === sectionID; })
                },
                sectionTwo() {
                    var sectionID = 35549
                    return _.find(this.images, function (o) { return o.id === sectionID; })
                },
                sectionThree() {
                    var sectionID = 35550
                    return _.find(this.images, function (o) { return o.id === sectionID; })
                },
                sectionFour() {
                    var sectionID = 35551
                    return _.find(this.images, function (o) { return o.id === sectionID; })
                },
                sectionFive() {
                    var sectionID = 35552
                    return _.find(this.images, function (o) { return o.id === sectionID; })
                },
                sectionSix() {
                    var sectionID = 35553
                    return _.find(this.images, function (o) { return o.id === sectionID; })
                },
                sectionSeven() {
                    var sectionID = 35554
                    return _.find(this.images, function (o) { return o.id === sectionID; })
                },
                sectionEight() {
                    var sectionID = 35555
                    return _.find(this.images, function (o) { return o.id === sectionID; })
                }
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "repos"), this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/northpark-art-special-exhibition.json"})]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                }
            }
        });
    });
</script>