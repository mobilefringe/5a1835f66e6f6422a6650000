<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="row">
            <div class="col-md-8">
                <h2>Shopping Centre Hours</h2>
                <p>Department store, restaurant, theatre, spa, and holiday hours may vary.</p>
                <ul class="hours-list">
                    <li v-for="hour in hours">
                       {{day_of_the_week(hour.day_of_week)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                        </span>
                    </li>
                </ul>
                <hr>
                <h2>Management Office Hours</h2>
                <div class="hours-management" v-html="currentPage.body"></div>
                <hr>
                <h2>AMC Northpark 15</h2>
                <div class="hours-amc">
                    <router-link tag="p" to="" active-class="active" exact>
                        <a class="details-link">View Showtimes <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                    </router-link>
                    <router-link tag="p" to="" active-class="active" exact>
                        <a class="details-link">View More <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                    </router-link>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-6">
                        <h2>Restaurant Hours</h2>
                        <p>{{ selected }}</p>
                        <!-- Hours -->
                        <ul class="hours-list">
                            <li v-for="hour in hours">
                               {{day_of_the_week(hour.day_of_week)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <select class="hours-dine-select" v-model="selected"> <!-- @change="changeItem($event)"  -->
                            <option selected value="">Select a Restaurant</option>
                            <option v-for="restaurant in restaurants" v-bind:value="restaurant.id">{{ restaurant.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <h5>Holiday Hours</h5>
                <router-link tag="p" to="" active-class="active" exact>
                    <a class="details-link">View Detailed Hours <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                </router-link>
                <h5>Find Us</h5>
                <p>
                    {{property.name}}<br/>
                    {{property.address1}}<br/>
                    {{property.city}}, {{property.province_state}} {{property.postal_code}}<br/>
                    {{property.contact_phone}}
                </p>
                <p>Northpark Center Concierge</p>
                <router-link to="" active-class="active" exact>
                    <a class="details-link">Get Directions <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs></p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("hours-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    currentPage: null,
                    selected: "Select a Restaurant"
                }
            },
            mounted () {
                this.restaurant
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-management-hours" + ".json"}).then(response => {
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
