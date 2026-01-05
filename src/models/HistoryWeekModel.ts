export interface HistoryWeekModel {
    semana: number;
    calificacion: number;
    meta: number;
}

export interface HistoryModel {
    data: HistoryWeekModel[];
}