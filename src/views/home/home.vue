<template>
  <div class="home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-row gutter="24">
        <van-col span="4">热爱</van-col>
        <van-col span="16">
          <van-search placeholder="请输入搜索关键词" shape="round" v-model="searchValue" /></van-col>
      </van-row>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
@Component
export default class Home extends Vue{
  // data
  num: number = 0
  searchValue: any = ''
  isLoading: boolean = false



  created() {
    
  }

  // methods
  onRefresh() {
    setTimeout(() => {
      this.isLoading = false
    }, 500);
  }

  
}
</script>

<style lang="less">
.home {
  padding-top: 20px;
}
</style>