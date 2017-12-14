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
                <p>Download Art Tour Map</p>
            </div>
        </div>
        <div class="row margin-60">
            <div class="col-md-12">
                <p v-if="!currentSelection">Sorry, there are currently no images to display.</p>    
            </div>
            <div class="col-md-3" v-if="currentSelection" v-for="item in currentSelection">
                <div class="gallery-item-container">
                    <div class="gallery-image-container">
                        <img :src="mainImage" />
                    </div>
                    <div class="gallery-content-container">
                        <h5 class="details-title">{{item.name}}</h5>  
                        <h5 class="details-title">{{item.name}}</h5> <!-- This field needs to be added in the CMS -->
                    </div>
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
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "v-select", "vue-pure-lightbox"], function(Vue, moment, tz, VueMoment, Meta, vSelect, Lightbox) {
        Vue.use(Meta);
        // Vue.use(Lightbox);
        
        return Vue.component("art-photo-gallery-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    selected: "Sort Gallery",
                    currentSelection: null,
                    mainImage: null,
                    categoryOptions: [
                        {'label':'Sort Gallery', 'value': 'title'},
                        {'label':'By Title', 'value': 'title'},
                        {'label':'Artist Name', 'value': 'artist'}
                    ],
                }
            },
            mounted () {
                this.currentSelection = this.pois;
                this.mainImage = this.getMainImage;
                console.log(this.currentSelection)
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                },
                pois() {
                    var alpha =  _.orderBy(this.$store.getters.getPointsOfInterest[0].locations, function(o) { return o.name });
                    return alpha
                    
                },
                sortByArtist() {
                    
                },
                getMainImage(){
                    console.log(this.pois)
                    _.forEach(this.restaurants, function(value, key) {
                        var name = value.name;
                        var id = value.id;
                        if(name != null && id != null){
                            var object = {
                                'label': name,
                                'value': id
                            }
                            restaurantData.push(object)
                        }
                    });
                    return restaurantData 
                }
            },
            methods: {
                selectCategory(){
                    console.log(this.selected)
                    if(this.selected.value == "title"){
                        this.currentSelection = this.pois;
                    } else if (this.selected.value == "artist") {
                        this.currentSelection = this.sortByArtist;
                    } else {
                        this.currentSelection = this.pois;
                    }
                },
            },
        });
    });
</script>
