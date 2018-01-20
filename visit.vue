<template>
  <div>
    <np-loader v-if="!dataLoaded"></np-loader>
    <div v-if="dataLoaded" v-cloak>
      <!-- without an outer container div this component template will not render -->
      <div class="page-banner" v-if="pageBanner" v-for="banner in pageBanner">
        <div class="gallery-banner" v-bind:style="{ backgroundImage: 'url(' + banner.image_url + ')' }"></div>
      </div>
      <div class="page-container">
        <div class="row">
          <div class="col-md-4 col-md-push-8">
            <div class="sidebar">
              <div class="sidebar-container">
                <h5>Hours</h5>
                <ul class="sidebar-hours-list">
                  <li v-if="getPropertyHours" v-for="hour in getPropertyHours">
                    {{hour.day_of_week | moment("dddd", timezone)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h
                    A", timezone)}}
                  </li>
                </ul>
                <br>
                <router-link to="/hours" active-class="active" exact>
                  <a class="details-link">View Detailed Hours
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                  </a>
                </router-link>
              </div>
              <div class="sidebar-container">
                <h5 class="">Find Us</h5>
                <p class="uppercase">
                  {{property.name}}
                  <br> {{property.address1}}
                  <br> {{property.city}}, {{property.province_state}} {{property.postal_code}}
                  <br> {{property.contact_phone}}
                </p>
                <p class="uppercase">
                  Northpark Center Concierge
                  <br> {{property.contact_fax}}
                </p>
                <a class="details-link" href="https://www.google.com/maps/place/NorthPark+Center/@32.868225,-96.773204,15z/data=!4m5!3m4!1s0x0:0x95fc10ba98f7aad4!8m2!3d32.8680671!4d-96.7735128?hl=en-US"
                  target="_blank">Get Directions
                  <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <div class="visible-mobile margin-60">
              <hr>
            </div>
          </div>
          <div class="col-md-8 col-md-pull-4">
            <div class="" v-if="valet">
              <h2 class="visit-title">Valet &amp; Parking</h2>
              <div class="visit-desc" v-if="valet" v-html="truncate(valet.body)"></div>
              <router-link to="/visit/northpark-parking-valet-page" active-class="active" exact>
                <p class="visit-link details-link">Learn More
                  <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                </p>
              </router-link>
              <hr class="hidden-mobile">
              <div class="visible-mobile margin-60">
                <hr>
              </div>
            </div>
            <div class="" v-if="concierge">
              <h2 class="visit-title">Concierge</h2>
              <div class="visit-desc" v-if="concierge" v-html="truncate(concierge.body)"></div>
              <router-link to="/visit/northpark-concierge-services" active-class="active" exact>
                <p class="visit-link details-link">Learn More
                  <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                </p>
              </router-link>
              <hr class="hidden-mobile">
              <div class="visible-mobile margin-60">
                <hr>
              </div>
            </div>
            <div class="" v-if="giftCards">
              <h2 class="visit-title">Northpark Gold &amp; Gift Cards</h2>
              <div class="visit-desc" v-if="giftCards" v-html="truncate(giftCards.body)"></div>
              <router-link to="/visit/northpark-northpark-gold-gift-cards" active-class="active" exact>
                <p class="visit-link details-link">Learn More
                  <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                </p>
              </router-link>
              <hr class="hidden-mobile">
              <div class="visible-mobile margin-60">
                <hr>
              </div>
            </div>
            <div class="" v-if="tourism">
              <h2 class="visit-title">Tourism</h2>
              <div class="visit-desc" v-if="tourism" v-html="truncate(tourism.body)"></div>
              <router-link to="/visit/tourism" active-class="active" exact>
                <p class="visit-link details-link">Learn More
                  <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                </p>
              </router-link>
              <hr class="hidden-mobile">
              <div class="visible-mobile margin-60">
                <hr>
              </div>
            </div>
            <div class="" v-if="contact">
              <h2 class="visit-title">Contact</h2>
              <div class="visit-desc" v-if="contact" v-html="truncate(contact.body)"></div>
              <router-link to="/visit/northpark-contact-us" active-class="active" exact>
                <p class="visit-link details-link">Learn More
                  <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                </p>
              </router-link>
            </div>
          </div>
          <div class="margin-90"></div>
        </div>
        <page-breadcrumb></page-breadcrumb>
      </div>
    </div>
  </div>
</template>

<script>
  define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue!page_breadcrumb.vue"], function (
    Vue, Vuex, moment, tz, VueMoment, Meta, PageBreadcrumbComponent) {
    Vue.use(Meta);
    return Vue.component("visit-component", {
      template: template, // the variable template will be injected
      data: function data() {
        return {
          dataLoaded: false,
          valet: null,
          concierge: null,
          giftCards: null,
          tourism: null,
          contact: null
        };
      },
      created() {
        this.loadData().then(response => {
          this.valet = response[1].data;
          this.concierge = response[2].data;
          this.giftCards = response[3].data;
          this.tourism = response[4].data;
          this.contact = response[5].data;
          this.dataLoaded = true;
        });
        /*
        this.$store.dispatch("getData", "repos").then(response => {
          this.dataLoaded = true
        }, error => {
          console.error(
            "Could not retrieve data from server. Please check internet connection and try again.");
        });
        this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/northpark-parking-valet-page.json"}).then(response => {
          this.valet = response.data;
        }, error => {
          console.error(
            "Could not retrieve data from server. Please check internet connection and try again.");
          this.$router.replace({
            name: '404'
          });
        });
        this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/northpark-concierge-services.json"}).then(response => {
          this.concierge = response.data;
        }, error => {
          console.error(
            "Could not retrieve data from server. Please check internet connection and try again.");
          this.$router.replace({
            name: '404'
          });
        });
        this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/northpark-northpark-gold-gift-cards.json"}).then(response => {
          this.giftCards = response.data;
        }, error => {
          console.error(
            "Could not retrieve data from server. Please check internet connection and try again.");
          this.$router.replace({
            name: '404'
          });
        });
        this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/northpark-tourism.json"}).then(response => {
          this.tourism = response.data;
        }, error => {
          console.error(
            "Could not retrieve data from server. Please check internet connection and try again.");
          this.$router.replace({
            name: '404'
          });
        });
        this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/northpark-contact-us.json"}).then(response => {
          this.contact = response.data;
        }, error => {
          console.error(
            "Could not retrieve data from server. Please check internet connection and try again.");
          this.$router.replace({
            name: '404'
          });
        });
        */
      },
      computed: {
        ...Vuex.mapGetters([
          'property',
          'timezone',
          'getPropertyHours',
          'repos',
          'findRepoByName',
        ]),
        pageBanner: function pageBanner() {
          return this.findRepoByName("Visit").images;
        }
      },
      methods: {
        loadData: async function () {
          try {
            let results = await Promise.all([this.$store.dispatch("getData", "repos"), this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/northpark-parking-valet-page.json"}), this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/northpark-concierge-services.json"}), this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/northpark-northpark-gold-gift-cards.json"}), this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/northpark-tourism.json"}), this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/northpark-contact-us.json"})]);
            return results;
          } catch (e) {
            console.log("Error loading data: " + e.message);
          }
        },
        truncate: function truncate(val_body) {
          var truncate = _.truncate(val_body, {
            'length': 350,
            'separator': ' '
          });
          return truncate;
        }
      }
    });
  });
</script>