<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import 'assets/less/global';

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
/*控制整个滚动条*/
::-webkit-scrollbar {
  background-color: #f1f1f1;
  width: 7px;
  height: 6px;
  background-clip: padding-box;
}
/*滚动条两端方向按钮*/
::-webkit-scrollbar-button {
  height: 0;
  width: 0;
}
/*滚动条中间滑动部分*/
::-webkit-scrollbar-thumb {
  background-color: #b9b9bd;
  border-radius: 5px;
}

.splitpanes {

  * > &__splitter {
    position: relative;
    min-width: 0 !important;
    min-height: 0 !important;
  }

  &__splitter:before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    transition: opacity 0.4s;
    background-color: #40a9ff;
    opacity: 0;
    z-index: 1;
  }

  &__splitter:before {
    opacity: 1;
  }

  &--vertical > .splitpanes__splitter:before {
    height: 100%;
    left: -2px;
    right: -2px;
  }

  &--horizontal > .splitpanes__splitter:before {
    width: 100%;
    top: -4px;
    bottom: -2px;
  }
}
</style>
