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
      <p>Terminator</p>
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
  </div>
</template>

<script>
import Screen from './components/screen/index'
import Template from './components/template/index'
import Config from './components/config/index'

export default {
  name: 'Design',
  components: {
    Screen,
    Template,
    Config
  },
  data: () => ({
    // 左区域展开
    leftPanelExpand: true,
    // 左区域展开
    rightPanelExpand: true
  }),
  methods: {
    leftPanelControl (control) {
      this.leftPanelExpand = control
    },
    rightPanelControl (control) {
      this.rightPanelExpand = control
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
  box-shadow: 0 2px 8px #f0f1f2;
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
