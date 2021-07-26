import react, { useState, useEffect } from 'react'
import './style.css'
import firebase from '../configuration/firebase'
import { Link } from 'react-router-dom'

export default function GeneralJournal() {

    const [acc, setacc] = useState()
    const [debit, setdeb] = useState()
    const [credit, setcred] = useState()
    const [val, setval] = useState()
    const [rdb, setrdb] = useState()
    //actual journal
    const [journal, setjournal] = useState([])
    const accts = []//for getting taccounts from firebase
    var [tac, settac] = useState([])
    firebase.database().ref('/').child('Taccounts').on('child_added', (s) => (
        accts.push(s.val())
    ))
    useEffect(() => {
        settac(accts)



    }, [acc])
    // console.log(tac[0],"taccounts")


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
            generjournal.value = val
            generjournal.tacc = rdb



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
            

            try {
                console.log(tac, "tacme kya")
                if (tac.length == 0) {

                    taccounttemp.name = generjournal['credit']
                    taccounttemp.crvalue = [generjournal['value']]
                    taccounttemp.debvalue = [12]
                    //   console.log(taccounttemp,"taccounttemp")
                    firebase.database().ref('/').child('Taccounts').push(taccounttemp)
                    var k = firebase.database().ref('/').child('Taccounts/').getKey()
                    console.log(k,"key1")
                    taccounttemp.name = generjournal['debit']
                    taccounttemp.debvalue = [generjournal['value']]
                    taccounttemp.crvalue = [0]
                    //   console.log(taccounttemp,"taccounttemp")
                    firebase.database().ref('/').child('Taccounts').push(taccounttemp)
                    console.log(k,"key2")



                }
                
                else {
                    var e = 0
                    for (e; e < tac.length; e++) {
                        console.log(tac[e]["name"], generjournal['credit'], generjournal['credit'] == tac[e]['name'])
                      
                        if (generjournal['credit'] == tac[e]['name']) {
                            console.log("If check me ayaS")
                            console.log("key", firebase.database().ref('/Taccounts').getKey())
                            // update the entry 
                            console.log(tac[e]['crvalue'], tac[e]['debvalue'], tac[e]['name'], 'values')
                            firebase.database().ref('/').child('Taccounts').set({
                                name: tac[e]['name'],
                                crvalue: [...tac[e]['crvalue'], generjournal['value']],
                                debvalue: tac[e]['debvalue']
                            })
                        }
                        if (generjournal['debit'] == tac[e]['name']) {
                            console.log("Dosray if me aya")

                            firebase.database().ref('/').child('Taccounts').set({
                                name: tac[e]['name'],
                                debvalue: [...tac[e]['debvalue'], generjournal['value']],
                                crvalue: tac[e]['crvalue']
                            })

                        }


                    }

                }
            }
            catch {

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
                                <th>RadioBtn</th>
                                <th>Value</th>
                            </tr>
                            <tr>
                                <td>{datetoday()}</td>
                                <td><input type='text' value={acc} onChange={(e) => setacc(e.target.value)} placeholder='Account'></input></td>
                                <td><input type='text' value={debit} onChange={(e) => setdeb(e.target.value)} placeholder='Debit'></input></td>
                                <td> <input type='text' value={credit} onChange={(e) => setcred(e.target.value)} placeholder='Credit'></input></td>
                                <td>
                                    <input type='radio' id='debit' value='debit' name='track' onChange={(e) => setrdb(e.target.value)}></input>
                                    <label for='debit'>debit</label>
                                    <input value='credit' type='radio' id='credit' name='track' onChange={(e) => setrdb(e.target.value)}></input>
                                    <label for='credit'>credit</label></td>
                                <td><input type='text' value={val} onChange={(e) => setval(e.target.value)} placeholder='Value'></input></td>

                            </tr>
                            {journal.length ?
                                journal.map((v, i) => (
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