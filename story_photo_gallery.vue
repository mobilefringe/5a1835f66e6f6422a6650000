<template>
    <div> <!-- without an outer container div this component template will not render -->
        <np-loader v-if="!dataLoaded"></np-loader>
        <transition name="fade">
            <div v-if="dataLoaded" class="page-container" v-cloak>
                <div class="margin-60"></div>
                <div class="row margin-30">
                    <div class="col-md-6">
                        <div class="category-select-container">
                            <v-select 
                                v-model="selected" 
                                :options="categoryOptions" 
                                :searchable="false" 
                                class="category-select" 
                                :on-change="selectCategory()"
                            ></v-select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="launch-gallery-container" v-if="currentSelection" v-for="(item, index) in currentSelection" :class="{ 'active': index === 0 }">
                            <a :href="item.image_url" :data-lightbox="currentSelection">
                                <h5>Launch Slideshow</h5>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="row margin-60">
                    <div class="col-md-12">
                        <p v-if="!currentSelection">Sorry, there are currently no images to display.</p>
                    </div>
                    <div class="col-sm-4 col-md-3" v-if="currentSelection" v-for="item in currentSelection">
                        <div class="gallery-item-container">
                            <a :href="item.image_url" :data-lightbox="item">
                                <div class="gallery-image-container">
                                    <img v-lazy="item.image_url" />
                                </div>
                                <div class="gallery-content-container" v-if="item.name">
                                    <h5 class="art-gallery-title">{{item.name}}</h5>
                                    <h5 class="art-gallery-artist">{{item.description}}</h5>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <page-breadcrumb></page-breadcrumb>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "jquery", "vue-meta", "lightbox", "vue-lazy-load"], function (Vue, Vuex, jQuery, Meta, Lightbox, VueLazyload) {
        Vue.use(Meta);
        Vue.use(Lightbox);
        Vue.use(VueLazyload);
        return Vue.component("story-photo-gallery-component", {
            template: template, // the variable template will be injected
            data: function () {
                return {
                    dataLoaded: false,
                    selected: "History",
                    currentSelection: null,
                    categoryOptions: [
                        { 'label': 'History', 'value': 'history' },
                        { 'label': '50th Anniversary', 'value': 'anniversary' },
                        { 'label': 'Event', 'value': 'event' },
                        { 'label': 'Landscaping', 'value': 'landscaping' },
                        { 'label': 'Architecture', 'value': 'architecture' },
                    ],
                }
            },
            created() {
                this.loadData().then(response => {
                    this.dataLoaded = true;
                    this.currentSelection = this.historyGallery;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'findRepoByName'
                ]),
                historyGallery() {
                    return this.findRepoByName("history slideshow").images
                },
                anniversaryGallery() {
                    // Need to create repo and add images
                    // return this.findRepoByName(" ").images
                },
                eventGallery() {
                    // Need to create repo and add images
                    // return this.findRepoByName(" ").images
                },
                landscapingGallery() {
                    return this.findRepoByName("landscaping slideshow").images
                },
                architectureGallery() {
                    return this.findRepoByName("architecture slideshow").images
                },
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "repos")]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                selectCategory() {
                    if (this.selected.value == "history") {
                        this.currentSelection = this.historyGallery;
                    } else if (this.selected.value == "anniversary") {
                        this.currentSelection = this.anniversaryGallery;
                    } else if (this.selected.value == "event") {
                        this.currentSelection = this.eventGallery;
                    } else if (this.selected.value == "landscaping") {
                        this.currentSelection = this.landscapingGallery;
                    } else if (this.selected.value == "architecture") {
                        this.currentSelection = this.architectureGallery;
                    }
                }
            }
        });
    });
</script>