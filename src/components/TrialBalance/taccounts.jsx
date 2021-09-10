import React,{useState,useEffect, useLayoutEffect} from 'react'
import firebase from '../configuration/firebase'
import './style.css'
import {Link} from 'react-router-dom'
import TrialBalance from './trialbalance'
import Nothing from '../TrialBalance/nothing'


export default function Taccounts (){
    let [tacc,setTacc]=useState([])
    var acc=[]
    firebase.database().ref('/').child('Taccounts').on('child_added',((s,i)=>(
        acc.push(s.val())
    )))
    useEffect(()=>(
        setTacc(acc)
    ),
    [acc])
    console.log(tacc,'taccounts')
    return(
        <>
        <div className='taccounts center'>
        <h2>Taccounts</h2>
        {
            tacc.map((v,i)=>(
                <div className=''> 
                    <div className="name" >{v['name']}</div>

                    <div className="side-by-side-entry">
                    <div className='debitdiv'>
                    <div className='head'><h5>Debit</h5></div>

                        
                        {v['debit'].map((v,i)=>(
                            <div className='debval'>
                            {v}
                            </div>
                        ))}
                        </div>
                        <div className='creditdiv'>
                                <div className='head'><h5>Credit</h5></div>
                        {v['credit'].map((v,i)=>(
                            <div className='credval'>
                                   {v}
                                </div>
                        ))}


                        
                       
                        </div> 
                          
                                </div>
                        <div className='rest resback'>{v['result']}</div>

 
                                </div>
            ))

        }
        <div><Link to='/trial' className='linkcon'>Trial Balance</Link></div>
        </div>
        

        </>
    )
}
{/* <TrialBalance result={a }/> */}