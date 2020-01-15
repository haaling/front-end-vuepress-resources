module.exports = {
  title: "Stay hungry",
  description: "go around!",
  displayAllHeaders: true,
  themeConfig: {
    // 侧边栏路由
    sidebar: [
      {
        path: '/markdown/',
        title: 'Markdown查阅文档'
      },
      {
        path: '/wx/',
        title: '微信小程序',
        children: [
          {
            path: '/wx/components/',
            title: "自定义组件"
          },
          {
            path: 'wx/Q&&A/',
            title: "开发Q && A"
          }
        ]
      },
      {
        path: '/react/',
        title: 'React',
      },
      {
        path: '/qanda/',
        title: 'Q and A'
      }
    ]
  },
  lastUpdated: '最后更新时间',
  repo: '',
}