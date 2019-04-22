import React, {Component} from 'react';
import Order from '../Order/Order';
import axios from '../../utils/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('orders.json')
          .then((item)=>{
              const fetchedwithspread = [];
              for (let key in item.data) {
                  fetchedwithspread.push({
                      ...item.data[key],
                      id: key
                  })
              }
              this.setState({loading: false, orders: fetchedwithspread});
          })
          .catch((error) => {
            this.setState({loading: false});
            console.log(error);
          })
    }

    render() {
        return (
            <div>
              {this.state.orders.map((item)=>{
                  return <Order key={item.id} ingredients={item.ingredients} price={item.price}/>
              })}
            </div>
        );
    }
}
export default withErrorHandler(Orders, axios);