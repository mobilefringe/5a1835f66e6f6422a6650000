<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row">
            <div class="col-md-8">
                <h2>Shopping Centre Hours</h2>
                <p>Department store, restaurant, theatre, spa, and holiday hours may vary.</p>
                <ul class="hours-list">
                    <li v-for="hour in hours">
                       {{day_of_the_week(hour.day_of_week)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                        
                    </li>
                </ul>
                <hr>
                <h2>Management Office Hours</h2>
                <div class="hours-management" v-if="currentPage" v-html="currentPage.body"></div>
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
                <div class="row restaurant-hours-row">
                    <div class="col-md-6">
                        <h2 class="hours-restaurant-title">Restaurant Hours</h2>
                        <p v-if="!storeName">Please select a Store</p>
                        <h4 v-if="storeName" class="hours-store-name">{{ storeName }}</h4>
                        <!-- Hours -->
                        <ul class="restaurant-hours-list">
                            <li v-for="hour in storeHoursById">
                               {{day_of_the_week(hour.day_of_week)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <div class="category-select-container right">
                            <v-select v-model="selected" :options="categoryOptions" :searchable="false" class="category-select" :on-change="selectCategory()"></v-select>    
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="sidebar">
                    <div class="sidebar-container">
                        <h5>Holiday Hours</h5>
                        <router-link tag="p" to="" active-class="active" exact>
                            <a class="details-link">View Detailed Hours <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                        </router-link>
                    </div>
                    <div class="sidebar-container">
                        <h5>Find Us</h5>
                        <p class="uppercase">
                            {{property.name}}<br>
                            {{property.address1}}<br>
                            {{property.city}}, {{property.province_state}} {{property.postal_code}}<br>
                            {{property.contact_phone}}
                        </p>
                        <p class="uppercase">
                            Northpark Center Concierge<br>
                            {{property.contact_fax}}
                        </p>
                    </div>
                    <div class="sidebar-container">
                        <a class="details-link" href="https://www.google.com/maps/place/NorthPark+Center/@32.868225,-96.773204,15z/data=!4m5!3m4!1s0x0:0x95fc10ba98f7aad4!8m2!3d32.8680671!4d-96.7735128?hl=en-US" target="_blank">Get Directions <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}} <i class="fa fa-angle-right" aria-hidden="true"></i> <breadcrumbs>{{ breadcrumb }}</breadcrumbs></p>
            </div>
        </div>
    </div>
</template>

<script>

define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vue-breadcrumbs', "v-select"], function (Vue, moment, tz, VueMoment, Meta, VueBreadcrumbs, vSelect) {
    Vue.use(Meta);
    Vue.use(VueBreadcrumbs);

    return Vue.component("hours-component", {
        template: template, // the variable template will be injected
        data: function data() {
            return {
                breadcrumb: null,
                currentPage: null,
                selected: "Select a Restaurant",
                categoryOptions: null,
                storeName: "",
                storeHoursById: []
            };
        },
        mounted: function mounted() {
            this.restaurant, this.restaurantData;
            this.findStoreById;
            this.categoryOptions = this.restaurantData;
        },
        beforeRouteEnter: function beforeRouteEnter(to, from, next) {
            next(function (vm) {
                // access to component instance via `vm`
                vm.$store.dispatch('LOAD_PAGE_DATA', { url: vm.property.mm_host + "/pages/northpark-management-hours.json" }).then(function (response) {
                    vm.currentPage = response.data;
                }, function (error) {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    vm.$router.replace({ name: '404' });
                });
            });
        },
        beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
            var _this = this;

            this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host + "/pages/northpark-management-hours.json" }).then(function (response) {
                _this.currentPage = response.data;
            }, function (error) {
                console.error("Could not retrieve data from server. Please check internet connection and try again.");
                _this.$router.replace({ name: '404' });
            });
        },
        computed: {
            property: function property() {
                return this.$store.getters.getProperty;
            },
            timezone: function timezone() {
                return this.$store.getters.getTimezone;
            },
            hours: function hours() {
                var hours = _.filter(this.$store.state.results.hours, function (o) {
                    return o.store_ids == null && o.is_holiday == 0;
                });
                return hours;
            },
            restaurants: function restaurants() {
                var stores_by_category = this.$store.getters.storesByCategoryName;
                var cafes = stores_by_category["NorthPark Cafés"];
                var restaurants = stores_by_category["Restaurants / Beverages"];
                var specialty = stores_by_category["Specialty Foods"];
                var all_restaurants = _.concat(cafes, restaurants, specialty);
                var filtered_restaurants = _.uniqBy(all_restaurants, function (o) {
                    return o.name;
                });
                return filtered_restaurants;
            },
            restaurantData: function restaurantData() {
                var restaurantData = [];
                _.forEach(this.restaurants, function (value, key) {
                    var name = value.name;
                    var id = value.id;
                    if (name != null && id != null) {
                        var object = {
                            'label': name,
                            'value': id
                        };
                        restaurantData.push(object);
                    }
                });
                return restaurantData;
            },
            findStoreById: function findStoreById() {
                return this.$store.getters.findStoreById;
            },
            findHourById: function findHourById() {
                return this.$store.getters.findHourById;
            }
        },
        methods: {
            day_of_the_week: function day_of_the_week(val_day) {
                weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                return weekday[val_day];
            },
            selectCategory: function selectCategory() {
                if (this.selected != "Select a Restaurant") {
                    var vm = this;
                    var store_info = vm.findStoreById(this.selected.value);
                    var store_name = store_info.name;
                    this.storeName = store_name;
                    var storeHours = [];
                    _.forEach(store_info.store_hours, function (value, key) {
                        storeHours.push(vm.findHourById(value));
                    });
                    this.storeHoursById = storeHours;
                }
            }
        }
    });
});</script>