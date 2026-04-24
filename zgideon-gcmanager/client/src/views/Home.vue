<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import CustomerHome from './CustomerHome.vue';
import EmployeeHome from './EmployeeHome.vue';
import OwnerHome from './OwnerHome.vue';
import {useRouter} from 'vue-router'

const router = useRouter()
const store = useStore()

const role = computed(() => store.state.user.role)
</script>

<template>
  <CustomerHome v-if="role === 1" />
  <EmployeeHome v-else-if="role === 2" />
  <OwnerHome v-else-if="role === 3" />
  <router-view />
</template>