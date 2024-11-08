/**
 * Backend
 * Descripción
 *
 * OpenAPI spec version: 0.0.1
 * Contact: willypanza11@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface Rol { 
    idRol?: number;
    rolNombre: Rol.RolNombreEnum;
}
export namespace Rol {
    export type RolNombreEnum = 'ROLE_ADMIN' | 'ROLE_CLIENTE' | 'ROLE_EMPLEADO' | 'ROLE_USER';
    export const RolNombreEnum = {
        ADMIN: 'ROLE_ADMIN' as RolNombreEnum,
        CLIENTE: 'ROLE_CLIENTE' as RolNombreEnum,
        EMPLEADO: 'ROLE_EMPLEADO' as RolNombreEnum,
        USER: 'ROLE_USER' as RolNombreEnum
    };
}