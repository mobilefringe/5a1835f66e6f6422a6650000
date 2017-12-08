<template>
    <div> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <img class="margin-90" src="http://via.placeholder.com/1920x640" alt="" />
        <div class="page-container">
            <div class="row">
                <div class="col-md-9" v-if="mainPage">
                    <div class="" v-if="tourism">
                        <h2 class="visit-title">Tourism</h2>
                        <div class="visit-desc" v-html="getTourismPage(mainPage)"></div>
                        <router-link to="/pages/northpark-parking-valet-page" active-class="active" exact>
                            <p class="visit-link details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                        </router-link>
                        <hr>
                    </div>
                    <div class="" v-if="guestRewards">
                        <h2 class="visit-title">Guest Rewards</h2>
                        <div class="visit-desc" v-html="guestRewards.body"></div>
                        <router-link to="/pages/northpark-concierge-services" active-class="active" exact>
                            <p class="visit-link details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                        </router-link>
                        <hr>
                    </div>
                    <div class="" v-if="groupVisits">
                        <h2 class="visit-title">Group Visits</h2>
                        <div class="visit-desc" v-html="groupVisits.body"></div>
                        <router-link to="/pages/northpark-northpark-gold-gift-cards" active-class="active" exact>
                            <p class="visit-link details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                        </router-link>
                        <hr>
                    </div>
                    <div class="" v-if="taxFreeShopping">
                        <h2 class="visit-title">Tax-Free Shopping</h2>
                        <div class="visit-desc" v-html="taxFreeShopping.body"></div>
                        <router-link to="/pages/northpark-international-visitors" active-class="active" exact>
                            <p class="visit-link details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                        </router-link>
                        <hr>
                    </div>
                    <div class="" v-if="unionPay">
                        <h2 class="visit-title">Union Pay</h2>
                        <div class="visit-desc" v-html="unionPay.body"></div>
                        <router-link to="/pages/northpark-contact-us" active-class="active" exact>
                            <p class="visit-link details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                        </router-link>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="sidebar-container">
                        <h5>Hours</h5>
                        <ul class="sidebar-hours-list">
                            <li v-for="hour in hours">
                               {{day_of_the_week(hour.day_of_week)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                                </span>
                            </li>
                        </ul> 
                        <router-link to="/hours" active-class="active" exact>
                            <a class="details-link">View Detailed Hours <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                        </router-link>
                    </div>
                    <div class="sidebar-container">
                        <h5 class="">Find Us</h5>
                        <p>
                            {{property.name}}<br/>
                            {{property.address1}}<br/>
                            {{property.city}}, {{property.province_state}} {{property.postal_code}}<br/>
                            {{property.contact_phone}}
                        </p>
                        <p>Northpark Center Concierge</p>
                        <router-link to="" active-class="active" exact>
                            <a class="details-link">Get Directions <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp; Tourism</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("visit-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    mainPage: null,
                    tourism: null,
                    guestRewards: null,
                    groupVisits: null,
                    taxFreeShopping: null,
                    unionPay: null,
                }
            },
            mounted () {
                this.mainPage
                
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    //Tourism Main Page
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-tourism.json"}).then(response => {
                        vm.mainPage = response.data;
                        console.log(response.data)
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    }); 
                })
            },
            beforeRouteUpdate (to, from, next) {
                //Tourism Main Page
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-tourism.json"}).then(response => {
                    this.mainPage = response.data;
                    console.log(response.data)
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
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
                }
            },
            methods: {
                getTourismPage(mainPage){
                    console.log("Main Page" + this.mainPage)
                }
                subpages() {
                    console.log("Main Page" + this.mainPage)
                },
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                }
            }
        });
    });
</script>
