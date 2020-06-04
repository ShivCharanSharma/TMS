import React from 'react';
import {Button,Layout,Col,Row} from 'antd';
import { useSelector } from "react-redux";



const {Content}=Layout;


function HeroPage(){
  const user = useSelector(state => state.user)



return(
<div  className="hero-image">
	<div className="hero-text">
	<h1 style={{color:'white',fontSize:'60px'}}><i>Let&#8217;s take grace of Gods.</i></h1>
	<p style={{color:'white',fontSize:'20px'}}><i>We make your journey comfortable
	<br />
	and memorable.</i>
	</p>
	{  (user.userData && !user.userData.isAuth)?

	<Button type="link" href="/login" style={{background:'#1890ff',color:'white',fontSize:'15px'}}><i>Login / Sign up</i></Button>
		:""
	}
	</div>
</div>
)
}
export default HeroPage
