<template>
  <div class="home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-row gutter="24" class="header">
        <van-col span="5">音乐馆</van-col>
        <van-col span="16">
          <div class="search"><van-icon name="search" />搜索</div>
        </van-col>
      </van-row>

      <van-row>
        
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
  .header {
    line-height: 80px;
    .search {
      height: 80px;
      color: #9b9b9b;
      border-radius: 100px;
      background: #fff;
      .van-icon {
        top: 6px;
        right: 10px;
      }
    }
  }
}
</style>