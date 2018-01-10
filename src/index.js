import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const createSvgFromSet = (iconFile) => {
  class Svg extends PureComponent {
    _shouldApplyFillAttr(attrs) {
      return attrs.hasOwnProperty('fill') && attrs.fill != 'none';
    }

    _renderChildren(children) {
      if (children) {
        return children.map(c => {
          if (c.name === 'g') {
            let attrs = Object.assign({}, c.attrs);
            if (this.props.color && this._shouldApplyFillAttr(attrs)) {
              attrs = Object.assign(attrs, {fill: this.props.color});
            }

            return (
              <g {...attrs} key={this.currentKey++}>
                {this._renderChildren(c.childs, this.currentKey++)}
              </g>
            )
          } else if (c.name === 'defs') {
            return (
              <defs {...c.attrs} key={this.currentKey++}>
                {this._renderChildren(c.childs, this.currentKey++)}
              </defs>
            )
          } else if (c.name === 'linearGradient') {
            return (
              <linearGradient {...c.attrs} key={this.currentKey++}>
                {this._renderChildren(c.childs, this.currentKey++)}
              </linearGradient>
            )
          } else if (c.name === 'stop') {
            return (
              <stop {...c.attrs} key={this.currentKey++}></stop>
            )
          } else if (c.name == 'mask') {
            return (
              <mask {...c.attrs} key={this.currentKey++}>
                {this._renderChildren(c.childs, this.currentKey++)}
              </mask>
            )
          } else if (c.name == 'use') {
            return (
              <use {...c.attrs} key={this.currentKey++}></use>
            )
          } else if (c.name === 'polygon') {
            let attrs = Object.assign({}, c.attrs);
            if (this.props.color && this._shouldApplyFillAttr(attrs)) {
              attrs = Object.assign(attrs, { fill: this.props.color })
            }

            return (
              <polygon {...attrs} key={this.currentKey++}>
                {this._renderChildren(c.childs, this.currentKey++)}
              </polygon>
            )
          } else if (c.name === 'circle') {
            return <circle {...c.attrs} key={this.currentKey++}></circle>
          } else if (c.name === 'rect') {
            return <rect {...c.attrs} key={this.currentKey++}></rect>
          } else if (c.name === 'ellipse') {
            return <ellipse {...c.attrs} key={this.currentKey++}></ellipse>
          } else if (c.name === 'path') {
            let attrs = Object.assign({}, c.attrs);
            if (this.props.color && this._shouldApplyFillAttr(attrs)) {
              attrs = Object.assign(attrs, {fill: this.props.color});
            }

            return (
              <path {...attrs} key={this.currentKey++}>
                {this._renderChildren(c.childs, this.currentKey++)}
              </path>
            )
          } else if (c.name == 'ellipse') {
            return (
              <ellipse {...c.attrs} key={this.currentKey++} />
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
