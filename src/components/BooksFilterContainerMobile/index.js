import './index.css'

import {Component} from 'react'

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

class BooksFilterContainerMobile extends Component {
  state = {activeId: bookshelvesList[0].value}

  filterClicked = event => {
    const {onClickShelf} = this.props
    console.log(event.target.innerText)
    onClickShelf(event.target.value, event.target.innerText)

    this.setState({activeId: event.target.value})
  }

  render() {
    const {activeId} = this.state

    return (
      <div className="filter-container-mobile">
        <p className="title-name">Bookshelves</p>
        <ul className="filter-list-mobile">
          {bookshelvesList.map(each => {
            const activeBtn = activeId === each.value ? 'active-mobile' : ''
            return (
              <li className="list-item-mobile" key={each.id}>
                <button
                  type="button"
                  value={each.value}
                  onClick={this.filterClicked}
                  className={`${activeBtn} filter-button-mobile `}
                >
                  {each.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
export default BooksFilterContainerMobile
