<template>
  <div class="mine">
    <Search name="我的"/>

    <div class="userInfo">
      <div class="top">
        <img src="https://y.gtimg.cn/music/common/upload/category_area/1909028.jpg" alt="">
        <span>所以我停下来</span>
      </div>
      <div class="bottom">
        <div class="item">

        </div>
        <div class="item">

        </div>
      </div>
    </div>

    <van-row type="flex" justify="space-between" class="navbar">
      <van-col span="6" class="item" v-for="(item, i) in navbars" :key="i">
        <i class="iconfont" :class="item.iconfont"></i>
        <div class="title">{{item.title}}</div>
        <div class="num">{{item.total}}</div>
      </van-col>
    </van-row>

    <div class="sortType">
      <div class="title">智能分类</div>
      <div class=""></div>
    </div>

    <div class="songSheet">
      <van-tabs 
        :v-model="0" 
        background="#f7f8fa" 
        title-active-color="#000"
        title-inactive-color="#7b7878"
        line-width="30px">
        <van-tab title="自建歌单 3">内容 1</van-tab>
        <van-tab title="收藏歌单 8">内容 2</van-tab>
      </van-tabs>

    </div>

    <div class="tabs_panel">
      <div class="tabs_wrap">
        <div class="tablist">
          <div class="tab">123</div>
          <div class="tab">123</div>
          <div class="tab">123</div>
          <div class="tab">123</div>
          <div class="tab">123</div>
          <div class="tab_line"></div>
        </div>
      </div>
      <div>内容1</div>
    </div>
    
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import Search from '@/compoents/search/index.vue'
@Component({
  components: {
    Search
  }
})
export default class UserConter extends Vue{
  // data
  num: number = 0
  navbars: object[] = [
    {iconfont: 'icon-xihuan2', title: '喜欢', total: 179},
    {iconfont: 'icon-zuijin1', title: '最近', total: 179},
    {iconfont: 'icon-xiazai', title: '本地', total: 179},
    {iconfont: 'icon-yigoumai', title: '已购', total: 179},
  ]



  created() {
    
  }

  // methods
  

  
}
</script>

<style lang="less">
  .mine {
    padding-top: 20px;
    .userInfo {
      margin: 40px;
      border-radius: 10px;
      background: #fff;
      .top {
        padding: 20px 40px;
        border-bottom: 1px solid #f7f8fa;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          vertical-align: middle;
        }
        span  {
          font-size: 40px;
          font-weight: unset;
          line-height: 100px;
          margin-left: 20px;
        }
      }
      .bottom {
        padding: 20px 40px;
        .item {
          width: 50%;
          height: 100px;
          display: inline-block;
          background: red;
        }
      }
    }
    .navbar {
      padding: 0 40px;
      .item {
        width: 100px;
        color: #22d59c;
        text-align: center;
        i {
          font-size: 40px;
        }
        .title {
          font-size: 30px;
          line-height: 60px;
        }
        .num {
          font-size: 20px;
          color: #ccc;
        }
      }
    }
    .sortType {
      margin: 40px;
      padding: 20px 40px;
      border-radius: 10px;
      background: #fff; 
      .title {
        font-weight: 600;

      }
    }
    .songSheet {
      padding: 0 40px;
      .van-tab {
        font-size: 30px;
        margin-right: 20px; 
        flex: none;
        -webkit-flex: none;
      }
      .van-tabs__line {
        background-color: #cdcaca;
      }
    }
    .tabs_panel {
      overflow: hidden;
      .tabs_wrap {
        overflow-x: auto;
        overflow-y: hidden;
        padding: 0.373333rem 0;
        margin-bottom: -0.373333rem;
        .tablist {        
          white-space: nowrap;
          .tab {
            width: 200px;
            display: inline-block;
          }
          .tab_line {

          }
        }
      }
    }
    
  }
</style>