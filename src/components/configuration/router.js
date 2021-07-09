import React from 'react'
import {BrowserRouter as Router ,Route} from 'react-router-dom'

import Taccounts from '../TrialBalance/taccounts'
import GeneralJournal from '../Journal/generalJournal'
class AppRouter extends React.Component{
    render(){
        return(
            <Router>
                <Route  exact path='/' component={GeneralJournal}></Route> 
                <Route path='/tacc' component={Taccounts}/>
                {/* <Route path='/todos' component={FnTodos}></Route> */}
            </Router>
        )
    }
}
export default AppRouter;