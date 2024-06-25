import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

class AddTodo extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      date: "",
      due: null
    };
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value,
      date: Date().toLocaleString('en-US')
    });
  };

  handleDateChange = (event) => {
    this.setState({
      due: new Date(event).toLocaleDateString()
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.content.trim()) {
      this.props.addTodo(this.state);
      this.setState({
        content: "",
        date: "",
        due: null
      });
    }
  };

  render() {
    return (
      <div>
        <TextField
          label="Add New Item"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.content}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>         
          <DesktopDatePicker
            id="new-item-date"
            label="Due Date"
            value={this.state.due}
            onChange={this.handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <button
  className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root css-sghohy-MuiButtonBase-root-MuiButton-root"
  style={{ marginLeft: '10px' }}
  tabIndex="0"
  type="button"
  data-testid="new-item-button"
>
  Add
  <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root" />
</button>
      </div>
    );
  }
}

export default AddTodo;