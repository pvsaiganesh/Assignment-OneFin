import {Component} from 'react'
import {FaEdit} from 'react-icons/fa'
import {AiOutlineDelete} from 'react-icons/ai'
import './styles.css'

class AdminUI extends Component {
  state = {
    listData: [],
    currentData: [],
    checkedIds: [],
    editingId: null,
    showInput: false,
    toggleCheckboxes: false,
    inputNameValue: '',
    inputRoleValue: '',
    inputEmailValue: '',
    value: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
    )
    const data = await response.json()
    console.log(data)
    this.setState({listData: data, currentData: data}, this.renderData)
  }

  deleteRow = id => {
    const {currentData} = this.state
    const filteredData = currentData.filter(item => id !== item.id)
    console.log(filteredData)
    this.setState({currentData: filteredData}, this.renderData)
  }

  renderSearch = () => (
    <input
      placeholder="Search by name,email or role"
      className="search-input"
      onChange={this.searchValue}
    />
  )

  searchValue = e => {
    if (e.target.value !== '') {
      this.setState({value: e.target.value}, this.filterRows)
    }
  }

  filterRows = () => {
    const {value, listData} = this.state
    const filteredData = listData.filter(
      item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.role.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase()),
    )
    this.setState({currentData: filteredData})
  }

  editRow = () => {
    const {
      currentData,
      editingId,
      inputRoleValue,
      inputEmailValue,
      inputNameValue,
    } = this.state
    const editedData = currentData.map(item => {
      if (editingId === item.id) {
        return {
          id: item.id,
          name: inputNameValue,
          email: inputEmailValue,
          role: inputRoleValue,
        }
      }
      return item
    })
    this.setState({currentData: editedData})
  }

  selectOrDeselectAllRows = event => {
    if (event.checked === true) {
      this.setState(() => ({toggleCheckboxes: true}), this.renderData)
    } else {
      this.setState(() => ({toggleCheckboxes: false}), this.renderData)
    }
  }

  deleteSelectedRows = () => {
    const {checkedIds, currentData} = this.state
    const filteredData = currentData.filter(
      item => !checkedIds.includes(item.id),
    )
    console.log(filteredData)
    this.setState({currentData: filteredData, checkedIds: []}, this.renderData)
  }

  renderData = () => {
    const {currentData, showInput, editingId, toggleCheckboxes} = this.state
    return (
      <table className="table">
        <thead>
          <tr>
            <th>
              <input onChange={this.selectOrDeselectAllRows} type="checkbox" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        {currentData.map(item => {
          const {id} = item
          const {name, email, role} = item
          const getId = () => {
            this.deleteRow(id)
          }
          const getNameInputValue = e => {
            this.setState({inputNameValue: e.target.value}, this.editRow)
          }
          const getEmailInputValue = e => {
            this.setState({inputEmailValue: e.target.value}, this.editRow)
          }

          const getRoleInputValue = e => {
            if (e.key === 'Enter') {
              this.setState(
                {showInput: false, inputRoleValue: e.target.value},
                this.editRow,
              )
            }
          }

          const getCheckedValue = e => {
            const {checkedIds} = this.state
            if (e.target.checked) {
              checkedIds.push(id)
            }
            this.setState({checkedIds}, this.renderData)
          }

          const edit = () => {
            this.setState(prev => ({
              showInput: !prev.showInput,
              editingId: id,
            }))
          }
          if (editingId === id) {
            return (
              <tbody>
                {showInput ? (
                  <tr key={id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input onChange={getNameInputValue} />
                    </td>
                    <td>
                      <input onChange={getEmailInputValue} />
                    </td>
                    <td>
                      <input onKeyDown={getRoleInputValue} />
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{role}</td>
                    <td>
                      <FaEdit onClick={edit} />
                      <AiOutlineDelete
                        onClick={getId}
                        className="delete-icon"
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            )
          }
          return (
            <tbody>
              <tr>
                <td>
                  <input
                    onClick={getCheckedValue}
                    name="row-checkbox"
                    type="checkbox"
                  />
                </td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{role}</td>
                <td>
                  <FaEdit className="edit-icon" onClick={edit} />
                  <AiOutlineDelete onClick={getId} className="delete-icon" />
                </td>
              </tr>
            </tbody>
          )
        })}
      </table>
    )
  }

  render() {
    return (
      <div className="bg">
        <div>{this.renderSearch()}</div>
        <div>{this.renderData()}</div>
        <div>
          <button
            onClick={this.deleteSelectedRows}
            type="button"
            className="btn"
          >
            Delete Selected
          </button>
        </div>
      </div>
    )
  }
}
export default AdminUI
