import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Player, Recorder } from '@react-native-community/audio-toolkit';

const AudioRecorderAndPlayer = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Use a union type to tell TypeScript the state can be either the object or null
  const [recorder, setRecorder] = useState<Recorder | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);

  // A dummy filename for the recorded audio
  const audioFilePath = 'hello.aac';

  useEffect(() => {
    // Clean up when the component unmounts
    return () => {
      // Add a null check before calling destroy()
      if (recorder) {
        recorder.destroy();
      }
      if (player) {
        player.destroy();
      }
    };
  }, [recorder, player]);

  const startRecording = () => {
    const newRecorder = new Recorder(audioFilePath, { format: 'aac' });
    setRecorder(newRecorder); // This is now correctly typed
    newRecorder.record(() => {
      setIsRecording(true);
      console.log('Recording started');
    });
  };

  const stopRecording = () => {
    // Add a null check before calling stop()
    if (recorder) {
      recorder.stop(() => {
        setIsRecording(false);
        console.log('Recording stopped');
      });
    }
  };

  const startPlayback = () => {
    const newPlayer = new Player(audioFilePath, { autoDestroy: false });
    setPlayer(newPlayer); // This is now correctly typed
    newPlayer.play(() => {
      setIsPlaying(true);
      console.log('Playback started');
    });
  };

  const stopPlayback = () => {
    // Add a null check before calling stop()
    if (player) {
      player.stop(() => {
        setIsPlaying(false);
        console.log('Playback stopped');
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        {isRecording ? 'Recording...' : isPlaying ? 'Playing...' : 'Ready'}
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title={isRecording ? "Stop Recording" : "Start Recording"}
          onPress={isRecording ? stopRecording : startRecording}
          disabled={isPlaying}
        />
        <Button
          title={isPlaying ? "Stop Playback" : "Start Playback"}
          onPress={isPlaying ? stopPlayback : startPlayback}
          disabled={isRecording}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  statusText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default AudioRecorderAndPlayer;