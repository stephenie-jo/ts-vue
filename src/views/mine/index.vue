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

    <div class="tabs">
      <Tabs :tabList="tabList" @setActive="getActive"/>
      <div class="van_tab__pane" v-for="(item, i) in tabList" :key="i">
        <div v-if="active === i">
          <Sheet class="pane_item"/>
          <Sheet class="pane_item"/>
          <Sheet class="pane_item"/>
          <Sheet class="pane_item"/>
        </div>
      </div>
    </div>
    
    
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import Search from '@/compoents/search/index.vue'
import Tabs from '@/compoents/tabs/index.vue'
import Sheet from '@/compoents/sheet/index.vue'
@Component({
  components: {
    Search,
    Tabs,
    Sheet
  }
})
export default class UserConter extends Vue{
  // data
  num: number = 0
  active: number = 0
  navbars: object[] = [
    {iconfont: 'icon-xihuan2', title: '喜欢', total: 179},
    {iconfont: 'icon-zuijin1', title: '最近', total: 179},
    {iconfont: 'icon-xiazai', title: '本地', total: 179},
    {iconfont: 'icon-yigoumai', title: '已购', total: 179},
  ]
  tabList: object[] = [
    {title: '自建歌单 3'},
    {title: '收藏歌单 4'}
  ]


  created() {
    
  }

  // methods
  getActive(i: number = 0): void {
    this.active = i
    
  }

  
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
    .tabs {
      margin: 0 40px;
      .van_tab__pane {
        margin-bottom: 20px;
        .pane_item {
          margin-top: 20px;
        }
      }
    }   
  }
</style>