<template>
  <div class="icon-picker">
    <div class="comment-template__item" :class="{ 'icon-picker__clear': !icon.show}">
      <p class="comment-template__leading" v-if="icon.show">显示</p>
      <div class="comment-template__inner comment-template__end">
        <a-switch
          checkedChildren="显示"
          unCheckedChildren="不显示"
          v-model="icon.show"
          @change="change" />
      </div>
    </div>
    <!-- / 显示 -->

    <div v-if="icon.show">

      <div class="comment-template__item">
        <p class="comment-template__leading">宽:</p>
        <div class="comment-template__inner topology-config__editable">
          <a-input
            type="number"
            v-model.number="icon.width"
            min="0"
            @change="change" />
        </div>
      </div>
      <!-- / 宽 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">高:</p>
        <div class="comment-template__inner topology-config__editable">
          <a-input
            type="number"
            v-model.number="icon.height"
            min="0"
            @change="change" />
        </div>
      </div>
      <!-- / 高 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">位置:</p>
        <div class="comment-template__inner comment-template__end">
          <a-select
            v-model="icon.position"
            @change="change">
            <a-select-option value="inside">内置</a-select-option>
            <a-select-option value="custom">自定义</a-select-option>
          </a-select>
        </div>
      </div>
      <!-- / 位置 -->

      <div class="comment-template__item" v-if="icon.position === 'inside'" :class="{ 'icon-picker__clear': icon.position === 'inside'}">
        <div class="comment-template__inner icon-picker__list">
          <div
            class="icon-picker__icon"
            v-for="(item, index) of icons"
            :key="index"
            @click="iconChoose(index)"
          >
            <img :src="item.img" :class="{'active': icon.name === item.name}" alt="">
          </div>
        </div>
      </div>
      <!-- / 内置图标 -->

      <div class="comment-template__item icon-picker__clear" v-else>
        <p class="comment-template__leading">自定义:</p>
        <div class="comment-template__inner comment-template__end">
          <a-textarea v-model.trim="icon.img" @change="$emit('change')" />
        </div>
      </div>
      <!-- / 自定义图标 -->

    </div>

  </div>
</template>

<script>
import '@/assets/less/template.less'
import Host from '@/assets/icons/host.svg'
import Network from '@/assets/icons/network.svg'

export default {
  name: 'IconPicker',
  props: {
    icon: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    icons: [
      { name: 'network', img: Network },
      { name: 'host', img: Host }
    ]
  }),
  methods: {
    /**
     * 内置图标选择
     * @param index
     */
    iconChoose (index) {
      Object.assign(this.icon, this.icons[index])
      this.$emit('change')
    },
    change () {
      if (this.icon.show) {
        if (this.icon.position === 'inside') {
          const icon = this.icons.find(icon => icon.name === this.icon.name)
          Object.assign(this.icon, icon)
        }
      }
      this.$emit('change', this.icon)
    }
  }
}
</script>

<style scoped lang="less">
.icon-picker {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;

  &__list {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }

  &__icon > img{
    flex: none;
    width: 24px;
    height: 24px;
    margin: 0 6px 6px 0;
    border-radius: 4px;
    border: 1px solid transparent;
    cursor: pointer;

    &.active {
      border-color: #1890ff;
    }
  }

  &__clear {
    margin: 0;
  }
}
</style>
