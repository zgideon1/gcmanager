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
import PostScores from '@/views/PostScores.vue'
import ViewScores from '@/views/ViewScores.vue'
import Scorecards from '@/views/Scorecards.vue'

const routes = [
    { path: '/', name: 'login', component: Loginpage },
    { path: '/register', name: 'register', component: Registerpage },
    { path: '/userhome', name: 'userhome', component: CustomerHome, 
        children: [
            {path: '', name: 'customer-dashboard', component: CustomerDashboard},

            {path: 'scores', name: 'customer-scores', component: Scorespage},
            {path: 'scores/post', name: 'cs-post', component: PostScores},
            {path: 'scores/view', name: 'cs-view', component: ViewScores},

            {path: 'teetimes', name: 'customer-teetimes', component: TeetimeScheduler},
        ]
    },
    { path: '/employeehome', name: 'employeehome', component: EmployeeHome,
        children: [
            {path: '', name: 'employee-dashboard', component: EmployeeDashboard},
            {path: 'schedules', name: 'employee-schedules', component: EmployeeSchedules},
            {path: 'teetimes', name: 'employee-teetimes', component: TeetimeScheduler},

            {path: 'scores', name:'employee-scores', component: Scorespage},
            {path: 'scores/post', name: 'es-post', component: PostScores},
            {path: 'scores/view', name: 'es-view', component: ViewScores},
        ]
     },
    { path: '/ownerhome', name: 'ownerhome', component: OwnerHome,
        children: [
            {path: '', name: 'owner-dashboard', component: OwnerDashboard},
            {path: 'teetimes', name: 'owner-teetimes', component: TeetimeScheduler},

            {path: 'scores', name: 'owner-scores', component: Scorespage},
            {path: 'scores/post', name: 'os-post', component: PostScores},
            {path: 'scores/view', name: 'os-view', component: ViewScores},

            {path: 'scorecards', name: 'scorecards', component: Scorecards},

            {path: 'users', name: 'users', component: Users, children:[
                {path: 'edit', name: 'users-edit', component: EditUsers},
                {path: 'employees', name: 'employees', component: Employees, children:[
                        {path:'edit', name: 'employees-edit', component: EditEmployees},
                        {path:'employeeschedules', name: 'employees-schedules', component: EmployeeSchedules}
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