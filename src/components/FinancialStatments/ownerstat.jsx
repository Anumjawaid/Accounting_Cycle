import React, { useState, useEffect } from 'react'
import firebase from '../configuration/firebase'

export default function OwnerEquity ({gen,ne,tac}){
    // target owner equity owner withdrawl,ne add owner equit+netincome then - owner withdrawl
    var ow=[]
    var oe=[]
    gen.map((v,i)=>(
        v['crstat']=='owner equity' ? oe.push(v['name']):console.log('oe'),
        v['debst']=='owner withdrawl' ? ow.push(v['name']):console.log('ow')

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
    var oeval=[]
    var owval=[]
    ow=getUnique(ow)
    oe=getUnique(oe)
    tac.map((v,i)=>(
        ow.includes(v['name']) ? oeval.push(v):console.log("no oe entry"),
        oe.includes(v['name']) ? owval.push(v):console.log("no ow entry")

    ))



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
      console.log(sumoe,"totaloe")
       







    console.log(gen,tac,ne)
    return(
        <>
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

        </div>


        </>
    )
}