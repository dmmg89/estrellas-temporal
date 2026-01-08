import type {RouteRecordRaw} from 'vue-router';
import {createRouter, createWebHistory} from 'vue-router';
import ProfileSelector from "../ProfileSelector.vue"
import TerritorioScreen from "../views/TerritoryScreen.vue";
import DivisionScreen from "../views/DivisionScreen.vue";
import CorpoScreen from "../views/CorpoScreen.vue";
import ErrorScreen from "../views/ErrorScreen.vue";
import RegionScreen from "../views/RegionScreen.vue";
import PdvScreen from "../views/PdvScreen.vue";
import AssesorScreen from "../views/AssesorScreen.vue";
import EmployeeScreen from "../views/EmployeeScreen.vue";


export enum ProfilePath{
    selectorPath = '/',
    employee= '/employee',
    pdv = '/pdv',
    regionScreen = '/region',
    territorioScreen = '/territorio',
    divisionScreen = '/division',
    corpoScreen = '/corpo',
    errorScreen = '/error',
    assesorScreen = '/asesor',

}

export enum ScreenName{
    error = 'error',
    selector = 'selector',
    employee= 'employee',
    pdv = 'pdv',
    region='regional',
    territory='territorio',
    division = 'division',
    corpo = 'corpo',
    assesor = 'asesor'
}

const routes:Array<RouteRecordRaw> =
    [
        {
            path: ProfilePath.selectorPath,
            name: ScreenName.selector,
            component: ProfileSelector
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
            path: ProfilePath.regionScreen,
            name: ScreenName.region,
            component: RegionScreen
        },
        {
            path: ProfilePath.pdv,
            name: ScreenName.pdv,
            component: PdvScreen
        },
        {
            path: ProfilePath.employee,
            name: ScreenName.employee,
            component: EmployeeScreen
        },

        {
            path: ProfilePath.errorScreen,
            name: ScreenName.error,
            component: ErrorScreen
        },
        {
            path: ProfilePath.assesorScreen,
            name: ScreenName.assesor,
            component: AssesorScreen
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: ProfilePath.selectorPath
        }
    ]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes

});

export default router;