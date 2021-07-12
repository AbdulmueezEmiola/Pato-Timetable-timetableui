import { Navbar,Nav } from "react-bootstrap"
import { isAuthenticated,logout,isTeacher,getUserName } from "../Services/AuthenticationService"
import {useHistory} from 'react-router'

export default function NavBar(){
    const history = useHistory()

    return(
        <Navbar bg="dark px-3" variant="dark" text="white">
            <Navbar.Brand>
                Welcome {getUserName()}
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Item>
                  <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                {
                    isTeacher()&&
                    <Nav.Item>
                      <Nav.Link eventKey="link-1" href="/create">Create</Nav.Link>
                    </Nav.Item>      
                }          
                {
                  isAuthenticated() && 
                  <Nav.Item>                  
                    <Nav.Link eventKey="link-1" onClick={()=>{
                      logout()
                      history.push("login")
                      history.go(0)
                    }}>Logout</Nav.Link>
                  </Nav.Item>
                }
              </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}