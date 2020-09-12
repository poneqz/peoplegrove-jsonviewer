import React, { Component } from "react";
import "./index.scss";

class JsonInput extends Component {
  state = {
    value: "",
    error: "",
    hasError: false,
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = this.state;
    const isJson = this.isJSON(value);
    if (!isJson) return;
    const json = JSON.parse(value);
    this.props.onSubmit(json);
  };

  isJSON = (str) => {
    try {
      this.setState({ hasError: false });
      return JSON.parse(str) && !!str;
    } catch (e) {
      this.setState({ error: `JSON Parse Error: ${e}`, hasError: true });
      return false;
    }
  };

  render() {
    const { error, hasError } = this.state;
    return (
      <form className={"json-input__form"} onSubmit={this.handleSubmit}>
        <textarea
          value={this.state.value}
          onChange={this.handleChange}
          rows={30}
        />
        {hasError ? <p className={"json-input__form-error"}>{error}</p> : null}
        <input
          className={"json-input__form-button"}
          type="submit"
          value="Format"
        />
      </form>
    );
  }
}

export default JsonInput;
