<template>
    <div> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <img src="http://via.placeholder.com/1920x640" alt="" />
        <div class="page-container">
            <div class="row">
                <div class="col-md-12">
                    <h2>NEWS</h2>
                </div>
            </div>
            <div class="row">
                <div v-for="blog in blogs" v-if="blogs">
                    <hr>
                    <div class="col-md-1">
                        <p class="details-promo-date">{{blog.posts.start_date | moment("ddd", timezone)}}</p>
                        <p class="details-promo-day">{{blog.posts.start_date | moment("D", timezone)}}</p>
                        <p class="details-promo-date">{{blog.posts.start_date | moment("MMM", timezone)}}</p>
                    </div>
                    <div class="col-md-5">
                        <h2 class="details-promo-name">{{blog.posts.name}}</h2> 
                        
                        <p class="details-promo-desc">{{ truncate(blog.posts.description) }}</p> 
                        <router-link :to="{ name: 'newsDetails', params: { id: blog.posts.slug }}">
                            <a class="details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                        </router-link>    
                    </div>
                    <div class="col-md-6">
                        <img :src="blog.posts.image_url" class="store_logo" alt="">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <!-- ADD PAGINATION -->
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
        return Vue.component("news-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    currentPage: null,
                    currentBlog: null
                }
            },
            mounted () {
                this.currentBlog = this.blogs("main");  
                console.log(this.currentBlog)
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
                blogs() {
                    return this.$store.getters.findBlogByName;
                }
                
            },
            methods: {
                
            
            }
        });
    });
</script>
