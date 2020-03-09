const cxb: string = process.env.NODE_ENV === 'development' ? '/cxb' : ''
export default {
  home: {
    getHome: `${cxb}/home`
  },
  song: {
    getSong: `${cxb}/song`
  }
}