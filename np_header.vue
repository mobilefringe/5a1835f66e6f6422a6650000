<template>
    <header :class="{ home: isHomePage }">
        <div class="page-container">
            <div class="row">
                <div class="col-xs-6 col-sm-3">
                    <router-link to="/" active-class="active" exact>
                        <img class="header-logo" src="//codecloud.cdn.speedyrails.net/sites/5a1835f66e6f6422a6650000/image/png/1511803959000/northpark-logo.png"  alt="Northpark Property Logo">
                    </router-link>
                </div>
                <div class="col-xs-6 col-sm-9">
                    <div class="menu-icons">
                        <div @click="show_search = !show_search" :class="{ open: show_search, invisible: show_menu }" id="search-icon">
                            <span class="circle"></span>
                            <span class="handle"></span>
                        </div>
                        <div @click="show_menu = !show_menu" :class="{ open: show_menu, invisible: show_search }" id="menu-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="header-breadcrumb-container">
                            <breadcrumbs>{{ breadcrumb }}</breadcrumbs>
                            <ul v-show="showStoresMenu" class="breadcrumb-menu">
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
                            <ul v-show="showArtMenu" class="breadcrumb-menu">
                                <router-link tag="li" to="/art" active-class="active" exact>
                                    <a class="main-menu-link"><h5>Collection Overview</h5></a>
                                </router-link>
                                <router-link tag="li" to="/art/special-exhibition" active-class="active" exact>
                                    <a class="main-menu-link"><h5>Special Exhibition</h5></a>
                                </router-link>
                                <router-link tag="li" to="/art/photo-gallery" active-class="active" exact>
                                    <a class="main-menu-link"><h5>Photo Gallery</h5></a>
                                </router-link>
                            </ul>
                            <ul v-show="showVisitMenu" class="breadcrumb-menu">
                                <router-link tag="li" to="/pages/northpark-parking-valet-page" active-class="active" exact>
                                    <a class="main-menu-link"><h5>Valet & Parking</h5></a>
                                </router-link>
                                <router-link tag="li" to="/pages/northpark-concierge-services" active-class="active" exact>
                                    <a class="main-menu-link"><h5>Concierge</h5></a>
                                </router-link>
                                <router-link tag="li" to="/pages/northpark-northpark-gold-gift-cards" active-class="active" exact>
                                    <a class="main-menu-link"><h5>NorthPark Gold & Gift Cards</h5></a>
                                </router-link>
                                <router-link tag="li" to="/visit/tourism" active-class="active" exact>
                                    <a class="main-menu-link"><h5>Tourism</h5></a>
                                </router-link>
                                <router-link tag="li" to="/pages/northpark-contact-us" active-class="active" exact>
                                    <a class="main-menu-link"><h5>Contact</h5></a>
                                </router-link>
                            </ul>
                            <ul v-show="showStoryMenu" class="breadcrumb-menu">
                                <router-link tag="li" to="/our-story" active-class="active" exact>
                                    <a class="main-menu-link"><h5>NorthPark Experience</h5></a>
                                </router-link>
                                <router-link tag="li" to="/our-story/history" active-class="active" exact>
                                    <a class="main-menu-link"><h5>History</h5></a>
                                </router-link>
                                <router-link tag="li" to="/our-story/landscaping" active-class="active" exact>
                                    <a class="main-menu-link"><h5>Landscaping</h5></a>
                                </router-link>
                                <router-link tag="li" to="/our-story/architecture" active-class="active" exact>
                                    <a class="main-menu-link"><h5>Architecture</h5></a>
                                </router-link>
                                <router-link tag="li" to="/our-story/photo-gallery" active-class="active" exact>
                                    <a class="main-menu-link"><h5>Photo Gallery</h5></a>
                                </router-link>
                            </ul>
                            <ul v-show="showHolidayMenu" class="breadcrumb-menu">
                                <router-link tag="li" to="/holiday" active-class="active" exact>
                                    <a class="main-menu-link"><h5>Holiday Overview</h5></a>
                                </router-link>
                                <router-link tag="li" to="/holiday/performances" active-class="active" exact>
                                    <a class="main-menu-link"><h5>Performances</h5></a>
                                </router-link>
                                <router-link tag="li" to="/holiday/events" active-class="active" exact>
                                    <a class="main-menu-link"><h5>Events</h5></a>
                                </router-link>
                                <router-link tag="li" to="/holiday/activities" active-class="active" exact>
                                    <a class="main-menu-link"><h5>Activities</h5></a>
                                </router-link>
                            </ul>
                        </div>
                    </div>
                    <div v-if="show_menu" class="menu-container">
                        <div class="menu-content">
                            <ul class="menu">
                                <router-link tag="li" to="/stores" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">Shops & Dining</h1></a>
                                </router-link>
                                <router-link tag="li" to="/events" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">Events</h1></a>
                                </router-link>
                                <router-link tag="li" to="/art" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">Art</h1></a>
                                </router-link>
                                <router-link tag="li" to="/news" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">News</h1></a>
                                </router-link>
                                <router-link tag="li" to="/visit" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">Visit</h1></a>
                                </router-link>
                                <router-link tag="li" to="/our-story" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">Our Story</h1></a>
                                </router-link>
                                <router-link tag="li" to="/magazine" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">The Magazine</h1></a>
                                </router-link>
                                <router-link tag="li" to="/hours" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">Hours</h1></a>
                                </router-link>
                                <router-link tag="li" to="/holiday" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">Holiday</h1></a>
                                </router-link>
                            </ul>
                            <div class="menu-newsletter-container">
                                <form action="https://mobilefringe.createsend.com/t/d/s/jhithd/" method="post">
                                    <input class="" id="fieldEmail" name="cm-jhithd-jhithd" type="email" required placeholder="Sign Up for Email Newsletter"/>
                                    <button class="news-submit" type="submit"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                </form>
                            </div>
                            <div class="menu-social-container">
                                <span v-for="item in socialMedia">
                                    <a :href="item.url" target="_blank">
                                        <i :class="item.iconClass" aria-hidden="true"></i>
                                    </a>
                                </span>
                            </div>
                            <div class="menu-address-container">
                                <p v-if="property">{{property.address1}}<br>
                                    {{property.city}}, {{property.province_state}} {{property.postal_code}} <br>
                                    {{property.contact_phone}}
                                </p>    
                            </div>
                        </div>
                    </div>
                    <div v-if="show_search" class="search-container">
                        <div class="search-content">
                            <search-component v-model="search" :list="processedStores" :suggestion-attribute="suggestionAttribute" @select="onOptionSelect">
                                <template slot="item" scope="option">
                                    <article class="media">
                                        <p @click="show_search = !show_search">{{ option.data.name }}</p>
                                    </article>
                                </template>
                            </search-component>
                            <div class="menu-social-container" >
                                <span v-for="item in socialMedia">
                                    <a :href="item.url" target="_blank">
                                        <i :class="item.iconClass" aria-hidden="true"></i>
                                    </a>
                                </span>
                            </div>
                            <div class="menu-address-container">
                                <p v-if="property">{{property.address1}}<br>
                                    {{property.city}}, {{property.province_state}} {{property.postal_code}} <br>
                                    {{property.contact_phone}}
                                </p>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment"], function (Vue, Vuex, moment, tz, VueMoment) {
        return Vue.component("np-header", {
            template: template, // the variable template will be injected,
            data: function data() {
                return {
                    isHomePage: false,
                    isOpen: false,
                    show_menu: false,
                    show_search: false,
                    breadcrumb: this.$breadcrumbs,
                    showStoresMenu: false,
                    showArtMenu: false,
                    showVisitMenu: false,
                    showStoryMenu: false,
                    showHolidayMenu: false,
                    suggestionAttribute: 'name',
                    search: '',
                }
            },
            watch: {
                $route: function() {
                    if(this.$route.path == "/") {
                        this.isHomePage = true;
                    } else {
                       this.isHomePage = false; 
                    }
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'processedStores'
                ])
            },
            methods: {
                onOptionSelect(option) {
                    console.log('Selected option:', option);
                    this.$router.push("/stores/" + option.slug);
                }
            }
        });
    });
</script>