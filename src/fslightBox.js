import React, { Component } from "react";
import "./App.css";
import * as request from "superagent";
import { url } from "./constants";
import { Button } from "@material-ui/core";
import FsLightbox from "fslightbox-react";

export default class App extends Component {
  // declared the state to storethe fetched photos from unsplash API.
  state = {
    photos: [],
    imagesLightBox: [],
    toggler: false,
    index: 0
  };
  componentDidMount() {
    // Using GET method getting the photos from unsplash API.
    request.get(url).then(image => {
      this.setState({
        // photos: image.body,
        photos: image.body.map(item =>{
         return item.urls.regular
        })
      });
    });
  }
  //onLoadMore arrow function to load more photos
  onLoadMore = () => {
    //requesting unsplash API
    request.get(url).then(image => {
      //setstate by doing spread operator
      this.setState({
        // photos: [...this.state.photos, ...image.body],
        photos: [...this.state.photos, ...image.body.map(item => {
          return item.urls.regular
        })]
      });
    });
  };
  lightBoxActive = index => {
    this.setState({
      toggler: !this.state.toggler,
      index: index
    });
  };
  render() {
    return (
      <div className="App">
        <h1>My Gallery</h1>
        {/* If there is no photos available display loading otherwise display photos  */}
        {!this.state.photos && "Loading..."}
        {this.state.photos && (
          <div>
            <ul className="grid-image-container">
              {this.state.photos.map((photo, index) => (
                <div>
                <img
                  src={photo}
                  onClick={() => this.lightBoxActive(index)}
                  alt={"hello"}
                  className="grid-image-item"
                />
                   <FsLightbox
              toggler={this.state.toggler}
              sources={this.state.photos}
              key={this.state.index}
            />
            </div>
              ))}
            </ul>
            {console.log("checking photos array", this.state.photos)}
            {/* <FsLightbox
              toggler={this.state.toggler}
              sources={this.state.photos[this.state.index]}
              key={this.state.index}
            /> */}
          </div>
        )}
        {/* {console.log("checking photos array", this.state.photos)}
        <div>
        
            </div> */}
        {/* button to load more photos on click event */}

        <div>
          <Button variant="contained" color="primary" onClick={this.onLoadMore}>
            Load More
          </Button>
        </div>
      </div>
    );
  }
}
