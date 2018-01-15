<template>
    <div v-if="dataLoaded"> <!-- without an outer container div this component template will not render -->
        <div class="margin-90 hidden-mobile"></div>
        <div class="image-container">
            <div v-if="currentBlog">
                <slick ref="slick" :options="slickOptions">
                    <div v-for="image in currentBlog.additional_images">
                        <img class="margin-60" :src="image.image_url" alt="Holiday Event Image">
                    </div>
                </slick>
            </div>
        </div>
        <div class="page-container">
            <div class="row margin-90" v-if="currentBlog">
                <div class="col-md-8">
                    <h2 class="">{{currentBlog.title}}</h2> 
                    <div v-html="currentBlog.html_body"></div>
                    <div class="visible-mobile margin-30">
                        <hr>    
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="sidebar">
                        <div class="sidebar-container">
                            <div v-html="currentBlog.caption"></div>
                        </div>
                    </div>
                </div>
            </div>
            <page-breadcrumb></page-breadcrumb>
        </div>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue!vue-slick", "vue!page_breadcrumb.vue"], function(Vue, Vuex, moment, tz, VueMoment, Meta, slick, PageBreadcrumbComponent) {
        return Vue.component("holiday-details-component", {
            template: template, // the variable template will be injected,
            props:['id'],
            data: function() {
                return {
                    dataLoaded: false,
                    currentBlog: null,
                    currentPost: null,
                    slickOptions: {
                        autoplay: false,
                        cssEase: 'linear',
                        dots: false,
                        slidesToShow: 1,
                        speed: 500,
                    }
                }
            },
            created(){
                this.$store.dispatch("getData", "blogs").then(response => {
                    console.log(this);
                    var blogName = "Holiday Attractions";
                    this.currentBlog = this.findBlogPostBySlug(blogName, to.params.id);
                    console.log(this.currentBlog)
                    if (this.currentBlog === null || this.currentBlog === undefined){
                        this.$router.replace({ name: '404'});
                    }
                }, error => {
                  console.error("Could not retrieve data from server. Please check internet connection and try again.");
                });
            },
            created(){
                this.$store.dispatch("getData", "blogs").then(response => {
                    this.dataLoaded = true
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                });
            },
            // beforeRouteEnter(to, from, next) {
            //     next(vm => {
            //         // access to component instance via `vm`
            //         var blogName = "Holiday Attractions";
            //         vm.currentBlog = vm.findBlogPostBySlug(blogName, to.params.id);
            //         if (vm.currentBlog === null || vm.currentBlog === undefined){
            //             vm.$router.replace({ name: '404'});
            //         }
            //     })
            // },
            // beforeRouteUpdate(to, from, next) {
            //     var blogName = "Holiday Attractions";
            //     this.currentBlog = this.findBlogPostBySlug(blogName, to.params.id);
            //     console.log(this.currentBlog)
            //     if (this.currentBlog === null || this.currentBlog === undefined){
            //         this.$router.replace({ name: '404'});
            //     }
            // },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'blogs',
                    'findBlogPostBySlug',
                ])
            }
        });
    });
</script>