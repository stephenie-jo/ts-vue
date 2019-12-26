<template>
  <div class="common">
    <router-view></router-view>
    <van-tabbar v-model="active" class="tabber" :z-index="3" route>
      <van-tabbar-item icon="home-o" replace to="/common/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" replace to="/common/chat">消息</van-tabbar-item>
      <van-tabbar-item icon="friends-o" replace to="/common/shopping-cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" replace to="/common/user-center">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'

@Component
export default class Common extends Vue{
  // data
  active: number = 0

  
}
</script>

<style lang="less">
.common {
  .tabber {
    height: 100px;
  }
}
</style>