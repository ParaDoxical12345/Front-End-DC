<template>
  <div class="p-3 mt-5">
      <table class="table table-fluid table-dark table-hover bg-dark" style="margin-top: 3rem;">
          <thead>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
          </thead>
          <tbody>
            <tr v-for="expenditure in expenditures" :key="expenditure.id">
              <td>{{ expenditure.description }}</td>
              <td>&#8369 {{ expenditure.amount }}</td>
              <td>{{ expenditure.date }}</td>
            </tr>
          </tbody>
      </table>
  </div>
  </template>

<script>
  import { ref, onMounted, onErrorCaptured } from 'vue';
  import axios from 'axios';

  export default {
    setup() {
      const expenditures = ref([]);

      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/expenditures');
          expenditures.value = response.data;
        } catch (error) {
          console.error('Error fetching expenditures:', error);
        }
      };

      onMounted(fetchData);
      
      onErrorCaptured((error) => {
        console.error('Error during rendering:', error);
      });

      return {
        expenditures,
      };
    },
  };
</script>