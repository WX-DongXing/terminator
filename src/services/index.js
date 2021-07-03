import request from '@/plugins/request'

const API = {
  APPS: '/apps'
}

/**
 * 获取应用
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getApps = (params) => request.get(API.APPS, { params })

/**
 * 保存应用
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
const saveApp = (data) => request.post(API.APPS, data)

/**
 * 更新应用
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
const updateApp = (id) => request.put(`${API.APPS}/${id}`)

/**
 * 移除应用
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
const removeApp = (id) => request.delete(`${API.APPS}/${id}`)

export {
  getApps,
  saveApp,
  updateApp,
  removeApp
}
