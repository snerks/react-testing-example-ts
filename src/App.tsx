import * as React from 'react';
// import './App.css';

import LockScreen from './components/LockScreen';

// const logo = require('./logo.svg');

class App extends React.Component<null, null> {
  render() {
    return (
      <LockScreen
        wallpaperPath="react_wallpaper.png"
        userInfoMessage="This is Tim's phone. If found, please give it back to him. He will be sad without it"
        onUnlocked={() => alert('unlocked!')}
      />
    );
  }
}

export default App;
