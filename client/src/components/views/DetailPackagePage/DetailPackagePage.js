import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd';
import ProductImage from './Sections/PackageImage';
import ProductInfo from './Sections/PackageInfo';
import { addToCart } from '../../../_actions/user_actions';
import { useDispatch,useSelector } from 'react-redux';
function DetailProductPage(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const packageId = props.match.params.packageId
    const [Product, setProduct] = useState([])

    useEffect(() => {
        Axios.get(`/api/product/packages_by_id?id=${packageId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })

    }, [])

    const addToCartHandler = (packageId) => {
    	if(user.userData && !user.userData.isAuth){
		props.history.push('/login');
	}
	    dispatch(addToCart(packageId))
		
	    return
    }

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} xs={24}>
                    <ProductInfo
	                addToCart={addToCartHandler}
                        detail={Product} />
                </Col>
            </Row>
        </div>
    )
}

export default DetailProductPage
