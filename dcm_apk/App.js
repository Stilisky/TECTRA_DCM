// App.js
import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Routes from './routes';

const App = () => {
  const window = useWindowDimensions();

  return (
    <View style={[styles.container, { width: window.width, height: window.height }]}>
      <Routes />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
