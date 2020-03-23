/**
* 边配置模板
* Author: dong xing
* Date: 2020/2/20
* Time: 11:51 上午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="edge-template common-template">

    <slot name="header" :model="model" />
    <!-- / 边通用配置顶部插槽 -->

    <div class="comment-template__item">
      <p class="comment-template__leading">线条颜色:</p>
      <div class="comment-template__inner">
        <ColorPicker v-model="model.style.stroke" @change="change" />
      </div>
    </div>
    <!-- / 线条颜色 -->

    <div class="comment-template__item">
      <p class="comment-template__leading">粗细:</p>
      <div class="comment-template__inner">
        <a-slider
          v-model="model.style.lineWidth"
          @change="change"
          :min="1"
          :max="10" />
      </div>
    </div>
    <!-- / 粗细 -->

    <div class="comment-template__item">
      <p class="comment-template__leading">折线密度:</p>
      <div class="comment-template__inner">
        <a-slider
          v-model="model.style.lineDash[0]"
          @change="change"
          :min="0"
          :max="16" />
      </div>
    </div>
    <!-- / 折线密度 -->

    <!-- S 节点通用配置默认插槽 -->
    <slot :model="model" />
    <!-- E 节点通用配置默认插槽 -->

  </div>
</template>

<script>
import '@/assets/less/template.less'
import ColorPicker from '@/components/ColorPicker'

export default {
  name: 'EdgeTemplate',
  components: {
    ColorPicker
  },
  props: {
    model: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    change () {
      this.$emit('change')
    }
  }
}
</script>

<style scoped>

</style>
