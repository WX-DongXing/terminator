/**
* 配置模板
* Author: dong xing
* Date: 2019/11/13
* Time: 1:44 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="config">
    <div class="config__header">
      <p>窗口配置</p>
    </div>
    <div class="config__content">
      <component v-if="activeWidget" :is="activeWidget.config.type" />
      <div class="config__none" v-else>
        <a-icon type="disconnect" />
        <p>无激活窗口配置</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CONFIGCOMPONENTS from './configComponents'

export default {
  name: 'Config',
  components: {
    ...CONFIGCOMPONENTS
  },
  computed: {
    ...mapState('screen', ['activeWidget'])
  }
}
</script>

<style scoped lang="less">
.config {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-content: stretch;
  width: 320px;
  height: 100%;

  &__header {
    flex: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.23);
    box-sizing: border-box;
    padding: 0 16px;

    p {
      flex: none;
      margin: 0;
    }
  }

  &__content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &__none {
    width: 100%;
    text-align: center;

    i {
      color: rgba(0, 0, 0, .56);
      font-size: 36px;
      margin-bottom: 16px;
    }
  }
}
</style>
