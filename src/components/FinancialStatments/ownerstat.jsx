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
    tacc.map((v,i)=>(
        ow.includes(v['name']) ? oeval.push(v):console.log("no oe entry"),
        oe.includes(v['name']) ? owval.push(v):console.log("no ow entry")

    ))



    // Get all owner equity and all owner withdrawl sum them up then conclide final equity which is oe+ni-Ow








    console.log(gen,tac,ne)
    return(
        <>
        <div>
            <h3>Owner Equity Statment</h3>

        </div>


        </>
    )
}