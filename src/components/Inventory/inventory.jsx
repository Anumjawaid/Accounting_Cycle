import React,{useState,useEffect} from 'react'
import firebase from '../configuration/firebase'

function Inventory(){
    var b=[]
    var [st,setState]=useState([])
    var [page,setPage]=useState()
    var t

    // async function fetch (){
    //     const a=await firebase.database().ref('/').child('Taccounts').on('child_added',(s)=>(
    //         b.push(s.val())
    //     ))
    //     return a
    // }
    // console.log("aa")
    
    // // fetch()
    // useEffect(()=>(
    //     console.log(fetch(),'lk'),
    //     // setState(b),
    //     setState(b),
    //     console.log(b,'see from useState'),
    //     console.log(st,"st"),
    //     // setPage('invenory')
    //     console.log('inventory')
    // ),[])
    firebase.database().ref('/').child('Taccounts').on('child_added',(s)=>(b.push(s.val())))
    
    // useEffect(()=>(
    //   setPage(b),
    //   console.log(b,page,'fghj')
    //   ,setState()
    // ),[])
    useEffect(()=>(
        console.log(st,'khh')
        ,setState(b)
    ),[])
    // setPage()
    console.log(b,st,"bbb")
    t=0
    return(
        <>

<h2>Inventory</h2>
        </>
    )
}
export default Inventory