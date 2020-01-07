<template>
  <van-row gutter="24" class="header">
    <van-col span="5" class="name">{{ name }}</van-col>
    <van-col span="16">
      <div class="search"><van-icon name="search" />搜索</div>
    </van-col>
  </van-row>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
@Component
export default class Search extends Vue {
  @Prop({
    type: String,
    required: true,
    default: '音乐馆'
  })
  name!: string
} 
</script>

<style lang="less" scoped>
.header {
  line-height: 80px;
  padding: 0 40px;
  text-align: center;
  .name {
    padding: 0!important;
    font-size: 40px;
    font-weight: 550;
  }
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
</style>