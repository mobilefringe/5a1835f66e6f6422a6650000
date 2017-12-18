<template>
    <div class=""> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div v-if="sectionOne">
            <div class="gallery-banner" v-bind:style="{ backgroundImage: 'url(' + sectionOne.image_url + ')' }"></div>
            <div class="page-container">
                <div class="row margin-30">
                    <div class="col-md-12">
                        <h1 class="art-quote">{{ sectionOne.description }}</h1>
                        <p class="art-quote-subtext">-{{ sectionOne.name }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-container">
            <div class="row ">
                <div class="col-md-12">
                    <div class="margin-60" v-if="currentPage" v-html="currentPage.body"></div>
                </div>
                <div class="col-md-12" v-if="sectionTwo">
                    <a :href="sectionTwo.image_url" target="_blank">
                        <p class="art-quote-subtext">Download Holiday Map</p>
                    </a>
                </div>
            </div>
            <div v-if="holidayBlog">
                <div class="row">
                    <div class="col-md-12 details-promo-header">
                        <h5>Main Attractions</h5>
                    </div>
                </div>
                <div class="row">
                    <slick ref="slick" :options="slickOptions">
                        <div v-for="post in holidayBlog">
                            <router-link :to="{ name: 'holidayDetails', params: { id: post.slug }}">
                                <img :src="post.image_url" class="" alt="">
                                <h5 class="details-title">{{ post.title }}</h5>
                            </router-link>
                        </div>
                    </slick>
                </div>
            </div>
            <div v-if="holidayEvents">
                <div class="row">
                    <div class="col-md-12 details-promo-header">
                        <h5>Holiday Events & Activities</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-7">
                        <div class="row" v-for="event in holidayEvents">
                            <div class="col-md-2">
                                <p class="details-promo-date">{{event.start_date | moment("ddd", timezone)}}</p>
                                <p class="details-promo-day">{{event.start_date | moment("D", timezone)}}</p>
                                <p class="details-promo-date">{{event.start_date | moment("MMM", timezone)}}</p>
                            </div>
                            <div class="col-md-10">
                                <h5 class="details-dates">{{ checkEventDates(event) }}</h5>
                                <h2>{{ event.name }}</h2>
                                <p class="sub_title" v-if="event.store">{{ event.store.name }}</p><p class="sub_title" v-else>{{ property.name}}</p>
                                <router-link :to="{ name: 'eventDetails', params: { id: event.slug }}">
                                    <p class="details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                                </router-link>
                            </div>
                            <div class="col-md-12">
                                <hr>    
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">    
                    
                    </div>
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
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue!vue-slick"], function(Vue, moment, tz, VueMoment, Meta, slick) {
        Vue.use(Meta);
        return Vue.component("holiday-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    currentPage: null,
                    currentBlog: null,
                    slickOptions: {
                        // arrows: true,
                        autoplay: false,
                        cssEase: 'linear',
                        dots: false,
                        // fade: true,
                        // infinite: true,
                        slidesToShow: 4,
                        speed: 500,
                    //     prevArrow: '.prev',
                    //     nextArrow: '.next'
                    }
                }
            },
            // mounted () {
            //     this.currentBlog = this.holidayBlog
            //     console.log(this.currentBlog)
            // },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-northpark-holiday.json"}).then(response => {
                        vm.currentPage = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });
                })
            },
            beforeRouteUpdate (to, from, next) {
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-northpark-holiday.json"}).then(response => {
                    this.currentPage = response.data;
                    console.log(this.currentPage);
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone(){
                    return this.$store.getters.getTimezone;
                },
                images(){
                    var repo = _.filter(this.$store.state.results.repos, function(o) { return o.name == "Holiday" })
                    var repo_images = _.orderBy(repo[0].images, function(o) { return o.id });
                    return repo_images
                },
                sectionOne(){
                    var sectionID = 35593
                    var sectionOne = [];
                    _.forEach(this.images, function(value, key) {
                        var itemID = value.id
                        if(itemID === sectionID){
                            sectionOne.push(value);
                        }
                    });
                    return sectionOne[0];
                },
                sectionTwo(){
                    var sectionID = 35595
                    var sectionTwo = [];
                    _.forEach(this.images, function(value, key) {
                        var itemID = value.id
                        if(itemID === sectionID){
                            sectionTwo.push(value);
                        }
                    });
                    return sectionTwo[0];
                },
                holidayBlog() {
                    var blog = this.$store.getters.findBlogByName;
                    var holiday_blog = _.orderBy(blog("Holiday Attractions").posts, function(o) { return o.publish_date });
                    return holiday_blog
                },
                holidayEvents(){
                   var holiday_events = [];
                   console.log(this.$store.getters.processedEvents)
                    _.forEach(this.$store.getters.processedEvents, function(value, key) {
                        var tag_string = _.toLower(_.join(value.tag, ''));
                        var holiday_string = _.includes(tag_string, "holiday");
                        if(holiday_string === true){
                            holiday_events.push(value);
                        }
                    });
                    console.log(holiday_events)
                    if(holiday_events.length > 0){
                        return holiday_events;
                    }
                }
            },
            methods: {
                
            }
        });
    });
</script>
