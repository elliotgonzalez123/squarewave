import React, { Component } from 'react';
import { synths, vol } from './scripts-1';
import Tone from 'tone';

let synth = synths[0];
let beat = '8n';

class Arp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  kill = () => {
    vol.mute = !vol.mute;
  };
  volume = e => {
    vol.volume.input.value = +e.target.value;
    //console.log(+e.target.value);
  };

  changeSynth = e => {
    synth = synths[+e.target.value];
    console.log(synth);
    console.log(e.target.value);
  };
  clickHandler = e => {
    //console.log(e.target.className);
    const steps = document.querySelectorAll('label');
    //console.log(e.target.htmlFor);
    for (let i = 0; i < steps.length; i++) {
      let step = steps[i];
      if (e.target.htmlFor === step.htmlFor) {
        step.className = 'label-clicked';
      } else {
        step.className = 'label-unclicked';
      }
    }
  };

  changeBeat = e => {
    beat = e.target.value;
  };

  arpThing = () => {
    //console.log(num);
    //let gain = new Tone.Gain(0.3);
    //synth.oscillator.type = 'sine';
    //gain.toMaster();

    //synth.connect(gain);

    const inputs = document.querySelectorAll('input'),
      chords = ['A0 C1 E1', 'F0 A0 C1', 'G0 B0 D1', 'D0 F0 A0', 'E0 G0 B0'].map(
        this.formatChords
      );

    //console.log(chords);
    let chordIdx = 0,
      step = 0;

    Array.from(inputs).forEach(input => {
      input.addEventListener('change', () => {
        if (input.checked) handleChord(input.value);
      });
    });
    function handleChord(valueString) {
      chordIdx = parseInt(valueString) - 1;
    }
    function onRepeat(time) {
      let chord = chords[chordIdx],
        note = chord[step % chord.length];
      synth.triggerAttackRelease(note, beat, time);
      step++;
    }
    Tone.Transport.scheduleRepeat(onRepeat, beat);
    Tone.Transport.start();
    // Tone.Transport.bpm.value = 120;
  };
  formatChords = chordString => {
    let chord = chordString.split(' ');
    let arr = [];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < chord.length; j++) {
        let noteOct = chord[j].split(''),
          note = noteOct[0];
        let oct = noteOct[1] === '0' ? i + 4 : i + 5;
        note += oct;
        arr.push(note);
      }
    }
    return arr;
  };

  startHandler = () => {
    // this.setState({ clicked: true });
    // if (!this.state.clicked) {
    //   this.arpThing();
    // }

    this.arpThing();
  };

  render() {
    return (
      <div className="arp-cont">
        <div className="inputs">
          <input
            id="chord-1"
            className="fuck-off"
            value="1"
            type="radio"
            name="chord"
          />
          <input
            id="chord-2"
            className="fuck-off"
            value="2"
            type="radio"
            name="chord"
          />
          <input
            id="chord-3"
            className="fuck-off"
            value="3"
            type="radio"
            name="chord"
          />
          <input
            id="chord-4"
            className="fuck-off"
            value="4"
            type="radio"
            name="chord"
          />
          <input
            id="chord-5"
            className="fuck-off"
            value="5"
            type="radio"
            name="chord"
          />
          <div className="row-2-arp-2">
            <ul>
              <li>
                <label
                  className="label-unclicked"
                  onClick={this.clickHandler}
                  htmlFor="chord-1"
                />
              </li>
              <li>
                <label
                  className="label-unclicked"
                  onClick={this.clickHandler}
                  htmlFor="chord-2"
                />
              </li>
              <li>
                <label
                  className="label-unclicked"
                  onClick={this.clickHandler}
                  htmlFor="chord-3"
                />
              </li>
              <li>
                <label
                  className="label-unclicked"
                  onClick={this.clickHandler}
                  htmlFor="chord-4"
                />
              </li>
              <li>
                <label
                  className="label-unclicked"
                  onClick={this.clickHandler}
                  htmlFor="chord-5"
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <div style={{ paddingBottom: '40px' }}>
            <select className="select-arp" onChange={this.changeSynth}>
              <option value="none" selected disabled hidden>
                Arp Sound
              </option>
              <option value="0">1</option>
              <option value="1">2</option>
              <option value="2">3</option>
              <option value="3">4</option>
            </select>
            <select className="select-arp" onChange={this.changeBeat}>
              <option value="none" selected disabled hidden>
                Note Duration
              </option>
              <option value="8n">eigth</option>
              <option value="16n">sixteenth</option>
            </select>
          </div>
          <div>
            <div style={{ margin: '10px' }}>
              <input
                id="defaultSlider"
                className="slider"
                type="range"
                min="0"
                max="3"
                step="0.01"
                defaultValue="0.05"
                onChange={this.volume}
              />
            </div>
          </div>
        </div>
        <div style={{ padding: '20px' }}>
          <center>
            <button className="button button-1" onClick={this.startHandler}>
              ARPEGGIATOR
            </button>
            <button className="button button-1" onClick={this.kill}>
              PAUSE
            </button>
          </center>
        </div>
      </div>
    );
  }
}

export default Arp;
