import React,{useState,useEffect, useLayoutEffect} from 'react'
import firebase from '../configuration/firebase'


export default function Taccounts ()  {

    const acc=[]
    var [tac,settac]=useState([])
  
    firebase.database().ref('/').child('taccount').on('child_added',(s)=>(
        acc.push(s.val())
    ))
    useEffect(()=>{
       settac(acc)

        

    },[acc])
    
    return(
        <>
        <h3>T accounts</h3>
        {tac.map((v,i)=>(
            <div className="account">
                <div className="name">{v['tabname']}</div>
               <table>
                   <tr>
                       <th>Debit</th>
                       <th>Credit</th>
                   </tr>
                   <tr>
                       <td>{v['value']}</td>
                       <td>{v['credit']}</td>
                   </tr>
               </table>
            </div>
        ))}
       

        
        </>
    )
} 