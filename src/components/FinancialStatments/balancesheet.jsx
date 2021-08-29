import React, { useState} from 'react'

export default function BalanceSheet({ge,ne,tac,sumoe}){
    // get all assets,oe,liabilities
    var [ab,setAb]=useState('owner')
    console.log(ge,'gen')
    console.log(tac,'tac')
    console.log(ne,'ne')
        console.log(sumoe,'ow')
    var nass=[]
    var nliab=[]
    ge.map((v,i)=>(
        v['crstat']=='Asset'?nass.push(v['name']):console.log('not'),
        v['debst']=='Asset'?nass.push(v['name']):console.log('not'),
        v['crstat']=='Liability'?nliab.push(v['name']):console.log('not'),
        v['debst']=='Liability'?nliab.push(v['name']):console.log('not')
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
    nass=getUnique(nass)
    nliab=getUnique(nliab)
    var vass=[]
    var vliab=[]
    tac.map((v,i)=>(
       nass.includes(v['name'])  ? vass.push(v) :console.log(),
       nliab.includes(v['name']) ? vliab.push(v) :console.log()
    ))
    console.log(nass,vass,'asset')
    console.log(nliab,vliab,'liab')
    

return(
    <>
    {ab=='owner' ? 
    <div>
        <h3>Balance Sheet</h3>
        <button onClick={()=>setAb('no')}>Reveal</button>
    </div>
    :
    <div>
        <h3>Balance sheet</h3>
        
        </div>}



    </>
)

}