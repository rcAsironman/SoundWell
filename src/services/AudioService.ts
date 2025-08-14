// services/AudioService.ts
import { Recorder, Player } from '@react-native-community/audio-toolkit';

let currentRecorder: Recorder | null = null;
let currentFilePath: string | null = null;

export const startRecording = () => {
  if (currentRecorder) {
    console.log('Recording is already in progress.');
    return;
  }
  
  const fileName = `recording_${Date.now()}.flac`;

  currentRecorder = new Recorder(fileName, {
    format: 'flac',
    channels: 2,
    sampleRate: 44100,
    bitrate: 128000,
    encoder: 'flac',
    quality: 'high',
  });

  currentRecorder.prepare((err, fsPath) => {
    if (err) {
      console.error('Failed to prepare recorder:', err);
      currentRecorder = null;
    } else if (fsPath) {
      currentFilePath = fsPath;
      currentRecorder?.record(() => {
        console.log('Recording started at:', fsPath);
      });
    }
  });
};

export const stopRecording = async (): Promise<string> => {
  if (!currentRecorder) {
    throw new Error('No active recorder to stop.');
  }

  const recorderInstance = currentRecorder;
  currentRecorder = null; 

  return new Promise((resolve, reject) => {
    recorderInstance.stop((err) => {
      if (err) {
        reject(err);
      } else {
        if (currentFilePath) {
          console.log('Recording stopped at:', currentFilePath);
          recorderInstance.destroy(); 
          resolve(currentFilePath);
        } else {
          reject(new Error('Recording path not found.'));
        }
      }
    });
  });
};