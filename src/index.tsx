import React, {useContext, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  View,
  Text,
  Button,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import WebView from 'react-native-webview';

import {request, RESULTS} from 'react-native-permissions';
import SafariView from 'react-native-safari-view';

const http = 'http://';
const https = 'https://';

const IframeTester: React.FC = () => {
  const [isHttps, setIsHttps] = useState(true);
  const [render, setRender] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    } else {
      request('ios.permission.CAMERA').then(result => {
        if (result === RESULTS.GRANTED) {
          request('ios.permission.MICROPHONE').then(result => {
            if (result === RESULTS.GRANTED) {
              // setRender(true);
            }
          });
        }
      });
    }
  }, [Platform]);

  useEffect(() => {
    if (render) {
      SafariView.isAvailable().then(() => {
        SafariView.show({
          url: isHttps ? https + inputUrl : http + inputUrl,
          readerMode: true,
          tintColor: '#fff',
          barTintColor: 'red',
        });
      });
    }
  }, [render]);

  console.log('teste');
  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        contentContainerStyle={styles.keyboardInnerContainer}
        behavior={Platform?.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollInnerContainer}>
          <Text>Mobile Iframe Tester</Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Switch value={isHttps} onValueChange={setIsHttps} />

              <Text>
                <Text style={{color: !isHttps ? 'green' : '#ccc'}}>Http</Text>/
                <Text style={{color: isHttps ? 'green' : '#ccc'}}>Https</Text>
              </Text>
            </View>

            <Button
              title="Render"
              onPress={() => {
                setRender(true);
                setIframeUrl(inputUrl);
              }}
            />
            <Button
              title="Clear"
              onPress={() => {
                if (Platform.OS === 'ios') {
                  SafariView.dismiss();
                }
                setRender(false);
                setIframeUrl('');
              }}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholderTextColor="#b8c9ec"
            placeholder="Input your url here"
            value={inputUrl}
            onChangeText={setInputUrl}
          />

          <View style={{...styles.container, flex: 1}}>
            {render && Platform.OS !== 'ios' ? (
              <WebView
                style={styles.webview}
                containerStyle={styles.webviewInnerContainer}
                cacheEnabled={false}
                incognito
                startInLoadingState
                allowsInlineMediaPlayback
                allowsFullscreenVideo
                domStorageEnabled
                useWebKit
                originWhitelist={['*']}
                mediaPlaybackRequiresUserAction={false}
                javaScriptEnabled
                source={{uri: `${isHttps ? https : http}${iframeUrl}`}}
              />
            ) : (
              <Text>Your website will appear here.</Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {backgroundColor: '#020217', flexGrow: 1},
  keyboardContainer: {flex: 1},
  keyboardInnerContainer: {flexGrow: 1},
  scrollContainer: {flexGrow: 1},
  scrollInnerContainer: {flexGrow: 1, padding: 16},
  inputContainer: {borderColor: '#7a7ee5'},
  input: {color: '#f1f2f3', borderColor: '#7a7ee5'},
  container: {borderStyle: 'dashed'},
  webview: {flexGrow: 1},
  webviewInnerContainer: {
    flexGrow: 1,
    minHeight: 100,
    minWidth: 100,
    borderRadius: 8,
  },
});

export {IframeTester};
