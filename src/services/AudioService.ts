import { Recorder, Player } from '@react-native-community/audio-toolkit';

let recorder: Recorder | null = null;
let player: Player | null = null;
let audioFilePath = 'hello.aac';
let positionInterval: NodeJS.Timeout | null = null;

export const startRecording = (currentIndex: number) => {
  audioFilePath = `audio_${Date.now()}_${currentIndex}.aac`;
  if (recorder) return;
  recorder = new Recorder(audioFilePath, {
    format: 'aac',          // Keep AAC for good compression & quality
    sampleRate: 44100,      // Increase from 44100 → 48000 Hz (higher fidelity)
    channels: 1,            // Stereo instead of mono
    quality: 'high',         // 'high' → 'max' for the best internal preset
    encoder: 'aac',          // Keep AAC
    bitrate: 68000,         // Increase from 32 kbps → 128 kbps (higher bitrate = better quality)
  });
  recorder.record((err) => err && console.error('Recording start error:', err));
};

export const stopRecording = (): string | null => {
  if (!recorder) return null;
  recorder.stop((err) => err && console.error('Recording stop error:', err));
  recorder.destroy();
  recorder = null;
  return audioFilePath;
};

export const startPlayback = (
  onPosition: (ms: number) => void,
  onEnd?: () => void,
  onReady?: (duration: number) => void,
  fromPosition?: number // optional starting position in ms
) => {
  if (player) return;

  player = new Player(audioFilePath, { autoDestroy: false });

  // Prepare player
  player.prepare((err) => {
    if (err) return console.error('Player prepare error:', err);

    // Seek to position if provided
    if (fromPosition && fromPosition > 0) {
      player!.currentTime = fromPosition;
    }

    // Start playback immediately
    player!.play((playErr) => {
      if (playErr) return console.error('Player play error:', playErr);

      // Poll position for slider
      positionInterval = setInterval(() => {
        if (player && typeof player.currentTime === 'number') {
          onPosition(player.currentTime);
        }
      }, 200);

      // Poll duration until valid
      const durationPoll = setInterval(() => {
        if (player && player.duration > 0) {
          onReady && onReady(player.duration);
          clearInterval(durationPoll);
        }
      }, 50);
    });
  });

  (player as any).on('ended', () => {
    stopPlayback();
    onEnd && onEnd();
  });
};




export const stopPlayback = () => {
  if (!player) return;
  player.stop();
  player.destroy();
  player = null;

  if (positionInterval) {
    clearInterval(positionInterval);
    positionInterval = null;
  }
};

export const seekPlayback = (ms: number) => {
  if (player) player.seek(ms);
};

export const getDuration = (): number => {
  return player?.duration || 0;
};
