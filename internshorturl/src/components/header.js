import React from 'react';
import styled from 'styled-components'
import {Icon} from 'semantic-ui-react'
const Title = styled.h2`
 width:100%;
 height:30px;
 font-family: 'Roboto Mono', monospace;
 padding-left:10px;
 color: #10ac84;

`
const Header =() =>{
     return(
          <Title>
              URL Shortner 
              <Icon name = 'linkify'color="green"/>
          </Title>     
     )
}
export default Header;
