<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin_90"></div>
        <div class="row" v-if="currentBlog">
            <div class="col-md-9 margin_60">
                <div class="row">
                    <div class="col-md-2">
                        <p class="details-promo-date">{{currentBlog.publish_date | moment("ddd", timezone)}}</p>
                        <p class="details-promo-day">{{currentBlog.publish_date | moment("D", timezone)}}</p>
                        <p class="details-promo-date">{{currentBlog.publish_date | moment("MMM", timezone)}}</p>
                    </div>
                    <div class="col-md-10">
                        <p class="blog-category">Blog Category</p>
                        <h2 class="">{{currentBlog.title}}</h2> 
                        <p class="blog-author">By {{currentBlog.author}} | {{currentBlog.publish_date | moment("MM-D-YYYY", timezone)}}</p>
                        <img :src="currentBlog.image_url" class="margin_60" alt="" />
                        <div>{{currentBlog.body}}</div>
                        
                        <social-sharing url="https://vuejs.org/" :title="currentBlog.title" :description="currentBlog.body" :quote="truncate(currentBlog.body)" twitter-user="vuejs" inline-template>
                            <div>
                                <network network="facebook">
                                    <i class="fa fa-facebook-square"></i> Facebook
                                </network>
                                <network network="twitter">
                                    <i class="fa fa-twitter-square"></i> Twitter
                                </network>
                                <network network="pinterest">
                                    <i class="fa fa-pinterest-square"></i> Pinterest
                                </network>
                            </div>
                        </social-sharing>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <h5>Related Blogs</h5>
                
                <h5>Get Connected</h5>
                <p>Subscribe to our newsletter and receive insider information on events, exclusive sales, special offers and much more.</p>
                <div class="blog-newsletter-container">
                    <form action="https://mobilefringe.createsend.com/t/d/s/jhithd/" method="post">
                        <input class="" id="fieldEmail" name="cm-jhithd-jhithd" type="email" required placeholder="Enter Your Email"/>
                        <button class="news-submit" type="submit"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                    </form>
                </div>
            </div>
        </div>
    
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}} <i class="fa fa-angle-right" aria-hidden="true"></i> News <i class="fa fa-angle-right" aria-hidden="true"></i> {{currentBlog.title}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue-social-sharing"], function(Vue, moment, tz, VueMoment, Meta, SocialSharing) {
        return Vue.component("news-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    title: "MM with Vue.js!",
                    description: "An example of integration of Mall Maverick with Vue.js",
                    blogName: "main",
                    currentBlog: null,
                    currentPost: null
                }
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    var blogName = "main";
                    vm.currentBlog = vm.findBlogPostBySlug(blogName, to.params.id);
                    console.log(vm.currentBlog)
                    if (vm.currentBlog === null || vm.currentBlog === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate(to, from, next) {
                var blogName = "main";
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
                truncate(val_body){
                    var truncate = _.truncate(val_body, { 'length': 99, 'separator': ' ' });
                    return truncate;
                },
            }
        });
    });
</script>