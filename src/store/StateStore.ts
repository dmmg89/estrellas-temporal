import { defineStore } from 'pinia';

interface NavigationHistory {
    level: number;
    ceco: number;
    screen: string;
}

interface StateStoreState {
    isLoading: boolean;
    level: number;
    ceco: number;
    week:number;
    screen: string;
    history: NavigationHistory[];
}

export const useStateStore = defineStore('stateStore', {
    state: (): StateStoreState => ({
        isLoading: false,
        level: 0,
        ceco: 0,
        week: 50,
        screen: 'selector',
        history: []
    }),

    getters: {
        getPath: (state) => state.history,
        canDrillUp: (state) => state.history.length > 0
    },

    actions: {
        setLoading(valor: boolean) {
            this.isLoading = valor;
        },
        setLevel(nuevoNivel: number) {
            this.level = nuevoNivel;
        },

        setCeco(nuevoCeco: number) {
            this.ceco = nuevoCeco;
        },

        setWeek(nuevaSemana: number) {
            console.log(nuevaSemana);
            this.week = nuevaSemana;
        },

        setScreen(nuevaPantalla: string) {
            this.screen = nuevaPantalla;
        },

        setEstado(nuevaSemana: number, nuevoNivel: number, nuevoCeco: number, nuevaPantalla: string) {
            this.level = nuevoNivel;
            this.ceco = nuevoCeco;
            this.screen = nuevaPantalla;
            this.week = nuevaSemana;
        },

        drillDown(nuevoNivel: number, nuevoCeco: number, nuevaPantalla: string) {
            this.history.push({
                level: this.level,
                ceco: this.ceco,
                screen: this.screen,
            });

            this.level = nuevoNivel;
            this.ceco = nuevoCeco;
            this.screen = nuevaPantalla;
        },

        drillUp() {
            const lastState = this.history.pop();

            if (lastState) {
                this.level = lastState.level;
                this.ceco = lastState.ceco;
                this.screen = lastState.screen;
            } else {
                this.resetState();
            }
        },

        resetState() {
            this.isLoading = false;
            this.level = 0;
            this.ceco = 0;
            this.week = 48;
            this.screen = 'selector';
            this.history = [];
        }
    }
});