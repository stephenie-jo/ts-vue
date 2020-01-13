<template>
  <div class="tabs_panel">
    <div class="tabs_wrap">
      <div class="tablist" ref="tablist">
        <div 
          class="tab" 
          v-for="(item, i) in tabList" 
          :key="i"
          :class="{'van-tab--active': active === i}"
          @click="getActive(i)">
          {{`${item.title}`}}
        </div>
        <div class="tab_line" ref="tabline"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
@Component
export default class Tabs extends Vue {
  @Prop({  // 标签栏text
    type: Array,
    required: true,
    default: []
  })
  tabList!: object []

  @Prop({  // 	动画时间，单位秒
    type: Number,
    required: false,
    default: 0.3
  })
  duration!: number

  @Prop({ // 标签栏背景色	
    type: String,
    required: false,
    default: '#fff'
  })
  background!: string

  @Prop({ // 底部条宽度，默认单位 px	
    type: String,
    required: false,
    default: '100px'
  })
  lineWidth!: string

  @Prop({ // 底部条高度，默认单位 px	
    type: String,
    required: false,
    default: '3px'
  })
  lineHeight!: string

  @Prop({ // 标题选中态颜色	
    type: String,
    required: false,
    default: '#000'
  })
  titleActiveColor!: string

  @Prop({ // 标题默认态颜色	
    type: String,
    required: false,
    default: 'rgb(123, 120, 120)'
  })
  titleInactiveColor!: string

  

  created () {
    this.init()
  }

  // data
  active: number = 0

  init(): void {
    const tablist: any = this.$refs.tablist
    const tabline: any = this.$refs.tabline

    
    tablist.style.background = this.background
    tabline.style['transition-duration'] = `${this.duration}s`
  }

  getActive(i: number): void {
    if (this.active === i) return
    this.active = i

    const activeItem: any = this.$refs.tablist
    let moveLeft: number = activeItem.children[i].offsetLeft

    const tabline: any = this.$refs.tabline
    tabline.style.transform = `translateX(${moveLeft}px)`

    this.$emit('setActive', i)
  }
} 
</script>

<style lang="less" scoped>
.tabs {
  .tabs_panel {
    overflow: hidden;
    .tabs_wrap {
      overflow-x: auto;
      overflow-y: hidden;
      padding: 0.373333rem 0;
      margin-bottom: -0.373333rem;
      .tablist {        
        position: relative;
        white-space: nowrap;
        margin: 20px 0;
        .tab {
          color: rgb(123, 120, 120);
          margin-right: 20px;
          display: inline-block;
        }
        .van-tab--active {
          color: #000;
          font-weight: 600;
        }
        .tab_line {
          width: 100px;
          height: 3px;
          background: red;
          border-radius: 3px;
          position: absolute;
          bottom: -10px;
          transform: translateX(0px);
          transition-duration: 0.3s;
        }
      }
    }
  }
}
</style>