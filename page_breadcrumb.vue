<template>
    <div class="row">
        <div class="col-md-12">
            <p class="page-breadcrumb">
                <li>{{property.name}} <i class="fa fa-angle-right" aria-hidden="true"></i></li>
                <breadcrumbs></breadcrumbs>
            </p>
        </div>
    </div>
</template>

<script>
define(["Vue", "vuex", "vue-breadcrumbs"], function (Vue, Vuex, VueBreadcrumbs) {
    Vue.use(VueBreadcrumbs);
    return Vue.component("page-breadcrumb", {
        template: template, // the variable template will be injected
        data: function data() {
            return {
                breadcrumb: null,
            }
        },
        computed: {
            ...Vuex.mapGetters([
                'property'
            ])
        }
    });
});
</script>