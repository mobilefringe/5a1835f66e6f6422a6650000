<template>
    <div v-if="dataLoaded"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90 hidden-mobile"></div>
        <div v-if="currentEvent">
            <div class="image-container">
                <img :src="currentEvent.image_url" class="margin-60" alt="" />
            </div>    
            <div class="page-container">
                <div class="row">
                    <div class="col-md-8">
                        <div class="details-store-info">
                            <h2 class="details-store-name">{{currentEvent.name}}</h2>
                            <h5 class="details-dates">{{ checkEventDates() }}</h5>
                            <p class="details-description">{{currentEvent.description}}</p>
                        </div> 
                        <div class="visible-mobile margin-30">
                            <hr>    
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="sidebar">
                            <div class="sidebar-container" v-if="currentEvent.eventable_type === 'Property'">
                                <h5>Hours</h5>
                                <ul class="sidebar-hours-list">
                                    <li v-for="hour in hours">
                                       {{hour.day_of_week | moment("dddd", timezone)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                                    </li>
                                </ul> 
                                <router-link to="/hours" active-class="active" exact>
                                    <a class="details-link">View Detailed Hours <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                                </router-link>
                            </div>
                            <div class="sidebar-container" v-if="currentEvent.eventable_type === 'Store'">
                                <h5>Hours</h5>
                                <ul class="sidebar-hours-list">
                                    <li v-for="hour in store_hours">
                                       {{hour.day_of_week | moment("dddd", timezone)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                                    </li>
                                </ul> 
                                <router-link :to="getStoreSlug()" active-class="active" exact>
                                    <a class="details-link">View Store Details <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                                </router-link>
                            </div>
                        </div>    
                    </div>
                </div>
                <page-breadcrumb></page-breadcrumb>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue!page_breadcrumb.vue"], function(Vue, Vuex, moment, tz, VueMoment, PageBreadcrumbComponent) {
        return Vue.component("event-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    dataLoaded: false,
                    currentEvent: null,
                    store_hours: [],
                }
            },
            created(){
                this.$store.dispatch("getData", "events").then(response => {
                    this.dataLoaded = true
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                });
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.currentEvent = vm.findEventBySlug(to.params.idEvent);
                    if(vm.currentEvent === null || vm.currentEvent === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate (to, from, next) {
                this.currentEvent = this.findEventBySlug(to.params.idEvent);
                if(this.currentEvent === null || this.currentEvent === undefined){
                    this.$router.replace({ name: '404'});
                }
            },
            watch: {
                currentEvent: function() {
                    if(this.currentEvent.eventable_type == "Store"){
                        var vm = this;
                        var storeHours = [];
                        _.forEach(this.currentEvent.store.store_hours, function(value, key) {
                            console.log(value)
                            storeHours.push(vm.findHourById(value));
                        });
                        this.store_hours = storeHours;
                    }
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'getPropertyHours',
                    'processedEvents',
                    'findEventBySlug'
                ]),
                hours() {
                    var hours = _.filter(this.$store.state.results.hours, function(o) { return o.store_ids==null && o.is_holiday==0 })
                    return hours;
                },
                findHourById() {
                    return this.$store.getters.findHourById;
                },
                findEventBySlug () {
                    return this.$store.getters.findEventBySlug;
                },
            },
            methods: {
                getStoreSlug(){
                    if(this.currentEvent.eventable_type == "Store"){
                        var store_slug = "/stores/" + this.currentEvent.store.slug
                        return store_slug
                    }    
                },
                checkEventDates(currentEvent){
                    var timezone = this.timezone
                    var start_date = moment(this.currentEvent.start_date).tz(timezone).format("MM-DD-YYYY")
                    var end_date = moment(this.currentEvent.end_date).tz(timezone).format("MM-DD-YYYY")
                    if(start_date === end_date){
                        var one_day_event = moment(start_date).format("dddd, MMMM D, YYYY")
                        return one_day_event
                    } else {
                        var multi_day_event = moment(start_date).format("dddd, MMMM D, YYYY") + " to " + moment(end_date).format("dddd, MMMM D, YYYY")
                        return multi_day_event
                    }
                }
            }
        });
    });
</script>
