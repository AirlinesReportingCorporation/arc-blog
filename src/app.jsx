'use strict';

const e = React.createElement;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return (
      'h1',
      'Hello World'
    );
  }
}

const domContainer = document.querySelector('#app');
const root = ReactDOM.createRoot(domContainer);
root.render(e(App));