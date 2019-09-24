import React from 'react';
import {Text, ScrollView} from 'react-native';

import firebase from 'react-native-firebase';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    const fcmToken = await firebase.messaging().getToken();
    console.log(fcmToken);
    this.removeNotificationListener = firebase
      .notifications()
      .onNotification(notification => {
        console.log('Notification received', notification);
        alert('Notification received in foreground mode');
      });

    this.removeNotificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        alert('Notification that was opened in background mode');
        const notification = notificationOpen.notification;
        console.log(notification);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      // App was opened by a notification
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      console.log('App was opened by a notification', action);
      // Get information about the notification that was opened
      const notification = notificationOpen.notification;
      console.log(notification);
    }
  }

  componentWillUnmount() {
    this.removeNotificationListener();
    this.removeNotificationOpenedListener();
  }

  render() {
    return (
      <ScrollView>
        <Text>Hello world</Text>
      </ScrollView>
    );
  }
}
