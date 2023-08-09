import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

const CustomLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={'white'} />
    </View>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
