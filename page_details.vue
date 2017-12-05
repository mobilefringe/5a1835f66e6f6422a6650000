<template>
    <div class="page-container">
        <div class="margin_90"></div>
        <div v-if="currentPage">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="page_title" v-html="currentPage.title"></h2>
                    <hr/>
                    <div class="" v-html="currentPage.body"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        return Vue.component("page-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentPage: null
                }
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/"+ to.params.id +".json"}).then(response => {
                        vm.currentPage = response.data;
                        console.log(vm.currentPage);
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });
                })
            },
            beforeRouteUpdate (to, from, next) {
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/"+ to.params.id +".json"}).then(response => {
                    // this.dataLoaded = true;
                    this.currentPage = response.data;
                    console.log(this.currentPage);
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
            },
            computed: {
                timezone() {
                  return this.$store.getters.getTimezone;
                },
                property (){
                    return this.$store.getters.getProperty;
                }
            }
        });
    });
</script>