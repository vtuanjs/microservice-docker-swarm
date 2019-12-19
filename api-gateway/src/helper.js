const grpc = require('grpc');
const httpStatusCode = require('http-status-codes');
/**
 * @param {number} httpStatus
 */
exports.toGRPCStatus = (httpStatus) => {
  switch (httpStatus) {
    case httpStatusCode.INTERNAL_SERVER_ERROR: {
      return grpc.status.INTERNAL;
    }
    case httpStatusCode.BAD_REQUEST: {
      return grpc.status.INVALID_ARGUMENT;
    }
    case httpStatusCode.GATEWAY_TIMEOUT: {
      return grpc.status.DEADLINE_EXCEEDED;
    }
    case httpStatusCode.NOT_FOUND: {
      return grpc.status.NOT_FOUND;
    }
    case httpStatusCode.CONFLICT: {
      return grpc.status.ALREADY_EXISTS;
    }
    case httpStatusCode.FORBIDDEN: {
      return grpc.status.PERMISSION_DENIED;
    }
    case httpStatusCode.TOO_MANY_REQUESTS: {
      return grpc.status.RESOURCE_EXHAUSTED;
    }
    case httpStatusCode.UNAUTHORIZED: {
      return grpc.status.UNAUTHENTICATED;
    }
    case httpStatusCode.SERVICE_UNAVAILABLE: {
      return grpc.status.UNAVAILABLE;
    }
    default: {
      return grpc.status.INTERNAL;
    }
  }
}

/**
 * @param {number} grpcStatus
 */
exports.toHTTPStatus = (grpcStatus) => {
  switch (grpcStatus) {
    case grpc.status.CANCELLED:
    case grpc.status.UNKNOWN:
    case grpc.status.INTERNAL:
    case grpc.status.DATA_LOSS: {
      return httpStatusCode.INTERNAL_SERVER_ERROR;
    }
    case grpc.status.INVALID_ARGUMENT:
    case grpc.status.FAILED_PRECONDITION:
    case grpc.status.OUT_OF_RANGE: {
      return httpStatusCode.BAD_REQUEST;
    }
    case grpc.status.DEADLINE_EXCEEDED: {
      return httpStatusCode.GATEWAY_TIMEOUT;
    }
    case grpc.status.NOT_FOUND: {
      return httpStatusCode.NOT_FOUND;
    }
    case grpc.status.ALREADY_EXISTS:
    case grpc.status.ABORTED: {
      return httpStatusCode.CONFLICT;
    }
    case grpc.status.PERMISSION_DENIED: {
      return httpStatusCode.FORBIDDEN;
    }
    case grpc.status.RESOURCE_EXHAUSTED: {
      return httpStatusCode.TOO_MANY_REQUESTS;
    }
    case grpc.status.UNIMPLEMENTED:
    case grpc.status.UNAUTHENTICATED: {
      return httpStatusCode.UNAUTHORIZED;
    }
    case grpc.status.UNAVAILABLE: {
      return httpStatusCode.SERVICE_UNAVAILABLE;
    }
    default: {
      return httpStatusCode.INTERNAL_SERVER_ERROR;;
    }
  }
}