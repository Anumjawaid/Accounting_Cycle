import React, { useState, useEffect } from 'react'
import firebase from '../configuration/firebase'
import OwnerEquity from './ownerstat'
import './style.css'






export default function IncomeStat() {
    var gen = []
    var acc=[]
    let [genentry, setGenEntry] = useState([])
    var[page,setPage]=useState("income")
var [ab,setAb]=useState('no')
    let [tacc, setTacc] = useState([])
    const a=0;
    
    
    firebase.database().ref('/').child('generalentries').on('child_added',((s) => (
        gen.push(s.val())
    )))
    firebase.database().ref('/').child('Taccounts').on('child_added', ((s) => (
        acc.push(s.val())
    )))
    useEffect(()=>(
        setTacc(acc)

    ),[a])
    useEffect(()=>(
        
        setGenEntry(gen)

    ),[a])
    console.log(genentry,'generalentry')
    console.log(tacc,'taccounts')
    var revname=[]
    var expname=[]
    var allrev=[]
    var allexp=[]
    var resultrev=[]
    var resultexp=[]   //result1 rev result2 exp
    var d=0
    var c=0
    var te=0
    var tr=0
    var ne=[]
    gen.map((v,i)=>(
        v['crstat']=='Revenue' ? revname.push(v['credit']):console.log("not"),
        v['debst']=='Revenue' ? revname.push(v['debit']):console.log("not"),
        v['crstat']=='Expense' ? expname.push(v['credit']):console.log("not"),
        v['debst']=='Expense'?expname.push(v['debit']):console.log("no debit")

    ))
    function getUnique(array){
        var uniqueArray = [];
        
        // Loop through array values
        for(var value of array){
            if(uniqueArray.indexOf(value) === -1){
                uniqueArray.push(value);
            }
        }
        return uniqueArray;
    }
    console.log(revname,'46')
    revname=getUnique(revname)
    expname=getUnique(expname)
    console.log(revname,'487')

    

    tacc.map((v,i)=>(
        revname.includes(v['name']) ? allrev.push(v):console.log("no rev entry"),
        expname.includes(v['name']) ? allexp.push(v):console.log("no exp entry")
    ))
  

   
    try{
    allrev.map((v,i)=>(
        v['debit'].map((s,i)=>(console.log(d+=s,'d'))),
        v['credit'].map((v,i)=>(console.log(c+=v,"c"))),
        resultrev.push(d-c)
        ,d=0,
        c=0
    ))
    d=0
    c=0
    
    allexp.map((v,i)=>(
        revname.includes(v['name']) ?console.log(v['name'],v['debit'],v['credit'],"howsthat"):console.log('why you'),
        v['debit'].map((s,i)=>(console.log(d+=s,'d'))),
        v['credit'].map((v,i)=>(console.log(c+=v,"c"))),
        resultexp.push(d-c)

    ))
    // console.log(tr-te,tr,te,'ne')
    // ne.push(tr-te)
    // console.log(ne,"netincome")
    }
    catch{
        console.log('error')
    }
    
    // var ne=tr-te
    // console.log(ne,"netincome")
    // console.log(revname,expname,allrev,allexp,ne,"hh")
    // console.log('ne',ne[0])
    function myFunc(total, num) {
        return total +num;
      }
    //   console.log(resultrev.reduce(myFunc)-resultexp.reduce(myFunc),'ne')
    var ne=0
    try{
        if(resultrev.length==0){
            ne=0-resultexp.reduce(myFunc)
    
        }
        else if(resultexp.length==0){
            ne=resultrev.reduce(myFunc)-0
        }
        else if(resultrev.length==0 || resultexp.length==0){
    
            console.log("l")
        }
        else{
            ne=resultrev.reduce(myFunc)-resultexp.reduce(myFunc)
        }
    }
    catch{
        console.log("error")

    }
    // if(resultrev.length==0){
    //     ne=0-resultexp.reduce(myFunc)

    // }
    // else if(resultexp.length==0){
    //     ne=resultrev.reduce(myFunc)-0
    // }
    // else if(resultrev.length==0 || resultexp.length==0){

    //     console.log("l")
    // }
    // else{
    //     ne=resultrev.reduce(myFunc)-resultexp.reduce(myFunc)
    // }
    console.log(resultrev,resultexp,ne,'kj')





    return (
        <>
        {/* {setPage('income')} */}
        {page == 'income'?
        <div>
            <div>{ab == 'no' ?<div>
            <h1>Balance sheet</h1>
            <button onClick={()=>setAb('yes')}>Reveal</button> </div>:<div>
            <h1>Balance sheet</h1>
        <div class='incomestatment'>
            <h2>Income Statments</h2>
            {/* All Rrevenues all expenses */}
            <table>
                <tr>
                    <th>Income Statment</th>
                </tr>
                <tr>
                    <th>Accounts Head</th>
                     <th>Debit</th>
                     <th>Credit</th>
                </tr>
                <tr>
                    <td>All Revenues</td>
                    
                </tr>
                {
                        allrev.map((v,i)=>(
                           <tr>
                               <td>{v['name']}</td>
                               {/* <td>{v['debit']}</td>
                               <td>{v['credit']}</td> */}
                               {resultrev[i]>=0?(
                                   <td></td>,
                                   <td>{resultrev[i]}</td>
                               ):
                               (
                                <td>{resultrev[i]}</td>,<td></td>)
                               }
                           </tr> 
                        ))
                    }
                       <tr>
                    <td>All Expenses</td>
                    
                </tr>
                {
                        allexp.map((v,i)=>(
                           <tr>
                               <td>{v['name']}</td>
                               {resultexp[i]>=0?(
                                   <td></td>,
                                   <td>{resultexp[i]}</td>
                               ):
                               (
                                <td>{resultexp[i]}</td>,<td></td>)
                               }
                           </tr> 
                        ))
                    }
                    <tr>
                        <td>Net Income</td>
                        <td>Revenue-Expensee</td>
                        {<td>{ne}</td>}
                    </tr>
                
            </table>
            <button onClick={()=>setPage('ownerquity')}>Owner Equity</button>
        </div></div>}</div>
       
    </div>
        : 
        <OwnerEquity gen={genentry} ne={ne} tac={tacc}/>}
            
        </>
    )
}