import React, { Component } from 'react';
import Tone from 'tone';

const synth = new Tone.Synth().toMaster();
const bassSynth = new Tone.MembraneSynth().toMaster();
// var synthA = new Tone.Synth({
//   oscillator: {
//     type: 'fmsquare',
//     modulationType: 'sawtooth',
//     modulationIndex: 3,
//     harmonicity: 3.4
//   },
//   envelope: {
//     attack: 0.001,
//     decay: 0.1,
//     sustain: 0.1,
//     release: 0.1
//   }
// }).toMaster();

class SynthTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cMajor: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    };
  }

  randomNote = () => {
    let idx = Math.floor(Math.random() * 7);
    return this.state.cMajor[idx];
  };

  noise = event => {
    synth.triggerAttackRelease(`${this.randomNote()}4`, '16n');
  };

  setup = () => {
    const loopBeat = new Tone.Loop(this.song, '4n');
    Tone.Transport.start();
    loopBeat.start(0);
  };
  song = time => {
    bassSynth.triggerAttackRelease('c1', '8n');
  };

  arp = () => {
    let pattern = new Tone.Pattern(
      function(time, note) {
        synth.triggerAttackRelease(note, 0.25);
      },
      ['C4', 'D4', 'E4', 'G4', 'A4']
    );
    pattern.start(0);
    Tone.Transport.start();
  };
  render() {
    return (
      <div>
        <h3>Synth Test</h3>
        <button onClick={this.noise}>random</button>
        <button onClick={this.setup}>Bass</button>
        <button onClick={this.arp}>arp</button>
      </div>
    );
  }
}

export default SynthTest;
