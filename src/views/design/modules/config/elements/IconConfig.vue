/**
* 图标配置
* Author: dong xing
* Date: 2020/3/26
* Time: 14:24
* Email: dong.xing@outlook.com
*/
<template>
  <div class="icon-config">
    <a-tabs
      defaultActiveKey="1"
      tabPosition="top"
      :style="{ height: '100%'}"
    >
      <a-tab-pane tab="公共属性" key="1">

        <!-- S 公共配置模板 -->
        <CommonTemplate />
        <!-- E 公共配置模板 -->

      </a-tab-pane>

      <a-tab-pane tab="专有属性" key="2">
        <div class="icon-config__template">
          <a-collapse :defaultActiveKey="[1,2]" :bordered="false">

            <!-- S 样式 -->
            <a-collapse-panel header="样式" key="1">

              <div class="comment-template__item">
                <p class="comment-template__leading">颜色:</p>
                <div class="comment-template__inner">
                  <ColorPicker
                    v-model="config.proprietaryConfig.color"
                    @change="change" />
                </div>
              </div>
              <!-- / 颜色 -->

              <div class="comment-template__item">
                <p class="comment-template__leading">大小:</p>
                <div class="comment-template__inner">
                  <a-slider
                    :min="0"
                    :max="200"
                    @change="change"
                    v-model.number="config.proprietaryConfig.fontSize" />
                </div>
              </div>
              <!-- / 大小 -->

            </a-collapse-panel>
            <!-- E 样式 -->

            <!-- S 图标 -->
            <a-collapse-panel header="图标" key="2">

              <div class="comment-template__item">
                <p class="comment-template__leading">主题:</p>
                <div class="comment-template__inner comment-template__end">
                  <a-radio-group
                    buttonStyle="solid"
                    v-model="config.proprietaryConfig.option.theme"
                    @change="change">
                    <a-radio-button value="outlined">描线</a-radio-button>
                    <a-radio-button value="filled">实心</a-radio-button>
                    <a-radio-button value="twoTone">双色</a-radio-button>
                  </a-radio-group>
                </div>
              </div>
              <!-- / 主题 -->

              <div class="comment-template__item">
                <p class="comment-template__leading">动画:</p>
                <div class="comment-template__inner comment-template__end">
                  <a-switch
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    v-model="config.proprietaryConfig.option.spin"
                    @change="animationChange" />
                </div>
              </div>
              <!-- / 动画 -->

              <div class="comment-template__item" v-if="!config.proprietaryConfig.option.spin">
                <p class="comment-template__leading">旋转:</p>
                <div class="comment-template__inner">
                  <a-slider
                    v-model="config.proprietaryConfig.option.rotate"
                    :min="0"
                    :max="360"
                    @change="rotateChange"/>
                </div>
              </div>
              <!-- / 旋转 -->

              <div class="icon-config__icons">
                <a-pagination
                  class="icon-config__pagination"
                  size="small"
                  v-model="current"
                  :pageSize="65"
                  :total="icons.length"
                  showLessItems />

                <div class="icon-config__icon">
                  <div
                    class="icon-config__picker"
                    v-for="(icon, index) of currentIcons"
                    :key="index"
                    @click="iconPicker(icon)"
                    :class="[config.proprietaryConfig.option.type === icon
                      ? 'icon-config__picker icon-config__picker--active'
                      : 'icon-config__picker']">
                    <a-icon :type="icon" />
                  </div>
                </div>

              </div>
              <!-- / 图标选择 -->

            </a-collapse-panel>
            <!-- E 图标 -->

          </a-collapse>
        </div>
      </a-tab-pane>

    </a-tabs>
  </div>
</template>

<script>
import '@/assets/less/template.less'
import CommonTemplate from '../common/index'
import ProprietaryMixins from '../proprietaryMixins'
import ColorPicker from '@/components/ColorPicker'
import { ICONS } from '@/components/Elements'

export default {
  name: 'IconConfig',
  mixins: [ProprietaryMixins],
  components: {
    CommonTemplate,
    ColorPicker
  },
  data: () => ({
    icons: ICONS,
    current: 1,
    rotate: 0
  }),
  computed: {
    // 当前页面的图标
    currentIcons () {
      return ICONS.slice((this.current - 1) * 65, this.current * 65)
    }
  },
  methods: {
    rotateChange () {
      // 记录更改后的角度
      this.rotate = this.config.proprietaryConfig.option.rotate
      this.change()
    },
    animationChange () {
      Object.assign(this.config.proprietaryConfig.option, {
        rotate: this.config.proprietaryConfig.option.spin ? 0 : this.rotate
      })
      this.change()
    },
    /**
     * 图标选择
     * @param type
     */
    iconPicker (type) {
      Object.assign(this.config.proprietaryConfig.option, { type })
      this.change()
    }
  }
}
</script>

<style scoped lang="less">
.icon-config {

  &__icons {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;
  }

  &__pagination {
    margin-bottom: 12px;
  }

  &__icon {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;
  }

  &__picker {
    width: 50px;
    height: 50px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 4px;

    &--active {
      background: #1890ff;

      i {
        color: white;
      }
    }

    &:hover {
      background: #1890ff;

      i {
        color: white;
      }
    }

    i {
      font-size: 32px;
      transition: all 0.3s;
    }
  }
}
</style>
