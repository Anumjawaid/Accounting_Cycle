import React,{useState,useEffect} from 'react'
import firebase from '../configuration/firebase'
import './style.css'


export default function TrialBalance (result) {

   console.log(result['result'][0]['name'],"result coming from trial balance",result.length)
   function addall(total,num){
       return total+num

   }


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
                   <div>
                   <tr>
                           <td>{v['name']}</td>
                           <td>{v['debit']}</td>
                           <td>{v['credit']}</td>
                       </tr>
                       <tr>
                       <td>Total</td>
                           <td>{v['debit'].reduce(addall)}</td>
                           <td>{v['credit'].reduce(addall)}</td>

                       </tr>
                       </div>
                       
                       

                   
               ))}
               </table>
           </div>:<h2>Nothing in here</h2>
            }
            
        </div>

        </>
    )
}
