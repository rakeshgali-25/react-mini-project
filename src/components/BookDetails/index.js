import './index.css'
import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header'

const apiConstants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class BookDetails extends Component {
  state = {apiStatus: apiConstants.initial, booksDetails: {}}

  componentDidMount() {
    this.getTheData()
  }

  getTheData = async () => {
    this.setState({apiStatus: apiConstants.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        id: data.book_details.id,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      this.setState({
        booksDetails: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccess = () => {
    const {booksDetails} = this.state
    console.log(booksDetails)
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      id,
      rating,
      readStatus,
      title,
    } = booksDetails

    return (
      <>
        <div className="book-details-content-desktop">
          <div className="book-details-top">
            <img
              src={coverPic}
              alt={title}
              className="book-details-cover-pic"
            />
            <div className="book-details">
              <p className="book-details-name">{title}</p>
              <p className="book-details-author">{authorName}</p>
              <p className="book-details-rating">
                Avg rating
                <BsFillStarFill className="star" />
                {rating}
              </p>
              <p className="book-details-status">
                Status: <label className="label">{readStatus}</label>
              </p>
            </div>
          </div>
          <hr className="line" />
          <div className="about-author-container">
            <p className="about-author-heading">About Author</p>
            <p className="about-author-para">{aboutAuthor}</p>
          </div>
          <div className="about-author-container">
            <p className="about-author-heading">About Book</p>
            <p className="about-author-para">{aboutBook}</p>
          </div>
        </div>
        <div className="book-details-content-mobile">
          <div className="book-details-mobile-top">
            <img
              src={coverPic}
              alt={title}
              className="book-details-cover-pic"
            />

            <p className="book-name">{title}</p>
            <p className="book-author">{authorName}</p>
            <p className="book-rating">
              Avg rating
              <BsFillStarFill className="star" />
              {rating}
            </p>
            <p className="book-status">
              Status: <label className="label">{readStatus}</label>
            </p>
            <hr className="line" />
          </div>
          <div className="about-author-container">
            <p className="about-author-heading">About Author</p>
            <p className="about-author-para">{aboutAuthor}</p>
          </div>
          <div className="about-author-container">
            <p className="about-author-heading">About Book</p>
            <p className="about-author-para">{aboutBook}</p>
          </div>
        </div>
      </>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/meetup/not-found-img.png"
        alt="failure view"
        className="failure-img"
      />
      <p>Something went wrong. Please try again</p>
      <button
        type="button"
        onClick={this.onClickTryAgain}
        className="try-again-button"
      >
        Try again
      </button>
    </div>
  )

  renderBookDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'INPROGRESS':
        return this.renderLoading()
      case 'SUCCESS':
        return this.renderSuccess()
      case 'FAILURE':
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {match} = this.props
    return (
      <div className="book-details-container">
        <Header />
        {this.renderBookDetails()}
        <div className="footer-container">
          <div className="icons-container">
            <FaGoogle />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
          <p>Contact us</p>
        </div>
      </div>
    )
  }
}

export default BookDetails
