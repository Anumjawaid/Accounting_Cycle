import react, { useState, useEffect } from 'react'
import './style.css'
import firebase from '../configuration/firebase'
import { Link } from 'react-router-dom'

export default function GeneralJournal() {
    const[acc,setacc]=useState()
    const [debit, setdeb] = useState()
    const [credit, setcred] = useState()
    const [val, setval] = useState()
    //actual journal
    const [journal, setjournal] = useState([])
    const accts = []//for getting taccounts name from firebase
    const acctsdata = []//for getting taccounts name from firebase
    const dkey=[]

    var [tac, settac] = useState([])
    var [tacdata, settacdata] = useState([])
    var [keydata,setkeydata]=useState([])

    firebase.database().ref('/').child('Tnames').on('child_added', (s) => (
        accts.push(s.val())
    ))
    var temp={}
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
        if (acc == ' ' || debit == ' ' || credit == ' ' || val == ' ') {
            alert("PLEASE FILL ALL DETAILS BATAMEEZI NAHI ")
        }
        else {
            generjournal.acc = acc
            generjournal.date = datetoday()
            generjournal.credit = credit
            generjournal.debit = debit
            generjournal.value = Number(val)



            setjournal([...journal, generjournal])
            setacc("")
            setdeb("")
            setcred("")
            setval("")
            // AddGeneral()
            console.log(journal, "journal")
            console.log(generjournal, 'generaljournal')
            // now firebase work for generaljournal
            // firebase.database().ref('/').child('generalentries').push(generjournal)
            // for taccount
            var taccounttemp = {}
            console.log(tac.includes(generjournal['credit']),tac.includes(generjournal['debit']))
            if(tac.length==0 ||(!(tac.includes(generjournal['credit'])) && !(tac.includes(generjournal['debit']))))
            {
                firebase.database().ref('/').child('Tnames').push(generjournal['credit'])
                firebase.database().ref('/').child('Tnames').push(generjournal['debit'])
                taccounttemp.name=generjournal['credit']
                taccounttemp.credit=[generjournal['value']]
                taccounttemp.debit=[0]
                firebase.database().ref('/').child('Taccounts').push(taccounttemp)
                taccounttemp.name=generjournal['debit']
                taccounttemp.debit=[generjournal['value']]
                taccounttemp.credit=[0]
                firebase.database().ref('/').child('Taccounts').push(taccounttemp)

            }
            else if(tac.includes(generjournal['credit']) && tac.includes(generjournal['debit'])){
                // both updated
                var ind=tacdata.findIndex((s,i)=>(tacdata[i]['name']==generjournal['credit']))
                var keyacc=keydata[ind]

                console.log(keyacc,"updated credit")
                console.log(tacdata[ind]['name'],tacdata[ind]['credit'],tacdata[ind]['debit'],"both data updated")
                firebase.database().ref('/').child('Taccounts'+'/'+keyacc).set(
                    {
                        name:tacdata[ind]['name'],
                        credit:[...tacdata[ind]['credit'],generjournal['value']],
                        debit:[tacdata[ind]['debit']]
                    }
                )
                // debit update
                var ind=tacdata.findIndex((s,i)=>(tacdata[i]['name']==generjournal['debit']))
                var keyacc=keydata[ind]
                firebase.database().ref('/').child('Taccounts'+'/'+keyacc).set(
                    {
                        name:tacdata[ind]['name'],
                        debit:[...tacdata[ind]['debit'],generjournal['value']],
                        credit:[tacdata[ind]['credit']]
                    }
                )
                

            }
            else{
                if(tac.includes(generjournal['credit'])){
                    // update the credit entry for this name and add new entry to debit
                    var ind=tacdata.findIndex((s,i)=>(tacdata[i]['name']==generjournal['credit']))
                    var keyacc=keydata[ind]

                    console.log(keyacc,"updated credit")
                    console.log(tacdata[ind]['name'],tacdata[ind]['credit'],tacdata[ind]['debit'],"updated credit entries")
                    firebase.database().ref('/').child('Taccounts'+'/'+keyacc).set(
                        {
                            name:tacdata[ind]['name'],
                            credit:[...tacdata[ind]['credit'],generjournal['value']],
                            debit:[tacdata[ind]['debit']]
                        }
                    )
                    // new to debit
                    taccounttemp.name=generjournal['debit']
                taccounttemp.debit=[generjournal['value']]
                taccounttemp.credit=[0]
                firebase.database().ref('/').child('Taccounts').push(taccounttemp)
                firebase.database().ref('/').child('Tnames').push(generjournal['debit'])




                }
                else{
                    // update the debit entry and add  new to credit
                    console.log(tacdata.keys(),"coming from updated debit")
                    var ind=tacdata.findIndex((s,i)=>(tacdata[i]['name']==generjournal['debit']))
                    var keyacc=keydata[ind]

                    console.log(keyacc,"updated debit")
                    console.log(tacdata[ind]['name'],tacdata[ind]['debit'],tacdata[ind]['credit'],"updated debit entries")
                    firebase.database().ref('/').child('Taccounts'+'/'+keyacc).set(
                        {
                            name:tacdata[ind]['name'],
                            debit:[...tacdata[ind]['debit'],generjournal['value']],
                            credit:[tacdata[ind]['credit']]
                        }
                    )
                    // new to credit
                    taccounttemp.name=generjournal['credit']
                taccounttemp.credit=[generjournal['value']]
                taccounttemp.debit=[0]
                firebase.database().ref('/').child('Taccounts').push(taccounttemp)
                firebase.database().ref('/').child('Tnames').push(generjournal['credit'])

                }
            }

            





        }


    }

    const datetoday = () => {
        var month = ['Jan', "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
        var days = ['Monday', "Tuesday", "Wednesday", 'Thursday', 'Friday', 'Saturday', 'Sunday']
        var d = new Date();

        var date = (d.getUTCDate() + "," + month[d.getMonth()] + "," + d.getFullYear())
        var day = (days[d.getDay()])
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
                                <th>Value</th>
                            </tr>
                            <tr>
                                <td>{datetoday()}</td>
                                <td><input type='text' value={acc} onChange={(e) => setacc(e.target.value)} placeholder='Account'></input></td>
                                <td><input type='text' value={debit} onChange={(e) => setdeb(e.target.value)} placeholder='Debit'></input></td>
                                <td> <input type='text' value={credit} onChange={(e) => setcred(e.target.value)} placeholder='Credit'></input></td>
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
                <div className="container">
                    <h5>asdfghj</h5>
                    <Link to='/tacc'>T Accounts</Link>
                </div>
            </div>
        </>
    )
}