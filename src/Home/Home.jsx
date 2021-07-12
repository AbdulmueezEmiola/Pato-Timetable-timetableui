import Divider from "../Components/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faChalkboardTeacher,faUsers,faSchool} from "@fortawesome/free-solid-svg-icons";
import {Button} from 'react-bootstrap'

import "./Home.css"
export default function Home(){
    return (
        <div className="home">          
            <div className="vertical-centered">            
                <div>
                    <h2>Select Schedule Filter Type</h2>            
                    <Divider><FontAwesomeIcon icon={faStar} spin/></Divider>
                    <Button variant="success" type="submit" className="blockButton my-2" href="/group">
                        Group <FontAwesomeIcon icon={faUsers}/>
                    </Button>
                    <Button variant="success" type="button" className="blockButton my-2" href="/classroom">
                        ClassRoom  <FontAwesomeIcon icon={faSchool}/>                
                    </Button>           
                    
                    <Button variant="success" type="button" className="blockButton my-2" href="/teacher">
                        Teacher <FontAwesomeIcon icon={faChalkboardTeacher}/>                
                    </Button>           
                </div>
            </div>
        </div>        
    );
}