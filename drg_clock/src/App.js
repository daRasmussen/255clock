import './App.css';
import React from 'react';

class App extends React.Component {

  static countDownHolder = null;

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
        session: 10,
      },
      start_stop: false,
      time: '00:00',
    }
    this.start_stop = this.start_stop.bind(this);
    this.reset = this.reset.bind(this);
    this.up_and_down = this.up_and_down.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  countDown() {
    let { state : { time }} = this;

    const re = /(\d+):(\d+)/i
    const fullTime = time.match(re)
    let minutes = parseInt(fullTime[1])
    let seconds = parseInt(fullTime[2])

    App.countDownHolder = setInterval(function() {
        if(seconds === 0 || seconds === -60) {
          seconds = 0;
          minutes -= 1;
        }
        seconds--;
        update(minutes, seconds);
    }, 1000);

    const update = (minutes, seconds) => {
      const positive = 60 + seconds;
      if(positive === 0 || positive === 60) {
          seconds = '00';
      } else if (positive > 0 && positive < 10) {
         seconds = '0' + positive;
      } else if (positive > 9 && positive < 60) {
        seconds = positive;
      }

      if(minutes < 10) {
        minutes = '0' + minutes;
      }

      this.setState({
        time: minutes + ':' + seconds
      })
    }

  }

  removeCount() {
    clearInterval(App.countDownHolder)
  }

  start_stop(e) {
    let { target: { innerText }} = e;
    if(innerText === 'Start') {
      e.target.innerHTML = 'Pause'
      this.countDown();
    } else {
      // stop clock
      e.target.innerHTML = 'Start'
      this.removeCount();
    }
  }

  reset() {
    const { state: { length: { session }}} = this;
    this.setState({
      time: session + ':00',
    });
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
