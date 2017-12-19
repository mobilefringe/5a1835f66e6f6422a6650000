<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row" v-if="currentBlog">
            <div class="col-md-8 margin-60">
                <div class="row">
                    <div class="col-md-2">
                        <p class="details-promo-date">{{currentBlog.publish_date | moment("ddd", timezone)}}</p>
                        <p class="details-promo-day">{{currentBlog.publish_date | moment("D", timezone)}}</p>
                        <p class="details-promo-date">{{currentBlog.publish_date | moment("MMM", timezone)}}</p>
                    </div>
                    <div class="col-md-10">
                        <social-sharing :url="shareURL(currentBlog.slug)" :title="currentBlog.title" :description="currentBlog.body" :quote="truncate(currentBlog.body)" twitter-user="NorthParkCenter" :media="currentBlog.image_url" inline-template>
                            <div class="blog-social-share">
                                <h5>Share</h5>
                                <network network="facebook">
                                    <i class="fa fa-facebook-square"></i>
                                </network>
                                <network network="twitter">
                                    <i class="fa fa-twitter-square"></i>
                                </network>
                                <network network="pinterest">
                                    <i class="fa fa-pinterest-square"></i>
                                </network>
                            </div>
                        </social-sharing>
                        <p class="blog-category">{{ tagString(currentBlog.tag) }}</p>
                        <h2 class="">{{currentBlog.title}}</h2> 
                        <p class="blog-author">By {{currentBlog.author}} | {{currentBlog.publish_date | moment("MM-D-YYYY", timezone)}}</p>
                        <div v-html="currentBlog.html_body"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="sidebar">
                    <div class="sidebar-container">
                        <h5>Related Blogs</h5>
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<span v-if="currentBlog">{{currentBlog.title}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {

        return Vue.component("holiday-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    blogName: "main",
                    currentBlog: null,
                    currentPost: null
                }
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    var blogName = "Holiday Attractions";
                    vm.currentBlog = vm.findBlogPostBySlug(blogName, to.params.id);
                    console.log(vm.currentBlog)
                    if (vm.currentBlog === null || vm.currentBlog === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate(to, from, next) {
                var blogName = "Holiday Attractions";
                this.currentBlog = this.findBlogPostBySlug(blogName, to.params.id);
                console.log(this.currentBlog)
                if (this.currentBlog === null || this.currentBlog === undefined){
                    this.$router.replace({ name: '404'});
                }
            },
            computed: {
                findBlogPostBySlug () {
                    return this.$store.getters.findBlogPostBySlug;
                },
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                }
            },
            methods: {
                tagString(val_tag){
                    var string = _.join(val_tag, ' , ')  
                    return string
                },
                truncate(val_body){
                    var truncate = _.truncate(val_body, { 'length': 99, 'separator': ' ' });
                    return truncate;
                },
                shareURL(slug){
                    var share_url = "http://www.northparkcenter.com/news/" + slug
                    return share_url
                }
            }
        });
    });
</script>