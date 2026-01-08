export interface MetricasSemana {
    _id: string;
    vertical: string;
    semana: number;
    anio: number;
    calificacion_trimestre: number;
    calificacion_semana: number;
    num_encuestas_trimestre: number;
    nivel: string;
}

export interface EmpleadoData {
    _id: string;
    idEmpleado: number;
    nombre: string;
    idSap: number;
    posicionNombre: string;
    ceco: number;
    metricas_semana: MetricasSemana;
}