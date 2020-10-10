import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';

import store from './redux/store';
import Home from './src/screens/Home';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container} forceInset={{bottom: 'never'}}>
          <Home />
        </SafeAreaView>
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
