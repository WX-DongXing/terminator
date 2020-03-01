/**
* 预览视图
* Author: dong xing
* Date: 2020/3/1
* Time: 18:45
* Email: dong.xing@outlook.com
*/

<template>
  <div class="preview">
    <Renderer :view="view" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Renderer from '@/components/renderer'
export default {
  name: 'Preview',
  components: {
    Renderer
  },
  computed: {
    ...mapState('screen', ['view'])
  }
}
</script>

<style scoped>
.preview {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  height: 100vh;
  width: 100vw;
}
</style>
