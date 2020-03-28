/**
* 配置模板
* Author: dong xing
* Date: 2019/11/13
* Time: 1:44 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="config">
    <div class="config__header">
      <p>窗口配置</p>
    </div>
    <div class="config__content">
      <div class="comment-template" v-if="activeWidget">
        <div class="comment-template__header" v-if="hasCommonTitle">
          <p class="comment-template__name">{{ templateName }}</p>
          <a-popconfirm
            title="从视图中删除该部件?"
            placement="left"
            @confirm="() => removeWidget({ widgetId: activeWidget.widgetId })"
            okText="确定"
            cancelText="取消"
          >
            <a-button shape="circle" type="danger" icon="delete" />
          </a-popconfirm>
        </div>
        <component :is="templateComponentName" />
      </div>
      <div class="config__none" v-else>
        <a-icon type="disconnect" />
        <p>无激活窗口配置</p>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/less/template.less'
import { mapState, mapMutations } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import CONFIGCOMPONENTS from './configComponents'
import TEMPLATES from '../template/templates'

export default {
  name: 'Config',
  components: {
    ...CONFIGCOMPONENTS
  },
  data: () => ({
    // todo 之后更改命名，使其更加语义化: ['line', 'LineConfig']
    templateMapping: new Map([
      ['Bar', 'Bar'],
      ['Lines', 'Lines'],
      ['Texts', 'Texts'],
      ['Rect', 'Rects'],
      ['Circle', 'CircleConfig'],
      ['Triangle', 'TriangleConfig'],
      ['Topology', 'Topology'],
      ['Image', 'ImageConfig'],
      ['Icon', 'IconConfig'],
      ['DateTime', 'DateTimeConfig'],
      ['View', 'ViewConfig']
    ])
  }),
  computed: {
    ...mapState('screen', ['activeWidget']),
    templateName () {
      const template = TEMPLATES.find(template => template.type === this.activeWidget.config.type)
      return template ? template.name : '画板'
    },
    hasCommonTitle () {
      return this.activeWidget.config.type !== 'Topology'
    },
    templateComponentName () {
      return this.templateMapping.get(this.activeWidget.config.type)
    }
  },
  methods: {
    ...mapMutations('screen', {
      removeWidget: ScreenMutations.REMOVE_WIDGET
    })
  }
}
</script>

<style scoped lang="less">
.config {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-content: stretch;
  width: 320px;
  height: 100%;

  &__header {
    flex: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    box-sizing: border-box;
    padding: 0 16px;
    box-shadow: 0 2px 8px #f0f1f2;
    z-index: 3;

    p {
      flex: none;
      margin: 0;
    }
  }

  &__content {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 100%;
    box-shadow: -4px 8px 8px 0 rgba(0, 0, 0, 0.12);
    z-index: 2;
  }

  &__none {
    width: 100%;
    text-align: center;

    i {
      color: rgba(0, 0, 0, .56);
      font-size: 36px;
      margin-bottom: 16px;
    }
  }
}
</style>
