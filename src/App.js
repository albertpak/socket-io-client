import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: 'http://localhost:4001'
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    console.log('socket', socket);

    socket.on(
      "FromAPI", data => {
        let dataC = Math.floor((data * (9 / 5) - 459.67), 2);
        this.setState({ response: dataC });
      }
    );
  }

  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
            The temperature in Miami, FL is: {response} °F
            </p>
          : <p>Loading...</p>}
      </div>
    );
  }
}

export default App;
