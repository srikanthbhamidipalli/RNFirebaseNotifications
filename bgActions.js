import firebase from 'react-native-firebase';
// Optional flow type

export default async notificationOpen => {
  if (notificationOpen.action === 'action') {
    // handle the action
  }

  return Promise.resolve();
};
