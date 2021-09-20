import React, { useState, useEffect } from 'react'
import firebase from '../configuration/firebase'
import OwnerEquity from './ownerstat'
import './style.css'
import Navbar from '../navbar'






export default function IncomeStat() {
    var gen = []
    var acc=[]
    let [genentry, setGenEntry] = useState([])
    var[page,setPage]=useState("income")
    let [tacc, setTacc] = useState([])
    var expt=0
    var revt=0
    const a=0;
    
    
    firebase.database().ref('/').child('generalentries').on('child_added',((s) => (
        gen.push(s.val())
    )))
    firebase.database().ref('/').child('Taccounts').on('child_added', ((s) => (
        acc.push(s.val())
    )))
    useEffect(()=>(
        setTacc(acc)

    ),[acc])
    useEffect(()=>(
        
        setGenEntry(gen)

    ),[gen])
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
        revt+=v['result']
    ))
    
    
    allexp.map((v,i)=>(
        expt+=v['result']
       

    ))
    // console.log(tr-te,tr,te,'ne')
    // ne.push(tr-te)
    // console.log(ne,"netincome")
    }
    catch{
        console.log('error')
    }
    
    var ne=revt-expt
  
    console.log(ne,revt,expt,'check')





    return (
        <>
        {/* {setPage('income')} */}
        {page == 'income'?
        <div className='cent'>
            {/* <div>{ab == 'no' ?<div> */}
            {/* <h1>Balance sheet</h1>
            <button onClick={()=>setAb('yes')}>Reveal</button> </div>:<div> */}
            <div >
                <Navbar />
            <h1>Balance sheet</h1>
        <div className='incomestatment'>
            <h2>Income Statments</h2>

            {/* All Rrevenues all expenses */}



            <div className="maintable">
                <div className="tableheader header">
                <div className="title">Account</div>
                             <div className="debit">Debit</div>
                             <div className="credit">Credit</div>
                </div>
                <div className="tabledata1">
                    {allrev.map((v,i)=>(
                        <div className="tabledata tableheader">
                            <div className="title accname">
                                {v['name']}
                            </div>
                            {v['result']>=0?<><div className="debit">{Math.abs(v['result'])}</div>
                                  <div className="credit"></div></>
                                  :<><div className="debit"></div>
                                  <div className="credit">{Math.abs(v['result'])}</div></>}
                        </div>
                    ))}
                     {allexp.map((v,i)=>(
                        <div className="tabledata tableheader">
                            <div className="title accname">
                                {v['name']}
                            </div>
                            {v['result']>=0?<><div className="debit">{Math.abs(v['result'])}</div>
                                  <div className="credit"></div></>
                                  :<><div className="debit"></div>
                                  <div className="credit">{Math.abs(v['result'])}</div></>}
                        </div>
                    ))}
                     

                </div>
                
            </div>
            <div className='tabledata tableheader resback'>
                             <div className="title accname">Net Income</div>
                             <div className="debit"> Revenue-Expense</div>
                             <div className="credi">
                                 {ne.length>=0?<>{ne}</>:<>({Math.abs(ne)})</>}</div>


                                 </div>
            <button onClick={()=>setPage('ownerquity') }className='linkcon'>Owner Equity</button>
        </div></div>
        {/* }</div> */}
       
    </div>
        : 
        <OwnerEquity gen={genentry} ne={ne} tac={tacc}/>}
            
        </>
    )
}