<template>
    <div> <!-- without an outer container div this component template will not render -->
        <np-loader v-if="!dataLoaded"></np-loader>
        <transition name="fade">
            <div v-if="dataLoaded" class="page-container" v-cloak>
                <div class="margin-90"></div>
                <div class="row">
                    <div class="col-md-8">
                        <div v-if="pageBanner" v-for="banner in pageBanner">
                            <img class="margin-30" :src="banner.image_url" alt="Tourism Banner">
                        </div>
                        <h2>Newsletter Sign Up</h2>
                        <div class="visit-desc" v-if="currentPage" v-html="currentPage.body"></div>
                        <div class="tourism-newsletter-container margin-90">
                            <form v-on:submit.prevent="validateNewsletter" class="form-horizontal" method="post" id="tourismForm">
                                <div class="tourism-form">
                                    <div class="form-group ">
                                        <div class="col-xs-12">
                                            <label for="fieldEmail">Email</label>
                                            <input class="" id="fieldEmail" name="cm-jhithd-jhithd" type="email" required />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="col-xs-12">
                                            <label class="checkbox">
                                                <input name="agree_newsletter" required  type="checkbox">
                                                    I agree to receive electronic communications from {{ property.name }}. 
                                            </label>
                                        </div>
                                    </div>
                                    <div class="form-group ">
                                        <div class="col-xs-12">
                                            <button class="submit" type="submit">
                                                Submit <i class="fa fa-angle-right" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="alert alert-success" role="alert" v-show="newsletterSuccess">
                                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                <span class="sr-only">Success</span>
                                Your subscription has been confirmed. You've been added to our list and will hear from us soon.
                            </div>
                            <div class="alert alert-danger" role="alert" v-show="newsletterError">
                                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                <span class="sr-only">Error:</span>
                                There was an error when trying to submit your request. Please try again later.
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 hidden-mobile">
                        <div class="sidebar">
                            <div class="sidebar-container">
                                <h5>Hours</h5>
                                <ul class="sidebar-hours-list">
                                    <li v-if="getPropertyHours" v-for="hour in getPropertyHours">
                                        {{hour.day_of_week | moment("dddd", timezone)}}: {{hour.open_time | moment("hA", timezone)}}-{{hour.close_time | moment("hA", timezone)}}
                                    </li>
                                </ul>
                                <br>
                                <router-link to="/hours" active-class="active" exact>
                                    <a class="details-link">View Detailed Hours <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                                </router-link>
                            </div>
                            <div class="sidebar-container">
                                <h5 class="">Find Us</h5>
                                <p class="uppercase">
                                    {{property.name}}
                                    <br> {{property.address1}}
                                    <br> {{property.city}}, {{property.province_state}} {{property.postal_code}}
                                    <br> {{property.contact_phone}}
                                </p>
                                <p class="uppercase">
                                    Northpark Center Concierge
                                    <br> {{property.contact_fax}}
                                </p>
                            </div>
                            <div class="sidebar-container">
                                <a class="details-link" href="https://www.google.com/maps/place/NorthPark+Center/@32.868225,-96.773204,15z/data=!4m5!3m4!1s0x0:0x95fc10ba98f7aad4!8m2!3d32.8680671!4d-96.7735128?hl=en-US" target="_blank">
                                    Get Directions <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                                </a>
                            </div>
                            <div class="visible-mobile margin-30">
                                <hr>
                            </div>
                        </div>
                    </div>
                </div>
                <page-breadcrumb></page-breadcrumb>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "jquery"], function (Vue, Vuex, moment, tz, VueMoment, Meta, $) {
        Vue.use(Meta);
        return Vue.component("newsletter-component", {
            template: template, // the variable template will be injected
            data: function data() {
                return {
                    dataLoaded: false,
                    currentPage: null,
                    form_data : {},
                    newsletterSuccess: false,
                    newsletterError: false
                }
            },
            created() {
                this.loadData().then(response => {
                    this.currentPage = response[1].data;
                    this.dataLoaded = true;
                });
            },
            mounted () {
                // this.form_data.email = this.$route.query.email;
                $("#fieldEmail").val(this.form_data.email);
                console.log("this.$route.query", this.$route.query);
                // if(this.$route.query.success == 'success') {
                    
                //     this.formSuccess = true;
                //     console.log('this.$router' ,this.$router);
                //     this.$router.replace('/newsletter');
                // }
            },
            watch : {
                $route () {
                    this.form_data.email = this.$route.query.email;
                    $("#fieldEmail").val(this.form_data.email);
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'getPropertyHours',
                    'repos',
                    'findRepoByName',
                ]),
                pageBanner: function pageBanner() {
                    return this.findRepoByName("Newsletter Banner").images;
                }
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "repos"), this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/northpark-newsletter-sign-up.json"})]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                validateNewsletter(form){
                    var vm = this;
                    $.getJSON(
                        "https://mobilefringe.createsend.com/t/d/s/jhithd/?callback=?",
                        $(form.target).serialize(),
                        function (data) {
                        if (data.Status === 400) {
                            vm.newsletterError = true;
                            console.log("ERROR");
                        } else { // 200
                            vm.newsletterSuccess = true;
                            console.log("SUCCESS");
                        }
                    });    
                }
            }
        });
    });
</script>