<template>
  <div class="mod">
    <div class="mui_tit">
      <div class="mui_tit__text">{{sheet.title}}</div>
      <span class="more">更多<van-icon name="arrow" /></span>
    </div>

    <div class="mui_scroll">
      <div class="mui_scroll__bd">
        <div class="mui_list">
          <div class="mui_list_item" v-for="(item, i) in sheet.list" :key="i">
            <div class="mui_list__box">
              <div class="mui_list__media">
                <img :src="item.url" alt="">
              </div>
              <div class="mui_list__bd">{{item.text}}</div>
            </div>
          </div>
    
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
@Component
export default class Mod1 extends Vue{
  @Prop({
    type: Object,
    required: true,
    default: () => {}
  })
  sheet!: {}
}
</script>

<style lang="less" scoped>
.mod {
    .mui_tit {
      padding: 0 40px;
      position: relative;
      .mui_tit__text {
        font-size: 40px;
        font-weight: 500;
      }
      .more {
        color: rgba(26,26,26,.5);
        position: absolute;
        top: 10px;
        right: 40px;
        .van-icon {
          top: 5px;
        }
      }
    }
    .mui_scroll {
      overflow: hidden;
      .mui_scroll__bd {
        overflow-x: auto;
        overflow-y: hidden;
        padding: 14px 0;
        margin-bottom: -14px;
        .mui_list {
          margin: 0 40px;
          white-space: nowrap;
          .mui_list_item {
            display: inline-block;
            &:last-child {
              margin-right: 40px;
            }
            .mui_list__box {
              margin: 0 10px;
              width: 500px;
              .mui_list__media {
                border-radius: 10px;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 10px;
                }
              }
              .mui_list__bd {
                font-size: 30px;
                line-height: 40px;
                margin-top: 10px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                white-space: normal;
                word-wrap: break-word;
                word-break: normal;
              }

            }
          }
        }
      }
    } 
  }
</style>