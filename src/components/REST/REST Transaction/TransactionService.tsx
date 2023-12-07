import axios from "axios";

const TRANSACTION_BASE_URL = "https://dilven-pos-sales-management-database-2.onrender.com/transaction/getAllTransaction";
const TRANSACTIONID_BASE_URL = "https://dilven-pos-sales-management-database-2.onrender.com/transaction/getByTransaction/?transactionid";

class TransactionService{
    getTransaction() {
        return axios.get(TRANSACTION_BASE_URL);
    }

    insertTransaction(transaction: any){
        return axios.post(TRANSACTION_BASE_URL, transaction);
    }

    findByTransactinid(transactionid: any){
        return axios.get(TRANSACTIONID_BASE_URL + transactionid);
    }

    putTransaction(transaction: any, transactionid: any){
        return axios.put(TRANSACTION_BASE_URL + '/' + transactionid, transaction);
    }

    deleteTransaction(transactionid: any){
        return axios.delete(TRANSACTION_BASE_URL + '/' + transactionid);
    }
}

export default new TransactionService()
