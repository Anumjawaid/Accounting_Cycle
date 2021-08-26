import React, { useState, useEffect } from 'react'
import firebase from '../configuration/firebase'
import OwnerEquity from './ownerstat'
import './style.css'






export default function IncomeStat() {
    var gen = []
    var acc=[]
    let [genentry, setGenEntry] = useState([])
    var[page,setPage]=useState("income")
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
    gen.map((v,i)=>(
        v['crstat']=='Revenue' ? revname.push(v['credit']):console.log("not"),
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
    console.log(revname,'487')

    var allrev=[]
    var allexp=[]

    tacc.map((v,i)=>(
        revname.includes(v['name']) ? allrev.push(v):console.log("no rev entry"),
        expname.includes(v['name']) ? allexp.push(v):console.log("no exp entry")
    ))
  

    var result1,result2   //result1 rev result2 exp
    var d=0
    var c=0
    var te=0
    var tr=0
    try{
    allrev.map((v,i)=>(
        revname.includes(v['name']) ?console.log(v['name'],v['debit'],v['credit'],"howsthat"):console.log('why you'),
        v['debit'].map((s,i)=>(console.log(d+=s,'d'))),
        v['credit'].map((v,i)=>(console.log(c+=v,"c"))),
        result1=d-c,
        tr+=Math.abs(result1),
        console.log(tr,'result'),

        result1 >=0 ? (v['debit']=result1,v['credit']=''): (v['credit']=Math.abs(result1),v['debit']='')
    ))
    d=0
    c=0
    
    allexp.map((v,i)=>(
        revname.includes(v['name']) ?console.log(v['name'],v['debit'],v['credit'],"howsthat"):console.log('why you'),
        v['debit'].map((s,i)=>(console.log(d+=s,'d'))),
        v['credit'].map((v,i)=>(console.log(c+=v,"c"))),
        result2=d-c,
        te+=result2,
        // console.log(te,'sjow'),
        
        result2 >=0 ? (v['debit']=result2,v['credit']=''): (v['credit']=Math.abs(result2),v['debit']='')
    ))
    var ne=tr-te
    console.log(ne,"netincome")
    }
    catch{
        console.log('error')
    }
    
    
    console.log(revname,expname,allrev,allexp,ne,"hh")






    return (
        <>
        {/* {setPage('income')} */}
        {page == 'income'?
        <div>
        <h1>Balance sheet</h1>
        <button onClick={()=>setPage('income')}>Reveal</button>
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
                               <td>{v['debit']}</td>
                               <td>{v['credit']}</td>
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
                               <td>{v['debit']}</td>
                               <td>{v['credit']}</td>
                           </tr> 
                        ))
                    }
                    <tr>
                        <td>Net Income</td>
                        <td>Revenue-Expensee</td>
                        <td>{ne}</td>
                    </tr>
                
            </table>
            <button onClick={()=>setPage('ownerquity')}>Owner Equity</button>
        </div>
    </div>
        : 
        <OwnerEquity gen={genentry} ne={ne} tac={tacc}/>}
            
        </>
    )
}