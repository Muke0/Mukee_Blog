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
            {
                text: '开发相关',
                items: [{ text: 'sql', link: '/1dev/sql/command' }, ]
            },
            {
                text: '运维相关',
                items: [{ text: 'Linux服务器', link: '/2ops/linux_server/command.md' },
                    { text: 'nginx', link: '/2ops/nginx/concept.md' },
                    { text: 'docker', link: '/2ops/docker/concept.md' },
                ]
            },
            {
                text: '靶场',
                link: '/0secure/',
                items: [{ text: 'pikachu', link: 'http://www.mukee.ltd:90' },
                    { text: '74cms', link: 'http://www.mukee.ltd:91' },
                    { text: 'xdcms', link: 'http://www.mukee.ltd:92' },
                    { text: '订单系统', link: 'http://www.mukee.ltd:93' }
                ]
            },
            { text: '友链', link: '/blogroll/' }
        ],
        sidebar: require('./sidebar'),
        sidebarDepth: 2,
        lastUpdated: 'Last Updated'
    }
}