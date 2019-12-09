/**
* 颜色选择器
* Author: dong xing
* Date: 2019/11/18
* Time: 2:46 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="color-picker">
    <div class="color-picker__marker">
      <div class="color-picker__inner" :style="{ background: this.color }"></div>
      <div class="color-picker__trigger" @click="openPicker">
        <a-icon type="bg-colors" />
      </div>
    </div>
    <a-input v-model="inputColor" @change="() => $emit('change', this.inputColor)"/>
    <div
      class="color-picker__painter"
      v-show="display"
      tabindex="-1"
      @blur="display = false"
      ref="picker">
      <Chrome v-model="colors"/>
    </div>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  name: 'ColorPicker',
  components: {
    Chrome
  },
  model: {
    prop: 'color',
    event: 'change'
  },
  props: {
    color: {
      type: String,
      default: 'rgba(255,255,255,1)'
    }
  },
  data: () => ({
    display: false,
    inputColor: 'rgba(255,255,255,1)',
    colors: {}
  }),
  created () {
    this.inputColor = this.color
  },
  methods: {
    openPicker () {
      this.display = true
      this.$nextTick(() => this.$refs.picker.focus())
    }
  },
  watch: {
    colors (v) {
      const {
        r, g, b, a
      } = v.rgba
      this.inputColor = `rgba(${r},${g},${b},${a})`
      this.$emit('change', `rgba(${r},${g},${b},${a})`)
    }
  }
}
</script>

<style scoped lang="less">
.color-picker {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  &__marker {
    position: relative;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    margin-right: 12px;
  }

  &__inner {
    position: absolute;
    top: 0;
    left: 0;
    height: 22px;
    width: 22px;
    cursor: pointer;
    margin: 4px;
    border-radius: 4px;
  }

  &__trigger {
    position: relative;
    flex: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    cursor: pointer;

    i {
      color: white;
    }
  }

  &__painter {
    height: 0;
    overflow: visible;
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 1000;
  }
}
</style>
