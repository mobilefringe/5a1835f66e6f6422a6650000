<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="row">
            <div class="col-md-8">
                <ul class="menu_content text_center">
                    <li v-for="hour in hours">
                        <span class="pull-left col-md-6"> 
                           {{day_of_the_week(hour.day_of_week)}}
                        </span>
                        <span class="pull-right col-md-6 text-left">
                            {{hour.open_time | moment("h:mma", timezone)}} - {{hour.close_time | moment("h:mma", timezone)}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="col-md-4">
                <p>Find Us</p>
                <p>
                    {{property.name}}<br/>
                    {{property.address1}}<br/>
                    {{property.city}}, {{property.province_state}}<br/>
                    {{property.contact_phone}}</p>
                </p>
                <router-link to="" active-class="active" exact>
                    <a>Get Directions</a>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("promos-component", {
            template: template, // the variable template will be injected
            computed: {
                property (){
                    return this.$store.getters.getProperty;
                },
                
                timezone () {
                    return this.$store.getters.getTimezone;
                },
                hours(){
                    var hours = 
                        _.filter(this.$store.state.results.hours, function(o) { return o.store_ids==null && o.is_holiday==0 })
                        console.log(hours);
                        return hours;
                },
            },
            methods: {
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                },
            }
        });
    });
</script>
