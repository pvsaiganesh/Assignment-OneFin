import {Component} from 'react'
import List, {ItemDragging} from 'devextreme-react/list'
import './styles.css'

class AdminUI extends Component {
  constructor() {
    super()
    this.state = {listData: []}
    this.onDragStart = this.onDragStart.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.onReorder = this.onReorder.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  onDragStart(e) {
    e.itemData = this.state[e.fromData][e.fromIndex]
  }

  onAdd(e) {
    const tasks = this.state[e.toData]
    this.setState({
      [e.toData]: [
        ...tasks.slice(0, e.toIndex),
        e.itemData,
        ...tasks.slice(e.toIndex),
      ],
    })
  }

  onRemove(e) {
    const tasks = this.state[e.fromData]
    this.setState({
      [e.fromData]: [
        ...tasks.slice(0, e.fromIndex),
        ...tasks.slice(e.fromIndex + 1),
      ],
    })
  }

  onReorder(e) {
    this.onRemove(e)
    this.onAdd(e)
  }

  getData = async () => {
    const response = await fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
    )
    const data = await response.json()
    this.setState({listData: data})
  }

  render() {
    const {listData} = this.state
    return (
      <div className="widget-container">
        <List items={listData} keyExpr="id" repaintChangesOnly="true">
          <ItemDragging
            allowReordering="true"
            group="tasks"
            data="Tasks"
            onDragStart={this.onDragStart}
            onAdd={this.onAdd}
            onRemove={this.onRemove}
            onReorder={this.onReorder}
          />
        </List>
      </div>
    )
  }
}
export default AdminUI
