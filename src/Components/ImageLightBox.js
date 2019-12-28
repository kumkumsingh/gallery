import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox';

export default class ImageLightBox extends Component {
  render() {
    if(!this.props.images) return 'Loading'
    return (
      <div>
        
        {this.props.isOpen && (
          <Lightbox
            mainSrc={this.props.images[this.props.photoIndex]}
            nextSrc={this.props.images[(this.props.photoIndex + 1) % this.props.images.length]}
            prevSrc={this.props.images[(this.props.photoIndex + this.props.images.length - 1) % this.props.images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (this.props.photoIndex + this.props.images.length - 1) % this.props.images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (this.props.photoIndex + 1) % this.props.images.length,
              })
            }
          />
        )}
      </div>
    )
  }
}
