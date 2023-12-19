<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3 gap-2">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  <RouterLink to="/" class="text-decoration-none  text-light" style="font-size: 2rem;">Home</RouterLink>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <RouterLink to="/savings" class="text-decoration-none  text-light" style="font-size: 2rem;">Savings</RouterLink>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <RouterLink to="/payments" class="text-decoration-none  text-light" style="font-size: 2rem;">Payments</RouterLink>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <RouterLink to="/paymenthistory" class="text-decoration-none  text-light" style="font-size: 2rem;">Expenditure History</RouterLink>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <a class="navbar-brand" href="#">Personal Financial Tracker</a>
        <div class="dropdown">
          <button class="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="./assets/profile.jpg" alt="Image description" class="img-fluid rounded-circle size-5" style="width: 5vh;">
          </button>
          <ul class="dropdown-menu dropdown-menu-end text-center" style="width: 30vh;">
            <img src="./assets/profile.jpg" alt="Image description" class="img-fluid rounded-circle" style="width: 10vh;">
            <li><h5>Kent Carlo Estillore</h5></li>
            <li><h5>BSIT-3</h5></li>
            <li><p>Someone else here before</p></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <div class="mt-5">
    <RouterView />
  </div>
</template>

<style scoped>
</style>
