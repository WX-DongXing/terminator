/**
* 预览视图
* Author: dong xing
* Date: 2020/3/1
* Time: 18:45
* Email: dong.xing@outlook.com
*/

<template>
  <div class="preview">
    <Renderer :view="preview" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Renderer from '@/components/Renderer'
export default {
  name: 'Preview',
  components: {
    Renderer
  },
  computed: {
    ...mapState('screen', ['view']),
    preview () {
      return this.view.getOption()
    }
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
