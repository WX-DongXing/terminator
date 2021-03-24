/**
* 设计视图
* Author: dong xing
* Date: 2020/3/1
* Time: 18:44
* Email: dong.xing@outlook.com
*/

<template>
  <div class="design">
    <div class="header">
      <p>Terminator - 数据可视化设计器</p>
    </div>

    <div class="content">
      <transition name="panel">
        <div class="left" v-show="leftPanelExpand">
          <Template />
        </div>
      </transition>
      <div class="center">
        <Screen @left="leftPanelControl" @right="rightPanelControl"/>
      </div>
      <transition name="panel">
        <div class="right" v-show="rightPanelExpand">
          <Config />
        </div>
      </transition>
    </div>

    <a-drawer
      title="预览"
      placement="top"
      height="100vh"
      width="100vw"
      destroy-on-close
      :visible="visible"
      :header-style="{ display: 'none' }"
      :body-style="{ padding: 0 }"
      @close="() => this.visible = false"
    >
      <Renderer :view="option" />
    </a-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Screen from './modules/screen/index'
import Template from './modules/template/index'
import Config from './modules/config/index'
import View from '@/model/view'
import Renderer from '@/components/Renderer'

export default {
  name: 'Design',
  components: {
    Screen,
    Template,
    Config,
    Renderer
  },
  data: () => ({
    // 左区域展开
    leftPanelExpand: true,
    // 左区域展开
    rightPanelExpand: true,
    // 是否显示预览
    visible: false
  }),
  computed: {
    ...mapState('screen', ['view']),
    option () {
      return this.view instanceof View && this.view.getOption({ mode: 'preview' })
    }
  },
  methods: {
    leftPanelControl (control) {
      this.leftPanelExpand = control
    },
    rightPanelControl (control) {
      this.rightPanelExpand = control
    },
    preview () {
      this.visible = true
    }
  }
}
</script>

<style scoped lang="less">
.design {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.header {
  position: relative;
  flex: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 54px;
  box-sizing: border-box;
  padding: 0 16px;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.23);
  z-index: 5;

  p {
    color: #757575;
    font-weight: bold;
    font-size: 18px;
    margin: 0;
  }
}

.content {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 100%;
  width: 100vw;
}

.left {
  flex: none;
  width: 240px;
  background: white;
  overflow: hidden;
}

.center {
  width: 100%;
  overflow: auto;
  background: white;
}

.right {
  flex: none;
  width: 320px;
  background: white;
}

/* panel 过度动画 */
.panel-enter-active, .panel-leave-active {
  transition: all 400ms cubic-bezier(.25,.8,.25,1);
}

.panel-enter, .panel-leave-to {
  width: 0;
}

</style>
