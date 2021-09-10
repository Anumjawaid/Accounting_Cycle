import React, { useState, useEffect } from 'react'
import firebase from '../configuration/firebase'
import './style.css'
import { Link } from 'react-router-dom'
import { scryRenderedDOMComponentsWithClass } from 'react-dom/cjs/react-dom-test-utils.production.min'


export default function TrialBalance() {

    //    console.log(result['result'][0]['name'],"result coming from trial balance",result.length)
    //    var trial={}
    var a = []
    var d=0
    var c=0
    var [st, setst] = useState([])
  
          const getData = async () => {
        const response = await firebase.database().ref('/').child('Taccounts').on('child_added', (s) => a.push(s.val()))

    }
    getData()
    useEffect(()=>(
        setst(a)
    ),[])

    console.log(st, "coming from taccountsfj")
    st.map((v,i)=>v['result']>=0?d+=v['result']:c+=v['result'])
    console.log(d,c,'result')







    return (
        <>
            <div className='cent'>
                <div><h4>Trial Balance</h4></div>
                {
                 st.length ?
                 <div className=''>
                     <div className="maintable ">
                         <div className="tableheader header">
                             <div className="title">Account</div>
                             <div className="debit">Debit</div>
                             <div className="credit">Credit</div>
                         </div>
                         
                         <div className="tabledata1">
                             {st.map((v,i)=>(
                                 
                                  <div className="tabledata tableheader">  
                                  <div className="title accname">{v['name']}</div>
                                  
                                  {v['result']>=0?<><div className="debit">{Math.abs(v['result'])}</div>
                                  <div className="credit"></div></>
                                  :<><div className="debit"></div>
                                  <div className="credit">{Math.abs(v['result'])}</div></>}
                                  
                                  </div>
                             ))
                             
                             }
                             <div className='tabledata tableheader'>
                             <div className="title accname">Total</div>
                             <div className="debit"> {d}</div>
                             <div className="credi">{Math.abs(c)}</div>


                                 </div>
                         </div>
               
                     </div>
                     <div className="container" style={{marginTop:'40px'}}>
                    <Link to='/income' className='linkcon' >Income Statments</Link>
                </div>

                 </div> :
                 <div><h4>Nothing in here</h4></div>
             }
                    

            </div>

        </>
    )
}
