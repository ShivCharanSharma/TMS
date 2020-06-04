import React, { useEffect, useState }  from 'react'
import { FaCode } from "react-icons/fa";
import Axios from 'axios';
import { Icon, Col, Card, Row ,Pagination} from 'antd';
import HeroPage from '../HeroPage/HeroPage';
import PackagesPage from '../PackagesPage/PackagesPage';
import ImageSlider from '../../utils/ImageSlider';
import Services from '../Services/Services';
import ContactPage from '../ContactPage/ContactPage';
const { Meta } = Card;

function LandingPage(props) {

	return (<div>
		<div id="home">
		<HeroPage />
		</div>
		<div id="packages">
		<PackagesPage {...props} />
		</div>
		<div id="services">
   		 <Services />
    		</div>
		</div>
    )
}

export default LandingPage
