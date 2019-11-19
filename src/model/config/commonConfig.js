/**
 * 边框类型
 */
class BorderTypeOption {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

/**
 * 边框
 */
class Border {
  constructor({
    type, color, width,
  }) {
    this.type = type;
    this.typeOptions = [
      new BorderTypeOption('无边框', 'none'),
      new BorderTypeOption('直线', 'solid'),
    ];
    this.color = color;
    this.width = width;
  }
}

/**
 * 通用配置
 */
export default class CommonConfig {
  constructor({
    width, height, top, left, zIndex, border,
    padding, backgroundColor,
  }) {
    this.width = width || 0;
    this.height = height || 0;
    this.top = top || 0;
    this.left = left || 0;
    this.zIndex = zIndex;
    this.backgroundColor = backgroundColor || 'rgba(255,255,255,1)';
    this.border = new Border(border || {
      type: 'none',
      color: 'rgba(0,0,0,1)',
      width: 1,
      typeOptions: [
        new BorderTypeOption('无边框', 'none'),
        new BorderTypeOption('直线', 'solid'),
      ],
    });
    this.padding = padding || [0, 0, 0, 0];
  }
}
