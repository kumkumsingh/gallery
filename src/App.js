import React, { Component } from "react";
import "./App.css";
import * as request from "superagent";
import { url } from "./constants";

export default class App extends Component {
  state = {
    photos: []
  };
  componentDidMount() {
    request.get(url).then(item => {
      this.setState({
        photos: item.body
      });
      console.log("results fromstate", this.state.photos[0].urls);
    });
  }
  render() {
    return (
      <div>
        <h1>My Gallery</h1>
        {!this.state.photos && "Loading..."}
        {this.state.photos && (
          <ul>
            {this.state.photos.map(photo => (
              <img key={photo.id} src={photo.urls.regular} alt="Dog" />
            ))}
          </ul>
        )}
      </div>
    );
  }
}
