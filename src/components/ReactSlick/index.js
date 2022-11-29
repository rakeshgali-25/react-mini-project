import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const ReactSlick = props => {
  const {booksList} = props
  const settings = {
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    dotsClass: 'slick-buttons',
  }
  return (
    <div className="slider-container">
      <Slider {...settings} className="slider">
        {booksList.map(each => (
          <div className="top-rated-list-item">
            <div className="image-container">
              <img
                src={each.coverPic}
                alt={each.title}
                key={each.id}
                className="top-rated-image"
              />
            </div>
            <p className="title-name">{each.title}</p>
            <p className="author-name">{each.authorName}</p>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ReactSlick
