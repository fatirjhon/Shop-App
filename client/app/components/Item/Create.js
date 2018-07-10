import React from 'react';

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      addItemError: "",
      addItemName: "",
      addItemSize: "",
      addItemColor: "",
      addItemPrice: ""
    }

    this.onTextboxChangeItemName = this.onTextboxChangeItemName.bind(this);
    this.onTextboxChangeItemSize = this.onTextboxChangeItemSize.bind(this);
    this.onTextboxChangeItemColor = this.onTextboxChangeItemColor.bind(this);
    this.onTextboxChangeItemPrice = this.onTextboxChangeItemPrice.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
  }

  onTextboxChangeItemName(event) {
    this.setState({
      addItemName: event.target.value
    });
  }

  onTextboxChangeItemSize(event) {
    this.setState({
      addItemSize: event.target.value
    });
  }

  onTextboxChangeItemColor(event) {
    this.setState({
      addItemColor: event.target.value
    });
  }

  onTextboxChangeItemPrice(event) {
    this.setState({
      addItemPrice: event.target.value
    });
  }

  onAddItem() {
    const {
      addItemName,
      addItemSize,
      addItemColor,
      addItemPrice
    } = this.state;

    this.setState({
      isLoading: true
    });

    fetch('/api/item/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        itemName: addItemName,
        size: addItemSize,
        color: addItemColor,
        price: addItemPrice
      })
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            addItemError: json.message,
            isLoading: false,
            addItemName: '',
            addItemSize: '',
            addItemColor: '',
            addItemPrice: ''
          });
        } else {
          this.setState({
            addItemError: json.message,
            isLoading: false,
          });
        }
      });
  }

  render() {
    const {
      isLoading,
      addItemError,
      addItemName,
      addItemSize,
      addItemColor,
      addItemPrice
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    return (
      <div>
        <div>
          <form>
            {
              (addItemError) ? (
                <p>{addItemError}</p>
              ) : (null)
            }
            <p>Create new item</p>
            <hr className="lineHr"/>
            <label>Item Name :</label><br/>
            <input type="text" placeholder="Item name" value={addItemName} onChange={this.onTextboxChangeItemName}/><br/>
            <label>Size :</label><br/>
            <select value={addItemSize} onChange={this.onTextboxChangeItemSize}>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select><br/>
            <label>Color :</label><br/>
            <select value={addItemColor} onChange={this.onTextboxChangeItemColor}>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Yellow">Yellow</option>
              <option value="White">White</option>
              <option value="Black">Black</option>
              <option value="Green">Green</option>
              <option value="Purple">Purple</option>
            </select><br/>
            <label>Price :</label><br/>
            <input type="text" placeholder="Item price" value={addItemPrice} onChange={this.onTextboxChangeItemPrice}/><br/>
            <button onClick={this.onAddItem}>Add Item</button>
            <button onClick={this.hideCreateItem}>Done</button>
            {this.state.toggle == true && <Create/>}
          </form>
        </div>
      </div>
    )
  }
}

export default Create;
