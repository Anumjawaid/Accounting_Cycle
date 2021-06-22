import React,{useState,useEffect} from 'react'
import firebase from '../configuration/firebase'


export default function Taccounts ()  {

    const acc=[]
    var [tac,setTac]=useState()
    useEffect(()=>{
        firebase.database().ref('/').child('taccounts').on('child_added',(s)=>{
            acc.push(s.val())
            tac=acc

            console.log(s.val(),acc)
        })

    })
    console.log(acc,"incr")
    console.log(tac,"incr")
    return(
        <>
        <h3>T accounts</h3>
        {<h2>{acc}</h2>}
        </>
    )
} 