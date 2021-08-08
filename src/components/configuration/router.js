import React from 'react'
import {BrowserRouter as Router ,Route} from 'react-router-dom'

import Taccounts from '../TrialBalance/taccounts'
import GeneralJournal from '../Journal/generalJournal'
import TrialBalance from '../TrialBalance/trialbalance'
class AppRouter extends React.Component{
    render(){
        return(
            <Router>
                <Route  exact path='/' component={GeneralJournal}></Route> 
                <Route path='/tacc' component={Taccounts}/>
                <Route path='/trial' component={TrialBalance}></Route>
            </Router>
        )
    }
}
export default AppRouter;