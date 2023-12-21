<template>
  <div class="card-container d-flex justify-content-evenly">
    <div class="card" style="width: 20rem; margin: 5rem; height: fit-content;">
      <div class="card-body">
        <h3>Savings</h3>
        <h5 class="d-flex justify-content-between">Total: &#8369 {{ savings.total_amount }}<span v-if="savings.total_amount < second.total_amount" class="text text-danger">&#8595 %{{ (((savings.total_amount - second.total_amount)/savings.total_amount)*100).toFixed(2) }}</span>
          <span v-else class="text text-success"> &#8593 %{{ (((savings.total_amount - second.total_amount)/savings.total_amount)*100).toFixed(2) }}</span></h5>
        <h5>Date: {{ savings.date }}</h5>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed btn-dark dropdown-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              View Records of Savings
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <table class="table table-fluid table-light table-hover bg-success" style="margin-top: 1rem;">
                      <thead>
                          <th>Amount</th>
                          <th>Date</th>
                      </thead>
                      <tbody>
                        <tr v-for="history in histories" :key="history.id">
                          <td>&#8369 {{ history.total_amount }}</td>
                          <td>{{ history.date }}</td>
                        </tr>
                      </tbody>
                  </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="group">
      <div class="card" style="width: 20rem; margin: 5rem; margin-bottom: 1rem;">
        <h4 class="text text-center mt-2">This Month's Income</h4>
        <div class="card-body">
          <div class="mb-3">
            <label for="incomeAmount" class="form-label">Amount: </label>
            <input v-model="incomeAmount" type="number" class="form-control" id="incomeAmount" placeholder="&#8369" required>
          </div>
          <div class="mb-3">
            <label for="incomeDate" class="form-label">Date: </label>
            <input v-model="incomeDate" type="date" class="form-control" id="incomeDate" required>
          </div>
        </div>
        <button @click="addIncome" class="btn btn-primary">Add Income</button>
      </div>
      <div class="card" style="width: 20rem; margin-left: 5rem;">
        <h4 class="text text-center mt-2">Other means of income</h4>
        <div class="card-body">
          <div class="mb-3">
            <label for="additionalIncomeAmount" class="form-label">Amount: </label>
            <input v-model="additionalIncomeAmount" type="number" class="form-control" id="additionalIncomeAmount" placeholder="&#8369" required>
          </div>
          <div class="mb-3">
            <label for="additionalIncomeDate" class="form-label">Date: </label>
            <input v-model="additionalIncomeDate" type="date" class="form-control" id="additionalIncomeDate" required>
          </div>
        </div>
        <button @click="additionalIncome" class="btn btn-primary">Add Income</button>
      </div>
    </div>
  </div>
    
  
</template>

<script>
import { ref, onMounted, onErrorCaptured } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const savings = ref([]);
    const second = ref([]);
    const histories = ref([]);
    const incomeAmount = ref('');
    const incomeDate = ref('');
    const additionalIncomeAmount = ref('');
    const additionalIncomeDate = ref('');

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/savings');
        savings.value = response.data;
      } catch (error) {
        console.error('Error fetching savings:', error);
      }
    };

    const fetchData2 = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/savings/second');
        second.value = response.data;
      } catch (error) {
        console.error('Error fetching savings:', error);
      }
    };

    const fetchData3 = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/savingshistory');
        histories.value = response.data;
      } catch (error) {
        console.error('Error fetching savings:', error);
      }
    };

    const addIncome = async () => {
      try {

        const incomeResponse = await axios.post('http://localhost:8000/api/income', {
          id: '1', 
          amount: incomeAmount.value,
          date: incomeDate.value,
        });

        console.log('Income added successfully:', incomeResponse.data);

        await fetchData();

        const depositId = incomeResponse.data['Monthly Income'].id;

        const savingResponse = await axios.post('http://localhost:8000/api/saving', {
          id: '1',
          total_amount: incomeAmount.value,
          date: incomeDate.value,
          deposit: depositId, 
        });

        console.log('Saving added successfully:', savingResponse.data);

        await fetchData();
        window.location.reload();
      } catch (error) {
        console.error('Error adding income or saving:', error.response);
      }
    };

    const additionalIncome = async () => {
      try{
        const additionalIncomeResponse = await axios.patch('http://localhost:8000/api/savingupdate',{
          total_amount: additionalIncomeAmount.value,
          date: additionalIncomeDate.value
        });

        console.log('Income added successfully:', additionalIncomeResponse.data);

        await fetchData();
        window.location.reload();
      } catch (error) {
        console.error('Error adding income or saving:', error.response);
      }
    };

    onMounted(fetchData);
    onMounted(fetchData2);
    onMounted(fetchData3);

    onErrorCaptured((error) => {
      console.error('Error during rendering:', error);
    });

    return {
      savings,
      second,
      histories,
      incomeAmount,
      incomeDate,
      additionalIncomeAmount,
      additionalIncomeDate,
      addIncome,
      additionalIncome,
    };
  },
};
</script>


<style>
</style>
