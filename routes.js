define([], function () {
    return [
        {
            path: '/',
            component: view('home')
        },
        {
            path: '/stores',
            component: view('default'),
            meta: {
                breadcrumb: 'Shops & Dining',
            },
            children: [
                {
                    path: '',
                    component: view('stores'),
                    name: 'storeList'
                },
                {
                    path: '/dine',
                    component: view('dine'),
                    name: 'dineList'
                },
                {
                    path: ':id',
                    component: view('store_details'),
                    name: 'storeDetails'
                }
            ]
        },
        // {
        //     path: '/dine',
        //     component: view('default'),
            
        //     children: [
        //         {
        //             path: '',
        //             component: view('dine'),
        //             name: 'dineList'
        //         },
        //     ]
        // },
        // {
        //     path: '/promotions',
        //     component: view('default'),
        //     children: [
        //         {
        //             path: '',
        //             component: view('promotions'),
        //             name: 'promotionList'
        //         },
        //         {
        //             path: ':id',
        //             component: view('promotion_details'),
        //             name: 'promotionDetails'
        //         }
        //     ]
        // },
        {
            path: '/events',
            component: view('default'),
            meta: {
                breadcrumb: 'Events',
            },
            children: [
                {
                    path: '',
                    component: view('events'),
                    name: 'eventList'
                },
                {
                    path: ':id',
                    component: view('events_details'),
                    name: 'eventDetails'
                }
            ]
        },
        {
            path: '/art',
            component: view('art'),
            meta: {
                breadcrumb: 'Art',
            },
            children: [
                {
                    path: '',
                    component: view('art'),
                    name: 'storeList'
                },
                {
                    path: '/art/collection',
                    component: view('collection'),
                    meta: {
                        breadcrumb: 'Collection Overview',
                    },
                    name: 'storeList'
                },
                {
                    path: '/art/special-exhibitions',
                    component: view('special_exhibitions'),
                    meta: {
                        breadcrumb: 'Special Exhibition',
                    },
                    name: 'storeList'
                },
                {
                    path: '/art/photo-gallery',
                    component: view('photo_gallery'),
                    meta: {
                        breadcrumb: 'Photo Gallery',
                    },
                    name: 'storeList'
                },
            ]
        },
        {
            path: '/news',
            component: view('default'),
            meta: {
                breadcrumb: 'News',
            },
            children: [
                {
                    path: '',
                    component: view('news'),
                    name: ''
                },
                {
                    path: ':id',
                    component: view('news_details'),
                    name: 'newsDetails'
                }
            ]
        },
        {
            path: '/visit',
            component: view('default'),
            meta: {
                breadcrumb: 'Visit',
            },
            children: [
                {
                    path: '',
                    component: view('visit'),
                    name: 'storeList'
                },
            ]
        },
        {
            path: '/our-story',
            component: view('our_story'),
            meta: {
                breadcrumb: 'Our Story',
            },
            children: [
                {
                    path: '',
                    component: view('our_story'),
                    name: 'storeList'
                },
            ]
        },
        {
            path: '/magazine',
            component: view('magazine'),
            meta: {
                breadcrumb: 'The Magazine',
            },
            children: [
                {
                    path: '',
                    component: view('magazine'),
                    name: 'storeList'
                },
            ]
        },
        {
            path: '/hours',
            component: view('default'),
            meta: {
                breadcrumb: 'Hours',
            },
            children: [
                {
                    path: '',
                    component: view('hours'),
                    name: 'storeList'
                },
            ]
        },
        {
            path: '/holiday',
            component: view('default'),
            meta: {
                breadcrumb: 'Holiday',
            },
            children: [
                {
                    path: '',
                    component: view('holiday'),
                    name: 'storeList'
                },
            ]
        },
        {
            path: '/pages',
            component: view('default'),
            redirect: '/404',
            children: [
                {
                    path: ':id',
                    component: view('page_details'),
                    name: 'pageDetails'
                }
            ]
        },
        {
            path: '/404',
            name: '404',
            component: view('notfoundcomponent')
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]

    /**
       * Asynchronously load view (lazy-loading)
       * @param {string} name the filename (basename) of the view to load.
    **/
    function view(name) {
        return function(resolve) {
            require(['vue!' + name + '.vue'], resolve);
        }
    };
});
