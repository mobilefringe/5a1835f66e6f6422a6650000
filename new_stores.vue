<template>
    <div v-if="dataLoaded" class="page-container" v-cloak> <!-- without an outer container div this component template will not render -->
        <div class="margin-42"></div>
        <div v-if="findNewStores" class="">
            <div class="row margin-30">
                <div class="col-md-12">
                    <h2>New Stores</h2>
                    <hr>
                </div>
            </div>
            <div class="row dine-container" v-for="store in findNewStores">
                <div class="col-md-12">
                    <div class="dine-image-container">
                        <div class="hover-container">
                            <img v-if="store.image_url" :src="store.image_url" :alt="store.name" />
                            <div class="hover-text-container hover-scale">
                    		    <div class="hover-text">
                    		        <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}" class="dine-link">
                    		            <h5>Visit Store Page <i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                		            </router-link>
                		        </div>
                        	</div>
                        </div>
                    </div>
                    <div class="dine-content-container">
                        <h2 class="dine-name">{{store.name}}</h2>
                        <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}" class="dine-link">Visit Store Page <i class="fa fa-angle-double-right" aria-hidden="true"></i></router-link>
                        <div v-if="store.phone">
                            <h5 class="dine-contact-header">Contact</h5>
                            <p>{{store.phone}}</p>
                        </div>
                        <div v-if="store.store_hours">
                            <h5>Hours</h5>
                            <ul class="details-hours-list">
                                <li v-for="hour in storeHours(store.store_hours)">
                                   {{hour.day_of_week | moment("dddd", timezone)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="findComingSoonStores" class="margin-60">
            <div class="row margin-30">
                <div class="col-md-12">
                    <h2>Coming Soon</h2>
                    <hr>
                </div>
            </div>
            <div class="row dine-container" v-for="store in findComingSoonStores">
                <div class="col-md-12">
                    <div class="dine-image-container">
                        <div class="hover-container">
                            <img v-if="store.image_url" :src="store.image_url" :alt="store.name" />
                            <div class="hover-text-container hover-scale">
                    		    <div class="hover-text">
                    		        <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}" class="dine-link">
                    		            <h5>Visit Store Page <i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                		            </router-link>
                		        </div>
                        	</div>
                        </div>
                    </div>
                    <div class="dine-content-container">
                        <h2 class="dine-name">{{store.name}}</h2>
                        <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}" class="dine-link">Visit Store Page <i class="fa fa-angle-double-right" aria-hidden="true"></i></router-link>
                        <div v-if="store.phone">
                            <h5 class="dine-contact-header">Contact</h5>
                            <p>{{store.phone}}</p>
                        </div>
                        <div v-if="store.store_hours">
                            <h5>Hours</h5>
                            <ul class="details-hours-list">
                                <li v-for="hour in storeHours(store.store_hours)">
                                   {{hour.day_of_week | moment("dddd", timezone)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <page-breadcrumb></page-breadcrumb>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue!page_breadcrumb.vue"], function(Vue, Vuex, moment, tz, VueMoment, Meta, PageBreadcrumbComponent) {
        return Vue.component("new-stores-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dataLoaded: false,
                    hours: []
                }
            },
            created(){
                this.loadData().then(response => {
                    this.dataLoaded = true;      
                });
                
                // this.$store.dispatch("getData", "stores").then(response => {
                //     this.dataLoaded = true
                // }, error => {
                //     console.error("Could not retrieve data from server. Please check internet connection and try again.");
                // });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findNewStores',
                    'findComingSoonStores',
                    'findHourById'
                ]),
            },
            methods: {
                loadData: async function() {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "stores")]);
                    } catch(e) {
                        console.log("Error loading data: " + e.message);    
                    }
                },
                storeHours(restaurant_hours){
                    var vm = this;
                    var storeHours = [];
                    _.forEach(restaurant_hours, function(value, key) {
                        storeHours.push(vm.findHourById(value));
                    });
                    return storeHours
                }
            }
        });
    });
</script>
