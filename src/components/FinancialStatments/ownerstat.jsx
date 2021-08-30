import React, { useState} from 'react'
import BalanceSheet from './balancesheet'

export default function OwnerEquity ({gen,ne,tac}){
    // target owner equity owner withdrawl,ne add owner equit+netincome then - owner withdrawl
    




    console.log(gen,tac,ne)
    var ow=[]
    var oe=[]
    var [page,setpage]=useState('no')
    var [ab,setAb]=useState('owner')
    var d=0
    var c=0
    var resoe=[]
    var alloe=0
    var allow=0
    var resow=[]

    gen.map((v,i)=>(
        console.log(v['crstat'],v['crstat']=='Owner equity',v['name'],'gc'),
        v['crstat']=='Owner equity' ? oe.push(v['credit']):console.log('oe'),
        v['debst']=='Owner equity' ? oe.push(v['debit']):console.log('oe'),
        v['crstat']=='Owner withdrawl' ? ow.push(v['credit']):console.log('ow'),
        v['debst']=='Owner withdrawl' ? ow.push(v['debit']):console.log('ow')

    ))
    console.log(oe,'oe')
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
    var oeval=[]
    var owval=[]
    ow=getUnique(ow)
    oe=getUnique(oe)
    tac.map((v,i)=>(
        ow.includes(v['name']) ? owval.push(v):console.log("no oe entry"),
        oe.includes(v['name']) ? oeval.push(v):console.log("no ow entry")

    ))
    console.log('oeval',oeval)



    
    // Get all owner equity and all owner withdrawl sum them up then conclide final equity which is oe+ni-Ow
      try{
        oeval.map((v,i)=>(
            v['debit'].map((s,i)=>(console.log(d+=s,"d"))),
            v['credit'].map((s,i)=>(console.log(c+=s,"c"))),
            console.log(d,c,d-c),
            resoe.push(d-c),d=0,
            c=0
            

            ))
            d=0
            c=0
            owval.map((v,i)=>(
                v['debit'].map((s,i)=>(d+=s)),
                v['credit'].map((s,i)=>(c+=s)),
                resow.push(d-c)
    
                ))


      }
      
      catch{
          console.log("error")
      }
      function myFunc(total, num) {
        return total +num;
      }
    //   console.log(resultrev.reduce(myFunc)-resultexp.reduce(myFunc),'ne')
    var sumoe=0
    try{
        if(resoe.length==0){
            sumoe=0-resow.reduce(myFunc)

    
        }
        else if(resow.length==0){
            sumoe=resoe.reduce(myFunc)-0
        }
        else if(resoe.length==0 || resow.length==0){
    
            console.log("l")
        }
        else{
            sumoe=resoe.reduce(myFunc)-resow.reduce(myFunc)
        }
    }
    catch{
        console.log("error")
    }
    console.log(oe,ow,'k')
      console.log(resoe,resow,'jkk')
      sumoe=ne+sumoe
      console.log(oe,oeval,resoe,resow,'oe')
      console.log(sumoe,"totaloe")
       



    return(
        <>
        <div>
        {ab=='owner'?
            <div>
                
                {page=='no' ? <div>
            <h1>Balance sheet</h1>
            <button onClick={()=>setpage('yes')}>Reveal</button> </div>:
            <div>
                <h3>Owner Equity Statment</h3>
            <table>
                <tr>
                    <th>Owner EquityStatment</th>
                </tr>
                <tr>
                    <th>Accounts Head</th>
                     <th>Debit</th>
                     <th>Credit</th>
                </tr>
                <tr>
                    <td>Owner Equity net income</td>
                    
                </tr>
                {
                        oeval.map((v,i)=>(
                           <tr>
                               <td>{v['name']}</td>
                               {/* <td>{v['debit']}</td>
                               <td>{v['credit']}</td> */}
                               {
                                   resoe[i]>=0?( <td></td>,
                                    <td>{resoe[i]}</td>
                                ):
                                (
                                 <td>{resoe[i]}</td>,<td></td>)
                                
                               }
                           </tr> 
                        ))
                    }
                       <tr>
                           <tr>
                               <td>Net Income</td>
                               <td> </td>
                               <td>{ne}</td>
                           </tr>
                    
                </tr>
                
                <tr> <td>All Withdrawls</td></tr>
                {
                        owval.map((v,i)=>(
                           <tr>
                               <td>{v['name']}</td>
                               {
                                   resow[i]>=0?( <td></td>,
                                    <td>{resow[i]}</td>
                                ):
                                (
                                 <td>{resow[i]}</td>,<td></td>)
                                
                               }
                           </tr> 
                        ))
                    }
                    <tr>
                        <td>final Owner Equity</td>
                        <td>Oe+Ni-Ow</td>
                        <td>{sumoe}</td>
                    </tr>
                
            </table>
            <button onClick={()=>setAb('o')}>Balance Sheet</button>
                </div>}
            </div>
            :
            <BalanceSheet ge={gen} ne={ne} tac={tac} oe={sumoe} />
            }
            

        </div>


        </>
    )
}