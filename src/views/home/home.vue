<template>
  <div class="home">
    
    <Search name="音乐馆"/>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-swipe :autoplay="3000" indicator-color="white" class="banner">
        <van-swipe-item v-for="(item, i) in swiperList" :key="i" class="banner-item">
          <img v-lazy="item.url">
        </van-swipe-item>
      </van-swipe>

      <div class="navbar">
        <div class="navbar-item" v-for="(item, i) in  btns" :key="i">
          <i class="iconfont" :class="item.icon"></i> <br/>
          {{item.label}}
        </div>
      </div>

      <div class="recommend">
        <div class="item" v-for="(item, i) in recommend" :key="i">
          <img src="../../assets/image/1.jpg" alt="">
          <div class="con">
            <div class="title">{{item.title}}</div>
            <div>{{item.content}}</div>
          </div>
        </div>
      </div>

      <Mod class="mt-60" :sheet="officialSheet"/>
      
      <Mod class="mt-60" :sheet="darenSheet"/>

      <Mod1 class="mt-60" :sheet="sortArea"/>

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
import api from '@/common/api'
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
  swiperList: Object[] = []
  officialSheet: object = {}
  darenSheet: object = {}
  sortArea: object = {}
  btns: object[] = [
    {label: '歌手', icon: 'icon-geshou2'},
    {label: '排行', icon: 'icon-paihang1'},
    {label: '分类歌单', icon: 'icon-icon_type'},
    {label: '电台', icon: 'icon-ziyuan'},
    {label: '一起听', icon: 'icon-tingli'},
  ]
  recommend: object[] = [
    {url: '', title: '新年新碟', content: 'ONER新年单曲', backgroundUrl: ''},
    {url: '', title: '新年新碟', content: 'ONER新年单曲', backgroundUrl: ''},
  ]


  created() {
    this.init()
  }


  // methods
  init(): void {

    api.home.getHome({}, (res: any) => {
      if (res.data.code === 'success') {
        this.swiperList = res.data.obj.swiperList
        this.officialSheet = res.data.obj.officialSheet
        this.darenSheet = res.data.obj.darenSheet
        this.sortArea = res.data.obj.sortArea
      }
    })
  }

  /**
   * 下拉
   */
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
    // height: 250px;
    padding: 0 40px;
    margin: 40px 0;
    overflow: hidden;
    .item {
      width: 49%;
      float: left;
      border-radius: 12px;
      padding: 30px 20px;
      box-sizing: border-box;
      background: #f67b0e;
      &:last-child {
        float: right;
      }
      img {
        width: 100px;
        height: 100px;
        border-radius: 5px;
        vertical-align: middle;
      }
      .con {
        color: #fff;
        font-size: 20px;
        text-indent: 20px;
        line-height: 40px;
        display: inline-block;
        vertical-align: middle;
        .title {
          font-size: 22px;
          font-weight: 600;
        }
      }
    }
  }

  .mt-60 {
    margin-top: 60px;
  }
  
}
</style>