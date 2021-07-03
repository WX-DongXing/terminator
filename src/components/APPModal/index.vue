<template>
  <a-modal
    class="app-modal"
    title="应用列表"
    v-model="visible"
    :width="720"
    :footer="null"
  >
    <a-table :columns="columns" :data-source="apps" size="small" :loading="loading" rowKey="id">
      <span slot="published" slot-scope="text">{{ text | dateFilter }}</span>
      <span slot="updated" slot-scope="text">{{ text | dateFilter }}</span>
      <span slot="action" slot-scope="text, record">
        <a-popconfirm
          title="确认移除该应用？"
          ok-text="是"
          cancel-text="否"
          @confirm="handleRemove(record)"
        >
          <a style="color: red">移除</a>
        </a-popconfirm>
        <a-divider type="vertical" />
        <a @click="handleOpen(record)">打开</a>
      </span>
    </a-table>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapMutations } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import WidgetModel from '@/model/widget'
import View from '@/model/view'
import { getApps, removeApp } from '@/services'

export default {
  name: 'APPModal',
  props: {},
  data () {
    return {
      visible: false,
      loading: false,
      apps: [],
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '创建时间',
          dataIndex: 'published_at',
          key: 'published_at',
          scopedSlots: { customRender: 'published' }
        },
        {
          title: '修改时间',
          dataIndex: 'updated_at',
          key: 'updated_at',
          scopedSlots: { customRender: 'updated' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  filters: {
    dateFilter (date) {
      return moment(date).format('YYYY-MM-DD h:mm:ss')
    }
  },
  computed: {
    ...mapGetters('screen', [
      'visitorId'
    ])
  },
  methods: {
    ...mapMutations('screen', {
      setView: ScreenMutations.SET_VIEW
    }),
    open () {
      this.visible = true
    },
    /**
     * 获取应用列表
     */
    async getAppList () {
      try {
        this.loading = true
        const { visitorId } = this
        const { data } = await getApps({ visitorId })
        this.apps = data
      } catch (e) {
        this.$message.error(e)
      } finally {
        this.loading = false
      }
    },
    /**
     * 移除应用
     * @param id
     * @returns {Promise<void>}
     */
    async handleRemove ({ id }) {
      try {
        await removeApp(id)
        this.$message.success('已删除！')
        await this.getAppList()
      } catch (e) {
        this.$message.error(e)
      }
    },
    /**
     * 打开应用
     * @param record
     */
    handleOpen ({ setting }) {
      this.visible = false
      setting.widgets = setting.widgets.map(config => new WidgetModel(config))
      this.setView({ view: new View(setting) })
    }
  },
  watch: {
    visible: {
      async handler (val) {
        val && await this.getAppList()
      }
    }
  }
}
</script>

<style scoped>

</style>
