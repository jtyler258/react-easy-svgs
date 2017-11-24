**react**-**easy**-**svgs** is a react component that facilitates rendering inline svgs from a single json file.

### Installing

```
$ npm install react-easy-svgs
```

### Using

# icon.js
```
import React, { PureComponent } from 'react';
import IconJSON from './icons.json';
import createSvgFromSet from 'react-easy-svgs';
const Svg = createSvgFromSet(IconJSON);

export default class Icon extends PureComponent {
  render() {
    return (
      <Svg {...this.props} />
    )
  }
}
```

# myComponent.js
```
import React, { Component } from 'react';
import Icon from './icon.js';

export default class MyComponent extends Component {
  render() {
    return (
      <Icon name='left-arrow' color='red' width='54' height='54' />
    )
  }
}
```

### Props

- **color**: sets fill color for all paths in svg
- **width**: width of svg
- **height**: height of svg
- ...any other svg-compatible attributes

### Creating an SVG JSON file

> It is recommended to use [svgson](https://github.com/elrumordelaluz/svgson) to generate a JSON file from a directory of SVGs
- Install **svgson** globally
  ```
  $ npm install -g svgson
  ```


- `input` **/svgs** folder | `output` **icons.json** file

  ```
  $ svgson --input svgs --output icons.json -t
  ```
