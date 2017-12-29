<template>
    <div> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="image-container">
            <slick ref="slick" :options="slickOptions">
                <div> <!--v-for="banner in historyBanners" v-if="historyBanners"-->
                    <!--<img :src="banner.image_url" class="" alt="">-->
                    <img class="margin-60" src="http://via.placeholder.com/960x460"/>
                </div>
            </slick>
        </div>
        <div class="page-container">
            <div class="row">
                <p v-if="!currentSelection">Sorry, there are no events that match your search.</p>
                <div class="col-md-7" v-if="currentSelection">
                    <div class="row" v-for="event in currentSelection">
                        <div class="col-md-2">
                            <p class="details-promo-date">{{event.start_date | moment("ddd", timezone)}}</p>
                            <p class="details-promo-day">{{event.start_date | moment("D", timezone)}}</p>
                            <p class="details-promo-date">{{event.start_date | moment("MMM", timezone)}}</p>
                        </div>
                        <div class="col-md-10">
                            <h5 class="details-dates">{{ checkEventDates(event) }}</h5>
                            <h2>{{ event.name }}</h2>
                            <p class="sub_title" v-if="event.store">{{ event.store.name }}</p><p class="sub_title" v-else>{{ property.name}}</p>
                            <router-link :to="{ name: 'eventDetails', params: { id: event.slug }}">
                                <p class="details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                            </router-link>
                        </div>
                        <div class="col-md-12">
                            <hr>    
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <!-- CALENDAR -->
                    <vue-datepicker-local v-model="time" type="inline"></vue-datepicker-local>
                    <div class="category-select-container right">
                        <v-select v-model="selected" :options="categoryOptions" :searchable="false" class="category-select" :on-change="selectCategory()"></v-select>    
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
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "v-select", "vuejs-datepicker", "vue!vue-slick"], function(Vue, moment, tz, VueMoment, Meta, vSelect, VueDatepickerLocal, slick) {
        Vue.use(Meta);
        
        return Vue.component("events-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                    selected: "All Events",
                    currentSelection: null,
                    time: moment(),
                    firstDayOfWeek: 0,
                    disableDaysBeforeToday: false,
                    defaultDate: moment(),
                    showLunar: false,
                    showLunarButton: false,
                    categoryOptions: [
                        {'label':'All Events', 'value': 'all_events'},
                        {'label':'NorthPark Events', 'value': 'events'},
                        {'label':'In-Store Events', 'value': 'promotions'},
                        {'label':'Holiday Events', 'value': 'holiday'}, 
                    ],
                    slickOptions: {
                        arrows: true,
                        autoplay: true,
                        cssEase: 'linear',
                        dots: false,
                        fade: true,
                        infinite: true,
                        slidesToShow: 1,
                        speed: 500,
                        prevArrow: '.prev',
                        nextArrow: '.next'
                    }
                }
            },
            mounted () {
                this.currentSelection = this.events;
            },
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
                    var sorted = _.orderBy(merge, function(o) { return o.end_date })
                    return sorted
                },
                propertyEvents() {
                    var events = _.orderBy(this.$store.getters.processedEvents, function(o) { return o.end_date }); 
                    return events
                },
                storeEvents() {
                    var promotions = _.orderBy(this.$store.getters.processedPromos, function(o) { return o.end_date });
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
            },
        });
    });
</script>
