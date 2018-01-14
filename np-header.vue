<template>
    <footer v-show="isHomePage">
        <div class="page-container">
            <div class="footer-nav">
                <div class="row">
                    <div class="col-md-4">
                        <ul class="hidden-mobile">
                            <router-link tag="li" to="/stores">
                                <a>Shops & Dining</a>
                            </router-link>
                            <router-link tag="li" to="/events">
                                <a>Events</a>
                            </router-link>
                            <router-link tag="li" to="/art">
                                <a>Art</a>
                            </router-link>
                            <router-link tag="li" to="/news">
                                <a>News</a>
                            </router-link>
                            <router-link tag="li" to="/visit">
                                <a>Visit</a>
                            </router-link>
                            <router-link tag="li" to="/our-story">
                                <a>Our Story</a>
                            </router-link>
                            <router-link tag="li" to="/magazine">
                                <a>The Magazine</a>
                            </router-link>
                            <router-link tag="li" to="/hours">
                                <a>Hours</a>
                            </router-link>
                            <li></li>
                        </ul>    
                    </div>
                    <div class="col-sm-12 col-md-8">
                        <div class="footer-logo">
                            <img src="//codecloud.cdn.speedyrails.net/sites/5a1835f66e6f6422a6650000/image/png/1511801610000/northpark-logo-white.png"  alt="Northpark Property Logo">  
                        </div>
                        <div class="footer-address">
                            <p v-if="property">{{property.address1}} - {{property.city}}, {{property.province_state}} - {{property.contact_phone}}</p>    
                        </div>
                        <div class="footer-social-container">
                            <a href="https://www.facebook.com/northparkcenter" target="_blank">
                                <i class="fa fa-facebook-square" aria-hidden="true"></i>
                            </a>
                            <a href="https://twitter.com/NorthParkCenter" target="_blank">
                                <i class="fa fa-twitter-square" aria-hidden="true"></i>
                            </a>  
                            <a href="https://www.pinterest.ca/northparkcenter" target="_blank">    
                                <i class="fa fa-pinterest-square" aria-hidden="true"></i>
                            </a>    
                            <a href="https://www.youtube.com/user/NorthParkCenter" target="_blank">    
                                <i class="fa fa-youtube-square" aria-hidden="true"></i>
                            </a>    
                            <a href="https://www.instagram.com/northparkcenter/" target="_blank">    
                                <i class="fa fa-instagram" aria-hidden="true"></i>
                            </a>
                            <a href="" target="_blank">  
                                <i class="fa fa-snapchat-square" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-copy hidden-mobile">
                <div class="row">
                    <div class="col-md-12">
                        <ul>
                            <li>Site Map</li>
                            <router-link tag="li" to="/" active-class="active" exact>
                                <a>Mobile App</a>
                            </router-link>
                            <router-link tag="li" to="/pages/northpark-terms-of-use" active-class="active" exact>
                                <a>Terms of Use</a>
                            </router-link>
                            <router-link tag="li" to="/pages/northpark-northpark-center-code-of-conduct" active-class="active" exact>
                                <a>Code of Conduct</a>
                            </router-link>
                            <router-link tag="li" to="/pages/northpark-privacy-policy" active-class="active" exact>
                                <a>Privacy Policy</a>
                            </router-link>
                            <router-link tag="li" to="/contact" active-class="active" exact>
                                <a>Contact Us</a>
                            </router-link>
                            <router-link tag="li" to="http://northparkcenter.com/login" active-class="active" exact>
                                <a>Admin Login</a>
                            </router-link>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <p>&#169; {{copyright_year}} Copyright Northpark Partners LP</p>    
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    define(["Vue", "vuex"], function (Vue, Vuex) {
        return Vue.component("np-header", {
            template: template, // the variable template will be injected,
            data: function data() {
                return {

                };
            },
            computed: {
                ...Vuex.mapGetters([
                    'property'
                ])
            }
        });
    });
</script>