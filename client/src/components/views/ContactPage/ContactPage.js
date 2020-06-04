import React from 'react';
import {Col,Row,Card,Icon} from 'antd';
import Logo from '../../utils/static/DemoLogo.jpg';

const {Meta} =Card;
function Footer (){


	return (
	<div style={{paddingTop:"3rem",width:'100%',background:'#212529' }}>

	
<footer style={{width:"75%",margin:"auto",padding:'3rem',background:'#212529' }}>

  

    
    <div  style={{textAlign:'center',background:'#212529'}}>
	<Row gutter={80} justify="space-around" align="middle" >
      
		<Col md={6} sm={12} lg={6}>
        <h3 >
        <a href="#!">HOME</a>
        </h3>
		</Col>
      

      
		<Col md={6} sm={12} lg={6}>
        <h3 >
          <a href="#!">PACKAGES</a>
        </h3>
		</Col>
      
      
		<Col md={6} sm={12} lg={6}>
        <h3 >
          <a href="#!">SERVICES</a>
        </h3>
		</Col>
	      
		<Col md={6} sm={12} lg={6}>
        <h3 >
          <a href="#!">CONTACT</a>
        </h3>
		</Col>
      
	</Row>
    </div>
   <div> 
    <hr  style={{margin:' 2rem  15%',height:'2px', padding:'0px',border:'0',background:'#3e91f7'}} />
</div>

<Row  >
		<Col lg={12} md={12} sm={24}>
		<div style={{textAlign:'center'}}>
		<img src={Logo} style={{width:'60px',height:'60px', borderRadius:"25px",marginBottom:'1rem'}}/>
		<h2 style={{color:'#3e91f7'}}>CompanyName</h2>
		</div>
	</Col>
		<Col md={12} lg={12} sm={24}>
 <div style={{textAlign:'center',color:'#fff'}}>

        <h2 style={{color:'#3e91f7'}}>Address</h2>

        <ul style={{listStyle:'none',padding:'0'}}>
          <li>
            <p>
              <Icon type="home" theme="filled"/> Pune, Mumbai, Pin 111045, India</p>
          </li>
          <li>
            <p>
              <Icon type="mail" theme="filled"/> demo@example.com</p>
          </li>
          <li>
            <p>
              <Icon type="phone" theme="filled"/> + 91 77777 77777</p>
          </li>
          <li>
            <p>
              <Icon type="phone" theme="filled"/> + 91 44444 44444</p>
          </li>
        </ul>
	</div>
		</Col>
      
</Row>
   <div>
    <hr  style={{margin:' 2rem  15%',height:'2px', padding:'0px',border:'0',background:'#3e91f7'}} />
</div>
 
    <div  style={{textAlign:'center',background:'#212529'}}>
        <Row justify="space-around" align="middle" >
	
                <Col md={8} sm={12} lg={4}>
        <a href="#!"><Icon type="facebook" style={{fontSize:'30px'}} /></a>
                </Col>



                <Col md={8} sm={12} lg={4}>
          <a href="#!"><Icon type="twitter" style={{fontSize:'30px'}} /></a>
                </Col>


                <Col md={8} sm={12} lg={4}>
          <a href="#!"><Icon type="google-plus" style={{fontSize:'30px'}} /></a>
                </Col>

                <Col md={8} sm={12} lg={4}>
          <a href="#!"><Icon type="linkedin" style={{fontSize:'30px'}} /></a>
                </Col>
                <Col md={8} sm={12} lg={4}>
          <a href="#!"><Icon type="instagram" style={{fontSize:'30px'}} /></a>
                </Col>
         <Col md={8} sm={12} lg={4}>
          <a href="#!"><Icon type="youtube" style={{fontSize:'30px'}} /></a>
                </Col>


        </Row>
    </div>
 

  
  <div style={{textAlign:'center', color:'#fff'}}>
		<br />
		© 2020 Copyright:
    <a href="#"> CompanyName</a>
  </div>
  
  <div style={{textAlign:'center', color:'#fff'}}>
                <br />
                Designed and developed with <Icon type="heart" theme="filled"  />
    <a href="#"> SHIV CHARAN</a>
  </div>


</footer>

	
	</div>

	)
}

export default Footer
