<template>
    <div> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <img src="">
        <div class="page-container">
            <div class="row">
                <div class="col-md-8">
                    <h2>NEWS</h2>
                </div>
                <div class="col-md-4">
                    
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
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("news-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    currentPage: null,
                }
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
                hours(){
                    var hours = _.filter(this.$store.state.results.hours, function(o) { return o.store_ids==null && o.is_holiday==0 })
                    return hours;
                },
                
            },
            methods: {
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                },
                changeItem(event) {
                    this.selected = `${event.target.value}`
                    console.log("I've changed")
                    console.log(this.selected)
                    
                    // var store_id = this.${event.target.value}
                    console.log(store_id)
                }
            }
        });
    });
</script>
