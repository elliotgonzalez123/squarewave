import React, { Component } from 'react';

import Bass from './bass';
import Tone from 'tone';
let index = 0;
const bassSynth = new Tone.MembraneSynth({
  pitchDecay: 0.05,
  octaves: 10,
  oscillator: {
    type: 'sine'
  },
  envelope: {
    attack: 0.001,
    decay: 0.4,
    sustain: 0.01,
    release: 1.4,
    attackCurve: 'exponential'
  }
}).toMaster();
class StepSequencer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }
  clickHandler = e => {
    if (e.target.className === 'cell') {
      e.target.className = 'cell selected';
    } else if (e.target.className === 'cell selected') {
      e.target.className = 'cell';
    }
  };
  fuck = () => {
    const rows = document.body.querySelectorAll('.row-2');

    Tone.Transport.scheduleRepeat(time => {
      let step = index % 8;
      //console.log(step);
      let notes = ['C1', 'D1', 'D2'];
      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let input = row.querySelector(`.cell:nth-child(${step + 1})`);
        input.style.border = '2px solid white';
      }

      Tone.Draw.schedule(function() {
        for (let i = 0; i < rows.length; i++) {
          let row = rows[i];
          let input = row.querySelector(`.cell:nth-child(${step + 1})`);

          input.style.border = '2px solid violet';
        }
      }, time);

      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let note = notes[i];
        let input = row.querySelector(`.cell:nth-child(${step + 1})`);
        if (input.className === 'cell selected')
          bassSynth.triggerAttackRelease(note, '8n', time);
      }
      index++;
    }, '8n');
  };

  stopSeq = () => {
    // Tone.Transport.cancel();
    index = 0;
    // Tone.Transport.cancel();
  };

  startHandler = () => {
    // this.fuck();
    Tone.Transport.start();
  };

  render() {
    return (
      <div>
        <div>
          <center>
            <img src="SquareWave_Elliot.png" style={{ width: '60%' }} />
          </center>
        </div>
        {/* <button onClick={this.startHandler}>START</button> */}
        {/* <button onClick={this.stopHandler}>STOP</button> */}
        <div className="row-2">
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
        </div>
        <div className="row-2">
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
        </div>
        <div className="row-2">
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
          <div className="cell" onClick={this.clickHandler} />
        </div>
        <div style={{ paddingTop: '30px' }}>
          <Bass step={this.fuck} stopSeq={this.stopSeq} />
        </div>
      </div>
    );
  }
}

export default StepSequencer;
