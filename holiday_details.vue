<template>
    <div> <!-- without an outer container div this component template will not render -->
        <transition name="fade">
            <div v-if="currentBlog"> <!-- without an outer container div this component template will not render -->
                <div class="margin-90 hidden-mobile"></div>
                <div class="image-container">
                    <div v-if="currentBlog" class="position-relative">
                        <div class="prev"></div>
                        <slick ref="slick" :options="slickOptions">
                            <div v-for="image in currentBlog.additional_images">
                                <img class="margin-60" :src="image.image_url" alt="Holiday Event Image">
                            </div>
                        </slick>
                        <div class="next"></div>
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
                                    <div v-html="currentBlog.html_caption"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <page-breadcrumb></page-breadcrumb>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue!vue-slick"], function(Vue, Vuex, moment, tz, VueMoment, Meta, slick){
        return Vue.component("holiday-details-component", {
            template: template, // the variable template will be injected,
            props:['id'],
            data: function() {
                return {
                    dataLoaded: false,
                    currentBlog: null,
                    currentPost: null,
                    slickOptions: {
                        arrows: true,
                        autoplay: true,
                        cssEase: 'linear',
                        dots: false,
                        fade: true,
                        infinite: true,
                        nextArrow: '.next',
                        prevArrow: '.prev',
                        slidesToShow: 1,
                        speed: 1000
                    }
                }
            },
            created(){
                this.$store.dispatch("getData", "blogs").then(response => {
                    var blogName = "Holiday Attractions";
                    this.currentBlog = this.findBlogPostBySlug(blogName, this.id);
                    if (this.currentBlog === null || this.currentBlog === undefined){
                        this.$router.replace({ name: '404'});
                    }
                }, error => {
                  console.error("Could not retrieve data from server. Please check internet connection and try again.");
                });
            },
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