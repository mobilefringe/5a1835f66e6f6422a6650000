<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="row">
            <div class="col-md-8">
                
            </div>
            <div class="col-md-4">
                <p>Find Us</p>
                <p>
                    {{property.name}}<br/>
                    {{property.address1}}<br/>
                    {{property.city}}, {{property.province_state}}<br/>
                    {{property.contact_phone}}</p>
                </p>
                <router-link to="" active-class="active" exact>
                    <a>Get Directions</a>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("promos-component", {
            template: template, // the variable template will be injected
            computed: {
                property (){
                    return this.$store.getters.getProperty;
                },
                
                timezone () {
                    return this.$store.getters.getTimezone;
                }
                
            }
        });
    });
</script>
