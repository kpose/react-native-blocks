# react-native-blocks

<p align="center" >
  <img
    height="480px"
    src="/images/app.png"
    alt="Template landing screen preview"
  />
</p>

<br/>

An opinionated template to bootstrap your next React Native Dapp with architecture and boilerplate to let you focus on writing features right away.

## :computer: Contributions are very welcome 🤝

Preconfigured with

- TypeScript
- [HardHat:](https://hardhat.org/)Ethereum development environment.
- [React Navigation:](https://reactnavigation.org/) (**v6**) for navigation and deeplinking.
- [AsyncStorage:](https://github.com/react-native-community/async-storage) An asynchronous, unencrypted, persistent, key-value storage system for React Native.
- [web3.js:](https://web3js.readthedocs.io/en/v1.7.4/#) A collection of libraries that allow you to interact with a local or remote ethereum node.
- [Ethers:](https://docs.ethers.io/v5/) Interact with the Ethereum Blockchain and its ecosystem.
- [WalletConnect:](https://docs.walletconnect.com/) Communicate securely between Wallets and Dapps.
- [react-native-svg:](https://github.com/react-native-community/react-native-svg) Provide SVG support.
- [react-native-gesture-handler:](https://docs.swmansion.com/react-native-gesture-handler/docs/) Recognizing pinch, rotation, pan and few other gestures.

## Contents

- [Documentation](#documentation)
- [Getting Started](#getting-started)
- [Required Steps](#required-steps)
- [Example](#example)

## Documentation

- [Libraries](#libraries)
- [Directory Structure](#directory-structure)
- [Quick Overview](#quick-overview)
- [File Walkthrough](./docs/file-walkthrough.md)

## Getting Started

Create a new project using the template.

- **Note:** the command will fail if you have the global legacy react-native-cli installed. Make sure you uninstall it first. More info at [react-native-community/cli](https://github.com/react-native-community/cli#about).

### RN 0.69.3

```bash
$ npx react-native init MyApp --template https://github.com/kpose/react-native-blocks
```

#### React Native <=> Template Version

| React Native | Template |
| ------------ | -------- |
| 0.69.3       | 1.0.0    |

## Required Steps

#### specify a deep link URI scheme

We have provisioned [WalletConnect](https://docs.walletconnect.com/) to easily help connect your React Native dapps to Ethereum Wallets on Android, iOS and the Web. This library is implemented using the React Context API, which is used to help make an instance of a connector accessible globally throughout your application.

To help control navigation between external wallets and your application, on the web, you only need to specify a valid application route; whereas on mobile platforms, you must [specify a deep link URI scheme](https://reactnavigation.org/docs/deep-linking/#set-up-with-bare-react-native-projects).

The easiest way to do this is with the uri-scheme package by running the following:

```bash
$ npx uri-scheme add <yoururlscheme> --android
$ npx uri-scheme add <yoururlscheme> --ios
```

**Manually configure scheme for iOS**

To manually set up the scheme for iOS devices, open the `ios/your-project-name/AppDelegate.m` file and add the following code snippet:

```javascript
$ cd src/ios/projectName/AppDelegate.m

...
// Add the header at the top of the file:
#import <React/RCTLinkingManager.h>

// Add this above `@end`:
- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```

Next, add the URI scheme to the iOS project configuration. Open, `Your-app-name/ios/app-name.xcworkspace` in Xcode. Then, select the project name in the left sidebar and navigate to the Info tab. Next, go to the URL Types, click the + (plus) button, in the new URL type, set the identifier and the URL scheme to your desired URL scheme.

<p align="center" >
  <img
    height="480px"
    src="/images/xcode.png"
    alt="configure deep linking preview"
  />
</p>

<br/>

**Manually configure scheme for Android**

To manually set up a scheme for Android devices, you can create a new intent in the manifest. Open `/android/app/src/main/AndroidManifest.xml` and make the following adjustments:

```javascript
<!-- Set the launchMode to singleTask in <activity> -->
<activity
  android:name=".MainActivity"
  android:label="@string/app_name"
  android:configChanges="keyboard|keyboardHidden|orientation|screenSize|uiMode"
  android:launchMode="singleTask"
  android:windowSoftInputMode="adjustResize">
  <intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
  </intent-filter>
  <!-- Add this new intent-filter tag -->
  <!-- Make sure to set the value of android:scheme to your own scheme -->
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme= "your own scheme " />
  </intent-filter>
</activity>
```

**Then, modify your app navigator linking**
To allow React Navigation library to handle deep links through its routing logic, you need to define a configuration object.

```javascript
$ cd src/navigation/

//RootNavigator.tsx
...

const linking = {
  prefixes: ['yourdeeplinkuri://'],
};

...
<NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator color="blue" size="large" />
      }>
      /* {AppStack} */
</NavigationContainer>
```

**Also, update walletconnect redirect url**

```javascript
$ cd src/

//App.tsx
...

const App = () => {
  const deepLinklUriScheme = 'yourdeeplinkuri://';

  return (
    <WalletConnectProvider
      redirectUrl={redirectUrl={Platform.OS === 'web' ? window.location.origin : deepLinklUriScheme}}
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}>
      <RootNavigator />
    </WalletConnectProvider>
  );
};
```

## Example

As a guide, we have included an example smart contract. This contract have alreday been deployed on the ropsten testnet so no real token would be used. Our example will read and write data on the blockchain.

## Libraries

Let's briefly go over the benefit of each library included in this template.

### TypeScript

For type safety
But in all seriousness, if you are considering this template I assume you are a TypeScript fan.

### HardHat

Hardhat is a development environment for writing smart contracts on the Ethereum blockchain. To manage many of the tasks that are inherent to developing dApps and smart contracts, hardhat provides a way to test, compile, deploy and debug dApps based on the Ethereum blockchain. [See docs for implementation and modification.](https://hardhat.org/docs)

### Ethers

We will need a way to interact with the smart contracts that have been deployed. We will need a way to read for data as well as send new transactions. Ethers.js is a web 3.0 library that can be used for interacting with smart contracts on the Ethereum blockchain and other Ethereum Virtual Machine (EVM) compatible blockchains. [See ethers v5 documentation.](https://docs.ethers.io/v5/)

### web3.js

Similar to ethers.js, web3.js is a collection of libraries that also allow you to interact with a local or remote ethereum node using HTTP, IPC or WebSocket. [See web3.js documentation.](https://web3js.readthedocs.io/)

### WalletConnect

Also, we will need a way to handle account management and connecting the current user to the blockchain. WalletConnect is an open protocol to communicate securely between Wallets and Dapps (Web3 Apps). The protocol establishes a remote connection between two apps and/or devices using a Bridge server to relay payloads. [See v1.0 docs for implementation and modification.](https://docs.walletconnect.com/quick-start/dapps/react-native)

### react-native-svg

Instead of using .png or .jpeg files in your React Native app, you should be using the SVG format. SVG is a vector-based format that can scale infinitely without compromising quality. Also, you won't end up bloating your app with higher image file sizes, which most times increase your app bundle size. [See documentation.](https://github.com/react-native-svg/react-native-svg)

### React Navigation

It is the most popular navigation library. For most apps, this is the best choice. [See documentation.](https://reactnavigation.org/docs/getting-started/)

> _If you appreciate these libraries and find them useful, please consider supporting them._

## Directory Structure

```
root
├── __tests__
├── __bundle
├── android
├── artifacts
├── cache
├── contracts
├── ios
├── scripts
└── src
    └── hooks
    └── navigation
    └── screens
├── test
```

## Quick Overview

Quickly get an idea about each folder's role.

| Directory     | Short Description                                                                                                        |
| :------------ | :----------------------------------------------------------------------------------------------------------------------- |
| \_\_tests\_\_ | (Default; as per official template)                                                                                      |
| android       | Android project. Includes modifications to integrate libraries.                                                          |
| artifacts     | The directory where the compilation artifacts are stored.This is where you will find the successfully compiled contracts |
| cache         | The directory used by Hardhat to cache its internal stuff.                                                               |
| contracts     | This is where the source files for your contracts should be.                                                             |
| ios           | iOS project. Includes modifications to integrate libraries.                                                              |
| scripts       | Folder for your hardhat simple automation scripts go.                                                                    |
| src           | Most of the app's code is here.                                                                                          |
| test          | This directory where your smart contract solidity tests are located.                                                     |
| hooks         | Shared hooks.                                                                                                            |
| navigation    | Navigation service (navigate from outside React components).                                                             |
| screens       | Shared custom exceptions.                                                                                                |

## Credits

This template is modified from [react-native-typescript-template](https://github.com/react-native-community/react-native-template-typescript). Thank you ❤️
