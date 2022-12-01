import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header'
import BooksFilterContainer from '../BooksFilterContainer'
import BooksFilterContainerMobile from '../BooksFilterContainerMobile'
import BookItem from '../BookItem'

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

const apiConstants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Bookshelves extends Component {
  state = {
    apiStatus: apiConstants.initial,
    booksList: [],
    shelf: 'ALL',
    label: bookshelvesList[0].label,
    searchInput: '',
  }

  componentDidMount() {
    this.getTheData()
  }

  getTheData = async () => {
    this.setState({apiStatus: apiConstants.inprogress})
    const {shelf, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${searchInput}`
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
      const updatedData = data.books.map(each => ({
        id: each.id,
        coverPic: each.cover_pic,
        title: each.title,
        authorName: each.author_name,
        rating: each.rating,
        readStatus: each.read_status,
      }))
      this.setState({apiStatus: apiConstants.success, booksList: updatedData})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickTryAgain = () => {
    this.getTheData()
  }

  renderLoading = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onClickShelf = (value, label) => {
    this.setState({shelf: value, label}, this.getTheData)
  }

  onChangeSearchInput = event => {
    if (event.target.value === '') {
      this.getTheData()
    }
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getTheData()
  }

  renderSuccess = () => {
    const {booksList} = this.state
    return (
      <ul className="books-ul-list-container">
        {booksList.map(each => (
          <BookItem each={each} key={each.id} />
        ))}
      </ul>
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

  renderTheBooks = () => {
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
    const {label, searchInput} = this.state

    return (
      <div className="bookshelves-container">
        <Header />
        <div className="bookshelves-content">
          <BooksFilterContainer onClickShelf={this.onClickShelf} />
          <div className="books-list-container">
            <div className="top-search-container">
              <p className="title-name-header">{label} Books</p>
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
                <div className="search-icon">
                  <button
                    type="button"
                    className="search-button"
                    onClick={this.onClickSearch}
                  >
                    <BsSearch />
                  </button>
                </div>
              </div>
            </div>
            <BooksFilterContainerMobile onClickShelf={this.onClickShelf} />
            {this.renderTheBooks()}
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
        </div>
      </div>
    )
  }
}

export default Bookshelves
