export interface RankingItemModel {
    ranking: number;
    nivel: number;
    ceco: number;
    nombre: string;
    calificacion: number|string;
}

export interface RankingModel {
    data: RankingItemModel[];
}