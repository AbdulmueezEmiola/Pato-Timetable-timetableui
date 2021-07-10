import { Card,Button,ButtonGroup } from "react-bootstrap"
import { deleteLesson } from "../Services/LessonService"
import { useHistory } from "react-router"

export default function TableCell({id,name,type,teacher,classroom,group,start,end,canEdit}){
    
    const history = useHistory();

    const getCardBG=(type)=>{
        switch(type){
            case "lab":
                return "warning"
            case "lecture":
                return "success"
            case "practical":
                return "primary"
            default:
                return "secondary"
        }
    }

    return(
        <Card style={{
            minWidth:"200px"
        }} bg={getCardBG(type)} text="white">
            <Card.Header >{name}</Card.Header>      
            <Card.Body >    
                <Card.Text>Time <em>{start} - {end}</em></Card.Text>
                <Card.Text>Lesson Type <em>{type}</em></Card.Text>
                <Card.Text>Teacher <em>{teacher}</em></Card.Text>
                <Card.Text>Classroom <em>{classroom}</em></Card.Text>
                <Card.Text>Group <em>{group}</em></Card.Text>
                {
                    canEdit &&
                    <ButtonGroup aria-label="Delete and Edit">  
                        <Button variant="danger" onClick={()=>{
                            deleteLesson(id).then(()=>{
                                history.go(0)
                            })
                        }}>Delete</Button>
                        <Button variant="dark" onClick={()=>{
                            history.push("create/"+id)
                        }}>Edit</Button>
                    </ButtonGroup>
                }                                                                           
            </Card.Body>  
        </Card>
    )
}