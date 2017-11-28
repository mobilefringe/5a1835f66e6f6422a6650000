<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="row" v-if="currentStore">
            <div class="col-md-8">
                <div>
                    <h2>{{currentStore.name}}</h2>
                    <p>{{currentStore.description}}</p>
                    <a v-bind:href="currentStore.website">{{currentStore.website}}</a>
                    
                    <router-link to="/stores" active-class="active" exact>
                        <a>View Northpark Center Map <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                    </router-link>
                </div>
            </div>
            <div class="col-md-4">
                <h5 class="dine-contact-header">Contact</h5>
                <p>{{currentStore.phone}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}} <i class="fa fa-angle-right" aria-hidden="true"></i> Hours</p>
            </div>
        </div>
    </div>
</template>

<script>
  define(["Vue"], function(Vue) {
    return Vue.component("store-details-component", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          title: "MM with Vue.js!",
          description: "An example of integration of Mall Maverick with Vue.js",
          currentStore: null
        }
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // access to component instance via `vm`
          vm.currentStore = vm.findStoreBySlug(to.params.id);
          if (vm.currentStore === null || vm.currentStore === undefined){
            vm.$router.replace({ name: '404'});
          }
        })
      },
      beforeRouteUpdate (to, from, next) {
        this.currentStore = this.findStoreBySlug(to.params.id);
        if (this.currentStore === null || this.currentStore === undefined){
          this.$router.replace({ name: '404'});
        }
      },
      computed: {
        findStoreBySlug () {
          return this.$store.getters.findStoreBySlug;
        }
        property(){
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
      }
    });
  });
</script>
