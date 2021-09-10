import React from 'react'
import {BrowserRouter as Router ,Route} from 'react-router-dom'

import Taccounts from '../TrialBalance/taccounts'
import GeneralJournal from '../Journal/generalJournal'
import TrialBalance from '../TrialBalance/trialbalance'
import IncomeStat from '../FinancialStatments/incomestat'
import Inventory from '../Inventory/inventory'
import Closing from '../FinancialStatments/closing'
class AppRouter extends React.Component{
    render(){
        return(
            <Router>
                <Route  exact path='/' component={GeneralJournal}></Route> 
                <Route path='/tacc' component={Taccounts}/>
                <Route path='/trial' component={TrialBalance}></Route>
                <Route path='/income' component={IncomeStat}></Route>
                <Route path='/inventory' component={Inventory}></Route>
                <Route path='/closing' component={Closing}></Route>
            </Router>
        )
    }
}
export default AppRouter;