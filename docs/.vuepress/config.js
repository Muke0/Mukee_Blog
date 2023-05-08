module.exports = {
    head: [
        ['link', { rel: 'icon', href: '/logo/icon.jpg' }]
    ],
    themeConfig: {
        //base: 1,
        //port: 8086,
        logo: '/logo/唐海音.jpg',
        nav: [
            { text: 'Home', link: '/' },
            {
                text: '网络安全',
                items: [{ text: 'pikachu靶场笔记', link: '/0secure/pikachu/' },
                    { text: '74cms', link: '/0secure/74cms/' },
                ]
            },
            { text: '友链', link: '/blogroll/' },
            {
                text: '靶场',
                items: [{ text: 'pikachu', link: 'http://www.mukee.ltd:90' },
                    { text: '74cms', link: 'http://www.mukee.ltd:91' },
                    { text: 'xdcms', link: 'http://www.mukee.ltd:92' },
                    { text: '订单系统', link: 'http://www.mukee.ltd:93' }
                ]
            }
        ],
        lastUpdated: 'Last Updated'
    }
}