<template>
    
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}} <i class="fa fa-angle-right" aria-hidden="true"></i> <breadcrumbs>{{ breadcrumb }}</breadcrumbs></p>
            </div>
        </div>
    </div>
</template>

<script>

define(["Vue", "vuex", "vue-breadcrumbs"], function (Vue, Vuex, VueBreadcrumbs) {
    Vue.use(VueBreadcrumbs);

    return Vue.component("footer-breadcrumb-component", {
        template: template, // the variable template will be injected
        data: function data() {
            return {
                dataLoaded: false,
                breadcrumb: null,
                currentPage: null,
                selected: "Select a Restaurant",
                storeName: "",
                storeHoursById: [],
            };
        },
        created(){
            this.$store.dispatch("getData", "categories").then(response => {
                this.dataLoaded = true
            }, error => {
                console.error("Could not retrieve data from server. Please check internet connection and try again.");
            });
            this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host + "/pages/northpark-management-hours.json" }).then(function (response) {
                this.currentPage = response.data;
            }, function (error) {
                console.error("Could not retrieve data from server. Please check internet connection and try again.");
                this.$router.replace({ name: '404' });
            });
        },
        /*
        mounted: function mounted() {
            this.restaurants;
            this.findStoreById;
        },
        */
        watch: {
               
        },
        computed: {
            ...Vuex.mapGetters([
                'property',
                
            ]),
            
        }
    });
});</script>