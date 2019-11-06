import TextElement from '../element/TextElement';

export default class ElementFactory {
  create(type) {
    switch (type) {
      case 'text':
        return new TextElement();
      default:
        return null;
    }
  }
}
