import React, { Component } from 'react';
import { render, Window, App } from 'proton-native';

import Main from './components/main';

const FavicoApp = () => (
  <App>
    <Window
      title="Favico generator!"
      size={{ w: 300, h: 200 }}
      menuBar={false}
      margined
    >
      <Main />
    </Window>
  </App>
);

render(<FavicoApp />);
