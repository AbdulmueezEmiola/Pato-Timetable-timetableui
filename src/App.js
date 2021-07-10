import './App.css';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Create from './Create/Create';
import Home from './Home/Home';
import ScheduleByGroup from './Tables/ScheduleByGroup';
import ScheduleByTeacher from './Tables/ScheduleByTeacher';
import ScheduleByClassroom from './Tables/ScheduleByClassroom';
import {BrowserRouter as Router,
        Switch,
        Route} from "react-router-dom"
import { isAuthenticated,isTeacher} from './Services/AuthenticationService';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App m-3">
      <Router>
        <NavBar/>
        <Switch>
            <Route path="/create/:id">
              {
                (isAuthenticated()  && isTeacher() )? 
                <Create/>:<Login/>
              }
            </Route>
            
            <Route path="/create">
              {
                (isAuthenticated()  && isTeacher() )? 
                <Create/>:<Login/>
              }
            </Route>
            <Route path="/teacher">
              {
                isAuthenticated()?
                <ScheduleByTeacher/>:<Login/>
              }
            </Route>
            <Route path="/classroom">
              {
                isAuthenticated()?                
                <ScheduleByClassroom/>:<Login/>
              }
            </Route>
            <Route path="/group">
              {
                isAuthenticated()?
                <ScheduleByGroup/>:<Login/>
              }
            </Route>            
            <Route path="/login">              
              <Login/>
            </Route>
            <Route path="/register">
              <Registration/>
            </Route>            
            <Route path="/">
              {
                isAuthenticated()?
                <Home/>:<Login/>
              }                
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
