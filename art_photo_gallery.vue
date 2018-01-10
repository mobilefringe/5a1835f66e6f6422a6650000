<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-60"></div>
        <div class="row margin-30">
            <div class="col-md-6">
                <div class="category-select-container">
                    <v-select v-model="selected" :options="categoryOptions" :searchable="false" class="category-select" :on-change="selectCategory()"></v-select>    
                </div>
            </div>
            <div class="col-md-6">
                <div class="art-download-container">
                    <a href="" target="_blank">
                        <h5 class="pull-right">Download Art Tour Map</h5>
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
                    <router-link :to="{ name: 'artDetails', params: { id: item.slug }}">
                        <div class="gallery-image-container">
                            <div class="gallery-image" v-bind:style="{ backgroundImage: 'url(' + getMainImage(item) + ')' }"></div>
                            <!--<img :src="getMainImage(item)" />-->
                        </div>
                        <div class="gallery-content-container">
                            <h5 class="art-gallery-title">{{item.name}}</h5>  
                            <h5 class="art-gallery-artist" v-html="item.description"></h5>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i> Photo Gallery</p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "v-select"], function(Vue, moment, tz, VueMoment, Meta, vSelect) {
        Vue.use(Meta);

        return Vue.component("art-photo-gallery-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                    selected: "Sort Gallery",
                    currentSelection: null,
                    categoryOptions: [
                        {'label':'By Title', 'value': 'title'},
                        {'label':'Artist Name', 'value': 'artist'}
                    ],
                }
            },
            mounted () {
                this.currentSelection = this.pois;
                this.artMapDownload
                console.log(this.artMapDownload)
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                },
                pois() {
                    var name = "Art Tour";
                    var pois = this.$store.getters.findPointOfInterest(name)
                    var sortByName = _.orderBy(pois.locations, function(o) { return o.name });
                    return sortByName
                },
                sortByArtist() {
                    var name = "Art Tour";
                    var pois = this.$store.getters.findPointOfInterest(name)
                    var sortByArtist = _.orderBy(pois.locations, function(o) { return o.description });
                    return sortByArtist
                },
                artMapDownload() {
                    var repo = _.filter(this.$store.state.results.repos, function(o) { return o.name == "Art Tour Map Download" })
                    console.log(repo)
                    var repo_images = repo[0].images
                    return repo_images
                },
            },
            methods: {
                selectCategory(){
                    if(this.selected.value == "title"){
                        this.currentSelection = this.pois;
                    } else if (this.selected.value == "artist") {
                        this.currentSelection = this.sortByArtist;
                    } else {
                        this.currentSelection = this.pois;
                    }
                },
                getMainImage(item){
                    main_image = "";
                    if(item.items != null){
                        var items = item.items
                        if(items != null){
                            var images = items[0].images
                            if(images != null){
                                var main_image = images[0].image_url
                                return main_image
                            } else {
                                return "http://placehold.it/300x300"
                            }
                        }
                    } 
                }
            },
        });
    });
</script>