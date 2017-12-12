<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row">
            <div class="col-md-12">
                <slick ref="slick" :options="slickOptions">
                    <div v-for="banner in historyBanners" v-if="historyBanners">
                        <img :src="banner.image_url" class="" alt="">
                    </div>
                </slick>
        
                <img class="margin-30" src="http://via.placeholder.com/1920x640" alt="" />
            </div>
            <div class="col-md-8">
                <h2>The History of NorthPark</h2>
                <div class="visit-desc" v-if="history" v-html="history.body"></div>
            </div>
            <div class="col-md-4">
                <div class="sidebar">
                    <p>EVERY COMPANY HAS A SPECIAL RESPONSIBILITY TO ENRICH THE LIVES OF ITS CUSTOMERS AND THE COMMUNITY. IT SHOULD SERVE AS A CATALYST TO LINK ART AND BUSINESS FOR THE BENEFIT OF ALL.</p>
                    <p>
                        -RAYMOND D. NASHER
                    </p>
                </div>    
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <img class="margin-30" src="http://via.placeholder.com/1920x640" alt="" />
            </div>
            <div class="col-md-4">
                <div class="sidebar-left">
                    <p>THE 50TH ANNIVERSARY OF NORTHPARK CENTER LOREM IPSUM DOLOR SIT AMET, CONSECTETUER ADIPISCING ELIT, SED DIAM NONUMMY NIBH EUISMOD TINCIDUNT UT LAOREET DOLORE MAGNA AL.</p>
                    <p>-NANCY A. NASHER</p>
                </div>    
            </div>
            <div class="col-md-8">
                <h2>The 50th Anniversary</h2>
                <div class="visit-desc" v-if="anniversary" v-html="anniversary.body"></div>
                <router-link to="/photo-gallery">
                    <p class="details-link">View 50th Anniversary Photo Gallery <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                </router-link>
            </div>
            
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i> History</p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue!vue-slick"], function(Vue, moment, tz, VueMoment, Meta, slick) {
        Vue.use(Meta);
        return Vue.component("history-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    currentPage: null,
                    history: null,
                    anniversary: null,
                    slickOptions: {
                        slidesToShow: 1,
                        dots : true,
                        arrows:true,
                        prevArrow: '.prev',
                        nextArrow: '.next',
                        autoplay: false
                        // Any other options that can be got from plugin documentation
                    }
                }
            },
            mounted () {
                this.historyBanners = this.getHistoryBanners
                console.log(historyBanners)
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    //History
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-history.json"}).then(response => {
                        vm.history = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });
                    //Anniversary
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-50th-anniversary.json"}).then(response => {
                        vm.anniversary = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });
                })
            },
            beforeRouteUpdate (to, from, next) {
                //History
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-history.json"}).then(response => {
                    this.history = response.data;
                    console.log(this.history);
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
                //Anniversary
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-50th-anniversary.json"}).then(response => {
                    this.anniversary = response.data;
                    console.log(this.anniversary);
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
                },
                historyBanners() {
                    var repo = _.filter(this.$store.state.results.repos, function(o) { return o.name == "history banners" })
                    console.log(repo)
                    var repo_images = repo[0].images
                    console.log(repo_images)
                    return repo_images
                },
                // getHistoryBanners(){
                //     var repo = _.filter(this.$store.state.results.repos, function(o) { return o.name == "history banners" })
                //     console.log(repo)
                //     // return repo
                // }
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
