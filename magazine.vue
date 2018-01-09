<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90 hidden-mobile"></div>
        <div class="row margin-60">
            <div class="col-md-12">
                <iframe src="https://cdn.flipsnack.com/widget/v2/widget.html?hash=fdulola51&bgcolor=EEEEEE&t=1507751959" width="100%" height="580" seamless="seamless" scrolling="no" frameBorder="0" allowTransparency="true" allowFullScreen="true"></iframe>
                <!--<flipbook></flipbook>-->
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <h2>The Magazine</h2>
                <!--<div class="row">-->
                    <!--<slick class="magazine-slider" ref="slick" :options="slickOptions">-->
                    <!--    <div v-for="item in magazines">-->
                    <!--        <embed :src="item.image_url" width="150" height="190" type='application/pdf'>-->
                    <!--        <h5 class="details-title">{{ item.title }}</h5>-->
                    <!--    </div>-->
                    <!--</slick>-->
                <!--</div>-->
            </div>
            <div class="col-md-4">
                <div class="sidebar">
                    <div class="sidebar-container">
                        <h5>Subscribe</h5>
                        <p>Sign up to recieve a physical copy of NorthPark The Magazine.</p>
                        <div class="blog-newsletter-container">
                            <form action="https://mobilefringe.createsend.com/t/d/s/fldith/" method="post" id="magazineForm">
                                <input id="fieldEmail" name="cm-fldith-fldith" type="email" required />
                                <button class="submit" type="submit">Subscribe</button>
                            </form>
    
                            <!--<form action="https://mobilefringe.createsend.com/t/d/s/jhithd/" method="post">-->
                            <!--    <input class="" id="fieldEmail" name="cm-jhithd-jhithd" type="email" required placeholder="Subscribe to Magazine"/>-->
                            <!--    <button class="news-submit" type="submit"><i class="fa fa-angle-right" aria-hidden="true"></i></button>-->
                            <!--</form>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs></p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue!vue-flipbook", "vue!vue-slick"], function(Vue, moment, tz, VueMoment, Meta, flipbook, slick) {
        Vue.use(Meta);

        return Vue.component("magazine-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                    slickOptions: {
                        autoplay: false,
                        cssEase: 'linear',
                        dots: false,
                        slidesToShow: 4,
                        speed: 500,
                    }
                }
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
                magazines() {
                    var repo = _.filter(this.$store.state.results.repos, function(o) { return o.name == "PDFs" })
                    var repo_images = _.slice(repo[0].images, [0], [6])
                    console.log(repo_images)
                    return repo_images
                },
            },
            methods: {
                
            }
        });
    });
</script>
