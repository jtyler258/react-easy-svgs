import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const createSvgFromSet = (iconFile) => {
  class Svg extends PureComponent {
    _shouldApplyFillAttr(attrs) {
      console.log(attrs);
      return attrs.hasOwnProperty('fill') && attrs.fill != 'none';
    }

    _renderChildren(children) {
      if (children) {
        return children.map(c => {
          if (c.name === 'g') {
            return (
              <g {...c.attrs} key={this.currentKey}>
                {this._renderChildren(c.childs, this.currentKey++)}
              </g>
            )
          } else if (c.name === 'polygon') {
            let attrs = Object.assign({}, c.attrs);
            if (this.props.color && this._shouldApplyFillAttr(attrs)) {
              attrs = Object.assign(attrs, { fill: this.props.color })
            }

            return (
              <polygon {...attrs} key={this.currentKey}>
                {this._renderChildren(c.childs, this.currentKey++)}
              </polygon>
            )
          } else if (c.name === 'path') {
            let attrs = Object.assign({}, c.attrs);
            if (this.props.color && this._shouldApplyFillAttr(attrs)) {
              attrs = Object.assign(attrs, {fill: this.props.color});
            }

            return (
              <path {...attrs} key={this.currentKey}>
                {this._renderChildren(c.childs, this.currentKey++)}
              </path>
            )
          }
        })
      }
    }

    render() {
      this.currentKey = 0;
      let iconJSON = iconFile.find(s => s.title === this.props.name);
      let attrs = Object.assign({}, iconJSON.attrs);

      if (this.props.width) {
        attrs = Object.assign(attrs, { width: this.props.width });
      }
      if (this.props.height) {
        attrs = Object.assign(attrs, { height: this.props.height });
      }

      return (
        <svg {...attrs}>
          {this._renderChildren(iconJSON.childs, this.currentKey)}
        </svg>
      )
    }
  }

  return Svg;
}

module.exports = createSvgFromSet;
