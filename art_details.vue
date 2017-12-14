<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row" v-if="currentPoint">
            <div class="col-md-12 margin-60">
                <slick v-if="currentDetails" ref="slick" :options="slickOptions">
                    <div v-for="asset in storeAssets" >
                        <img :src="asset.url" alt="">
                    </div>
                </slick>
            </div>
            <div class="col-md-8">
                <div class="details-store-info">
                    <h2 class="details-store-name">{{currentPoint.name}}</h2>
                    <p class="details-description">{{currentPoint.items[0].description}}</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="sidebar">
                    <div class="sidebar-container" v-if="currentPoint">
                        <h5></h5>
                        <p>This content needs to be added</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">
                    <span>{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;</span>
                    <breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;
                    <span v-if="currentPoint">{{currentPoint.name }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue!vue-slick"], function(Vue, moment, tz, VueMoment, Meta, slick) {
        Vue.use(Meta);
        
        return Vue.component("art-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentPoint: null,
                    
                    currentDetails: null,
                    isDine: false,
                    isNewStore: false,
                    storeAssets: [],
                    promotions : [],
                    hours: [],
                    slickOptions: {
                        arrows: true,
                        autoplay: true,
                        cssEase: 'linear',
                        dots: false,
                        // fade: true,
                        infinite: true,
                        slidesToShow: 1,
                        speed: 1000,
                        // prevArrow: '.prev',
                        // nextArrow: '.next'
                    }
                }
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    var poiName = "Art Tour";
                    vm.currentPoint = vm.findPointOfInterestBySlug(poiName, to.params.id);
                    console.log(vm.currentPoint)
                    if (vm.currentPoint === null || vm.currentPoint === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate(to, from, next) {
                var poiName = "Art Tour";
                this.currentPoint = this.findPointOfInterestBySlug(poiName, to.params.id);
                console.log(this.currentPoint)
                if (this.currentPoint === null || this.currentPoint === undefined){
                    this.$router.replace({ name: '404'});
                }
            },
            watch: {
                currentPoint: function() {
                    console.log(this.currentPoint);
                    var vm = this;
                    var images = [];
                    if(this.currentStore.assets != null){
                        _.forEach(this.currentDetails.store_files, function(value, key) {
                            value.url = "https://www.mallmaverick.com" + value.url 
                            images.push(value);
                        });
                        this.storeAssets = images; 
                    }
                }
            },
            computed: {
                findPointOfInterestBySlug() {
                    return this.$store.getters.findPointOfInterestBySlug;
                },
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                },
            },
            methods: {
                
            }
        });
    });
</script>