<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-60"></div>
        <!--<div class="row margin-30">-->
        <!--    <div class="col-md-6">-->
        <!--        <div class="category-select-container">-->
        <!--            <v-select v-model="selected" :options="categoryOptions" :searchable="false" class="category-select" :on-change="selectCategory()"></v-select>    -->
        <!--        </div>-->
        <!--    </div>-->
        <!--    <div class="col-md-6"></div>-->
        <!--</div>-->
        <div class="dine-container" v-for="restaurant in currentSelection">
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
                    <ul class="details-hours-list">
                        <li v-for="hour in storeHours(restaurant.store_hours)">
                           {{day_of_the_week(hour.day_of_week)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;Dine</p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "v-select"], function(Vue, moment, tz, VueMoment, Meta, VueBreadcrumbs, vSelect) {
        return Vue.component("new-stores-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {

                    
                    newStores: [],
                    hours: []
                }
            },
            mounted () {
                this.newStoresList
                console.log(this.newStoresList)
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                },
                newStoresList() {
                    return this.$store.getters.findNewStores;
                },
                
                findHourById() {
                    return this.$store.getters.findHourById;
                },
            },
            methods: {
                
                storeHours(restaurant_hours){
                    var vm = this;
                    var storeHours = [];
                    _.forEach(restaurant_hours, function(value, key) {
                        storeHours.push(vm.findHourById(value));
                    });
                    return storeHours
                },
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                }
            },
        });
    });
</script>
