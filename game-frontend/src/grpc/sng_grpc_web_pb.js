/**
 * @fileoverview gRPC-Web generated client stub for services
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js')
const proto = {};
proto.services = require('./sng_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.services.SngClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.services.SngPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Sng_Test = new grpc.web.MethodDescriptor(
  '/services.Sng/Test',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Sng_Test = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.test =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/Test',
      request,
      metadata || {},
      methodDescriptor_Sng_Test,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.test =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/Test',
      request,
      metadata || {},
      methodDescriptor_Sng_Test);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetStatusRequest,
 *   !proto.services.GetStatusResult>}
 */
const methodDescriptor_Sng_getStatus = new grpc.web.MethodDescriptor(
  '/services.Sng/getStatus',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.services.GetStatusRequest,
  proto.services.GetStatusResult,
  /**
   * @param {!proto.services.GetStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetStatusRequest,
 *   !proto.services.GetStatusResult>}
 */
const methodInfo_Sng_getStatus = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetStatusResult,
  /**
   * @param {!proto.services.GetStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetStatusResult.deserializeBinary
);


/**
 * @param {!proto.services.GetStatusRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetStatusResult>}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getStatus =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/services.Sng/getStatus',
      request,
      metadata || {},
      methodDescriptor_Sng_getStatus);
};


/**
 * @param {!proto.services.GetStatusRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetStatusResult>}
 *     The XHR Node Readable Stream
 */
proto.services.SngPromiseClient.prototype.getStatus =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/services.Sng/getStatus',
      request,
      metadata || {},
      methodDescriptor_Sng_getStatus);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.MakeSngRequest,
 *   !proto.services.MakeSngResponse>}
 */
const methodDescriptor_Sng_MakeSng = new grpc.web.MethodDescriptor(
  '/services.Sng/MakeSng',
  grpc.web.MethodType.UNARY,
  proto.services.MakeSngRequest,
  proto.services.MakeSngResponse,
  /**
   * @param {!proto.services.MakeSngRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.MakeSngResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.MakeSngRequest,
 *   !proto.services.MakeSngResponse>}
 */
const methodInfo_Sng_MakeSng = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.MakeSngResponse,
  /**
   * @param {!proto.services.MakeSngRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.MakeSngResponse.deserializeBinary
);


/**
 * @param {!proto.services.MakeSngRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.MakeSngResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.MakeSngResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.makeSng =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/MakeSng',
      request,
      metadata || {},
      methodDescriptor_Sng_MakeSng,
      callback);
};


/**
 * @param {!proto.services.MakeSngRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.MakeSngResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.makeSng =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/MakeSng',
      request,
      metadata || {},
      methodDescriptor_Sng_MakeSng);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.MakePlayerActionRequest,
 *   !proto.services.GetStatusResult>}
 */
const methodDescriptor_Sng_MakePlayerAction = new grpc.web.MethodDescriptor(
  '/services.Sng/MakePlayerAction',
  grpc.web.MethodType.UNARY,
  proto.services.MakePlayerActionRequest,
  proto.services.GetStatusResult,
  /**
   * @param {!proto.services.MakePlayerActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.MakePlayerActionRequest,
 *   !proto.services.GetStatusResult>}
 */
const methodInfo_Sng_MakePlayerAction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetStatusResult,
  /**
   * @param {!proto.services.MakePlayerActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetStatusResult.deserializeBinary
);


/**
 * @param {!proto.services.MakePlayerActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.makePlayerAction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/MakePlayerAction',
      request,
      metadata || {},
      methodDescriptor_Sng_MakePlayerAction,
      callback);
};


/**
 * @param {!proto.services.MakePlayerActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetStatusResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.makePlayerAction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/MakePlayerAction',
      request,
      metadata || {},
      methodDescriptor_Sng_MakePlayerAction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetTournamentsRequest,
 *   !proto.services.GetTournamentsResponse>}
 */
const methodDescriptor_Sng_getTournaments = new grpc.web.MethodDescriptor(
  '/services.Sng/getTournaments',
  grpc.web.MethodType.UNARY,
  proto.services.GetTournamentsRequest,
  proto.services.GetTournamentsResponse,
  /**
   * @param {!proto.services.GetTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetTournamentsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetTournamentsRequest,
 *   !proto.services.GetTournamentsResponse>}
 */
const methodInfo_Sng_getTournaments = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetTournamentsResponse,
  /**
   * @param {!proto.services.GetTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetTournamentsResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetTournamentsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetTournamentsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getTournaments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournaments,
      callback);
};


/**
 * @param {!proto.services.GetTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetTournamentsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getTournaments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournaments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.JoinTournamentRequest,
 *   !proto.services.JoinTournamentResponse>}
 */
const methodDescriptor_Sng_joinTournament = new grpc.web.MethodDescriptor(
  '/services.Sng/joinTournament',
  grpc.web.MethodType.UNARY,
  proto.services.JoinTournamentRequest,
  proto.services.JoinTournamentResponse,
  /**
   * @param {!proto.services.JoinTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.JoinTournamentResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.JoinTournamentRequest,
 *   !proto.services.JoinTournamentResponse>}
 */
const methodInfo_Sng_joinTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.JoinTournamentResponse,
  /**
   * @param {!proto.services.JoinTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.JoinTournamentResponse.deserializeBinary
);


/**
 * @param {!proto.services.JoinTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.JoinTournamentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.JoinTournamentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.joinTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/joinTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_joinTournament,
      callback);
};


/**
 * @param {!proto.services.JoinTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.JoinTournamentResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.joinTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/joinTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_joinTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.UnregisterTournamentRequest,
 *   !proto.services.UnregisterTournamentResponse>}
 */
const methodDescriptor_Sng_unregisterTournament = new grpc.web.MethodDescriptor(
  '/services.Sng/unregisterTournament',
  grpc.web.MethodType.UNARY,
  proto.services.UnregisterTournamentRequest,
  proto.services.UnregisterTournamentResponse,
  /**
   * @param {!proto.services.UnregisterTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UnregisterTournamentResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.UnregisterTournamentRequest,
 *   !proto.services.UnregisterTournamentResponse>}
 */
const methodInfo_Sng_unregisterTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.UnregisterTournamentResponse,
  /**
   * @param {!proto.services.UnregisterTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UnregisterTournamentResponse.deserializeBinary
);


/**
 * @param {!proto.services.UnregisterTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.UnregisterTournamentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.UnregisterTournamentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.unregisterTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/unregisterTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_unregisterTournament,
      callback);
};


/**
 * @param {!proto.services.UnregisterTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.UnregisterTournamentResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.unregisterTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/unregisterTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_unregisterTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.CancelTournamentRequest,
 *   !proto.services.CancelTournamentResponse>}
 */
const methodDescriptor_Sng_cancelTournament = new grpc.web.MethodDescriptor(
  '/services.Sng/cancelTournament',
  grpc.web.MethodType.UNARY,
  proto.services.CancelTournamentRequest,
  proto.services.CancelTournamentResponse,
  /**
   * @param {!proto.services.CancelTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CancelTournamentResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.CancelTournamentRequest,
 *   !proto.services.CancelTournamentResponse>}
 */
const methodInfo_Sng_cancelTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.CancelTournamentResponse,
  /**
   * @param {!proto.services.CancelTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CancelTournamentResponse.deserializeBinary
);


/**
 * @param {!proto.services.CancelTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.CancelTournamentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.CancelTournamentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.cancelTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/cancelTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelTournament,
      callback);
};


/**
 * @param {!proto.services.CancelTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.CancelTournamentResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.cancelTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/cancelTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetGameplayHistoriesRequest,
 *   !proto.services.GetGameplayHistoriesResponse>}
 */
const methodDescriptor_Sng_getGameplayHistories = new grpc.web.MethodDescriptor(
  '/services.Sng/getGameplayHistories',
  grpc.web.MethodType.UNARY,
  proto.services.GetGameplayHistoriesRequest,
  proto.services.GetGameplayHistoriesResponse,
  /**
   * @param {!proto.services.GetGameplayHistoriesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetGameplayHistoriesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetGameplayHistoriesRequest,
 *   !proto.services.GetGameplayHistoriesResponse>}
 */
const methodInfo_Sng_getGameplayHistories = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetGameplayHistoriesResponse,
  /**
   * @param {!proto.services.GetGameplayHistoriesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetGameplayHistoriesResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetGameplayHistoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetGameplayHistoriesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetGameplayHistoriesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getGameplayHistories =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getGameplayHistories',
      request,
      metadata || {},
      methodDescriptor_Sng_getGameplayHistories,
      callback);
};


/**
 * @param {!proto.services.GetGameplayHistoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetGameplayHistoriesResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getGameplayHistories =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getGameplayHistories',
      request,
      metadata || {},
      methodDescriptor_Sng_getGameplayHistories);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetHandHistoryRequest,
 *   !proto.services.GetHandHistoryResponse>}
 */
const methodDescriptor_Sng_getAllHandHistoryData = new grpc.web.MethodDescriptor(
  '/services.Sng/getAllHandHistoryData',
  grpc.web.MethodType.UNARY,
  proto.services.GetHandHistoryRequest,
  proto.services.GetHandHistoryResponse,
  /**
   * @param {!proto.services.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetHandHistoryResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetHandHistoryRequest,
 *   !proto.services.GetHandHistoryResponse>}
 */
const methodInfo_Sng_getAllHandHistoryData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetHandHistoryResponse,
  /**
   * @param {!proto.services.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetHandHistoryResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetHandHistoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetHandHistoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getAllHandHistoryData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getAllHandHistoryData',
      request,
      metadata || {},
      methodDescriptor_Sng_getAllHandHistoryData,
      callback);
};


/**
 * @param {!proto.services.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetHandHistoryResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getAllHandHistoryData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getAllHandHistoryData',
      request,
      metadata || {},
      methodDescriptor_Sng_getAllHandHistoryData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetHandHistoryRequest,
 *   !proto.services.GetHandHistoryResponse>}
 */
const methodDescriptor_Sng_getHandHistoryStat = new grpc.web.MethodDescriptor(
  '/services.Sng/getHandHistoryStat',
  grpc.web.MethodType.UNARY,
  proto.services.GetHandHistoryRequest,
  proto.services.GetHandHistoryResponse,
  /**
   * @param {!proto.services.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetHandHistoryResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetHandHistoryRequest,
 *   !proto.services.GetHandHistoryResponse>}
 */
const methodInfo_Sng_getHandHistoryStat = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetHandHistoryResponse,
  /**
   * @param {!proto.services.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetHandHistoryResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetHandHistoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetHandHistoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getHandHistoryStat =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getHandHistoryStat',
      request,
      metadata || {},
      methodDescriptor_Sng_getHandHistoryStat,
      callback);
};


/**
 * @param {!proto.services.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetHandHistoryResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getHandHistoryStat =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getHandHistoryStat',
      request,
      metadata || {},
      methodDescriptor_Sng_getHandHistoryStat);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetHandHistoryRequest,
 *   !proto.services.GetHandHistoryResponse>}
 */
const methodDescriptor_Sng_getHandHistoryData = new grpc.web.MethodDescriptor(
  '/services.Sng/getHandHistoryData',
  grpc.web.MethodType.UNARY,
  proto.services.GetHandHistoryRequest,
  proto.services.GetHandHistoryResponse,
  /**
   * @param {!proto.services.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetHandHistoryResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetHandHistoryRequest,
 *   !proto.services.GetHandHistoryResponse>}
 */
const methodInfo_Sng_getHandHistoryData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetHandHistoryResponse,
  /**
   * @param {!proto.services.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetHandHistoryResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetHandHistoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetHandHistoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getHandHistoryData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getHandHistoryData',
      request,
      metadata || {},
      methodDescriptor_Sng_getHandHistoryData,
      callback);
};


/**
 * @param {!proto.services.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetHandHistoryResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getHandHistoryData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getHandHistoryData',
      request,
      metadata || {},
      methodDescriptor_Sng_getHandHistoryData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.DrawReplaceActionRequest,
 *   !proto.services.GetStatusResult>}
 */
const methodDescriptor_Sng_drawReplaceAction = new grpc.web.MethodDescriptor(
  '/services.Sng/drawReplaceAction',
  grpc.web.MethodType.UNARY,
  proto.services.DrawReplaceActionRequest,
  proto.services.GetStatusResult,
  /**
   * @param {!proto.services.DrawReplaceActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.DrawReplaceActionRequest,
 *   !proto.services.GetStatusResult>}
 */
const methodInfo_Sng_drawReplaceAction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetStatusResult,
  /**
   * @param {!proto.services.DrawReplaceActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetStatusResult.deserializeBinary
);


/**
 * @param {!proto.services.DrawReplaceActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.drawReplaceAction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/drawReplaceAction',
      request,
      metadata || {},
      methodDescriptor_Sng_drawReplaceAction,
      callback);
};


/**
 * @param {!proto.services.DrawReplaceActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetStatusResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.drawReplaceAction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/drawReplaceAction',
      request,
      metadata || {},
      methodDescriptor_Sng_drawReplaceAction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.DrawAddActionRequest,
 *   !proto.services.GetStatusResult>}
 */
const methodDescriptor_Sng_drawAddAction = new grpc.web.MethodDescriptor(
  '/services.Sng/drawAddAction',
  grpc.web.MethodType.UNARY,
  proto.services.DrawAddActionRequest,
  proto.services.GetStatusResult,
  /**
   * @param {!proto.services.DrawAddActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.DrawAddActionRequest,
 *   !proto.services.GetStatusResult>}
 */
const methodInfo_Sng_drawAddAction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetStatusResult,
  /**
   * @param {!proto.services.DrawAddActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetStatusResult.deserializeBinary
);


/**
 * @param {!proto.services.DrawAddActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.drawAddAction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/drawAddAction',
      request,
      metadata || {},
      methodDescriptor_Sng_drawAddAction,
      callback);
};


/**
 * @param {!proto.services.DrawAddActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetStatusResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.drawAddAction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/drawAddAction',
      request,
      metadata || {},
      methodDescriptor_Sng_drawAddAction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.JoinTournamentTemplateRequest,
 *   !proto.services.JoinTournamentTemplateResponse>}
 */
const methodDescriptor_Sng_joinTournamentTempalte = new grpc.web.MethodDescriptor(
  '/services.Sng/joinTournamentTempalte',
  grpc.web.MethodType.UNARY,
  proto.services.JoinTournamentTemplateRequest,
  proto.services.JoinTournamentTemplateResponse,
  /**
   * @param {!proto.services.JoinTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.JoinTournamentTemplateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.JoinTournamentTemplateRequest,
 *   !proto.services.JoinTournamentTemplateResponse>}
 */
const methodInfo_Sng_joinTournamentTempalte = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.JoinTournamentTemplateResponse,
  /**
   * @param {!proto.services.JoinTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.JoinTournamentTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.services.JoinTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.JoinTournamentTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.JoinTournamentTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.joinTournamentTempalte =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/joinTournamentTempalte',
      request,
      metadata || {},
      methodDescriptor_Sng_joinTournamentTempalte,
      callback);
};


/**
 * @param {!proto.services.JoinTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.JoinTournamentTemplateResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.joinTournamentTempalte =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/joinTournamentTempalte',
      request,
      metadata || {},
      methodDescriptor_Sng_joinTournamentTempalte);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetTournamentTemplateDetailRequest,
 *   !proto.services.GetTournamentTemplateDetailResponse>}
 */
const methodDescriptor_Sng_getTournamentTemplateDetail = new grpc.web.MethodDescriptor(
  '/services.Sng/getTournamentTemplateDetail',
  grpc.web.MethodType.UNARY,
  proto.services.GetTournamentTemplateDetailRequest,
  proto.services.GetTournamentTemplateDetailResponse,
  /**
   * @param {!proto.services.GetTournamentTemplateDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetTournamentTemplateDetailResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetTournamentTemplateDetailRequest,
 *   !proto.services.GetTournamentTemplateDetailResponse>}
 */
const methodInfo_Sng_getTournamentTemplateDetail = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetTournamentTemplateDetailResponse,
  /**
   * @param {!proto.services.GetTournamentTemplateDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetTournamentTemplateDetailResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetTournamentTemplateDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetTournamentTemplateDetailResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetTournamentTemplateDetailResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getTournamentTemplateDetail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getTournamentTemplateDetail',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateDetail,
      callback);
};


/**
 * @param {!proto.services.GetTournamentTemplateDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetTournamentTemplateDetailResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getTournamentTemplateDetail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getTournamentTemplateDetail',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateDetail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AddTournamentTemplateToLobbyRequest,
 *   !proto.services.AddTournamentTemplateToLobbyResponse>}
 */
const methodDescriptor_Sng_addTournamentTemplateToLobby = new grpc.web.MethodDescriptor(
  '/services.Sng/addTournamentTemplateToLobby',
  grpc.web.MethodType.UNARY,
  proto.services.AddTournamentTemplateToLobbyRequest,
  proto.services.AddTournamentTemplateToLobbyResponse,
  /**
   * @param {!proto.services.AddTournamentTemplateToLobbyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AddTournamentTemplateToLobbyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AddTournamentTemplateToLobbyRequest,
 *   !proto.services.AddTournamentTemplateToLobbyResponse>}
 */
const methodInfo_Sng_addTournamentTemplateToLobby = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.AddTournamentTemplateToLobbyResponse,
  /**
   * @param {!proto.services.AddTournamentTemplateToLobbyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AddTournamentTemplateToLobbyResponse.deserializeBinary
);


/**
 * @param {!proto.services.AddTournamentTemplateToLobbyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.AddTournamentTemplateToLobbyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.AddTournamentTemplateToLobbyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.addTournamentTemplateToLobby =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/addTournamentTemplateToLobby',
      request,
      metadata || {},
      methodDescriptor_Sng_addTournamentTemplateToLobby,
      callback);
};


/**
 * @param {!proto.services.AddTournamentTemplateToLobbyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.AddTournamentTemplateToLobbyResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.addTournamentTemplateToLobby =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/addTournamentTemplateToLobby',
      request,
      metadata || {},
      methodDescriptor_Sng_addTournamentTemplateToLobby);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.RemoveTournamentTemplateFromLobbyRequest,
 *   !proto.services.RemoveTournamentTemplateFromLobbyResponse>}
 */
const methodDescriptor_Sng_removeTournamentTemplateFromLobby = new grpc.web.MethodDescriptor(
  '/services.Sng/removeTournamentTemplateFromLobby',
  grpc.web.MethodType.UNARY,
  proto.services.RemoveTournamentTemplateFromLobbyRequest,
  proto.services.RemoveTournamentTemplateFromLobbyResponse,
  /**
   * @param {!proto.services.RemoveTournamentTemplateFromLobbyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.RemoveTournamentTemplateFromLobbyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.RemoveTournamentTemplateFromLobbyRequest,
 *   !proto.services.RemoveTournamentTemplateFromLobbyResponse>}
 */
const methodInfo_Sng_removeTournamentTemplateFromLobby = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.RemoveTournamentTemplateFromLobbyResponse,
  /**
   * @param {!proto.services.RemoveTournamentTemplateFromLobbyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.RemoveTournamentTemplateFromLobbyResponse.deserializeBinary
);


/**
 * @param {!proto.services.RemoveTournamentTemplateFromLobbyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.RemoveTournamentTemplateFromLobbyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.RemoveTournamentTemplateFromLobbyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.removeTournamentTemplateFromLobby =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/removeTournamentTemplateFromLobby',
      request,
      metadata || {},
      methodDescriptor_Sng_removeTournamentTemplateFromLobby,
      callback);
};


/**
 * @param {!proto.services.RemoveTournamentTemplateFromLobbyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.RemoveTournamentTemplateFromLobbyResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.removeTournamentTemplateFromLobby =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/removeTournamentTemplateFromLobby',
      request,
      metadata || {},
      methodDescriptor_Sng_removeTournamentTemplateFromLobby);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.CreateTournamentTemplateRequest,
 *   !proto.services.CreateTournamentTemplateResponse>}
 */
const methodDescriptor_Sng_createTournamentTemplate = new grpc.web.MethodDescriptor(
  '/services.Sng/createTournamentTemplate',
  grpc.web.MethodType.UNARY,
  proto.services.CreateTournamentTemplateRequest,
  proto.services.CreateTournamentTemplateResponse,
  /**
   * @param {!proto.services.CreateTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CreateTournamentTemplateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.CreateTournamentTemplateRequest,
 *   !proto.services.CreateTournamentTemplateResponse>}
 */
const methodInfo_Sng_createTournamentTemplate = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.CreateTournamentTemplateResponse,
  /**
   * @param {!proto.services.CreateTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CreateTournamentTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.services.CreateTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.CreateTournamentTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.CreateTournamentTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.createTournamentTemplate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/createTournamentTemplate',
      request,
      metadata || {},
      methodDescriptor_Sng_createTournamentTemplate,
      callback);
};


/**
 * @param {!proto.services.CreateTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.CreateTournamentTemplateResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.createTournamentTemplate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/createTournamentTemplate',
      request,
      metadata || {},
      methodDescriptor_Sng_createTournamentTemplate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetTournamentTemplateListRequest,
 *   !proto.services.GetTournamentTemplateListResponse>}
 */
const methodDescriptor_Sng_getTournamentTemplateList = new grpc.web.MethodDescriptor(
  '/services.Sng/getTournamentTemplateList',
  grpc.web.MethodType.UNARY,
  proto.services.GetTournamentTemplateListRequest,
  proto.services.GetTournamentTemplateListResponse,
  /**
   * @param {!proto.services.GetTournamentTemplateListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetTournamentTemplateListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetTournamentTemplateListRequest,
 *   !proto.services.GetTournamentTemplateListResponse>}
 */
const methodInfo_Sng_getTournamentTemplateList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetTournamentTemplateListResponse,
  /**
   * @param {!proto.services.GetTournamentTemplateListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetTournamentTemplateListResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetTournamentTemplateListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetTournamentTemplateListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetTournamentTemplateListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getTournamentTemplateList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getTournamentTemplateList',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateList,
      callback);
};


/**
 * @param {!proto.services.GetTournamentTemplateListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetTournamentTemplateListResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getTournamentTemplateList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getTournamentTemplateList',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetLobbyTournamentTemplateListRequest,
 *   !proto.services.GetLobbyTournamentTemplateListResponse>}
 */
const methodDescriptor_Sng_getLobbyTournamentTemplateList = new grpc.web.MethodDescriptor(
  '/services.Sng/getLobbyTournamentTemplateList',
  grpc.web.MethodType.UNARY,
  proto.services.GetLobbyTournamentTemplateListRequest,
  proto.services.GetLobbyTournamentTemplateListResponse,
  /**
   * @param {!proto.services.GetLobbyTournamentTemplateListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetLobbyTournamentTemplateListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetLobbyTournamentTemplateListRequest,
 *   !proto.services.GetLobbyTournamentTemplateListResponse>}
 */
const methodInfo_Sng_getLobbyTournamentTemplateList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetLobbyTournamentTemplateListResponse,
  /**
   * @param {!proto.services.GetLobbyTournamentTemplateListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetLobbyTournamentTemplateListResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetLobbyTournamentTemplateListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetLobbyTournamentTemplateListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetLobbyTournamentTemplateListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getLobbyTournamentTemplateList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getLobbyTournamentTemplateList',
      request,
      metadata || {},
      methodDescriptor_Sng_getLobbyTournamentTemplateList,
      callback);
};


/**
 * @param {!proto.services.GetLobbyTournamentTemplateListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetLobbyTournamentTemplateListResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getLobbyTournamentTemplateList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getLobbyTournamentTemplateList',
      request,
      metadata || {},
      methodDescriptor_Sng_getLobbyTournamentTemplateList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetTournamentTemplateBufferStateRequest,
 *   !proto.services.GetTournamentTemplateBufferStateResponse>}
 */
const methodDescriptor_Sng_getTournamentTemplateBufferState = new grpc.web.MethodDescriptor(
  '/services.Sng/getTournamentTemplateBufferState',
  grpc.web.MethodType.UNARY,
  proto.services.GetTournamentTemplateBufferStateRequest,
  proto.services.GetTournamentTemplateBufferStateResponse,
  /**
   * @param {!proto.services.GetTournamentTemplateBufferStateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetTournamentTemplateBufferStateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetTournamentTemplateBufferStateRequest,
 *   !proto.services.GetTournamentTemplateBufferStateResponse>}
 */
const methodInfo_Sng_getTournamentTemplateBufferState = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetTournamentTemplateBufferStateResponse,
  /**
   * @param {!proto.services.GetTournamentTemplateBufferStateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetTournamentTemplateBufferStateResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetTournamentTemplateBufferStateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetTournamentTemplateBufferStateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetTournamentTemplateBufferStateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getTournamentTemplateBufferState =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getTournamentTemplateBufferState',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateBufferState,
      callback);
};


/**
 * @param {!proto.services.GetTournamentTemplateBufferStateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetTournamentTemplateBufferStateResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getTournamentTemplateBufferState =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getTournamentTemplateBufferState',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateBufferState);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.UnsubscribeFromTournamentTemplateBufferRequest,
 *   !proto.services.UnsubscribeFromTournamentTemplateBufferResponse>}
 */
const methodDescriptor_Sng_unsubscribeFromTournamentTemplateBuffer = new grpc.web.MethodDescriptor(
  '/services.Sng/unsubscribeFromTournamentTemplateBuffer',
  grpc.web.MethodType.UNARY,
  proto.services.UnsubscribeFromTournamentTemplateBufferRequest,
  proto.services.UnsubscribeFromTournamentTemplateBufferResponse,
  /**
   * @param {!proto.services.UnsubscribeFromTournamentTemplateBufferRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UnsubscribeFromTournamentTemplateBufferResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.UnsubscribeFromTournamentTemplateBufferRequest,
 *   !proto.services.UnsubscribeFromTournamentTemplateBufferResponse>}
 */
const methodInfo_Sng_unsubscribeFromTournamentTemplateBuffer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.UnsubscribeFromTournamentTemplateBufferResponse,
  /**
   * @param {!proto.services.UnsubscribeFromTournamentTemplateBufferRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UnsubscribeFromTournamentTemplateBufferResponse.deserializeBinary
);


/**
 * @param {!proto.services.UnsubscribeFromTournamentTemplateBufferRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.UnsubscribeFromTournamentTemplateBufferResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.UnsubscribeFromTournamentTemplateBufferResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.unsubscribeFromTournamentTemplateBuffer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/unsubscribeFromTournamentTemplateBuffer',
      request,
      metadata || {},
      methodDescriptor_Sng_unsubscribeFromTournamentTemplateBuffer,
      callback);
};


/**
 * @param {!proto.services.UnsubscribeFromTournamentTemplateBufferRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.UnsubscribeFromTournamentTemplateBufferResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.unsubscribeFromTournamentTemplateBuffer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/unsubscribeFromTournamentTemplateBuffer',
      request,
      metadata || {},
      methodDescriptor_Sng_unsubscribeFromTournamentTemplateBuffer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.LaunchTournamentRequest,
 *   !proto.services.LaunchTournamentResponse>}
 */
const methodDescriptor_Sng_launchTournament = new grpc.web.MethodDescriptor(
  '/services.Sng/launchTournament',
  grpc.web.MethodType.UNARY,
  proto.services.LaunchTournamentRequest,
  proto.services.LaunchTournamentResponse,
  /**
   * @param {!proto.services.LaunchTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.LaunchTournamentResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.LaunchTournamentRequest,
 *   !proto.services.LaunchTournamentResponse>}
 */
const methodInfo_Sng_launchTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.LaunchTournamentResponse,
  /**
   * @param {!proto.services.LaunchTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.LaunchTournamentResponse.deserializeBinary
);


/**
 * @param {!proto.services.LaunchTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.LaunchTournamentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.LaunchTournamentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.launchTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/launchTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_launchTournament,
      callback);
};


/**
 * @param {!proto.services.LaunchTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.LaunchTournamentResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.launchTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/launchTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_launchTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.SignupRequest,
 *   !proto.services.SignupResult>}
 */
const methodDescriptor_Sng_Signup = new grpc.web.MethodDescriptor(
  '/services.Sng/Signup',
  grpc.web.MethodType.UNARY,
  proto.services.SignupRequest,
  proto.services.SignupResult,
  /**
   * @param {!proto.services.SignupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.SignupResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.SignupRequest,
 *   !proto.services.SignupResult>}
 */
const methodInfo_Sng_Signup = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.SignupResult,
  /**
   * @param {!proto.services.SignupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.SignupResult.deserializeBinary
);


/**
 * @param {!proto.services.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.SignupResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.SignupResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.signup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/Signup',
      request,
      metadata || {},
      methodDescriptor_Sng_Signup,
      callback);
};


/**
 * @param {!proto.services.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.SignupResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.signup =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/Signup',
      request,
      metadata || {},
      methodDescriptor_Sng_Signup);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.LoginRequest,
 *   !proto.services.LoginResult>}
 */
const methodDescriptor_Sng_Login = new grpc.web.MethodDescriptor(
  '/services.Sng/Login',
  grpc.web.MethodType.UNARY,
  proto.services.LoginRequest,
  proto.services.LoginResult,
  /**
   * @param {!proto.services.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.LoginResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.LoginRequest,
 *   !proto.services.LoginResult>}
 */
const methodInfo_Sng_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.LoginResult,
  /**
   * @param {!proto.services.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.LoginResult.deserializeBinary
);


/**
 * @param {!proto.services.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.LoginResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.LoginResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/Login',
      request,
      metadata || {},
      methodDescriptor_Sng_Login,
      callback);
};


/**
 * @param {!proto.services.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.LoginResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/Login',
      request,
      metadata || {},
      methodDescriptor_Sng_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.LogoutRequest,
 *   !proto.services.LogoutResult>}
 */
const methodDescriptor_Sng_Logout = new grpc.web.MethodDescriptor(
  '/services.Sng/Logout',
  grpc.web.MethodType.UNARY,
  proto.services.LogoutRequest,
  proto.services.LogoutResult,
  /**
   * @param {!proto.services.LogoutRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.LogoutResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.LogoutRequest,
 *   !proto.services.LogoutResult>}
 */
const methodInfo_Sng_Logout = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.LogoutResult,
  /**
   * @param {!proto.services.LogoutRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.LogoutResult.deserializeBinary
);


/**
 * @param {!proto.services.LogoutRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.LogoutResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.LogoutResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.logout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/Logout',
      request,
      metadata || {},
      methodDescriptor_Sng_Logout,
      callback);
};


/**
 * @param {!proto.services.LogoutRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.LogoutResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.logout =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/Logout',
      request,
      metadata || {},
      methodDescriptor_Sng_Logout);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.MakeDepositRequest,
 *   !proto.services.MakeDepositResponse>}
 */
const methodDescriptor_Sng_makeDeposit = new grpc.web.MethodDescriptor(
  '/services.Sng/makeDeposit',
  grpc.web.MethodType.UNARY,
  proto.services.MakeDepositRequest,
  proto.services.MakeDepositResponse,
  /**
   * @param {!proto.services.MakeDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.MakeDepositResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.MakeDepositRequest,
 *   !proto.services.MakeDepositResponse>}
 */
const methodInfo_Sng_makeDeposit = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.MakeDepositResponse,
  /**
   * @param {!proto.services.MakeDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.MakeDepositResponse.deserializeBinary
);


/**
 * @param {!proto.services.MakeDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.MakeDepositResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.MakeDepositResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.makeDeposit =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/makeDeposit',
      request,
      metadata || {},
      methodDescriptor_Sng_makeDeposit,
      callback);
};


/**
 * @param {!proto.services.MakeDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.MakeDepositResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.makeDeposit =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/makeDeposit',
      request,
      metadata || {},
      methodDescriptor_Sng_makeDeposit);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.MakeWithdrawalRequest,
 *   !proto.services.MakeWithdrawalResponse>}
 */
const methodDescriptor_Sng_makeWithdrawal = new grpc.web.MethodDescriptor(
  '/services.Sng/makeWithdrawal',
  grpc.web.MethodType.UNARY,
  proto.services.MakeWithdrawalRequest,
  proto.services.MakeWithdrawalResponse,
  /**
   * @param {!proto.services.MakeWithdrawalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.MakeWithdrawalResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.MakeWithdrawalRequest,
 *   !proto.services.MakeWithdrawalResponse>}
 */
const methodInfo_Sng_makeWithdrawal = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.MakeWithdrawalResponse,
  /**
   * @param {!proto.services.MakeWithdrawalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.MakeWithdrawalResponse.deserializeBinary
);


/**
 * @param {!proto.services.MakeWithdrawalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.MakeWithdrawalResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.MakeWithdrawalResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.makeWithdrawal =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/makeWithdrawal',
      request,
      metadata || {},
      methodDescriptor_Sng_makeWithdrawal,
      callback);
};


/**
 * @param {!proto.services.MakeWithdrawalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.MakeWithdrawalResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.makeWithdrawal =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/makeWithdrawal',
      request,
      metadata || {},
      methodDescriptor_Sng_makeWithdrawal);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AccountStatementsRequest,
 *   !proto.services.AccountStatementsResponse>}
 */
const methodDescriptor_Sng_getAccountStatements = new grpc.web.MethodDescriptor(
  '/services.Sng/getAccountStatements',
  grpc.web.MethodType.UNARY,
  proto.services.AccountStatementsRequest,
  proto.services.AccountStatementsResponse,
  /**
   * @param {!proto.services.AccountStatementsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AccountStatementsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AccountStatementsRequest,
 *   !proto.services.AccountStatementsResponse>}
 */
const methodInfo_Sng_getAccountStatements = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.AccountStatementsResponse,
  /**
   * @param {!proto.services.AccountStatementsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AccountStatementsResponse.deserializeBinary
);


/**
 * @param {!proto.services.AccountStatementsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.AccountStatementsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.AccountStatementsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getAccountStatements =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getAccountStatements',
      request,
      metadata || {},
      methodDescriptor_Sng_getAccountStatements,
      callback);
};


/**
 * @param {!proto.services.AccountStatementsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.AccountStatementsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getAccountStatements =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getAccountStatements',
      request,
      metadata || {},
      methodDescriptor_Sng_getAccountStatements);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.CaptureDepositRequest,
 *   !proto.services.CaptureDepositResponse>}
 */
const methodDescriptor_Sng_captureProcessedDeposit = new grpc.web.MethodDescriptor(
  '/services.Sng/captureProcessedDeposit',
  grpc.web.MethodType.UNARY,
  proto.services.CaptureDepositRequest,
  proto.services.CaptureDepositResponse,
  /**
   * @param {!proto.services.CaptureDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CaptureDepositResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.CaptureDepositRequest,
 *   !proto.services.CaptureDepositResponse>}
 */
const methodInfo_Sng_captureProcessedDeposit = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.CaptureDepositResponse,
  /**
   * @param {!proto.services.CaptureDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CaptureDepositResponse.deserializeBinary
);


/**
 * @param {!proto.services.CaptureDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.CaptureDepositResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.CaptureDepositResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.captureProcessedDeposit =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/captureProcessedDeposit',
      request,
      metadata || {},
      methodDescriptor_Sng_captureProcessedDeposit,
      callback);
};


/**
 * @param {!proto.services.CaptureDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.CaptureDepositResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.captureProcessedDeposit =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/captureProcessedDeposit',
      request,
      metadata || {},
      methodDescriptor_Sng_captureProcessedDeposit);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.CaptureWithdrawalRequest,
 *   !proto.services.CaptureWithdrawalResponse>}
 */
const methodDescriptor_Sng_captureProcessedWithdrawal = new grpc.web.MethodDescriptor(
  '/services.Sng/captureProcessedWithdrawal',
  grpc.web.MethodType.UNARY,
  proto.services.CaptureWithdrawalRequest,
  proto.services.CaptureWithdrawalResponse,
  /**
   * @param {!proto.services.CaptureWithdrawalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CaptureWithdrawalResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.CaptureWithdrawalRequest,
 *   !proto.services.CaptureWithdrawalResponse>}
 */
const methodInfo_Sng_captureProcessedWithdrawal = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.CaptureWithdrawalResponse,
  /**
   * @param {!proto.services.CaptureWithdrawalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CaptureWithdrawalResponse.deserializeBinary
);


/**
 * @param {!proto.services.CaptureWithdrawalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.CaptureWithdrawalResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.CaptureWithdrawalResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.captureProcessedWithdrawal =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/captureProcessedWithdrawal',
      request,
      metadata || {},
      methodDescriptor_Sng_captureProcessedWithdrawal,
      callback);
};


/**
 * @param {!proto.services.CaptureWithdrawalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.CaptureWithdrawalResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.captureProcessedWithdrawal =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/captureProcessedWithdrawal',
      request,
      metadata || {},
      methodDescriptor_Sng_captureProcessedWithdrawal);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AddPayoutStructureRequest,
 *   !proto.services.AddPayoutStructureResponse>}
 */
const methodDescriptor_Sng_addPayoutStructure = new grpc.web.MethodDescriptor(
  '/services.Sng/addPayoutStructure',
  grpc.web.MethodType.UNARY,
  proto.services.AddPayoutStructureRequest,
  proto.services.AddPayoutStructureResponse,
  /**
   * @param {!proto.services.AddPayoutStructureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AddPayoutStructureResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AddPayoutStructureRequest,
 *   !proto.services.AddPayoutStructureResponse>}
 */
const methodInfo_Sng_addPayoutStructure = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.AddPayoutStructureResponse,
  /**
   * @param {!proto.services.AddPayoutStructureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AddPayoutStructureResponse.deserializeBinary
);


/**
 * @param {!proto.services.AddPayoutStructureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.AddPayoutStructureResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.AddPayoutStructureResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.addPayoutStructure =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/addPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_addPayoutStructure,
      callback);
};


/**
 * @param {!proto.services.AddPayoutStructureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.AddPayoutStructureResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.addPayoutStructure =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/addPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_addPayoutStructure);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetPayoutStructureRequest,
 *   !proto.services.GetPayoutStructureResponse>}
 */
const methodDescriptor_Sng_getPayoutStructure = new grpc.web.MethodDescriptor(
  '/services.Sng/getPayoutStructure',
  grpc.web.MethodType.UNARY,
  proto.services.GetPayoutStructureRequest,
  proto.services.GetPayoutStructureResponse,
  /**
   * @param {!proto.services.GetPayoutStructureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetPayoutStructureResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetPayoutStructureRequest,
 *   !proto.services.GetPayoutStructureResponse>}
 */
const methodInfo_Sng_getPayoutStructure = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetPayoutStructureResponse,
  /**
   * @param {!proto.services.GetPayoutStructureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetPayoutStructureResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetPayoutStructureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetPayoutStructureResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetPayoutStructureResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getPayoutStructure =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_getPayoutStructure,
      callback);
};


/**
 * @param {!proto.services.GetPayoutStructureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetPayoutStructureResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getPayoutStructure =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_getPayoutStructure);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ChangePasswordRequest,
 *   !proto.services.ChangePasswordResponse>}
 */
const methodDescriptor_Sng_changePassword = new grpc.web.MethodDescriptor(
  '/services.Sng/changePassword',
  grpc.web.MethodType.UNARY,
  proto.services.ChangePasswordRequest,
  proto.services.ChangePasswordResponse,
  /**
   * @param {!proto.services.ChangePasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ChangePasswordResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ChangePasswordRequest,
 *   !proto.services.ChangePasswordResponse>}
 */
const methodInfo_Sng_changePassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ChangePasswordResponse,
  /**
   * @param {!proto.services.ChangePasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ChangePasswordResponse.deserializeBinary
);


/**
 * @param {!proto.services.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ChangePasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ChangePasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.changePassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/changePassword',
      request,
      metadata || {},
      methodDescriptor_Sng_changePassword,
      callback);
};


/**
 * @param {!proto.services.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ChangePasswordResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.changePassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/changePassword',
      request,
      metadata || {},
      methodDescriptor_Sng_changePassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ClientTokenRequest,
 *   !proto.services.ClientTokenResponse>}
 */
const methodDescriptor_Sng_getClientToken = new grpc.web.MethodDescriptor(
  '/services.Sng/getClientToken',
  grpc.web.MethodType.UNARY,
  proto.services.ClientTokenRequest,
  proto.services.ClientTokenResponse,
  /**
   * @param {!proto.services.ClientTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ClientTokenResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ClientTokenRequest,
 *   !proto.services.ClientTokenResponse>}
 */
const methodInfo_Sng_getClientToken = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ClientTokenResponse,
  /**
   * @param {!proto.services.ClientTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ClientTokenResponse.deserializeBinary
);


/**
 * @param {!proto.services.ClientTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ClientTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ClientTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getClientToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getClientToken',
      request,
      metadata || {},
      methodDescriptor_Sng_getClientToken,
      callback);
};


/**
 * @param {!proto.services.ClientTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ClientTokenResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getClientToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getClientToken',
      request,
      metadata || {},
      methodDescriptor_Sng_getClientToken);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.VaultPaymentMethodRequest,
 *   !proto.services.VaultPaymentMethodResponse>}
 */
const methodDescriptor_Sng_vaultPaymentMethod = new grpc.web.MethodDescriptor(
  '/services.Sng/vaultPaymentMethod',
  grpc.web.MethodType.UNARY,
  proto.services.VaultPaymentMethodRequest,
  proto.services.VaultPaymentMethodResponse,
  /**
   * @param {!proto.services.VaultPaymentMethodRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.VaultPaymentMethodResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.VaultPaymentMethodRequest,
 *   !proto.services.VaultPaymentMethodResponse>}
 */
const methodInfo_Sng_vaultPaymentMethod = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.VaultPaymentMethodResponse,
  /**
   * @param {!proto.services.VaultPaymentMethodRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.VaultPaymentMethodResponse.deserializeBinary
);


/**
 * @param {!proto.services.VaultPaymentMethodRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.VaultPaymentMethodResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.VaultPaymentMethodResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.vaultPaymentMethod =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/vaultPaymentMethod',
      request,
      metadata || {},
      methodDescriptor_Sng_vaultPaymentMethod,
      callback);
};


/**
 * @param {!proto.services.VaultPaymentMethodRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.VaultPaymentMethodResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.vaultPaymentMethod =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/vaultPaymentMethod',
      request,
      metadata || {},
      methodDescriptor_Sng_vaultPaymentMethod);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.SignupRequest,
 *   !proto.services.SignupResult>}
 */
const methodDescriptor_Sng_validateExperian = new grpc.web.MethodDescriptor(
  '/services.Sng/validateExperian',
  grpc.web.MethodType.UNARY,
  proto.services.SignupRequest,
  proto.services.SignupResult,
  /**
   * @param {!proto.services.SignupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.SignupResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.SignupRequest,
 *   !proto.services.SignupResult>}
 */
const methodInfo_Sng_validateExperian = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.SignupResult,
  /**
   * @param {!proto.services.SignupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.SignupResult.deserializeBinary
);


/**
 * @param {!proto.services.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.SignupResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.SignupResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.validateExperian =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/validateExperian',
      request,
      metadata || {},
      methodDescriptor_Sng_validateExperian,
      callback);
};


/**
 * @param {!proto.services.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.SignupResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.validateExperian =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/validateExperian',
      request,
      metadata || {},
      methodDescriptor_Sng_validateExperian);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetUserByEmailRequest,
 *   !proto.services.GetUserByEmailResponse>}
 */
const methodDescriptor_Sng_GetUserByEmail = new grpc.web.MethodDescriptor(
  '/services.Sng/GetUserByEmail',
  grpc.web.MethodType.UNARY,
  proto.services.GetUserByEmailRequest,
  proto.services.GetUserByEmailResponse,
  /**
   * @param {!proto.services.GetUserByEmailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetUserByEmailResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetUserByEmailRequest,
 *   !proto.services.GetUserByEmailResponse>}
 */
const methodInfo_Sng_GetUserByEmail = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetUserByEmailResponse,
  /**
   * @param {!proto.services.GetUserByEmailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetUserByEmailResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetUserByEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetUserByEmailResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetUserByEmailResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getUserByEmail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/GetUserByEmail',
      request,
      metadata || {},
      methodDescriptor_Sng_GetUserByEmail,
      callback);
};


/**
 * @param {!proto.services.GetUserByEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetUserByEmailResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getUserByEmail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/GetUserByEmail',
      request,
      metadata || {},
      methodDescriptor_Sng_GetUserByEmail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.MakeSngWithRandomUsersRequest,
 *   !proto.services.GetStatusResult>}
 */
const methodDescriptor_Sng_MakeSngWithRandomUsers = new grpc.web.MethodDescriptor(
  '/services.Sng/MakeSngWithRandomUsers',
  grpc.web.MethodType.UNARY,
  proto.services.MakeSngWithRandomUsersRequest,
  proto.services.GetStatusResult,
  /**
   * @param {!proto.services.MakeSngWithRandomUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.MakeSngWithRandomUsersRequest,
 *   !proto.services.GetStatusResult>}
 */
const methodInfo_Sng_MakeSngWithRandomUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetStatusResult,
  /**
   * @param {!proto.services.MakeSngWithRandomUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetStatusResult.deserializeBinary
);


/**
 * @param {!proto.services.MakeSngWithRandomUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.makeSngWithRandomUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/MakeSngWithRandomUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_MakeSngWithRandomUsers,
      callback);
};


/**
 * @param {!proto.services.MakeSngWithRandomUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetStatusResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.makeSngWithRandomUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/MakeSngWithRandomUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_MakeSngWithRandomUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetRankingsRequest,
 *   !proto.services.GetRankingsResult>}
 */
const methodDescriptor_Sng_GetRankings = new grpc.web.MethodDescriptor(
  '/services.Sng/GetRankings',
  grpc.web.MethodType.UNARY,
  proto.services.GetRankingsRequest,
  proto.services.GetRankingsResult,
  /**
   * @param {!proto.services.GetRankingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetRankingsResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetRankingsRequest,
 *   !proto.services.GetRankingsResult>}
 */
const methodInfo_Sng_GetRankings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetRankingsResult,
  /**
   * @param {!proto.services.GetRankingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetRankingsResult.deserializeBinary
);


/**
 * @param {!proto.services.GetRankingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetRankingsResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetRankingsResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getRankings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/GetRankings',
      request,
      metadata || {},
      methodDescriptor_Sng_GetRankings,
      callback);
};


/**
 * @param {!proto.services.GetRankingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetRankingsResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getRankings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/GetRankings',
      request,
      metadata || {},
      methodDescriptor_Sng_GetRankings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.TableSubscribeRequest,
 *   !proto.services.TableSubscribeResponse>}
 */
const methodDescriptor_Sng_TableSubscribe = new grpc.web.MethodDescriptor(
  '/services.Sng/TableSubscribe',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.services.TableSubscribeRequest,
  proto.services.TableSubscribeResponse,
  /**
   * @param {!proto.services.TableSubscribeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.TableSubscribeResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.TableSubscribeRequest,
 *   !proto.services.TableSubscribeResponse>}
 */
const methodInfo_Sng_TableSubscribe = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.TableSubscribeResponse,
  /**
   * @param {!proto.services.TableSubscribeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.TableSubscribeResponse.deserializeBinary
);


/**
 * @param {!proto.services.TableSubscribeRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.services.TableSubscribeResponse>}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.tableSubscribe =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/services.Sng/TableSubscribe',
      request,
      metadata || {},
      methodDescriptor_Sng_TableSubscribe);
};


/**
 * @param {!proto.services.TableSubscribeRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.services.TableSubscribeResponse>}
 *     The XHR Node Readable Stream
 */
proto.services.SngPromiseClient.prototype.tableSubscribe =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/services.Sng/TableSubscribe',
      request,
      metadata || {},
      methodDescriptor_Sng_TableSubscribe);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeolocationRequest,
 *   !proto.services.GeolocationResult>}
 */
const methodDescriptor_Sng_sendGeolocationData = new grpc.web.MethodDescriptor(
  '/services.Sng/sendGeolocationData',
  grpc.web.MethodType.UNARY,
  proto.services.GeolocationRequest,
  proto.services.GeolocationResult,
  /**
   * @param {!proto.services.GeolocationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeolocationResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeolocationRequest,
 *   !proto.services.GeolocationResult>}
 */
const methodInfo_Sng_sendGeolocationData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeolocationResult,
  /**
   * @param {!proto.services.GeolocationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeolocationResult.deserializeBinary
);


/**
 * @param {!proto.services.GeolocationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeolocationResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeolocationResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.sendGeolocationData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/sendGeolocationData',
      request,
      metadata || {},
      methodDescriptor_Sng_sendGeolocationData,
      callback);
};


/**
 * @param {!proto.services.GeolocationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeolocationResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.sendGeolocationData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/sendGeolocationData',
      request,
      metadata || {},
      methodDescriptor_Sng_sendGeolocationData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.SearchUserRequest,
 *   !proto.services.SearchUserResult>}
 */
const methodDescriptor_Sng_searchUserByUsername = new grpc.web.MethodDescriptor(
  '/services.Sng/searchUserByUsername',
  grpc.web.MethodType.UNARY,
  proto.services.SearchUserRequest,
  proto.services.SearchUserResult,
  /**
   * @param {!proto.services.SearchUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.SearchUserResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.SearchUserRequest,
 *   !proto.services.SearchUserResult>}
 */
const methodInfo_Sng_searchUserByUsername = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.SearchUserResult,
  /**
   * @param {!proto.services.SearchUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.SearchUserResult.deserializeBinary
);


/**
 * @param {!proto.services.SearchUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.SearchUserResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.SearchUserResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.searchUserByUsername =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/searchUserByUsername',
      request,
      metadata || {},
      methodDescriptor_Sng_searchUserByUsername,
      callback);
};


/**
 * @param {!proto.services.SearchUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.SearchUserResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.searchUserByUsername =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/searchUserByUsername',
      request,
      metadata || {},
      methodDescriptor_Sng_searchUserByUsername);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.WhitelistUserRequest,
 *   !proto.services.WhitelistUserResult>}
 */
const methodDescriptor_Sng_whitelistUser = new grpc.web.MethodDescriptor(
  '/services.Sng/whitelistUser',
  grpc.web.MethodType.UNARY,
  proto.services.WhitelistUserRequest,
  proto.services.WhitelistUserResult,
  /**
   * @param {!proto.services.WhitelistUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.WhitelistUserResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.WhitelistUserRequest,
 *   !proto.services.WhitelistUserResult>}
 */
const methodInfo_Sng_whitelistUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.WhitelistUserResult,
  /**
   * @param {!proto.services.WhitelistUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.WhitelistUserResult.deserializeBinary
);


/**
 * @param {!proto.services.WhitelistUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.WhitelistUserResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.WhitelistUserResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.whitelistUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/whitelistUser',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistUser,
      callback);
};


/**
 * @param {!proto.services.WhitelistUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.WhitelistUserResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.whitelistUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/whitelistUser',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AcceptTOSRequest,
 *   !proto.services.AcceptTOSResult>}
 */
const methodDescriptor_Sng_acceptTOS = new grpc.web.MethodDescriptor(
  '/services.Sng/acceptTOS',
  grpc.web.MethodType.UNARY,
  proto.services.AcceptTOSRequest,
  proto.services.AcceptTOSResult,
  /**
   * @param {!proto.services.AcceptTOSRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AcceptTOSResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AcceptTOSRequest,
 *   !proto.services.AcceptTOSResult>}
 */
const methodInfo_Sng_acceptTOS = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.AcceptTOSResult,
  /**
   * @param {!proto.services.AcceptTOSRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AcceptTOSResult.deserializeBinary
);


/**
 * @param {!proto.services.AcceptTOSRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.AcceptTOSResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.AcceptTOSResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.acceptTOS =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/acceptTOS',
      request,
      metadata || {},
      methodDescriptor_Sng_acceptTOS,
      callback);
};


/**
 * @param {!proto.services.AcceptTOSRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.AcceptTOSResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.acceptTOS =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/acceptTOS',
      request,
      metadata || {},
      methodDescriptor_Sng_acceptTOS);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AccountUpdatesRequest,
 *   !proto.services.AccountUpdatesResult>}
 */
const methodDescriptor_Sng_checkForUpdates = new grpc.web.MethodDescriptor(
  '/services.Sng/checkForUpdates',
  grpc.web.MethodType.UNARY,
  proto.services.AccountUpdatesRequest,
  proto.services.AccountUpdatesResult,
  /**
   * @param {!proto.services.AccountUpdatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AccountUpdatesResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AccountUpdatesRequest,
 *   !proto.services.AccountUpdatesResult>}
 */
const methodInfo_Sng_checkForUpdates = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.AccountUpdatesResult,
  /**
   * @param {!proto.services.AccountUpdatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AccountUpdatesResult.deserializeBinary
);


/**
 * @param {!proto.services.AccountUpdatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.AccountUpdatesResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.AccountUpdatesResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.checkForUpdates =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/checkForUpdates',
      request,
      metadata || {},
      methodDescriptor_Sng_checkForUpdates,
      callback);
};


/**
 * @param {!proto.services.AccountUpdatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.AccountUpdatesResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.checkForUpdates =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/checkForUpdates',
      request,
      metadata || {},
      methodDescriptor_Sng_checkForUpdates);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.WhitelistedUsersRequest,
 *   !proto.services.WhitelistedUsersResult>}
 */
const methodDescriptor_Sng_getWhitelistedUsers = new grpc.web.MethodDescriptor(
  '/services.Sng/getWhitelistedUsers',
  grpc.web.MethodType.UNARY,
  proto.services.WhitelistedUsersRequest,
  proto.services.WhitelistedUsersResult,
  /**
   * @param {!proto.services.WhitelistedUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.WhitelistedUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.WhitelistedUsersRequest,
 *   !proto.services.WhitelistedUsersResult>}
 */
const methodInfo_Sng_getWhitelistedUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.WhitelistedUsersResult,
  /**
   * @param {!proto.services.WhitelistedUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.WhitelistedUsersResult.deserializeBinary
);


/**
 * @param {!proto.services.WhitelistedUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.WhitelistedUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.WhitelistedUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getWhitelistedUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getWhitelistedUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedUsers,
      callback);
};


/**
 * @param {!proto.services.WhitelistedUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.WhitelistedUsersResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getWhitelistedUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getWhitelistedUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.WhitelistUserRequest,
 *   !proto.services.WhitelistUserResult>}
 */
const methodDescriptor_Sng_removeWhitelistUser = new grpc.web.MethodDescriptor(
  '/services.Sng/removeWhitelistUser',
  grpc.web.MethodType.UNARY,
  proto.services.WhitelistUserRequest,
  proto.services.WhitelistUserResult,
  /**
   * @param {!proto.services.WhitelistUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.WhitelistUserResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.WhitelistUserRequest,
 *   !proto.services.WhitelistUserResult>}
 */
const methodInfo_Sng_removeWhitelistUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.WhitelistUserResult,
  /**
   * @param {!proto.services.WhitelistUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.WhitelistUserResult.deserializeBinary
);


/**
 * @param {!proto.services.WhitelistUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.WhitelistUserResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.WhitelistUserResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.removeWhitelistUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/removeWhitelistUser',
      request,
      metadata || {},
      methodDescriptor_Sng_removeWhitelistUser,
      callback);
};


/**
 * @param {!proto.services.WhitelistUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.WhitelistUserResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.removeWhitelistUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/removeWhitelistUser',
      request,
      metadata || {},
      methodDescriptor_Sng_removeWhitelistUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.TournamentDetailsRequest,
 *   !proto.services.TournamentDetailsResponse>}
 */
const methodDescriptor_Sng_getTournamentDetails = new grpc.web.MethodDescriptor(
  '/services.Sng/getTournamentDetails',
  grpc.web.MethodType.UNARY,
  proto.services.TournamentDetailsRequest,
  proto.services.TournamentDetailsResponse,
  /**
   * @param {!proto.services.TournamentDetailsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.TournamentDetailsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.TournamentDetailsRequest,
 *   !proto.services.TournamentDetailsResponse>}
 */
const methodInfo_Sng_getTournamentDetails = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.TournamentDetailsResponse,
  /**
   * @param {!proto.services.TournamentDetailsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.TournamentDetailsResponse.deserializeBinary
);


/**
 * @param {!proto.services.TournamentDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.TournamentDetailsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.TournamentDetailsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getTournamentDetails =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getTournamentDetails',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentDetails,
      callback);
};


/**
 * @param {!proto.services.TournamentDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.TournamentDetailsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getTournamentDetails =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getTournamentDetails',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentDetails);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.PlayerAccountBalanceRequest,
 *   !proto.services.PlayerAccountBalanceResult>}
 */
const methodDescriptor_Sng_getPlayerAccountBalance = new grpc.web.MethodDescriptor(
  '/services.Sng/getPlayerAccountBalance',
  grpc.web.MethodType.UNARY,
  proto.services.PlayerAccountBalanceRequest,
  proto.services.PlayerAccountBalanceResult,
  /**
   * @param {!proto.services.PlayerAccountBalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerAccountBalanceResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.PlayerAccountBalanceRequest,
 *   !proto.services.PlayerAccountBalanceResult>}
 */
const methodInfo_Sng_getPlayerAccountBalance = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.PlayerAccountBalanceResult,
  /**
   * @param {!proto.services.PlayerAccountBalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerAccountBalanceResult.deserializeBinary
);


/**
 * @param {!proto.services.PlayerAccountBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.PlayerAccountBalanceResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.PlayerAccountBalanceResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getPlayerAccountBalance =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getPlayerAccountBalance',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerAccountBalance,
      callback);
};


/**
 * @param {!proto.services.PlayerAccountBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.PlayerAccountBalanceResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getPlayerAccountBalance =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getPlayerAccountBalance',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerAccountBalance);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.NextTournamentRequest,
 *   !proto.services.NextTournamentResult>}
 */
const methodDescriptor_Sng_getNextTournament = new grpc.web.MethodDescriptor(
  '/services.Sng/getNextTournament',
  grpc.web.MethodType.UNARY,
  proto.services.NextTournamentRequest,
  proto.services.NextTournamentResult,
  /**
   * @param {!proto.services.NextTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.NextTournamentResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.NextTournamentRequest,
 *   !proto.services.NextTournamentResult>}
 */
const methodInfo_Sng_getNextTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.NextTournamentResult,
  /**
   * @param {!proto.services.NextTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.NextTournamentResult.deserializeBinary
);


/**
 * @param {!proto.services.NextTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.NextTournamentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.NextTournamentResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getNextTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getNextTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_getNextTournament,
      callback);
};


/**
 * @param {!proto.services.NextTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.NextTournamentResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getNextTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getNextTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_getNextTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.JoinAnyTournamentRequest,
 *   !proto.services.JoinAnyTournamentResult>}
 */
const methodDescriptor_Sng_joinAnyTournament = new grpc.web.MethodDescriptor(
  '/services.Sng/joinAnyTournament',
  grpc.web.MethodType.UNARY,
  proto.services.JoinAnyTournamentRequest,
  proto.services.JoinAnyTournamentResult,
  /**
   * @param {!proto.services.JoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.JoinAnyTournamentResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.JoinAnyTournamentRequest,
 *   !proto.services.JoinAnyTournamentResult>}
 */
const methodInfo_Sng_joinAnyTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.JoinAnyTournamentResult,
  /**
   * @param {!proto.services.JoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.JoinAnyTournamentResult.deserializeBinary
);


/**
 * @param {!proto.services.JoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.JoinAnyTournamentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.JoinAnyTournamentResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.joinAnyTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/joinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_joinAnyTournament,
      callback);
};


/**
 * @param {!proto.services.JoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.JoinAnyTournamentResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.joinAnyTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/joinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_joinAnyTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.UnregisterAnyTournamentRequest,
 *   !proto.services.UnregisterAnyTournamentResult>}
 */
const methodDescriptor_Sng_unregisterAnyTournament = new grpc.web.MethodDescriptor(
  '/services.Sng/unregisterAnyTournament',
  grpc.web.MethodType.UNARY,
  proto.services.UnregisterAnyTournamentRequest,
  proto.services.UnregisterAnyTournamentResult,
  /**
   * @param {!proto.services.UnregisterAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UnregisterAnyTournamentResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.UnregisterAnyTournamentRequest,
 *   !proto.services.UnregisterAnyTournamentResult>}
 */
const methodInfo_Sng_unregisterAnyTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.UnregisterAnyTournamentResult,
  /**
   * @param {!proto.services.UnregisterAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UnregisterAnyTournamentResult.deserializeBinary
);


/**
 * @param {!proto.services.UnregisterAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.UnregisterAnyTournamentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.UnregisterAnyTournamentResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.unregisterAnyTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/unregisterAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_unregisterAnyTournament,
      callback);
};


/**
 * @param {!proto.services.UnregisterAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.UnregisterAnyTournamentResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.unregisterAnyTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/unregisterAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_unregisterAnyTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.JoinAnyTournamentStatusRequest,
 *   !proto.services.JoinAnyTournamentStatusResult>}
 */
const methodDescriptor_Sng_getJoinAnyTournamentStatus = new grpc.web.MethodDescriptor(
  '/services.Sng/getJoinAnyTournamentStatus',
  grpc.web.MethodType.UNARY,
  proto.services.JoinAnyTournamentStatusRequest,
  proto.services.JoinAnyTournamentStatusResult,
  /**
   * @param {!proto.services.JoinAnyTournamentStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.JoinAnyTournamentStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.JoinAnyTournamentStatusRequest,
 *   !proto.services.JoinAnyTournamentStatusResult>}
 */
const methodInfo_Sng_getJoinAnyTournamentStatus = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.JoinAnyTournamentStatusResult,
  /**
   * @param {!proto.services.JoinAnyTournamentStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.JoinAnyTournamentStatusResult.deserializeBinary
);


/**
 * @param {!proto.services.JoinAnyTournamentStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.JoinAnyTournamentStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.JoinAnyTournamentStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getJoinAnyTournamentStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getJoinAnyTournamentStatus',
      request,
      metadata || {},
      methodDescriptor_Sng_getJoinAnyTournamentStatus,
      callback);
};


/**
 * @param {!proto.services.JoinAnyTournamentStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.JoinAnyTournamentStatusResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getJoinAnyTournamentStatus =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getJoinAnyTournamentStatus',
      request,
      metadata || {},
      methodDescriptor_Sng_getJoinAnyTournamentStatus);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ActiveJoinAnyTournamentsRequest,
 *   !proto.services.ActiveJoinAnyTournamentsResult>}
 */
const methodDescriptor_Sng_getActiveJoinAnyTournaments = new grpc.web.MethodDescriptor(
  '/services.Sng/getActiveJoinAnyTournaments',
  grpc.web.MethodType.UNARY,
  proto.services.ActiveJoinAnyTournamentsRequest,
  proto.services.ActiveJoinAnyTournamentsResult,
  /**
   * @param {!proto.services.ActiveJoinAnyTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ActiveJoinAnyTournamentsResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ActiveJoinAnyTournamentsRequest,
 *   !proto.services.ActiveJoinAnyTournamentsResult>}
 */
const methodInfo_Sng_getActiveJoinAnyTournaments = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ActiveJoinAnyTournamentsResult,
  /**
   * @param {!proto.services.ActiveJoinAnyTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ActiveJoinAnyTournamentsResult.deserializeBinary
);


/**
 * @param {!proto.services.ActiveJoinAnyTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ActiveJoinAnyTournamentsResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ActiveJoinAnyTournamentsResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getActiveJoinAnyTournaments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getActiveJoinAnyTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getActiveJoinAnyTournaments,
      callback);
};


/**
 * @param {!proto.services.ActiveJoinAnyTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ActiveJoinAnyTournamentsResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getActiveJoinAnyTournaments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getActiveJoinAnyTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getActiveJoinAnyTournaments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.JoinAnyUsersListRequest,
 *   !proto.services.JoinAnyUsersListResult>}
 */
const methodDescriptor_Sng_getJoinAnyUsersList = new grpc.web.MethodDescriptor(
  '/services.Sng/getJoinAnyUsersList',
  grpc.web.MethodType.UNARY,
  proto.services.JoinAnyUsersListRequest,
  proto.services.JoinAnyUsersListResult,
  /**
   * @param {!proto.services.JoinAnyUsersListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.JoinAnyUsersListResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.JoinAnyUsersListRequest,
 *   !proto.services.JoinAnyUsersListResult>}
 */
const methodInfo_Sng_getJoinAnyUsersList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.JoinAnyUsersListResult,
  /**
   * @param {!proto.services.JoinAnyUsersListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.JoinAnyUsersListResult.deserializeBinary
);


/**
 * @param {!proto.services.JoinAnyUsersListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.JoinAnyUsersListResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.JoinAnyUsersListResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getJoinAnyUsersList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getJoinAnyUsersList',
      request,
      metadata || {},
      methodDescriptor_Sng_getJoinAnyUsersList,
      callback);
};


/**
 * @param {!proto.services.JoinAnyUsersListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.JoinAnyUsersListResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getJoinAnyUsersList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getJoinAnyUsersList',
      request,
      metadata || {},
      methodDescriptor_Sng_getJoinAnyUsersList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.CancelJoinAnyTournamentRequest,
 *   !proto.services.CancelJoinAnyTournamentResult>}
 */
const methodDescriptor_Sng_cancelJoinAnyTournament = new grpc.web.MethodDescriptor(
  '/services.Sng/cancelJoinAnyTournament',
  grpc.web.MethodType.UNARY,
  proto.services.CancelJoinAnyTournamentRequest,
  proto.services.CancelJoinAnyTournamentResult,
  /**
   * @param {!proto.services.CancelJoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CancelJoinAnyTournamentResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.CancelJoinAnyTournamentRequest,
 *   !proto.services.CancelJoinAnyTournamentResult>}
 */
const methodInfo_Sng_cancelJoinAnyTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.CancelJoinAnyTournamentResult,
  /**
   * @param {!proto.services.CancelJoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CancelJoinAnyTournamentResult.deserializeBinary
);


/**
 * @param {!proto.services.CancelJoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.CancelJoinAnyTournamentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.CancelJoinAnyTournamentResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.cancelJoinAnyTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/cancelJoinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyTournament,
      callback);
};


/**
 * @param {!proto.services.CancelJoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.CancelJoinAnyTournamentResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.cancelJoinAnyTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/cancelJoinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.CancelJoinAnyUsersRequest,
 *   !proto.services.CancelJoinAnyUsersResult>}
 */
const methodDescriptor_Sng_cancelJoinAnyMultipleUsers = new grpc.web.MethodDescriptor(
  '/services.Sng/cancelJoinAnyMultipleUsers',
  grpc.web.MethodType.UNARY,
  proto.services.CancelJoinAnyUsersRequest,
  proto.services.CancelJoinAnyUsersResult,
  /**
   * @param {!proto.services.CancelJoinAnyUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CancelJoinAnyUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.CancelJoinAnyUsersRequest,
 *   !proto.services.CancelJoinAnyUsersResult>}
 */
const methodInfo_Sng_cancelJoinAnyMultipleUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.CancelJoinAnyUsersResult,
  /**
   * @param {!proto.services.CancelJoinAnyUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CancelJoinAnyUsersResult.deserializeBinary
);


/**
 * @param {!proto.services.CancelJoinAnyUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.CancelJoinAnyUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.CancelJoinAnyUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.cancelJoinAnyMultipleUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/cancelJoinAnyMultipleUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyMultipleUsers,
      callback);
};


/**
 * @param {!proto.services.CancelJoinAnyUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.CancelJoinAnyUsersResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.cancelJoinAnyMultipleUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/cancelJoinAnyMultipleUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyMultipleUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.JoinAnyTournamentStatusRequest,
 *   !proto.services.CancelJoinAnyUsersResult>}
 */
const methodDescriptor_Sng_cancelJoinAnyAllUsers = new grpc.web.MethodDescriptor(
  '/services.Sng/cancelJoinAnyAllUsers',
  grpc.web.MethodType.UNARY,
  proto.services.JoinAnyTournamentStatusRequest,
  proto.services.CancelJoinAnyUsersResult,
  /**
   * @param {!proto.services.JoinAnyTournamentStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CancelJoinAnyUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.JoinAnyTournamentStatusRequest,
 *   !proto.services.CancelJoinAnyUsersResult>}
 */
const methodInfo_Sng_cancelJoinAnyAllUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.CancelJoinAnyUsersResult,
  /**
   * @param {!proto.services.JoinAnyTournamentStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CancelJoinAnyUsersResult.deserializeBinary
);


/**
 * @param {!proto.services.JoinAnyTournamentStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.CancelJoinAnyUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.CancelJoinAnyUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.cancelJoinAnyAllUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/cancelJoinAnyAllUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyAllUsers,
      callback);
};


/**
 * @param {!proto.services.JoinAnyTournamentStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.CancelJoinAnyUsersResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.cancelJoinAnyAllUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/cancelJoinAnyAllUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyAllUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.CancelTournamentsRequest,
 *   !proto.services.CancelTournamentsResponse>}
 */
const methodDescriptor_Sng_cancelTournaments = new grpc.web.MethodDescriptor(
  '/services.Sng/cancelTournaments',
  grpc.web.MethodType.UNARY,
  proto.services.CancelTournamentsRequest,
  proto.services.CancelTournamentsResponse,
  /**
   * @param {!proto.services.CancelTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CancelTournamentsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.CancelTournamentsRequest,
 *   !proto.services.CancelTournamentsResponse>}
 */
const methodInfo_Sng_cancelTournaments = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.CancelTournamentsResponse,
  /**
   * @param {!proto.services.CancelTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CancelTournamentsResponse.deserializeBinary
);


/**
 * @param {!proto.services.CancelTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.CancelTournamentsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.CancelTournamentsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.cancelTournaments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/cancelTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelTournaments,
      callback);
};


/**
 * @param {!proto.services.CancelTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.CancelTournamentsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.cancelTournaments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/cancelTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelTournaments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AddonPlayerRequest,
 *   !proto.services.AddonPlayerResponse>}
 */
const methodDescriptor_Sng_addonPlayer = new grpc.web.MethodDescriptor(
  '/services.Sng/addonPlayer',
  grpc.web.MethodType.UNARY,
  proto.services.AddonPlayerRequest,
  proto.services.AddonPlayerResponse,
  /**
   * @param {!proto.services.AddonPlayerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AddonPlayerResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AddonPlayerRequest,
 *   !proto.services.AddonPlayerResponse>}
 */
const methodInfo_Sng_addonPlayer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.AddonPlayerResponse,
  /**
   * @param {!proto.services.AddonPlayerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AddonPlayerResponse.deserializeBinary
);


/**
 * @param {!proto.services.AddonPlayerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.AddonPlayerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.AddonPlayerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.addonPlayer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/addonPlayer',
      request,
      metadata || {},
      methodDescriptor_Sng_addonPlayer,
      callback);
};


/**
 * @param {!proto.services.AddonPlayerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.AddonPlayerResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.addonPlayer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/addonPlayer',
      request,
      metadata || {},
      methodDescriptor_Sng_addonPlayer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.PrizeRevealRequest,
 *   !proto.services.PrizeRevealResponse>}
 */
const methodDescriptor_Sng_setPrizeAsRevealed = new grpc.web.MethodDescriptor(
  '/services.Sng/setPrizeAsRevealed',
  grpc.web.MethodType.UNARY,
  proto.services.PrizeRevealRequest,
  proto.services.PrizeRevealResponse,
  /**
   * @param {!proto.services.PrizeRevealRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PrizeRevealResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.PrizeRevealRequest,
 *   !proto.services.PrizeRevealResponse>}
 */
const methodInfo_Sng_setPrizeAsRevealed = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.PrizeRevealResponse,
  /**
   * @param {!proto.services.PrizeRevealRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PrizeRevealResponse.deserializeBinary
);


/**
 * @param {!proto.services.PrizeRevealRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.PrizeRevealResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.PrizeRevealResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.setPrizeAsRevealed =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/setPrizeAsRevealed',
      request,
      metadata || {},
      methodDescriptor_Sng_setPrizeAsRevealed,
      callback);
};


/**
 * @param {!proto.services.PrizeRevealRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.PrizeRevealResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.setPrizeAsRevealed =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/setPrizeAsRevealed',
      request,
      metadata || {},
      methodDescriptor_Sng_setPrizeAsRevealed);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeofenceRequest,
 *   !proto.services.GeofenceResponse>}
 */
const methodDescriptor_Sng_getGeofenceData = new grpc.web.MethodDescriptor(
  '/services.Sng/getGeofenceData',
  grpc.web.MethodType.UNARY,
  proto.services.GeofenceRequest,
  proto.services.GeofenceResponse,
  /**
   * @param {!proto.services.GeofenceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeofenceRequest,
 *   !proto.services.GeofenceResponse>}
 */
const methodInfo_Sng_getGeofenceData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeofenceResponse,
  /**
   * @param {!proto.services.GeofenceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceResponse.deserializeBinary
);


/**
 * @param {!proto.services.GeofenceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeofenceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeofenceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getGeofenceData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_getGeofenceData,
      callback);
};


/**
 * @param {!proto.services.GeofenceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeofenceResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getGeofenceData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_getGeofenceData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeofenceAddRequest,
 *   !proto.services.GeofenceAddResponse>}
 */
const methodDescriptor_Sng_addGeofenceData = new grpc.web.MethodDescriptor(
  '/services.Sng/addGeofenceData',
  grpc.web.MethodType.UNARY,
  proto.services.GeofenceAddRequest,
  proto.services.GeofenceAddResponse,
  /**
   * @param {!proto.services.GeofenceAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceAddResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeofenceAddRequest,
 *   !proto.services.GeofenceAddResponse>}
 */
const methodInfo_Sng_addGeofenceData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeofenceAddResponse,
  /**
   * @param {!proto.services.GeofenceAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceAddResponse.deserializeBinary
);


/**
 * @param {!proto.services.GeofenceAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeofenceAddResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeofenceAddResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.addGeofenceData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/addGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_addGeofenceData,
      callback);
};


/**
 * @param {!proto.services.GeofenceAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeofenceAddResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.addGeofenceData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/addGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_addGeofenceData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeofenceUpdateRequest,
 *   !proto.services.GeofenceUpdateResponse>}
 */
const methodDescriptor_Sng_updateGeofenceData = new grpc.web.MethodDescriptor(
  '/services.Sng/updateGeofenceData',
  grpc.web.MethodType.UNARY,
  proto.services.GeofenceUpdateRequest,
  proto.services.GeofenceUpdateResponse,
  /**
   * @param {!proto.services.GeofenceUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceUpdateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeofenceUpdateRequest,
 *   !proto.services.GeofenceUpdateResponse>}
 */
const methodInfo_Sng_updateGeofenceData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeofenceUpdateResponse,
  /**
   * @param {!proto.services.GeofenceUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceUpdateResponse.deserializeBinary
);


/**
 * @param {!proto.services.GeofenceUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeofenceUpdateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeofenceUpdateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.updateGeofenceData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/updateGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateGeofenceData,
      callback);
};


/**
 * @param {!proto.services.GeofenceUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeofenceUpdateResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.updateGeofenceData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/updateGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateGeofenceData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeofenceRemoveRequest,
 *   !proto.services.GeofenceRemoveResponse>}
 */
const methodDescriptor_Sng_removeGeofenceData = new grpc.web.MethodDescriptor(
  '/services.Sng/removeGeofenceData',
  grpc.web.MethodType.UNARY,
  proto.services.GeofenceRemoveRequest,
  proto.services.GeofenceRemoveResponse,
  /**
   * @param {!proto.services.GeofenceRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceRemoveResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeofenceRemoveRequest,
 *   !proto.services.GeofenceRemoveResponse>}
 */
const methodInfo_Sng_removeGeofenceData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeofenceRemoveResponse,
  /**
   * @param {!proto.services.GeofenceRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceRemoveResponse.deserializeBinary
);


/**
 * @param {!proto.services.GeofenceRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeofenceRemoveResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeofenceRemoveResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.removeGeofenceData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/removeGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeGeofenceData,
      callback);
};


/**
 * @param {!proto.services.GeofenceRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeofenceRemoveResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.removeGeofenceData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/removeGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeGeofenceData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeofenceWhitelistRequest,
 *   !proto.services.GeofenceWhitelistResponse>}
 */
const methodDescriptor_Sng_whitelistUsersOnGeofence = new grpc.web.MethodDescriptor(
  '/services.Sng/whitelistUsersOnGeofence',
  grpc.web.MethodType.UNARY,
  proto.services.GeofenceWhitelistRequest,
  proto.services.GeofenceWhitelistResponse,
  /**
   * @param {!proto.services.GeofenceWhitelistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceWhitelistResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeofenceWhitelistRequest,
 *   !proto.services.GeofenceWhitelistResponse>}
 */
const methodInfo_Sng_whitelistUsersOnGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeofenceWhitelistResponse,
  /**
   * @param {!proto.services.GeofenceWhitelistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceWhitelistResponse.deserializeBinary
);


/**
 * @param {!proto.services.GeofenceWhitelistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeofenceWhitelistResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeofenceWhitelistResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.whitelistUsersOnGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/whitelistUsersOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistUsersOnGeofence,
      callback);
};


/**
 * @param {!proto.services.GeofenceWhitelistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeofenceWhitelistResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.whitelistUsersOnGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/whitelistUsersOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistUsersOnGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeofenceBlacklistRequest,
 *   !proto.services.GeofenceBlacklistResponse>}
 */
const methodDescriptor_Sng_blacklistUsersOnGeofence = new grpc.web.MethodDescriptor(
  '/services.Sng/blacklistUsersOnGeofence',
  grpc.web.MethodType.UNARY,
  proto.services.GeofenceBlacklistRequest,
  proto.services.GeofenceBlacklistResponse,
  /**
   * @param {!proto.services.GeofenceBlacklistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceBlacklistResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeofenceBlacklistRequest,
 *   !proto.services.GeofenceBlacklistResponse>}
 */
const methodInfo_Sng_blacklistUsersOnGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeofenceBlacklistResponse,
  /**
   * @param {!proto.services.GeofenceBlacklistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceBlacklistResponse.deserializeBinary
);


/**
 * @param {!proto.services.GeofenceBlacklistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeofenceBlacklistResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeofenceBlacklistResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.blacklistUsersOnGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/blacklistUsersOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_blacklistUsersOnGeofence,
      callback);
};


/**
 * @param {!proto.services.GeofenceBlacklistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeofenceBlacklistResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.blacklistUsersOnGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/blacklistUsersOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_blacklistUsersOnGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeofenceWhitelistRequest,
 *   !proto.services.GeofenceWhitelistResponse>}
 */
const methodDescriptor_Sng_whitelistClientsOnGeofence = new grpc.web.MethodDescriptor(
  '/services.Sng/whitelistClientsOnGeofence',
  grpc.web.MethodType.UNARY,
  proto.services.GeofenceWhitelistRequest,
  proto.services.GeofenceWhitelistResponse,
  /**
   * @param {!proto.services.GeofenceWhitelistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceWhitelistResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeofenceWhitelistRequest,
 *   !proto.services.GeofenceWhitelistResponse>}
 */
const methodInfo_Sng_whitelistClientsOnGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeofenceWhitelistResponse,
  /**
   * @param {!proto.services.GeofenceWhitelistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceWhitelistResponse.deserializeBinary
);


/**
 * @param {!proto.services.GeofenceWhitelistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeofenceWhitelistResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeofenceWhitelistResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.whitelistClientsOnGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/whitelistClientsOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistClientsOnGeofence,
      callback);
};


/**
 * @param {!proto.services.GeofenceWhitelistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeofenceWhitelistResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.whitelistClientsOnGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/whitelistClientsOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistClientsOnGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeofenceBlacklistRequest,
 *   !proto.services.GeofenceBlacklistResponse>}
 */
const methodDescriptor_Sng_blacklistClientsOnGeofence = new grpc.web.MethodDescriptor(
  '/services.Sng/blacklistClientsOnGeofence',
  grpc.web.MethodType.UNARY,
  proto.services.GeofenceBlacklistRequest,
  proto.services.GeofenceBlacklistResponse,
  /**
   * @param {!proto.services.GeofenceBlacklistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceBlacklistResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeofenceBlacklistRequest,
 *   !proto.services.GeofenceBlacklistResponse>}
 */
const methodInfo_Sng_blacklistClientsOnGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeofenceBlacklistResponse,
  /**
   * @param {!proto.services.GeofenceBlacklistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceBlacklistResponse.deserializeBinary
);


/**
 * @param {!proto.services.GeofenceBlacklistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeofenceBlacklistResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeofenceBlacklistResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.blacklistClientsOnGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/blacklistClientsOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_blacklistClientsOnGeofence,
      callback);
};


/**
 * @param {!proto.services.GeofenceBlacklistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeofenceBlacklistResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.blacklistClientsOnGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/blacklistClientsOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_blacklistClientsOnGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeofenceUsersRequest,
 *   !proto.services.GeofenceUsersResponse>}
 */
const methodDescriptor_Sng_getWhitelistedUsersonGeofence = new grpc.web.MethodDescriptor(
  '/services.Sng/getWhitelistedUsersonGeofence',
  grpc.web.MethodType.UNARY,
  proto.services.GeofenceUsersRequest,
  proto.services.GeofenceUsersResponse,
  /**
   * @param {!proto.services.GeofenceUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceUsersResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeofenceUsersRequest,
 *   !proto.services.GeofenceUsersResponse>}
 */
const methodInfo_Sng_getWhitelistedUsersonGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeofenceUsersResponse,
  /**
   * @param {!proto.services.GeofenceUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceUsersResponse.deserializeBinary
);


/**
 * @param {!proto.services.GeofenceUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeofenceUsersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeofenceUsersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getWhitelistedUsersonGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getWhitelistedUsersonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedUsersonGeofence,
      callback);
};


/**
 * @param {!proto.services.GeofenceUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeofenceUsersResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getWhitelistedUsersonGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getWhitelistedUsersonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedUsersonGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeofenceUsersRequest,
 *   !proto.services.GeofenceUsersResponse>}
 */
const methodDescriptor_Sng_getBlacklistedUsersonGeofence = new grpc.web.MethodDescriptor(
  '/services.Sng/getBlacklistedUsersonGeofence',
  grpc.web.MethodType.UNARY,
  proto.services.GeofenceUsersRequest,
  proto.services.GeofenceUsersResponse,
  /**
   * @param {!proto.services.GeofenceUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceUsersResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeofenceUsersRequest,
 *   !proto.services.GeofenceUsersResponse>}
 */
const methodInfo_Sng_getBlacklistedUsersonGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeofenceUsersResponse,
  /**
   * @param {!proto.services.GeofenceUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceUsersResponse.deserializeBinary
);


/**
 * @param {!proto.services.GeofenceUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeofenceUsersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeofenceUsersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getBlacklistedUsersonGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getBlacklistedUsersonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getBlacklistedUsersonGeofence,
      callback);
};


/**
 * @param {!proto.services.GeofenceUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeofenceUsersResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getBlacklistedUsersonGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getBlacklistedUsersonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getBlacklistedUsersonGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeofenceGlobalRuleRequest,
 *   !proto.services.GeofenceGlobalRuleResponse>}
 */
const methodDescriptor_Sng_setGeofenceGlobalRule = new grpc.web.MethodDescriptor(
  '/services.Sng/setGeofenceGlobalRule',
  grpc.web.MethodType.UNARY,
  proto.services.GeofenceGlobalRuleRequest,
  proto.services.GeofenceGlobalRuleResponse,
  /**
   * @param {!proto.services.GeofenceGlobalRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceGlobalRuleResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeofenceGlobalRuleRequest,
 *   !proto.services.GeofenceGlobalRuleResponse>}
 */
const methodInfo_Sng_setGeofenceGlobalRule = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeofenceGlobalRuleResponse,
  /**
   * @param {!proto.services.GeofenceGlobalRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceGlobalRuleResponse.deserializeBinary
);


/**
 * @param {!proto.services.GeofenceGlobalRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeofenceGlobalRuleResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeofenceGlobalRuleResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.setGeofenceGlobalRule =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/setGeofenceGlobalRule',
      request,
      metadata || {},
      methodDescriptor_Sng_setGeofenceGlobalRule,
      callback);
};


/**
 * @param {!proto.services.GeofenceGlobalRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeofenceGlobalRuleResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.setGeofenceGlobalRule =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/setGeofenceGlobalRule',
      request,
      metadata || {},
      methodDescriptor_Sng_setGeofenceGlobalRule);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeofenceClientsRequest,
 *   !proto.services.GeofenceClientsResponse>}
 */
const methodDescriptor_Sng_getWhitelistedClientsonGeofence = new grpc.web.MethodDescriptor(
  '/services.Sng/getWhitelistedClientsonGeofence',
  grpc.web.MethodType.UNARY,
  proto.services.GeofenceClientsRequest,
  proto.services.GeofenceClientsResponse,
  /**
   * @param {!proto.services.GeofenceClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceClientsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeofenceClientsRequest,
 *   !proto.services.GeofenceClientsResponse>}
 */
const methodInfo_Sng_getWhitelistedClientsonGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeofenceClientsResponse,
  /**
   * @param {!proto.services.GeofenceClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceClientsResponse.deserializeBinary
);


/**
 * @param {!proto.services.GeofenceClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeofenceClientsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeofenceClientsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getWhitelistedClientsonGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getWhitelistedClientsonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedClientsonGeofence,
      callback);
};


/**
 * @param {!proto.services.GeofenceClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeofenceClientsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getWhitelistedClientsonGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getWhitelistedClientsonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedClientsonGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeofenceClientsRequest,
 *   !proto.services.GeofenceClientsResponse>}
 */
const methodDescriptor_Sng_getBlacklistedClientsonGeofence = new grpc.web.MethodDescriptor(
  '/services.Sng/getBlacklistedClientsonGeofence',
  grpc.web.MethodType.UNARY,
  proto.services.GeofenceClientsRequest,
  proto.services.GeofenceClientsResponse,
  /**
   * @param {!proto.services.GeofenceClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceClientsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeofenceClientsRequest,
 *   !proto.services.GeofenceClientsResponse>}
 */
const methodInfo_Sng_getBlacklistedClientsonGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeofenceClientsResponse,
  /**
   * @param {!proto.services.GeofenceClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceClientsResponse.deserializeBinary
);


/**
 * @param {!proto.services.GeofenceClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeofenceClientsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeofenceClientsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getBlacklistedClientsonGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getBlacklistedClientsonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getBlacklistedClientsonGeofence,
      callback);
};


/**
 * @param {!proto.services.GeofenceClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeofenceClientsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getBlacklistedClientsonGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getBlacklistedClientsonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getBlacklistedClientsonGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeofenceClientGlobalRuleRequest,
 *   !proto.services.GeofenceClientGlobalRuleResponse>}
 */
const methodDescriptor_Sng_setGeofenceClientGlobalRule = new grpc.web.MethodDescriptor(
  '/services.Sng/setGeofenceClientGlobalRule',
  grpc.web.MethodType.UNARY,
  proto.services.GeofenceClientGlobalRuleRequest,
  proto.services.GeofenceClientGlobalRuleResponse,
  /**
   * @param {!proto.services.GeofenceClientGlobalRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceClientGlobalRuleResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeofenceClientGlobalRuleRequest,
 *   !proto.services.GeofenceClientGlobalRuleResponse>}
 */
const methodInfo_Sng_setGeofenceClientGlobalRule = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeofenceClientGlobalRuleResponse,
  /**
   * @param {!proto.services.GeofenceClientGlobalRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeofenceClientGlobalRuleResponse.deserializeBinary
);


/**
 * @param {!proto.services.GeofenceClientGlobalRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeofenceClientGlobalRuleResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeofenceClientGlobalRuleResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.setGeofenceClientGlobalRule =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/setGeofenceClientGlobalRule',
      request,
      metadata || {},
      methodDescriptor_Sng_setGeofenceClientGlobalRule,
      callback);
};


/**
 * @param {!proto.services.GeofenceClientGlobalRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeofenceClientGlobalRuleResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.setGeofenceClientGlobalRule =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/setGeofenceClientGlobalRule',
      request,
      metadata || {},
      methodDescriptor_Sng_setGeofenceClientGlobalRule);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.WhitelistedClientsRequest,
 *   !proto.services.WhitelistedClientsResult>}
 */
const methodDescriptor_Sng_getClients = new grpc.web.MethodDescriptor(
  '/services.Sng/getClients',
  grpc.web.MethodType.UNARY,
  proto.services.WhitelistedClientsRequest,
  proto.services.WhitelistedClientsResult,
  /**
   * @param {!proto.services.WhitelistedClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.WhitelistedClientsResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.WhitelistedClientsRequest,
 *   !proto.services.WhitelistedClientsResult>}
 */
const methodInfo_Sng_getClients = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.WhitelistedClientsResult,
  /**
   * @param {!proto.services.WhitelistedClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.WhitelistedClientsResult.deserializeBinary
);


/**
 * @param {!proto.services.WhitelistedClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.WhitelistedClientsResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.WhitelistedClientsResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getClients =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getClients',
      request,
      metadata || {},
      methodDescriptor_Sng_getClients,
      callback);
};


/**
 * @param {!proto.services.WhitelistedClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.WhitelistedClientsResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getClients =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getClients',
      request,
      metadata || {},
      methodDescriptor_Sng_getClients);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.UpdateAccountBalanceRequest,
 *   !proto.services.UpdateAccountBalanceResponse>}
 */
const methodDescriptor_Sng_updatePlayerAccountBalance = new grpc.web.MethodDescriptor(
  '/services.Sng/updatePlayerAccountBalance',
  grpc.web.MethodType.UNARY,
  proto.services.UpdateAccountBalanceRequest,
  proto.services.UpdateAccountBalanceResponse,
  /**
   * @param {!proto.services.UpdateAccountBalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UpdateAccountBalanceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.UpdateAccountBalanceRequest,
 *   !proto.services.UpdateAccountBalanceResponse>}
 */
const methodInfo_Sng_updatePlayerAccountBalance = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.UpdateAccountBalanceResponse,
  /**
   * @param {!proto.services.UpdateAccountBalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UpdateAccountBalanceResponse.deserializeBinary
);


/**
 * @param {!proto.services.UpdateAccountBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.UpdateAccountBalanceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.UpdateAccountBalanceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.updatePlayerAccountBalance =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/updatePlayerAccountBalance',
      request,
      metadata || {},
      methodDescriptor_Sng_updatePlayerAccountBalance,
      callback);
};


/**
 * @param {!proto.services.UpdateAccountBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.UpdateAccountBalanceResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.updatePlayerAccountBalance =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/updatePlayerAccountBalance',
      request,
      metadata || {},
      methodDescriptor_Sng_updatePlayerAccountBalance);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.RankHandsRequest,
 *   !proto.services.RankHandsResult>}
 */
const methodDescriptor_Sng_rankHands = new grpc.web.MethodDescriptor(
  '/services.Sng/rankHands',
  grpc.web.MethodType.UNARY,
  proto.services.RankHandsRequest,
  proto.services.RankHandsResult,
  /**
   * @param {!proto.services.RankHandsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.RankHandsResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.RankHandsRequest,
 *   !proto.services.RankHandsResult>}
 */
const methodInfo_Sng_rankHands = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.RankHandsResult,
  /**
   * @param {!proto.services.RankHandsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.RankHandsResult.deserializeBinary
);


/**
 * @param {!proto.services.RankHandsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.RankHandsResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.RankHandsResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.rankHands =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/rankHands',
      request,
      metadata || {},
      methodDescriptor_Sng_rankHands,
      callback);
};


/**
 * @param {!proto.services.RankHandsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.RankHandsResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.rankHands =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/rankHands',
      request,
      metadata || {},
      methodDescriptor_Sng_rankHands);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.NewDeckRequest,
 *   !proto.services.NewDeckResponse>}
 */
const methodDescriptor_Sng_getShuffledDeck = new grpc.web.MethodDescriptor(
  '/services.Sng/getShuffledDeck',
  grpc.web.MethodType.UNARY,
  proto.services.NewDeckRequest,
  proto.services.NewDeckResponse,
  /**
   * @param {!proto.services.NewDeckRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.NewDeckResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.NewDeckRequest,
 *   !proto.services.NewDeckResponse>}
 */
const methodInfo_Sng_getShuffledDeck = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.NewDeckResponse,
  /**
   * @param {!proto.services.NewDeckRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.NewDeckResponse.deserializeBinary
);


/**
 * @param {!proto.services.NewDeckRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.NewDeckResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.NewDeckResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getShuffledDeck =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getShuffledDeck',
      request,
      metadata || {},
      methodDescriptor_Sng_getShuffledDeck,
      callback);
};


/**
 * @param {!proto.services.NewDeckRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.NewDeckResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getShuffledDeck =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getShuffledDeck',
      request,
      metadata || {},
      methodDescriptor_Sng_getShuffledDeck);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetUserInfoRequest,
 *   !proto.services.GetUserInfoResponse>}
 */
const methodDescriptor_Sng_getUserInfo = new grpc.web.MethodDescriptor(
  '/services.Sng/getUserInfo',
  grpc.web.MethodType.UNARY,
  proto.services.GetUserInfoRequest,
  proto.services.GetUserInfoResponse,
  /**
   * @param {!proto.services.GetUserInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetUserInfoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetUserInfoRequest,
 *   !proto.services.GetUserInfoResponse>}
 */
const methodInfo_Sng_getUserInfo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetUserInfoResponse,
  /**
   * @param {!proto.services.GetUserInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetUserInfoResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetUserInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetUserInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetUserInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getUserInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getUserInfo',
      request,
      metadata || {},
      methodDescriptor_Sng_getUserInfo,
      callback);
};


/**
 * @param {!proto.services.GetUserInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetUserInfoResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getUserInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getUserInfo',
      request,
      metadata || {},
      methodDescriptor_Sng_getUserInfo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.UpdateUserInfoRequest,
 *   !proto.services.UpdateUserInfoResponse>}
 */
const methodDescriptor_Sng_updateUserInfo = new grpc.web.MethodDescriptor(
  '/services.Sng/updateUserInfo',
  grpc.web.MethodType.UNARY,
  proto.services.UpdateUserInfoRequest,
  proto.services.UpdateUserInfoResponse,
  /**
   * @param {!proto.services.UpdateUserInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UpdateUserInfoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.UpdateUserInfoRequest,
 *   !proto.services.UpdateUserInfoResponse>}
 */
const methodInfo_Sng_updateUserInfo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.UpdateUserInfoResponse,
  /**
   * @param {!proto.services.UpdateUserInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UpdateUserInfoResponse.deserializeBinary
);


/**
 * @param {!proto.services.UpdateUserInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.UpdateUserInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.UpdateUserInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.updateUserInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/updateUserInfo',
      request,
      metadata || {},
      methodDescriptor_Sng_updateUserInfo,
      callback);
};


/**
 * @param {!proto.services.UpdateUserInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.UpdateUserInfoResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.updateUserInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/updateUserInfo',
      request,
      metadata || {},
      methodDescriptor_Sng_updateUserInfo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GlobalSettingsRequest,
 *   !proto.services.GlobalSettingsResponse>}
 */
const methodDescriptor_Sng_getGlobalSettings = new grpc.web.MethodDescriptor(
  '/services.Sng/getGlobalSettings',
  grpc.web.MethodType.UNARY,
  proto.services.GlobalSettingsRequest,
  proto.services.GlobalSettingsResponse,
  /**
   * @param {!proto.services.GlobalSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GlobalSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GlobalSettingsRequest,
 *   !proto.services.GlobalSettingsResponse>}
 */
const methodInfo_Sng_getGlobalSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GlobalSettingsResponse,
  /**
   * @param {!proto.services.GlobalSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GlobalSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.services.GlobalSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GlobalSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GlobalSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getGlobalSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getGlobalSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getGlobalSettings,
      callback);
};


/**
 * @param {!proto.services.GlobalSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GlobalSettingsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getGlobalSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getGlobalSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getGlobalSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GlobalSettingsRequest,
 *   !proto.services.GlobalSettingsResponse>}
 */
const methodDescriptor_Sng_setGlobalSettings = new grpc.web.MethodDescriptor(
  '/services.Sng/setGlobalSettings',
  grpc.web.MethodType.UNARY,
  proto.services.GlobalSettingsRequest,
  proto.services.GlobalSettingsResponse,
  /**
   * @param {!proto.services.GlobalSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GlobalSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GlobalSettingsRequest,
 *   !proto.services.GlobalSettingsResponse>}
 */
const methodInfo_Sng_setGlobalSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GlobalSettingsResponse,
  /**
   * @param {!proto.services.GlobalSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GlobalSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.services.GlobalSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GlobalSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GlobalSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.setGlobalSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/setGlobalSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_setGlobalSettings,
      callback);
};


/**
 * @param {!proto.services.GlobalSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GlobalSettingsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.setGlobalSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/setGlobalSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_setGlobalSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetPasswordResetLinkRequest,
 *   !proto.services.GetPasswordResetLinkResponse>}
 */
const methodDescriptor_Sng_getPasswordResetLink = new grpc.web.MethodDescriptor(
  '/services.Sng/getPasswordResetLink',
  grpc.web.MethodType.UNARY,
  proto.services.GetPasswordResetLinkRequest,
  proto.services.GetPasswordResetLinkResponse,
  /**
   * @param {!proto.services.GetPasswordResetLinkRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetPasswordResetLinkResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetPasswordResetLinkRequest,
 *   !proto.services.GetPasswordResetLinkResponse>}
 */
const methodInfo_Sng_getPasswordResetLink = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetPasswordResetLinkResponse,
  /**
   * @param {!proto.services.GetPasswordResetLinkRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetPasswordResetLinkResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetPasswordResetLinkRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetPasswordResetLinkResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetPasswordResetLinkResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getPasswordResetLink =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getPasswordResetLink',
      request,
      metadata || {},
      methodDescriptor_Sng_getPasswordResetLink,
      callback);
};


/**
 * @param {!proto.services.GetPasswordResetLinkRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetPasswordResetLinkResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getPasswordResetLink =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getPasswordResetLink',
      request,
      metadata || {},
      methodDescriptor_Sng_getPasswordResetLink);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.FetchSecurityQuestionsRequest,
 *   !proto.services.FetchSecurityQuestionsResponse>}
 */
const methodDescriptor_Sng_fetchSecurityQuestions = new grpc.web.MethodDescriptor(
  '/services.Sng/fetchSecurityQuestions',
  grpc.web.MethodType.UNARY,
  proto.services.FetchSecurityQuestionsRequest,
  proto.services.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.services.FetchSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.FetchSecurityQuestionsRequest,
 *   !proto.services.FetchSecurityQuestionsResponse>}
 */
const methodInfo_Sng_fetchSecurityQuestions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.services.FetchSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.services.FetchSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.FetchSecurityQuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.FetchSecurityQuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.fetchSecurityQuestions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/fetchSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_fetchSecurityQuestions,
      callback);
};


/**
 * @param {!proto.services.FetchSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.FetchSecurityQuestionsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.fetchSecurityQuestions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/fetchSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_fetchSecurityQuestions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ResetPasswordRequest,
 *   !proto.services.ResetPasswordResponse>}
 */
const methodDescriptor_Sng_resetPassword = new grpc.web.MethodDescriptor(
  '/services.Sng/resetPassword',
  grpc.web.MethodType.UNARY,
  proto.services.ResetPasswordRequest,
  proto.services.ResetPasswordResponse,
  /**
   * @param {!proto.services.ResetPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ResetPasswordResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ResetPasswordRequest,
 *   !proto.services.ResetPasswordResponse>}
 */
const methodInfo_Sng_resetPassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ResetPasswordResponse,
  /**
   * @param {!proto.services.ResetPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ResetPasswordResponse.deserializeBinary
);


/**
 * @param {!proto.services.ResetPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ResetPasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ResetPasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.resetPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/resetPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_resetPassword,
      callback);
};


/**
 * @param {!proto.services.ResetPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ResetPasswordResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.resetPassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/resetPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_resetPassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.VerifyUserPasswordRequest,
 *   !proto.services.VerifyUserPasswordResponse>}
 */
const methodDescriptor_Sng_verifyUserPassword = new grpc.web.MethodDescriptor(
  '/services.Sng/verifyUserPassword',
  grpc.web.MethodType.UNARY,
  proto.services.VerifyUserPasswordRequest,
  proto.services.VerifyUserPasswordResponse,
  /**
   * @param {!proto.services.VerifyUserPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.VerifyUserPasswordResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.VerifyUserPasswordRequest,
 *   !proto.services.VerifyUserPasswordResponse>}
 */
const methodInfo_Sng_verifyUserPassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.VerifyUserPasswordResponse,
  /**
   * @param {!proto.services.VerifyUserPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.VerifyUserPasswordResponse.deserializeBinary
);


/**
 * @param {!proto.services.VerifyUserPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.VerifyUserPasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.VerifyUserPasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.verifyUserPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/verifyUserPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_verifyUserPassword,
      callback);
};


/**
 * @param {!proto.services.VerifyUserPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.VerifyUserPasswordResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.verifyUserPassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/verifyUserPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_verifyUserPassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.LoginRequest,
 *   !proto.services.LoginResult>}
 */
const methodDescriptor_Sng_adminLogin = new grpc.web.MethodDescriptor(
  '/services.Sng/adminLogin',
  grpc.web.MethodType.UNARY,
  proto.services.LoginRequest,
  proto.services.LoginResult,
  /**
   * @param {!proto.services.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.LoginResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.LoginRequest,
 *   !proto.services.LoginResult>}
 */
const methodInfo_Sng_adminLogin = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.LoginResult,
  /**
   * @param {!proto.services.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.LoginResult.deserializeBinary
);


/**
 * @param {!proto.services.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.LoginResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.LoginResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.adminLogin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/adminLogin',
      request,
      metadata || {},
      methodDescriptor_Sng_adminLogin,
      callback);
};


/**
 * @param {!proto.services.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.LoginResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.adminLogin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/adminLogin',
      request,
      metadata || {},
      methodDescriptor_Sng_adminLogin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ValidateSecurityQuestionsRequest,
 *   !proto.services.ValidateSecurityQuestionsResponse>}
 */
const methodDescriptor_Sng_validateSecurityQuestionsForLogin = new grpc.web.MethodDescriptor(
  '/services.Sng/validateSecurityQuestionsForLogin',
  grpc.web.MethodType.UNARY,
  proto.services.ValidateSecurityQuestionsRequest,
  proto.services.ValidateSecurityQuestionsResponse,
  /**
   * @param {!proto.services.ValidateSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ValidateSecurityQuestionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ValidateSecurityQuestionsRequest,
 *   !proto.services.ValidateSecurityQuestionsResponse>}
 */
const methodInfo_Sng_validateSecurityQuestionsForLogin = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ValidateSecurityQuestionsResponse,
  /**
   * @param {!proto.services.ValidateSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ValidateSecurityQuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.services.ValidateSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ValidateSecurityQuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ValidateSecurityQuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.validateSecurityQuestionsForLogin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/validateSecurityQuestionsForLogin',
      request,
      metadata || {},
      methodDescriptor_Sng_validateSecurityQuestionsForLogin,
      callback);
};


/**
 * @param {!proto.services.ValidateSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ValidateSecurityQuestionsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.validateSecurityQuestionsForLogin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/validateSecurityQuestionsForLogin',
      request,
      metadata || {},
      methodDescriptor_Sng_validateSecurityQuestionsForLogin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.IsEmailAvailableRequest,
 *   !proto.services.IsEmailAvailableResponse>}
 */
const methodDescriptor_Sng_checkIsEmailAvailable = new grpc.web.MethodDescriptor(
  '/services.Sng/checkIsEmailAvailable',
  grpc.web.MethodType.UNARY,
  proto.services.IsEmailAvailableRequest,
  proto.services.IsEmailAvailableResponse,
  /**
   * @param {!proto.services.IsEmailAvailableRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.IsEmailAvailableResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.IsEmailAvailableRequest,
 *   !proto.services.IsEmailAvailableResponse>}
 */
const methodInfo_Sng_checkIsEmailAvailable = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.IsEmailAvailableResponse,
  /**
   * @param {!proto.services.IsEmailAvailableRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.IsEmailAvailableResponse.deserializeBinary
);


/**
 * @param {!proto.services.IsEmailAvailableRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.IsEmailAvailableResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.IsEmailAvailableResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.checkIsEmailAvailable =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/checkIsEmailAvailable',
      request,
      metadata || {},
      methodDescriptor_Sng_checkIsEmailAvailable,
      callback);
};


/**
 * @param {!proto.services.IsEmailAvailableRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.IsEmailAvailableResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.checkIsEmailAvailable =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/checkIsEmailAvailable',
      request,
      metadata || {},
      methodDescriptor_Sng_checkIsEmailAvailable);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.StartTournamentTableInstanceRequest,
 *   !proto.services.StartTournamentTableInstanceResponse>}
 */
const methodDescriptor_Sng_startTournamentTableInstance = new grpc.web.MethodDescriptor(
  '/services.Sng/startTournamentTableInstance',
  grpc.web.MethodType.UNARY,
  proto.services.StartTournamentTableInstanceRequest,
  proto.services.StartTournamentTableInstanceResponse,
  /**
   * @param {!proto.services.StartTournamentTableInstanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StartTournamentTableInstanceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.StartTournamentTableInstanceRequest,
 *   !proto.services.StartTournamentTableInstanceResponse>}
 */
const methodInfo_Sng_startTournamentTableInstance = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.StartTournamentTableInstanceResponse,
  /**
   * @param {!proto.services.StartTournamentTableInstanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StartTournamentTableInstanceResponse.deserializeBinary
);


/**
 * @param {!proto.services.StartTournamentTableInstanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.StartTournamentTableInstanceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.StartTournamentTableInstanceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.startTournamentTableInstance =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/startTournamentTableInstance',
      request,
      metadata || {},
      methodDescriptor_Sng_startTournamentTableInstance,
      callback);
};


/**
 * @param {!proto.services.StartTournamentTableInstanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.StartTournamentTableInstanceResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.startTournamentTableInstance =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/startTournamentTableInstance',
      request,
      metadata || {},
      methodDescriptor_Sng_startTournamentTableInstance);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.TournamentDetailsRequest,
 *   !proto.services.TournamentPayoutStructureResponse>}
 */
const methodDescriptor_Sng_tournamentPayoutStructure = new grpc.web.MethodDescriptor(
  '/services.Sng/tournamentPayoutStructure',
  grpc.web.MethodType.UNARY,
  proto.services.TournamentDetailsRequest,
  proto.services.TournamentPayoutStructureResponse,
  /**
   * @param {!proto.services.TournamentDetailsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.TournamentPayoutStructureResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.TournamentDetailsRequest,
 *   !proto.services.TournamentPayoutStructureResponse>}
 */
const methodInfo_Sng_tournamentPayoutStructure = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.TournamentPayoutStructureResponse,
  /**
   * @param {!proto.services.TournamentDetailsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.TournamentPayoutStructureResponse.deserializeBinary
);


/**
 * @param {!proto.services.TournamentDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.TournamentPayoutStructureResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.TournamentPayoutStructureResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.tournamentPayoutStructure =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/tournamentPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_tournamentPayoutStructure,
      callback);
};


/**
 * @param {!proto.services.TournamentDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.TournamentPayoutStructureResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.tournamentPayoutStructure =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/tournamentPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_tournamentPayoutStructure);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ActiveUsersRequest,
 *   !proto.services.ActiveUsersResult>}
 */
const methodDescriptor_Sng_getActiveUsers = new grpc.web.MethodDescriptor(
  '/services.Sng/getActiveUsers',
  grpc.web.MethodType.UNARY,
  proto.services.ActiveUsersRequest,
  proto.services.ActiveUsersResult,
  /**
   * @param {!proto.services.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ActiveUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ActiveUsersRequest,
 *   !proto.services.ActiveUsersResult>}
 */
const methodInfo_Sng_getActiveUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ActiveUsersResult,
  /**
   * @param {!proto.services.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ActiveUsersResult.deserializeBinary
);


/**
 * @param {!proto.services.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ActiveUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ActiveUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getActiveUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getActiveUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_getActiveUsers,
      callback);
};


/**
 * @param {!proto.services.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ActiveUsersResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getActiveUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getActiveUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_getActiveUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ClientRequest,
 *   !proto.services.ClientResponse>}
 */
const methodDescriptor_Sng_getClientData = new grpc.web.MethodDescriptor(
  '/services.Sng/getClientData',
  grpc.web.MethodType.UNARY,
  proto.services.ClientRequest,
  proto.services.ClientResponse,
  /**
   * @param {!proto.services.ClientRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ClientResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ClientRequest,
 *   !proto.services.ClientResponse>}
 */
const methodInfo_Sng_getClientData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ClientResponse,
  /**
   * @param {!proto.services.ClientRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ClientResponse.deserializeBinary
);


/**
 * @param {!proto.services.ClientRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ClientResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ClientResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getClientData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_getClientData,
      callback);
};


/**
 * @param {!proto.services.ClientRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ClientResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getClientData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_getClientData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ClientAddRequest,
 *   !proto.services.ClientAddResponse>}
 */
const methodDescriptor_Sng_addClientData = new grpc.web.MethodDescriptor(
  '/services.Sng/addClientData',
  grpc.web.MethodType.UNARY,
  proto.services.ClientAddRequest,
  proto.services.ClientAddResponse,
  /**
   * @param {!proto.services.ClientAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ClientAddResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ClientAddRequest,
 *   !proto.services.ClientAddResponse>}
 */
const methodInfo_Sng_addClientData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ClientAddResponse,
  /**
   * @param {!proto.services.ClientAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ClientAddResponse.deserializeBinary
);


/**
 * @param {!proto.services.ClientAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ClientAddResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ClientAddResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.addClientData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/addClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_addClientData,
      callback);
};


/**
 * @param {!proto.services.ClientAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ClientAddResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.addClientData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/addClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_addClientData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ClientUpdateRequest,
 *   !proto.services.ClientUpdateResponse>}
 */
const methodDescriptor_Sng_updateClientData = new grpc.web.MethodDescriptor(
  '/services.Sng/updateClientData',
  grpc.web.MethodType.UNARY,
  proto.services.ClientUpdateRequest,
  proto.services.ClientUpdateResponse,
  /**
   * @param {!proto.services.ClientUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ClientUpdateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ClientUpdateRequest,
 *   !proto.services.ClientUpdateResponse>}
 */
const methodInfo_Sng_updateClientData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ClientUpdateResponse,
  /**
   * @param {!proto.services.ClientUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ClientUpdateResponse.deserializeBinary
);


/**
 * @param {!proto.services.ClientUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ClientUpdateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ClientUpdateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.updateClientData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/updateClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateClientData,
      callback);
};


/**
 * @param {!proto.services.ClientUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ClientUpdateResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.updateClientData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/updateClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateClientData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ClientRemoveRequest,
 *   !proto.services.ClientRemoveResponse>}
 */
const methodDescriptor_Sng_removeClientData = new grpc.web.MethodDescriptor(
  '/services.Sng/removeClientData',
  grpc.web.MethodType.UNARY,
  proto.services.ClientRemoveRequest,
  proto.services.ClientRemoveResponse,
  /**
   * @param {!proto.services.ClientRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ClientRemoveResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ClientRemoveRequest,
 *   !proto.services.ClientRemoveResponse>}
 */
const methodInfo_Sng_removeClientData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ClientRemoveResponse,
  /**
   * @param {!proto.services.ClientRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ClientRemoveResponse.deserializeBinary
);


/**
 * @param {!proto.services.ClientRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ClientRemoveResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ClientRemoveResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.removeClientData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/removeClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeClientData,
      callback);
};


/**
 * @param {!proto.services.ClientRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ClientRemoveResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.removeClientData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/removeClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeClientData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ComponentPermissionRequest,
 *   !proto.services.DataResponse>}
 */
const methodDescriptor_Sng_getComponentPermissionData = new grpc.web.MethodDescriptor(
  '/services.Sng/getComponentPermissionData',
  grpc.web.MethodType.UNARY,
  proto.services.ComponentPermissionRequest,
  proto.services.DataResponse,
  /**
   * @param {!proto.services.ComponentPermissionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ComponentPermissionRequest,
 *   !proto.services.DataResponse>}
 */
const methodInfo_Sng_getComponentPermissionData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.DataResponse,
  /**
   * @param {!proto.services.ComponentPermissionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DataResponse.deserializeBinary
);


/**
 * @param {!proto.services.ComponentPermissionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getComponentPermissionData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_getComponentPermissionData,
      callback);
};


/**
 * @param {!proto.services.ComponentPermissionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.DataResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getComponentPermissionData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_getComponentPermissionData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ComponentPermissionAddRequest,
 *   !proto.services.StatusResponse>}
 */
const methodDescriptor_Sng_addComponentPermissionData = new grpc.web.MethodDescriptor(
  '/services.Sng/addComponentPermissionData',
  grpc.web.MethodType.UNARY,
  proto.services.ComponentPermissionAddRequest,
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.ComponentPermissionAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ComponentPermissionAddRequest,
 *   !proto.services.StatusResponse>}
 */
const methodInfo_Sng_addComponentPermissionData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.ComponentPermissionAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.ComponentPermissionAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.addComponentPermissionData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/addComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_addComponentPermissionData,
      callback);
};


/**
 * @param {!proto.services.ComponentPermissionAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.StatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.addComponentPermissionData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/addComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_addComponentPermissionData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ComponentPermissionUpdateRequest,
 *   !proto.services.StatusResponse>}
 */
const methodDescriptor_Sng_updateComponentPermissionData = new grpc.web.MethodDescriptor(
  '/services.Sng/updateComponentPermissionData',
  grpc.web.MethodType.UNARY,
  proto.services.ComponentPermissionUpdateRequest,
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.ComponentPermissionUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ComponentPermissionUpdateRequest,
 *   !proto.services.StatusResponse>}
 */
const methodInfo_Sng_updateComponentPermissionData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.ComponentPermissionUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.ComponentPermissionUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.updateComponentPermissionData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/updateComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateComponentPermissionData,
      callback);
};


/**
 * @param {!proto.services.ComponentPermissionUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.StatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.updateComponentPermissionData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/updateComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateComponentPermissionData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ComponentPermissionRemoveRequest,
 *   !proto.services.StatusResponse>}
 */
const methodDescriptor_Sng_removeComponentPermissionData = new grpc.web.MethodDescriptor(
  '/services.Sng/removeComponentPermissionData',
  grpc.web.MethodType.UNARY,
  proto.services.ComponentPermissionRemoveRequest,
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.ComponentPermissionRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ComponentPermissionRemoveRequest,
 *   !proto.services.StatusResponse>}
 */
const methodInfo_Sng_removeComponentPermissionData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.ComponentPermissionRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.ComponentPermissionRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.removeComponentPermissionData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/removeComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeComponentPermissionData,
      callback);
};


/**
 * @param {!proto.services.ComponentPermissionRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.StatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.removeComponentPermissionData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/removeComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeComponentPermissionData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AdminRoleRequest,
 *   !proto.services.DataResponse>}
 */
const methodDescriptor_Sng_getAdminRoleData = new grpc.web.MethodDescriptor(
  '/services.Sng/getAdminRoleData',
  grpc.web.MethodType.UNARY,
  proto.services.AdminRoleRequest,
  proto.services.DataResponse,
  /**
   * @param {!proto.services.AdminRoleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AdminRoleRequest,
 *   !proto.services.DataResponse>}
 */
const methodInfo_Sng_getAdminRoleData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.DataResponse,
  /**
   * @param {!proto.services.AdminRoleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DataResponse.deserializeBinary
);


/**
 * @param {!proto.services.AdminRoleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getAdminRoleData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdminRoleData,
      callback);
};


/**
 * @param {!proto.services.AdminRoleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.DataResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getAdminRoleData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdminRoleData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AdminRoleAddRequest,
 *   !proto.services.StatusResponse>}
 */
const methodDescriptor_Sng_addAdminRoleData = new grpc.web.MethodDescriptor(
  '/services.Sng/addAdminRoleData',
  grpc.web.MethodType.UNARY,
  proto.services.AdminRoleAddRequest,
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.AdminRoleAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AdminRoleAddRequest,
 *   !proto.services.StatusResponse>}
 */
const methodInfo_Sng_addAdminRoleData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.AdminRoleAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.AdminRoleAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.addAdminRoleData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/addAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_addAdminRoleData,
      callback);
};


/**
 * @param {!proto.services.AdminRoleAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.StatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.addAdminRoleData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/addAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_addAdminRoleData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AdminRoleUpdateRequest,
 *   !proto.services.StatusResponse>}
 */
const methodDescriptor_Sng_updateAdminRoleData = new grpc.web.MethodDescriptor(
  '/services.Sng/updateAdminRoleData',
  grpc.web.MethodType.UNARY,
  proto.services.AdminRoleUpdateRequest,
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.AdminRoleUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AdminRoleUpdateRequest,
 *   !proto.services.StatusResponse>}
 */
const methodInfo_Sng_updateAdminRoleData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.AdminRoleUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.AdminRoleUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.updateAdminRoleData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/updateAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateAdminRoleData,
      callback);
};


/**
 * @param {!proto.services.AdminRoleUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.StatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.updateAdminRoleData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/updateAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateAdminRoleData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AdminRoleRemoveRequest,
 *   !proto.services.StatusResponse>}
 */
const methodDescriptor_Sng_removeAdminRoleData = new grpc.web.MethodDescriptor(
  '/services.Sng/removeAdminRoleData',
  grpc.web.MethodType.UNARY,
  proto.services.AdminRoleRemoveRequest,
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.AdminRoleRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AdminRoleRemoveRequest,
 *   !proto.services.StatusResponse>}
 */
const methodInfo_Sng_removeAdminRoleData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.AdminRoleRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.AdminRoleRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.removeAdminRoleData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/removeAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeAdminRoleData,
      callback);
};


/**
 * @param {!proto.services.AdminRoleRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.StatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.removeAdminRoleData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/removeAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeAdminRoleData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AdminUpdateRequest,
 *   !proto.services.DataResponse>}
 */
const methodDescriptor_Sng_getAdminRoles = new grpc.web.MethodDescriptor(
  '/services.Sng/getAdminRoles',
  grpc.web.MethodType.UNARY,
  proto.services.AdminUpdateRequest,
  proto.services.DataResponse,
  /**
   * @param {!proto.services.AdminUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AdminUpdateRequest,
 *   !proto.services.DataResponse>}
 */
const methodInfo_Sng_getAdminRoles = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.DataResponse,
  /**
   * @param {!proto.services.AdminUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DataResponse.deserializeBinary
);


/**
 * @param {!proto.services.AdminUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getAdminRoles =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getAdminRoles',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdminRoles,
      callback);
};


/**
 * @param {!proto.services.AdminUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.DataResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getAdminRoles =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getAdminRoles',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdminRoles);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AdminRoleRequest,
 *   !proto.services.DataResponse>}
 */
const methodDescriptor_Sng_getDistinctRole = new grpc.web.MethodDescriptor(
  '/services.Sng/getDistinctRole',
  grpc.web.MethodType.UNARY,
  proto.services.AdminRoleRequest,
  proto.services.DataResponse,
  /**
   * @param {!proto.services.AdminRoleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AdminRoleRequest,
 *   !proto.services.DataResponse>}
 */
const methodInfo_Sng_getDistinctRole = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.DataResponse,
  /**
   * @param {!proto.services.AdminRoleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DataResponse.deserializeBinary
);


/**
 * @param {!proto.services.AdminRoleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getDistinctRole =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getDistinctRole',
      request,
      metadata || {},
      methodDescriptor_Sng_getDistinctRole,
      callback);
};


/**
 * @param {!proto.services.AdminRoleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.DataResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getDistinctRole =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getDistinctRole',
      request,
      metadata || {},
      methodDescriptor_Sng_getDistinctRole);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ActiveUsersRequest,
 *   !proto.services.DataResponse>}
 */
const methodDescriptor_Sng_getAdmins = new grpc.web.MethodDescriptor(
  '/services.Sng/getAdmins',
  grpc.web.MethodType.UNARY,
  proto.services.ActiveUsersRequest,
  proto.services.DataResponse,
  /**
   * @param {!proto.services.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ActiveUsersRequest,
 *   !proto.services.DataResponse>}
 */
const methodInfo_Sng_getAdmins = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.DataResponse,
  /**
   * @param {!proto.services.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DataResponse.deserializeBinary
);


/**
 * @param {!proto.services.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getAdmins =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getAdmins',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdmins,
      callback);
};


/**
 * @param {!proto.services.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.DataResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getAdmins =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getAdmins',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdmins);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AdminAddRequest,
 *   !proto.services.StatusResponse>}
 */
const methodDescriptor_Sng_addAdminData = new grpc.web.MethodDescriptor(
  '/services.Sng/addAdminData',
  grpc.web.MethodType.UNARY,
  proto.services.AdminAddRequest,
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.AdminAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AdminAddRequest,
 *   !proto.services.StatusResponse>}
 */
const methodInfo_Sng_addAdminData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.AdminAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.AdminAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.addAdminData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/addAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_addAdminData,
      callback);
};


/**
 * @param {!proto.services.AdminAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.StatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.addAdminData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/addAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_addAdminData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AdminUpdateRequest,
 *   !proto.services.StatusResponse>}
 */
const methodDescriptor_Sng_updateAdminData = new grpc.web.MethodDescriptor(
  '/services.Sng/updateAdminData',
  grpc.web.MethodType.UNARY,
  proto.services.AdminUpdateRequest,
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.AdminUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AdminUpdateRequest,
 *   !proto.services.StatusResponse>}
 */
const methodInfo_Sng_updateAdminData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.AdminUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.AdminUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.updateAdminData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/updateAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateAdminData,
      callback);
};


/**
 * @param {!proto.services.AdminUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.StatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.updateAdminData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/updateAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateAdminData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AdminRemoveRequest,
 *   !proto.services.StatusResponse>}
 */
const methodDescriptor_Sng_removeAdminData = new grpc.web.MethodDescriptor(
  '/services.Sng/removeAdminData',
  grpc.web.MethodType.UNARY,
  proto.services.AdminRemoveRequest,
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.AdminRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AdminRemoveRequest,
 *   !proto.services.StatusResponse>}
 */
const methodInfo_Sng_removeAdminData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.AdminRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.AdminRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.removeAdminData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/removeAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeAdminData,
      callback);
};


/**
 * @param {!proto.services.AdminRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.StatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.removeAdminData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/removeAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeAdminData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.services.FloatResponse>}
 */
const methodDescriptor_Sng_getAmountInplay = new grpc.web.MethodDescriptor(
  '/services.Sng/getAmountInplay',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.services.FloatResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.FloatResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.services.FloatResponse>}
 */
const methodInfo_Sng_getAmountInplay = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.FloatResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.FloatResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.FloatResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.FloatResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getAmountInplay =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getAmountInplay',
      request,
      metadata || {},
      methodDescriptor_Sng_getAmountInplay,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.FloatResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getAmountInplay =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getAmountInplay',
      request,
      metadata || {},
      methodDescriptor_Sng_getAmountInplay);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetTournamentTemplateDetailRequest,
 *   !proto.services.StatusResponse>}
 */
const methodDescriptor_Sng_removeTournament = new grpc.web.MethodDescriptor(
  '/services.Sng/removeTournament',
  grpc.web.MethodType.UNARY,
  proto.services.GetTournamentTemplateDetailRequest,
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.GetTournamentTemplateDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetTournamentTemplateDetailRequest,
 *   !proto.services.StatusResponse>}
 */
const methodInfo_Sng_removeTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.GetTournamentTemplateDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetTournamentTemplateDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.removeTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/removeTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_removeTournament,
      callback);
};


/**
 * @param {!proto.services.GetTournamentTemplateDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.StatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.removeTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/removeTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_removeTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.UpdateTournamentTemplateRequest,
 *   !proto.services.StatusResponse>}
 */
const methodDescriptor_Sng_updateTournament = new grpc.web.MethodDescriptor(
  '/services.Sng/updateTournament',
  grpc.web.MethodType.UNARY,
  proto.services.UpdateTournamentTemplateRequest,
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.UpdateTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.UpdateTournamentTemplateRequest,
 *   !proto.services.StatusResponse>}
 */
const methodInfo_Sng_updateTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.UpdateTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.UpdateTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.updateTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/updateTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_updateTournament,
      callback);
};


/**
 * @param {!proto.services.UpdateTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.StatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.updateTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/updateTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_updateTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.PlayerTournamentRequest,
 *   !proto.services.GetTournamentsResponse>}
 */
const methodDescriptor_Sng_getPlayerTournaments = new grpc.web.MethodDescriptor(
  '/services.Sng/getPlayerTournaments',
  grpc.web.MethodType.UNARY,
  proto.services.PlayerTournamentRequest,
  proto.services.GetTournamentsResponse,
  /**
   * @param {!proto.services.PlayerTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetTournamentsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.PlayerTournamentRequest,
 *   !proto.services.GetTournamentsResponse>}
 */
const methodInfo_Sng_getPlayerTournaments = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetTournamentsResponse,
  /**
   * @param {!proto.services.PlayerTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetTournamentsResponse.deserializeBinary
);


/**
 * @param {!proto.services.PlayerTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetTournamentsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetTournamentsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getPlayerTournaments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getPlayerTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerTournaments,
      callback);
};


/**
 * @param {!proto.services.PlayerTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetTournamentsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getPlayerTournaments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getPlayerTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerTournaments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.SimulateGamesRequest,
 *   !proto.services.StatusResponse>}
 */
const methodDescriptor_Sng_simulateGames = new grpc.web.MethodDescriptor(
  '/services.Sng/simulateGames',
  grpc.web.MethodType.UNARY,
  proto.services.SimulateGamesRequest,
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.SimulateGamesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.SimulateGamesRequest,
 *   !proto.services.StatusResponse>}
 */
const methodInfo_Sng_simulateGames = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.SimulateGamesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.SimulateGamesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.simulateGames =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/simulateGames',
      request,
      metadata || {},
      methodDescriptor_Sng_simulateGames,
      callback);
};


/**
 * @param {!proto.services.SimulateGamesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.StatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.simulateGames =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/simulateGames',
      request,
      metadata || {},
      methodDescriptor_Sng_simulateGames);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.PendingDepositRequest,
 *   !proto.services.DataResponse>}
 */
const methodDescriptor_Sng_getPendingRequest = new grpc.web.MethodDescriptor(
  '/services.Sng/getPendingRequest',
  grpc.web.MethodType.UNARY,
  proto.services.PendingDepositRequest,
  proto.services.DataResponse,
  /**
   * @param {!proto.services.PendingDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.PendingDepositRequest,
 *   !proto.services.DataResponse>}
 */
const methodInfo_Sng_getPendingRequest = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.DataResponse,
  /**
   * @param {!proto.services.PendingDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DataResponse.deserializeBinary
);


/**
 * @param {!proto.services.PendingDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getPendingRequest =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getPendingRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_getPendingRequest,
      callback);
};


/**
 * @param {!proto.services.PendingDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.DataResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getPendingRequest =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getPendingRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_getPendingRequest);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.PendingDepositRequest,
 *   !proto.services.DataResponse>}
 */
const methodDescriptor_Sng_getApprovedRequest = new grpc.web.MethodDescriptor(
  '/services.Sng/getApprovedRequest',
  grpc.web.MethodType.UNARY,
  proto.services.PendingDepositRequest,
  proto.services.DataResponse,
  /**
   * @param {!proto.services.PendingDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.PendingDepositRequest,
 *   !proto.services.DataResponse>}
 */
const methodInfo_Sng_getApprovedRequest = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.DataResponse,
  /**
   * @param {!proto.services.PendingDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DataResponse.deserializeBinary
);


/**
 * @param {!proto.services.PendingDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getApprovedRequest =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getApprovedRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_getApprovedRequest,
      callback);
};


/**
 * @param {!proto.services.PendingDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.DataResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getApprovedRequest =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getApprovedRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_getApprovedRequest);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.UpdatePendingRequest,
 *   !proto.services.StatusResponse>}
 */
const methodDescriptor_Sng_actionOnPendingRequest = new grpc.web.MethodDescriptor(
  '/services.Sng/actionOnPendingRequest',
  grpc.web.MethodType.UNARY,
  proto.services.UpdatePendingRequest,
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.UpdatePendingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.UpdatePendingRequest,
 *   !proto.services.StatusResponse>}
 */
const methodInfo_Sng_actionOnPendingRequest = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.StatusResponse,
  /**
   * @param {!proto.services.UpdatePendingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.UpdatePendingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.actionOnPendingRequest =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/actionOnPendingRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_actionOnPendingRequest,
      callback);
};


/**
 * @param {!proto.services.UpdatePendingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.StatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.actionOnPendingRequest =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/actionOnPendingRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_actionOnPendingRequest);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ActiveUsersRequest,
 *   !proto.services.ActiveUsersResult>}
 */
const methodDescriptor_Sng_getBotList = new grpc.web.MethodDescriptor(
  '/services.Sng/getBotList',
  grpc.web.MethodType.UNARY,
  proto.services.ActiveUsersRequest,
  proto.services.ActiveUsersResult,
  /**
   * @param {!proto.services.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ActiveUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ActiveUsersRequest,
 *   !proto.services.ActiveUsersResult>}
 */
const methodInfo_Sng_getBotList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ActiveUsersResult,
  /**
   * @param {!proto.services.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ActiveUsersResult.deserializeBinary
);


/**
 * @param {!proto.services.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ActiveUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ActiveUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getBotList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getBotList',
      request,
      metadata || {},
      methodDescriptor_Sng_getBotList,
      callback);
};


/**
 * @param {!proto.services.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ActiveUsersResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getBotList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getBotList',
      request,
      metadata || {},
      methodDescriptor_Sng_getBotList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.CreateMultipleUsersRequest,
 *   !proto.services.CreateMultipleUsersResult>}
 */
const methodDescriptor_Sng_createMultipleUsers = new grpc.web.MethodDescriptor(
  '/services.Sng/createMultipleUsers',
  grpc.web.MethodType.UNARY,
  proto.services.CreateMultipleUsersRequest,
  proto.services.CreateMultipleUsersResult,
  /**
   * @param {!proto.services.CreateMultipleUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CreateMultipleUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.CreateMultipleUsersRequest,
 *   !proto.services.CreateMultipleUsersResult>}
 */
const methodInfo_Sng_createMultipleUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.CreateMultipleUsersResult,
  /**
   * @param {!proto.services.CreateMultipleUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CreateMultipleUsersResult.deserializeBinary
);


/**
 * @param {!proto.services.CreateMultipleUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.CreateMultipleUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.CreateMultipleUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.createMultipleUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/createMultipleUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_createMultipleUsers,
      callback);
};


/**
 * @param {!proto.services.CreateMultipleUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.CreateMultipleUsersResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.createMultipleUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/createMultipleUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_createMultipleUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.DeletePrizePoolStatusRequest,
 *   !proto.services.DeletePrizePoolStatusResponse>}
 */
const methodDescriptor_Sng_deletePrizePoolPayout = new grpc.web.MethodDescriptor(
  '/services.Sng/deletePrizePoolPayout',
  grpc.web.MethodType.UNARY,
  proto.services.DeletePrizePoolStatusRequest,
  proto.services.DeletePrizePoolStatusResponse,
  /**
   * @param {!proto.services.DeletePrizePoolStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DeletePrizePoolStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.DeletePrizePoolStatusRequest,
 *   !proto.services.DeletePrizePoolStatusResponse>}
 */
const methodInfo_Sng_deletePrizePoolPayout = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.DeletePrizePoolStatusResponse,
  /**
   * @param {!proto.services.DeletePrizePoolStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DeletePrizePoolStatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.DeletePrizePoolStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.DeletePrizePoolStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.DeletePrizePoolStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.deletePrizePoolPayout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/deletePrizePoolPayout',
      request,
      metadata || {},
      methodDescriptor_Sng_deletePrizePoolPayout,
      callback);
};


/**
 * @param {!proto.services.DeletePrizePoolStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.DeletePrizePoolStatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.deletePrizePoolPayout =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/deletePrizePoolPayout',
      request,
      metadata || {},
      methodDescriptor_Sng_deletePrizePoolPayout);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AdminJoinAnyTournamentRequest,
 *   !proto.services.JoinAnyTournamentResult>}
 */
const methodDescriptor_Sng_adminJoinAnyTournament = new grpc.web.MethodDescriptor(
  '/services.Sng/adminJoinAnyTournament',
  grpc.web.MethodType.UNARY,
  proto.services.AdminJoinAnyTournamentRequest,
  proto.services.JoinAnyTournamentResult,
  /**
   * @param {!proto.services.AdminJoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.JoinAnyTournamentResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AdminJoinAnyTournamentRequest,
 *   !proto.services.JoinAnyTournamentResult>}
 */
const methodInfo_Sng_adminJoinAnyTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.JoinAnyTournamentResult,
  /**
   * @param {!proto.services.AdminJoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.JoinAnyTournamentResult.deserializeBinary
);


/**
 * @param {!proto.services.AdminJoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.JoinAnyTournamentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.JoinAnyTournamentResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.adminJoinAnyTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/adminJoinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_adminJoinAnyTournament,
      callback);
};


/**
 * @param {!proto.services.AdminJoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.JoinAnyTournamentResult>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.adminJoinAnyTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/adminJoinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_adminJoinAnyTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.UiSettingsRequest,
 *   !proto.services.UiSettingsResponse>}
 */
const methodDescriptor_Sng_getUiSettings = new grpc.web.MethodDescriptor(
  '/services.Sng/getUiSettings',
  grpc.web.MethodType.UNARY,
  proto.services.UiSettingsRequest,
  proto.services.UiSettingsResponse,
  /**
   * @param {!proto.services.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UiSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.UiSettingsRequest,
 *   !proto.services.UiSettingsResponse>}
 */
const methodInfo_Sng_getUiSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.UiSettingsResponse,
  /**
   * @param {!proto.services.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UiSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.services.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.UiSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.UiSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getUiSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getUiSettings,
      callback);
};


/**
 * @param {!proto.services.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.UiSettingsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getUiSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getUiSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.UiSettingsRequest,
 *   !proto.services.UiSettingsResponse>}
 */
const methodDescriptor_Sng_getAllUiSettings = new grpc.web.MethodDescriptor(
  '/services.Sng/getAllUiSettings',
  grpc.web.MethodType.UNARY,
  proto.services.UiSettingsRequest,
  proto.services.UiSettingsResponse,
  /**
   * @param {!proto.services.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UiSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.UiSettingsRequest,
 *   !proto.services.UiSettingsResponse>}
 */
const methodInfo_Sng_getAllUiSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.UiSettingsResponse,
  /**
   * @param {!proto.services.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UiSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.services.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.UiSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.UiSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getAllUiSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getAllUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getAllUiSettings,
      callback);
};


/**
 * @param {!proto.services.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.UiSettingsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getAllUiSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getAllUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getAllUiSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AllUiSettingsRequest,
 *   !proto.services.UiSettingsResponse>}
 */
const methodDescriptor_Sng_setUiSettings = new grpc.web.MethodDescriptor(
  '/services.Sng/setUiSettings',
  grpc.web.MethodType.UNARY,
  proto.services.AllUiSettingsRequest,
  proto.services.UiSettingsResponse,
  /**
   * @param {!proto.services.AllUiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UiSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AllUiSettingsRequest,
 *   !proto.services.UiSettingsResponse>}
 */
const methodInfo_Sng_setUiSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.UiSettingsResponse,
  /**
   * @param {!proto.services.AllUiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UiSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.services.AllUiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.UiSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.UiSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.setUiSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/setUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_setUiSettings,
      callback);
};


/**
 * @param {!proto.services.AllUiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.UiSettingsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.setUiSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/setUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_setUiSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.UiSettingsRequest,
 *   !proto.services.UiSettingsResponse>}
 */
const methodDescriptor_Sng_deleteUiSettings = new grpc.web.MethodDescriptor(
  '/services.Sng/deleteUiSettings',
  grpc.web.MethodType.UNARY,
  proto.services.UiSettingsRequest,
  proto.services.UiSettingsResponse,
  /**
   * @param {!proto.services.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UiSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.UiSettingsRequest,
 *   !proto.services.UiSettingsResponse>}
 */
const methodInfo_Sng_deleteUiSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.UiSettingsResponse,
  /**
   * @param {!proto.services.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UiSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.services.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.UiSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.UiSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.deleteUiSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/deleteUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_deleteUiSettings,
      callback);
};


/**
 * @param {!proto.services.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.UiSettingsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.deleteUiSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/deleteUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_deleteUiSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ThemesRequest,
 *   !proto.services.ThemesResponse>}
 */
const methodDescriptor_Sng_getThemes = new grpc.web.MethodDescriptor(
  '/services.Sng/getThemes',
  grpc.web.MethodType.UNARY,
  proto.services.ThemesRequest,
  proto.services.ThemesResponse,
  /**
   * @param {!proto.services.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ThemesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ThemesRequest,
 *   !proto.services.ThemesResponse>}
 */
const methodInfo_Sng_getThemes = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ThemesResponse,
  /**
   * @param {!proto.services.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ThemesResponse.deserializeBinary
);


/**
 * @param {!proto.services.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ThemesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ThemesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getThemes =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getThemes',
      request,
      metadata || {},
      methodDescriptor_Sng_getThemes,
      callback);
};


/**
 * @param {!proto.services.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ThemesResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getThemes =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getThemes',
      request,
      metadata || {},
      methodDescriptor_Sng_getThemes);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ThemesRequest,
 *   !proto.services.ThemesResponse>}
 */
const methodDescriptor_Sng_setTheme = new grpc.web.MethodDescriptor(
  '/services.Sng/setTheme',
  grpc.web.MethodType.UNARY,
  proto.services.ThemesRequest,
  proto.services.ThemesResponse,
  /**
   * @param {!proto.services.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ThemesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ThemesRequest,
 *   !proto.services.ThemesResponse>}
 */
const methodInfo_Sng_setTheme = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ThemesResponse,
  /**
   * @param {!proto.services.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ThemesResponse.deserializeBinary
);


/**
 * @param {!proto.services.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ThemesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ThemesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.setTheme =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/setTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_setTheme,
      callback);
};


/**
 * @param {!proto.services.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ThemesResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.setTheme =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/setTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_setTheme);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.EditThemesRequest,
 *   !proto.services.ThemesResponse>}
 */
const methodDescriptor_Sng_editTheme = new grpc.web.MethodDescriptor(
  '/services.Sng/editTheme',
  grpc.web.MethodType.UNARY,
  proto.services.EditThemesRequest,
  proto.services.ThemesResponse,
  /**
   * @param {!proto.services.EditThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ThemesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.EditThemesRequest,
 *   !proto.services.ThemesResponse>}
 */
const methodInfo_Sng_editTheme = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ThemesResponse,
  /**
   * @param {!proto.services.EditThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ThemesResponse.deserializeBinary
);


/**
 * @param {!proto.services.EditThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ThemesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ThemesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.editTheme =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/editTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_editTheme,
      callback);
};


/**
 * @param {!proto.services.EditThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ThemesResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.editTheme =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/editTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_editTheme);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ThemesRequest,
 *   !proto.services.ThemesResponse>}
 */
const methodDescriptor_Sng_deleteTheme = new grpc.web.MethodDescriptor(
  '/services.Sng/deleteTheme',
  grpc.web.MethodType.UNARY,
  proto.services.ThemesRequest,
  proto.services.ThemesResponse,
  /**
   * @param {!proto.services.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ThemesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ThemesRequest,
 *   !proto.services.ThemesResponse>}
 */
const methodInfo_Sng_deleteTheme = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ThemesResponse,
  /**
   * @param {!proto.services.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ThemesResponse.deserializeBinary
);


/**
 * @param {!proto.services.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ThemesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ThemesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.deleteTheme =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/deleteTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_deleteTheme,
      callback);
};


/**
 * @param {!proto.services.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ThemesResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.deleteTheme =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/deleteTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_deleteTheme);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GeopollRequest,
 *   !proto.services.GeopollResponse>}
 */
const methodDescriptor_Sng_getGeopoll = new grpc.web.MethodDescriptor(
  '/services.Sng/getGeopoll',
  grpc.web.MethodType.UNARY,
  proto.services.GeopollRequest,
  proto.services.GeopollResponse,
  /**
   * @param {!proto.services.GeopollRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeopollResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GeopollRequest,
 *   !proto.services.GeopollResponse>}
 */
const methodInfo_Sng_getGeopoll = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GeopollResponse,
  /**
   * @param {!proto.services.GeopollRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GeopollResponse.deserializeBinary
);


/**
 * @param {!proto.services.GeopollRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GeopollResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GeopollResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getGeopoll =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getGeopoll',
      request,
      metadata || {},
      methodDescriptor_Sng_getGeopoll,
      callback);
};


/**
 * @param {!proto.services.GeopollRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GeopollResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getGeopoll =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getGeopoll',
      request,
      metadata || {},
      methodDescriptor_Sng_getGeopoll);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.UpdateSecurityQuestionsRequest,
 *   !proto.services.UpdateSecurityQuestionsResponse>}
 */
const methodDescriptor_Sng_updateSecurityQuestions = new grpc.web.MethodDescriptor(
  '/services.Sng/updateSecurityQuestions',
  grpc.web.MethodType.UNARY,
  proto.services.UpdateSecurityQuestionsRequest,
  proto.services.UpdateSecurityQuestionsResponse,
  /**
   * @param {!proto.services.UpdateSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UpdateSecurityQuestionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.UpdateSecurityQuestionsRequest,
 *   !proto.services.UpdateSecurityQuestionsResponse>}
 */
const methodInfo_Sng_updateSecurityQuestions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.UpdateSecurityQuestionsResponse,
  /**
   * @param {!proto.services.UpdateSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UpdateSecurityQuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.services.UpdateSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.UpdateSecurityQuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.UpdateSecurityQuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.updateSecurityQuestions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/updateSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_updateSecurityQuestions,
      callback);
};


/**
 * @param {!proto.services.UpdateSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.UpdateSecurityQuestionsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.updateSecurityQuestions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/updateSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_updateSecurityQuestions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.FetchSecurityQuestionsResponse,
 *   !proto.services.FetchSecurityQuestionsResponse>}
 */
const methodDescriptor_Sng_getUserSecurityQuestions = new grpc.web.MethodDescriptor(
  '/services.Sng/getUserSecurityQuestions',
  grpc.web.MethodType.UNARY,
  proto.services.FetchSecurityQuestionsResponse,
  proto.services.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.services.FetchSecurityQuestionsResponse} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.FetchSecurityQuestionsResponse,
 *   !proto.services.FetchSecurityQuestionsResponse>}
 */
const methodInfo_Sng_getUserSecurityQuestions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.services.FetchSecurityQuestionsResponse} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.services.FetchSecurityQuestionsResponse} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.FetchSecurityQuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.FetchSecurityQuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getUserSecurityQuestions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getUserSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_getUserSecurityQuestions,
      callback);
};


/**
 * @param {!proto.services.FetchSecurityQuestionsResponse} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.FetchSecurityQuestionsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getUserSecurityQuestions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getUserSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_getUserSecurityQuestions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.CustomCssRequest,
 *   !proto.services.CustomCssResponse>}
 */
const methodDescriptor_Sng_updateCustomCss = new grpc.web.MethodDescriptor(
  '/services.Sng/updateCustomCss',
  grpc.web.MethodType.UNARY,
  proto.services.CustomCssRequest,
  proto.services.CustomCssResponse,
  /**
   * @param {!proto.services.CustomCssRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CustomCssResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.CustomCssRequest,
 *   !proto.services.CustomCssResponse>}
 */
const methodInfo_Sng_updateCustomCss = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.CustomCssResponse,
  /**
   * @param {!proto.services.CustomCssRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CustomCssResponse.deserializeBinary
);


/**
 * @param {!proto.services.CustomCssRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.CustomCssResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.CustomCssResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.updateCustomCss =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/updateCustomCss',
      request,
      metadata || {},
      methodDescriptor_Sng_updateCustomCss,
      callback);
};


/**
 * @param {!proto.services.CustomCssRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.CustomCssResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.updateCustomCss =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/updateCustomCss',
      request,
      metadata || {},
      methodDescriptor_Sng_updateCustomCss);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.CustomCssRequest,
 *   !proto.services.CustomCssResponse>}
 */
const methodDescriptor_Sng_getCustomCss = new grpc.web.MethodDescriptor(
  '/services.Sng/getCustomCss',
  grpc.web.MethodType.UNARY,
  proto.services.CustomCssRequest,
  proto.services.CustomCssResponse,
  /**
   * @param {!proto.services.CustomCssRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CustomCssResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.CustomCssRequest,
 *   !proto.services.CustomCssResponse>}
 */
const methodInfo_Sng_getCustomCss = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.CustomCssResponse,
  /**
   * @param {!proto.services.CustomCssRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CustomCssResponse.deserializeBinary
);


/**
 * @param {!proto.services.CustomCssRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.CustomCssResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.CustomCssResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getCustomCss =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getCustomCss',
      request,
      metadata || {},
      methodDescriptor_Sng_getCustomCss,
      callback);
};


/**
 * @param {!proto.services.CustomCssRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.CustomCssResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getCustomCss =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getCustomCss',
      request,
      metadata || {},
      methodDescriptor_Sng_getCustomCss);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.PlayerMailingAddressUpdateRequest,
 *   !proto.services.PlayerMailingAddressStatusResponse>}
 */
const methodDescriptor_Sng_addPlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/services.Sng/addPlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.services.PlayerMailingAddressUpdateRequest,
  proto.services.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.services.PlayerMailingAddressUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.PlayerMailingAddressUpdateRequest,
 *   !proto.services.PlayerMailingAddressStatusResponse>}
 */
const methodInfo_Sng_addPlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.services.PlayerMailingAddressUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.PlayerMailingAddressUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.PlayerMailingAddressStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.PlayerMailingAddressStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.addPlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/addPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_addPlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.services.PlayerMailingAddressUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.PlayerMailingAddressStatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.addPlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/addPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_addPlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.PlayerMailingAddressRequest,
 *   !proto.services.PlayerMailingAddressResponse>}
 */
const methodDescriptor_Sng_getPlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/services.Sng/getPlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.services.PlayerMailingAddressRequest,
  proto.services.PlayerMailingAddressResponse,
  /**
   * @param {!proto.services.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerMailingAddressResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.PlayerMailingAddressRequest,
 *   !proto.services.PlayerMailingAddressResponse>}
 */
const methodInfo_Sng_getPlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.PlayerMailingAddressResponse,
  /**
   * @param {!proto.services.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerMailingAddressResponse.deserializeBinary
);


/**
 * @param {!proto.services.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.PlayerMailingAddressResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.PlayerMailingAddressResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getPlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.services.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.PlayerMailingAddressResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getPlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.PlayerMailingAddressRequest,
 *   !proto.services.PlayerMailingAddressesResponse>}
 */
const methodDescriptor_Sng_getPlayerMailingAddresses = new grpc.web.MethodDescriptor(
  '/services.Sng/getPlayerMailingAddresses',
  grpc.web.MethodType.UNARY,
  proto.services.PlayerMailingAddressRequest,
  proto.services.PlayerMailingAddressesResponse,
  /**
   * @param {!proto.services.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerMailingAddressesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.PlayerMailingAddressRequest,
 *   !proto.services.PlayerMailingAddressesResponse>}
 */
const methodInfo_Sng_getPlayerMailingAddresses = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.PlayerMailingAddressesResponse,
  /**
   * @param {!proto.services.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerMailingAddressesResponse.deserializeBinary
);


/**
 * @param {!proto.services.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.PlayerMailingAddressesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.PlayerMailingAddressesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getPlayerMailingAddresses =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getPlayerMailingAddresses',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerMailingAddresses,
      callback);
};


/**
 * @param {!proto.services.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.PlayerMailingAddressesResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getPlayerMailingAddresses =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getPlayerMailingAddresses',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerMailingAddresses);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.PlayerMailingAddressUpdateRequest,
 *   !proto.services.PlayerMailingAddressStatusResponse>}
 */
const methodDescriptor_Sng_updatePlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/services.Sng/updatePlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.services.PlayerMailingAddressUpdateRequest,
  proto.services.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.services.PlayerMailingAddressUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.PlayerMailingAddressUpdateRequest,
 *   !proto.services.PlayerMailingAddressStatusResponse>}
 */
const methodInfo_Sng_updatePlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.services.PlayerMailingAddressUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.PlayerMailingAddressUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.PlayerMailingAddressStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.PlayerMailingAddressStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.updatePlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/updatePlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_updatePlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.services.PlayerMailingAddressUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.PlayerMailingAddressStatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.updatePlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/updatePlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_updatePlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.PlayerMailingAddressRequest,
 *   !proto.services.PlayerMailingAddressResponse>}
 */
const methodDescriptor_Sng_getDefaultPlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/services.Sng/getDefaultPlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.services.PlayerMailingAddressRequest,
  proto.services.PlayerMailingAddressResponse,
  /**
   * @param {!proto.services.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerMailingAddressResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.PlayerMailingAddressRequest,
 *   !proto.services.PlayerMailingAddressResponse>}
 */
const methodInfo_Sng_getDefaultPlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.PlayerMailingAddressResponse,
  /**
   * @param {!proto.services.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerMailingAddressResponse.deserializeBinary
);


/**
 * @param {!proto.services.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.PlayerMailingAddressResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.PlayerMailingAddressResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getDefaultPlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getDefaultPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_getDefaultPlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.services.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.PlayerMailingAddressResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getDefaultPlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getDefaultPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_getDefaultPlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.PlayerMailingAddressRequest,
 *   !proto.services.PlayerMailingAddressStatusResponse>}
 */
const methodDescriptor_Sng_setDefaultPlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/services.Sng/setDefaultPlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.services.PlayerMailingAddressRequest,
  proto.services.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.services.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.PlayerMailingAddressRequest,
 *   !proto.services.PlayerMailingAddressStatusResponse>}
 */
const methodInfo_Sng_setDefaultPlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.services.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.PlayerMailingAddressStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.PlayerMailingAddressStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.setDefaultPlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/setDefaultPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_setDefaultPlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.services.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.PlayerMailingAddressStatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.setDefaultPlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/setDefaultPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_setDefaultPlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.PlayerMailingAddressRequest,
 *   !proto.services.PlayerMailingAddressStatusResponse>}
 */
const methodDescriptor_Sng_deletePlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/services.Sng/deletePlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.services.PlayerMailingAddressRequest,
  proto.services.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.services.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.PlayerMailingAddressRequest,
 *   !proto.services.PlayerMailingAddressStatusResponse>}
 */
const methodInfo_Sng_deletePlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.services.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @param {!proto.services.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.PlayerMailingAddressStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.PlayerMailingAddressStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.deletePlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/deletePlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_deletePlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.services.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.PlayerMailingAddressStatusResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.deletePlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/deletePlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_deletePlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.FetchSecurityQuestionsRequest,
 *   !proto.services.FetchSecurityQuestionsResponse>}
 */
const methodDescriptor_Sng_getRandomSecurityQuestion = new grpc.web.MethodDescriptor(
  '/services.Sng/getRandomSecurityQuestion',
  grpc.web.MethodType.UNARY,
  proto.services.FetchSecurityQuestionsRequest,
  proto.services.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.services.FetchSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.FetchSecurityQuestionsRequest,
 *   !proto.services.FetchSecurityQuestionsResponse>}
 */
const methodInfo_Sng_getRandomSecurityQuestion = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.services.FetchSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.services.FetchSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.FetchSecurityQuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.FetchSecurityQuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.getRandomSecurityQuestion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/getRandomSecurityQuestion',
      request,
      metadata || {},
      methodDescriptor_Sng_getRandomSecurityQuestion,
      callback);
};


/**
 * @param {!proto.services.FetchSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.FetchSecurityQuestionsResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.getRandomSecurityQuestion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/getRandomSecurityQuestion',
      request,
      metadata || {},
      methodDescriptor_Sng_getRandomSecurityQuestion);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AnswerVerifyPasswordRequest,
 *   !proto.services.AnswerVerifyPasswordResponse>}
 */
const methodDescriptor_Sng_answerSecurityQusetionAndVerifyPassword = new grpc.web.MethodDescriptor(
  '/services.Sng/answerSecurityQusetionAndVerifyPassword',
  grpc.web.MethodType.UNARY,
  proto.services.AnswerVerifyPasswordRequest,
  proto.services.AnswerVerifyPasswordResponse,
  /**
   * @param {!proto.services.AnswerVerifyPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AnswerVerifyPasswordResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AnswerVerifyPasswordRequest,
 *   !proto.services.AnswerVerifyPasswordResponse>}
 */
const methodInfo_Sng_answerSecurityQusetionAndVerifyPassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.AnswerVerifyPasswordResponse,
  /**
   * @param {!proto.services.AnswerVerifyPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AnswerVerifyPasswordResponse.deserializeBinary
);


/**
 * @param {!proto.services.AnswerVerifyPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.AnswerVerifyPasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.AnswerVerifyPasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.answerSecurityQusetionAndVerifyPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/answerSecurityQusetionAndVerifyPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_answerSecurityQusetionAndVerifyPassword,
      callback);
};


/**
 * @param {!proto.services.AnswerVerifyPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.AnswerVerifyPasswordResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.answerSecurityQusetionAndVerifyPassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/answerSecurityQusetionAndVerifyPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_answerSecurityQusetionAndVerifyPassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.VerifySSNLastFourRequest,
 *   !proto.services.VerifySSNLastFourResponse>}
 */
const methodDescriptor_Sng_verifySSNLastFourDigits = new grpc.web.MethodDescriptor(
  '/services.Sng/verifySSNLastFourDigits',
  grpc.web.MethodType.UNARY,
  proto.services.VerifySSNLastFourRequest,
  proto.services.VerifySSNLastFourResponse,
  /**
   * @param {!proto.services.VerifySSNLastFourRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.VerifySSNLastFourResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.VerifySSNLastFourRequest,
 *   !proto.services.VerifySSNLastFourResponse>}
 */
const methodInfo_Sng_verifySSNLastFourDigits = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.VerifySSNLastFourResponse,
  /**
   * @param {!proto.services.VerifySSNLastFourRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.VerifySSNLastFourResponse.deserializeBinary
);


/**
 * @param {!proto.services.VerifySSNLastFourRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.VerifySSNLastFourResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.VerifySSNLastFourResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.SngClient.prototype.verifySSNLastFourDigits =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.Sng/verifySSNLastFourDigits',
      request,
      metadata || {},
      methodDescriptor_Sng_verifySSNLastFourDigits,
      callback);
};


/**
 * @param {!proto.services.VerifySSNLastFourRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.VerifySSNLastFourResponse>}
 *     A native promise that resolves to the response
 */
proto.services.SngPromiseClient.prototype.verifySSNLastFourDigits =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.Sng/verifySSNLastFourDigits',
      request,
      metadata || {},
      methodDescriptor_Sng_verifySSNLastFourDigits);
};


module.exports = proto.services;

