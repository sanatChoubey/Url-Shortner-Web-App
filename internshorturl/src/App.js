import React ,{useReducer,useEffect}from 'react';
import styled from 'styled-components'
import { Button,Form ,Card, Icon} from 'semantic-ui-react'
import * as firebase from 'firebase';
import './App.css';
import firebaseConfig from './config'
firebase.initializeApp(firebaseConfig);
const ErrorPara = styled.p`
  color: red;
`
const initialState ={
  email:'',
  password:'',
  error:''
}
function App(props) { 
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
    
    firebase.auth().signInWithEmailAndPassword(state.email, state.password).catch(function(error) {
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
      <h3><b>Login </b></h3>
      <Card style={{width:'450px',padding:"5px"}}>
      <Form>
        <Form.Field>
          <label>Email Id</label>
          <input name = 'email' onChange={HandleChange}placeholder='Email Id' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type = "password" onChange={HandleChange} name = 'password'
          placeholder='Password' />
        </Form.Field>
        <ErrorPara>{state.error}</ErrorPara>
        <Button onClick={HandleSubmit} primary >Login </Button>
      </Form>
      </Card>
      <p>Not registered ?<a href="/signup">Signup</a></p>
    </div>
  );
}

export default App;
