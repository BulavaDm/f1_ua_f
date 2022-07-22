import { createRouter, createWebHistory } from 'vue-router'
import AppAdminView from "../views/AppAdminView";
import NewsControl from "../components/news/NewsControl";

const routes = [
    {
        path: '/',
        name: 'AdminView',
        component: AppAdminView,
        children: [
            {
              path: 'news',
              component: NewsControl
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
