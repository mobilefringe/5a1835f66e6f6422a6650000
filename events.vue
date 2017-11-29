<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="row">
            <div class="col-md-12">
                <!-- SLIDER -->
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="row" v-for="event in events">
                    <div class="col-md-4">
                        <p class="details-promo-date">{{event.start_date | moment("ddd", timezone)}}</p>
                        <p class="details-promo-day">{{event.start_date | moment("D", timezone)}}</p>
                        <p class="details-promo-date">{{event.start_date | moment("MMM", timezone)}}</p>
                    </div>
                    <div class="col-md-8">
                        <p>{{event.start_date | moment("MMM D", timezone)}} - {{event.end_date | moment("MMM D", timezone)}}</p>
                        {{ event.name }}
                        <router-link :to="{ name: 'eventDetails', params: { id: event.slug }}">
                            <a class="details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <!-- CALENDAR -->
            </div>
                <!--<div class="card">-->
                <!--    <div class="card-divider">-->
                <!--      {{ event.name }}-->
                <!--    </div>-->
                <!--    <div class="card-section center">-->
                <!--        <a :href="event.image_url" target="_blank"><img :src="event.image_url"></a>-->
                <!--    </div>-->
                <!--    <div class="card-section">-->
                <!--        <div class="center">-->
                <!--            <p>{{event.start_date | moment("MMM D", timezone)}} - {{event.end_date | moment("MMM D", timezone)}}</p>-->
                <!--            <router-link :to="{ name: 'eventDetails', params: { id: event.slug }}">Read More</router-link>-->
                <!--        </div>-->
                <!--    </div>-->
                <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("events-component", {
            template: template, // the variable template will be injected
            computed: {
                events() {
                    return this.$store.getters.processedEvents;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                }
            }
        });
    });
</script>
