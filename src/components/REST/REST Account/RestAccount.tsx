import { useState } from "react";
import axios from "axios";


export interface Account{
    userid: number,
    username: string,
    password: string,
    account_type: string,
    email: string,
    fname: string,
    mname: string,
    lname: string,
    business_name: string,
    address: string,
    contactnum: string,
    gender: string,
    bday: string
}


export const RestAccount = ():[ (userid:number)=> void,(userid:number)=>void,(account:Account)=>void,(account:Account)=>void, Account|any, string] => {
    const [account, setAccount] = useState<Account>();
    const [error, setError] = useState("");

    
    function addAccount(account:Account){
        axios.post("https://dilven-pos-sales-management-database-2.onrender.com/user/postUser",{
            username: account.username,
            password: account.password,
            account_Type: account.account_type,
            email: account.email,
            fname: account.fname,
            mname: account.mname,
            lname: account.lname,
            business_name: account.business_name,
            address: account.address,
            contactnum: account.contactnum,
            gender: account.gender,
            bday: account.bday
        }).then((response) => {
            setAccount(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            setError(error.message);
        })
  
    }

    function editAccount(account:Account){
        axios.put("https://dilven-pos-sales-management-database-2.onrender.com/user/putUser?userid=" + account.userid,{
            username: account.username,
            password: account.password,
            account_Type: account.account_type,
            email: account.email,
            fname: account.fname,
            mname: account.mname,
            lname: account.lname,
            business_name: account.business_name,
            address: account.address,
            contactnum: account.contactnum,
            gender: account.gender,
            bday: account.bday
        }).then((response) => {
            setAccount(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            setError(error.message);
        })
    }

    function getAccountbyId (userid:number|undefined) {
        axios.get("https://dilven-pos-sales-management-database-2.onrender.com/user/getByUser?userid=" + userid,{
        }).then((response) => {
            setAccount(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            setError(error.message);
        })
    }

    function deleteByID (userid:number|undefined){
        const confirm = window.confirm(`Are you sure you want to delete the account for this account?`);
        if (confirm) {
            axios.delete("https://dilven-pos-sales-management-database-2.onrender.com/user/deleteAccount/" + userid,{
            }).then((response) => {
                setAccount(response.data);
                console.log(response.data);  
                window.location.reload()  
            })
            .catch((error) => {
                setError(error.message);
            })
        }
        
    }
    return[deleteByID,getAccountbyId,editAccount,addAccount,account,error]
}
