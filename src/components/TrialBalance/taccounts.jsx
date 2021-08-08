import React,{useState,useEffect, useLayoutEffect} from 'react'
import firebase from '../configuration/firebase'
import './style.css'


export default function Taccounts ()  {

    const acc=[]
    var [tac,settac]=useState([])
    var [tacb,setttac]=useState([])
    var a
  
    firebase.database().ref('/').child('Taccounts').on('child_added',(s)=>(
        acc.push(s.val())
    ))
    useEffect(()=>{
       settac(acc)

        

    },[])
    console.log(tac,"val")
    const ADDval=()=>{

        console.log("Me chal raha hon")
        console.log(tac,"values")
        var result=[]
        function myFunc(total, num) {
            return total +num;
          }
        tac.map((v,i)=>(
            result.push(v['debit'].reduce(myFunc)-v['credit'].reduce(myFunc))
        ))
        console.log(result)
        return result

    }
    const result=ADDval()
    return(
        <>
        <h3>T accounts</h3>
        <button onClick={ADDval}>Add</button>
        {
            tac.map((v,i)=>(
                <div>
                    <div className="name" >{v['name']}</div>

                    <div className="side-by-side-entry">
                    <div className='debitdiv'>
                        <p>debit</p>
                        
                        {v['debit'].map((v,i)=>(
                            <div>
                            {v}
                            </div>
                        ))}
                        </div>
                        <div className='creditdiv'>
                                <p>credit</p>
                        {v['credit'].map((v,i)=>(
                            <div>
                                   {v}
                                </div>
                        ))}
                        {result[i]}

                        
                       
                        </div> 
                          
                                </div>
                                </div>
            ))
        }
       

        
        </>
    )
} 