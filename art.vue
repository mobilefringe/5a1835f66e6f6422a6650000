<template>
    <div class=""> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <img src="http://via.placeholder.com/1920x640" alt="" />
        <div class="page-container">
            <div class="row">
                <div class="col-md-12">
                    <!-- QUOTE -->
                    <h1 class="art-quote">NORTHPARK CENTER HAS A LONG AND GREAT TRADITION OF EXHIBITING SIGNIFICANT CONTEMPORARY ARTWORK, AND I THINK IT IS WONDERFUL THAT THE TRADITION CONTINUES INTO THE PRESENT.</h1>
                    <p class="art-quote-subtext">JOEL SHAPIRO</p>
                </div>
            </div>
            <div class="row image-row">
                <div class="col-md-4">
                    <img src="http://via.placeholder.com/308x410" alt="" />
                </div>
                <div class="col-md-4">
                    <img src="http://via.placeholder.com/308x410" alt="" />
                </div>
                <div class="col-md-4">
                    <img src="http://via.placeholder.com/308x410" alt="" />
                </div>
            </div>
        </div>
        <div class="image-row">
            <img src="http://via.placeholder.com/1920x640" alt="" />
        </div>
        <div class="page-container">
            <div class="row">
                <div class="col-md-12">
                    <div class="hours-management" v-html="currentPage.body"></div>
                </div>
            </div>
            <div class="row image-row">
                <div class="col-md-6">
                    <img src="http://via.placeholder.com/468x410" alt="" />
                </div>
                <div class="col-md-6">
                    <img src="http://via.placeholder.com/468x410" alt="" />
                </div>
            </div>
            <div class="row image-row">
                <div class="col-md-12">
                    <img src="http://via.placeholder.com/960x530" alt="" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("art-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    currentPage: null,
                }
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-about-the-collection" + ".json"}).then(response => {
                        vm.currentPage = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });
                })
            },
            // beforeRouteUpdate (to, from, next) {
            //     this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-management-hours.json"}).then(response => {
            //         this.currentPage = response.data;
            //         console.log(this.currentPage);
            //     }, error => {
            //         console.error("Could not retrieve data from server. Please check internet connection and try again.");
            //         this.$router.replace({ name: '404'});
            //     });
            // },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
                hours(){
                    var hours = _.filter(this.$store.state.results.hours, function(o) { return o.store_ids==null && o.is_holiday==0 })
                    return hours;
                },
                restaurants(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var cafes = stores_by_category["NorthPark Cafés"]
                    var restaurants = stores_by_category["Restaurants / Beverages"]
                    var specialty = stores_by_category["Specialty Foods"]
                    var all_restaurants = _.concat(cafes, restaurants, specialty)
                    var filtered_restaurants = _.uniqBy(all_restaurants, function(o){ return o.name; })
                    return filtered_restaurants
                }
            },
            methods: {
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                },
                changeItem(event) {
                    this.selected = `${event.target.value}`
                    console.log("I've changed")
                    console.log(this.selected)
                    
                    // var store_id = this.${event.target.value}
                    console.log(store_id)
                }
            }
        });
    });
</script>
