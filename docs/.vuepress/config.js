module.exports = {
  title: "Stay hungry",
  description: "go around!",
  themeConfig: {
    sidebar: [
      {
        path: '/wx/',
        title: '微信小程序',
        children: [
          {
            path: '/wx/components/',
            title: "自定义组件"
          }
        ]
      },
      {
        path: '/react/',
        title: 'React'
      }
    ]
  }
}