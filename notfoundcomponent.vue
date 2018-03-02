<template>
    <div>
        <transition name="fade">
            <div class="page-container">
                <div class="margin-90"></div>
                <div class="row margin-30">
                    <div class="col-md-8">
                        <h2>{{text}}</h2>
                        <div class="margin-60"></div>
                    </div>
                    <div class="col-md-4">
                        <div class="sidebar">
                            <div class="sidebar-container">
                                <h5>Hours</h5>
                                <ul class="sidebar-hours-list">
                                    <li v-for="hour in getPropertyHours">
                                       {{hour.day_of_week | moment("dddd", timezone)}}: {{hour.open_time | moment("hA", timezone)}}-{{hour.close_time | moment("hA", timezone)}}
                                    </li>
                                </ul> 
                                <router-link to="/hours" active-class="active" exact>
                                    <a class="details-link">View Detailed Hours <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                                </router-link>
                            </div>
                            <div class="sidebar-container">
                                <h5 class="">Find Us</h5>
                                <p class="uppercase">
                                    {{property.name}}<br>
                                    {{property.address1}}<br>
                                    {{property.city}}, {{property.province_state}} {{property.postal_code}}<br>
                                    {{property.contact_phone}}
                                </p>
                                <p class="uppercase">
                                    Northpark Center Concierge<br>
                                    {{property.contact_fax}}
                                </p>
                            </div>
                            <div class="sidebar-container">
                                <a class="details-link" href="https://www.google.com/maps/place/NorthPark+Center/@32.868225,-96.773204,15z/data=!4m5!3m4!1s0x0:0x95fc10ba98f7aad4!8m2!3d32.8680671!4d-96.7735128?hl=en-US" target="_blank">Get Directions <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, Vuex, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("not-found-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {"text": "The page you are looking for cannot be found."};
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'getPropertyHours'
                ])
            }
        });
    });
</script>
