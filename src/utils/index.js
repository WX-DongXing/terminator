/**
* 工具方法
* Author: dong xing
* Date: 2020/3/11
* Time: 19:33
* Email: dong.xing@outlook.com
*/

/**
 * 下载文件
 * @param fileName 文件名
 * @param content 文本内容
 */
function downloadFile (fileName, content) {
  const link = document.createElement('a')
  const blob = new Blob([content])
  link.download = fileName
  link.href = URL.createObjectURL(blob)
  const event = document.createEvent('MouseEvents')
  event.initMouseEvent('click', true, true)
  link.dispatchEvent(event)
}

export { downloadFile }
