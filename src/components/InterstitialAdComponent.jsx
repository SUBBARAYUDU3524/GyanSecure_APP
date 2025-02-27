import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const InterstitialAdComponent = () => {
  const [loaded, setLoaded] = useState(false);

  // Replace with your real AdMob Interstitial Ad Unit ID for production
  const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2044343069719598/xxxxxxxxxx'; // Use your real ID here
  
  // Create the interstitial ad instance
  const interstitialAd = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    // Define a function to handle ad events
    const onAdEvent = (type) => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
        console.log('Ad loaded');
      }
      if (type === AdEventType.FAILED_TO_LOAD) {
        setLoaded(false);
        console.log('Failed to load ad');
      }
      if (type === AdEventType.CLOSED) {
        // Optionally, reload the ad when it is closed
        console.log('Ad closed');
        interstitialAd.load();
      }
    };

    // Add event listeners after ad is created
    interstitialAd.addAdEventListener(AdEventType.LOADED, onAdEvent);
    interstitialAd.addAdEventListener(AdEventType.FAILED_TO_LOAD, onAdEvent);
    interstitialAd.addAdEventListener(AdEventType.CLOSED, onAdEvent);

    // Load the ad initially
    interstitialAd.load();

    // Cleanup event listeners when component is unmounted
    return () => {
      interstitialAd.removeAllListeners();
    };
  }, [interstitialAd]);

  // Show the interstitial ad when the button is pressed
  const showAd = () => {
    if (loaded) {
      interstitialAd.show();
    } else {
      console.log("Ad not loaded yet!");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Show Interstitial Ad" onPress={showAd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InterstitialAdComponent;
