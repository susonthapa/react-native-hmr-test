/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  DeviceEventEmitter,
  EmitterSubscription,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Section from './Section';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Step Two
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

let emitterSub: EmitterSubscription | undefined
function setupHMRListener() {
  if (!__DEV__) {
    return
  }
  emitterSub?.remove()
  let isUpdating = false
  emitterSub = DeviceEventEmitter.addListener('websocketMessage', (data) => {
    try {
      const response = JSON.parse(data.data)
      if (response.type === "update" && response.body?.modified?.length > 0) {
        isUpdating = true
      }

      if (isUpdating && response?.type === "update-done") {
        // Do your changes here!
        console.log('detected a change in code!');
        isUpdating = false
      }

    } catch (e) {
      console.log('Failed to parse the webSocketMessage event data!', e)
    }

  })
}
setupHMRListener()

export default App;
