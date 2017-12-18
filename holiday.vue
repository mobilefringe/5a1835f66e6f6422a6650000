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
            <div> <!-- If there are blog posts -->
                <div class="row">
                    <div class="col-md-12 details-promo-header">
                        <h5>Main Attractions</h5>
                    </div>
                </div>
            </div>
            
            
            <div class="row image-row">
                <div class="col-md-3">
                    <div class="hover-container">
                        <img class="hover-image" src="http://via.placeholder.com/308x410" alt="" />
                    	<div class="hover-text-container hover-scale">
                    		<div class="hover-text">Lorem ipsum dolor sit amet</div>
                    	</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="hover-container">
                        <img class="hover-image" src="http://via.placeholder.com/308x410" alt="" />
                    	<div class="hover-text-container hover-scale">
                    		<div class="hover-text">Lorem ipsum dolor sit amet</div>
                    	</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="hover-container">
                        <img class="hover-image" src="http://via.placeholder.com/308x410" alt="" />
                    	<div class="hover-text-container hover-scale">
                    		<div class="hover-text">Lorem ipsum dolor sit amet</div>
                    	</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="hover-container">
                        <img class="hover-image" src="http://via.placeholder.com/308x410" alt="" />
                    	<div class="hover-text-container hover-scale">
                    		<div class="hover-text">Lorem ipsum dolor sit amet</div>
                    	</div>
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
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("holiday-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    currentPage: null,
                    currentBlog: null
                }
            },
            mounted () {
                this.currentBlog = _.reverse(_.orderBy(this.blogs("Holiday Attractions").posts, function(o) { return o.publish_date }));
            },
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
                blogs() {
                    return this.$store.getters.findBlogByName;
                }
            },
            methods: {
                
            }
        });
    });
</script>
