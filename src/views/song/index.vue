<template>
  <div class="song" ref="song">
    <div class="title"> 
      <span 
        @click="switchPage(0)"
        :class="{'currentTitle': currentIndex === 0}">歌曲</span> | 
      <span 
        @click="switchPage(1)"
        :class="{'currentTitle': currentIndex === 1}">歌词</span> 
    </div>
    <div class="content">
      <div class="container" 
        ref="swiper"
        @touchstart="moveStart"
        @touchmove="moveBox"
        @touchend="moveEnd">
        <div class="left">
          <div class="img-box">
            <img :src="imgUrl" alt="">
          </div>

          <div class="song-info">
            <div class="song-name">给我一点温度</div>
          </div>
        </div>

        <div class="right">

        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import api from '@/common/api'
import {
  getImageData, 
  getCounts
} from '@/common/helpers'

@Component
export default class Song extends Vue{
  // data
  start_X: number = 0
  currentIndex: number = 0
  imgUrl: string = ''


  created() {
    this.init()
  }


  // methods
  init(): void {
    this.getSongInfo()
  }


  /**
   * 获取歌曲信息
   */
  getSongInfo() {
    let that = this
    api.song.getSong({code: 123}, (res: any) => {
      if (res.data.code === 'success') {
        const { url } = res.data.obj
        this.imgUrl = require('../../assets/image/2.jpg')
        this.getColor(this.imgUrl)
      }
    })
  }

  /**
   * 获取图片主色
   */
  async getColor(url: string) {
    try {
      const data = await getImageData(url, 1)
      let arr: any = getCounts(data, ['rgba(232,232,232, 0.5)', 'rgb(0, 0, 0)'])
      let $el: any = this.$refs.song

      let color: string = arr[0].color.split('(')[1].split(')')[0]
      color = `rgba(${color}, 0.7)`
      $el.style.background = color
    }
    catch (err) {
      console.log(err)
    }
  }


  /**
   * 点击切换
   * @params {number} page 点击页数
   */
  switchPage(page: number): void {
    if (page === 0 && this.currentIndex !== 0) {
      let el: any = this.$refs.swiper
      const client_W: number = window.innerWidth
      el.style.transform = `translateX(0px)`
      el.style.transition = '300ms'
      this.currentIndex = 0
    }

    if (page === 1 && this.currentIndex !== 1) {
      let el: any = this.$refs.swiper
      const client_W: number = window.innerWidth
      el.style.transform = `translateX(${-client_W}px)`
      el.style.transition = '300ms'
      this.currentIndex = 1
    }
  }


  /**
   * 获取初始坐标
   */
  moveStart(e: any): void {
    this.start_X  = e.targetTouches[0].pageX
  }


  /**
   * 移动盒子
   */
  moveBox(e: any): void {
    const { start_X, currentIndex } = this

    let el: any = this.$refs.swiper
    const move_X: number = e.targetTouches[0].pageX
    const move_W: number = move_X  - start_X
    const client_W: number = e.targetTouches[0].target.clientWidth
    
    if (move_W > 0) {
      if (currentIndex === 0) {
        let move_r = move_W * 0.5
        el.style.transform = `translateX(${move_r}px)`
      } else {
        el.style.transform = `translateX(${move_W}px)`
      }
    } else {
      if (currentIndex === 0) {
        el.style.transform = `translateX(${move_W}px)`
      } else {
        let move_r = move_W * 0.5 - client_W
        el.style.transform = `translateX(${move_r}px)`
      }
    }
  }


  /**
   * 移动结束
   */
  moveEnd(e: any): void {
    let { start_X, currentIndex } = this
    let el: any = this.$refs.swiper
    const move_X: number = e.changedTouches[0].pageX
    const move_W: number = move_X  - start_X
    const client_W: number = window.innerWidth
    console.log('test:>end', client_W)

    if (move_W === 0) {
      return 
    }

    if (move_W > 0) {

      if (currentIndex === 0) {
        el.style.transform = `translateX(0px)`
        el.style.transition = '500ms'
      } else {

        if (move_W >= client_W / 2) {
          el.style.transform = `translateX(0px)`
          el.style.transition = '500ms'
          this.currentIndex = 0
        } else {
          el.style.transform = `translateX(${-client_W}px)`
          el.style.transition = '500ms'
        }
      }

      this.start_X = 0

    } else {

      if (currentIndex === 0) {
        el.style.transform = `translateX(${-client_W}px)`
        el.style.transition = '500ms'
        this.currentIndex = 1
      } else {
        if (-move_W >= client_W / 2) {
          el.style.transform = `translateX(${-client_W}px)`
          el.style.transition = '500ms'
          this.currentIndex = 1
        } else {
          el.style.transform = `translateX(0px)`
          el.style.transition = '500ms'
        }
        
      }

      this.start_X = 0

    }
  }
  
}
</script>

<style lang="less">
.song {
  height: 100vh;
  .title {
    width: 300px;
    height: 60px;
    color: #8a8a8a;
    line-height: 60px;
    margin: 0 auto;
    text-align: center;
    .currentTitle {
      color: #fff;
    }
  }
  .content {
    width: 100%;
    height: calc(100vh - 60px);
    overflow: hidden;
    .container {
      width: 200vw;
      height: 100%;
      .left {
        width: 100vw;
        height: 100%;
        float: left;
        .img-box {
          width: 80vw;
          height: 80vw;
          vertical-align: middle;
          margin: 20px auto;
          border-radius: 20px;
          overflow: hidden;
          img {
            width: 80vw;
            height: 80vw;
            border-radius: 10px;
          }
        }
        .song-info {
          width: 80vw;
          margin: 0 auto;
          .song-name {
            color: #fff;
            font-size: 50px;
            font-weight: 600;
            letter-spacing:8px;
          }
        }
      }
      .right {
        width: 100vw;
        height: 100%;
        float: left;
      }
    }
  }
}
</style>