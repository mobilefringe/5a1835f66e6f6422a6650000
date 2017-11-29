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
                    path: ':id',
                    component: view('store_details'),
                    name: 'storeDetails'
                }
            ]
        },
        {
            path: '/dine',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('dine'),
                    name: 'dineList'
                },
            ]
        },
        {
            path: '/promotions',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('promotions'),
                    name: 'promotionList'
                },
                {
                    path: ':id',
                    component: view('promotion_details'),
                    name: 'promotionDetails'
                }
            ]
        },
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
                    component: view('event_details'),
                    name: 'eventDetails'
                }
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
            path: '/art',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('art'),
                    name: 'storeList'
                },
            ]
        },
        {
            path: '/news',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('news'),
                    name: 'storeList'
                },
            ]
        },
        {
            path: '/holiday',
            component: view('default'),
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
