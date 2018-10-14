import React, { Component } from 'react';

import { render, Window, App, Text } from 'proton-native';

class FavicoApp extends Component {
  render() {
    return (
      <App>
        <Window title="Favico generator!" size={{w: 300, h: 300}} menuBar={false}>
            <Text>Favico Generator</Text>
        </Window>
      </App>
    );
  }
}

render(<FavicoApp />);
