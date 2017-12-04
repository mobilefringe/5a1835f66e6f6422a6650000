<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin_90"></div>
        <div class="row" v-if="currentBlog">
            <!--<div class="col-md-12">-->
            <!--    <img :src="currentStore.store_front_url_abs" class="margin_60" alt="" />-->
            <!--</div>-->
            <!--<div class="col-md-9">-->
            <!--    <div class="details-store-info">-->
            <!--        <h2 class="details-store-name">{{currentStore.name}}</h2>-->
            <!--        <p class="details-description">{{currentStore.description}}</p>-->
            <!--        <router-link to="/stores" active-class="active" exact>-->
            <!--            <a class="details-link">View Northpark Center Map <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>-->
            <!--        </router-link>-->
            <!--    </div>-->
            <!--</div>-->
            <div class="col-md-3">
                
            </div>
        </div>
    
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}} <i class="fa fa-angle-right" aria-hidden="true"></i> News <i class="fa fa-angle-right" aria-hidden="true"></i> {{currentBlog}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
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
            mounted () {
                this.currentBlog = this.blogs("main");
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
            // watch: {
            //     currentStore: function() {
            //         console.log("currentStore promo", this.currentStore );
            //         var vm = this;
            //         var temp = [];
            //         _.forEach(this.currentStore.promotions, function(value, key) {
            //             console.log(vm.findPromoById(value));
            //             temp.push(vm.findPromoById(value));
            //         });
            //         this.promotions = temp;
            //         console.log("promos", this.promotions);
            //     }
            // },
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
            // methods: {
            //     truncate(val_description){
            //         var truncate = _.truncate(val_description, { 'length': 249, 'separator': ' ' });
            //         return truncate;
            //     },
            // }
        });
    });
</script>