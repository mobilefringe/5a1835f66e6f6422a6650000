<template>
    <div class="page-container">
        <div class="margin-90"></div>
        <div v-if="currentPage">
            <div class="row">
                <div class="col-md-4 col-md-push-8">
                    <div class="sidebar">
                        <div class="sidebar-container">
                            <h5>Hours</h5>
                            <ul class="sidebar-hours-list">
                                <li v-for="hour in hours">
                                   {{day_of_the_week(hour.day_of_week)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                                    
                                </li>
                            </ul> 
                            <router-link to="/hours" active-class="active" exact>
                                <a class="details-link">View Detailed Hours <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                            </router-link>
                        </div>
                        <div class="sidebar-container">
                            <h5 class="">Find Us</h5>
                            <p class="sidebar-container">
                                {{property.name}}<br>
                                {{property.address1}}<br>
                                {{property.city}}, {{property.province_state}} {{property.postal_code}}<br>
                                {{property.contact_phone}}
                            </p>
                            <p class="sidebar-container">
                                Northpark Center Concierge<br/>
                                {{property.contact_phone}}
                            </p>
                            <a class="details-link" href="https://www.google.com/maps/place/NorthPark+Center/@32.868225,-96.773204,15z/data=!4m5!3m4!1s0x0:0x95fc10ba98f7aad4!8m2!3d32.8680671!4d-96.7735128?hl=en-US" target="_blank">Get Directions <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 col-md-pull-4">
                    <h2 class="page_title" v-html="currentPage.title"></h2>
                    <hr>
                    <div class="" v-html="currentPage.body"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p class="page-breadcrumb">{{property.name}} <i class="fa fa-angle-right" aria-hidden="true"></i> <span v-if="currentPage">{{currentPage.title}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function (Vue, moment, tz, VueMoment, Meta) {
    return Vue.component("page-details-component", {
        template: template, // the variable template will be injected,
        data: function data() {
            return {
                currentPage: null
            };
        },
        beforeRouteEnter: function beforeRouteEnter(to, from, next) {
            next(function (vm) {
                // access to component instance via `vm`
                vm.$store.dispatch('LOAD_PAGE_DATA', { url: vm.property.mm_host + "/pages/" + to.params.id + ".json" }).then(function (response) {
                    vm.currentPage = response.data;
                    console.log(vm.currentPage);
                }, function (error) {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    vm.$router.replace({ name: '404' });
                });
            });
        },
        beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
            var _this = this;

            this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host + "/pages/" + to.params.id + ".json" }).then(function (response) {
                // this.dataLoaded = true;
                _this.currentPage = response.data;
                console.log(_this.currentPage);
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
            }
        },
        methods: {
            day_of_the_week: function day_of_the_week(val_day) {
                weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                return weekday[val_day];
            }
        }
    });
});</script>