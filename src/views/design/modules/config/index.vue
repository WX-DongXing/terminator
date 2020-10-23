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
      ['View', 'ViewConfig'],
      ['Pie', 'PieConfig']
    ])
  }),
  computed: {
    ...mapState('screen', ['activeWidget']),
    // 配置面板名称
    templateName () {
      return TEMPLATES.find(template => template.type === this.activeWidget.config.type).name
    },
    // 使用公共标题
    hasCommonTitle () {
      // 不使用公共标题的配置面板
      const notUseTileList = ['View', 'Topology']
      return !notUseTileList.includes(this.activeWidget.config.type)
    },
    // 配置面板组件名
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
  width: 100%;
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
    /*border-bottom: 1px solid rgba(0, 0, 0, 0.12);*/
    z-index: 3;

    p {
      flex: none;
      margin: 0;
      font-weight: bold;
    }
  }

  &__content {
    position: relative;
    height: 100%;
    box-shadow: -4px 8px 8px 0 rgba(0, 0, 0, 0.12);
    z-index: 2;
  }

  &__none {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;

    i {
      color: rgba(0, 0, 0, .56);
      font-size: 36px;
      margin-bottom: 16px;
    }
  }
}
</style>
