import {Component} from 'react'
import {Button, Modal, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

class MovieCard extends Component {
  state = {imageUrl: '', squareImageUrl: '', show: false}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {data} = this.props
    const {title} = data
    const response = await fetch(
      `https://ui-avatars.com/api/?rounded=true&length=2&name=${title}`,
    )
    const response1 = await fetch(
      `https://ui-avatars.com/api/?length=2&name=${title}`,
    )

    this.setState({squareImageUrl: response1.url, imageUrl: response.url})
  }

  render() {
    const {imageUrl, squareImageUrl} = this.state
    const {data} = this.props
    const {title, uuid, description, genres} = data
    const {show} = this.state
    const handleClose = () => this.setState({show: false})
    const handleShow = () => this.setState({show: true})

    return (
      <Col
        xs={12}
        md={4}
        key={uuid}
        className="w-30 h-50 d-inline-block movie-card"
      >
        <button
          className="movie-card-button"
          type="button"
          onClick={handleShow}
        >
          <div>
            <img className="avatar-img" src={imageUrl} alt="avatar" />
            <h1 className="main-heading">{title}</h1>
            <p className="genre">
              <i>{genres.split(',').map(item => `${item} `)}</i>
            </p>
            <p className="description">{description.substring(0, 100)}</p>
          </div>
        </button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <img src={squareImageUrl} alt="logo" />
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <i>{genres.split(',').map(item => `${item} `)}</i>
            </div>
            {description}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    )
  }
}
export default MovieCard
