/**
* 部件多选器
* Date: 2020/5/25
* Time: 2:31 下午
*/
<template>
  <div class="selector">
  </div>
</template>

<script>
export default {
  name: 'Selector'
}
</script>

<style scoped lang="less">
.selector {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  z-index: 10000;
  background: rgba(24, 144, 255, .12);
  border: 1px solid rgba(24, 144, 255, .45);
}
</style>
