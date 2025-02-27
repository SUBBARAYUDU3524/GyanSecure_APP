import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Video from 'react-native-video';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import BannerAdComponent from './BannerAdComponent';

const Sources = () => {
  const [videoUri, setVideoUri] = useState(null);
  const [loadingUri, setLoadingUri] = useState(true);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const colorScheme = useColorScheme(); // Detect system theme

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const uri = await storage().ref('videoplayback.mp4').getDownloadURL();
        setVideoUri(uri);
      } catch (error) {
        console.error('Error fetching video URL:', error);
      } finally {
        setLoadingUri(false);
      }
    };

    fetchVideo();
  }, []);

  const handleVideoLoad = data => {
    setDuration(data.duration);
    setLoadingVideo(false);
  };

  const handleProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const handleSeek = value => {
    setCurrentTime(value);
    if (videoRef.current) {
      videoRef.current.seek(value);
    }
  };

  const iconColor = colorScheme === 'dark' ? '#00ff00' : '#0000ff';

  if (loadingUri) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={iconColor} />
        <Text style={styles.loaderText}>Fetching video...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        The Playfair cipher is a cryptographic technique that encodes text using
        pairs of letters. Invented by Charles Wheatstone in 1854, it was widely
        used for secure communication during World War I and II. This cipher is
        notable for its simplicity and the ability to encrypt text without
        requiring complex machines.
      </Text>

      {videoUri ? (
        <View>
          <View style={styles.videoContainer}>
            {loadingVideo && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.loaderText}>Loading video...</Text>
              </View>
            )}
            <Video
              ref={videoRef}
              source={{uri: videoUri}}
              style={styles.video}
              paused={isPaused}
              controls={false}
              resizeMode="contain"
              onLoadStart={() => setLoadingVideo(true)}
              onLoad={handleVideoLoad}
              onProgress={handleProgress}
            />
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => setIsPaused(!isPaused)}>
              <Icon
                name={isPaused ? 'play-circle' : 'pause-circle'}
                size={60}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={currentTime}
            onSlidingComplete={handleSeek}
            minimumTrackTintColor={iconColor}
            maximumTrackTintColor="#ccc"
            thumbTintColor={iconColor}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load video</Text>
        </View>
      )}
    </View>
  );
};

const formatTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loaderText: {
    color: '#000',
    fontSize: 14,
    marginTop: 10,
  },
  infoText: {
    color: '#000',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 24,
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  slider: {
    width: '100%',
    marginTop: 10, // Adjust spacing
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  timeText: {
    color: '#000',
    fontSize: 14,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#000',
    fontSize: 16,
  },
});

export default Sources;
