<template>
    <div class=""> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div v-if="sectionOne">
            <img :src="sectionOne.photo_url_abs" alt="Art Collection Banner"/>    
            <div class="page-container">
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="art-quote">{{ sectionOne.description }}</h1>
                        <p class="art-quote-subtext">-{{ sectionOne.name }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-container">
            <div class="row image-row">
                <div class="col-md-4" v-if="sectionTwo">
                    <div class="hover-container">
                        <img class="hover-image" :src="sectionTwo.photo_url_abs" alt="" />
                    	<div v-if="sectionTwo.url" class="hover-text-container hover-scale">
                    	    <router-link :to="sectionTwo.url">
                    		    <div class="hover-text">Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></div>
                    	    </router-link>
                    	</div>
                    	<div v-if="!sectionTwo.url"class="hover-text-container hover-scale">
                    		<div class="hover-text">View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></div>
                    	</div>
                    </div>
                </div>
                <div class="col-md-4" v-if="sectionThree">
                    <div class="hover-container">
                        <img class="hover-image" :src="sectionThree.photo_url_abs" alt=""/>
                    	<div v-if="sectionThree.url" class="hover-text-container hover-scale">
                    	    <router-link :to="sectionThree.url">
                    		    <div class="hover-text">Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></div>
                    	    </router-link>
                    	</div>
                    	<div v-if="!sectionThree.url"class="hover-text-container hover-scale">
                    		<div class="hover-text">View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></div>
                    	</div>
                    </div>
                </div>
                <div class="col-md-4" v-if="sectionFour">
                    <div class="hover-container">
                        <img class="hover-image" :src="sectionFour.photo_url_abs" alt=""/>
                    	<div v-if="sectionFour.url" class="hover-text-container hover-scale">
                    	    <router-link :to="sectionFour.url">
                    		    <div class="hover-text">Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></div>
                    	    </router-link>
                    	</div>
                    	<div v-if="!sectionFour.url"class="hover-text-container hover-scale">
                    		<div class="hover-text">View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></div>
                    	</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="image-row">
            <div class="hover-container">
                <img class="hover-image" src="http://via.placeholder.com/1920x640" alt="" />
            	<div class="hover-text-container hover-scale">
            		<div class="hover-text">Lorem ipsum dolor sit amet</div>
            	</div>
            </div>
        </div>
        <div class="page-container">
            <div class="row">
                <div class="col-md-12">
                    <div class="hours-management" v-if="currentPage" v-html="currentPage.body"></div>
                </div>
            </div>
            <div class="row image-row">
                <div class="col-md-6">
                    <div class="hover-container">
                        <img class="hover-image" src="http://via.placeholder.com/468x410" alt="" />
                    	<div class="hover-text-container hover-scale">
                    		<div class="hover-text">Lorem ipsum dolor sit amet</div>
                    	</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="hover-container">
                        <img class="hover-image" src="http://via.placeholder.com/468x410" alt="" />
                    	<div class="hover-text-container hover-scale">
                    		<div class="hover-text">Lorem ipsum dolor sit amet</div>
                    	</div>
                    </div>
                </div>
            </div>
            <div class="row image-row">
                <div class="col-md-12">
                    <div class="hover-container">
                        <img class="hover-image" src="http://via.placeholder.com/960x530" alt="" />
                    	<div class="hover-text-container hover-scale">
                    		<div class="hover-text">Lorem ipsum dolor sit amet</div>
                    	</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;Collection Overview</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("art-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    currentPage: null,
                    section1: 35507,
                }
            },
            mounted () {
                this.images
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-about-the-collection.json"}).then(response => {
                        vm.currentPage = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });
                })
            },
            beforeRouteUpdate (to, from, next) {
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-about-the-collection.json"}).then(response => {
                    this.currentPage = response.data;
                    console.log(this.currentPage);
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
            },
            computed: {
                property() {
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
                hours() {
                    var hours = _.filter(this.$store.state.results.hours, function(o) { return o.store_ids==null && o.is_holiday==0 })
                    return hours;
                },
                images() {
                    var repo = _.filter(this.$store.state.results.repos, function(o) { return o.name == "Art Collection Overview" })
                    var repo_images = _.orderBy(repo[0].images, function(o) { return o.id });
                    console.log(repo_images)
                    return repo_images
                },
                sectionOne(){
                    var sectionID = 35507
                    var sectionOne = [];
                    _.forEach(this.images, function(value, key) {
                        var itemID = value.id
                        if(itemID === sectionID){
                            sectionOne.push(value);
                        }
                    });
                    console.log(sectionOne)
                    return sectionOne[0];
                },
                sectionTwo(){
                    var sectionID = 35508
                    var sectionTwo = [];
                    _.forEach(this.images, function(value, key) {
                        var itemID = value.id
                        if(itemID === sectionID){
                            sectionTwo.push(value);
                        }
                    });
                    console.log(sectionTwo)
                    return sectionTwo[0];
                },
                sectionThree(){
                    var sectionID = 35509
                    var sectionThree = [];
                    _.forEach(this.images, function(value, key) {
                        var itemID = value.id
                        if(itemID === sectionID){
                            sectionThree.push(value);
                        }
                    });
                    console.log(sectionThree)
                    return sectionThree[0];
                },
                sectionFour(){
                    var sectionID = 35510
                    var sectionFour = [];
                    _.forEach(this.images, function(value, key) {
                        var itemID = value.id
                        if(itemID === sectionID){
                            sectionFour.push(value);
                        }
                    });
                    console.log(sectionFour)
                    return sectionFour[0];
                },
                sectionFour(){
                    var sectionID = 35510
                    var sectionFour = [];
                    _.forEach(this.images, function(value, key) {
                        var itemID = value.id
                        if(itemID === sectionID){
                            sectionFour.push(value);
                        }
                    });
                    console.log(sectionFour)
                    return sectionFour[0];
                },
            },
            methods: {
                checkID(item_id) {
                    console.log(item_id == this.section1)
                    return item_id == this.section1
    
                }
            }
        });
    });
</script>
