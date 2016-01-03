import React              from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor         from 'redux-devtools-log-monitor';
import DockMonitor        from 'redux-devtools-dock-monitor';
import parseKey           from 'parse-key';

export const Tools = createDevTools(
  <DockMonitor defaultPosition="right"
               toggleVisibilityKey="H"
               changePositionKey="Q">
    <LogMonitor />
  </DockMonitor>
);

export default class DevTools extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initiated: false
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  matchesKey(key, event) {
    const charCode = event.keyCode || event.which;
    const char = String.fromCharCode(charCode);
    return key.name.toUpperCase() === char.toUpperCase() &&
      key.alt === event.altKey &&
      key.ctrl === event.ctrlKey &&
      key.meta === event.metaKey &&
      key.shift === event.shiftKey;
  }

  handleKeyDown = (e) => {
    if (!this.state.initiated) {
      const visibilityKey = parseKey('ctrl-H');

      if (this.matchesKey(visibilityKey, e)) {
        e.preventDefault();
        this.setState({ initiated: true });
      }
    }
  }

  render() {
    if (this.state.initiated) {
      return (<Tools />);
    }

    return (
      <div></div>
    );
  }
}
