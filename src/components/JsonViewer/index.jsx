import React, { PureComponent } from "react";
import "./index.scss";

class JsonViewer extends PureComponent {
  processObject = (object) =>
    Object.keys(object).map((key, reactKey) => {
      if (object[key] === null) {
        object[key] = "NULL";
      }
      const displayKey = !this.isArray(object[key]) ? key : `${key} []`;
      return (
        <li key={key + reactKey} className={"parent"}>
          {this.buildNode(displayKey)}
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

  buildNode = (key) => {
    return (
      <span
        className="node"
        onClick={(e) => {
          this.toggle(e);
        }}
      >
        {key}
      </span>
    );
  };

  buildLeaf = (value) => (
    <li
      className="leaf"
      onClick={
        // tslint:disable-next-line:no-empty
        () => {}
      }
    >
      {value}
    </li>
  );

  toggle = (event) => {
    event.target.parentElement
      .querySelector(".nested")
      .classList.toggle("active");
    event.target.classList.toggle("node-down");
  };

  render() {
    const { data } = this.props;
    return (
      <>
        <ul id="JsonViewer">{this.processObject(data)}</ul>
      </>
    );
  }
}

export default JsonViewer;
