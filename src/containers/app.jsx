import React from 'react';
import FontAwesome from 'react-fontawesome';

import Sidebar from 'react-sidebar';

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    params: React.PropTypes.object
  }

  render() {

    let sidebarContent = (
      <div>
        <h2>Skinner</h2>
        <h3>Design</h3>
        <ul>
          <li><FontAwesome name='th' />Flow</li>
          <li className="selected"><FontAwesome name='tags' />Dimensions</li>
          <li><FontAwesome name='question-circle' />Questions</li>
          <li><FontAwesome name='star' />Customize</li>
          <li><FontAwesome name='cog' />Settings</li>
        </ul>
        <h3>Results</h3>
        <ul>
          <li><FontAwesome name='table' />View Data</li>
          <li><FontAwesome name='area-chart' />Analyze</li>
          <li><FontAwesome name='download' />Export</li>
        </ul>
      </div>
    );
    return (
      <Sidebar sidebar={sidebarContent}
               sidebarClassName="sidebar"
               open
               shadow={false}>
        {this.props.children}
      </Sidebar>
    );
  }
}
