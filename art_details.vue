<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="row" v-if="currentItem">
            <!--<div class="col-md-9">-->
            <!--    <div class="details-store-info">-->
            <!--        <h2 class="details-store-name">{{currentStore.name}}</h2>-->
            <!--        <p class="details-description">{{currentStore.description}}</p>-->
            <!--        <router-link to="/stores" active-class="active" exact>-->
            <!--            <a class="details-link">View Northpark Center Map <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>-->
            <!--        </router-link>-->
            <!--    </div>-->
            <!--</div>-->
            <!--<div class="col-md-3">-->
            <!--    <div class="details-contact-container" v-if="currentStore && currentStore.phone">-->
            <!--        <h5 class="dine-contact-header">Contact</h5>-->
            <!--        <p>{{currentStore.phone}}</p>-->
            <!--    </div>-->
            <!--</div>-->
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}} <i class="fa fa-angle-right" aria-hidden="true"></i></p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        return Vue.component("art-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentPoint: null,
                }
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    var poiName = "Art Tour";
                    vm.currentPoint = vm.findPointOfInterestBySlug(blogName, to.params.id);
                    console.log(vm.currentPoint)
                    if (vm.currentPoint === null || vm.currentPoint === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate(to, from, next) {
                var poiName = "Art Tour";
                this.currentPoint = this.findPointOfInterestBySlug(blogName, to.params.id);
                console.log(this.currentPoint)
                if (this.currentPoint === null || this.currentPoint === undefined){
                    this.$router.replace({ name: '404'});
                }
            },
            watch: {
                currentItem: function() {
                    console.log(this.currentPoint);
                    var vm = this;
                    // var temp = [];
                    // _.forEach(this.currentStore.promotions, function(value, key) {
                    //     console.log(vm.findPromoById(value));
                    //     temp.push(vm.findPromoById(value));
                    // });
                    // this.promotions = temp;
                    // console.log("promos", this.promotions);
                }
            },
            computed: {
                findPointOfInterestBySlug() {
                    return this.$store.getters.findPointOfInterestBySlug;
                },
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                },
            },
            methods: {
                
            }
        });
    });
</script>