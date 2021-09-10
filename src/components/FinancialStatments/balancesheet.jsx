import React, { useState} from 'react'
import {Link} from 'react-router-dom'

export default function BalanceSheet({ge,ne,tac,oe}){
    // get all assets,oe,liabilities
    var [ab,setAb]=useState('owner')
    console.log(ge,'gen')
    console.log(tac,'tac')
    console.log(ne,'ne')
        console.log(oe,'ow')
    var nass=[]
    var nliab=[]
    var vass=[]
    var vliab=[]
    var d=0
    var c=0
    var rass=[]
    var rliab=[]
    ge.map((v,i)=>(
        v['crstat']=='Asset'?nass.push(v['credit']):console.log('not'),
        v['debst']=='Asset'?nass.push(v['debit']):console.log('not'),
        v['crstat']=='Liability'?nliab.push(v['credit']):console.log('not'),
        v['debst']=='Liability'?nliab.push(v['debit']):console.log('not')
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
    
    tac.map((v,i)=>(
       nass.includes(v['name'])  ? vass.push(v) :console.log(),
       nliab.includes(v['name']) ? vliab.push(v) :console.log()
    ))
    console.log(nass,vass,'asset')
    console.log(nliab,vliab,'liab')
    vass.map((v,i)=>(
        v['debit'].map((s,i)=>(d+=s)),
        v['credit'].map((s,i)=>(c+=s)),
        rass.push(d-c),
        d=0,c=0
    ))
    vliab.map((v,i)=>(
        v['debit'].map((s,i)=>(d+=s)),
        v['credit'].map((s,i)=>(c+=s)),
        rliab.push(d-c),
        d=0,c=0
    ))
    function myFunc(total, num) {
        return total +num;
      }
      var a
      var n

      try{
          if(rass.length!=0){
           a=rass.reduce(myFunc)
           n=rliab.reduce(myFunc)
          }
          else if(rliab.length!=0){

             n=rliab.reduce(myFunc)

          }
          else{
              console.log("No assset no liability")
          }

      }
      catch{
          console.log('error')
      }
      console.log(a,rass,'asset')
      console.log(n,rliab,'loav')
    console.log(a,n,oe,'gg')
    console.log(a,n+oe,'ggh')

return(
    <>
 
    <div className='cent'>
        <h3>Balance sheet</h3>
        
        <div className='balance' style={{alignItems:'center',justifyContent:"space-evenly"}}>
            <div className='asset'>
            <h3>Asset</h3>
            <div className="maintable">
                <div className="tableheader header">
                <div className="title">Account</div>
                             <div className="debit">Debit</div>
                             <div className="credit">Credit</div>
                </div>
                <div className="tabledata1">
                    {vass.map((v,i)=>(
                        <div className="tabledata tableheader">
                            <div className="title accname">
                                {v['name']}
                            </div>
                            {rass[i]>=0?<><div className="debit">{Math.abs(rass[i])}</div>
                                  <div className="credit"></div></>
                                  :<><div className="debit"></div>
                                  <div className="credit">{Math.abs(rass[i])}</div></>}
                        </div>
                    ))}
                     </div>
                
                </div>
                <div className='tabledata tableheader resback'>
                                 <div className="title accname">Total</div>
                                 <div className="debit" style={{marginRight:'10px'}}> </div>
                                 <div className="credi">
                                     {a>=0?<>{a}</>:<>({Math.abs(a)})</>}</div>
    
    
                                     </div>
           

              </div>
              <div className='liability'>
            <h3>Liability</h3>
          
 <div className="maintable">
                <div className="tableheader header">
                <div className="title">Account</div>
                             <div className="debit">Debit</div>
                             <div className="credit">Credit</div>
                </div>
                <div className="tabledata1">
                    {vliab.map((v,i)=>(
                        <div className="tabledata tableheader">
                            <div className="title accname">
                                {v['name']}
                            </div>
                            {rliab[i]>=0?<><div className="debit">{Math.abs(rliab[i])}</div>
                                  <div className="credit"></div></>
                                  :<><div className="debit"></div>
                                  <div className="credit">{Math.abs(rliab[i])}</div></>}
                        </div>
                    ))}
                     </div>
                
                </div>
                <div className='tabledata tableheader resback'>
                                 <div className="title accname">Total</div>
                                 <div className="debit" style={{marginRight:'10px'}}> </div>
                                 <div className="credi">
                                     {a>=0?<>{a}</>:<>({Math.abs(a)})</>}</div>
    
    
                                     </div>





              </div>
        </div>
        <div className='total' style={{alignItems:'center'}}><h3>Asset=Liability+Oe</h3><h3>{a}=({n})+({oe})</h3></div>

<div className="closinglink">
    <Link to='/closing' className='linkcon'>Closing</Link>
</div>
        
        </div>



    </>
)

}