<template>
  <div class="linear-color-selector">
    <div class="linear-color-selector__wrapper">
      <div class="linear-color-selector__bar" :style="{
        background: `linear-gradient(180deg, ${start}, ${end})`
      }">
      </div>
      <div class="linear-color-selector__pickers">
        <ColorPicker v-model="start" />
        <ColorPicker v-model="end" />
      </div>
      <a-button
        ghost
        type="primary"
        shape="circle"
        icon="plus"
        @click="addColor" />
    </div>
    <div class="linear-color-selector__colors">
      <div class="linear-color-selector__item"
           v-for="(color, index) in colors"
           :key="index"
           :style="{ background: `linear-gradient(180deg, ${color.start}, ${color.end})`}">
        <a-icon type="close-circle" @click="removeColor(index)" />
      </div>
      <p v-if="colors.length === 0">请添加颜色</p>
    </div>
  </div>
</template>

<script>
import ColorPicker from '@/components/colorPicker/index.vue';

export default {
  name: 'LinearColorSelector',
  components: {
    ColorPicker,
  },
  props: {
    colors: {
      type: Array,
      default: () => ([]),
    },
  },
  model: {
    prop: 'colors',
    event: 'change',
  },
  data: () => ({
    start: 'rgba(255,255,255,1)',
    end: 'rgba(0,0,0,1)',
  }),
  methods: {
    addColor() {
      const { start, end } = this;
      const { length } = this.colors;
      if (length >= 11) {
        this.colors.shift();
      }
      this.colors.push({ start, end });
      this.$emit('change', this.colors);
    },
    removeColor(index) {
      this.colors.splice(index, 1);
      this.$emit('change', this.colors);
    },
  },
};
</script>

<style scoped lang="less">
.linear-color-selector {
  &__wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    & .ant-btn {
      flex: none;
      margin-left: 12px;
    }
  }

  &__bar {
    flex: none;
    width: 22px;
    height: 72px;
    margin-right: 12px;
  }

  &__pickers {
    width: 100%;
    height: 76px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: stretch;
  }

  &__colors {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    p {
      margin: 0;
    }
  }

  &__item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 72px;
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
