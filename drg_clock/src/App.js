import './App.css';
import React from 'react';

class App extends React.Component {

  static countDownHolder = null;
  static constraints = {
    length:[
      {
        operator: '<=',
        right: '0'
      },
      {
        operator: '>',
        right: '60'
      }
    ]
  }

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
      start_stop: false,
      active: 'Session',
      inActive: 'Break',
      time: '25:00',
      seconds: 0,
      minutes: 0
    }
    this.start_stop = this.start_stop.bind(this);
    this.reset = this.reset.bind(this);
    this.up_and_down = this.up_and_down.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  getTime() {
    let { state : { time }} = this;

    const re = /(\d+):(\d+)/i
    const fullTime = time.match(re)
    let minutes = parseInt(fullTime[1])
    let seconds = parseInt(fullTime[2])
    return {
      minutes,
      seconds
    }
  }

  countDown() {
    let { minutes, seconds } = this.getTime();
    App.countDownHolder = setInterval(function() {
        if(seconds === 0 || seconds === -60) {
          seconds = 0;
          minutes -= 1;
          if (minutes <= 0) {
            minutes = 0;
          }
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
        time: minutes + ':' + seconds,
      })
    }

  }

  removeCount() {
    clearInterval(App.countDownHolder)
  }

  start_stop(e) {
    let { target: { innerText }} = e;
    if(innerText === 'Start') {
      e.target.innerHTML = 'Stop'
      this.countDown();
    } else {
      // stop clock
      e.target.innerHTML = 'Start'
      this.removeCount();
    }
  }

  reset() {
    this.removeCount()
    this.setState({
      length: {
        break: 5,
        session: 25
      },
      time: 25 + ':00',
    });
  }

  validate(value, constraints) {
    const key = Object.keys(value)[0];
    const target = value[key];
    return constraints.some(
        function (o) {
          let left = `${'left' in o && key !== 'left' ? o.left : key === 'left' ? target : 'left'}`.trim()
          let mid =   `${o.operator && key !== 'operator' ? o.operator : key === 'operator' ? target : ''}`.trim()
          let right = `${'right' in o && key !== 'right'? o.right : key === 'right' ? target : 'right'}`.trim()
          // eslint-disable-next-line no-eval
          return eval(left + mid + right)
        }
    )
  }

  up_and_down(e) {
    const { target: { id }} = e;
    const re = /(break|session)-(decrement|increment)/;
    const type = id.match(re)[1];
    const action = id.match(re)[2]

    const length = {};
    const second = Object.keys(this.state.length).filter(key => key !== type)[0];
    length[second] = this.state.length[second];
    const value = parseInt(this.state.length[type], 10) + parseInt(this.state[action][type], 10);
    length[type] = value;

    const inValid = this.validate({left: value}, App.constraints['length'])
    if(inValid) {
      length[type] = 1;
    }

    const time = `${length['session']}:00`

    this.setState({
       length,
        time
    });
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
            <div id="timer-label">{this.state.active}</div>
            <div id="time-left">{this.state.time}</div>
            <div className="Knappar">
              <button id="start_stop" onClick={this.start_stop}> Start </button>
              <button id="pause" onClick={this.pause}> Pause </button>
              <button id="reset" onClick={this.reset} > Reset </button>
            </div>
            <code>drGeo</code>
          </header>
        </div>
    );
  }
}

export default App;
