<div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row" v-if="currentStore">
            <div class="col-md-12 margin-60">
                <slick v-if="currentDetails" ref="slick" :options="slickOptions">
                    <div v-for="asset in storeAssets" >
                        <img :src="asset.url" alt="">
                    </div>
                </slick>
                <img v-if="!currentStore.assets" :src="currentStore.store_front_url_abs" alt="" />
            </div>
            <div class="col-md-8">
                <div class="details-store-info">
                    <h2 class="details-store-name">{{currentStore.name}}</h2>
                    <p class="details-description">{{currentStore.description}}</p>
                    <div class="details-reservation" v-if="currentStore && currentStore.website">
                        <div v-if="!isDine">
                            <a class="details-link" :href="'http://' + currentStore.website" target="_blank">View Store Website&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                        </div>
                        <div v-if="isDine">
                            <h5>Reservations</h5>
                            <a class="details-link" :href="'http://' + currentStore.website" target="_blank">Make Reservations&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <router-link to="/stores" active-class="active" exact>
                        <a class="details-link">View Northpark Center Map <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                    </router-link>
                </div>
            </div>
            <div class="col-md-4">
                <div class="sidebar">
                    <div class="sidebar-container" v-if="currentpoint">
                        <h5></h5>
                        <p>This content needs to be added</p>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">
                    <span>{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;</span>
                    <breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;
                    <span v-if="isNewStore"><router-link to="/new-doors">New Doors</router-link>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;</span>
                    <span v-if="!isNewStore || isDine"><router-link to="/dine">Dine</router-link>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;</span>
                    <span v-if="currentStore">{{currentStore.name }}</span>
                </p>
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
                    vm.currentPoint = vm.findPointOfInterestBySlug(poiName, to.params.id);
                    console.log(vm.currentPoint)
                    if (vm.currentPoint === null || vm.currentPoint === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate(to, from, next) {
                var poiName = "Art Tour";
                this.currentPoint = this.findPointOfInterestBySlug(poiName, to.params.id);
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