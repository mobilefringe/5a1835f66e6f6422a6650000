<template>
    <ul class="breadcrumb-menu" v-if="showMenu">
        <router-link tag="li" to="/stores" active-class="active" exact>
            <a class="main-menu-link"><h5>Store Directory</h5></a>
        </router-link>
        <router-link tag="li" to="/dine" active-class="active" exact>
            <a class="main-menu-link"><h5>Restaurants & Eateries</h5></a>
        </router-link>
        <li>
            <a class="main-menu-link" href="https://www.amctheatres.com/movie-theatres/dallas-ft-worth/amc-northpark-15" target="_blank"><h5>AMC</h5></a>
        </li>
        <router-link tag="li" to="/new-doors" active-class="active" exact>
            <a class="main-menu-link"><h5>New Doors</h5></a>
        </router-link>
    </ul>
</template>

<script>
  define(["Vue"], function(Vue) {
    return Vue.component('bc-nav', {
        template: template,
        data() {
         return {
           this.currentRoute = {}
         }
        },
        created(){
          console.log(this.$router)
        },
        watch: {
          $route: function() {
            this.currentRoute = this.$route;
            console.log(this.$route)
          }
        },
        computed:{
          showMenu(){
            console.log(this.currentRoute.matched.some(m => m.meta.showNav));
            return false
          }
        }
    });
  });
</script>