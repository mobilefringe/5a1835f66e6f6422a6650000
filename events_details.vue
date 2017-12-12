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
                    
                </div>
            </div>
            <div class="col-md-4">
                
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i> {{currentEvent.name}}</p>
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
                    currentEvent: null
                }
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.currentEvent = vm.findEventBySlug(to.params.id);
                    if (vm.currentEvent === null || vm.currentEvent === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate (to, from, next) {
                this.currentEvent = this.findEventBySlug(to.params.id);
                if (this.currentEvent === null || this.currentEvent === undefined){
                    this.$router.replace({ name: '404'});
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
                findEventBySlug () {
                    return this.$store.getters.findEventBySlug;
                },
                
            },
            methods: {
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                }
            }
        });
    });
</script>
