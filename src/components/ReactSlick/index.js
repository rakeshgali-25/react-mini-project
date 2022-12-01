import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {Link} from 'react-router-dom'
import './index.css'

const ReactSlick = props => {
  const {booksList, booksNum} = props
  const settings = {
    dots: false,
    slidesToShow: booksNum,
    slidesToScroll: 1,
    dotsClass: 'slick-buttons',
  }
  return (
    <ul className="slider-container">
      <Slider {...settings} className="slider">
        {booksList.map(each => (
          <Link to={`/book-hub/books/${each.id}`} className="link">
            <li className="top-rated-list-item" key={each.id}>
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
            </li>
          </Link>
        ))}
      </Slider>
    </ul>
  )
}

export default ReactSlick
