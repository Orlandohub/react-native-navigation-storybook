# React Native Navigation + Storybook

Original example from React Native Navigation with Storybook integration.

[React Native Navigation](http://example.com/ "React Native Navigation"):
> provides 100% native platform navigation on both iOS and Android for React Native apps.

[Storybook](https://github.com/storybooks/storybook/ "Storybook"):
> allows you to browse a component library, view the different states of each component, and interactively develop and test
> components.

**The challenge**:

Once you decide to add Storybook to your react native app which uses react native navigation, the normal storybook setup process will not be enough.
The reason for this is that react native navigation will take over screens rendering which means any new screen needs to be registered on react native navigation with `Navigation.registerComponent`.

**The solution**:

After the initial storybook setup, you will have a new `storybook` folder. Inside that same folder the file `index.js` it's responsible for registering storybook screen, it's code should look like the following:

    import React, { Component } from 'react';
    import { AppRegistry } from 'react-native';
    import { getStorybookUI, configure } from '@storybook/react-native';

    // import stories
    configure(() => {
      require('./stories');
    }, module);

    // This assumes that storybook is running on the same host as your RN packager,
    // to set manually use, e.g. host: 'localhost' option
    const StorybookUIRoot = getStorybookUI({ port: 7007, onDeviceUI: true });

    // react-native hot module loader must take in a Class - https://github.com/facebook/react-native/issues/10991
    // https://github.com/storybooks/storybook/issues/2081
    // eslint-disable-next-line react/prefer-stateless-function
    class StorybookUIHMRRoot extends Component {
      render() {
        return <StorybookUIRoot />;
      }
    }

    AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIHMRRoot);
    export default StorybookUIHMRRoot;

We need to make some slight changes on this file so we can successfully use Storybook. First let's start by importing react native navigation

    import { Navigation } from "react-native-navigation";

After, we replace -> `AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIHMRRoot);`
with -> `Navigation.registerComponent("storybook.UI", () => StorybookUI);`

Finally we start a single screen app:

    Navigation.startSingleScreenApp({
      screen: {
        screen: "storybook.UI",
        title: "Storybook",
      },
    });

The final result will look similar to this:

    import React, { Component } from 'react';
    import { AppRegistry } from 'react-native';
    import { getStorybookUI, configure } from '@storybook/react-native';

    // import stories
    configure(() => {
      require('./stories');
    }, module);

    // This assumes that storybook is running on the same host as your RN packager,
    // to set manually use, e.g. host: 'localhost' option
    const StorybookUIRoot = getStorybookUI({ port: 7007, onDeviceUI: true });

    // react-native hot module loader must take in a Class - https://github.com/facebook/react-native/issues/10991
    // https://github.com/storybooks/storybook/issues/2081
    // eslint-disable-next-line react/prefer-stateless-function
    class StorybookUIHMRRoot extends Component {
      render() {
        return <StorybookUIRoot />;
      }
    }

    AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIHMRRoot);
    export default StorybookUIHMRRoot;

That's it! Just run storybook and you are ready to rock 🤘🤘
