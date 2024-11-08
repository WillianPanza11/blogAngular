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
import { View } from './view';

export interface ModelAndView { 
    empty?: boolean;
    model?: any;
    modelMap?: { [key: string]: any; };
    reference?: boolean;
    status?: ModelAndView.StatusEnum;
    view?: View;
    viewName?: string;
}
export namespace ModelAndView {
    export type StatusEnum = 'ACCEPTED' | 'ALREADY_REPORTED' | 'BAD_GATEWAY' | 'BAD_REQUEST' | 'BANDWIDTH_LIMIT_EXCEEDED' | 'CHECKPOINT' | 'CONFLICT' | 'CONTINUE' | 'CREATED' | 'DESTINATION_LOCKED' | 'EXPECTATION_FAILED' | 'FAILED_DEPENDENCY' | 'FORBIDDEN' | 'FOUND' | 'GATEWAY_TIMEOUT' | 'GONE' | 'HTTP_VERSION_NOT_SUPPORTED' | 'IM_USED' | 'INSUFFICIENT_SPACE_ON_RESOURCE' | 'INSUFFICIENT_STORAGE' | 'INTERNAL_SERVER_ERROR' | 'I_AM_A_TEAPOT' | 'LENGTH_REQUIRED' | 'LOCKED' | 'LOOP_DETECTED' | 'METHOD_FAILURE' | 'METHOD_NOT_ALLOWED' | 'MOVED_PERMANENTLY' | 'MOVED_TEMPORARILY' | 'MULTIPLE_CHOICES' | 'MULTI_STATUS' | 'NETWORK_AUTHENTICATION_REQUIRED' | 'NON_AUTHORITATIVE_INFORMATION' | 'NOT_ACCEPTABLE' | 'NOT_EXTENDED' | 'NOT_FOUND' | 'NOT_IMPLEMENTED' | 'NOT_MODIFIED' | 'NO_CONTENT' | 'OK' | 'PARTIAL_CONTENT' | 'PAYLOAD_TOO_LARGE' | 'PAYMENT_REQUIRED' | 'PERMANENT_REDIRECT' | 'PRECONDITION_FAILED' | 'PRECONDITION_REQUIRED' | 'PROCESSING' | 'PROXY_AUTHENTICATION_REQUIRED' | 'REQUESTED_RANGE_NOT_SATISFIABLE' | 'REQUEST_ENTITY_TOO_LARGE' | 'REQUEST_HEADER_FIELDS_TOO_LARGE' | 'REQUEST_TIMEOUT' | 'REQUEST_URI_TOO_LONG' | 'RESET_CONTENT' | 'SEE_OTHER' | 'SERVICE_UNAVAILABLE' | 'SWITCHING_PROTOCOLS' | 'TEMPORARY_REDIRECT' | 'TOO_EARLY' | 'TOO_MANY_REQUESTS' | 'UNAUTHORIZED' | 'UNAVAILABLE_FOR_LEGAL_REASONS' | 'UNPROCESSABLE_ENTITY' | 'UNSUPPORTED_MEDIA_TYPE' | 'UPGRADE_REQUIRED' | 'URI_TOO_LONG' | 'USE_PROXY' | 'VARIANT_ALSO_NEGOTIATES';
    export const StatusEnum = {
        ACCEPTED: 'ACCEPTED' as StatusEnum,
        ALREADYREPORTED: 'ALREADY_REPORTED' as StatusEnum,
        BADGATEWAY: 'BAD_GATEWAY' as StatusEnum,
        BADREQUEST: 'BAD_REQUEST' as StatusEnum,
        BANDWIDTHLIMITEXCEEDED: 'BANDWIDTH_LIMIT_EXCEEDED' as StatusEnum,
        CHECKPOINT: 'CHECKPOINT' as StatusEnum,
        CONFLICT: 'CONFLICT' as StatusEnum,
        CONTINUE: 'CONTINUE' as StatusEnum,
        CREATED: 'CREATED' as StatusEnum,
        DESTINATIONLOCKED: 'DESTINATION_LOCKED' as StatusEnum,
        EXPECTATIONFAILED: 'EXPECTATION_FAILED' as StatusEnum,
        FAILEDDEPENDENCY: 'FAILED_DEPENDENCY' as StatusEnum,
        FORBIDDEN: 'FORBIDDEN' as StatusEnum,
        FOUND: 'FOUND' as StatusEnum,
        GATEWAYTIMEOUT: 'GATEWAY_TIMEOUT' as StatusEnum,
        GONE: 'GONE' as StatusEnum,
        HTTPVERSIONNOTSUPPORTED: 'HTTP_VERSION_NOT_SUPPORTED' as StatusEnum,
        IMUSED: 'IM_USED' as StatusEnum,
        INSUFFICIENTSPACEONRESOURCE: 'INSUFFICIENT_SPACE_ON_RESOURCE' as StatusEnum,
        INSUFFICIENTSTORAGE: 'INSUFFICIENT_STORAGE' as StatusEnum,
        INTERNALSERVERERROR: 'INTERNAL_SERVER_ERROR' as StatusEnum,
        IAMATEAPOT: 'I_AM_A_TEAPOT' as StatusEnum,
        LENGTHREQUIRED: 'LENGTH_REQUIRED' as StatusEnum,
        LOCKED: 'LOCKED' as StatusEnum,
        LOOPDETECTED: 'LOOP_DETECTED' as StatusEnum,
        METHODFAILURE: 'METHOD_FAILURE' as StatusEnum,
        METHODNOTALLOWED: 'METHOD_NOT_ALLOWED' as StatusEnum,
        MOVEDPERMANENTLY: 'MOVED_PERMANENTLY' as StatusEnum,
        MOVEDTEMPORARILY: 'MOVED_TEMPORARILY' as StatusEnum,
        MULTIPLECHOICES: 'MULTIPLE_CHOICES' as StatusEnum,
        MULTISTATUS: 'MULTI_STATUS' as StatusEnum,
        NETWORKAUTHENTICATIONREQUIRED: 'NETWORK_AUTHENTICATION_REQUIRED' as StatusEnum,
        NONAUTHORITATIVEINFORMATION: 'NON_AUTHORITATIVE_INFORMATION' as StatusEnum,
        NOTACCEPTABLE: 'NOT_ACCEPTABLE' as StatusEnum,
        NOTEXTENDED: 'NOT_EXTENDED' as StatusEnum,
        NOTFOUND: 'NOT_FOUND' as StatusEnum,
        NOTIMPLEMENTED: 'NOT_IMPLEMENTED' as StatusEnum,
        NOTMODIFIED: 'NOT_MODIFIED' as StatusEnum,
        NOCONTENT: 'NO_CONTENT' as StatusEnum,
        OK: 'OK' as StatusEnum,
        PARTIALCONTENT: 'PARTIAL_CONTENT' as StatusEnum,
        PAYLOADTOOLARGE: 'PAYLOAD_TOO_LARGE' as StatusEnum,
        PAYMENTREQUIRED: 'PAYMENT_REQUIRED' as StatusEnum,
        PERMANENTREDIRECT: 'PERMANENT_REDIRECT' as StatusEnum,
        PRECONDITIONFAILED: 'PRECONDITION_FAILED' as StatusEnum,
        PRECONDITIONREQUIRED: 'PRECONDITION_REQUIRED' as StatusEnum,
        PROCESSING: 'PROCESSING' as StatusEnum,
        PROXYAUTHENTICATIONREQUIRED: 'PROXY_AUTHENTICATION_REQUIRED' as StatusEnum,
        REQUESTEDRANGENOTSATISFIABLE: 'REQUESTED_RANGE_NOT_SATISFIABLE' as StatusEnum,
        REQUESTENTITYTOOLARGE: 'REQUEST_ENTITY_TOO_LARGE' as StatusEnum,
        REQUESTHEADERFIELDSTOOLARGE: 'REQUEST_HEADER_FIELDS_TOO_LARGE' as StatusEnum,
        REQUESTTIMEOUT: 'REQUEST_TIMEOUT' as StatusEnum,
        REQUESTURITOOLONG: 'REQUEST_URI_TOO_LONG' as StatusEnum,
        RESETCONTENT: 'RESET_CONTENT' as StatusEnum,
        SEEOTHER: 'SEE_OTHER' as StatusEnum,
        SERVICEUNAVAILABLE: 'SERVICE_UNAVAILABLE' as StatusEnum,
        SWITCHINGPROTOCOLS: 'SWITCHING_PROTOCOLS' as StatusEnum,
        TEMPORARYREDIRECT: 'TEMPORARY_REDIRECT' as StatusEnum,
        TOOEARLY: 'TOO_EARLY' as StatusEnum,
        TOOMANYREQUESTS: 'TOO_MANY_REQUESTS' as StatusEnum,
        UNAUTHORIZED: 'UNAUTHORIZED' as StatusEnum,
        UNAVAILABLEFORLEGALREASONS: 'UNAVAILABLE_FOR_LEGAL_REASONS' as StatusEnum,
        UNPROCESSABLEENTITY: 'UNPROCESSABLE_ENTITY' as StatusEnum,
        UNSUPPORTEDMEDIATYPE: 'UNSUPPORTED_MEDIA_TYPE' as StatusEnum,
        UPGRADEREQUIRED: 'UPGRADE_REQUIRED' as StatusEnum,
        URITOOLONG: 'URI_TOO_LONG' as StatusEnum,
        USEPROXY: 'USE_PROXY' as StatusEnum,
        VARIANTALSONEGOTIATES: 'VARIANT_ALSO_NEGOTIATES' as StatusEnum
    };
}