import type {HistoryWeekModel} from "./HistoryWeekModel.ts";

export interface RankingItemModel {
    ranking: number;
    nivel: number;
    ceco: number;
    nombre: string;
    calificacion: number|string;
}

export type RankingModel = RankingItemModel[];