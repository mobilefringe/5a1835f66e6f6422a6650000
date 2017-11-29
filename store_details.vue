<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="row" v-if="currentStore">
            <div class="col-md-9">
                <div>
                    <h2 class="details-store-name">{{currentStore.name}}</h2>
                    <p class="details-description">{{currentStore.description}}</p>
                    <router-link to="/stores" active-class="active" exact>
                        <a class="details-link">View Northpark Center Map <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                    </router-link>
                </div>
            </div>
            <div class="col-md-3">
                <div class="details-contact-container" v-if="currentStore && currentStore.phone">
                    <h5 class="dine-contact-header">Contact</h5>
                    <p>{{currentStore.phone}}</p>
                </div>
                <div class="details-hours-container" v-if="currentStore && currentStore.store_hours">
                    <h5>Hours</h5>
                    <!--<ul class="">-->
                    <!--    <li v-for="hour in hours">-->
                    <!--        <span class="pull-left col-md-6"> -->
                    <!--           {{day_of_the_week(hour.day_of_week)}}-->
                    <!--        </span>-->
                    <!--        <span class="pull-right col-md-6 text-left">-->
                    <!--            {{hour.open_time | moment("h:mma", timezone)}} - {{hour.close_time | moment("h:mma", timezone)}}-->
                    <!--        </span>-->
                    <!--    </li>-->
                    <!--</ul>-->
                </div>
                <div class="details-manager-container" v-if="currentStore && currentStore.description"> <!--How are we going to add Store Manager? -->
                    <h5>Manager</h5>
                    <p>manager name</p>
                </div>
            </div>
        </div>
        <div class="row " v-if="currentStore && currentStore.total_published_promos > 0">
            <div class="col-md-12">
                <h5>Current Promotions</h5>
            </div>
            <div v-for="promo in promotions" v-if="promotions">
                <hr>
                <div class="col-md-1">
                    <p class="details-promo-date">{{promo.start_date | moment("ddd", timezone)}}</p>
                    <p class="details-promo-day">{{promo.start_date | moment("D", timezone)}}</p>
                    <p class="details-promo-date">{{promo.start_date | moment("MMM", timezone)}}</p>
                </div>
                <div class="col-md-5">
                    <h2 class="details-promo-name">{{promo.name}}</h2> 
                    <h5>{{promo.store.name}}</h5>
                    <p class="description_text ">{{promo.description}}</p> 
                    <router-link :to="{ name: 'promotionDetails', params: { id: promo.slug }}">
                        <a class="details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                    </router-link>    
                </div>
                <div class="col-md-6">
                    <img :src="promo.promo_image_url_abs" class="store_logo" alt="">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}} <i class="fa fa-angle-right" aria-hidden="true"></i></p>
            </div>
        </div>
    </div>
</template>

<script>
    // define(["Vue"], function(Vue) {
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        return Vue.component("store-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    title: "MM with Vue.js!",
                    description: "An example of integration of Mall Maverick with Vue.js",
                    currentStore: null,
                    promotions : []
                }
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.currentStore = vm.findStoreBySlug(to.params.id);
                    if (vm.currentStore === null || vm.currentStore === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate (to, from, next) {
                this.currentStore = this.findStoreBySlug(to.params.id);
                if (this.currentStore === null || this.currentStore === undefined){
                    this.$router.replace({ name: '404'});
                }
            },
            watch : {
                currentStore : function (){
                    console.log("currentStore promo",this.currentStore );
                    var vm = this;
                    var temp = [];
                    _.forEach(this.currentStore.promotions, function(value, key) {
                        console.log(vm.findPromoById(value));
                        temp.push(vm.findPromoById(value));
                    });
                    this.promotions = temp;
                    console.log("promos",this.promotions);
                }
            },
            computed: {
                findStoreBySlug () {
                    return this.$store.getters.findStoreBySlug;
                },
                findPromoById () {
                    return this.$store.getters.findPromoById;
                },
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                },
                
            }
        });
    });
</script>