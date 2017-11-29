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
                <div class="row" v-for="event in events">
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
                <select class="" @change="changeItem($event)">
                    <option selected value="">All Events</option>
                    <option v-bind:value="property">NorthPark Events</option>
                    <option v-bind:value="store">In-Store Events</option>
                    <option v-bind:value="holiday">Holiday Events</option>
                </select>
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
                    selected: ""
                }
            },
            methods: {
                changeMode(mode) {
                    this.listMode = mode;
                }
            },
            computed: {
                events() {
                    var events = this.$store.getters.processedEvents;
                    // return this.$store.getters.processedEvents;
                    var promotions = this.$store.getters.processedPromos;
                    var merge = _.concat(events, promotions);
                    console.log(merge)
                    var sorted = _.orderBy(merge, function(o) { return o.start_date })
                    console.log(sorted)
                    return sorted
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
