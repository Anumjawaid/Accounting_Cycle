import react, { useState, useEffect } from 'react'
import './style.css'
import firebase from '../configuration/firebase'
import { Link } from 'react-router-dom'
import sidebar from './sidebar'

export default function GeneralJournal() {
    const[acc,setacc]=useState()
    const [debit, setdeb] = useState()
    const [credit, setcred] = useState()
    const [val, setval] = useState()
    const [debst,setDebst]=useState("Owner equity")
    const [credst,setCredst]=useState("Owner equity")
    //actual journal
    const [journal, setjournal] = useState([])
    const accts = []//for getting taccounts name from firebase
    const acctsdata = []//for getting taccounts name from firebase
    const dkey=[]

    var [tac, settac] = useState([])
    var [tacdata, settacdata] = useState([])
    var [keydata,setkeydata]=useState([])

    function myFunc(total, num) {
        return total +num;
      }
    firebase.database().ref('/').child('Tnames').on('child_added', (s) => (
        accts.push(s.val())
    ))
    firebase.database().ref('/').child('Taccounts').on('child_added', (s) => (
        dkey.push(s.key),
        acctsdata.push(s.val())
    ))
    useEffect(() => {
        settac(accts)



    }, [acc])
    useEffect(() => {

        settacdata(acctsdata)
        setkeydata(dkey)



    }, [acc])
    console.log(acctsdata,keydata,"taccounts")


    const generjournal = {}
    const addEntry = () => {
        if (acc == '' || debit == '' || credit == '' || val == '') {
            alert("PLEASE FILL ALL DETAILS BATAMEEZI NAHI ")
        }
        else {
            generjournal.acc = acc
            generjournal.date = datetoday()
            generjournal.credit = credit
            generjournal.debit = debit
            generjournal.value = Number(val)
            generjournal.crstat=credst
            generjournal.debst=debst



            setjournal([...journal, generjournal])
            setacc("")
            setdeb("")
            setcred("")
            setval("")
            // AddGeneral()
            console.log(journal, "journal")
            console.log(generjournal, 'generaljournal')
            // now firebase work for generaljournal
            firebase.database().ref('/').child('generalentries').push(generjournal)
            // for taccount
            var taccounttemp = {}
            console.log(tac.includes(generjournal['credit']),tac.includes(generjournal['debit']))
            if(tac.length==0 ||(!(tac.includes(generjournal['credit'])) && !(tac.includes(generjournal['debit']))))

            {
                console.log("1st case")
                firebase.database().ref('/').child('Tnames').push(generjournal['credit'])
                firebase.database().ref('/').child('Tnames').push(generjournal['debit'])
                taccounttemp.name=generjournal['credit']
                taccounttemp.credit=[generjournal['value']]
                taccounttemp.debit=[0]
                taccounttemp.result=taccounttemp.debit.reduce(myFunc)-taccounttemp.credit.reduce(myFunc)

                firebase.database().ref('/').child('Taccounts').push(taccounttemp)
                taccounttemp.name=generjournal['debit']
                taccounttemp.debit=[generjournal['value']]
                taccounttemp.credit=[0]
                taccounttemp.result=taccounttemp.debit.reduce(myFunc)-taccounttemp.credit.reduce(myFunc)
                firebase.database().ref('/').child('Taccounts').push(taccounttemp)

            }
            else if(tac.includes(generjournal['credit']) && tac.includes(generjournal['debit'])){
                console.log('2nd cse')
                // both updated
                var ind=tacdata.findIndex((s,i)=>(tacdata[i]['name']==generjournal['credit']))
                var keyacc=keydata[ind]

                console.log(keyacc,"updated credit")
                console.log(tacdata[ind]['name'],tacdata[ind]['credit'],tacdata[ind]['debit'],"both data updated")
                var place =tacdata[ind]['credit']
                place.push(generjournal['value'])
                firebase.database().ref('/').child('Taccounts'+'/'+keyacc).set(
                    {
                        name:tacdata[ind]['name'],
                        credit:place,
                        debit:tacdata[ind]['debit'],
                        result:tacdata[ind]['debit'].reduce(myFunc)-place.reduce(myFunc)


                    }
                )
                // debit update
                var ind=tacdata.findIndex((s,i)=>(tacdata[i]['name']==generjournal['debit']))
                var keyacc=keydata[ind]
                var place=tacdata[ind]['debit']
                place.push(generjournal['value'])
                firebase.database().ref('/').child('Taccounts'+'/'+keyacc).set(
                    {
                        name:tacdata[ind]['name'],
                        debit:place,
                        credit:tacdata[ind]['credit'],
                        result:place.reduce(myFunc)-tacdata[ind]['credit'].reduce(myFunc)

                    }
                )
                

            }
            else{
                if(tac.includes(generjournal['credit'])){
                    console.log('3rd case')
                    // update the credit entry for this name and add new entry to debit
                    var ind=tacdata.findIndex((s,i)=>(tacdata[i]['name']==generjournal['credit']))
                    var keyacc=keydata[ind]

                    console.log(keyacc,"updated credit")
                    console.log(tacdata[ind]['name'],tacdata[ind]['credit'],tacdata[ind]['debit'],"updated credit entries")
                    var place=tacdata[ind]['credit']
                    place.push(generjournal['value'])
                    firebase.database().ref('/').child('Taccounts'+'/'+keyacc).set(
                        {
                            name:tacdata[ind]['name'],
                            credit:place,
                            debit:tacdata[ind]['debit'],
                        result:tacdata[ind]['debit'].reduce(myFunc)-place.reduce(myFunc)

                        }
                    )
                    // new to debit
                    taccounttemp.name=generjournal['debit']
                taccounttemp.debit=[generjournal['value']]
                taccounttemp.credit=[0]
                taccounttemp.result=taccounttemp.debit.reduce(myFunc)-taccounttemp.credit.reduce(myFunc)

                firebase.database().ref('/').child('Taccounts').push(taccounttemp)
                firebase.database().ref('/').child('Tnames').push(generjournal['debit'])




                }
                else{
                    // update the debit entry and add  new to credit
                    console.log('4th case')
                    console.log(tacdata.keys(),"coming from updated debit")
                    var ind=tacdata.findIndex((s,i)=>(tacdata[i]['name']==generjournal['debit']))
                    var keyacc=keydata[ind]

                    // console.log(tacdata[ind]['name'],tacdata[ind]['credit'],"updated debit entries")
                    var place=tacdata[ind]['debit']
                    // console.log(place,"before push")
                    place.push(generjournal['value'])
                    // console.log(place,"after push")
                    firebase.database().ref('/').child('Taccounts'+'/'+keyacc).set(
                        {
                            name:tacdata[ind]['name'],

                            debit:place,
                            credit:tacdata[ind]['credit'],
                            result:place.reduce(myFunc)-tacdata[ind]['credit'].reduce(myFunc)

                        }
                    )
                    // new to credit
                    taccounttemp.name=generjournal['credit']
                taccounttemp.credit=[generjournal['value']]
                taccounttemp.debit=[0]
                taccounttemp.result=taccounttemp.debit.reduce(myFunc)-taccounttemp.credit.reduce(myFunc)

                firebase.database().ref('/').child('Taccounts').push(taccounttemp)
                firebase.database().ref('/').child('Tnames').push(generjournal['credit'])

                }
            }

            





        }


    }

    const datetoday = () => {
        var month = ['Jan', "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
        var d = new Date();

        var date = (d.getUTCDate() + "," + month[d.getMonth()] + "," + d.getFullYear())
        return date
    }
    // console.log(datetoday)
var [show,setshow]=useState('a')
console.log(show,)
    return (
        <>
        <sidebar />
            <div className="conatiner cent">
                <div className="row">
                    <div className="col-md-12 cent">
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
                                <th>Value</th>
                            </tr>
                            <tr>
                                <td>{datetoday()}</td>
                                <td><input type='text' value={acc} onChange={(e) => setacc(e.target.value)}  placeholder='Account'></input></td>
                                <td>
                                    <input type='text' value={debit} onChange={(e) => setdeb(e.target.value)} placeholder='Debit' onFocus={()=>setshow('show')}></input>
                                    {show !='show'
                                    ?
                                    console.log('k'):
                                        <select className='sele' onChange={(e)=>setDebst(e.target.value)}>
                                        <option>Owner equity</option>
                                        <option>Liability</option>
                                        <option>Owner withdrawl</option>
                                        <option>Asset</option>
                                        <option>Revenue</option>
                                        <option>Expense</option>

                                    </select>}
                                </td>
                                <td>
                                     <input type='text' value={credit} onChange={(e) => setcred(e.target.value)} placeholder='Credit' onFocus={()=>setshow('showw')}></input> 
                                     {show !='showw'
                                    ?
                                    console.log('k'):
                                        <select className='sele' onChange={(e)=>setCredst(e.target.value)}>
                                        <option>Owner equity</option>
                                        <option>Liability</option>
                                        <option>Owner withdrawl</option>
                                        <option>Asset</option>
                                        <option>Revenue</option>
                                        <option>Expense</option>

                                    </select>}
                                </td>
                                <td><input type='text' value={val} onChange={(e) => setval(e.target.value)} placeholder='Value'></input></td>

                            </tr>
                            {journal.length ?
                                journal.map((v, i) => (
                                    <tr>
                                        <td>{v['date']}</td>
                                        <td>{v['acc']}</td>
                                        <td>{v['debit']}</td>
                                        <td>{v['credit']}</td>
                                        <td>${v['value']}</td>
                                    </tr>


                                ))
                                // <h3>We have something to show</h3>

                                : <h2>Nothing to show</h2>}


                            <tr>
                                <td colSpan='6'><button onClick={addEntry}>Add</button></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="container" style={{marginTop:'40px'}}>
                    <Link to='/tacc' className='linkcon' >T Accounts</Link>
                </div>
            </div>
        </>
    )
}