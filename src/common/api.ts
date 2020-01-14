import axios from '../axios/axios'
import url from './api-url'

export default {
  home: {
    getHome: function(params: object, sc: any) {
      axios.post(url.home.getHome, params)
        .then((r) => {
          sc(r)
        })
    }
  }
}