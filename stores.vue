<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <svg-map :svgMapUrl="getSVGurl"></svg-map>
    </div>
</template>
<script>
    define(["Vue","jquery", "Raphael", "mm_mapsvg","mousewheel", "vue!svg-map"], function(Vue,$, Raphael, mapSvg,mousewheel,SVGMapComponent) {
        return Vue.component("stores-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
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
                getSVGurl () {
                    return "https://www.mallmaverick.com" + this.property.svgmap_url;
                    // return "//www.mallmaverick.com/system/site_images/photos/000/035/014/original/Canyon_Crest_-_Map.svg?1512066588";
                },
                svgMapRef() {
                    return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
                }
            }
        });
    });
</script>