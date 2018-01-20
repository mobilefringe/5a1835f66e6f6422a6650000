<template>
    <div v-if="dataLoaded" class="page-container" v-cloak> <!-- without an outer container div this component template will not render -->
        <div class="margin-42"></div>
        <div class="row">
            <div class="col-md-6">
                <div class="category-select-container">
                    <v-select v-model="selected" :options="categoryOptions" :searchable="false" class="category-select"></v-select> 
                     <!--:on-change="selectCategory()"-->
                </div>
            </div>
            <div class="col-md-6"></div>
        </div>
        <div class="dine-container" v-for="restaurant in currentSelection">
            <div class="row">
                <div class="col-md-12">
                    <div class="dine-image-container">
                        <div class="hover-container">
                            <img v-if="restaurant.image_url" :src="restaurant.image_url" :alt="restaurant.name" />
                            <div class="hover-text-container hover-scale">
                    		    <div class="hover-text">
                    		        <router-link :to="{ name: 'storeDetails', params: { id: restaurant.slug }}" class="dine-link">
                    		            <h5>Visit Store Page <i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                		            </router-link>
                		        </div>
                        	</div>
                        </div>
                    </div> 
                    <div class="dine-content-container">
                        <h2 class="dine-name">{{restaurant.name}}</h2>
                        <router-link :to="{ name: 'storeDetails', params: { id: restaurant.slug }}" class="dine-link">Visit Store Page <i class="fa fa-angle-double-right" aria-hidden="true"></i></router-link>
                        <h5 class="dine-contact-header">Contact</h5>
                        <p>{{restaurant.phone}}</p>
                        <h5>Hours</h5>
                        <ul class="details-hours-list">
                            <li v-if="storeHours(restaurant.store_hours)" v-for="hour in storeHours(restaurant.store_hours)">
                               {{hour.day_of_week | moment("dddd", timezone)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <page-breadcrumb></page-breadcrumb>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "v-select", "vue!page_breadcrumb.vue"], function(Vue, Vuex, moment, tz, VueMoment, Meta, VueBreadcrumbs, vSelect, PageBreadcrumbComponent) {
        return Vue.component("dine-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dataLoaded: false,
                    selected: "Select A Category",
                    currentSelection: null,
                    categoryOptions: [
                        {'label':'All', 'value': 'all_dine'},
                        {'label':'Restaurants', 'value': 'restaurants'},
                        {'label':'NorthPark Cafes', 'value': 'cafes'},
                        {'label':'Coffee & Specialty Foods', 'value': 'specialty'}, 
                    ],
                    dine_stores: [],
                    hours: []
                }
            },
            created(){
                this.loadData().then(response => {
                    this.dataLoaded = true;  
                    this.currentSelection = this.all_dine;
                });
            },
            watch: {
                selected: function() {
                    if(this.selected.value == "all_dine"){
                        this.currentSelection = this.all_dine
                    } else if(this.selected.value == "restaurants"){
                        this.currentSelection = this.restaurants;
                    } else if (this.selected.value == "cafes") {
                        this.currentSelection = this.cafes;
                    } else if (this.selected.value == "specialty"){
                        this.currentSelection = this.specialty;
                    } else {
                        this.currentSelection = this.all_dine
                    }
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'storesByCategoryName',
                    'findHourById'
                ]),
                all_dine: function all_dine(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var cafes = stores_by_category["NorthPark Cafés"]
                    var restaurants = stores_by_category["Restaurants / Beverages"]
                    var specialty = stores_by_category["Specialty Foods"]
                    var all_restaurants = _.concat(cafes, restaurants, specialty)
                    var filtered_restaurants = _.uniqBy(all_restaurants, function (o) { 
                        try{
                            return o.name
                        } catch(e) {
                            
                        }
                    });
                    filtered_restaurants = _.orderBy(filtered_restaurants, function (o) { 
                        try{
                           return o.name
                        } catch(e) {
                            
                        }
                    });
                    return filtered_restaurants
                },
                restaurants(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var restaurants = stores_by_category["Restaurants / Beverages"];
                    var filtered_restaurants = _.uniqBy(restaurants, function(o){ return o.name; })
                    return filtered_restaurants
                },
                cafes(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var cafes = stores_by_category["NorthPark Cafés"]
                    var filtered_restaurants = _.uniqBy(cafes, function(o){ return o.name; })
                    return filtered_restaurants
                },
                specialty(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var specialty = stores_by_category["Specialty Foods"]
                    var filtered_restaurants = _.uniqBy(specialty, function(o){ return o.name; })
                    return filtered_restaurants
                }
            },
            methods: {
                loadData: async function() {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "categories")]);
                    } catch(e) {
                        console.log("Error loading data: " + e.message);    
                    }
                },
                selectCategory(){
                    if(this.selected.value == "all_dine"){
                        this.currentSelection = this.all_dine
                    } else if(this.selected.value == "restaurants"){
                        this.currentSelection = this.restaurants;
                    } else if (this.selected.value == "cafes") {
                        this.currentSelection = this.cafes;
                    } else if (this.selected.value == "specialty"){
                        this.currentSelection = this.specialty;
                    } else {
                        this.currentSelection = this.all_dine
                    }
                },
                storeHours(restaurant_hours){
                    var vm = this;
                    var storeHours = [];
                    _.forEach(restaurant_hours, function(value, key) {
                        storeHours.push(vm.findHourById(value));
                    });
                    return storeHours
                }
            }
        });
    });
</script>
