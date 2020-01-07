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
      <van-col span="6" class="item">1</van-col>
      <van-col span="6" class="item">2</van-col>
      <van-col span="6" class="item">3</van-col>
      <van-col span="6" class="item">4</van-col>
    </van-row>
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
        height: 150px;
        background: red;
      }
    }
  }
</style>