import { Linking } from 'react-native';

const browserOpen = async (browser_url) => {
  const link_supported = await Linking.canOpenURL(browser_url);
  if (link_supported) {
    await Linking.openURL(browser_url);
  } else {
    console.log('link not suported :', browser_url);
  }
}

export {
  browserOpen
};

