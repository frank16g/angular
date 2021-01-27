export interface Pedido {
    id_pedido: number,
    id_cliente: string,
    id_repartidor: string,
    fecha: string,
    total: number,
    lat: string,
    lon: string,
    estado: string
}