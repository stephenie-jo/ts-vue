import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.Accept = 'application/json'
axios.defaults.withCredentials = true
axios.defaults.timeout = 20000
axios.defaults.baseURL = '/'

// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//   delete config.data.loading
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })

// 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   if (response.data.code == 'login') {
//     // 暂无登录页，若用户没有登录权限，直接关闭网页
//     Dialog.alert({ message: '该用户没有登录权限' }).then(() => {
//       const ua = window.navigator.userAgent.toLowerCase()
//       if (ua.match(/MicroMessenger/i) == 'micromessenger') {
//         document.addEventListener('WeixinJSBridgeReady', () => { WeixinJSBridge.call('closeWindow') }, false)
//         WeixinJSBridge.call('closeWindow')
//       }
//     })
//     return
//   }
//   if(response.data.code == 'fail') Toast(response.data.message)
//   else return response.data
// }, function (error) {
//   store.dispatch('loading/setLoading', false)
//   Toast('请求失败')
//   return Promise.reject(error)
// })

export default axios
