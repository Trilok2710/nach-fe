


import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests
import './home.css'; // Import your CSS file

const Display = () => {
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]); // State for selected customers
  const [selectedMonth, setSelectedMonth] = useState(null); // State for selected month
  const [AllCustomerData, setAllCustomerData] = useState([]);


  const fetchData = async (selectedMonth) => {
    const url = process.env.REACT_APP_API+'/nach/fetch-data'; // Replace with your API endpoint URL
    const params = selectedMonth ? { month: selectedMonth } : {}; // Add month param if selected

    try {
      const response = await axios.get(url, { params });
      setCustomerData(response.data);
      setAllCustomerData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors appropriately (e.g., display error message)
    }
  };


  const fetchDataParticularMonth = async ()=>{
    const m = Number(selectedMonth) + Number('1');
    console.log(m);
        const url = process.env.REACT_APP_API+'/nach/data-month';
    const params = m ? { month: m } : {};
    try {
      const response = await axios.get(url,{params} );
      // setCustomerData(response.data);
      // setAllCustomerData(response.data);
      // handleLoadData();
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors appropriately (e.g., display error message)
    }
    fetchData();
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await axios.get('http://localhost:4000/nach/fetch-data'); // Replace with your API endpoint URL
    //   setCustomerData(response.data);
    // };
    fetchData();
  }, []);

  const handleSelectCustomer = (customerId) => {
    const isSelected = selectedCustomers.includes(customerId);
    setSelectedCustomers(isSelected ? selectedCustomers.filter(id => id !== customerId) : [...selectedCustomers, customerId]);
  };

  const handleSelectAll = () => {
    setSelectedCustomers(customerData.map(customer => customer.customer_id));
  };

  // const handleDeselectAll = () => {
  //   setSelectedCustomers([]);
  // };

  // const handlePresentNach = () => {
  //   // Implement logic to handle presenting NACH for selected customers (e.g., API call)
  //   console.log('Presenting NACH for selected customers:', selectedCustomers);
  // };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleLoadData = async() => {
  
    if (!selectedMonth) {
      return; // Do nothing if no month is selected
    }

    console.log(selectedMonth);
    // await fetchData();
    const filteredData = AllCustomerData.filter(customer => {
      const customerMonth = new Date(customer.proposed_payment_date).getMonth(); // Get month from start_date
      return customerMonth === parseInt(selectedMonth, 10); // Compare with selected month (converted to integer)
    });

    setCustomerData(filteredData); // Update displayed data
    console.log(filteredData);
    
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="customer-table-container">
      <h1>All Details</h1>
      <div className="filter-container">
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="" className='Select-Month'>Select Month</option>
          {months.map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
          
        </select>
        
        <button onClick={handleLoadData} className='LOAD'>LOAD</button>
      </div>
      <div className="buttons-container">
        <button onClick={handleSelectAll}>Select All</button>
        {/* <button disabled={selectedCustomers.length === 0} onClick={handlePresentNach}>Present NACH</button> */}
        {/* <button disabled={selectedCustomers.length === 0} onClick={handleRecurringPayment}>Start Recurring Payments</button> */}
      </div>
      {customerData.length > 0 ? (
        <table className="customer-table">
          <thead>
          <tr>
             {/* <th>abc</th> */}
             <th>Customer ID</th>
             <th>Method</th>
             <th>Payment Capture</th>
             <th>Auth Type</th>
             <th>Max Amount</th>
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
             <th>Proposed_Payment_Date</th> 
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
               <td>{customer.amount}</td>
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
                    onChange={() => handleSelectCustomer(customer.customer_id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        
        <div><p>No customers presented NACH today.</p>
        <button onClick={fetchDataParticularMonth} className='LOAD'>LOAD 2</button>
        </div>
        
      )}
    </div>
  );
};

export default Display;

