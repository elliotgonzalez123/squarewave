import React, { Component } from 'react';
import ArpSeq from './components/arp-seq';
import Tone from 'tone';

document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running') Tone.context.resume();
});

const test = new Tone.MembraneSynth().toMaster();

// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  init = () => {
    const rows = document.body.querySelectorAll('.row'),
      notes = ['G5', 'E4', 'C3'];
    console.log(rows[0]);
    let index = 0;
    Tone.Transport.scheduleRepeat(time => {
      let step = index % 8;
      for (let i = 0; i < rows.length; i++) {
        let synth = test,
          note = notes[i],
          row = rows[i],
          input = row.querySelector(`input:nth-child(${step + 1})`);
        if (input.checked) synth.triggerAttackRelease(note, '8n', time);
      }
      index++;
    }, '8n');
    Tone.Transport.start();
  };

  fuck = () => {
    const rows = document.body.querySelectorAll('.row');
    // console.log(rows[0]);
    let index = 0;

    Tone.Transport.scheduleRepeat(time => {
      let step = index % 8;
      let notes = ['C1', 'D3', 'G1'];
      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let note = notes[i];
        let input = row.querySelector(`input:nth-child(${step + 1})`);
        //console.log(input);
        if (input.checked) test.triggerAttackRelease(note, '8n', time);
      }
      index++;
    }, '8n');
    Tone.Transport.bpm.value = 160;
    Tone.Transport.start();
  };

  render() {
    return (
      <div>
        <button onClick={this.fuck}>START</button>
        <button onClick={() => Tone.Transport.stop()}>STOP</button>
        <div className="row">
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
        </div>
        <div className="row">
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
        </div>
        <div className="row">
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
        </div>
        <ArpSeq />
      </div>
    );
  }
}

export default Step2;
