import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';
import { MdAddShoppingCart } from "react-icons/md";
function ProductInfo(props) {

    const [Product, setProduct] = useState({})

    useEffect(() => {

        setProduct(props.detail)

    }, [props.detail])

    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
    }


    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Price"> {Product.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
                <Descriptions.Item label="View"> {Product.views}</Descriptions.Item>
                <Descriptions.Item label="Location"> {Product.locations}</Descriptions.Item>
                <Descriptions.Item label="Feature"> {Product.feature}</Descriptions.Item>
                <Descriptions.Item label=""> </Descriptions.Item>
                <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
            </Descriptions>
            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="primary" 
                    onClick={addToCarthandler}
                ><MdAddShoppingCart style={{marginBottom:'-3px',marginRight:'8px'}} />

                     Add to Cart
                    </Button>
            </div>
        </div>
    )
}

export default ProductInfo
