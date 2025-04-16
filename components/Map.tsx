// components/Map.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

interface MarkerData {
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
}

interface MapProps {
  showUserLocation?: boolean;
  initialRegion?: Region;
  markers?: MarkerData[];
}

const Map = ({ showUserLocation = true, initialRegion, markers = [] }: MapProps) => {
  const [region, setRegion] = useState<Region | null>(initialRegion || null);
  const [loading, setLoading] = useState(!initialRegion);

  useEffect(() => {
    if (!initialRegion && showUserLocation) {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        setLoading(false);
      })();
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>
          <ActivityIndicator size="large" color="#4FC48B" />
        </Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE} // Use Google Maps
      showsUserLocation={showUserLocation}
      region={region!}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          description={marker.description}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Map;