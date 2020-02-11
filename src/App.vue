<template>
  <div id="app">
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
import Screen from './views/screen/index.vue'
import Template from './views/template/index.vue'
import Config from './views/config/index.vue'

export default {
  name: 'App',
  components: {
    Screen,
    Template,
    Config
  },
  data: () => ({
    leftPanelExpand: true,
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

<style lang="less">
@import "assets/less/common";

#app {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  height: 100vh;
  width: 100vw;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: whitesmoke;
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
  z-index: 3;

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

.ant-collapse-content.ant-collapse-content-active {
  overflow: visible !important;
}
</style>
