import Tone from 'tone';

const synths = [
  new Tone.FMSynth({
    harmonicity: 3.01,
    modulationIndex: 14,
    oscillator: {
      type: 'triangle'
    },
    envelope: {
      attack: 0.2,
      decay: 0.3,
      sustain: 0.1,
      release: 1.2
    },
    modulation: {
      type: 'square'
    },
    modulationEnvelope: {
      attack: 0.01,
      decay: 0.5,
      sustain: 0.2,
      release: 0.1
    }
  }),
  new Tone.Synth({
    portamento: 0.0,
    oscillator: {
      type: 'square4'
    },
    envelope: {
      attack: 2,
      decay: 1,
      sustain: 0.2,
      release: 2
    }
  }),
  new Tone.Synth({
    oscillator: {
      type: 'fatsawtooth',
      count: 3,
      spread: 30
    },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.5,
      release: 0.4,
      attackCurve: 'exponential'
    }
  }),
  new Tone.Synth({
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.001,
      decay: 0.1,
      sustain: 0.1,
      release: 1.2
    }
  })
];

const synths2 = [
  new Tone.Synth(),
  new Tone.Synth({
    portamento: 0.0,
    oscillator: {
      type: 'square4'
    },
    envelope: {
      attack: 2,
      decay: 1,
      sustain: 0.2,
      release: 2
    }
  }),
  new Tone.Synth({
    oscillator: {
      type: 'fatsawtooth',
      count: 3,
      spread: 30
    },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.5,
      release: 0.4,
      attackCurve: 'exponential'
    }
  }),
  new Tone.Synth({
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.001,
      decay: 0.1,
      sustain: 0.1,
      release: 1.2
    }
  }),
  new Tone.MonoSynth({
    portamento: 0.01,
    oscillator: {
      type: 'sawtooth'
    },
    filter: {
      Q: 2,
      type: 'lowpass',
      rolloff: -24
    },
    envelope: {
      attack: 0.1,
      decay: 0.1,
      sustain: 0.6,
      release: 0.5
    },
    filterEnvelope: {
      attack: 0.05,
      decay: 0.8,
      sustain: 0.4,
      release: 1.5,
      baseFrequency: 2000,
      octaves: 1.5
    }
  })
];

let vol = new Tone.Volume({
  volume: -20
});

let vol2 = new Tone.Volume({
  volume: -4
});

//console.log('value', vol.mute);
synths[0].chain(vol, Tone.Master);
synths[1].chain(vol, Tone.Master);
synths[2].chain(vol, Tone.Master);
synths[3].chain(vol, Tone.Master);

synths2[0].chain(vol2, Tone.Master);
synths2[1].chain(vol2, Tone.Master);
synths2[2].chain(vol2, Tone.Master);
synths2[3].chain(vol2, Tone.Master);
synths2[4].chain(vol2, Tone.Master);

vol.toMaster();
vol2.toMaster();

export { synths, synths2, vol, vol2 };
