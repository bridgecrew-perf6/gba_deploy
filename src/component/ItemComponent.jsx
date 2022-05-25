import React from 'react';
import ItemService from '../services/ItemService';
import decode from 'jwt-decode';

export default class ItemComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            items: []
        }

        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        ItemService.getItems().then((response) => {
            this.setState({ items: response.data })
        });
    }

    editItem(id) {
        this.props.history.push(`/update-item/${id}`);
    }

    addItem() {
        this.props.history.push('/add-items');
    }

    deleteItem(id) {
        ItemService.deleteItem(id).then(res => {
            this.setState({ items: this.state.items.filter(item => item.id !== id) });
        });
    }

    render() {
        const decodeJwt = decode(sessionStorage.getItem("access_token"));

        if(sessionStorage.getItem("isLogin") === "false"){
            this.props.history.push('/403')
          }
        
        return (
            <div className='mlr-5'>
                <div className='row-2'>

                    <h2 className="text-center mt-5">Item List</h2>
                    <div className='text-start'>
                        { decodeJwt.roles[0] ==="ROLE_ADMIN" &&
                        <button className='btn btn-primary' onClick={this.addItem}>Add Item</button>}
                    </div>
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr className='fw-bolder'>
                                <td>ID</td>
                                <td>NAME</td>
                                <td>PRICE</td>
                                {/* <td>DISCOUNT</td> */}
                                <td>DISCOUNT PERCENTAGE</td>
                                { decodeJwt.roles[0] === 'ROLE_ADMIN' && <td>ACTIONS</td> }
                            </tr>
                        </thead>
                        <tbody style={{ overflowY: "scroll" }}>
                            {
                                this.state.items.map(
                                    item =>
                                        <tr key={item.id} >
                                            <td>{item.id}</td>
                                            <td>{item.name} </td>
                                            <td>{item.price} </td>
                                            {/* <td>{typeof item.discounted === 'boolean' ? item.discounted.toString() : item.discounted.toString} </td> */}
                                            <td>{item.discountPercentage * 100 + "%"} </td>
                                            { decodeJwt.roles[0] === "ROLE_ADMIN" &&
                                            <td><button onClick={() => this.editItem(item.id)} className='btn btn-info'>Update</button>&nbsp;
                                                <button onClick={() => this.deleteItem(item.id)} className='btn btn-danger'>Delete</button></td> }
                                        </tr>
                                )
                            }

                        </tbody>

                    </table>


                </div>

            </div >
        )
    }

}


