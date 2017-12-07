<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row">
            <div class="col-md-6"></div>
            <div class="col-md-6">
                <v-select v-model="selected" :options="categoryOptions" :searchable="false" class="blog-select" :on-change="selectCategory()"></v-select>
            </div>
        </div>
        <div class="dine-container" v-for="restaurant in restaurants">
            <div class="row">
                <div class="col-md-9">
                    <img :src="restaurant.image_url" :alt="restaurant.name" />
                </div>
                <div class="col-md-3">
                    <h2 class="dine-name">{{restaurant.name}}</h2>
                    <router-link :to="{ name: 'storeDetails', params: { id: restaurant.slug }}" class="dine-link">Visit Store Page <i class="fa fa-angle-double-right" aria-hidden="true"></i></router-link>
                    <h5 class="dine-contact-header">Contact</h5>
                    <p>{{restaurant.phone}}</p>
                    <h5>Hours</h5>
                    <ul class="">
                        <li v-for="hour in restaurant.hours">
                            <span class="pull-left col-md-6"> 
                               {{day_of_the_week(hour.day_of_week)}}
                            </span>
                            <span class="pull-right col-md-6 text-left">
                                {{hour.open_time | moment("h:mma", timezone)}} - {{hour.close_time | moment("h:mma", timezone)}}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "v-select"], function(Vue, vSelect) {
        return Vue.component("dine-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dine_stores: [],
                    selected: "Select A Category",
                    currentSelection: null,
                    categoryOptions: [
                        {'label':'select A Category', 'value': 'all_dine'},
                        {'label':'Restaurants', 'value': 'restaurants'},
                        {'label':'NorthPark Cafes', 'value': 'cafes'},
                        {'label':'Coffee & Specialty Foods', 'value': 'specialty'}, 
                    ],
                }
            },
            methods: {
                changeMode(mode) {
                    this.listMode = mode;
                },
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                }
            },
            computed: {
                all_dine(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var cafes = stores_by_category["NorthPark Cafés"]
                    var restaurants = stores_by_category["Restaurants / Beverages"]
                    var specialty = stores_by_category["Specialty Foods"]
                    var all_restaurants = _.concat(cafes, restaurants, specialty)
                    var filtered_restaurants = _.uniqBy(all_restaurants, function(o){ return o.name; })
                    return filtered_restaurants
                },
                restaurants(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var restaurants = stores_by_category["Restaurants / Beverages"];
                    return restaurants
                },
                cafes(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var cafes = stores_by_category["NorthPark Cafés"]
                    return cafes
                },
                specialty(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var specialty = stores_by_category["Specialty Foods"]
                    return specialty
                }
            },
            methods: {
                selectCategory(){
                    console.log(this.selected)
                    if(this.selected.value == "restaurants"){
                        this.currentSelection = this.restaurants;
                    } else if (this.selected.value == "cafes") {
                        this.currentSelection = this.cafes;
                    } else if (this.selected.value == "specialty"){
                        this.currentSelection = this.specialty;
                    } else {
                        this.currentSelection = this.all_dine
                    }
                },
            },
        });
    });
</script>
