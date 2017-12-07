<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row" v-if="currentStore">
            <div class="col-md-12">
                <img :src="currentStore.store_front_url_abs" class="margin-60" alt="" />
            </div>
            <div class="col-md-9">
                <div class="details-store-info">
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
                    <ul class="details-hours-list">
                        <li v-for="hour in hours">
                           {{day_of_the_week(hour.day_of_week)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="details-manager-container" v-if="currentStore && currentStore.manager_name">
                    <h5>Manager</h5>
                    <p>{{currentStore.manager_name}}</p>
                </div>
            </div>
        </div>
        <div v-if="currentStore && currentStore.total_published_promos > 0">
            <div class="row">
                <div class="col-md-12 details-promo-header">
                    <h5>Current Promotions</h5>
                </div>
            </div>
            <div v-for="promo in promotions" v-if="promotions">
                <div class="row details-promo-container">
                    <div class="col-md-1">
                        <p class="details-promo-date">{{promo.start_date | moment("ddd", timezone)}}</p>
                        <p class="details-promo-day">{{promo.start_date | moment("D", timezone)}}</p>
                        <p class="details-promo-date">{{promo.start_date | moment("MMM", timezone)}}</p>
                    </div>
                    <div class="col-md-5">
                        <h2 class="details-promo-name">{{promo.name}}</h2> 
                        <h5 class="details-promo-store">{{promo.store.name}}</h5>
                        <p class="details-promo-desc">{{ truncate(promo.description) }}</p> 
                        <router-link :to="{ name: 'promotionDetails', params: { id: promo.slug }}">
                            <a class="details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                        </router-link>    
                    </div>
                    <div class="col-md-6">
                        <img :src="promo.promo_image_url_abs" class="store_logo" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}} <i class="fa fa-angle-right" aria-hidden="true"></i> {{ breadcrumb }} <i class="fa fa-angle-right" aria-hidden="true"></i> {{currentStore.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        return Vue.component("store-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    title: "MM with Vue.js!",
                    description: "An example of integration of Mall Maverick with Vue.js",
                    currentStore: null,
                    promotions : [],
                    hours: [],
                }
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.currentStore = vm.findStoreBySlug(to.params.id);
                    if (vm.currentStore === null || vm.currentStore === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate(to, from, next) {
                this.currentStore = this.findStoreBySlug(to.params.id);
                if (this.currentStore === null || this.currentStore === undefined){
                    this.$router.replace({ name: '404'});
                }
            },
            watch: {
                currentStore: function() {
                    var vm = this;
                    var temp = [];
                    _.forEach(this.currentStore.promotions, function(value, key) {
                        temp.push(vm.findPromoById(value));
                    });
                    this.promotions = temp;
                    
                    var storeHours = [];
                    _.forEach(this.currentStore.store_hours, function(value, key) {
                        storeHours.push(vm.findHourById(value));
                    });
                    this.hours = storeHours;
                }
            },
            computed: {
                findStoreBySlug() {
                    return this.$store.getters.findStoreBySlug;
                },
                findHourById() {
                    return this.$store.getters.findHourById;
                },
                findPromoById() {
                    return this.$store.getters.findPromoById;
                },
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
            },
            methods: {
                truncate(val_description){
                    var truncate = _.truncate(val_description, { 'length': 249, 'separator': ' ' });
                    return truncate;
                },
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                }
            }
        });
    });
</script>