<template>
    <div class="page-container"> <!-- without an outer container div this component template will not render -->
        <div class="margin_60"></div>
        <div class="row">
            <div class="col-md-4">
                <v-select v-model="selected" 
                    :options="categoryOptions" 
                    :searchable="false" 
                    
                    class="category-select" >
                </v-select>        
            </div>
            <div class="col-md-8">
                <svg-map v-bind:svg-map-url="getSVGurl"></svg-map>
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
                    categoryOptions: null,
                    listMode: "alphabetical"
                }
            },
            created (){
                window.Raphael = Raphael; // our mapSvg plugin is stupid and outdated. need this hack to tie Raphael to window object (global variable)
            },
            mounted () {
                console.log(this.getSVGurl)
            },
            methods: {
                changeMode (mode) {
                    this.listMode = mode;
                },
                updateSVGMap (map) {
                    this.map = map;
                },
                dropPin(store) {
                    this.svgMapRef.hideMarkers();
                    console.log(store);
                    this.svgMapRef.addMarker(store,'//codecloud.cdn.speedyrails.net/sites/589e308f6e6f641b9f010000/image/png/1484850466000/show_pin.png');
                    this.svgMapRef.setViewBox(store)
                }
            },
            computed: {
                property (){
                    return this.$store.getters.getProperty;
                },
                allCategories() {
                    return this.$store.getters.processedCategories;
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