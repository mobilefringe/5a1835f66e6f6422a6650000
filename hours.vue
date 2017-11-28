<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="row">
            <div class="col-md-8">
                <h2>Shopping Centre Hours</h2>
                <p>Department store, restaurant, theatre, spa, and holiday hours may vary.</p>
                <ul class="menu_content text_center">
                    <li v-for="hour in hours">
                        <span class="pull-left col-md-6"> 
                           {{day_of_the_week(hour.day_of_week)}}
                        </span>
                        <span class="pull-right col-md-6 text-left">
                            {{hour.open_time | moment("h:mma", timezone)}} - {{hour.close_time | moment("h:mma", timezone)}}
                        </span>
                    </li>
                </ul>
                <hr>
                <h2>Management Office Hours</h2>
                <p>Closed Easter, Thanksgiving, and Christmas Day.</p>
                <hr>
                <h2>AMC Northpark 15</h2>
                
                <router-link to="" active-class="active" exact>
                    <a>View Showtimes <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                </router-link>
                <router-link to="" active-class="active" exact>
                    <a>View More <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                </router-link>
                <hr>
                <div class="row">
                    <div class="col-md-6">
                        <h2>Restaurant Hours</h2>
                        
                        <!-- Hours -->
                    </div>
                    <div class="col-md-6">
                        <!-- Add Restaurant Drop Down -->
                        <select >
                            <option disabled value="">Select A Restaurant</option>
                            <option v-for="restaurant in restaurants" v-bind:value="restaurant.id, restaurant.name">{{ restaurant.name }}</option>
                        </select>
                        
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <p class="page-breadcrumb">{{property.name}} <i class="fa fa-angle-right" aria-hidden="true"></i> Hours</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Find Us</p>
                <p>
                    {{property.name}}<br/>
                    {{property.address1}}<br/>
                    {{property.city}}, {{property.province_state}}<br/>
                    {{property.contact_phone}}</p>
                </p>
                <router-link to="" active-class="active" exact>
                    <a>Get Directions <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("hours-component", {
            template: template, // the variable template will be injected
            // data: {
            //     selected: "",
            // },
            mounted () {
                this.restaurant
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
                hours(){
                    var hours = _.filter(this.$store.state.results.hours, function(o) { return o.store_ids==null && o.is_holiday==0 })
                    // console.log(hours);
                    return hours;
                },
                restaurants(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var cafes = stores_by_category["NorthPark Cafés"]
                    var restaurants = stores_by_category["Restaurants / Beverages"]
                    var specialty = stores_by_category["Specialty Foods"]
                    var all_restaurants = _.concat(cafes, restaurants, specialty)
                    console.log(all_restaurants)
                    return all_restaurants
                }
            },
            methods: {
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                },
                // changeItem($event) {
                //     this.selected = $event.target.value
                //     console.log(this.selected)
                // }
            }
        });
    });
</script>
