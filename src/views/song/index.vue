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
            <div class="song-user">梁博</div>
            <div class="song-lyric">给我一点温度</div>

            <div class="progress">
              <div class="progress-bg"></div>
              <div class="progress-bar">
                <div class="progress-spot"></div>
              </div>
            </div>

            <div class="progress-time">
              <div class="fl time">00:00</div>
              <div class="fr time">{{ duration | formatTime}}</div>
            </div>

            <div class="play-box">
              <i class="fl iconfont icon-shangyishou icon-pro"
                @touchstart.stop
                @touchmove.stop
                @touchend.stop></i>
              <i class="fr iconfont icon-xiayishou icon-next"
                @touchstart.stop
                @touchmove.stop
                @touchend.stop></i>
              <i class="icon-play iconfont" 
                :class="[playFlag ? 'icon-zanting' : 'icon-bofang1']"  
                @touchstart.stop="handleSwitch($event)"
                @touchmove.stop
                @touchend.stop
                ></i>
            </div>

            <audio autoplay controls id="music" src="../../assets/mp3/123.mp3" ref="music"></audio>

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

@Component({
  filters: {
    formatTime: (val: number) => {
      let time: any = val / 60 * 100
      time =(parseInt(time.toString().split('.')[0])/100).toFixed(2)

      let min: string = time.split('.')[0]
      let sec: string = time.split('.')[1]
      min = min.length < 2 ? '0' + min : min

      return `${min}:${sec}`
    }
  }
})

export default class Song extends Vue{
  // data
  start_X: number = 0
  currentIndex: number = 0
  imgUrl: string = ''
  playFlag: boolean = false
  duration: number = 0


  created() {
    this.init()
  }

  mounted() {
    this.getMusicInfo()
  }


  // methods
  init(): void {
    this.getSongInfo()
  }


  /**
   * 获取audio时长
   */
  getMusicInfo(): void {
    let el: any = this.$refs.music
    el.ondurationchange = () => {
      this.duration = el.duration
      el.play()
    }
  }


  /**
   * 播放、暂停
   */
  handleSwitch(e: any): void {
    this.playFlag = !this.playFlag
    console.log('test:>播放', this.playFlag)
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
    console.log('test:>start')
    this.start_X  = e.targetTouches[0].pageX
  }


  /**
   * 移动盒子
   */
  moveBox(e: any): void {
    console.log('test:>move')
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
        if (-move_W >= client_W / 2) {
          el.style.transform = `translateX(${-client_W}px)`
          el.style.transition = '500ms'
          this.currentIndex = 1
        } else {
          el.style.transform = `translateX(0px)`
          el.style.transition = '500ms'
        }
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
          .song-user, .song-lyric {
            color: #ccc;
            font-size: 35px;
            line-height: 80px;
          }
          .progress {
            width: 100%;
            padding: 20px 0;            
            position: relative;
            overflow: hidden;
            .progress-bg {
              width: 100%;
              height: 3px;
              background: red;
            }
            .progress-bar {
              width: 100%;
              height: 4px;
              background: #fff;
              position: absolute;
              top: 19px;
              transform: translateX(-80vw);
              .progress-spot {
                width: 30px;
                height: 30px;
                background: #fff;
                border-radius: 50%;
                position: absolute;
                top: -50%;
                transform: translateY(-50%);
                right: 0;
              }
            }
            
          }
          .progress-time {
            width: 100%;
            overflow: hidden;
            .time {
              color: #ccc;
              font-size: 20px;
            }
          }
          .play-box {
            width: 54vw;
            margin: 0 auto;
            padding: 40px 0;
            position: relative;
            overflow: hidden;
            .icon-play {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translateX(-50%) translateY(-50%);
              color: #fff;
              font-size: 120px;
            }
            .icon-pro, .icon-next {
              color: #fff;
              font-size: 60px;
              font-weight: 600;
            }
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
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
}
</style>