import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import BooksFilterContainer from '../BooksFilterContainer'
import BookItem from '../BookItem'

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
    searchInput: '',
  }

  componentDidMount() {
    this.getTheData()
  }

  getTheData = async () => {
    const {shelf} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
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
  }

  renderLoading = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onClickShelf = value => {
    this.setState({shelf: value}, this.getTheData)
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

  renderFailure = () => {
    console.log('failed')
  }

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
    return (
      <div className="bookshelves-container">
        <Header />
        <div className="bookshelves-content">
          <BooksFilterContainer onClickShelf={this.onClickShelf} />
          <div className="books-list-container">
            <div className="top-search-container">
              <p className="title-name">All Books</p>
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                />
                <div className="search-icon">
                  <BsSearch />
                </div>
              </div>
            </div>

            {this.renderTheBooks()}
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelves
