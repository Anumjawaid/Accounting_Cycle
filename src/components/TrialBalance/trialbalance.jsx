import React,{useState,useEffect} from 'react'
import firebase from '../configuration/firebase'
import './style.css'


export default function TrialBalance () {

    let [trial,setTrial]=useState({})
    let tri=[]
    let re=[]
    let [result,setResult]=useState()
    
    firebase.database().ref('/').child('Result').on('value',(s)=>(
         re.push(s.val())
    ))
    useEffect(()=>{
        // setTrial(tri)
        setResult(re)
        console.log(result,"result")
    console.log(result.length,'lennui')
    },[ ])
    
    // console.log(result,"result")
    // console.log(result.length,'lennui')
    // console.log(trial.map((v,i)=>v['name'],result[0]['result'][i]),'mapp')
    




    return(
        <>
        <div>
            <div><h4>Trial Balance</h4></div>
            {
               result.length?<div>
                   <table>
                       <tr>
                       <th>Account</th>
                       <th>Credit</th>
                       <th>Debit</th>
                       </tr>
                       
               {result.map((v,i)=>(
                   <tr>
                           <td>{v['name']}</td>
                           <td>{v['Debit']}</td>
                           <td>{v['Credit']}</td>
                       </tr>

                   
               ))}
               </table>
           </div>:<h2>Nothing in here</h2>
            }
            
        </div>

        </>
    )
}
