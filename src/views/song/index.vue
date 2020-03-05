<template>
  <div class="song">
    <div class="title"> 
      <span 
        @click="titleIndex = 1"
        :class="{'currentTitle': titleIndex === 1}">歌曲</span> | 
      <span 
        @click="titleIndex = 2"
        :class="{'currentTitle': titleIndex === 2}">歌词</span> 
    </div>
    <div class="content">
      <div class="container" 
        ref="swiper"
        @touchstart="moveStart"
        @touchmove="moveBox"
        @touchend="moveEnd">
        <div class="left">

        </div>

        <div class="right">

        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'

@Component
export default class Song extends Vue{
  // data
  titleIndex: number = 1
  start_X: number = 0
  currentIndex: number = 0

  created() {
    this.init()
  }


  // methods
  init(): void {
    
  }


  /**
   * 获取初始坐标
   */
  moveStart(e: any): void {
    console.log('test:>start', e)
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

    // console.log('test:>move_W', move_W)
    
    if (move_W > 0) {
      if (currentIndex === 0) {
        let move_r = move_W * 0.5
        el.style.transform = `translateX(${move_r}px)`
      } else {

      }
    } else {
      if (currentIndex === 0) {
        el.style.transform = `translateX(${move_W}px)`
      }
    }
  }


  /**
   * 移动结束
   */
  moveEnd(e: any): void {
    console.log('test:>end', e)
    let { start_X, currentIndex } = this
    let el: any = this.$refs.swiper
    const move_X: number = e.changedTouches[0].pageX
    const move_W: number = move_X  - start_X
    const client_W: number = e.changedTouches[0].target.clientWidth

    if (move_W > 0) {
      if (currentIndex === 0) {
        el.style.transform = `translateX(0px)`
        el.style.transition = '500ms'
        this.start_X = 0
      }
    } else {
      if (currentIndex === 0) {
        el.style.transform = `translateX(${-client_W}px)`
        el.style.transition = '500ms'
        this.start_X = 0
        this.currentIndex = 1
      } else {
        
      }
    }
  }
  
}
</script>

<style lang="less">
.song {
  height: 100vh;
  background: #e91e1e6b;
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
        background: red;
        float: left;
      }
      .right {
        width: 100vw;
        height: 100%;
        background: yellow;
        float: left;
      }
    }
  }
}
</style>