import React from 'react';
import Create from './Create';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAllItems: [],
      toggle: true
    }

    this.showCreateItem = this.showCreateItem.bind(this);
  }

  showCreateItem() {
    this.setState({
      toggle: false
    })
  }

  hideCreateItem() {
    this.setState({
      toggle: true
    })
  }

  componentDidMount() {
    fetch('/api/items', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
      .then(showAllItems => this.setState({showAllItems}));
  }

  render() {
    var list = this.state.showAllItems.map(function(items, i) {
      return (
        <tr key={i}>
          <td key={items.itemName}>{items.itemName}</td>
          <td key={items.size}>{items.size}</td>
          <td key={items.color}>{items.color}</td>
          <td key={items.price}>{items.price}</td>
        </tr>
      );
    })

    return (
      <div>
        <div>
          <p>List Item</p>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Color</th>
                <th>Price</th>
              </tr>
              {list}
            </tbody>
          </table>
        </div>
        <button onClick={this.showCreateItem}>Create new</button>
        {this.state.toggle == false && <Create/>}
      </div>
    );
  }
}

export default List;
