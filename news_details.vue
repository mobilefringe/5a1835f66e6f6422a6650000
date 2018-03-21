<template>
    <div> <!-- without an outer container div this component template will not render -->
        <np-loader v-if="!dataLoaded"></np-loader>
        <transition name="fade">
            <div v-if="currentPost && dataLoaded" class="page-container" v-cloak>
                <div class="margin-90"></div>
                <div class="row" v-if="currentPost">
                    <div class="col-md-8 margin-60">
                        <div id="currentPost">
                            <div class="blog-details-date">
                                <p class="details-promo-date">{{currentPost.publish_date | moment("ddd", timezone)}}</p>
                                <p class="details-promo-day">{{currentPost.publish_date | moment("D", timezone)}}</p>
                                <p class="details-promo-date">{{currentPost.publish_date | moment("MMM", timezone)}}</p>
                            </div>
                            <div class="blog-details-title">
                                <div class="hidden-mobile">
                                    <social-sharing v-if="currentPost" :url="shareURL(currentPost.slug)" :title="currentPost.title" :description="currentPost.body" :quote="truncate(currentPost.body)" twitter-user="NorthParkCenter" :media="currentPost.image_url" inline-template>
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
                                </div>
                                <h5 class="blog-details-category">{{ tagString(currentPost.tag) }}</h5>
                                <h2 class="blog-details-name">{{currentPost.title}}</h2>
                                <h5 class="blog-details-author">By {{currentPost.author}} | {{currentPost.publish_date | moment("MM-D-YYYY", timezone)}}</h5>
                            </div>
                            <div class="blog-details-content">
                                <div class="margin-60 blog-details-body" v-html="currentPost.html_body"></div>
                                <div class="visible-mobile">
                                    <social-sharing v-if="currentPost" :url="shareURL(currentPost.slug)" :title="currentPost.title" :description="currentPost.body" :quote="truncate(currentPost.body)" twitter-user="NorthParkCenter" :media="currentPost.image_url" inline-template>
                                        <div class="blog-social-share">
                                            <network network="facebook">
                                                <i class="fa fa-facebook-square"></i>
                                            </network>
                                            <network network="twitter">
                                                <i class="fa fa-twitter-square"></i>
                                            </network>
                                            <network network="pinterest">
                                                <i class="fa fa-pinterest-square"></i>
                                            </network>
                                            <h5>Share</h5>
                                        </div>
                                    </social-sharing>
                                </div>
                            </div>
                        </div>
                        <hr class="visible-mobile">
                    </div>
                    <div class="col-md-4">
                        <affix relative-element-selector="#currentPost">
                            <div class="sidebar">
                                <div class="sidebar-container" v-if="currentPost && relatedPost">
                                    <h5 class="related-post-title">Related Blogs</h5>
                                    <router-link :to="{ name: 'newsDetails', params: { id: relatedPost.slug }}">
                                        <div class="related-post-img" v-bind:style="{ backgroundImage: 'url(' + relatedPost.image_url + ')' }"></div>
                                        <p>{{relatedPost.title }}</p>
                                    </router-link>
                                    <div class="visible-mobile margin-30"></div>
                                    <hr class="visible-mobile">
                                </div>
                                <div class="sidebar-container">
                                    <h5 class="related-post-title">Get Connected</h5>
                                    <p class="sidebar-newsletter-info">Subscribe to our newsletter and receive insider information on events, exclusive sales, special offers and much more.</p>
                                    <div class="blog-newsletter-container">
                                        <form v-on:submit.prevent="validateNewsletter" class="form-horizontal" method="post" id="tourismForm">
                                            <div class="form-group ">
                                                <div class="col-xs-12">
                                                    <label for="fieldEmail">Email</label>
                                                    <input id="fieldEmail" name="cm-fldilt-fldilt" type="email" required />
                                                </div>
                                            </div>
                                            <div>
                                                <div class="col-xs-12">
                                                    <label class="checkbox">
                                                        <input name="agree_newsletter" required  type="checkbox">
                                                            I agree to receive electronic communications from {{ property.name }}. 
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="form-group ">
                                                <div class="col-xs-12">
                                                    <button class="submit" type="submit">
                                                        Submit <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                <div class="alert alert-success" role="alert" v-show="newsletterSuccess">
                                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                    <span class="sr-only">Success</span>
                                    Thank you. Your email has been added to our mailing list.
                                </div>
                                <div class="alert alert-danger" role="alert" v-show="newsletterError">
                                    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                    <span class="sr-only">Error:</span>
                                    There was an error when trying to submit your request. Please try again later.
                                </div>
                                    
                                    
                                    
                                        <form action="https://mobilefringe.createsend.com/t/d/s/jhithd/" method="post">
                                            <input class="" id="fieldEmail" name="cm-jhithd-jhithd" type="email" required placeholder="Enter Your Email" />
                                            <button class="news-submit" type="submit"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                        </form>
                                    </div>
                                    <div class="visible-mobile margin-30"></div>
                                    <hr class="visible-mobile">
                                </div>
                                <div class="sidebar-container" v-if="instaFeed">
                                    <h5 class="related-post-title">Follow Us On Instagram</h5>
                                    <div class="insta-feed-container">
                                        <div class="insta-feed-image" v-for="item in instaFeed">
                                            <a :href="item.link" target="_blank"><img :src="item.images.thumbnail.url"/></a>
                                        </div>
                                    </div>
                                    <div class="visible-mobile margin-60"></div>
                                </div>
                            </div>
                        </affix>
                    </div>
                </div>
                <div class="row margin-60">
                    <div class="col-md-12">
                        <router-link to="/posts">
                            <p class="details-link"><i class="fa fa-angle-double-left" aria-hidden="true"></i> Back to News</p>
                        </router-link>
                    </div>
                </div>
                <page-breadcrumb></page-breadcrumb>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue-social-sharing"], function (Vue, Vuex, moment, tz, VueMoment, Meta, SocialSharing) {
        return Vue.component("news-details-component", {
            template: template, // the variable template will be injected,
            props: ['id'],
            data: function () {
                return {
                    dataLoaded: false,
                    currentBlog: null,
                    mainBlog: null,
                    currentPost: null,
                    newsletterError: false,
                    newsletterSuccess: false,
                    socialFeed: null,
                    instaFeed: null
                }
            },
            created() {
                this.loadData().then(response => {
                    this.updateCurrentBlog(this.id);
                    this.socialFeed = response[1].data;
                    this.dataLoaded = true;
                });
            },
            watch: {
                $route: function () {
                    this.updateCurrentBlog(this.$route.params.id);
                },
                socialFeed: function () {
                    var social_feed = this.socialFeed.social.instagram;
                    var insta_feed = _.slice(social_feed, [0], [3])
                    this.instaFeed = insta_feed
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'blogs',
                    'findBlogByName',
                    'findBlogPostBySlug',
                ]),
                relatedPost() {
                    var main_blog = _.reverse(_.orderBy(this.findBlogByName("main").posts, function (o) { return o.publish_date }));
                    if (this.currentPost.tag != null) {
                        var current_post_tag = this.currentPost.tag[0]
                    }   

                    var related_blog = [];
                    _.forEach(main_blog, function (value, key) {
                        if (value.tag != null) {
                            var tag = value.tag[0];
                            if (tag === current_post_tag) {
                                related_blog.push(value);
                            }
                        }
                    });

                    var related_post = related_blog[0]
                    if (related_post.id != this.currentPost.id) {
                        return related_post;
                    } else {
                        return related_blog[1]
                    }
                }
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "blogs"), this.$store.dispatch('LOAD_PAGE_DATA', {url: "http://northside.mallmaverick.com/api/v2/northside/social.json"})]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                updateCurrentBlog(id) {
                    var blogName = "main";
                    this.currentPost = this.findBlogPostBySlug(blogName, id);
                    if (this.currentPost === null || this.currentPost === undefined) {
                        this.$router.replace({ name: '404' });
                    }
                },
                tagString(val_tag) {
                    // Returns all tags
                    // var string = _.join(val_tag, ', ')  
                    // return string
                    
                    //Returns only the first tag
                    var tag = val_tag[0].replace(/_/g, " ");
                    return tag
                },
                truncate(val_body) {
                    var truncate = _.truncate(val_body, { 'length': 99, 'separator': ' ' });
                    return truncate;
                },
                shareURL(slug) {
                    var share_url = "http://www.northparkcenter.com/posts/" + slug
                    return share_url
                },
                validateNewsletter(form){
                    var vm = this;
                    $.getJSON(
                        "https://mobilefringe.createsend.com/t/d/s/jhithd/?callback=?",
                        $(form.target).serialize(),
                        function (data) {
                        if (data.Status === 400) {
                            vm.newsletterError = true;
                            console.log("ERROR");
                        } else { // 200
                            vm.newsletterSuccess = true;
                            console.log("SUCCESS");
                        }
                    });    
                }
            }
        });
    });
</script>