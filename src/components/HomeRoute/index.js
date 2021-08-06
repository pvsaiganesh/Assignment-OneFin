import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Container, Row, Button} from 'react-bootstrap'
import Cookies from 'js-cookie'
import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import './index.css'

class Home extends Component {
  state = {
    currentPage: [],
    pageNumber: 1,
    cannotLoad: false,
    currentUrl: 'https://demo.credy.in/api/v1/maya/movies/',
    results: [],
    currentResults: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const token = Cookies.get('sessionToken')
    const currentUrlFromLocal = localStorage.getItem('url')
    const currentPageNumber = localStorage.getItem('pageNo')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(currentUrlFromLocal, options)
    const totalData = await response.json()
    if (response.ok === true) {
      this.setState({
        currentPage: totalData,
        cannotLoad: false,
        pageNumber: parseInt(currentPageNumber, 10),
        results: totalData.results,
        currentResults: totalData.results,
      })
    } else {
      this.setState({cannotLoad: true})
    }
  }

  getNextPage = async () => {
    const {currentPage} = this.state
    if (!(currentPage.next === null)) {
      const token = Cookies.get('sessionToken')
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
      const response = await fetch(currentPage.next, options)
      const totalNextData = await response.json()
      if (response.ok === true) {
        this.setState(prevState => ({
          currentPage: totalNextData,
          cannotLoad: false,
          pageNumber: prevState.pageNumber + 1,
          currentUrl: currentPage.next,
          results: totalNextData.results,
          currentResults: totalNextData.results,
        }))
      } else {
        this.setState({cannotLoad: true})
      }
    }
  }

  getPreviousPage = async () => {
    const {currentPage} = this.state
    if (!(currentPage.previous === null)) {
      const token = Cookies.get('sessionToken')
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Token <${token}>`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
      const response = await fetch(currentPage.previous, options)
      const totalPreviousData = await response.json()

      if (response.ok === true) {
        this.setState(prevState => ({
          currentPage: totalPreviousData,
          cannotLoad: false,
          pageNumber: prevState.pageNumber - 1,
          currentUrl: currentPage.previous,
          results: totalPreviousData.results,
          currentResults: totalPreviousData.results,
        }))
      } else {
        this.setState({cannotLoad: true})
      }
    }
  }

  onClickReload = () => {
    const {currentUrl, pageNumber} = this.state
    localStorage.setItem('url', currentUrl)
    localStorage.setItem('pageNo', pageNumber)
    window.location.reload()
  }

  filterResults = e => {
    const {results} = this.state
    if (e.target.value.length >= 3) {
      const filteredResults = results.filter(item =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      this.setState({currentResults: filteredResults})
    } else {
      this.setState({currentResults: results})
    }
  }

  render() {
    const {currentPage, cannotLoad, pageNumber, currentResults} = this.state
    const token = Cookies.get('sessionToken')

    if (token === undefined) {
      return <Redirect to="/login" />
    }

    if (cannotLoad === true || currentResults === [] || currentPage === []) {
      return (
        <div>
          <NavBar />
          <div className="text-center">
            <h1>Connection Failed! Please Refresh </h1>
            <Button onClick={this.onClickReload} variant="secondary">
              Refresh
            </Button>
          </div>
        </div>
      )
    }
    return (
      <div>
        <NavBar />
        <div className="text-center">
          <input
            placeholder="Search In Current Page"
            type="search"
            onChange={this.filterResults}
          />
        </div>
        <div className="text-center">
          Count: <strong>{currentPage.count}</strong>
        </div>
        <p className="text-center">
          Page : <strong>{pageNumber > 0 ? pageNumber : 1}</strong>
        </p>
        <div className="button-container">
          <Button
            variant="primary"
            className="btn"
            onClick={this.getPreviousPage}
            type="button"
          >
            Previous
          </Button>
          <Button
            variant="primary"
            className="btn"
            onClick={this.getNextPage}
            type="button"
          >
            Next
          </Button>
        </div>
        <Container fluid>
          <Row>
            {currentResults.map(item => (
              <MovieCard key={item.uuid} data={item} />
            ))}
          </Row>
        </Container>
      </div>
    )
  }
}
export default Home
