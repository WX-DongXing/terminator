/**
* 渐变颜色选择器
* Author: dong xing
* Date: 2020/3/9
* Time: 23:37
* Email: dong.xing@outlook.com
*/
<template>
  <div class="linear-color-picker">
    <div
      class="linear-color-picker__bar"
      :style="{
        background: `linear-gradient(${color.angle || 180}deg, ${color.start}, ${color.end})`
      }">
    </div>
    <div class="linear-color-picker__angle" v-if="showAngle">
      <a-slider vertical :min="0" :max="360" v-model="color.angle" @change="colorChange" />
    </div>
    <div class="linear-color-picker__selectors">
      <ColorPicker v-model="color.start" @change="colorChange" />
      <ColorPicker v-model="color.end" @change="colorChange" />
    </div>
  </div>
</template>

<script>
import ColorPicker from '@/components/ColorPicker'

export default {
  name: 'LinearColorPicker',
  components: {
    ColorPicker
  },
  props: {
    color: {
      type: Object,
      default: () => ({
        start: 'rgba(255,255,255,1)',
        end: 'rgba(0,0,0,1)',
        angle: 180
      })
    },
    showAngle: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'color',
    event: 'change'
  },
  methods: {
    colorChange () {
      this.$emit('change', this.color)
    }
  }
}
</script>

<style scoped lang="less">
.linear-color-picker {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  &__bar {
    flex: none;
    width: 22px;
    height: 72px;
    margin-right: 12px;
  }

  &__angle {
    flex: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 72px;
    width: 20px;
    margin-right: 12px;
  }

  &__selectors {
    width: 100%;
    height: 76px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: stretch;
  }
}
</style>
