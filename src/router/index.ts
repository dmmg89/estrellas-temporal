import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import LeaderScreen from "../views/LeaderScreen.vue";
import RegionScreen from "../views/RegionScreen.vue";
import TerritorioScreen from "../views/TerritoryScreen.vue";
import DivisionScreen from "../views/DivisionScreen.vue";
import CorpoScreen from "../views/CorpoScreen.vue";
import ErrorScreen from "../views/ErrorScreen.vue";


export enum ProfilePath{
    selectorPath = '/',
    leaderScreen = '/lider',
    regionScreen = '/region',
    territorioScreen = '/territorio',
    divisionScreen = '/division',
    corpoScreen = '/corpo',
    errorScreen = '/error',

}

export enum ScreenName{
    error = 'error',
    leader = 'lider',
    region='regional',
    territory='territorio',
    division = 'division',
    corpo = 'corpo'
}

const routes:Array<RouteRecordRaw> =
    [
        {
            path: ProfilePath.selectorPath,
            redirect: ProfilePath.corpoScreen
        },
        {
            path: ProfilePath.corpoScreen,
            name: ScreenName.corpo,
            component: CorpoScreen,
        },
        {
            path: ProfilePath.divisionScreen,
            name: ScreenName.division,
            component: DivisionScreen
        },
        {
            path: ProfilePath.territorioScreen,
            name: ScreenName.territory,
            component: TerritorioScreen
        },
        {
            path: ProfilePath.errorScreen,
            name: ScreenName.error,
            component: ErrorScreen
        }
    ]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes

});

export default router;