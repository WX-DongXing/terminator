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
</style>
