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
        <div class="navbar-item" v-for="(item, i) in  btns" :key="i">
          <i class="iconfont" :class="item.icon"></i> <br/>
          {{item.label}}
        </div>
      </div>

      <div class="recommend">
        <div class="item"></div>
        <div class="item" style="float: right"></div>
      </div>

      <Mod class="mt-60"/>
      
      <Mod class="mt-60"/>

      <Mod1 class="mt-60"/>

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
  btns: object[] = [
    {label: '歌手', icon: 'icon-geshou2'},
    {label: '排行', icon: 'icon-paihang1'},
    {label: '分类歌单', icon: 'icon-icon_type'},
    {label: '电台', icon: 'icon-ziyuan'},
    {label: '一起听', icon: 'icon-tingli'},
  ]


  created() {
    this.init()
  }


  // methods
  init(): void {
    this.swiperList = [
      'https://y.gtimg.cn/music/common/upload/category_area/1909028.jpg',
      'https://y.gtimg.cn/music/common/upload/category_area/1579265.png',
    ]
  }

  
  onRefresh(): void {
    setTimeout(() => {
      this.isLoading = false
    }, 500)
  }

  
}
</script>

<style lang="less" scoped>
.home {
  padding-top: 20px;
  margin-bottom: 40px;
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
    .navbar-item {
      width: 20%;
      float: left;
      line-height: 50px;
      color: rgba(34,213,156,1);
      i {
        font-size: 40px;
        margin-left: 10px;
        margin-bottom: 10px;
      }
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

  .mt-60 {
    margin-top: 60px;
  }
  
}
</style>