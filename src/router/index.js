import { createRouter, createWebHistory } from 'vue-router'
import AppAdminView from "../views/AppAdminView";
import NewsControl from "../components/news/NewsControl";
import RacesControl from "../components/races/RacesControl";
import StandingsControl from "../components/standings/StandingsControl";

const routes = [
    {
        path: '/',
        name: 'AdminView',
        component: AppAdminView,
        children: [
            {
              path: 'news',
              component: NewsControl
            },
            {
                path: 'races',
                component: RacesControl
            },
            {
                path: 'standings',
                component: StandingsControl
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
