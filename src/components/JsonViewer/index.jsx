import React, { PureComponent } from "react";
import "./index.scss";

class JsonViewer extends PureComponent {
  processObject = (object) =>
    Object.keys(object).map((key, reactKey) => {
      if (object[key] === null) {
        object[key] = "NULL";
      }
      return (
        <li key={key + reactKey} className={"parent"}>
          {this.buildNode(key, object[key])}
          <ul className="nested">
            {this.isPrimative(object[key])
              ? this.buildLeaf(object[key])
              : this.isArray(object[key])
              ? this.loopArray(object[key])
              : this.processObject(object[key])}
          </ul>
        </li>
      );
    });

  loopArray = (array) =>
    array.map((value, key) => (
      <div key={key}>
        {this.isPrimative(value)
          ? this.buildLeaf(value)
          : this.isArray(value)
          ? this.loopArray(value)
          : this.processObject(value)}
      </div>
    ));

  isArray = (value) => Array.isArray(value);

  isPrimative = (value) => {
    return (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    );
  };

  getType = (input) => {
    return typeof input === "string"
      ? "string"
      : typeof input === "number"
      ? "number"
      : typeof input === "boolean"
      ? "boolean"
      : this.isArray(input)
      ? "array"
      : "object";
  };

  buildNode = (key, value) => {
    return (
      <span
        className="node"
        onClick={(e) => {
          this.toggle(e);
        }}
      >
        {key} : <b> [{this.getType(value)}] </b>
      </span>
    );
  };

  buildLeaf = (value) => (
    <li className="leaf" onClick={() => {}}>
      {typeof value === "boolean" ? (value === true ? `true` : `false`) : value}
    </li>
  );

  toggle = (event) => {
    event.target.parentElement
      .querySelector(".nested")
      .classList.toggle("active");
    event.target.classList.toggle("node-down");
  };

  isEmptyObject = (value) => {
    return Object.keys(value).length === 0 && value.constructor === Object;
  };

  greenStyle = { color: "#2ecc71" };

  render() {
    const { data } = this.props;
    return (
      <div className="JsonViewer__container">
        <button
          onClick={() =>
            navigator.clipboard.writeText(JSON.stringify(data, undefined, 4))
          }
        >
          Copy to Clipboard
        </button>
        {!this.isEmptyObject(data) ? (
          <ul id="JsonViewer">
            {" "}
            <li style={this.greenStyle}> {"{"} </li> {this.processObject(data)}{" "}
            <li style={this.greenStyle}> {"}"} </li>{" "}
          </ul>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default JsonViewer;
