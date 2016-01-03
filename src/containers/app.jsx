import React from 'react';

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    params: React.PropTypes.object
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
