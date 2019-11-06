import React, { useReducer,useEffect }from 'react';
import * as firebase from 'firebase';
import styled from 'styled-components'
import '../App.css'
import { Button, Form ,Card, Icon} from 'semantic-ui-react'


const ErrorPara = styled.p`
  color: red;
`
const initialState ={
  email:'',
  password:'',
  error:''
}
const SignUp = (props)=>{
     useEffect(()=>{
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              props.history.push('/shortner')
            } else {
              props.push('/shortner')
            }
          });
        },[])
     const updateReducer = (prevState={},nextState={})=>{return({...prevState,...nextState})}
     const [state,updateState]= useReducer(updateReducer,initialState);
     const HandleSubmit =()=> { 
          firebase.auth().createUserWithEmailAndPassword(state.email, state.password).then((res)=>{
               console.log(res)
          }).catch(function(error) {
            var errorCode = error.code;
            state["error"] = errorCode
            updateState({
              ...state
            })
          });
     }
     const HandleChange = (event)=>{
          const { name, value } = event.target
          state[name]= value
          updateState({
               ...state
          })
          
     }     
      return (
          <div className="App">
            <Icon  size='massive' color ="blue"name='lock' />
            <h3><b>SignUp </b></h3>
            <Card style={{width:'450px',padding:"5px"}}>
            <Form>
              <Form.Field>
                <label>Email Id</label>
                <input onChange={HandleChange} name = 'email' placeholder='Email Id' />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input onChange={HandleChange} type = "password" 
                name = 'password' placeholder='Password' />
              </Form.Field>
              <ErrorPara>{state.error}</ErrorPara>
              <Button primary onClick={HandleSubmit}> SignUp </Button>
            </Form>
            </Card>
            <p>registered ?<a href="/">Login</a></p>
          </div>
        );
}
export default  SignUp