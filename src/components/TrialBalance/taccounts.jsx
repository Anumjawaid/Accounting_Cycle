import React,{useState,useEffect, useLayoutEffect} from 'react'
import firebase from '../configuration/firebase'


export default function Taccounts ()  {

    const acc=[]
    var [tac,settac]=useState([])
    // // firebase.database().ref('/').child('taccounts').on('child_added',(s)=>{
    // //     acc.push(s.val())
    // //     // tac=acc

    //     console.log(s.val(),acc)
    // })
    firebase.database().ref('/').child('taccounts').on('child_added',(s)=>(
        acc.push(s.val())
    ))
    // settac(acc)
    useEffect(()=>{
       settac(acc)

        

    })
    // useLayoutEffect(()=>{
    //     acc.length ? console.log("Nothing",acc.length) :console.log("Something")
    // })
    // console.log(tac,"incr")
    return(
        <>
        <h3>T accounts</h3>
        {tac.map((v,i)=>(
            <h1>{v['entry']} {v['value']}</h1>
        ))}
       

        
        </>
    )
} 