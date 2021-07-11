import react, { useState } from 'react'
import './style.css'
import firebase from '../configuration/firebase'
import {Link} from 'react-router-dom'

export default function GeneralJournal() {
    
    const [acc,setacc]=useState()
    const[debit,setdeb]=useState()
    const[credit,setcred]=useState()
    const[val,setval]=useState()
    const[rdb,setrdb]=useState()
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
        generjournal.tacc=rdb
        
        var key=firebase.database().ref('/').push().key
        // generjournal.key=key
        console.log(key)
        setjournal([...journal,generjournal])
        setacc(" ")
        setdeb(" ")
        setcred(" ")
        setval(" ")
        // AddGeneral()
        console.log(journal,"journal")
        console.log(generjournal,'generaljournal')
        
        // now firebase work for generaljournal
        firebase.database().ref('/').child('generalentries').push(generjournal)
        // for taccount
        var tacccart={

        }
        tacccart.tabname=generjournal['credit']
        tacccart.value=generjournal['value']
        tacccart.post='credit'
        tacccart.belongsto=key
        
        // console.log(tacccart)
        firebase.database().ref('/').child('taccount').push(tacccart)
        var tacccart1={}
        tacccart1.tabname=generjournal['debit']
        tacccart1.value=generjournal['value']
        tacccart1.post='debit'
        tacccart1.belongsto=key

        firebase.database().ref('/').child('taccount').push(tacccart1)
        // console.log(tacccart)

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
                               <td>
                               <input type='radio' id='debit' value='debit'name='track' onChange={(e)=>setrdb(e.target.value)}></input>
                               <label for='debit'>debit</label>
                               <input value='credit'type='radio' id='credit' name='track' onChange={(e)=>setrdb(e.target.value)}></input>
                               <label for='credit'>credit</label></td>
                                <td><input type='text' value={val} onChange={(e)=>setval(e.target.value)} placeholder='Value'></input></td>
                            
                        </tr>
                        {journal.length? 
                         journal.map((v,i)=>(
                            <tr>
                            <td>{v['date']}</td>
                            <td>{v['acc']}</td>
                            <td>{v['debit']}</td>
                            <td>{v['credit']}</td>
                            <td>{v['tacc']}</td>
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
            <div className="container">
                <h5>asdfghj</h5>
                <Link to='/tacc'>T Accounts</Link>
            </div>
        </div>
        </>
    )
}