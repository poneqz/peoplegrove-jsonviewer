import React, { Component } from "react";
import JsonInput from "../components/JsonInput/index";
import JsonViewer from "../components/JsonViewer/index";
import "../styles/json-beautifier.scss";

class JsonBeautifier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {},
    };
  }
  onJsonSubmit = (json) => {
    this.setState({ json: json });
  };

  render() {
    const { json } = this.state;
    return (
      <div className={"json-beautifier__container"}>
        <JsonInput onSubmit={(json) => this.onJsonSubmit(json)} />
        <JsonViewer data={json} />
      </div>
    );
  }
}

export default JsonBeautifier;
