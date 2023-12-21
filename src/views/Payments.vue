<template>
    <div class="wrapper d-flex justify-content-around" style="margin-top: 5rem;">
      <div class="expenses" >
        <div class="card rounded" style="width: 20rem; margin: 1rem;">
          <h3 class="text text-center bg-success rounded-top py-2">Payments</h3>
          <div class="card-body">
            <div class="mb-3">
              <label for="paymentamount" class="form-label">Amount: </label>
              <input v-model="paymentamount" type="number" class="form-control" id="paymentamount" placeholder="Amount" required>
            </div>
            <div class="mb-3">
              <label for="paymentdescription" class="form-label">Description: </label>
              <input v-model="paymentdescription" type="text" class="form-control" id="paymentdescription" placeholder="Description" required>
            </div>
            <div class="mb-3">
              <label for="paymentdate" class="form-label">Date: </label>
              <input v-model="paymentdate" type="date" class="form-control" id="paymentdate" required>
            </div>
            <button @click="paynow" class="btn btn-success">Pay now</button>
          </div>
        </div>
      </div>
      <div class="bill-container">
        <h1 class="text text-center bg-success rounded">BILLS</h1>
        <div class="card" style="width: 15rem; margin: 1rem; height: fit-content;">
          <div class="card-body">
            <h5>Add New Bill</h5>
            <div class="mb-2">
              <label for="addbillamount" class="form-label">Amount: </label>
              <input v-model="addbillamount" type="number" class="form-control" id="addbillamount" placeholder="Amount: " required>
            </div>
            <div class="mb-2">
              <label for="addbilldescription" class="form-label">Description: </label>
              <input v-model="addbilldescription" type="text" class="form-control" id="addbilldescription" placeholder="Description: " required>
            </div>
            <div class="mb-2">
              <label for="addbilldate" class="form-label">Due Date: </label>
              <input v-model="addbilldate" type="date" class="form-control" id="addbilldate" required>
            </div>
            <button  @click="addbills" class="btn btn-success">Add Bill</button>
          </div>
        </div>
        <div class="bills" v-for="(bill, index) in bills" :key="bill.id">
          <div class="card" style="width: 15rem; margin: 1rem; height: fit-content;" v-if="bill.amount > 0">
            <div class="card-body">
              <h5 class="d-none">{{ bill.id }}</h5>
              <h5>{{ bill.description }}</h5>
              <h5>Amount: &#8369{{ bill.amount }}</h5>
              <h5>Due date: {{ bill.due_date }}</h5>
              <button @click="() => { console.log(bill, index); paybills(index); }" class="btn btn-success mt-2">Pay now</button>
            </div>
          </div>
        </div>
      </div>
      <div class="liabilities-container">
        <h1 class="text text-center bg-success rounded p-3 py-0">LIABILITIES TO PAY</h1>
        <div class="card" style="width: 15rem; margin: 1rem; height: fit-content;">
          <div class="card-body">
            <h5>Add New Liabilities to pay</h5>
            <div class="mb-2">
              <label for="addliabilityamount" class="form-label">Amount: </label>
              <input v-model="addliabilityamount" type="number" class="form-control" id="addliabilityamount" placeholder="Amount: " required>
            </div>
            <div class="mb-2">
              <label for="addliabilitydescription" class="form-label">Description: </label>
              <input v-model="addliabilitydescription" type="text" class="form-control" id="addliabilitydescription" placeholder="Description: " required>
            </div>
            <div class="mb-2">
              <label for="addliabilitydate" class="form-label">Due Date: </label>
              <input v-model="addliabilitydate" type="date" class="form-control" id="addliabilitydate" required>
            </div>
            <div class="mb-2">
              <label for="addliabilitystart" class="form-label">Due Date: </label>
              <input v-model="addliabilitystart" type="date" class="form-control" id="addliabilitystart" required>
            </div>
            <div class="mb-2">
              <label for="addliabilityend" class="form-label">Due Date: </label>
              <input v-model="addliabilityend" type="date" class="form-control" id="addliabilityend" required>
            </div>
            <button @click="addliabilities" class="btn btn-success">Add Liabilities</button>
          </div>
        </div>
        <div class="liabilities" v-for="(liability, index1) in liabilities" :key="liability.id">
          <div class="card" style="width: 15rem; margin: 1rem; height: fit-content;">
            <div class="card-body">
              <h5 class="d-none">{{ liability.id }}</h5>
              <h5>{{ liability.description }}</h5>
              <h5>Amount: &#8369{{ liability.amount }}</h5>
              <h5>Due date: {{ liability.due_date }}</h5>
              <h5>Start date: {{ liability.start_date }}</h5>
              <h5>End date: {{ liability.end_date }}</h5>
              <input v-model="payLiabilityAmount" type="number" class="form-control" placeholder="Amount">
              <button @click="() => { console.log(liability, index1); payLiability(liability, index1); }" class="btn btn-success mt-2">Pay now</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
</template>


<script>
import { ref, onMounted, onErrorCaptured } from 'vue';
import axios from 'axios';

  export default{
    setup(){
      const billid = ref('');
      const liabilityId = ref('');
      const bills = ref([]);
      const liabilities = ref([]);
      const payLiabilityAmount = ref('');
      const paymentamount = ref('');
      const paymentdescription = ref('');
      const paymentdate = ref('');
      const addbillamount = ref('');
      const addbilldescription = ref('');
      const addbilldate = ref('');
      const addliabilityamount = ref('');
      const addliabilitydescription = ref('');
      const addliabilitydate = ref('');
      const addliabilityend = ref('');
      const addliabilitystart = ref('');

      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/bills');
          bills.value = response.data;
        } catch (error) {
          console.error('Error fetching savings:', error);
        }
      };

      const fetchData2 = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/liabilities');
          liabilities.value = response.data;
        } catch (error) {
          console.error('Error fetching savings:', error);
        }
      };

      const paynow = async () => {
        try {
        
          const payResponse = await axios.post('http://localhost:8000/api/expenditures', {
            id: '1', 
            amount: paymentamount.value,
            description: paymentdescription.value,
            date: paymentdate.value,
          });

          console.log('Pay added successfully:', payResponse.data);

          await fetchData();

          const deductResponse = await axios.patch('http://localhost:8000/api/savingpay', {
            total_amount: paymentamount.value,
          });

          console.log('Pay deducted successfully:', deductResponse.data);
          await fetchData();

          window.location.reload();

        } catch (error) {
          console.error('Error adding pay or saving:', error.response);
        }
      };

      const paybills = async (index) => {
        try {

          const bill = bills.value[index];

          const paybillResponse = await axios.post('http://localhost:8000/api/expenditures', {
            id: '1', 
            amount: bill.amount,
            description: bill.description,
            date: bill.due_date,
          });
          const expenditureId = paybillResponse.data['Monthly expenditure'].id;

          const paybillid = bill.id;

          const payedbillResponse = await axios.patch('http://localhost:8000/api/bills/' + paybillid, {
            amount: 0,
            expenditure_id: expenditureId,
          });

          console.log('Bill paid successfully:', payedbillResponse.data);
          await fetchData();

          const deductResponse = await axios.patch('http://localhost:8000/api/savingpay', {
            total_amount: bill.amount,
          });

          console.log('Pay deducted successfully:', deductResponse.data);
          await fetchData();

          window.location.reload();

        } catch (error) {
          if (error.response) {
            console.error('Server responded with an error:', error.response.status, error.response.data);
          } else if (error.request) {
            console.error('No response received from the server:', error.request);
          } else {
            console.error('Error setting up the request:', error.message);
          }
        }
      };

      const payLiability = async (liability, index1) => {
        try {
          const payLiabilityResponse = await axios.post('http://localhost:8000/api/expenditures', {
            id: '1', 
            amount: payLiabilityAmount.value,
            description: liability.description,
            date: liability.due_date,
          });

          const expenditureId = payLiabilityResponse.data['Monthly expenditure'].id;
          const payLiabilityId = liability.id;

          const payedLiabilityResponse = await axios.patch('http://localhost:8000/api/liabilities/' + payLiabilityId, {
            id: '1', 
            amount: payLiabilityAmount.value,
            expenditure_id: expenditureId,
          });

          console.log('Liability paid successfully:', payedLiabilityResponse.data);
          await fetchData();

          const deductResponse = await axios.patch('http://localhost:8000/api/savingpay', {
            total_amount: payLiabilityAmount.value,
          });

          console.log('Pay deducted successfully:', deductResponse.data);
          await fetchData();

          window.location.reload();

        } catch (error) {
          console.error('Error paying liability or saving:', error);
        }
      };

      const addbills = async () => {
        try {
          const billResponse = await axios.post('http://localhost:8000/api/bills', {
            id: '1',
            amount: addbillamount.value,
            description: addbilldescription.value,
            due_date: addbilldate.value,
          });

          console.log('Bill added successfully:', billResponse.data);

          await fetchData();

          window.location.reload();

        } catch (error) {
          console.error('Error adding bill or saving:', error.response);
        }
      };

      const addliabilities = async () => {
          try {
              const liabilityResponse = await axios.post('http://localhost:8000/api/liabilities', {
                  id: '1', 
                  amount: addliabilityamount.value,
                  description: addliabilitydescription.value,
                  due_date: addliabilitydate.value,
                  start_date: addliabilitystart.value,
                  end_date: addliabilityend.value
              });

              console.log('Liability (linked to Liability) added successfully:', liabilityResponse.data);

              await fetchData();

              window.location.reload();
              
          } catch (error) {
              console.error('Error adding liability or bill:', error.response);
          }
      };


      onMounted(fetchData);
      onMounted(fetchData2);

      onErrorCaptured((error) => {
          console.error('Error during rendering:', error);
      });

      return{
        bills,
        liabilities,
        paynow,
        paybills,
        addbills,
        addliabilities,
        payLiability,
        paymentamount,
        paymentdescription,
        paymentdate,
        addbillamount,
        addbilldescription,
        addbilldate,
        addliabilityamount,
        addliabilitydescription,
        addliabilitydate,
        addliabilitystart,
        addliabilityend,
        billid,
        payLiabilityAmount,
        liabilityId
      };

    }
  }

    
</script>