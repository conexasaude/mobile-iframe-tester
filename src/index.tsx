import {
  Button,
  Container,
  Input,
  Space,
  Switch,
  Text,
} from '@conexasaude/hero-app-components';
import React, {useContext, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import WebView from 'react-native-webview';
import {ThemeContext} from '../theme';

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

  // useEffect(() => {
  //   if (render && Platform?.OS === 'android') {
  //     SafariView.isAvailable().then(() => {
  //       SafariView.show({
  //         url: `${isHttps ? https : http}${iframeUrl}`,
  //         readerMode: true,
  //         tintColor: '#fff',
  //         barTintColor: 'red',
  //       });
  //     });
  //   }
  // }, [render]);

  const {theme} = useContext(ThemeContext);

  const {colors} = theme;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        contentContainerStyle={styles.keyboardInnerContainer}
        behavior={Platform?.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollInnerContainer}>
          <Text typography="headingLarge" color="#fff">
            Mobile Iframe Tester
          </Text>
          <Space size={16} />

          <Container
            flexDirection="row"
            justifyContent="space-between"
            backgroundColor="transparent">
            <Container
              flexDirection="row"
              alignItems="center"
              backgroundColor="transparent">
              <Switch value={isHttps} onValueChange={setIsHttps} />

              <Space size={16} />

              <Text>
                <Text
                  typography="headingMedium"
                  color={!isHttps ? colors.success[300] : '#ccc'}>
                  Http
                </Text>
                /
                <Text
                  color={isHttps ? colors.success[300] : '#ccc'}
                  typography="headingMedium">
                  Https
                </Text>
              </Text>
            </Container>

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
          </Container>

          <Space size={16} />
          <Input
            containerStyle={styles.inputContainer}
            textInputStyles={styles.input}
            placeholderTextColor="#b8c9ec"
            placeholder="Input your url here"
            value={inputUrl}
            onChangeText={setInputUrl}
          />

          <Space size={16} />

          <Container
            flex
            justifyContent="center"
            backgroundColor="transparent"
            borderRadius={8}
            borderWidth={1}
            borderColor="#4b5563"
            containerStyles={styles.container}>
            {render ? (
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
              <Text
                textAlign="center"
                typography="headingMedium"
                color="#b7bdf3">
                Your website will appear here.
              </Text>
            )}
          </Container>
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
