<template>
  <div class="home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-row gutter="24" class="header">
        <van-col span="5">音乐馆</van-col>
        <van-col span="16">
          <div class="search"><van-icon name="search" />搜索</div>
        </van-col>
      </van-row>

      <van-swipe :autoplay="5000" indicator-color="white" class="banner">
        <van-swipe-item v-for="(item, i) in swiperList" :key="i" class="banner-item">
          <img v-lazy="item">
        </van-swipe-item>
      </van-swipe>

      <div class="navbar">
        <div class="navbar-item">1</div>
        <div class="navbar-item">1</div>
        <div class="navbar-item">1</div>
        <div class="navbar-item">1</div>
        <div class="navbar-item">1</div>
      </div>

      <div class="recommend">
        <div class="item"></div>
        <div class="item" style="float: right"></div>
      </div>

      <div class="mod">
        <div class="mui_tit">
          <div class="mui_tit__text">官方歌单</div>
          <span class="more">更多<van-icon name="arrow" /></span>
        </div>

        <div class="mui_scroll">
          <div class="mui_scroll__bd">
            <div class="mui_list">
              <div class="mui_list_item">
                <div class="mui_list__box">
                  <div class="mui_list__media"></div>
                  <div class="mui_list__bd">欧美| 流行节奏控</div>
                </div>
              </div>
              <div class="mui_list_item">
                <div class="mui_list__box">
                  <div class="mui_list__media"></div>
                  <div class="mui_list__bd">欧美| 流行节奏控</div>
                </div>
              </div>
              <div class="mui_list_item">
                <div class="mui_list__box">
                  <div class="mui_list__media"></div>
                  <div class="mui_list__bd">欧美| 流行节奏控</div>
                </div>
              </div>
              <div class="mui_list_item">
                <div class="mui_list__box">
                  <div class="mui_list__media"></div>
                  <div class="mui_list__bd">欧美| 流行节奏控</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mod">
        <div class="mui_tit">
          <div class="mui_tit__text">达人歌单</div>
          <span class="more">更多<van-icon name="arrow" /></span>
        </div>

        <div class="mui_scroll">
          <div class="mui_scroll__bd">
            <div class="mui_list">
              <div class="mui_list_item">
                <div class="mui_list__box">
                  <div class="mui_list__media"></div>
                  <div class="mui_list__bd">欧美| 流行节奏控</div>
                </div>
              </div>
              <div class="mui_list_item">
                <div class="mui_list__box">
                  <div class="mui_list__media"></div>
                  <div class="mui_list__bd">欧美| 流行节奏控</div>
                </div>
              </div>
              <div class="mui_list_item">
                <div class="mui_list__box">
                  <div class="mui_list__media"></div>
                  <div class="mui_list__bd">欧美| 流行节奏控</div>
                </div>
              </div>
              <div class="mui_list_item">
                <div class="mui_list__box">
                  <div class="mui_list__media"></div>
                  <div class="mui_list__bd">欧美| 流行节奏控</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
@Component
export default class Home extends Vue{
  // data
  searchValue: any = ''
  isLoading: boolean = false
  swiperList: string[] = []



  created() {
    this.init()
  }

  init() {
    this.swiperList = [
      'https://y.gtimg.cn/music/common/upload/category_area/1909028.jpg',
      'https://y.gtimg.cn/music/common/upload/category_area/1579265.png',
    ]
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
  .banner {
    margin: 40px;
    height: 400px;
    border-radius: 20px;
    .banner-item {
      img {
        width: 100%;
        border-radius: 20px;
      }
    }
  }
  .navbar {
    text-align: center;
    padding: 0 40px;
    height: 100px;
    line-height: 100px;
    .navbar-item {
      width: 20%;
      float: left;
      background: red;
    }
  }
  .recommend {
    height: 250px;
    padding: 0 40px;
    margin: 40px 0;
    .item {
      width: 49%;
      height: 250px;
      float: left;
      border-radius: 20px;
      background: red;
    }
  }
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
        // transform: translateX(-50%);
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
              .mui_list__media {
                width: 300px;
                height: 300px;
                background: red;
                border-radius: 10px;
              }
              .mui_list__bd {
                width: 300px;
                font-size: 30px;
                line-height: 40px;
                margin-top: 20px;
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
  
}
</style>