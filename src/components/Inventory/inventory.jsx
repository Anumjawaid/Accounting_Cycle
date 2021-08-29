import React,{useState,useEffect} from 'react'
import firebase from '../configuration/firebase'

function Inventory(){
    var b=[]
    var [st,setState]=useState([])
    var [page,setPage]=useState()
    var t

    
    // firebase.database().ref('/').child('Taccounts').on('child_added',(s)=>(b.push(s.val())))
    
   
    useEffect(()=>{
        firebase.database().ref('/').child('Taccounts').on('value',(s)=>(
            b.push(s.val())
        ))
        setState(b)
    },[])
   
    console.log(b,st,'hhhi')
    // console.log(page,'hhhiio')
    const MyContext = React.createContext(st);
    console.log(MyContext,'context yy')
    return(
        <>

<h2>Inventory</h2>
{
    st.length?st.map((v,i)=>(
        <h1>{v}</h1>
    ))
    :<h3>Nothing in here</h3>
}
        </>
    )
}
export default Inventory