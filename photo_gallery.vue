<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-60"></div>
        <div class="row margin-30">
            <div class="col-md-6">
                <div class="category-select-container">
                    <v-select v-model="selected" :options="categoryOptions" :searchable="false" class="category-select" :on-change="selectCategory()"></v-select>    
                </div>
            </div>
            <div class="col-md-6">
                <p>Launch</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12" v-if="currentSelection">
                <div class="row" v-for="event in currentSelection">
                    
                </div>
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
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "v-select"], function(Vue, moment, tz, VueMoment, Meta, vSelect) {
        Vue.use(Meta);
        
        return Vue.component("photo-gallery-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
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
