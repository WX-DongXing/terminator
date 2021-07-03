import Vue from 'vue'
import {
  Button, Tooltip, Slider, Switch, Icon,
  Input, Tabs, Select, Popconfirm, Collapse,
  Radio, Upload, Pagination, Tag, Dropdown, Menu,
  Drawer, message, Modal, Table, Divider
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Button)
Vue.use(Tooltip)
Vue.use(Slider)
Vue.use(Switch)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(Select)
Vue.use(Popconfirm)
Vue.use(Collapse)
Vue.use(Radio)
Vue.use(Upload)
Vue.use(Pagination)
Vue.use(Tag)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Drawer)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Divider)

Vue.prototype.$message = message
