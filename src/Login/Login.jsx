import Divider from "../Components/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {Form,Button,Alert} from 'react-bootstrap'
import "./Login.css"
import { login } from "../Services/AuthenticationService";
import { useState } from "react";
import {useHistory} from 'react-router'

export default function Login(){
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")    
    const [error,setError] = useState("")

    const history = useHistory()
    return (
        <div className="vertical-centered">
            <div className="login">
                <h2>Logging In</h2>            
                <Divider><FontAwesomeIcon icon={faStar} spin/></Divider>
                <Form>
                    <Form.Group controlId="formUserName" className="my-3">
                        <Form.Control type="text" placeholder="Username" value={userName} 
                            onChange={(e)=>setUserName(e.target.value)}/>                    
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className="my-3">
                        <Form.Control type="password" placeholder="Password" value={password}
                            onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>

                    {
                        error && <Alert variant="danger">{error}</Alert>
                    }

                    <Button variant="success" type="button" className="mx-2" onClick={async()=>{                        
                        setError("")
                        try{
                            let value = await login(userName,password)
                            if(value){
                                history.push("")
                                history.go(0)
                            }
                        }
                        catch(err){
                            setError(err.message)
                        }
                    }}>
                        Login
                    </Button>
                    <Button variant="success" type="button" href="/register">
                        Register                    
                    </Button>
                </Form>
            </div>
        </div>        
    );
}