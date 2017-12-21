<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row">
            <div class="col-md-12">
                <img class="margin-60" src="http://via.placeholder.com/960x460"/>
                
               <iframe src="https://cdn.flipsnack.com/widget/v2/widget.html?hash=fdulola51&forcewm=1&forceWidget=1&forceSmall=1&rmm=1&novignette=1&t=1507751959&0=northparkcenter" width="100%" height="100%" seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true"></iframe>

            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <h2>The Magazine</h2>
            </div>
            <div class="col-md-4">
                <div class="sidebar">
                    <div class="sidebar-container">
                        <h5>Subscribe</h5>
                        <p>Sign up to recieve a physical copy of NorthPark The Magazine.</p>
                        <div class="blog-newsletter-container">
                            <form action="https://mobilefringe.createsend.com/t/d/s/jhithd/" method="post">
                                <input class="" id="fieldEmail" name="cm-jhithd-jhithd" type="email" required placeholder="Subscribe to Magazine"/>
                                <button class="news-submit" type="submit"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs></p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        
        return Vue.component("magazine-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                    images: ['http://via.placeholder.com/960x460']
                }
            },
            mounted () {
                this.restaurant
            },
            // beforeRouteEnter (to, from, next) {
            //     next(vm => {
            //         // access to component instance via `vm`
            //         vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-management-hours" + ".json"}).then(response => {
            //             vm.currentPage = response.data;
            //         }, error => {
            //             console.error("Could not retrieve data from server. Please check internet connection and try again.");
            //             vm.$router.replace({ name: '404'});
            //         });
            //     })
            // },
            // beforeRouteUpdate (to, from, next) {
            //     this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-management-hours.json"}).then(response => {
            //         this.currentPage = response.data;
            //         console.log(this.currentPage);
            //     }, error => {
            //         console.error("Could not retrieve data from server. Please check internet connection and try again.");
            //         this.$router.replace({ name: '404'});
            //     });
            // },
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
                restaurants(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var cafes = stores_by_category["NorthPark Cafés"]
                    var restaurants = stores_by_category["Restaurants / Beverages"]
                    var specialty = stores_by_category["Specialty Foods"]
                    var all_restaurants = _.concat(cafes, restaurants, specialty)
                    var filtered_restaurants = _.uniqBy(all_restaurants, function(o){ return o.name; })
                    return filtered_restaurants
                }
            },
            methods: {
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                },
                changeItem(event) {
                    this.selected = `${event.target.value}`
                    console.log("I've changed")
                    console.log(this.selected)
                    
                    // var store_id = this.${event.target.value}
                    console.log(store_id)
                }
            }
        });
    });
</script>
