<template>
    <div v-if="dataLoaded" class="page-container" v-cloak> <!-- without an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row">
            <div class="col-md-4 col-md-push-8">
                <div class="sidebar">
                    <div class="sidebar-container">
                        <h5>Hours</h5>
                        <ul class="sidebar-hours-list">
                            <li v-if="getPropertyHours" v-for="hour in getPropertyHours">
                               {{hour.day_of_week | moment("dddd", timezone)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
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
                    <div class="visible-mobile margin-30">
                        <hr>    
                    </div>
                </div>
            </div>
            <div class="col-md-8 col-md-pull-4">
                <div v-if="pageBanner" v-for="banner in pageBanner">
                    <img class="margin-30" :src="banner.image_url" alt="Tourism Banner">
                </div>
                <div class="" v-if="tourism">
                    <h2 class="tourism-title">Tourism</h2>
                    <div class="margin-30" v-html="tourism.body"></div>
                    <hr>
                </div>
                <div class="" v-if="guestRewards">
                    <h2 class="tourism-title">Guest Rewards</h2>
                    <div class="visit-desc" v-html="guestRewards.body"></div>
                    <div class="tourism-newsletter-container margin-30">
                        <form action="https://mobilefringe.createsend.com/t/d/s/fldilt/" method="post" id="tourismForm">
                            <label for="fieldEmail">Email</label>
                            <div class="tourism-form">
                                <input id="fieldEmail" name="cm-fldilt-fldilt" type="email" required />
                                <button class="submit" type="submit"><i class="fa fa-angle-right" aria-hidden="true"></i></button>    
                            </div>
                        </form>
                    </div>
                    <hr>
                </div>
                <div class="" v-if="groupVisits">
                    <h2 class="tourism-title">Group Visits</h2>
                    <div class="margin-30" v-html="groupVisits.body"></div>
                    <div class="tourism-contact-container margin-30">
                        <form class="form-horizontal" action="form-submit" v-on:submit.prevent="validateBeforeSubmit">
                            <div class="form-group ">
                                <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('name')}">
                                    <label for="name">Name</label>
                                    <input v-model="form_data.name" v-validate="'required|alpha_spaces'" class="form-control" :class="{'input': true}" name="name" type="text" data-vv-delay="1000">
                                    <span v-show="errors.has('name')" class="form-control-feedback">{{ errors.first('name') }}</span>
                                </div>
                                <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
                                    <label for="email">Email</label>
                                    <input v-model="form_data.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" data-vv-delay="1000">
                                    <span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('phone')}">
                                    <label for="phone">Phone</label>
                                    <input v-model="form_data.phone" v-validate="'required|alpha_dash'" class="form-control" :class="{'input': true}" name="phone" type="phone" data-vv-delay="1000">
                                    <span v-show="errors.has('phone')" class="form-control-feedback">{{ errors.first('phone') }}</span>
                                </div>
                                <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('subject')}">
                                    <label for="subject">Subject</label>
                                    <input v-model="form_data.subject" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="subject" type="text" data-vv-delay="1000">
                                    <span v-show="errors.has('subject')" class="form-control-feedback">{{ errors.first('subject') }}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-xs-12" :class="{'has-error': errors.has('message')}">
                                    <label for="message">Message</label>
                                    <input v-model="form_data.message" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="message" type="text" data-vv-delay="1000">
                                    <span v-show="errors.has('message')" class="form-control-feedback">{{ errors.first('message') }}</span>
                                </div>
                            </div>
                            <div class="form-group account-btn text-left m-t-10">
                                <div class="col-xs-12">
                                    <button class="submit" type="submit" :disabled="formSuccess">
                                        Send <i class="fa fa-angle-right" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div id="send_contact_success" class="alert alert-success" role="alert" v-show="formSuccess">
                            <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                            <span class="sr-only">Success</span>
                            Thank you for contacting us. A member from our team will contact you shortly.
                        </div>
                        <div id="send_contact_error" class="alert alert-danger" role="alert" v-show="formError">
                            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                            <span class="sr-only">Error:</span>
                            There was an error when trying to submit your request. Please try again later.
                        </div>
                    </div>
                    <hr>
                </div>
                <div class="" v-if="taxFreeShopping">
                    <h2 class="tourism-title">Tax-Free Shopping</h2>
                    <div class="margin-60" v-html="taxFreeShopping.body"></div>
                    <hr>
                </div>
                <div class="margin-90" v-if="unionPay">
                    <h2 class="tourism-title">Union Pay</h2>
                    <div class="" v-html="unionPay.body"></div>
                </div>
            </div>
        </div>
        <page-breadcrumb></page-breadcrumb>
    </div>
</template>

<script>

    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "vee-validate", "vue!page_breadcrumb.vue"], function (Vue, Vuex, moment, tz, VueMoment, Meta, VeeValidate, PageBreadcrumbComponent) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        return Vue.component("visit-component", {
            template: template, // the variable template will be injected
            data: function data() {
                return {
                    dataLoaded: false,
                    mainPage: null,
                    tourism: null,
                    guestRewards: null,
                    groupVisits: null,
                    taxFreeShopping: null,
                    unionPay: null,
                    form_data : {},
                    loginPending: null,
                    formSuccess : false,
                    formError: false,
                    time: new Date()
                };
            },
            created(){
                this.$store.dispatch("getData", "repos").then(response => {
                    this.dataLoaded = true
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                });
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-tourism.json"}).then(response => {
                    this.mainPage = response.data;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
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
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'getPropertyHours',
                    'repos',
                    'findRepoByName',
                ]),
                pageBanner: function pageBanner() {
                    return this.findRepoByName("Tourism").images;
                }
            },
            methods: {
                validateBeforeSubmit() {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            let errors = this.errors;
                            // console.log("sending form data", this.form_data);
                            send_data = {};
                            send_data.form_data = JSON.stringify(this.serializeObject(this.form_data));
                            this.$store.dispatch("CONTACT_US", send_data).then(res => {
                                this.formSuccess = true;
                            }).catch(error => {
                                try {
                                    if (error.response.status == 401) {
                                        console.log("Data load error: " + error.message);
                                        this.formError = true;
                                    } 
                                    else {
                                        console.log("Data load error: " + error.message);
                                        this.formError = true;
                                    }
                                } 
                                catch (e) {
                                    console.log("Data load error: " + error.message);
                                    this.formError = true;
                                }
                            })
                        }
                    })
                },
                serializeObject (obj) {
                    // console.log(obj);
                    var newObj = [];
                    _.forEach(obj, function(value, key) {
                        var tempVal = {};
                        tempVal.name = key;
                        tempVal.value = value;
                        newObj.push(tempVal);
                    });
                    return newObj;
                }
            }
        });
    });
</script>