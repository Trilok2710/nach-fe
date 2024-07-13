



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './home.css';


var totalAmnt = 0
var failCont=0
const PreviousMonth = () => {
  const [customerData, setCustomerData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [failCount, setfailcount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const today = moment();
      const currentMonth = today.month();

      // const response = await axios.get(process.env.REACT_APP_API +'/fetch-data');
      const response = await axios.get(process.env.REACT_APP_API+'/nach/fetch-data');

      const lastMonth = moment().subtract(1, 'months').startOf('month');

      const filteredData = response.data.filter((customer) => {
        const presentationDate = moment(customer.proposed_payment_date);
        // return presentationDate.isSameOrAfter(lastMonth, 'day') && presentationDate.month() === currentMonth - 1;
        return presentationDate.month() === currentMonth-1;
      });

      const total = filteredData.reduce((acc, curr) => {
        const emi_amount = parseFloat(curr.emi_amount);
        return !isNaN(emi_amount) ? acc + emi_amount : acc;
      }, 0);

      // Calculate the number of "fail" entries
      const failCount = filteredData.filter((customer) => customer.current_status === 'captured').length;

      setCustomerData(filteredData);
      setTotalAmount(total);
      setfailcount(failCount);


      // No need to set totalAmnt here (it's not used)
    };

    fetchData();
  }, []);
  totalAmnt = totalAmount
  failCont = failCount

  return (
    <div className="customer-table-container">
      <h1>Previous Month's Customers (NACH Presented)</h1>
      {customerData.length > 0 ? (
        <>
          <table className="customer-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Method</th>
              <th>Payment Capture</th>
              <th>Auth Type</th>
              <th>EMI Amount</th>
              <th>Email </th>
              <th>Beneficiary Name</th>
              <th>Account Number</th>
              <th>Account Type</th>
              <th>IFSC Code</th>
              <th>Receipt</th>
              <th>Proposed Payment Date</th>
              <th>Status After Presentation</th>
              <th>Provider Type</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((customer) => (
              <tr key={customer.customer_id}>
                <td>{customer.customer_id}</td>
                <td>{customer.method}</td>
                <td>{customer.payment_capture}</td>
                <td>{customer.auth_type}</td>
                <td>{customer.emi_amount}</td>
                <td>{customer.email}</td>
                <td>{customer.person_name}</td>
                <td>{customer.account_number}</td>
                <td>{customer.account_type}</td>
                <td>{customer.ifsc_code}</td>
                <td>{customer.receipt}</td>
                <td>{customer.proposed_payment_date}</td>
                <td>{customer.current_status}</td>
                <td>{customer.provider_type}</td>
                {/* <p>Total Amount: {failCount_2}</p> */}
              </tr>
              
            ))}
          </tbody>
        </table>
          <div className="total-amount">
            <p>Total Amount: {totalAmount.toFixed(2)}</p>
          </div>
          <div className="fail-count"> {/* New section for fail count */}
            <p>Number of Failed Entries: {failCount}</p>
          </div>
        </>
      ) : (
        <p>No customers presented NACH in the previous month.</p>
      )}
    </div>
  );
};

export {PreviousMonth, totalAmnt , failCont};

