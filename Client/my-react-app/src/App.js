import Axios from "axios"
import { useState } from 'react';

function App() {
  const [customerData, setCustomerData] = useState(["fddfdf", "fdfdff", "dfdfdd"]);
  const [time, setTime] = useState(0);
  const getUserData = async () => {
    try {
      var start = new Date().getTime();
      let customerDataResp = await Axios.get('http://localhost:5000/customers');
      var end = new Date().getTime();
      setTime(end - start);
      console.log(customerDataResp)
      setCustomerData(customerDataResp.data);
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="App">
      <button style={{ marginTop: "10%" }} onClick={() => getUserData()}>Fetch Customer Info</button> <br /> <br />
      Request time: {time} ms
      <table class="w3-table-all">
        <tr>
          <th>
            Balance
          </th>
          <th>
            Email
          </th>
          <th>
            Phone
          </th>
          <th>
            First Name
          </th>
          <th>
            Last Name
          </th>
        </tr>
        {customerData.map((ele, index) => <tr>
         {/* <td>
            {ele.customerID}
          </td>*/}
          <td>
            {ele.customer_balance}
          </td>
          <td>
          {ele.customer_mobile}
        </td>
          <td>
            {ele.customer_email}
          </td>
          <td>
            {ele.first_name}
          </td>
          <td>
            {ele.last_name}
          </td>
        </tr>)}
      </table>
    </div>
  );
}

export default App;
