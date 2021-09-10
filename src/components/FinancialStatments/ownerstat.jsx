import React, { useState} from 'react'
import BalanceSheet from './balancesheet'

export default function OwnerEquity ({gen,ne,tac}){
    // target owner equity owner withdrawl,ne add owner equit+netincome then - owner withdrawl
    




    console.log(gen,tac,ne)
    var ow=[]
    var oe=[]
    var [page,setpage]=useState('no')
    var [ab,setAb]=useState('owner')
    var resoe=0
    var resow=0

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
            resoe+=v['result']

            ))
            owval.map((v,i)=>(
               resow+=v['result']
    
                ))


      }
      
      catch{
          console.log("error")
      }
      
    //   console.log(resultrev.reduce(myFunc)-resultexp.reduce(myFunc),'ne')
    var sumoe=0
    sumoe=ne+resoe-resow
    console.log(oe,ow,'k')
      console.log(resoe,resow,'jkk')
      console.log(sumoe,"totaloe")
       



    return(
        <>
        <div>
        {ab=='owner'?
            <div className='cent'>
                
                
            <div>
                <h3>Owner Equity Statment</h3>

                <div className="maintable">
                <div className="tableheader header">
                <div className="title">Account</div>
                             <div className="debit">Debit</div>
                             <div className="credit">Credit</div>
                </div>
                <div className="tabledata1">
                    {oeval.map((v,i)=>(
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
                     {owval.map((v,i)=>(
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
                             <div className="title accname">Owner Equity Statment</div>
                             <div className="debit"> Oe+Ni-Ow</div>
                             <div className="credi">
                                 {sumoe.length>=0?<>{sumoe}</>:<>({Math.abs(sumoe)})</>}</div>


                                 </div>
            
            </div>
            <button onClick={()=>setAb('bal')} className='linkcon'>Balance sheet</button>
            </div>
            :
            <BalanceSheet ge={gen} ne={ne} tac={tac} oe={sumoe} />
            }
            

        </div>


        </>
    )
}