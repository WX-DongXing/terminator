/**
* 单一颜色选择器
* Author: dong xing
* Date: 2019/11/26
* Time: 5:48 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="single-color-selector">
    <div class="comment-template__item">
      <div class="comment-template__inner single-color-selector__picker">
        <ColorPicker v-model="color" />
        <a-button
          ghost
          type="primary"
          shape="circle"
          icon="plus"
          @click="addColor" />
      </div>
    </div>
    <div class="single-color-selector__list">
      <div
        class="single-color-selector__item"
        v-for="(color, index) in colors"
        :key="index"
        :style="{ background: color}">
        <a-icon type="close-circle" @click="removeColor(index)" />
      </div>
      <p v-if="colors.length === 0">请添加颜色</p>
    </div>
  </div>

</template>

<script>
import '@/assets/less/template.less'
import ColorPicker from '@/components/colorPicker/index.vue'

export default {
  name: 'SingleColorSelector',
  components: {
    ColorPicker
  },
  props: {
    colors: {
      type: Array,
      default: () => ([])
    }
  },
  model: {
    prop: 'colors',
    event: 'change'
  },
  data: () => ({
    color: 'rgba(255,255,255,1)'
  }),
  methods: {
    addColor () {
      const { length } = this.colors
      if (length >= 11) {
        this.colors.shift()
      }
      this.colors.push(this.color)
      this.$emit('change', this.colors)
    },
    removeColor (index) {
      this.colors.splice(index, 1)
      this.$emit('change', this.colors)
    }
  }
}
</script>

<style scoped lang="less">
.single-color-selector {
  &__list {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    p {
      margin: 0;
    }
  }

  &__picker {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    button.ant-btn {
      flex: none;
      margin-left: 12px;
    }
  }

  &__item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    margin-right: 3px;
    cursor: pointer;

    i {
      display: none;
      color: white;
    }

    &:hover i {
      display: block;
    }
  }
}
</style>
