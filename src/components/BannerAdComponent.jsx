import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

const BannerAdComponent = ({ adUnit }) => {
  useEffect(() => {
    console.log(`Ad Unit Loaded: ${adUnit}`);
  }, [adUnit]);

  // Use TestIds.BANNER for testing, or replace it with your adUnit ID
  const adUnitId = __DEV__ ? TestIds.BANNER : adUnit;

  // Correctly check for __DEV__
  if (__DEV__) {
    console.log("Debug mode");
  }

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error) => console.error("Ad failed to load:", error)}
        onAdLoaded={() => console.log("Ad loaded successfully")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default BannerAdComponent;
