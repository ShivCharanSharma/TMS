import React, { useState } from 'react'
import {Box, InfoBox,Text, BasePropertyProps } from 'admin-bro'
import Axios from 'axios';

const Dashboard = (props: BasePropertyProps) => {
	const [TotalSold,setTotalSold]=useState(0);
	const [TotalView,setTotalView]=useState(0);
	const [TotalPack,setTotalPack]=useState(0);

	function getData(){
		const request =Axios.post('/api/product/getPackages')
			.then((res)=>{
				if(res.data.success){
					const packages=res.data.packages;
					setTotalPack(res.data.postSize);
					var totalsold=0;
					var totalview=0;
					packages.forEach((package,i)=>{
								totalsold +=package.sold;
								totalview +=package.views;
							
							})
					setTotalView(totalview);
					setTotalSold(totalsold);

				}				
				
				
				})
	
	}
	getData();
		
		
	  return (   
			  
		      <Box bg="white" w="100%" height="100%">
		  	<InfoBox title="Total Packages"borderWidth="2" borderColor="primary100" >
			<Text fontSize='40px'>{TotalPack}</Text>
		  	</InfoBox>
			<InfoBox title="Total Sold">
			<Text fontSize='40px'>{TotalSold}</Text>
		  	</InfoBox>
			<InfoBox title="Total Viewes">
			<Text fontSize='40px'>{TotalView}</Text>
		      	</InfoBox>
			</Box>
		    )
}
export default Dashboard
