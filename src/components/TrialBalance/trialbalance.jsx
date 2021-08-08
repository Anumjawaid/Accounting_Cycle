import React,{useState,useEffect} from 'react'
import firebase from '../configuration/firebase'
import './style.css'


export default function TrialBalance () {

    let [trial,settrial]=useState({})
    let tri=[]
    let [result,setresult]=useState()

    firebase.database().ref('/').child('Tnames').on("value",(s)=>(
        tri.push(s.val())
    ))
    useEffect(()=>{
        settrial(tri)
    },[ ])
    console.log(trial,"trialyyy")



    return(
        <>
        <div>
            <div><h4>Trial Balance</h4></div>
            <div>
                {trial.length ?<h3>results Fetcing Plz Wait</h3>:<div>
                   {trial.map((s,i)=>(
                       <h1>{s}</h1>
                   ))}
                    
                    
                    </div>}
            </div>
        </div>

        </>
    )
}
