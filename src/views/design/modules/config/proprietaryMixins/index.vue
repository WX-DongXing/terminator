/**
* 专有属性配置及更新
* Author: dong xing
* Date: 2020/3/20
* Time: 10:12
* Email: dong.xing@outlook.com
*/

<script>
import _ from 'lodash'
import { mapState, mapMutations } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'

export default {
  name: 'ProprietaryMixins',
  computed: {
    ...mapState('screen', [
      'activeWidget',
      'topologyEditable',
      'activeNode',
      'activeEdge',
      'edgeConfig'
    ]),
    config () {
      return _.cloneDeep(this.activeWidget.config)
    }
  },
  methods: {
    ...mapMutations('screen', {
      activateWidget: ScreenMutations.ACTIVATE_WIDGET,
      removeWidget: ScreenMutations.REMOVE_WIDGET
    }),
    change () {
      const activeWidget = _.cloneDeep(this.activeWidget)
      const { render } = this.activeWidget
      Object.assign(activeWidget.config, this.config)
      this.activateWidget({
        widget: Object.assign(activeWidget, { render })
      })
      this.$nextTick(() => {
        render.mergeOption(this.config)
      })
    }
  }
}
</script>
