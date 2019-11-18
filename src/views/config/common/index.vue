/**
* 通用配置
* Author: dong xing
* Date: 2019/11/13
* Time: 1:46 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="common-template">

    <!-- S 背景颜色 -->
    <p class="comment-template__title">背景</p>
    <div class="comment-template__content">
      <div class="comment-template__item">
        <p class="comment-template__leading">颜色:</p>
        <div class="comment-template__inner">
          <ColorPicker :color="config.backgroundColor" />
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
          <a-input type="number" :value="config.border.width" min="0" max="10" />
        </div>
      </div>
      <!-- / 宽度 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">颜色:</p>
        <div class="comment-template__inner">
          <ColorPicker :color="config.border.borderColor" />
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
          <a-input type="number" :value="config.padding[0]" min="0" />
        </div>
      </div>
      <!-- / 上边距 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">右:</p>
        <div class="comment-template__inner">
          <a-input type="number" :value="config.padding[1]" min="0" />
        </div>
      </div>
      <!-- / 右边距 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">下:</p>
        <div class="comment-template__inner">
          <a-input type="number" :value="config.padding[2]" min="0" />
        </div>
      </div>
      <!-- / 下边距 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">左:</p>
        <div class="comment-template__inner">
          <a-input type="number" :value="config.padding[3]" min="0" />
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
          <a-input type="number" :value="config.width" min="0" />
        </div>
      </div>
      <!-- / 宽 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">高:</p>
        <div class="comment-template__inner">
          <a-input type="number" :value="config.height" min="0" />
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
          <a-input type="number" :value="config.left" min="0" />
        </div>
      </div>
      <!-- / x坐标位置 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">Y:</p>
        <div class="comment-template__inner">
          <a-input type="number" :value="config.top" min="0" />
        </div>
      </div>
      <!-- / y坐标位置 -->
    </div>
    <!-- E 位置 -->

  </div>
</template>

<script>
import '@/assets/less/template.less';
import ColorPicker from '@/components/colorPicker/index.vue';
import CommonConfig from '@/model/config/commonConfig';

export default {
  name: 'CommonTemplate',
  props: {
    config: {
      type: Object,
      default: () => (new CommonConfig()),
    },
  },
  components: {
    ColorPicker,
  },
};
</script>

<style scoped>
.common-template {
  height: calc(100vh - 224px);
  overflow: auto;
}
</style>
