<template>
    <div> <!-- without an outer container div this component template will not render -->
        <div class="margin-90 hidden-mobile"></div>
        <div class="image-container">
            <slick ref="slick" :options="slickOptions">
                <div v-for="banner in eventsBanners" v-if="eventsBanners">
                    <router-link to="/events" class=""> <!-- :to="banner.url" -->
                        <img class="margin-60" :src="banner.image_url" alt="">
                    </router-link>
                </div>
            </slick>
        </div>
        <div class="page-container">
            <div class="row">
                <div class="col-sm-12 col-md-4 col-md-push-8">
                    <div class="event-calendar-container">
                        <v-date-picker
                            :is-expanded='isExpanded'
                            :nav-visibility='navVisibility'
                            mode='single'
                            v-model='selectedDate'
                            select-color='red'
                            :theme-styles='themeStyles'
                            is-inline
                            :input="dateChange()"
                        ></v-date-picker>
                    </div>
                    <div class="category-select-container right">
                        <v-select v-model="selected" :options="categoryOptions" :searchable="false" class="category-select"></v-select>    
                    </div>
                </div>
                <div class="col-sm-12 col-md-8 col-md-pull-4">
                    <div class="row" v-if="currentSelection.length >= 1" v-for="event in currentSelection">
                        <div class="hidden-xs col-sm-2">
                            <p class="details-promo-date">{{event.end_date | moment("ddd", timezone)}}</p>
                            <p class="details-promo-day">{{event.end_date | moment("D", timezone)}}</p>
                            <p class="details-promo-date">{{event.end_date | moment("MMM", timezone)}}</p>
                        </div>
                        <div class="col-sm-10">
                            <h5 class="event-date">{{ checkEventDates(event) }}</h5>
                            <h2 class="event-name">{{ event.name }}</h2>
                            <h5 class="event-store" v-if="event.store">{{ event.store.name }}</h5>
                            <h5 class="event-store" v-if="!event.store">{{ property.name}}</h5>
                            <router-link :to="{ name: 'eventDetails', params: { id: event.slug }}">
                                <p class="details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                            </router-link>
                        </div>
                        <div class="col-sm-12">
                            <hr>    
                        </div>
                    </div>
                    <div class="row" v-else>
                        <div class="col-md-12">
                            <p>Sorry, there are no events that match your search.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "v-select", "v-calendar", "vue!vue-slick"], function(Vue, moment, tz, VueMoment, Meta, vSelect, VCalendar, slick) {
        Vue.use(Meta);
        Vue.use(VCalendar.default);

        return Vue.component("events-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                    slickOptions: {
                        autoplay: true,
                        cssEase: 'linear',
                        dots: false,
                        fade: true,
                        infinite: true,
                        slidesToShow: 1,
                        speed: 1000,
                    },
                    selected: "All Events",
                    currentSelection: null,
                    currentDate: null,
                    selectedDate: new Date(),
                    isExpanded: true,
                    navVisibility: 'hidden',
                    themeStyles: {
                        wrapper: {
                            border: '0', // Override the default border
                        },
                        header: {
                            color: '#000',
                            backgroundColor: '#FFF',
                            borderColor: '#404c59',
                            borderWidth: '1px 1px 0 1px',
                            paddingTop: '0',
                            paddingBottom: '0'
                        },
                        headerVerticalDivider: {
                            borderLeft: '1px solid #404c59',
                        },
                        weekdays: {
                            color: '#000',
                            backgroundColor: '#FFF',
                            borderColor: '#384763',
                            borderWidth: '0 1px',
                            paddingTop: '5px',
                            paddingBottom: '0',
                        },
                        weekdaysVerticalDivider: {
                            borderLeft: '1px solid #404c59',
                        },
                        weeks: {
                            border: 'none',
                        },
                    },
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
            watch: {
                currentselection: function() {
                    console.log(this.currentSelection)    
                },
                currentDate: function(){
                    var selectedDate = moment.tz(this.selectedDate, this.timezone).format();
                    console.log(selectedDate)
                    var eventsList = [];
                    if(this.selected.value == "events"){
                        eventsList = this.propertyEvents;
                    } else if (this.selected.value == "promotions") {
                        eventsList = this.storeEvents;
                    } else if (this.selected.value == "holiday"){
                        eventsList = this.holidayEvents;
                    } else {
                        eventsList = this.events
                    }
                    
                    var showEvents = [];
                    showEvents = _.filter(eventsList, function(val){
                        start_date = moment(val.start_date).tz(this.timezone).format();
                        end_date = moment(val.end_date).tz(this.timezone).format();
                        return moment(selectedDate).isBetween(start_date, end_date, null, '[]');
                    });
                    
                    // var showEvents = [];
                    // _.forEach(eventsList, function(value, key) {
                    //     var startDate = moment.tz(value.start_date, this.timezone).format();
                    //     var endDate = moment.tz(value.end_date, this.timezone).format();
                    //     console.log(startDate, endDate)
                    //     if(moment(selectedDate).isBetween(startDate, endDate, null, '[]')){
                    //     // if(selectedDate <= endDate && selectedDate >= startDate || selectedDate <= endDate){
                    //         showEvents.push(value);
                    //     }
                    // });
                    // this.currentSelection = showEvents
                },
                selected: function() {
                    console.log(this.selected.value)
                    if(this.selected.value == "events"){
                        this.currentSelection = this.propertyEvents;
                    } else if (this.selected.value == "promotions"){
                        this.currentSelection = this.storeEvents;
                    } else if (this.selected.value == "holiday"){
                        this.currentSelection = this.holidayEvents;
                    } else {
                        this.currentSelection = this.events
                    }
                }
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
                eventsBanners() {
                    var repo = _.filter(this.$store.state.results.repos, function(o) { return o.name == "Events" })
                    var repo_images = repo[0].images
                    return repo_images
                },
                events() {
                    var events = this.$store.getters.processedEvents;
                    var promotions = this.$store.getters.processedPromos;
                    var mergeEvents = _.concat(events, promotions);
                    var showEvents = [];
                    _.forEach(mergeEvents, function(value, key) {
                        var today = moment.tz(this.timezone).format();
                        var showOnWebDate = moment.tz(value.show_on_web_date, this.timezone).format();
                        if(today >= showOnWebDate){
                            showEvents.push(value);
                        }
                    });
                    var sortedEvents = _.orderBy(showEvents, function(o) { return o.end_date })
                    return sortedEvents
                },
                propertyEvents() {
                    var showEvents = [];
                    _.forEach(this.$store.getters.processedEvents, function(value, key) {
                        var today = moment.tz(this.timezone).format();
                        var showOnWebDate = moment.tz(value.show_on_web_date, this.timezone).format();
                        if(today >= showOnWebDate){
                            showEvents.push(value);
                        }
                    });
                    var events = _.orderBy(showEvents, function(o) { return o.end_date }); 
                    return events
                },
                storeEvents() {
                    var showEvents = [];
                    _.forEach(this.$store.getters.processedPromos, function(value, key) {
                        var today = moment.tz(this.timezone).format();
                        var showOnWebDate = moment.tz(value.show_on_web_date, this.timezone).format();
                        if(today >= showOnWebDate){
                            showEvents.push(value);
                        }
                    });
                    var promotions = _.orderBy(showEvents, function(o) { return o.end_date });
                    return promotions
                },
                holidayEvents() {
                   var holiday_events = [];
                    _.forEach(this.$store.getters.processedEvents, function(value, key) {
                        var tag_string = _.toLower(_.join(value.tag, ''));
                        var holiday_string = _.includes(tag_string, "holiday");
                        if(holiday_string === true){
                            holiday_events.push(value);
                        }
                    });
                    var showEvents = [];
                    _.forEach(holiday_events, function(value, key) {
                        var today = moment.tz(this.timezone).format();
                        var showOnWebDate = moment.tz(value.show_on_web_date, this.timezone).format();
                        if(today >= showOnWebDate){
                            showEvents.push(value);
                        }
                    });
                    var holidayEvents = _.orderBy(showEvents, function(o) { return o.end_date });
                    // if(holidayEvents.length > 0){
                        return holidayEvents
                    // } else {
                    //     return null
                    // }
                }
            },
            methods: {
                dateChange(){
                    this.currentDate = moment.tz(this.selectedDate, this.timezone).format();
                },
                checkEventDates(event){
                    var timezone = this.timezone
                    var start_date = moment(event.start_date).tz(timezone).format("MM-DD-YYYY")
                    var end_date = moment(event.end_date).tz(timezone).format("MM-DD-YYYY")
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
