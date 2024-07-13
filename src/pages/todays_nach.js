



import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests
import moment from 'moment'; // For date manipulation
import './home.css'; // Import your CSS file

const TodaysNach = () => {
  const [customerData, setCustomerData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   const today = moment(); // Get today's date

    //   const response = await axios.get('http://localhost:4000/nach/fetch-data'); // Replace with your API endpoint URL

    //   const filteredData = response.data.filter(customer => {
    //     const presentationDate = moment(customer.start_date);
    //     console.log(customer.start_date , today);
    //     // Check if presentation date is on the current date (ignoring time)
    //     return presentationDate.isSame(today, 'day');
        
    //   });

    //   setCustomerData(filteredData);
    // };

    const fetchData = async () => {
      const today = moment(); // Get today's date
    
      const response = await axios.get(process.env.REACT_APP_API+'/nach/fetch-data'); // Replace with your API endpoint URL
    
      const filteredData = response.data.filter(customer => {
        const presentationDate = moment(customer.proposed_payment_date);
        // console.log(customer.start_date , today.format('YYYY-MM-DD')); // Log for debugging
    
        // Extract month and day from both dates
        const presentationMonth = presentationDate.month();
        const presentationDay = presentationDate.date();
        const currentMonth = today.month();
        const currentDay = today.date();
    
        // Check if month and day match (ignoring year)
        // return presentationMonth === currentMonth && presentationDay === currentDay;
        return presentationMonth === currentMonth ;
      });
    
      setCustomerData(filteredData);
    };
    

    fetchData();
  }, []);


  const newOrderData = async () => {
    const today = moment(); // Get today's date

    const response = await axios.get(process.env.REACT_APP_API+'/nach/fetch-data'); // Replace with your API endpoint URL

    const filteredData = response.data.filter(customer => {
      const presentationDate = moment(customer.proposed_payment_date);
      // Check if presentation date is on the current date (ignoring time)
      return presentationDate.isSame(today, 'day');
    });

    setCustomerData(filteredData);
  };
  const handleCheckboxChange = (customerId) => {
    const index = selectedCustomers.indexOf(customerId);
    if (index === -1) {
      setSelectedCustomers([...selectedCustomers, customerId]);
    } else {
      const updatedSelectedCustomers = [...selectedCustomers];
      updatedSelectedCustomers.splice(index, 1);
      setSelectedCustomers(updatedSelectedCustomers);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCustomers([]);
    } else {
      const allCustomerIds = customerData.map(customer => customer.customer_id);
      setSelectedCustomers(allCustomerIds);
    }
    setSelectAll(!selectAll);
  };


  const handlePresentNACH = async () => {
    try {
      const requestData = customerData
        .filter(customer => selectedCustomers.includes(customer.customer_id))
        .map(customer => ({
          abc:customer.abc,
          amount: customer.amount,
          currency: "INR",
          method: "emandate", // Assuming 'emandate' is the default method
          payment_capture: "1", 
          customer_id: customer.customer_id,
          // customer_id:'cust_OLQjobwH6QGaC3',
          // token: { // Include 'token' only if it exists
            auth_type: customer.auth_type,
            amount: customer.amount,
            expire_at: customer.expire_at,
            // date_of_presentation:customer.start_date,
            // bank_account: {
              // beneficiary_name: customer.beneficiary_name,
              beneficiary_name:customer.person_name,
              account_number: customer.account_number,
              account_type: customer.description,
              // ifsc_code: customer.ifsc_code
              ifsc_code:customer.ifsc_code,
              year:customer.year,
              status_after_presentation : customer.current_status,
            // }
          // } ,
          receipt: customer.receipt
        }));
  
      console.log("Request Data:", requestData); // Log requestData before sending the request
  
      const response = await axios.post(process.env.REACT_APP_API+'/nach/create_order', requestData);
      // fetchData();
      // useEffect();
      newOrderData();
      // handleRecurringPayment();
      console.log("Response:this the response", response.data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleRecurringPayment = async () => {
    try {
      if (selectedCustomers.length === 0) {
        console.error("No customers selected for recurring payment");
        return; // Handle no selection error (e.g., display message)
      }
  
      const recurringPaymentData = selectedCustomers.map(customerId => {
        const customer = customerData.find(c => c.customer_id === customerId);
  
        return {
          // email: customer.email,
          email:customer.email,
          // email:"trilok.panchal@eduvanz.com",
          // Replace with actual email or retrieve from data
          // contact: customer.contact, // Replace with actual contact or retrieve from data
          contact:customer.mobile_num,
          amount: customer.amount, // Assuming amount is determined elsewhere
          currency: "INR",
          order_id: customer.order_id, // Placeholder, will be filled later
          // customer_id: 'cust_OLQjobwH6QGaC3',
          customer_id:customer.customer_id,
          // token: customer.token_id,
          token:customer.token_id,
          recurring: "1",
          notes: {
            "note_key_1": "Tea. Earl grey. Hot.",
            "note_key_2": "Tea. Earl grey. Decaf."
          },
          description: "dckjnc jh"
          // Include additional fields if required by your API (e.g., token if mandatory)
        };
      });
  
      console.log("Request Data:", recurringPaymentData);
  
      const response = await fetch('http://localhost:4000/nach/recurring_payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recurringPaymentData)
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Error creating recurring payment: ${errorResponse.error}`);
      }
  
      const responseData = await response.json();
      console.log("Recurring Payment Successful:", responseData);
      // Handle successful recurring payment (e.g., update UI)
      
    } catch (error) {
      console.error("Error processing recurring payments:", error);
      // Handle error (e.g., display error message to the user)
    }
  };
  

  
  
  

  return (
    <div className="customer-table-container">
      <h1>Current Month's NACH Details</h1>
      <div className="buttons-container">
        <button className="Select-NACH" onClick={handleSelectAll}>{selectAll ? 'Deselect All' : 'Select All'}</button>
        <button disabled={selectedCustomers.length === 0} onClick={handlePresentNACH}>Present NACH</button>
        <button disabled={selectedCustomers.length === 0} onClick={handleRecurringPayment}>Start Recurring Payments</button>
      </div>
      {customerData.length > 0 ? (
        <table className="customer-table">
          <thead>
            <tr>
             
              <th>Customer ID</th>
              <th>Method</th>
              <th>Payment Capture</th>
              <th>Auth Type</th>
              <th>EMI Amount</th>
             <th>Email</th>
              <th>Beneficiary Name</th>
              <th>Account Number</th>
              <th>Account Type</th>
              <th>IFSC Code</th>
              <th>Receipt</th>
              <th>Start Date</th>
              <th>Status After Presentation</th>
              <th>Order_ID</th>
              <th>Token_ID</th>
              <th>Year</th>
              <th>Mobile Number</th>
              <th>Provider Type</th>
              <th>Proposed Payment Date</th>
              <th>Select to Present</th>
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
                <td>{customer.description}</td>
                <td>{customer.ifsc_code}</td>
                <td>{customer.receipt}</td>
                <td>{customer.start_date}</td>
                <td>{customer.current_status}</td>
                <td>{customer.order_id}</td>
                <td>{customer.token_id}</td>
                <td>{customer.year}</td>
                <td>{customer.mobile_num}</td>
                <td>{customer.provider_type}</td>
                <td>{customer.proposed_payment_date}</td>

                <td>
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.customer_id)}
                    onChange={() => handleCheckboxChange(customer.customer_id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No customers presented NACH today.</p>
      )}
    </div>
  );
};

export default TodaysNach;
