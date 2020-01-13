<template>
  <div class="sheet_pane">
    <div class="tab_pane_item">
        <div class="pane_item_img">
          <img src="../../assets/image/1.jpg" alt="">
        </div>
        <div class="pane_item_con">
          <div class="item_con_title">梁博</div>
          <div class="item_con_info">
            <span>10 首</span>
            <span style="margin-left: 10px;">来自梁博</span>
          </div>
        </div>
        <div class="pane_item_arrow"></div>
      </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
@Component
export default class Sheet extends Vue{
  
}
</script>

<style lang="less" scoped>
.sheet_pane {
  .tab_pane_item {
    position: relative;
    &::after {
      content: '';
      width: 22px;
      height: 22px;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      border-top: 1px solid #828080;
      border-right: 1px solid #828080;
    }
    .pane_item_img {
      display: inline-block;
      img {
        width: 150px;
        height: 150px;
        vertical-align: middle;
      }
    }
    .pane_item_con {
      margin-left: 30px;
      line-height: 50px;
      display: inline-block;
      vertical-align: middle;
      .item_con_title {
        font-size: 30px;
        font-weight: 600;
      }
      .item_con_info {
        color: #7d7d7d;
        font-size: 28px;
      }
    }
  }
}
</style>