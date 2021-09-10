import React,{useState,useEffect} from 'react'
import firebase from '../configuration/firebase'

export default function Closing(){
     var val=[]
     var acc=[]
     var [tac,settacc]=useState([])
     var [st,setst]=useState([])
     var revname=[]
     var expname=[]
     var owname=[]
     var exclname=[]
     var allrev=[]
     var allexp=[]
     var allown=[]
     var exclname=[]
     var allexcl=[]
     const getData=async ()=>{
         const response=await firebase.database().ref('/').child('generalentries').on('child_added',(s)=>val.push(s.val()))

     }
     const getVal=async ()=>{
        const response=await firebase.database().ref('/').child('Taccounts').on('child_added',(s)=>acc.push(s.val()))

    }
     getVal()
     getData()

console.log("in here")
     useEffect(()=>(
        
        //  console.log('values',val,val.length)
         setst(val),
         settacc(acc)
     ),[])
    // all rev all exp all ow sum and close then shift to income and that income
    //  is shift tolast tial balance
    if(st.length!=0){
    console.log('val',tac,st)
    console.log(st[0]['name'])
   for(var i=0;i<st.length;i++){
       console.log(st[0]['name'],'ch')
       if(st[i]['crstat']=='Revenue' || st[i]['crstat']=='Expense' ||st[i]['crstat']=='Owner withdrawl'){
          if(st[i]['crstat']=='Revenue'){revname.push(st[i]['credit'])}
          else if(st[i]['crstat']=='Expense'){expname.push(st[i]['credit'])}
          else if(st[i]['crstat']=='Owner withdrawl'){owname.push(st[i]['credit'])}
       }
       else if(st[i]['debst']=='Revenue' || st[i]['debst']=='Expense' ||st[i]['debst']=='Owner withdrawl'){
        if(st[i]['debst']=='Revenue'){revname.push(st[i]['debit'])}
        else if(st[i]['debst']=='Expense'){expname.push(st[i]['debit'])}
        else if(st[i]['debst']=='Owner withdrawl'){owname.push(st[i]['debit'])}

       }
       else{
           exclname.push(st[i]['credit'])
           exclname.push(st[i]['debit'])
       }
   }
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
revname=getUnique(revname)
expname=getUnique(expname)
owname=getUnique(owname)
exclname=getUnique(exclname)
console.log(revname,expname,owname,exclname)
   tac.map((v,i)=>(
    revname.includes(v['name']) ?allrev.push(v):console.log(),
    expname.includes(v['name']) ?allexp.push(v):console.log(),
    owname.includes(v['name']) ?allown.push(v):console.log(),
    exclname.includes(v['name']) ?allexcl.push(v):console.log()

   ))
   console.log(allrev,allexp,allown,allexcl,'names')
   var income=0
   var alltotal=0
   allexcl.map((v,i)=>(
       alltotal+=v['result']
   ))
   allrev.map((v,i)=>(
    income+=v['result']
))
allexp.map((v,i)=>(
    income+=v['result']
))
allown.map((v,i)=>(
    income+=v['result']
))
console.log(income)

   }
    return(
        <div className='cent'>
            <h3>Closing</h3>
            <p>All rev accounts All exp accounts All ow accounts shifts to income summary</p>
            {st.length ?<div>
                <div className="maintable">
                    <div className="tableheader header">
                        <div className="title">Account</div>
                        <div className="debit">Debit</div>
                        <div className="credit">Credit</div>
                    </div>
                    <div className="tabledata1">
                        <div className="tabledata tableheader">
                            <div className="title">Income Summary</div>
                            {income>=0?
                            <div className="debit">{income}</div>
                            :
                            <div className="credit">{Math.abs(income)}</div>
                            }
                        </div>
                        {allexcl.map((v,i)=>(
                            <div className="tabledata tableheader">
                                <div className="title">
                                    {v['name']}
                                </div>
                                {v['result']>=0?<><div className="debit">{Math.abs(v['result'])}</div>
                                  <div className="credit"></div></>
                                  :<><div className="debit"></div>
                                  <div className="credit">{Math.abs(v['result'])}</div></>}
                                
                            </div>
                        ))}
                        <div className="tabledata tableheader">
                            <div className="title">Total</div>
                            <div className="debit">debit</div>
                            <div className="credit">Credit</div>
                        </div>
                    </div>
                    </div>
               
            </div> 
            :<div><h3>NOTHING TO SHOW</h3> </div>}

        </div>
    )
}