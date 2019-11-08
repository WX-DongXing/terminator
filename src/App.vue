<template>
  <div id="app">
    <div class="header">
      <p>Terminator</p>
    </div>
    <div class="content">
      <div class="left">
        <Template />
      </div>
      <div class="center">
        <Screen />
      </div>
      <div class="right">
        <Config />
      </div>
    </div>
  </div>
</template>

<script>
import Screen from './views/screen/index.vue';
import Template from './views/template/index.vue';
import Config from './views/config/index.vue';

export default {
  name: 'app',
  components: {
    Screen,
    Template,
    Config,
  },
};
</script>

<style lang="less">
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
  flex: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 54px;
  box-sizing: border-box;
  padding: 0 24px;
  background: rebeccapurple;

  p {
    color: whitesmoke;
    font-weight: bold;
    font-size: 18px;
    margin: 0;
  }
}

.content {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 100%;
  width: 100vw;
}

.left {
  flex: none;
  width: 240px;
  background: #fafafa;
}

.center {
  width: 100%;
  overflow: auto;
  background: white;
}

.right {
  flex: none;
  width: 320px;
  background: #fafafa;
}
</style>
