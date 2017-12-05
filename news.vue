<template>
    <div> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <img class="margin_90" src="http://via.placeholder.com/1920x640" alt="" />
        <div class="page-container">
            <paginate name="currentBlog" v-if="currentBlog" :list="currentBlog" class="paginate-list margin_60">
                <div class="row details-promo-container" v-for="blog in paginated('currentBlog')" v-if="currentBlog">
                    <div>
                        <div class="col-md-1">
                            <p class="details-promo-date">{{blog.publish_date | moment("ddd", timezone)}}</p>
                            <p class="details-promo-day">{{blog.publish_date | moment("D", timezone)}}</p>
                            <p class="details-promo-date">{{blog.publish_date | moment("MMM", timezone)}}</p>
                        </div>
                        <div class="col-md-5">
                            <p class="blog-category">Blog Category</p>
                            <h2 class="">{{blog.title}}</h2> 
                            <p class="blog-author">By {{blog.author}} | {{blog.publish_date | moment("MM-D-YYYY", timezone)}}</p>
                            <p class="details-promo-desc">{{ truncate(blog.body) }}</p> 
                            <router-link :to="{ name: 'newsDetails', params: { id: blog.slug }}">
                                <a class="details-link">Read More <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                            </router-link>    
                        </div>
                        <div class="col-md-6">
                            <div class="blog-image-container">
                                <img :src="blog.image_url" class="store_logo" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </paginate>
            <div class="row margin_60">
                <div class="col-md-12">
                    <paginate-links for="currentBlog" :limit="9" :show-step-links="true"></paginate-links>
                    <paginate-links for="currentBlog" :simple="{ next: 'Next »', prev: '« Back' }"></paginate-links>
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
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue-paginate"], function(Vue, moment, tz, VueMoment, Meta, VuePaginate) {
        Vue.use(Meta);
        Vue.use(VuePaginate);
        
        return Vue.component("news-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    currentPage: null,
                    currentBlog: this.currentBlog,
                    paginate: ['currentBlog'],
                    selected: "Select A Category",
                    currentSelection: null,
                }
            },
            mounted () {
                this.currentBlog = _.reverse(_.orderBy(this.blogs("main").posts, function(o) { return o.publish_date }));
            },
            watch: {
                selected: function() {
                    console.log(this.selected)
                    if(this.selected == "events"){
                        this.currentSelection = this.propertyEvents;
                    } else if (this.selected == "promotions") {
                        this.currentSelection = this.storeEvents;
                    } else if (this.selected == "holiday"){
                        this.currentSelection = this.holidayEvents;
                    } else {
                        this.currentSelection = this.events
                    }
                }
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
                    console.log(this.$store.getters.findBlogByName)
                    // var blog_order = _.orderBy(this.$store.getters.findBlogByName, function(o) { return o.publish_date })
                    // return blog
                }
            },
            methods: {
                truncate(val_description){
                    var truncate = _.truncate(val_description, { 'length': 199, 'separator': ' ' });
                    return truncate;
                },
            }
        });
    });
</script>
