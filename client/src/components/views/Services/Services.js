import React from 'react';
import {Col,Row,Card,Icon} from 'antd';
import customerIcon from '../../utils/static/Icons/customerServiceIcon.jpg';
import destinationIcon from '../../utils/static/Icons/destinationIcon.png';
import lowPriceIcon from '../../utils/static/Icons/lowPriceIcon.png';
import offersIcon from '../../utils/static/Icons/offersIcon.png';

const {Meta} =Card;
function Services (){


	return (
		<div style={{width:"75%",margin:"auto",padding:'6rem 0', }}>
			<div style={{ textAlign:'center', color:'black'}}>
			<h2> <b>Services</b> </h2>
			<hr style={{width:'75%',textAlign:'center',height:'3px', backgroundColor:'black'}}/>
			<br />
			<br />
			</div>

			<div style={{textAlign:'center'}}>
				<Row gutter={[16,48]}>
				<Col lg={6} md = {12} xs ={24} align="middle">
					<Card  hoverable 
						style={{width:'200px',height:'250px',
							textAlign:'center',
							border:'2px solid black',
							borderRadius:"20px"
							}} 	
						cover={
							<img 
							style={{width:'50%',height:'50%',
							margin:'12% auto  0 auto',
							}} 
							src={customerIcon}/>
						}>
						<h2>Excellent Custormer Care</h2>
					</Card>
				</Col>
				<Col lg={6} md = {12} xs ={24} align="middle" >
					<Card  hoverable 
						style={{width:'200px',height:'250px',
							textAlign:'center',
							border:'2px solid black',
							borderRadius:"20px"
							}} 	
						cover={
							<img 
							style={{width:'50%',height:'50%',
							margin:'12% auto  0 auto',
							}} 
							src={lowPriceIcon}/>
						}>
						<h2>Lowest Prices</h2>
					</Card>
				</Col>
				<Col lg={6} md = {12} xs ={24} align="middle">
					<Card  hoverable 
						style={{width:'200px',height:'250px',
							textAlign:'center',
							border:'2px solid black',
							borderRadius:"20px"
							}} 	
						cover={
							<img 
							style={{width:'50%',height:'50%',
							margin:'12% auto  0 auto',
							}} 
							src={offersIcon}/>
						}>
						<h2>Attractive Offers</h2>
					</Card>
				</Col>
				<Col lg={6} md = {12} xs ={24} align="middle">
					<Card  hoverable 
						style={{width:'200px',height:'250px',
							textAlign:'center',
							border:'2px solid black',
							borderRadius:"20px"
							}} 	
						cover={
							<img 
							style={{width:'50%',height:'50%',
							margin:'12% auto  0 auto',
							}} 
							src={destinationIcon}/>
						}>
						<h2>Large Variety of Destinations</h2>
					</Card>
				</Col>
			</Row>
			</div>
		</div>

	)
}

export default Services
