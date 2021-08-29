import React, { useState} from 'react'
import BalanceSheet from './balancesheet'

export default function OwnerEquity ({gen,ne,tac}){
    // target owner equity owner withdrawl,ne add owner equit+netincome then - owner withdrawl
    




    console.log(gen,tac,ne)
    var ow=[]
    var oe=[]
    var [page,setpage]=useState('no')
    var [ab,setAb]=useState('owner')

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



    var d=0
    var c=0
    var resoe
    var alloe
    var allow
    var resow
    // Get all owner equity and all owner withdrawl sum them up then conclide final equity which is oe+ni-Ow
      try{
        oeval.map((v,i)=>(
            v['debit'].map((v,i)=>(d+=v)),
            v['credit'].map((v,i)=>(c+=v)),
            resoe=d-c,
            console.log('ss',resoe),
            
            resoe >=0 ? (v['debit']=resoe,v['credit']=''): (v['credit']=Math.abs(resoe),v['debit']=''),
            alloe += resoe

            ))
            d=0
            c=0
            owval.map((v,i)=>(
                v['debit'].map((v,i)=>(d+=v)),
                v['credit'].map((v,i)=>(c+=v)),
                resow=d-c,
                
                resow >=0 ? (v['debit']=resoe,v['credit']=''): (v['credit']=Math.abs(resoe),v['debit']=''),
                allow += resow
    
                ))


      }
      
      catch{
          console.log("error")
      }
      var sumoe=ne+alloe
      console.log(oe,oeval,'oe')
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
                               <td>{v['debit']}</td>
                               <td>{v['credit']}</td>
                           </tr> 
                        ))
                    }
                       <tr>
                           <tr>
                               <td>Net Income</td>
                               <td>{ne}</td>
                           </tr>
                    
                </tr>
                
                <tr> <td>All Withdrawls</td></tr>
                {
                        owval.map((v,i)=>(
                           <tr>
                               <td>{v['name']}</td>
                               <td>{v['debit']}</td>
                               <td>{v['credit']}</td>
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