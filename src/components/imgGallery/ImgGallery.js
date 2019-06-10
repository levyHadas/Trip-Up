import React, { Component } from 'react'

import './ImgGallery.scss'

class ImgGallery extends Component {
    
    state = {imgs:[], currImgIdx:0}

    componentDidMount() {
        this.setState({currImgIdx:0})
    }

    nextImg = () => {
        var nextIdx
        if (this.state.currImgIdx === this.props.imgs.length-1) nextIdx = 0
        else nextIdx = this.state.currImgIdx + 1
        this.setState({currImgIdx:nextIdx})
    }
    prevImg = () => {
        var prevtIdx
        if (!this.state.currImgIdx) prevtIdx = this.props.imgs.length-1
        else  prevtIdx = this.state.currImgIdx - 1
        this.setState({currImgIdx:prevtIdx})
    }

    render() {
        if (this.props.imgs) var imgSrc = this.props.imgs[this.state.currImgIdx]
        return (
            <section className="img-gallery">
            {imgSrc &&  <div className="gallery-container flex">
                <img className="trip-img" src={imgSrc} alt="Trip"/>
                {this.props.imgs.length > 1 &&
                <i className="fas fa-chevron-right next-img" onClick={this.nextImg}></i>}
                {this.props.imgs.length > 1 &&
                <i className="fas fa-chevron-left prev-img" onClick={this.prevImg}></i>}
            </div>}
        </section>
        )
    }
        
   
}

export default ImgGallery