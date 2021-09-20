// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './TrialBalance/style.css'
import Navbar from './navbar'
function Home(){

    return(
        <>
        <Navbar/>
        <div className="container center">
            <div className="row">Accounting cycle</div>
           <div className="row">
               <div className="col-md-6 journalt"><Link to='/journal'className='white'><h3>General Journal</h3></Link></div>
               <div className="col-md-6 tacct"><Link to='/tacc'className='white'><h3>T-Accounts</h3></Link></div>
           </div>
           <div className="row">
               <div className="col-md-6 trialt"><Link to='/trial'className='white'><h3>Trial Balance</h3></Link></div>
               <div className="col-md-6 statmentt"><Link to='/income'className='white'><h3>Financial statments</h3></Link></div>
           </div>
           <div className="row">
               <div className="col-md-6 closingt"><Link to='/closing'className='white'><h3>Closing</h3></Link></div>
               <div className="col-md-6"></div>
           </div>
        </div>

        </>
    )
}
export default Home;