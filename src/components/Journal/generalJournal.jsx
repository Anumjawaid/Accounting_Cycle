import react, { useState } from 'react'
import './style.css'

export default function GeneralJournal() {
    
    const [acc,setacc]=useState()
    const[debit,setdeb]=useState()
    const[credit,setcred]=useState()
    const[val,setval]=useState()
    const[journal,setjournal]=useState([])
   const generjournal={}
    const addEntry = ()=>{
        if(acc ==' ' || debit ==' ' || credit == ' ' || val==' '){
            alert("PLEASE FILL ALL DETAILS BATAMEEZI NAHI ")
        }
        else{
        generjournal.acc=acc
        generjournal.date=datetoday()
        generjournal.credit=credit
        generjournal.debit=debit
        generjournal.value=val
        setjournal([...journal,generjournal])
        setacc(" ")
        setdeb(" ")
        setcred(" ")
        setval(" ")
        console.log(journal,"journal")
        console.log(generjournal,'generaljournal')
    }


    }

    const datetoday =()=>{
        var month=['Jan',"Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]
        var days=['Monday',"Tuesday","Wednesday",'Thursday','Friday','Saturday','Sunday']
        var d = new Date();
       
        var date=(d.getUTCDate()+ ","+month[d.getMonth()]+","+d.getFullYear())
        var day=(days[d.getDay()])
        return date
    }
    // console.log(datetoday)
    return (
        <>
        <div className="conatiner">
            <div className="row">
                <div className="col-md-12">
                    <h3>Write your general Journal Entry</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <table id='genejou'>
                        <tr>
                            <th>Date</th>
                            <th>Account(Explanation)</th>
                            <th>Debit</th>
                            <th>Credit</th>
                            <th>RadioBtn</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>{datetoday()}</td>
                            <td><input type='text' value={acc} onChange={(e)=>setacc(e.target.value)} placeholder='Account'></input></td>
                                <td><input type='text'value={debit} onChange={(e)=>setdeb(e.target.value)} placeholder='Debit'></input></td>
                               <td> <input type='text' value={credit} onChange={(e)=>setcred(e.target.value)} placeholder='Credit'></input></td>
                               <td> <input type='radio' id='debit' value='debit'name='track'></input><label for='debit'>debit</label><input value='credit'type='radio' id='credit' name='track'></input><label for='credit'>credit</label></td>
                                <td><input type='text' value={val} onChange={(e)=>setval(e.target.value)} placeholder='Value'></input></td>
                            
                        </tr>
                        {journal.length? 
                         journal.map((v,i)=>(
                            <tr>
                            <td>{v['date']}</td>
                            <td>{v['acc']}</td>
                            <td>{v['debit']}</td>
                            <td>{v['credit']}</td>
                            <td>{}</td>
                            <td>${v['value']}</td>
                            </tr>
                            
                            
                        ))
                        // <h3>We have something to show</h3>
                         :<h2>Nothing to show</h2>}
                       
                        
                        <tr>
                            <td colSpan='6'><button onClick={addEntry}>Add</button></td>
                            </tr>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}