import {Component} from 'react'
import './styles.css'

class AdminUI extends Component {
  state = {listData: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
    )
    const data = await response.json()
    console.log(data)
    this.setState({listData: data}, this.renderData)
  }

  renderData = () => {
    const {listData} = this.state
    return (
      <table>
        <thead>
          <th>name</th>
          <th>email</th>
          <th>role</th>
        </thead>
        <tbody>
          {listData.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render() {
    return <div>{this.renderData()}</div>
  }
}
export default AdminUI
