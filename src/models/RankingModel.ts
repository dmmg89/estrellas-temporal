export interface RankingItemModel {
    ranking: number;
    ceco: number;
    nombre: string;
    calificacion: number|string;
}

export interface RankingModel {
    data: RankingItemModel[];
}