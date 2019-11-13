/**
 * 标题
 */
class Title {
  constructor({ show, text, link }) {
    // 是否显示标题
    this.show = show;
    // 标题内容
    this.text = text;
    // 标题链接
    this.link = link;
  }
}

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
    borderType, borderColor, borderWidth, borderRadius,
  }) {
    this.borderType = borderType;
    this.borderTypeOptions = [
      new BorderTypeOption('无边框', 'none'),
      new BorderTypeOption('直线', 'solid'),
    ];
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
    this.borderRadius = borderRadius;
  }
}

// 背景
class Background {
  constructor({ backgroundColor, backgroundOpacity }) {
    this.backgroundColor = backgroundColor;
    this.backgroundOpacity = backgroundOpacity;
  }
}

/**
 * 通用配置
 */
export default class CommonConfig {
  constructor({
    title, border, width, height, x, y, padding,
    background,
  }) {
    this.width = width || 0;
    this.height = height || 0;
    this.x = x || 0;
    this.y = y || 0;
    this.title = new Title(title || { show: false, title: '', link: '' });
    this.border = new Border(border || {
      borderType: 'none',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 0,
      borderTypeOptions: [
        new BorderTypeOption('无边框', 'none'),
        new BorderTypeOption('直线', 'solid'),
      ],
    });
    this.background = new Background(background || {
      backgroundColor: 'transparent',
      backgroundOpacity: 0,
    });
    this.padding = padding || [0, 0, 0, 0];
  }
}
