<template>
    <div class="row" v-if="currentEvent">
        <div class="large-6 columns">
            <div>
                <h1>{{currentEvent.name}}</h1>
                <p><router-link :to="{ name: 'storeDetails', params: { id: currentEvent.store.slug }}">{{currentEvent.store.name}}</router-link> | {{currentEvent.start_date | moment("MMM D", timezone)}} - {{currentEvent.end_date | moment("MMM D", timezone)}}</p>
                <p>{{currentEvent.description}}</p>
                <img :src="currentEvent.image_url">
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment"], function(Vue, moment, tz, VueMoment) {
        return Vue.component("event-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentEvent: null
                }
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.currentEvent = vm.findEventBySlug(to.params.id);
                    if (vm.currentEvent === null || vm.currentEvent === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate (to, from, next) {
                this.currentEvent = this.findEventBySlug(to.params.id);
                if (this.currentEvent === null || this.currentEvent === undefined){
                    this.$router.replace({ name: '404'});
                }
            },
            computed: {
                findEventBySlug () {
                    return this.$store.getters.findEventBySlug;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                }
            }
        });
    });
</script>
