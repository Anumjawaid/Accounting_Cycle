import React,{useState,useEffect, useLayoutEffect} from 'react'
import firebase from '../configuration/firebase'
import './style.css'
import {Link} from 'react-router-dom'
import TrialBalance from './trialbalance'


export default function Taccounts (){
    const [page,setPage]=useState('tacc')
    let [tacc,setTacc]=useState([])
    var acc=[]
    firebase.database().ref('/').child('Taccounts').on('child_added',((s,i)=>(
        acc.push(s.val())
    )))
    useEffect(()=>(
        setTacc(acc)
    ),
    [])
    var resultvar=[]
    var trialstatvar=[]
    const result = ()=>{
        // console.log("i am from result arrow function")
        function myFunc(total, num) {
            return total +num;
          }
        tacc.map((v,i)=>(
            resultvar.push(v['debit'].reduce(myFunc)-v['credit'].reduce(myFunc))
        ))
        console.log(resultvar)
        return resultvar
        // resultvar.push(1)
        // return resultvar
    }
    

    console.log(tacc,"dd")
    var b=result()
    console.log(b)
    var val={}
    const trialstat = ()=>{
      
        console.log(b,"from trialst")
        for(var i=0;i<b.length;i++){
            val={}
            if(b[i] >=0 ){
                val.name=tacc[i].name
                val.credit=Math.abs(b[i])
                trialstatvar.push(val)


            }
            else{
                val.name=tacc[i].name
                val.debit=Math.abs(b[i])
                trialstatvar.push(val)

            }
            
        //    console.log(trialstatvar,i,"trialstat")

            
        }
        return trialstatvar
        // console.log(trialstatvar,"trialstat")
    }
    const a =trialstat()
    console.log(a)
    // console.log(result())
    // result1()
    return(
        <>
        {page=='tacc'? 
        <div>
        <h2>Taccounts</h2>
        {
            tacc.map((v,i)=>(
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
                        {b[i]}

                        
                       
                        </div> 
                          
                                </div>
                                </div>
            ))
        }
       <button onClick={()=>setPage('income')}>Trial Balance</button>
        </div>
        
        :<TrialBalance result={a }/> }
        {/* <TrialBalance result={a }/> */}

        </>
    )
}
{/* <TrialBalance result={a }/> */}