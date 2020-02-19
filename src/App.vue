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
</style>
