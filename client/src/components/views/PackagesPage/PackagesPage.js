import React, { useEffect, useState}  from 'react'
import Axios from 'axios';
import { MdAddShoppingCart } from "react-icons/md";
import { Icon,Spin, Col, Card, Row ,Pagination,Button,Tooltip} from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import { addToCart } from '../../../_actions/user_actions';
import { useDispatch, useSelector } from 'react-redux';
import './PackagesPage.css';
const { Meta } = Card;

function PackagesPage(props) {
	    const dispatch = useDispatch();
	    const [Products, setProducts] = useState([])
	    const user = useSelector(state => state.user)
	    const [CardsToView,setCardsToView] =useState({
	    	minValue:0,
		maxValue:8	    
	    })	
	    const [Loading,setLoading]=useState(true)
	   const numEachPage=8
	 useEffect(() => {

		         const variables = {
				         }
		         getProducts(variables)

		     }, [])

	const getProducts= (variables)=>{
	Axios.post('/api/product/getPackages',variables)
		.then(response => {
			if(response.data.success){
				if(variables.loadMore){
					console.log(response.data.packages);
					setProducts([...Products,...response.data.packages])
				} else {
				setProducts(response.data.packages)
				}
				
			}else{
				alert('Failed to fetch product datas')
			}
		 	setLoading(false);
		})
	}
const  showTotal= (total,range) => {
	return `Total ${total} packages`;
}
const handleChange = value => {

	setCardsToView({
		minValue: (value -1)*numEachPage,
		maxValue: value * numEachPage
	})
}

const addToCartHandler = (packageId) => {
        if(user.userData && !user.userData.isAuth){
                props.history.push('/login');
        }
            dispatch(addToCart(packageId))

            return
    }


 const renderCards = Products.slice(CardsToView.minValue,CardsToView.maxValue).map((product, index) => {
        return <Col key={index} lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a className="coverLink" href={`/product/${product._id}`} >
			{/*<img  src={product.images} />*/}
			<ImageSlider images={product.images} />
			<span className="blueOverlay">	
			<Icon type="search" className="searchIcon" style={{color:'#fff'}} />
			</span>
			</a>}
            >
                <Meta
                    title={<p style={{fontSize:'20px',textAlign:'center',margin:'0px auto',display:'block'}} >{product.title}</p> }
                    description={<div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
			    <p style={{color:'black',fontSize:'15px',margin:'0px',}}>Rs. {product.price}</p>

			    <Button  shape="round" type="primary"  onClick={()=>{addToCartHandler(product._id)}} >
			  <MdAddShoppingCart style={{marginBottom:'-3px',fontSize:'20px'}} />
                           </Button></div>}
                />
            </Card>
        </Col>
    })


	return (
		<div >
		  <div  style={{ width: '75%', margin: ' auto' ,paddingTop:'3rem'}}>
            

           


         		<div style={{ textAlign:'center',paddingTop:"3rem"}}>
		                        <h2> <b>Packages</b> </h2>
			<hr style={{width:'75%',height:'2px',background:"black"}}/>
					<br />
		                        <br />
		        </div>
		{Loading?<div style={{display: 'flex', height: '300px', justifyContent: 'center',alignItems:"center"}} ><Spin tip="Loading..."/></div>
			:Products.length ===0?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}

                    </Row>


                </div>
            }
            <br /><br />

            
                <div style={{ display: 'flex', justifyContent: 'center' }}>
             
	 <Pagination  style={{ margin:'auto '}} 
		size="small"  
		total={Products.length} 
		defaultCurrent={1} 
		defaultPageSize={numEachPage} 
		onChange={handleChange}  
		showQuickJumper 
		showTotal={showTotal}
		/>
                </div>
            
	</div>

    </div>
    )
}

export default PackagesPage
