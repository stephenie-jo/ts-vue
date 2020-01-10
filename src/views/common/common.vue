<template>
  <div class="common">
    <div class="container">
      <router-view></router-view>
    </div>
   
    <van-row gutter="24" class="tabbar">
      <van-col span="6" @click="goUrl(i)" v-for="(item, i) in btns" :key="i" class="item" :style="{color: active === i ? 'rgba(34,213,156,1)' : '#000'}">
        <i class="iconfont" :class="item.icon"></i> <br/>
        {{item.label}}
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'

@Component
export default class Common extends Vue{
  // data
  active: number = 0
  btns: object[] = [
    {label: '音乐馆', icon: 'icon-yinyue'},
    {label: '推荐', icon: 'icon-tuijian1'},
    {label: '动态', icon: 'icon-dongtai-copy'},
    {label: '我的', icon: 'icon-wode'},
  ]


  created() {
    this.init()
  }


  // methods
  init(): void {
    const { name } = this.$route
    let menus: string[] = ['home', '', '', 'mine']

    menus.forEach((item, i) => {
      if (item && item === name) {
        this.active = i
      }
    })

  }


  goUrl(i: number): void {
    if (this.active === i) return
    this.active = i

    switch (i) {
      case 0: 
        this.$router.push({
          name: 'home'
        })
        break
      case 3: 
        this.$router.push({
          name: 'mine'
        })
        break
    }
  }
  
  
}
</script>

<style lang="less">
.common {
  .container {
    height: calc(100vh - 100px);
    overflow-y: scroll;
    background: #f7f8fa;
  }
  .tabbar {
    text-align: center;
    .item {
      height: 100px;
      text-align: center;
      font-size: 18px;
      padding-top: 20px;
      i {
        font-size: 40px;
        margin-left: 8px;
      }
    }
  }
}
</style>