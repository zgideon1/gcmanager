<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import CustomerDashboard from './CustomerDashboard.vue';
import EmployeeDashboard from './EmployeeDashboard.vue';
import OwnerDashboard from './OwnerDashboard.vue';

const store = useStore()

const role = computed(() => store.state.user.role)
</script>

<template>
  <CustomerDashboard v-if="role === 1" />
  <EmployeeDashboard v-else-if="role === 2" />
  <OwnerDashboard v-else-if="role === 3" />
  <router-view />
</template>