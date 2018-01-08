<template>
    <div class="page-container"> <!-- without an outer container div this component template will not render -->
        <div class="margin-60"></div>
        <div class="row">
            <div class="col-md-4">
                <h5>Store Directory</h5>
                <h2>Select A Category</h2>
                <div class="category-select-container">
                    <v-select v-if="categoryOptions" v-model="selected" 
                        :options="categoryOptions" 
                        :searchable="false" 
                        class="category-select">
                    </v-select>
                </div>
                <div class="store-search-container">
                    <search-component v-model="search" :list="processedStores" :suggestion-attribute="suggestionAttribute" @select="onOptionSelect">
                        <template slot="item" scope="option">
                            <article class="media">
                                <p @click="show_search = !show_search">{{ option.data.name }}</p>
                            </article>
                        </template>
                    </search-component>
                    <i id="store-search-icon" class="fa fa-search" aria-hidden="true"></i>
                </div>
                <div class="storelist-container" v-if="currentSelection">
                    <div v-for="store in currentSelection">
                        <p v-on:click="dropPin(store)">{{store.name}}</p>
                    </div>    
                </div>
                <div class="store-map-download">
                    <a href=""><h5>Download Directory Map</h5></a>
                </div>
                <div>
                    <router-link to="" active-class="active" exact>
                        <a class="details-link">Get Directions <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                    </router-link>
                </div>
            </div>
            <div class="col-md-8">
                <div class="category-select-container">
                    <v-select v-model="floorSelect" :options="floorOptions" :searchable="false" class="category-select"></v-select>    
                </div>
                <svg-map v-bind:svg-map-url="getSVGurl"></svg-map>
            </div>
        </div>
        <div class="margin-60"></div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">
                    <span>{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;</span>
                    <breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;
                    <span>Store Directory</span>
                </p>
            </div>
        </div>
    </div>
</template>
<!--:on-change="selectCategory()"-->
<script>
    define(["Vue", "vue-breadcrumbs", "v-select", "jquery", "Raphael", "mm_mapsvg", "mousewheel", "vue!svg-map"], function(Vue, VueBreadcrumbs, vSelect, $, Raphael, mapSvg, mousewheel, SVGMapComponent) {
        return Vue.component("stores-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                    selected: "Select a Category",
                    categoryOptions: null,
                    suggestionAttribute: 'name',
                    search: '',
                    currentSelection: null,
                    listMode: "alphabetical",
                    floorSelect: "Select a Level",
                    floorOptions: [
                        {'label':'Level One', 'value': 'all_events'},
                        {'label':'Level Two', 'value': 'events'},
                    ],
                }
            },
            created (){
                window.Raphael = Raphael; // our mapSvg plugin is stupid and outdated. need this hack to tie Raphael to window object (global variable)
            },
            mounted () {
                console.log(this.getSVGurl)
                this.categoryOptions = this.allCategories,
                this.currentSelection = this.allStores
            },
            watch: {
                selected: function() {
                    var catName = this.selected.value;
                    var storesByCategory = this.$store.getters.storesByCategoryName
                    var sortedList = _.uniq(storesByCategory[catName]);
                    this.currentSelection = sortedList
                },
                floorSelected: function() {
                    
                }
            },
            methods: {
                changeMode (mode) {
                    this.listMode = mode;
                },
                updateSVGMap (map) {
                    this.map = map;
                },
                dropPin(store) {
                    // this.svgMapRef.hideMarkers();
                    console.log(store);
                    // this.svgMapRef.addMarker(store,'//codecloud.cdn.speedyrails.net/sites/589e308f6e6f641b9f010000/image/png/1484850466000/show_pin.png');
                    // this.svgMapRef.setViewBox(store)
                }
            },
            computed: {
                property (){
                    return this.$store.getters.getProperty;
                },
                allCategories() {
                    var categories = this.$store.getters.processedCategories
                    console.log(categories)
                    var categoryData = [];
                    _.forEach(categories, function(value, key) {
                        if(value.store_ids != null){
                            var name = value.name;
                            var id = value.id;
                            if(name != null && id != null){
                                var object = {
                                    'label': name,
                                    'value': name
                                }
                                categoryData.push(object)
                            }
                        }
                    });
                    return categoryData 
                },
                allStores() {
                    return this.$store.getters.processedStores;
                },
                processedStores() {
                    return this.$store.getters.processedStores;
                },
                getSVGurl () {
                    // return "https://www.mallmaverick.com" + this.property.svgmap_url;
                    return "https://www.mallmaverick.com/system/properties/svgmaps/000/000/056/original/Northpark_-_Map_-_Dec-15-2017.svg?1513376531";
                },
                svgMapRef() {
                    return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
                }
            }
        });
    });
</script>