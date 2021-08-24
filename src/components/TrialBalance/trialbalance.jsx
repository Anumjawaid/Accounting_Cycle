import React,{useState,useEffect} from 'react'
import firebase from '../configuration/firebase'
import './style.css'
import {Link} from 'react-router-dom'


export default function TrialBalance (result) {

//    console.log(result['result'][0]['name'],"result coming from trial balance",result.length)
//    var trial={}
   
       console.log(result,"coming from taccounts")
       console.log(result['result'],"coming ")
       var trd=0
       var trc=0
       result['result'].map((v,i)=>(
        //    console.log(v['debit'],v['credit'],i,"from map")
        v['debit'] != undefined ? trd+=v['debit']: console.log('xd'),
        v['credit']!= undefined ? trc+=v['credit']: console.log('xc')
       
        ))

        console.log(trd,trc)


      

   


    return(
        <>
        <div>
            <div><h4>Trial Balance</h4></div>
            {
               result['result'].length?<div>
                   <table>
                       <tr>
                       <th>Account</th>
                       <th>Credit</th>
                       <th>Debit</th>
                       </tr>
                       
               {result['result'].map((v,i)=>(
                   
                   <tr>
                           <td>{v['name']}</td>
                           <td>{v['debit']}</td>
                           <td>{v['credit']}</td>
                       </tr>
                       
                       
                       
                       

                   
               ))}
               <tr>
                   <td></td>
                   <td>{trd}</td>
                   <td>{trc}</td>
               </tr>
               </table>
               <Link to='income'>Balnace sheet</Link>
           </div>:<h2>Nothing in here</h2>
            }
            
        </div>

        </>
    )
}
