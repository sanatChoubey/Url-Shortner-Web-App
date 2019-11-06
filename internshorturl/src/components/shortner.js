import React ,{useState,useEffect}from 'react';
import styled from 'styled-components';
import * as firebase from 'firebase';
import uuid from 'uuid/v4'
import axios from 'axios';
import {Input, Button,Card } from 'semantic-ui-react'
import { BeatLoader } from 'react-spinners';

const MainDiv = styled.div`
     display: flex;
     justify-content:space-between;
     align-items:flex-start;
     width:100vw;
     height:100vh;
     background-color:#ecf0f1;   
     
`


const Shortner= (props)=>{
    
     useEffect(()=>{
          

          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
               
               firebase.database().ref('Urls/' + user.uid).on('value',(snapshot)=>{
                    console.log(snapshot.val());
                    const list = Object.values(snapshot.val());
                    setListdata(list);
               })
            }else{
               props.push('/')
            } 
          });
          
         
        },[])
     const [linkid,setLinkid] = useState('');
     const [errorlink,setErrorlink] = useState('')
     const [listdata , setListdata] = useState('')
     const [newlink,setNewLink] = useState('')
     const [bool,setBool] = useState(false)
     const ListOfUrls =()=>{
          // listdata
         if(listdata){ 
              console.log('hello',listdata)
              return (listdata.map((item)=>{
               return(
                    <Card style={{width:'500px'}}>
                         <div style={{color:'black'}}>
                              <b>Long Url -</b> {item.UrlLink}
                         </div>
                         <div style={{color:'black'}}>
                         <b>Short Url -</b> {item.shortLink}
                         </div>
                    </Card>
               )
               }
               ))
          }
     }
     const handleClick = ()=>{
          setBool(true)
          console.log(linkid)
          axios.post(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${'AIzaSyBUEUf3duy-6adfRG5IZltXxLZVYpekHkU'}`,{
               "longDynamicLink": `https://snapcool.page.link/?link=${linkid}/&apn=com.example.android`
          }).then((res)=>{
               setNewLink(res.data.shortLink)
               setBool(false)
               var user = firebase.auth().currentUser;
               const DbSend= firebase.database().ref('Urls/' + user.uid+'/'+uuid());
               DbSend.set({
                    UrlLink:linkid,
                    shortLink:res.data.shortLink
               })

          }).catch(()=>{
               setBool(false)
          })
     }
     const HandleChangeEvent = (event)=>{
          const UrlLink= event.target.value
          setLinkid(UrlLink)
          
     }
     return (
          <MainDiv>
               <div style={{display:"flex",flexDirection:'column',margin:'50px',width:'40%'}}>
               <div styel={{color:"black"}}>Enter Url to short (Example - https://medium.com/@choudlet/how-to-combine-graphql-type-definitions-quickly-and-easily-with-apollo-server-c96c4d9a7ea1)</div>
               <Input icon="linkify" iconPosition="left" 
               onChange={HandleChangeEvent}
               style={{width:'500px'}}
               placeholder='Enter Url ' />
               <Button color='green' 
               style={{marginTop:'5px',width:'150px'}}
               onClick={handleClick}>
                 {  bool? <BeatLoader
                         sizeUnit={"px"}
                         size={10}
                         color={'#123abc'}
                         loading={true}
                    />:"Get short Url"}
               </Button>
               <div style={{color:'black'}}> Short Url -<b><a href={newlink}>{newlink}</a></b></div>
               </div>
               <div style={{ margin:'50px'}}>
                    <div style={{color:'black',width:'700px',fontSize:'30px',fontWeight:500,marginBottom:'10px'}}>List of Short Urls</div>
               {
                    ListOfUrls()
               }
               </div>
          </MainDiv>
     )
}
export default Shortner