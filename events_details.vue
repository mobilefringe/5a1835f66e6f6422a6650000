<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row" v-if="currentEvent">
            <div class="col-md-12">
                <img :src="currentEvent.image_url" class="margin-60" alt="" />
            </div>
            <div class="col-md-8">
                <div class="details-store-info">
                    <h2 class="details-store-name">{{currentEvent.name}}</h2>
                    <p class="details-description">{{currentEvent.description}}</p>
                    <div v-if="checkEventType(currentEvent.eventable_type)">
                        <router-link to="/stores/{{currentEvent.slug}}" active-class="active" exact>
                            <a class="details-link">View Store Details <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                        </router-link>
                    </div>
                    
                </div>    
            </div>
            <div class="col-md-4">
                <div class="sidebar">
                    <div class="sidebar-container">
                        <h5>Event Dates</h5>
                        <p>{{currentEvent.start_date | moment("ddd D MMM", timezone)}}<br>
                        to {{currentEvent.start_end | moment("ddd D MMM", timezone)}}</p>
                    </div>
                    <div class="sidebar-container">
                        <h5>Store Hours</h5>
                        <ul class="details-hours-list">
                            <li v-for="hour in hours">
                               {{day_of_the_week(hour.day_of_week)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>    
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i><span v-if="currentEvent"> {{currentEvent.name}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment"], function(Vue, moment, tz, VueMoment) {
        return Vue.component("event-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentEvent: null,
                    store_hours: [],
                }
            },
            mounted () {
                this.currentEvent    
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.currentEvent = vm.findEventBySlug(to.params.id);
                    console.log(vm.currentEvent)
                    if (vm.currentEvent === null || vm.currentEvent === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate (to, from, next) {
                this.currentEvent = this.findEventBySlug(to.params.id);
                console.log(this.currentEvent)
                if (this.currentEvent === null || this.currentEvent === undefined){
                    this.$router.replace({ name: '404'});
                }
            },
            watch: {
                currentStore: function() {
                    var vm = this;
                    var storeHours = [];
                    _.forEach(this.currentStore.store_hours, function(value, key) {
                        storeHours.push(vm.findHourById(value));
                    });
                    this.store_hours = storeHours;
                }
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
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
                checkEventType(val_eventable_type){
                    console.log(this.currentEvent)
                    if(this.currentEvent.eventable_type == "Store"){
                        return true
                    }
                },
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                }
            }
        });
    });
</script>
