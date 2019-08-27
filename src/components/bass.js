import React, { Component } from 'react';
import ArpSeq from './arp-seq';
import Tone from 'tone';

let index = 0;

const bassSynth = new Tone.MonoSynth({
  portamento: 0.08,
  oscillator: {
    partials: [2, 1, 3, 2, 0.4]
  },
  filter: {
    Q: 4,
    type: 'lowpass',
    rolloff: -48
  },
  envelope: {
    attack: 0.04,
    decay: 0.06,
    sustain: 0.4,
    release: 1
  },
  filterEnvelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.6,
    release: 1.5,
    baseFrequency: 50,
    octaves: 3.4
  }
});

const gain = new Tone.Gain(0.4);
gain.toMaster();
bassSynth.connect(gain);

class Bass extends Component {
  state = {};
  clickHandler = e => {
    if (e.target.className === 'cell-bass') {
      e.target.className = 'cell-bass selected';
    } else if (e.target.className === 'cell-bass selected') {
      e.target.className = 'cell-bass';
    }
  };
  bpm = e => {
    Tone.Transport.bpm.value = +e.target.value;
    //console.log(+e.target.value);
  };
  bass = () => {
    const rows = document.body.querySelectorAll('.row-2-bass');

    Tone.Transport.scheduleRepeat(time => {
      let step = index % 16;
      //console.log(step);
      let notes = ['A1', 'C2', 'E3'];
      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let input = row.querySelector(`.cell-bass:nth-child(${step + 1})`);
        input.style.border = '2px solid white';
      }

      Tone.Draw.schedule(function() {
        for (let i = 0; i < rows.length; i++) {
          let row = rows[i];
          let input = row.querySelector(`.cell-bass:nth-child(${step + 1})`);

          input.style.border = '2px solid violet';
        }
      }, time);

      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let note = notes[i];
        let input = row.querySelector(`.cell-bass:nth-child(${step + 1})`);
        if (input.className === 'cell-bass selected')
          bassSynth.triggerAttackRelease(note, '8n', time);
      }
      index++;
    }, '8n');
  };

  stopBass = () => {
    index = 0;
  };
  render() {
    return (
      <div>
        <div>
          {/* <button onClick={this.startHandler}>START</button> */}
          {/* <button onClick={this.stopHandler}>STOP</button> */}
          <div className="row-2-bass">
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
          </div>
          <div className="row-2-bass">
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
          </div>
          <div className="row-2-bass">
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
            <div className="cell-bass" onClick={this.clickHandler} />
          </div>
          <div>
            <div style={{ paddingTop: '25px' }}>
              <input
                id="defaultSlider"
                className="slider"
                type="range"
                min="60"
                max="240"
                step="1"
                defaultValue="120"
                onChange={this.bpm}
              />
            </div>
          </div>
        </div>
        <ArpSeq
          step={this.props.step}
          stopSeq={this.props.stopSeq}
          bass={this.bass}
          stopBass={this.stopBass}
        />
      </div>
    );
  }
}

export default Bass;
