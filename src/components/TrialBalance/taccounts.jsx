import React,{useState,useEffect, useLayoutEffect} from 'react'
import firebase from '../configuration/firebase'
import './style.css'


export default function Taccounts ()  {

    const acc=[]
    var [tac,settac]=useState([])
    var [tacb,settac]=useState([])
    var a
  
    firebase.database().ref('/').child('Taccounts').on('child_added',(s)=>(
        acc.push(s.val())
    ))
    useEffect(()=>{
       settac(acc)

        

    },[tacb])
    console.log(tac)
    
    return(
        <>
        <h3>T accounts</h3>
        {
            tac.map((v,i)=>(
                <div>
                    <div className="name">{v['name']}</div>

                    <div className="side-by-side-entry">
                        {v['debit'].map((v,i)=>(
                            <div className='debitdiv'>
                                <p>debit</p>
                                   {v}
                                </div>
                        ))}
                        {v['credit'].map((v,i)=>(
                            <div className='creditdiv'>
                                <p>credit</p>
                                   {v}
                                </div>
                        ))}
                        </div>   
                                </div>
            ))
        }
       

        
        </>
    )
} 