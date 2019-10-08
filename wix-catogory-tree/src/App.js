import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.addTreeItem = this.addTreeItem.bind(this);
    this.generateNodesRecursive = this.generateNodesRecursive.bind(this);
    this.generateNodesIterative = this.generateNodesIterative.bind(this);
    this.switchNode = this.switchNode.bind(this);
    this.saveNew = this.saveNew.bind(this);

    this.state = {
      mode: "recursive",
      dataTree: [{ Name: "one", Children: [{ Name: "one-1", Children: [{ Name: "one-1-1", Children: [] }] }] }],
      addingInProgress: false,
      addingForParent: null
    };
  }

  addTreeItem(dataTreeItem) {
    this.setState({ addingInProgress: true, addingForParent: dataTreeItem });
  }

  saveNew() {

  }

  generateNodesIterative() {
    return [];
  }

  generateNodesRecursive(dataTree) {
    let result = [];

    dataTree.forEach(dataTreeItem => {
      result.push(
        <div key={this.uuidv4()}>
          <button onClick={(e) => this.addTreeItem(dataTreeItem, e)}> Add Child </button>
          {dataTreeItem.Name}
          <div className="child" key={this.uuidv4()}>
            {
              dataTreeItem.Children && this.generateNodesRecursive(dataTreeItem.Children)
            }
          </div>
        </div>);
    });

    return result;
  }

  switchNode() {
    this.setState({ mode: this.state.mode === "recursive" ? "iterative" : "recursive" });
  }

  render() {
    let nodesTree;

    if (this.state.mode === "recursive") {
      nodesTree = this.generateNodesRecursive(this.state.dataTree);
    } else {
      nodesTree = this.generateNodesIterative(this.state.dataTree);
    }

    return (
      <div className="App">
        {this.state.addingInProgress && <div key={this.uuidv4()} >
          <input placeholder="Name" />
          <button onClick={this.saveNew}> Save </button>
        </div>}
        Mode - {this.state.mode}
        <button onClick={this.switchNode} >Switch Mode</button>
        <div>Category Tree</div>
        {nodesTree}
      </div>
    );
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

export default App;
