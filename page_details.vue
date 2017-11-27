<template>
    <div class="page-container">
        <div v-if="currentPage">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="page_title" v-html="currentPage.title"></h2>
                    <hr/>
                    <div class="description_text text_left" v-html="currentPage.body"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  define(["Vue", "moment", "moment-timezone", "vue-moment"], function(Vue, moment, tz, VueMoment) {
    return Vue.component("page-details-component", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          success_subscribe : false,
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
            // vm.currentEvent = vm.findEventBySlug(to.params.id);
            // if (vm.currentEvent === null || vm.currentEvent === undefined){
                
            // }
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
        // this.currentEvent = this.findEventBySlug(to.params.id);
        // if (this.currentEvent === null || this.currentEvent === undefined){
        //   this.$router.replace({ name: '404'});
        // }
      },
      computed: {
        findEventBySlug () {
          return this.$store.getters.findEventBySlug;
        },
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
