<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="row">
            <div class="col-md-12">
                <!-- SLIDER -->
                <div class="margin-90"></div>
                <img class="margin-60" src="http://via.placeholder.com/960x460"/>
            </div>
        </div>
        <div class="row">
            <div class="col-md-7">
                <p v-if="!currentSelection">Sorry, there are no events that match your search.</p>
                <div class="row" v-if="currentSelection" v-for="event in currentSelection">
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
                            <p class="details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                        </router-link>
                    </div>
                    <hr>
                </div>
                
            </div>
            <div class="col-md-5">
                <!-- CALENDAR -->
                <vue-datepicker-local v-model="time" type="inline"></vue-datepicker-local>
                
                <v-select v-model="selected" :options="categoryOptions" :searchable="false" class="blog-select" :on-change="selectCategory()"></v-select>
                <!--<select class="" v-model="selected">-->
                <!--    <option selected value="all_events">All Events</option>-->
                <!--    <option value="events">NorthPark Events</option>-->
                <!--    <option value="promotions">In-Store Events</option>-->
                <!--    <option value="holiday">Holiday Events</option>-->
                <!--</select>-->
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
    define(["Vue", "jquery", "moment", "moment-timezone", "vue-moment", "vue-meta", "v-select", "vue-datepicker-local"], function(Vue, jQuery, moment, tz, VueMoment, Meta, vSelect, VueDatePickerLocal) {
        Vue.use(Meta);
        Vue.use(VueDatePickerLocal);
        
        return Vue.component("events-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    selected: "All Events",
                    currentSelection: null,
                    time: new Date(),
                    categoryOptions: [
                        {'label':'All Events', 'value': 'all_events'},
                        {'label':'NorthPark Events', 'value': 'events'},
                        {'label':'In-Store Events', 'value': 'promotions'},
                        {'label':'Holiday Events', 'value': 'holiday'}, 
                    ],
                }
            },
            mounted () {
                this.currentSelection = this.events;
            },
            // watch: {
            //     selected: function() {
            //         console.log(this.selected)
            //         if(this.selected == "events"){
            //             this.currentSelection = this.propertyEvents;
            //         } else if (this.selected == "promotions") {
            //             this.currentSelection = this.storeEvents;
            //         } else if (this.selected == "holiday"){
            //             this.currentSelection = this.holidayEvents;
            //         } else {
            //             this.currentSelection = this.events
            //         }
            //     }
            // },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                },
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
                   var holiday_events = [];
                    _.forEach(this.$store.getters.processedEvents, function(value, key) {
                        var tag_string = _.toLower(_.join(value.tag, ''));
                        var holiday_string = _.includes(tag_string, "holiday");
                        if(holiday_string === true){
                            holiday_events.push(value);
                        }
                    });
                    return holiday_events;
                }
            },
            methods: {
                selectCategory(){
                    console.log(this.selected)
                    if(this.selected.value == "events"){
                        this.currentSelection = this.propertyEvents;
                    } else if (this.selected.value == "promotions") {
                        this.currentSelection = this.storeEvents;
                    } else if (this.selected.value == "holiday"){
                        this.currentSelection = this.holidayEvents;
                    } else {
                        this.currentSelection = this.events
                    }
                },
            },
        });
    });
</script>
