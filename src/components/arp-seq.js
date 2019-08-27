import React, { Component } from 'react';
import Tone from 'tone';
import Arp from './arp';
import Bass from './bass';
import { synths2, vol2 } from './scripts-1';
let index = 0;
let test = synths2[0];
let beat = '1n';

// const audioCtx = Tone.context;
// const dest = audioCtx.createMediaStreamDestination();
// test.connect(dest);

//canvasCtx.clearRect(0, 0, 75, 300);

class ArpSeq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }
  visualizer = () => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let source;
    let stream;

    let analyser = audioCtx.createAnalyser();
    analyser.minDecibels = -120;
    analyser.maxDecibels = -20;
    analyser.smoothingTimeConstant = 0.85;
    analyser.fftSize = 128;
    let bufferLength = analyser.frequencyBinCount;

    let distortion = audioCtx.createWaveShaper();
    let gainNode = audioCtx.createGain();
    let biquadFilter = audioCtx.createBiquadFilter();
    let convolver = audioCtx.createConvolver();
    let canvas = document.querySelector('.viz');

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { audio: true },
        function(stream) {
          source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);
          analyser.connect(distortion);
          distortion.connect(biquadFilter);
          biquadFilter.connect(convolver);
          convolver.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          readAudioData();
        },
        function(err) {
          console.log(err);
        }
      );
    } else {
      console.log('UserMedia not supported on your browser');
    }

    let readAudioData = function() {
      requestAnimationFrame(readAudioData);
      let dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      draw(dataArray);
    };

    function draw(dataArray) {
      let rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      let context = canvas.getContext('2d');
      context.fillStyle = 'purple';
      let barWidth = rect.width / bufferLength;
      for (let i = 0; i < bufferLength; i++) {
        let barHeight = (rect.height * dataArray[i]) / 256;
        context.fillRect(
          i * barWidth,
          rect.height - barHeight,
          barWidth,
          barHeight
        );
      }
    }
  };

  clickHandler = e => {
    if (e.target.className === 'cell-arp') {
      e.target.className = 'cell-arp selected';
    } else if (e.target.className === 'cell-arp selected') {
      e.target.className = 'cell-arp';
    }
  };

  changeSynth = e => {
    test = synths2[+e.target.value];
  };

  changeBeat = e => {
    beat = e.target.value;
  };

  volume = e => {
    vol2.volume.input.value = +e.target.value;
    //console.log(+e.target.value);
  };

  fuckYou = () => {
    const rows = document.body.querySelectorAll('.row-2-arp');

    Tone.Transport.scheduleRepeat(time => {
      let step = index % 32;
      //console.log(step);
      let notes = ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4  '];

      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let input = row.querySelector(`.cell-arp:nth-child(${step + 1})`);
        input.style.border = '1px solid white';
      }

      Tone.Draw.schedule(function() {
        for (let i = 0; i < rows.length; i++) {
          let row = rows[i];
          let input = row.querySelector(`.cell-arp:nth-child(${step + 1})`);

          input.style.border = '1px solid rgb(239, 75, 29)';
        }
      }, time);

      //console.log(document.querySelector('.cell'));
      //let checked = rows.querySelector(`.cell:nth-child(${step + 1})`);
      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let note = notes[i];
        let input = row.querySelector(`.cell-arp:nth-child(${step + 1})`);
        //input.style.border = '1px solid red';
        // input.style.border = '1px solid grey';
        //console.log(input.id);
        if (input.className === 'cell-arp selected')
          test.triggerAttackRelease(note, beat, time);

        // input.className = 'cell';
      }

      index++;
    }, '8n');

    // Tone.Transport.start();
  };

  stopHandler = () => {
    this.props.stopSeq();
    this.props.stopBass();
    Tone.Transport.cancel();
    index = 0;
    // Tone.Transport.cancel();
  };

  startHandler = () => {
    this.fuckYou();
    this.props.bass();
    this.props.step();
    //Tone.Transport.bpm.value = 120;
    Tone.Transport.start();
  };

  render() {
    //const canvas = document.getElementById('viz');

    return (
      <div>
        <canvas className="viz" width="800" height="75" />
        <div>
          <center>
            <button className="button button-1" onClick={this.startHandler}>
              START
            </button>
            <button className="button button-1" onClick={this.stopHandler}>
              STOP
            </button>
            <button className="button button-1" onClick={this.visualizer}>
              VIZ
            </button>
          </center>
        </div>
        <div>
          <div className="row-2-arp">
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
          </div>
          <div className="row-2-arp">
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
          </div>
          <div className="row-2-arp">
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
          </div>
          <div className="row-2-arp">
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
          </div>
          <div className="row-2-arp">
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
          </div>
          <div className="row-2-arp">
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
          </div>
          <div className="row-2-arp">
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
            <div className="cell-arp" onClick={this.clickHandler} />
          </div>
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
          <div style={{ paddingTop: '15px', paddingBottom: '50px' }}>
            <select className="select-synth" onChange={this.changeSynth}>
              <option value="none" selected disabled hidden>
                Synth Sound
              </option>
              <option value="0">8-bit</option>
              <option value="1">flute</option>
              <option value="2">80s synth</option>
              <option value="3">4</option>
              <option value="4">Hard Saw</option>
            </select>
            <select className="select-synth" onChange={this.changeBeat}>
              <option value="none" selected disabled hidden>
                Note Duration
              </option>
              <option value="1n">whole</option>
              <option value="2n">half</option>
              <option value="4n">quarter</option>
              <option value="8n">eigth</option>
              <option value="16n">sixteenth</option>
            </select>
          </div>
          <div />
        </div>
        <div>
          <Arp />
        </div>
      </div>
    );
  }
}

export default ArpSeq;
