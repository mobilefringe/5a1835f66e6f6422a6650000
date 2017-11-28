<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="dine-container" v-for="restaurant in restaurants">
            <div class="row">
                <div class="col-md-8">
                    <img :src="restaurant.image_url" alt="{{restaurant.name}}" />
                </div>
                <div class="col-md-4">
                    <h2 class="dine-name">{{restaurant.name}}</h2>
                    <router-link :to="{ name: 'storeDetails', params: { id: restaurant.slug }}" class="dine-link">Visit Store Page <i class="fa fa-angle-double-right" aria-hidden="true"></i></router-link>
                    <h5>Contact</h5>
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
    define(["Vue"], function(Vue) {
        return Vue.component("stores-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    listMode: "alphabetical",
                    dine_stores: [],
                }
            },
            methods: {
                changeMode (mode) {
                    this.listMode = mode;
                },
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                }
            },
            computed: {
                restaurants(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var cafes = stores_by_category["NorthPark Cafés"]
                    var restaurants = stores_by_category["Restaurants / Beverages"]
                    var specialty = stores_by_category["Specialty Foods"]
                    var all_restaurants = _.concat(cafes, restaurants, specialty)
                    var filtered_restaurants = _.uniqBy(all_restaurants, function(o){ return o.name; })
                    return filtered_restaurants
                }
            }
        });
    });
</script>
