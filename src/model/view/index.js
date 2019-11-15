import Config from '../config';

class Range {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }
}

class View {
  constructor(el, screenWidth, screenHeight, {
    x, y, width, height, top, left, bottom, right,
  }, scale, parent) {
    this.type = 'ViewConfig';
    this.el = el;
    this.x = x;
    this.y = y;
    this.width = screenWidth;
    this.height = screenHeight;
    this.currentWidth = width;
    this.currentHeight = height;
    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
    this.area = {
      xRange: new Range(x, x + screenWidth * scale),
      yRange: new Range(y, y + screenHeight * scale),
    };
    this.scale = scale;
    this.parent = parent;
    this.config = new Config({
      commonConfig: {
        height: this.height,
        width: this.width,
      },
    });
  }
}

class Wrapper {
}

export {
  View,
  Wrapper,
};
