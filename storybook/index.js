import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Navigation } from "react-native-navigation";
import { getStorybookUI, configure } from '@storybook/react-native';

// import stories
configure(() => {
  require('./stories');
}, module);

const StorybookUI = getStorybookUI({ port: 7007, host: "localhost" });

Navigation.registerComponent("storybook.UI", () => StorybookUI);

Navigation.startSingleScreenApp({
  screen: {
    screen: "storybook.UI",
    title: "Storybook",
  },
});

export default StorybookUI;
