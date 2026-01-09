import type {CommentsModel} from "../../models/CommentsModel.ts";
import {fetchData} from "../ApiClient.ts";
import type {RankingModel} from "../../models/RankingModel.ts";
import type {HistoryModel} from "../../models/HistoryWeekModel.ts";
import type {AtributeModel} from "../../models/AtributeItemModel.ts";
import type {ScoreModel} from "../../models/ScoreModel.ts";
import type {EmpleadoData} from "../../models/EmpleadoData.ts"


export const getComments = async (ceco:number, level:number, week:number, year:number) : Promise<CommentsModel> =>{
    try{
        const endpoint: string =   '/v1/verbalizacion';
        const params = {
            ceco : ceco,
            nivel : level,
            semana:week,
            anio:year,
        }
        const apiResponse = await fetchData<CommentsModel>(endpoint,params);
        if(apiResponse ){
            return apiResponse
        }else {
            console.log("Mock -> Comments ", JSON.stringify(apiResponse));
            return null;
        }

    }catch (error:any) {
        console.log("Mock -> Comments ", error);
        return null;
    }
}

export const getLevelRanking =async (level:number,week:number, year:number) : Promise<RankingModel> =>{
    try{
        const endpoint: string =   '/v1/ranking';
        const params = {
            nivel:level,
            semana:week,
            anio:year,
        }
        const apiResponse = await fetchData<RankingModel>(endpoint,params);
        if(apiResponse ){
            return apiResponse
        }else {
            console.log("Mock -> Ranking ", JSON.stringify(apiResponse));
            return null;
        }

    }catch (error:any) {
        console.log("Mock -> Ranking ", error);
        return null;
    }

}


export const getRanking = async (ceco:number) : Promise<RankingModel> =>{
    try{
        const endpoint: string =   '/v2/ranking';
        const params = {
            ceco:ceco
        }
        const apiResponse = await fetchData<RankingModel>(endpoint,params);
        if(apiResponse ){
            return apiResponse
        }else {
            console.log("Mock -> Ranking ", JSON.stringify(apiResponse));
            return null;
        }

    }catch (error:any) {
        console.log("Mock -> Ranking ", error);
        return null;
    }


}

export const getHistory = async ( ceco:number): Promise<HistoryModel> => {
    try{
        const endpoint: string =   '/v1/historico';
        const params = {
            ceco:ceco
        }
        const apiResponse = await fetchData<HistoryModel>(endpoint,params);
        if(apiResponse ){
            // console.log(apiResponse);
            return apiResponse
        }else {
            console.log("Mock -> historico ", JSON.stringify(apiResponse));
            return null;
        }

    }catch (error:any) {
        console.log("Mock -> historico ", error);
        return null;
    }

}

export const getAtributes = async (ceco:number, week:number, year:number) : Promise<AtributeModel> =>{
    try{
        const endpoint: string =   '/v1/atributos';
        const params = {
            ceco:ceco,
            semana:week,
            anio:year
        }
        const apiResponse = await fetchData<AtributeModel>(endpoint,params);
        if(apiResponse ){
            return apiResponse
        }else {
            // console.log("Mock -> atributos ", JSON.stringify(apiResponse));
            return null;
        }

    }catch (error:any) {
        console.log("Mock -> atributos ", error);
        return null;
    }
}

export const getTermometer = async (ceco:number, week:number, year:number) : Promise<AtributeModel> =>{
    try{
        const endpoint: string =   '/v1/termometro';
        const params = {
            ceco:ceco,
            semana:week,
            anio:year
        }
        const apiResponse = await fetchData<AtributeModel>(endpoint,params);
        if(apiResponse ){
            return apiResponse
        }else {
            console.log("Mock -> termometro ", JSON.stringify(apiResponse));
            return null;
        }

    }catch (error:any) {
        console.log("Mock -> termometro ", error);
        return null;
    }
}


export const getScore = async (ceco:number, week:number, year:number) : Promise<ScoreModel> =>{
    try{
        const endpoint: string =   '/v1/calificacion';
        const params = {
            ceco:ceco,
            semana:week,
            anio:year
        }
        const apiResponse = await fetchData<ScoreModel>(endpoint,params);
        if(apiResponse ){
            // console.log(JSON.stringify(apiResponse));
            return apiResponse
        }else {
            console.log("Mock -> calificacion ", JSON.stringify(apiResponse));
            return null;
        }

    }catch (error:any) {
        console.log("Mock -> calificacion ", error);
        return null;
    }

}

export const getVerbalizacion = async (ceco:number) : Promise<string[]> =>{
    try{
        const endpoint: string =   '/v1/verbalizaciones';
        const params = {
            ceco:ceco
        }
        const apiResponse = await fetchData<string[]>(endpoint,params);
        if(apiResponse ){
            // console.log(JSON.stringify(apiResponse));
            return apiResponse
        }else {
            console.log("Mock -> calificacion ", JSON.stringify(apiResponse));
            return null;
        }

    }catch (error:any) {
        console.log("Mock -> calificacion ", error);
        return null;
    }

}

export const getTeam = async (ceco:number, week:number) : Promise<EmpleadoData[]> =>{
    try{
        const endpoint: string =   '/v1/usuarios';
        const params = {
            ceco:ceco,
            semana:week,
        }
        const apiResponse = await fetchData<EmpleadoData[]>(endpoint,params);
        if(apiResponse ){
            // console.log(JSON.stringify(apiResponse));
            return apiResponse
        }else {
            console.log("Mock -> calificacion ", JSON.stringify(apiResponse));
            return null;
        }

    }catch (error:any) {
        console.log("Mock -> calificacion ", error);
        return null;
    }

}

export const getUserByID = async (id:string) : Promise<EmpleadoData>=>{
    try{
        const endpoint: string =   `/v1/usuarios/${id}`;

        const apiResponse = await fetchData<EmpleadoData>(endpoint);
        if(apiResponse ){
            console.log(JSON.stringify(apiResponse));
            return apiResponse
        }else {
            console.log("Mock -> calificacion ", JSON.stringify(apiResponse));
            return null;
        }

    }catch (error:any) {
        console.log("Mock -> calificacion ", error);
        return null;
    }
}