<template>
    <div> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <img src="http://via.placeholder.com/1920x640" alt="" />
        <div class="page-container">
            <div class="row">
                <div class="col-md-12">
                    <h2>NEWS</h2>
                </div>
            </div>
            <!--<div class="row">-->
            <!--    <div>-->
            <!--        <hr>-->
            <!--        <div class="col-md-1">-->
            <!--            <p class="details-promo-date">{{promo.start_date | moment("ddd", timezone)}}</p>-->
            <!--            <p class="details-promo-day">{{promo.start_date | moment("D", timezone)}}</p>-->
            <!--            <p class="details-promo-date">{{promo.start_date | moment("MMM", timezone)}}</p>-->
            <!--        </div>-->
            <!--        <div class="col-md-5">-->
            <!--            <h2 class="details-promo-name">{{promo.name}}</h2> -->
            <!--            <h5 class="details-promo-store">{{promo.store.name}}</h5>-->
            <!--            <p class="details-promo-desc">{{ truncate(promo.description) }}</p> -->
            <!--            <router-link :to="{ name: 'promotionDetails', params: { id: promo.slug }}">-->
            <!--                <a class="details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>-->
            <!--            </router-link>    -->
            <!--        </div>-->
            <!--        <div class="col-md-6">-->
            <!--            <img :src="promo.promo_image_url_abs" class="store_logo" alt="">-->
            <!--        </div>-->
            <!--    </div>-->
            <!--</div>-->
            <div class="row">
                <div class="col-md-12">
                    <!-- ADD PAGINATION -->
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
