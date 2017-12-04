<template>
    <div class="page-container">
        <div class="row">
            <div class="col-md-12">
                <h1>{{text}}</h1>
            </div>
        </div>
    </div>
</template>

<script>
  define(["Vue"], function(Vue) {
    return Vue.component("not-found-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {"text": "Oops! The page you are looking for cannot be found."};
      }
    });
  });
</script>
