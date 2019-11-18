/**
* 通用配置
* Author: dong xing
* Date: 2019/11/13
* Time: 1:46 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="common-template" v-if="innerConfig">

    <!-- S 背景颜色 -->
    <p class="comment-template__title">背景</p>
    <div class="comment-template__content">
      <div class="comment-template__item">
        <p class="comment-template__leading">颜色:</p>
        <div class="comment-template__inner">
          <ColorPicker
            v-model="innerConfig.backgroundColor"
            @change="change" />
        </div>
      </div>
    </div>
    <!-- E 背景颜色 -->

    <!-- S 边框 -->
    <p class="comment-template__title">边框</p>
    <div class="comment-template__content">
      <div class="comment-template__item">
        <p class="comment-template__leading">宽度:</p>
        <div class="comment-template__inner">
          <a-input
            type="number"
            min="0" max="10"
            v-model.number="innerConfig.border.width" @change="change" />
        </div>
      </div>
      <!-- / 宽度 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">颜色:</p>
        <div class="comment-template__inner">
          <ColorPicker
            v-model="innerConfig.border.color"
            @change="change" />
        </div>
      </div>
      <!-- / 颜色 -->
    </div>
    <!-- E 边框 -->

    <!-- S 边距 -->
    <p class="comment-template__title">边距</p>
    <div class="comment-template__content">
      <div class="comment-template__item">
        <p class="comment-template__leading">上:</p>
        <div class="comment-template__inner">
          <a-input type="number" min="0" v-model.number="innerConfig.padding[0]" @change="change" />
        </div>
      </div>
      <!-- / 上边距 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">右:</p>
        <div class="comment-template__inner">
          <a-input type="number" v-model.number="innerConfig.padding[1]" min="0" @change="change" />
        </div>
      </div>
      <!-- / 右边距 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">下:</p>
        <div class="comment-template__inner">
          <a-input type="number" v-model.number="innerConfig.padding[2]" min="0" @change="change" />
        </div>
      </div>
      <!-- / 下边距 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">左:</p>
        <div class="comment-template__inner">
          <a-input type="number" v-model.number="innerConfig.padding[3]" min="0" @change="change" />
        </div>
      </div>
      <!-- / 左边距 -->
    </div>
    <!-- E 边距 -->

    <!-- S 尺寸 -->
    <p class="comment-template__title">尺寸</p>
    <div class="comment-template__content">
      <div class="comment-template__item">
        <p class="comment-template__leading">宽:</p>
        <div class="comment-template__inner">
          <a-input type="number" v-model.number="innerConfig.width" min="0" @change="change" />
        </div>
      </div>
      <!-- / 宽 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">高:</p>
        <div class="comment-template__inner">
          <a-input type="number" v-model.number="innerConfig.height" min="0" @change="change" />
        </div>
      </div>
      <!-- / 高 -->
    </div>
    <!-- E 尺寸 -->

    <!-- S 位置 -->
    <p class="comment-template__title">位置</p>
    <div class="comment-template__content">
      <div class="comment-template__item">
        <p class="comment-template__leading">X:</p>
        <div class="comment-template__inner">
          <a-input type="number" v-model.number="innerConfig.left" min="0" @change="change" />
        </div>
      </div>
      <!-- / x坐标位置 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">Y:</p>
        <div class="comment-template__inner">
          <a-input type="number" v-model.number="innerConfig.top" min="0" @change="change" />
        </div>
      </div>
      <!-- / y坐标位置 -->
    </div>
    <!-- E 位置 -->

  </div>
</template>

<script>
import '@/assets/less/template.less';
import _ from 'lodash';
import ColorPicker from '@/components/colorPicker/index.vue';

export default {
  name: 'CommonTemplate',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    ColorPicker,
  },
  data: () => ({
    innerConfig: null,
  }),
  created() {
    this.innerConfig = _.cloneDeep(this.config);
  },
  methods: {
    change() {
      this.$emit('change', this.innerConfig);
    },
  },
  watch: {
    config(v) {
      this.innerConfig = _.cloneDeep(v);
    },
  },
};
</script>

<style scoped>
.common-template {
  height: calc(100vh - 224px);
  overflow: auto;
}
</style>
