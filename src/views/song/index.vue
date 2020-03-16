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

            <div class="progress"
                @touchstart.stop
                @touchmove.stop
                @touchend.stop
                @click="changeTime($event)">
              <div class="progress-bg"></div>
              <div class="progress-bar" ref="bar">
                <div class="progress-spot"
                  @click.stop
                  @touchstart.stop="getStartTime($event)"
                  @touchmove.stop="getCurrentTime($event)"
                  @touchend.stop="getEndTime($event)"></div>
              </div>
            </div>

            <div class="progress-time">
              <div class="fl time">{{ startTime | formatTime}}</div>
              <div class="fr time">{{ endTime | formatTime}}</div>
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
                @click="handleSwitch($event)"
                @touchstart.stop
                @touchmove.stop
                @touchend.stop
                ></i>
            </div>

            <audio autoplay id="music" :src="audioSrc" ref="music"></audio>

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
      let min: number = Math.floor(val / 60)
      let sec: any = Math.floor(val - min * 60)
      sec = sec < 10 ? '0' + sec : sec

      return `${min}:${sec}`
    }
  }
})



export default class Song extends Vue{
  // data
  start_X: number = 0
  current_X: number = 0
  currentIndex: number = 0
  startTime: number = 0
  endTime: number = 0
  duration: number = 0
  imgUrl: string = ''
  audioSrc: any = ''
  playFlag: boolean = false
  dropFlag: boolean = false


  created() {
    this.init()
  }

  mounted() {
    let el: any = this.$refs.music
    el.onloadstart = () => {
      this.getMusicInfo()
    }
  }

  // @Watch('audioSrc') 
  // getAudioSrc(newVal: any, oldVal: any) {

  //   let el: any = this.$refs.music
  //   this.$nextTick(() => {
  //     let el: any = this.$refs.music
  //     el.play().catch((err: any) => {
  //       console.log('test:>err', err)
  //     })
  //   })
  // } 


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
      this.endTime = el.duration
      this.duration = el.duration
    }
    this.getSongTime()
  }


  /**
   * 播放、暂停
   */
  handleSwitch(e: any): void {
    let el: any = this.$refs.music

    if (this.playFlag) {
      el.pause()
    } else {
      this.$nextTick(() => {
        el.play().catch((err: any) => {
          console.log('test:>play_err', err)
        })
      })
    }
    this.playFlag = !this.playFlag
  }


  /**
   * 点击进度条
   */
  changeTime(e: any): void {
    let el: any = this.$refs.music
    let bar: any = this.$refs.bar
    let current_X = e.offsetX
    let _width = bar.clientWidth

    current_X = -_width + current_X
    bar.style.transform = `translateX(${current_X}px`

    el.currentTime = this.duration * e.offsetX / _width
  }


  /**
   * 点击获取圆点
   */
  getStartTime(e: any): void {
    this.dropFlag = true
    this.current_X = e.targetTouches[0].target.clientWidth
  }


  getCurrentTime(e: any): void {
    if (this.dropFlag) {
      let el: any = this.$refs.music
      let bar: any = this.$refs.bar
      el.pause()

      let current_X = e.targetTouches[0].target.clientWidth
      let move_X = current_X - this.currentIndex 
      let _width = bar.clientWidth

      let currentTime = el.currentTime
      let X = _width * currentTime / this.duration

      if (move_X > 0) {
        current_X = -_width + X + move_X
      } else {
        current_X = -_width + X - move_X
      }
      bar.style.transform = `translateX(${current_X})`
    }
  }

  
  getEndTime(e: any): void {
    this.dropFlag = false
  }


  /**
   * 获取当前播放时间
   */
  getSongTime(): void {
    let el: any = this.$refs.music
    el.ontimeupdate = () => {
      this.updateTime()
    }
  }


  /**
   * 更新播放时间
   */
  updateTime(): void {
    let el: any = this.$refs.music
    let bar: any = this.$refs.bar
    let currentTime = el.currentTime
    this.startTime = currentTime
    this.endTime = this.duration - currentTime

    let _width = bar.clientWidth
    let current_X = 0

    current_X = _width * currentTime / this.duration
    current_X = -_width + current_X
    bar.style.transform = `translateX(${current_X}px`
  }


  /**
   * 获取歌曲信息
   */
  getSongInfo(): void {
    let that = this
    api.song.getSong({code: 123}, (res: any) => {
      if (res.data.code === 'success') {
        const { url } = res.data.obj
        this.imgUrl = require('../../assets/image/2.jpg')
        this.getColor(this.imgUrl)
      }
    })
    this.audioSrc = require('../../assets/mp3/123.mp3')
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
    this.start_X  = e.targetTouches[0].clientX
  }


  /**
   * 移动盒子
   */
  moveBox(e: any): void {
    const { start_X, currentIndex } = this

    let el: any = this.$refs.swiper
    const move_X: number = e.targetTouches[0].clientX
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
    const move_X: number = e.changedTouches[0].clientX
    const move_W: number = move_X  - start_X
    const client_W: number = window.innerWidth

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
            margin-top: 80px;        
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
              transform: translateX(-78vw);
              .progress-spot {
                width: 20px;
                height: 20px;
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
            margin-top: 20px;
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