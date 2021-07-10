import './App.css';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      decrement: {
        break: -1,
        session: -1,
      },
      increment: {
        break: 1,
        session: 1,
      },
      length: {
        break: 5,
        session: 25,
      },
      reset: false,
      start_stop: false,
      time: '00:00',
    }
    this.start_stop = this.start_stop.bind(this);
    this.reset = this.reset.bind(this);
    this.up_and_down = this.up_and_down.bind(this);
  }

  start_stop(e) {
    const { target: { value }} = e;
    if(value === 'Start') {
      e.target.value = 'Stop';
    } else {
      e.target.value = 'Start';
    }
  }

  reset(e) {
    const { target: { value }} = e;
  }

  up_and_down(e) {
    const { target: { id }} = e;
    const re = /(break|session)-(decrement|increment)/;
    const type = id.match(re)[1];
    const action = id.match(re)[2]
    const length = {};
    const second = Object.keys(this.state.length).filter(key => key !== type)[0];
    length[second] = this.state.length[second];
    length[type] = parseInt(this.state.length[type], 10) + parseInt(this.state[action][type], 10)

    this.setState({
       length
    })
  }

  render() {
    let numberOfBreaks = this.state.length['break'];
    let numberOfSessions = this.state.length['session'];
    return (
        <div className="App">
          <header className="App-header">
            <h1>25 + 5 Clock</h1>
            <div id="break-label">
              Break Length
            </div>
            <div id="break-length">{numberOfBreaks}</div>
            <div className="Knappar">
              <button id="break-decrement" onClick={this.up_and_down}> Decrement </button>
              <button id="break-increment" onClick={this.up_and_down}> Increment </button>
            </div>
            <div id="session-label">
              Session Length
            </div>
            <div id="session-length">{numberOfSessions}</div>
            <div className="Knappar">
              <button id="session-decrement" onClick={this.up_and_down}> Decrement  </button>
              <button id="session-increment" onClick={this.up_and_down}> Increment </button>
            </div>
            <div id="timer-label">Session</div>
            <div id="time-left">{this.state.time}</div>
            <div className="Knappar">
              <button id="start_stop" onClick={this.start_stop}> Start </button>
              <button id="reset" onClick={this.reset} > Rest </button>
            </div>
            <code>drGeo</code>
          </header>
        </div>
    );
  }
}

export default App;
