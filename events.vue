<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="row">
            <div class="col-md-12">
                <!-- SLIDER -->
                <img src="http://via.placeholder.com/960x460"/>
            </div>
        </div>
        <div class="row">
            <div class="col-md-7">
                <div class="row" v-for="event in currentSelection">
                    <div class="col-md-2">
                        <p class="details-promo-date">{{event.start_date | moment("ddd", timezone)}}</p>
                        <p class="details-promo-day">{{event.start_date | moment("D", timezone)}}</p>
                        <p class="details-promo-date">{{event.start_date | moment("MMM", timezone)}}</p>
                    </div>
                    <div class="col-md-10">
                        <h5>{{event.start_date | moment("MMMM D", timezone)}} - {{event.end_date | moment("MMMM D", timezone)}}</h5>
                        <h2>{{ event.name }}</h2>
                        <p class="sub_title" v-if="event.store">{{ event.store.name }}</p><p class="sub_title" v-else>{{ property.name}}</p>
                        <router-link :to="{ name: 'eventDetails', params: { id: event.slug }}">
                            <a class="details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                        </router-link>
                    </div>
                    <hr>
                </div>
              
            </div>
            <div class="col-md-5">
                <!-- CALENDAR -->
                <select class="" v-model="selected">
                    <option selected value="all_events">All Events</option>
                    <option value="events">NorthPark Events</option>
                    <option value="promotions">In-Store Events</option>
                    <option value="holiday">Holiday Events</option>
                </select>
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
        return Vue.component("events-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    selected: "All Events",
                    currentSelection: null,
                }
            },
            mounted () {
                this.currentSelection = this.events;
            },
            watch: {
                selected: function() {
                    console.log(this.selected)
                    if(this.selected == "events"){
                        this.currentSelection = this.propertyEvents;
                    } else if (this.selected == "promotions") {
                        this.currentSelection = this.storeEvents;
                    } else if (this.selected == "holiday"){
                        this.currentSelection = this.holidayEvents;
                    } else {
                        this.currentSelection = this.events
                    }
                }
            },
            methods: {
                
            },
            computed: {
                events() {
                    var events = this.$store.getters.processedEvents;
                    var promotions = this.$store.getters.processedPromos;
                    var merge = _.concat(events, promotions);
                    var sorted = _.orderBy(merge, function(o) { return o.start_date })
                    return sorted
                },
                propertyEvents() {
                    var events = _.orderBy(this.$store.getters.processedEvents, function(o) { return o.start_date }); 
                    return events
                },
                storeEvents() {
                    var promotions = _.orderBy(this.$store.getters.processedPromos, function(o) { return o.start_date });
                    return promotions
                },
                holidayEvents(){
                    var events = _.orderBy(this.$store.getters.processedEvents, function(o) { return o.start_date }); 
                    var holiday_events = _.filter(_.orderBy(this.$store.getters.processedEvents, function(o) { return o.start_date }), function(o) { return o.tags.indexOf("holiday") });
                    return holiday_events
                    console.log(holiday_events)
                },
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                }
            }
        });
    });
</script>
