







import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests
import moment from 'moment'; // For date manipulation
import './home.css'; // Import your CSS file

var totalAmnt_2=0
var failCont_2=0
const CurrentMonth = () => {
  const [customerData, setCustomerData] = useState([]);
  const [totalAmount_2, setTotalAmount_2] = useState(0);
  const [failCount_2, setfailcount_2] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const today = moment();
      const currentMonth = today.month(); // Get current month (0-indexed)

      const response = await axios.get(process.env.REACT_APP_API+'/nach/fetch-data'); // Replace with your API endpoint URL
      const currentMonthStart = moment().startOf('month'); // Get start of current month

      // console.log(currentMonth);
      // console.log(response.data[0].start_date);
      const filteredData = response.data.filter(customer => {
       const presentationDate = moment(customer.proposed_payment_date);
      //  console.log(presentationDate.month());
      // console.log(presentationDate.month() , currentMonth);
      //  return presentationDate.isSameOrAfter(currentMonthStart, 'day') || presentationDate.month() === currentMonth; // Check if month matches current month (optional)
      return presentationDate.month() === currentMonth;
     });
     
     const total_2 = filteredData.reduce((acc, curr) => {
      const emi_amount = parseFloat(curr.emi_amount);
      return !isNaN(emi_amount) ? acc + emi_amount : acc;
    }, 0);

    const failCount_2 = filteredData.filter((customer) => customer.current_status === 'captured').length;

      setCustomerData(filteredData);
      setTotalAmount_2(total_2);
      setfailcount_2(failCount_2);
    };

    fetchData();
  }, []);
  
  totalAmnt_2 = totalAmount_2
  failCont_2 = failCount_2

  return (
    <div className="customer-table-container">
      <h1>This is the Current Month's NACH Details</h1>
      {customerData.length > 0 ? (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Method</th>
              <th>Payment Capture</th>
              <th>Auth Type</th>
              <th>EMI Amount</th>
              <th>EMail</th>
              <th>Beneficiary Name</th>
              <th>Account Number</th>
              <th>Account Type</th>
              <th>IFSC Code</th>
              <th>Receipt</th>
              <th>Date of Presentation</th>
              <th>Status After Presentation</th>
              <th>Provider Type</th>
              <th>Proposed Payment Date</th>
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
                <td>{customer.start_date}</td>
                <td>{customer.current_status}</td>
                <td>{customer.provider_type}</td> 
                <td>{customer.proposed_payment_date}</td> 
                {/* <p>Total Amount: {failCount_2}</p> */}
              </tr>
              
            ))}
          </tbody>
        </table>
        
      ) : (
        <p>No customers presented NACH in the current month yet.</p>
      )}
    </div>
  );
};

export  {CurrentMonth,totalAmnt_2 , failCont_2};

