import './index.css'
import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const BookItem = props => {
  const {each} = props
  const {coverPic, id, title, authorName, rating, readStatus} = each
  return (
    <Link to={`/book-hub/books/${id}`} className="link">
      <li className="book-item-container">
        <img src={coverPic} alt={title} className="cover-pic" />
        <div className="book-item-details">
          <p className="book-name">{title}</p>
          <p className="book-author">{authorName}</p>
          <p className="book-rating">
            Avg rating
            <BsFillStarFill className="star" />
            {rating}
          </p>
          <p className="book-status">Status: {readStatus}</p>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
