<template>
    <div class="page-container">
        <div class="home-banner-container" style="background-image: url(https://picsum.photos/1920/1400);">
            <h1>Home</h1>    
        </div>
    </div>
</template>

<script>
  define(["Vue", "vue!today_hours", "vue!search-component"], function(Vue, TodayHoursComponent, SearchComponent) {
    return Vue.component("home-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
          title: "MM with Vue.js!",
          description: "An example of integration of Mall Maverick with Vue.js",
          suggestionAttribute: 'name',
          search: ''
        }
      },
      computed: {
        property(){
          return this.$store.getters.getProperty;
        },
        processedStores() {
          return this.$store.getters.processedStores;
        }
      },
      methods: {
        onOptionSelect(option) {
          console.log('Selected option:', option)
        }
      }
    })
  })
</script>
