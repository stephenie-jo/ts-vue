<template>
  <div class="common">
    <div class="container">
      <router-view></router-view>
    </div>
   
    <van-row gutter="24" class="tabbar">
      <van-col span="6" @click="goUrl(i)" v-for="(item, i) in btns" :key="i">
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
  btns: object[] = [{label: '音乐馆'}]

  created() {
    console.log(this.btns)
  }


  goUrl(i: number) {
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
          name: 'user-center'
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
  .tabber {
    height: 100px;
  }
}
</style>