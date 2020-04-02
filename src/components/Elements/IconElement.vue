/**
* 图标部件
* Author: dong xing
* Date: 2020/3/26
* Time: 11:27
* Email: dong.xing@outlook.com
*/
<template>
  <div class="icon-element" v-if="hasOption">
    <a-icon
      :spin="option.spin"
      :rotate="option.rotate"
      :theme="option.theme"
      :type="option.type" />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'IconElement',
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    hasOption () {
      return !_.isEmpty(this.option)
    }
  }
}
</script>

<style scoped lang="less">
.icon-element {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 96px;
  color: rgba(64, 169, 255, 1);
}
</style>
