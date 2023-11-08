import {
  Button,
  Container,
  Input,
  Space,
  Switch,
  Text,
} from '@conexasaude/hero-app-components';
import React, {useContext, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import {ThemeContext} from '../theme';

// import { Container } from './styles';

const http = 'http://';
const https = 'https://';

const IframeTester: React.FC = () => {
  const [isHttps, setIsHttps] = useState(true);
  const [render, setRender] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');

  const {theme} = useContext(ThemeContext);

  const {colors} = theme;

  console.log(`${isHttps ? https : http}${iframeUrl}`);

  return (
    <SafeAreaView style={{backgroundColor: '#020217', flexGrow: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        behavior={Platform?.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={{flexGrow: 1}}
          contentContainerStyle={{
            flexGrow: 1,
            padding: 16,
          }}>
          <Text typography="headingMedium" color="#fff">
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
                setRender(false);
                setIframeUrl('');
              }}
            />
          </Container>

          <Space size={16} />
          <Input
            containerStyle={{borderColor: '#7a7ee5'}}
            textInputStyles={{
              color: '#f1f2f3',
              borderColor: '#7a7ee5',
            }}
            placeholderTextColor="#b8c9ec"
            placeholder="Input your url here"
            value={inputUrl}
            onChangeText={setInputUrl}
          />

          <Space size={16} />

          <Container
            flex
            // alignItems="center"
            justifyContent="center"
            backgroundColor="transparent"
            containerStyles={{
              borderStyle: 'dashed',
              borderColor: '#4b5563',
              borderWidth: 1,
              borderRadius: 8,
            }}>
            {render ? (
              <WebView
                style={{flexGrow: 1}}
                containerStyle={{
                  flexGrow: 1,
                  minHeight: 100,
                  minWidth: 100,
                  borderRadius: 8,
                }}
                javaScriptEnabled
                allowsInlineMediaPlayback
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
export {IframeTester};
