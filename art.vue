<template>
    <div class=""> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <img src="http://via.placeholder.com/1920x640" alt="" />
        <div class="page-container">
            <div class="row">
                <div class="col-md-12">
                    <!-- QUOTE -->
                    <h1 class="art-quote">NORTHPARK CENTER HAS A LONG AND GREAT TRADITION OF EXHIBITING SIGNIFICANT CONTEMPORARY ARTWORK, AND I THINK IT IS WONDERFUL THAT THE TRADITION CONTINUES INTO THE PRESENT.</h1>
                    <p class="art-quote-subtext">JOEL SHAPIRO</p>
                </div>
            </div>
            <div class="row image-row">
                <div class="col-md-4">
                    <div class="hover-container">
                        <img class="hover-image" src="http://via.placeholder.com/308x410" alt="" />
                    	<div class="hover-text-container hover-scale">
                    		<div class="hover-text">Lorem ipsum dolor sit amet</div>
                    	</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="hover-container">
                        <img class="hover-image" src="http://via.placeholder.com/308x410" alt="" />
                    	<div class="hover-text-container hover-scale">
                    		<div class="hover-text">Lorem ipsum dolor sit amet</div>
                    	</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="hover-container">
                        <img class="hover-image" src="http://via.placeholder.com/308x410" alt="" />
                    	<div class="hover-text-container hover-scale">
                    		<div class="hover-text">Lorem ipsum dolor sit amet</div>
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
                    <div class="hours-management" v-html="currentPage.body"></div>
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
                }
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
                    var repo_images = repo[0].images
                    console.log(repo_images)
                    return repo_images
                },
            },
            methods: {
            
            }
        });
    });
</script>
