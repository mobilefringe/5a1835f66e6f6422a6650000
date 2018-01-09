<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row">
            <div class="col-md-4 col-md-push-8">
                <div class="sidebar">
                    <div class="sidebar-container">
                        <h5>Hours</h5>
                        <ul class="sidebar-hours-list">
                            <li v-for="hour in hours">
                               {{day_of_the_week(hour.day_of_week)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
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
                            {{property.contact_phone}}
                        </p>
                    </div>
                    <div class="sidebar-container">
                        <a class="details-link" href="https://www.google.com/maps/place/NorthPark+Center/@32.868225,-96.773204,15z/data=!4m5!3m4!1s0x0:0x95fc10ba98f7aad4!8m2!3d32.8680671!4d-96.7735128?hl=en-US" target="_blank">Get Directions <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
            <div class="col-md-8 col-md-pull-4">
                <div v-if="pageBanner">
                    <img class="margin-30" :src="pageBanner.image_url" alt="">
                </div>
                <div class="" v-if="tourism">
                    <h2 class="tourism-title">Tourism</h2>
                    <div class="margin-30" v-html="tourism.body"></div>
                    <hr class="hidden-mobile">
                    <div class="visible-mobile margin-120"></div>
                </div>
                <div class="" v-if="guestRewards">
                    <h2 class="tourism-title">Guest Rewards</h2>
                    <div class="visit-desc" v-html="guestRewards.body"></div>
                    <div class="tourism-newsletter-container margin-30">
                        <form action="https://mobilefringe.createsend.com/t/d/s/fldilt/" method="post" id="tourismForm">
                            <label for="fieldEmail">Email</label><br />
                            <div class="tourism-form">
                                <input id="fieldEmail" name="cm-fldilt-fldilt" type="email" required />
                                <button class="submit" type="submit"><i class="fa fa-angle-right" aria-hidden="true"></i></button>    
                            </div>
                        </form>
                    </div>
                    <hr class="hidden-mobile">
                    <div class="visible-mobile margin-120"></div>
                </div>
                <div class="" v-if="groupVisits">
                    <h2 class="tourism-title">Group Visits</h2>
                    <div class="margin-60" v-html="groupVisits.body"></div>
                    <div class="tourism-newsletter-container margin-30">
                        <form action="" method="post">
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="">First Name</label>
                                    <input class="" id="" name="" type="text" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="">Last Name</label>
                                    <input class="" id="" name="" type="text" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <label for="fieldEmail">Email</label>
                                    <input class="" id="fieldEmail" name="cm-jhithd-jhithd" type="email" required>
                                    <button class="news-submit" type="submit"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <hr class="hidden-mobile">
                    <div class="visible-mobile margin-120"></div>
                </div>
                <div class="" v-if="taxFreeShopping">
                    <h2 class="tourism-title">Tax-Free Shopping</h2>
                    <div class="margin-60" v-html="taxFreeShopping.body"></div>
                    <hr class="hidden-mobile">
                    <div class="visible-mobile margin-120"></div>
                </div>
                <div class="margin-90" v-if="unionPay">
                    <h2 class="tourism-title">Union Pay</h2>
                    <div class="" v-html="unionPay.body"></div>
                </div>
            </div>
            
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}} <i class="fa fa-angle-right" aria-hidden="true"></i> <breadcrumbs>{{ breadcrumb }}</breadcrumbs> <i class="fa fa-angle-right" aria-hidden="true"></i>  Tourism</p>
            </div>
        </div>
    </div>
</template>

<script>

define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function (Vue, moment, tz, VueMoment, Meta) {
    Vue.use(Meta);
    return Vue.component("visit-component", {
        template: template, // the variable template will be injected
        data: function data() {
            return {
                breadcrumb: null,
                mainPage: null,
                tourism: null,
                guestRewards: null,
                groupVisits: null,
                taxFreeShopping: null,
                unionPay: null
            };
        },
        beforeRouteEnter: function beforeRouteEnter(to, from, next) {
            next(function (vm) {
                // access to component instance via `vm`
                //Tourism Main Page
                vm.$store.dispatch('LOAD_PAGE_DATA', { url: vm.property.mm_host + "/pages/northpark-tourism.json" }).then(function (response) {
                    vm.mainPage = response.data;
                }, function (error) {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    vm.$router.replace({ name: '404' });
                });
            });
        },
        beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
            var _this = this;

            //Tourism Main Page
            this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host + "/pages/northpark-tourism.json" }).then(function (response) {
                _this.mainPage = response.data;
            }, function (error) {
                console.error("Could not retrieve data from server. Please check internet connection and try again.");
                _this.$router.replace({ name: '404' });
            });
        },
        watch: {
            mainPage: function mainPage() {
                if (this.mainPage != null) {
                    this.tourism = this.mainPage.subpages[0];
                    this.guestRewards = this.mainPage.subpages[1];
                    this.groupVisits = this.mainPage.subpages[2];
                    this.taxFreeShopping = this.mainPage.subpages[3];
                    this.unionPay = this.mainPage.subpages[4];
                }
            }
        },
        computed: {
            property: function property() {
                return this.$store.getters.getProperty;
            },
            timezone: function timezone() {
                return this.$store.getters.getTimezone;
            },
            hours: function hours() {
                var hours = _.filter(this.$store.state.results.hours, function (o) {
                    return o.store_ids == null && o.is_holiday == 0;
                });
                return hours;
            },
            pageBanner: function pageBanner() {
                var repo = _.filter(this.$store.state.results.repos, function (o) {
                    return o.name == "Tourism";
                });
                var repo_images = repo[0].images[0];
                return repo_images;
            }
        },
        methods: {
            day_of_the_week: function day_of_the_week(val_day) {
                weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                return weekday[val_day];
            }
        }
    });
});</script>
