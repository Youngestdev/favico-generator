import React, { Component } from 'react';
import {
  Box,
  Button,
  Dialog,
  Form,
  ProgressBar,
  Separator,
  StyledText,
  TextInput
} from 'proton-native';

class Main extends Component {
  constructor() {
    super();
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChooseFile = this.handleChooseFile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      filename: '',
      progress: 0
    };
  }

  handleChangeInput(filename) {
    this.setState({ filename });
  }

  handleChooseFile() {
    const filename = Dialog('Open');
    this.setState({ filename });
  }

  handleClick() {
    const ref = setInterval(() => {
      const { progress } = this.state;
      this.setState({ progress: progress < 100 ? progress + 1 : 1 });
      if (progress > 99) {
        this.setState({ progress: 0 });
        clearInterval(ref);
      }
    }, 100);
  }

  render() {
    const { progress } = this.state;
    return (
      <Box padded={true}>
        <Form stretchy={false} padded>
          <StyledText style={{ fontWeight: 'bold' }} stretchy={false}>
            Select an image
          </StyledText>
          <TextInput label="From URL" onChange={this.handleChangeInput} />
          <Button onClick={this.handleChooseFile}>From file</Button>
        </Form>
        <Separator stretchy={false} />
        <Button onClick={this.handleClick} stretchy={false}>
          Do it
        </Button>
        <ProgressBar
          value={this.state.progress}
          visible={progress > 0 && progress < 100}
        />
      </Box>
    );
  }
}

export default Main;
