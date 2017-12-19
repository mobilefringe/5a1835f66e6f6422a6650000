<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row" v-if="currentPost">
            <div class="col-md-8 margin-60">
                <div class="row">
                    <div class="col-md-2">
                        <p class="details-promo-date">{{currentPost.publish_date | moment("ddd", timezone)}}</p>
                        <p class="details-promo-day">{{currentPost.publish_date | moment("D", timezone)}}</p>
                        <p class="details-promo-date">{{currentPost.publish_date | moment("MMM", timezone)}}</p>
                    </div>
                    <div class="col-md-10">
                        <social-sharing :url="shareURL(currentPost.slug)" :title="currentPost.title" :description="currentPost.body" :quote="truncate(currentPost.body)" twitter-user="NorthParkCenter" :media="currentPost.image_url" inline-template>
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
                        <p class="blog-category">{{ tagString(currentPost.tag) }}</p>
                        <h2 class="">{{currentPost.title}}</h2> 
                        <p class="blog-author">By {{currentPost.author}} | {{currentPost.publish_date | moment("MM-D-YYYY", timezone)}}</p>
                        <div v-html="currentPost.html_body"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="sidebar">
                    <div class="sidebar-container">
                        <h5>Related Blogs</h5>
                        <p class="blog-category">{{ relatedPost(currentPost.tag) }}</p>
                    </div>
                    <div class="sidebar-container">
                        <h5>Get Connected</h5>
                        <p>Subscribe to our newsletter and receive insider information on events, exclusive sales, special offers and much more.</p>
                        <div class="blog-newsletter-container">
                            <form action="https://mobilefringe.createsend.com/t/d/s/jhithd/" method="post">
                                <input class="" id="fieldEmail" name="cm-jhithd-jhithd" type="email" required placeholder="Enter Your Email"/>
                                <button class="news-submit" type="submit"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                            </form>
                        </div>
                    </div>
                    <div class="sidebar-container">
                        <!--<vue-instagram token="accessTokenHere" username="kevinongko" :count="5" :tags="['hashtag1', 'hashtag2']">-->
                        <!--    <template slot="feeds" slot-scope="props">-->
                                <!--<li class="fancy-list"> {{ props.feed.link }} </li>-->
                        <!--    </template>-->
                        <!--    <template slot="error" slot-scope="props">-->
                                <!--<div class="fancy-alert"> {{ props.error.error_message }} </div>-->
                        <!--    </template>-->
                        <!--</vue-instagram>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;News&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<span v-if="currentPost">{{currentPost.title}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue-social-sharing", "vue-instagram"], function(Vue, moment, tz, VueMoment, Meta, SocialSharing, VueInstagram) {
        // Vue.use(VueInstagram);
        Vue.component('vue-instagram', VueInstagram)
        return Vue.component("news-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    mainBlog: null,
                    currentPost: null,

                }
            },
            mounted () {
                // this.currentPost;
                this.relatedPost 
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    var blogName = "main";
                    vm.currentPost = vm.findBlogPostBySlug(blogName, to.params.id);
                    if (vm.currentPost === null || vm.currentPost === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate(to, from, next) {
                var blogName = "main";
                this.currentPost = this.findBlogPostBySlug(blogName, to.params.id);
                if (this.currentPost === null || this.currentPost === undefined){
                    this.$router.replace({ name: '404'});
                }
            },
            computed: {
                property() {
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
                findBlogPostBySlug() {
                    return this.$store.getters.findBlogPostBySlug;
                },
                blogs() {
                    return this.$store.getters.findBlogByName;
                },
                // relatedPost() {
                //     var main_blog = _.reverse(_.orderBy(this.blogs("main").posts, function(o) { return o.publish_date }));
                //     console.log(main_blog)
                //     console.log(this.currentPost)

                // },
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
                },
                relatedPost(val_tag){
                    var main_blog = _.reverse(_.orderBy(this.blogs("main").posts, function(o) { return o.publish_date }));
                    console.log(main_blog)
                    var current_post_tags = this.currentPost.tags
                    console.log(current_post_tags)
                }
            }
        });
    });
</script>