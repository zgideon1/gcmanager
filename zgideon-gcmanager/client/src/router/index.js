import { createRouter, createWebHistory } from 'vue-router'
import Loginpage from '../views/Loginpage.vue'
import Registerpage from '@/views/Registerpage.vue'
import CustomerHome from '@/views/CustomerHome.vue'
import Scorespage from '@/views/Scorespage.vue'
import CustomerDashboard from '@/views/CustomerDashboard.vue'
import TeetimeScheduler from '@/views/TeetimeScheduler.vue'
import EmployeeHome from '@/views/EmployeeHome.vue'
import OwnerHome from '@/views/OwnerHome.vue'
import EmployeeDashboard from '@/views/EmployeeDashboard.vue'
import OwnerDashboard from '@/views/OwnerDashboard.vue'
import Employees from '@/views/Employees.vue'
import EmployeeSchedules from '@/views/EmployeeSchedules.vue'
import EditEmployees from '@/views/EditEmployees.vue'
import Users from '@/views/Users.vue'
import EditUsers from '@/views/EditUsers.vue'

const routes = [
    { path: '/', component: Loginpage },
    { path: '/register', component: Registerpage },
    { path: '/userhome', component: CustomerHome, 
        children: [
            {path: '', component: CustomerDashboard},
            {path: 'scores', component: Scorespage},
            {path: 'teetimes', component: TeetimeScheduler},
            //{path: 'tournaments', component: Tournaments}
        ]
    },
    { path: '/employeehome', component: EmployeeHome,
        children: [
            {path: '', component: EmployeeDashboard},
            {path: 'schedules', component: EmployeeSchedules},
            {path: 'teetimes', component: TeetimeScheduler}
        ]
     },
    { path: '/ownerhome', component: OwnerHome,
        children: [
            {path: '', component: OwnerDashboard},
            {path: 'teetimes', component: TeetimeScheduler},
            {path: 'scores', component: Scorespage},
            {path: 'users', component: Users, children:[
                {path: 'edit', component: EditUsers},
                {path: 'employees', component: Employees, children:[
                        {path:'edit', component: EditEmployees},
                        {path:'employeeschedules', component: EmployeeSchedules}
                    ]}
            ]}
        ]
     }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router