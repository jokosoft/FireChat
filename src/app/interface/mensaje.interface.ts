

export interface Mensaje {
    uid: string;
    nombre: string;
    mensaje: string;
    fecha: number;
    _id: string;
    eliminado: boolean;
    fechaString?: string;
    email?: string;
    foto?: string;
}
