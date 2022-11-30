import './index.css'
import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

const apiConstants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {apiStatus: apiConstants.initial, booksDetails: {}}

  componentDidMount() {
    this.getTheData()
  }

  getTheData = async () => {
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
    const data = await response.json()
    console.log(data)
  }

  render() {
    const {match} = this.props
    return (
      <div>
        <Header />
      </div>
    )
  }
}

export default BookDetails
