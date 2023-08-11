import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { multiply, search } from 'react-native-mk-localsearch';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
    const region = {
      latitude: 30.2669444,
      longitude: -97.7427778,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    };

    search('theater', region)
      .then(results => {
        console.log(JSON.stringify(results, null, 4));
        console.log(results.length);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
