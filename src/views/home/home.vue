<template>
  <div class="home">
    
    <Search name="音乐馆"/>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-swipe :autoplay="3000" indicator-color="white" class="banner">
        <van-swipe-item v-for="(item, i) in swiperList" :key="i" class="banner-item">
          <img v-lazy="item">
        </van-swipe-item>
      </van-swipe>

      <div class="navbar">
        <div class="navbar-item">1</div>
        <div class="navbar-item">1</div>
        <div class="navbar-item">1</div>
        <div class="navbar-item">1</div>
        <div class="navbar-item">1</div>
      </div>

      <div class="recommend">
        <div class="item"></div>
        <div class="item" style="float: right"></div>
      </div>

      <Mod />
      <Mod />

      <Mod1 />

      <div>

      </div>
      

    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import Mod from '@/compoents/mod/index.vue'
import Mod1 from '@/compoents/mod1/index.vue'
import Search from '@/compoents/search/index.vue'
@Component({
  components: {
    Mod,
    Mod1,
    Search
  }
})
export default class Home extends Vue{
  // data
  searchValue: any = ''
  isLoading: boolean = false
  swiperList: string[] = []



  created() {
    this.init()
  }

  init() {
    this.swiperList = [
      'https://y.gtimg.cn/music/common/upload/category_area/1909028.jpg',
      'https://y.gtimg.cn/music/common/upload/category_area/1579265.png',
    ]
  }

  // methods
  onRefresh() {
    setTimeout(() => {
      this.isLoading = false
    }, 500)
  }

  
}
</script>

<style lang="less" scoped>
.home {
  padding-top: 20px;
  .banner {
    margin: 40px;
    height: 400px;
    border-radius: 20px;
    .banner-item {
      img {
        width: 100%;
        border-radius: 20px;
      }
    }
  }
  .navbar {
    text-align: center;
    padding: 0 40px;
    height: 100px;
    line-height: 100px;
    .navbar-item {
      width: 20%;
      float: left;
      background: red;
    }
  }
  .recommend {
    height: 250px;
    padding: 0 40px;
    margin: 40px 0;
    .item {
      width: 49%;
      height: 250px;
      float: left;
      border-radius: 20px;
      background: red;
    }
  }
  
}
</style>