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
                                    <i class="fa fa-quote-left fa-3x fa-pull-left" aria-hidden="true"></i>
                                    <i class="fa fa-quote-right fa-3x fa-pull-right" aria-hidden="true"></i>
                                    <h1 class="art-quote">{{ sectionOne.description }}</h1>
                                    <p class="art-quote-subtext">-{{ sectionOne.name }}</p>
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
                                <div v-if="sectionTwo.url" class="hover-text-container hover-scale">
                                    <div class="hover-text">
                                        <h2>{{ sectionTwo.name }}</h2>
                                        <h4>{{ sectionTwo.description }}</h4>
                                        <router-link :to="sectionTwo.url">
                                            <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                        </router-link>
                                    </div>
                                </div>
                                <div v-if="!sectionTwo.url" class="hover-text-container hover-scale">
                                    <div class="hover-text">
                                        <h2>{{ sectionTwo.name }}</h2>
                                        <h4>{{ sectionTwo.description }}</h4>
                                        <a :href="sectionTwo.image_url" :data-lightbox="sectionTwo.name">
                                            <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-4" v-if="sectionThree">
                            <div class="hover-container">
                                <div class="hover-image" v-lazy:background-image="sectionThree.image_url"></div>
                                <div v-if="sectionThree.url" class="hover-text-container hover-scale">
                                    <div class="hover-text">
                                        <h2>{{ sectionThree.name }}</h2>
                                        <h4>{{ sectionThree.description }}</h4>
                                        <router-link :to="sectionThree.url">
                                            <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                        </router-link>
                                    </div>
                                </div>
                                <div v-if="!sectionThree.url" class="hover-text-container hover-scale">
                                    <div class="hover-text">
                                        <h2>{{ sectionThree.name }}</h2>
                                        <h4>{{ sectionThree.description }}</h4>
                                        <a :href="sectionThree.image_url" :data-lightbox="sectionThree.name">
                                            <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 hidden-mobile" v-if="sectionFour">
                            <div class="hover-container">
                                <div class="hover-image" v-lazy:background-image="sectionFour.image_url"></div>
                                <div v-if="sectionFour.url" class="hover-text-container hover-scale">
                                    <div class="hover-text">
                                        <h2>{{ sectionFour.name }}</h2>
                                        <h4>{{ sectionFour.description }}</h4>
                                        <router-link :to="sectionFour.url">
                                            <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                        </router-link>
                                    </div>
                                </div>
                                <div v-if="!sectionFour.url" class="hover-text-container hover-scale">
                                    <div class="hover-text">
                                        <h2>{{ sectionFour.name }}</h2>
                                        <h4>{{ sectionFour.description }}</h4>
                                        <a :href="sectionFour.image_url" :data-lightbox="sectionFour.name">
                                            <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="image-row">
                    <div class="hover-container" v-if="sectionFive">
                        <div class="hover-image max-height" v-lazy:background-image="sectionFive.image_url"></div>
                        <div v-if="sectionFive.url" class="hover-text-container hover-scale">
                            <div class="hover-text">
                                <h2>{{ sectionFive.name }}</h2>
                                <h4>{{ sectionFive.description }}</h4>
                                <router-link :to="sectionFive.url">
                                    <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                </router-link>
                            </div>
                        </div>
                        <div v-if="!sectionFive.url" class="hover-text-container hover-scale">
                            <div class="hover-text">
                                <h2>{{ sectionFive.name }}</h2>
                                <h4>{{ sectionFive.description }}</h4>
                                <a :href="sectionFive.image_url" :data-lightbox="sectionFive.name">
                                    <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                </a>
                            </div>
                        </div>
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
                                <div v-if="sectionSix.url" class="hover-text-container hover-scale">
                                    <div class="hover-text">
                                        <h2>{{ sectionSix.name }}</h2>
                                        <h4>{{ sectionSix.description }}</h4>
                                        <router-link :to="sectionSix.url">
                                            <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                        </router-link>
                                    </div>
                                </div>
                                <div v-if="!sectionSix.url" class="hover-text-container hover-scale">
                                    <div class="hover-text">
                                        <h2>{{ sectionSix.name }}</h2>
                                        <h4>{{ sectionSix.description }}</h4>
                                        <a :href="sectionSix.image_url" :data-lightbox="sectionSix.name">
                                            <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="hover-container" v-if="sectionSeven">
                                <div class="hover-image" v-lazy:background-image="sectionSeven.image_url"></div>
                                <div v-if="sectionSeven.url" class="hover-text-container hover-scale">
                                    <div class="hover-text">
                                        <h2>{{ sectionSeven.name }}</h2>
                                        <h4>{{ sectionSeven.description }}</h4>
                                        <router-link :to="sectionSeven.url">
                                            <h5>Learn More&nbsp;
                                                <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                                            </h5>
                                        </router-link>
                                    </div>
                                </div>
                                <div v-if="!sectionSeven.url" class="hover-text-container hover-scale">
                                    <div class="hover-text">
                                        <h2>{{ sectionSeven.name }}</h2>
                                        <h4>{{ sectionSeven.description }}</h4>
                                        <a :href="sectionSeven.image_url" :data-lightbox="sectionSeven.name">
                                            <h5>View Larger&nbsp;
                                                <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                                            </h5>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row image-row">
                        <div class="col-md-12">
                            <div class="hover-container" v-if="sectionEight">
                                <div class="hover-image mid-height" v-lazy:background-image="sectionEight.image_url"></div>
                                <div v-if="sectionEight.url" class="hover-text-container hover-scale">
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
                                <div v-if="!sectionEight.url" class="hover-text-container hover-scale">
                                    <div class="hover-text">
                                        <h2>{{ sectionEight.name }}</h2>
                                        <h4>{{ sectionEight.description }}</h4>
                                        <a :href="sectionEight.image_url" :data-lightbox="sectionEight.name">
                                            <h5>View Larger&nbsp;
                                                <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                                            </h5>
                                        </a>
                                    </div>
                                </div>
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
    return Vue.component("art-component", {
      template: template, // the variable template will be injected
      data: function () {
        return {
          dataLoaded: false,
          currentPage: null
        }
      },
      created() {
        this.loadData().then(response => {
          this.currentPage = response[1].data;
          this.dataLoaded = true;
        });
        /*
        this.$store.dispatch('LOAD_PAGE_DATA', {
          url: this.property.mm_host + "/pages/northpark-about-the-collection.json"
        }).then(response => {
          this.currentPage = response.data;
        }, error => {
          console.error(
            "Could not retrieve data from server. Please check internet connection and try again.");
          this.$router.replace({
            name: '404'
          });
        });
        */
      },
      computed: {
        ...Vuex.mapGetters([
          'property',
          'findRepoByName',
          'repos'
        ]),
        images() {
          return this.findRepoByName("Art Collection Overview").images
        },
        sectionOne() {
          var sectionID = 35507
          return _.find(this.images, function (o) {
            return o.id === sectionID;
          })
        },
        sectionTwo() {
          var sectionID = 35508
          return _.find(this.images, function (o) {
            return o.id === sectionID;
          })
        },
        sectionThree() {
          var sectionID = 35509
          return _.find(this.images, function (o) {
            return o.id === sectionID;
          })
        },
        sectionFour() {
          var sectionID = 35510
          return _.find(this.images, function (o) {
            return o.id === sectionID;
          })
        },
        sectionFive() {
          var sectionID = 35522
          return _.find(this.images, function (o) {
            return o.id === sectionID;
          })
        },
        sectionSix() {
          var sectionID = 35523
          return _.find(this.images, function (o) {
            return o.id === sectionID;
          })
        },
        sectionSeven() {
          var sectionID = 35524
          return _.find(this.images, function (o) {
            return o.id === sectionID;
          })
        },
        sectionEight() {
          var sectionID = 35525
          return _.find(this.images, function (o) {
            return o.id === sectionID;
          })
        }
      },
      methods: {
        loadData: async function () {
          try {
            let results = await Promise.all([this.$store.dispatch("getData", "repos"), this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/northpark-about-the-collection.json"})]);
            return results;
          } catch (e) {
            console.log("Error loading data: " + e.message);
          }
        }
      }
    });
  });
</script>
