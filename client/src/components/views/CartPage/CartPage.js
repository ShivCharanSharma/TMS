import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    getCartItems,
    removeCartItem,
    setCartStatus,
} from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import StatusModel from './Sections/StatusModel';
import {Button,Spin,  Empty, Modal } from 'antd';
//import Paypal from '../../utils/Paypal';
function CartPage(props) {
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)
    const [ShowModal, setShowModal] = useState(false)
    const [ShowLoader, setShowLoader]=useState(true)
    useEffect(() => {

        let cartItems = [];
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                });
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then((response) => {
                        if (response.payload.length > 0) {
                            calculateTotal(response.payload)
                        }
                    })
            }
	    	switch(props.user.userData.showCartStatus){
			case 1 : setShowSuccess(true);
				 setShowModal(true);
			         setShowTotal(false);
				break;
			case 2:	 setShowModal(true);
				 setShowSuccess(false);
				break;
			default:
		}
	    
	    
	    
        }
	setShowLoader(false)
    }, [props.user.userData])

    const calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        });

        setTotal(total)
        setShowTotal(true)
    }

    
    const removeFromCart = (productId) => {

        dispatch(removeCartItem(productId))
            .then((response) => {
                if (response.payload.cartDetail.length <= 0) {
                    setShowTotal(false)
                } else {
                    calculateTotal(response.payload.cartDetail)
                }
            })
    }

   

    const removeModal= () =>{
    	dispatch(setCartStatus());
	    setShowSuccess(false)
            setShowModal(false)
	
      }
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Cart</h1>
	    <div> 
	    {ShowModal &&
		<StatusModel 
		    statusType={ShowSuccess} 
		    removeStatus={removeModal}/>}
	    </div>
            <div>

                <UserCardBlock
                    products={props.user.cartDetail}
                    removeItem={removeFromCart}
                />

                {ShowTotal ?
                    <div style={{ marginTop: '3rem' }}>
                        <h2>Total amount: Rs. {Total} </h2>
                    </div>
                    :
                        <div style={{
                            width: '100%', display: 'flex', flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <br />
                            <Empty description={false} />
                            <p style={{textAlign:"center" }}>No Items In the Cart</p>

                        </div>
                }
            </div>



            {/* Pay Button */}
            {ShowTotal &&
		<Button type="link" href={window.location.hostname=="localhost"?"http://localhost:5000/api/payment/payment":'/api/payment/payment'} style={{width:'100%',background:'#1890ff',color:'#fff',fontSize:'20px'}} ><i>Place Order</i></Button> 
	    }
        </div>
    )
}

export default CartPage
