import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  
const Style={color:"#fff"}	
return (
    <Menu mode={props.mode} theme="dark">
    <Menu.Item key="home">
      <a style={Style} href="/">Home</a>
    </Menu.Item>
     <Menu.Item key="packages">
      <a style={Style} href="/#packages">Packages</a>
    </Menu.Item>
        <Menu.Item key="services">
      <a style={Style} href="/#services">Services</a>
    </Menu.Item>
    <Menu.Item key="contact">
      <a style={Style} href="/#contact">Contects Us</a>
    </Menu.Item>

  </Menu>
  )
}

export default LeftMenu
