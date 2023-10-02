import React from 'react';
import './TransactionH.css';

const TransactionHistory: React.FC = () => {
    const transactions = [
      {
          transactionid: '1',
          date: 'September 27, 2023',
          cashier: 'Ben 10',
      },
      {
          transactionid: '2',
          date: 'September 27, 2023',
          cashier: 'Viper',
      },
      {
          transactionid: '3',
          date: 'September 27, 2023',
          cashier: 'Gru',
      },
      {
          transactionid: '4',
          date: 'September 27, 2023',
          cashier: 'Charizard',
      },
    ];
    const [transactionList, setTransactionList] = React.useState<
      { transactionid: string; date: string; cashier: string}[] | undefined
    >(transactions)
  
    const [text, setText] = React.useState<string>('');
  
    const handleOnClick = () => {
      const findTransaction =
        transactionList && transactionList?.length > 0
          ? transactionList?.filter((u) => u?.transactionid === text)
          : undefined;
  
      console.log(findTransaction);
  
      setTransactionList(findTransaction);
    };
  
    return (
      <div>
        <div className="header"/>
        <div className="bg">
        <div className="nav">
          <div className="title">
            <h2>All Transaction</h2>
          </div>
          <div className="input__wrapper">
            <input
              type="text"
                placeholder="Search Transaction"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setTransactionList(transactions);
                }}
            />
            <button disabled={!text} onClick={handleOnClick}>
              Search
            </button>
          </div>
  
        </div>
  
        <div className="body">
          {transactionList && transactionList?.length === 0 && (
            <div className="notFound">No Transaction Found</div>
          )}
  
          {transactionList &&
            transactionList?.length > 0 &&
            transactionList?.map((user) => {
              return (
                <div className="body__item">
                  <h3>TransactionID: {user?.transactionid}</h3>
                  <p>Date: {user?.date}</p>
                  <p>Cashier: {user?.cashier}</p>
                </div>
              );
            })}
        </div>
        </div>
      </div>
    );
  };
  
  export default TransactionHistory;