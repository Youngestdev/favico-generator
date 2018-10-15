import React, { Component } from 'react';
import {
  Box,
  Button,
  Dialog,
  Form,
  ProgressBar,
  Separator,
  Spinbox,
  StyledText,
  TextInput
} from 'proton-native';

import favico from '../../lib';
import { METHOD_FILE, METHOD_URL } from '../constants';

const intRegex = /\d+/;
const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

class Main extends Component {
  constructor() {
    super();
    this.handleChangeInput = this.handleChangeURL.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleChooseFile = this.handleChooseFile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      filename: '',
      progress: 0,
      size: 160
    };
  }

  handleChangeURL(filename) {
    if (!filename) return;
    this.setState({ filename, method: METHOD_URL });
  }

  handleChangeSize(size) {
    this.setState({ size });
  }

  handleChooseFile() {
    const filename = Dialog('Open');
    this.setState({ filename, method: METHOD_FILE });
  }

  handleClick() {
    const { filename, method, size } = this.state;

    if (method === METHOD_URL && !urlRegex.test(filename)) {
      return Dialog('Error', {
        title: 'Fix errors',
        description: 'Invalid URL'
      });
    }

    if (method !== METHOD_URL && !filename) {
      return Dialog('Error', {
        title: 'Fix errors',
        description: 'Missing file'
      });
    }

    if (!intRegex.test(size)) {
      return Dialog('Error', {
        title: 'Fix errors',
        description: 'Invalid size'
      });
    }

    const ref = setInterval(() => {
      const { progress } = this.state;
      this.setState({ progress: progress < 100 ? progress + 1 : 1 });
      if (progress > 99) {
        this.setState({ progress: 0 });
      }
    }, 100);

    favico(filename, undefined, `${size}x${size}`)
      .then(() => {
        clearInterval(ref);
        this.setState({ progress: 0 });
        Dialog('Message', {
          title: 'Success',
          description: 'File saved as favico.ico'
        });
      })
      .catch(() => {
        clearInterval(ref);
        this.setState({ progress: 0 });
        Dialog('Error', {
          title: 'An error ocurred',
          description:
            method !== METHOD_URL
              ? "Try to open program from another directory or there's enough free space"
              : 'Check if the URL exists'
        });
      });
  }

  render() {
    const { progress = 0, size = 160 } = this.state;
    return (
      <Box padded={true}>
        <Form stretchy={false} padded>
          <StyledText style={{ fontWeight: 'bold' }} stretchy={false}>
            Select an image
          </StyledText>
          <TextInput label="From URL" onChange={this.handleChangeURL} />
          <Button onClick={this.handleChooseFile}>From file</Button>
          <TextInput label="Size" onChange={this.handleChangeSize}>
            {size.toString()}
          </TextInput>
        </Form>
        <Separator stretchy={false} />
        <Button onClick={this.handleClick} stretchy={false}>
          Do it
        </Button>
        <ProgressBar
          value={progress}
          visible={progress > 0 && progress < 100}
        />
      </Box>
    );
  }
}

export default Main;
