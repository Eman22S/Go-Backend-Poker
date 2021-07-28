/**
 * @fileoverview gRPC-Web generated client stub for poker
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.poker = require('./sng_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.poker.SngClient =
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
proto.poker.SngPromiseClient =
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
  '/poker.Sng/Test',
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
proto.poker.SngClient.prototype.test =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/Test',
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
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.test =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/Test',
      request,
      metadata || {},
      methodDescriptor_Sng_Test);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetStatusRequest,
 *   !proto.poker.GetStatusResult>}
 */
const methodDescriptor_Sng_GetStatus = new grpc.web.MethodDescriptor(
  '/poker.Sng/GetStatus',
  grpc.web.MethodType.UNARY,
  proto.poker.GetStatusRequest,
  proto.poker.GetStatusResult,
  /**
   * @param {!proto.poker.GetStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetStatusRequest,
 *   !proto.poker.GetStatusResult>}
 */
const methodInfo_Sng_GetStatus = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetStatusResult,
  /**
   * @param {!proto.poker.GetStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetStatusResult.deserializeBinary
);


/**
 * @param {!proto.poker.GetStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/GetStatus',
      request,
      metadata || {},
      methodDescriptor_Sng_GetStatus,
      callback);
};


/**
 * @param {!proto.poker.GetStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetStatusResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getStatus =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/GetStatus',
      request,
      metadata || {},
      methodDescriptor_Sng_GetStatus);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.MakeSngRequest,
 *   !proto.poker.MakeSngResponse>}
 */
const methodDescriptor_Sng_MakeSng = new grpc.web.MethodDescriptor(
  '/poker.Sng/MakeSng',
  grpc.web.MethodType.UNARY,
  proto.poker.MakeSngRequest,
  proto.poker.MakeSngResponse,
  /**
   * @param {!proto.poker.MakeSngRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.MakeSngResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.MakeSngRequest,
 *   !proto.poker.MakeSngResponse>}
 */
const methodInfo_Sng_MakeSng = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.MakeSngResponse,
  /**
   * @param {!proto.poker.MakeSngRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.MakeSngResponse.deserializeBinary
);


/**
 * @param {!proto.poker.MakeSngRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.MakeSngResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.MakeSngResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.makeSng =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/MakeSng',
      request,
      metadata || {},
      methodDescriptor_Sng_MakeSng,
      callback);
};


/**
 * @param {!proto.poker.MakeSngRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.MakeSngResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.makeSng =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/MakeSng',
      request,
      metadata || {},
      methodDescriptor_Sng_MakeSng);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.MakePlayerActionRequest,
 *   !proto.poker.GetStatusResult>}
 */
const methodDescriptor_Sng_MakePlayerAction = new grpc.web.MethodDescriptor(
  '/poker.Sng/MakePlayerAction',
  grpc.web.MethodType.UNARY,
  proto.poker.MakePlayerActionRequest,
  proto.poker.GetStatusResult,
  /**
   * @param {!proto.poker.MakePlayerActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.MakePlayerActionRequest,
 *   !proto.poker.GetStatusResult>}
 */
const methodInfo_Sng_MakePlayerAction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetStatusResult,
  /**
   * @param {!proto.poker.MakePlayerActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetStatusResult.deserializeBinary
);


/**
 * @param {!proto.poker.MakePlayerActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.makePlayerAction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/MakePlayerAction',
      request,
      metadata || {},
      methodDescriptor_Sng_MakePlayerAction,
      callback);
};


/**
 * @param {!proto.poker.MakePlayerActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetStatusResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.makePlayerAction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/MakePlayerAction',
      request,
      metadata || {},
      methodDescriptor_Sng_MakePlayerAction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetTournamentsRequest,
 *   !proto.poker.GetTournamentsResponse>}
 */
const methodDescriptor_Sng_getTournaments = new grpc.web.MethodDescriptor(
  '/poker.Sng/getTournaments',
  grpc.web.MethodType.UNARY,
  proto.poker.GetTournamentsRequest,
  proto.poker.GetTournamentsResponse,
  /**
   * @param {!proto.poker.GetTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetTournamentsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetTournamentsRequest,
 *   !proto.poker.GetTournamentsResponse>}
 */
const methodInfo_Sng_getTournaments = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetTournamentsResponse,
  /**
   * @param {!proto.poker.GetTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetTournamentsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GetTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetTournamentsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetTournamentsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getTournaments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournaments,
      callback);
};


/**
 * @param {!proto.poker.GetTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetTournamentsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getTournaments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournaments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.JoinTournamentRequest,
 *   !proto.poker.JoinTournamentResponse>}
 */
const methodDescriptor_Sng_joinTournament = new grpc.web.MethodDescriptor(
  '/poker.Sng/joinTournament',
  grpc.web.MethodType.UNARY,
  proto.poker.JoinTournamentRequest,
  proto.poker.JoinTournamentResponse,
  /**
   * @param {!proto.poker.JoinTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.JoinTournamentResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.JoinTournamentRequest,
 *   !proto.poker.JoinTournamentResponse>}
 */
const methodInfo_Sng_joinTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.JoinTournamentResponse,
  /**
   * @param {!proto.poker.JoinTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.JoinTournamentResponse.deserializeBinary
);


/**
 * @param {!proto.poker.JoinTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.JoinTournamentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.JoinTournamentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.joinTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/joinTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_joinTournament,
      callback);
};


/**
 * @param {!proto.poker.JoinTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.JoinTournamentResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.joinTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/joinTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_joinTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.UnregisterTournamentRequest,
 *   !proto.poker.UnregisterTournamentResponse>}
 */
const methodDescriptor_Sng_unregisterTournament = new grpc.web.MethodDescriptor(
  '/poker.Sng/unregisterTournament',
  grpc.web.MethodType.UNARY,
  proto.poker.UnregisterTournamentRequest,
  proto.poker.UnregisterTournamentResponse,
  /**
   * @param {!proto.poker.UnregisterTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UnregisterTournamentResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.UnregisterTournamentRequest,
 *   !proto.poker.UnregisterTournamentResponse>}
 */
const methodInfo_Sng_unregisterTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.UnregisterTournamentResponse,
  /**
   * @param {!proto.poker.UnregisterTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UnregisterTournamentResponse.deserializeBinary
);


/**
 * @param {!proto.poker.UnregisterTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.UnregisterTournamentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.UnregisterTournamentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.unregisterTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/unregisterTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_unregisterTournament,
      callback);
};


/**
 * @param {!proto.poker.UnregisterTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.UnregisterTournamentResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.unregisterTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/unregisterTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_unregisterTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.CancelTournamentRequest,
 *   !proto.poker.CancelTournamentResponse>}
 */
const methodDescriptor_Sng_cancelTournament = new grpc.web.MethodDescriptor(
  '/poker.Sng/cancelTournament',
  grpc.web.MethodType.UNARY,
  proto.poker.CancelTournamentRequest,
  proto.poker.CancelTournamentResponse,
  /**
   * @param {!proto.poker.CancelTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CancelTournamentResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.CancelTournamentRequest,
 *   !proto.poker.CancelTournamentResponse>}
 */
const methodInfo_Sng_cancelTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.CancelTournamentResponse,
  /**
   * @param {!proto.poker.CancelTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CancelTournamentResponse.deserializeBinary
);


/**
 * @param {!proto.poker.CancelTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.CancelTournamentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.CancelTournamentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.cancelTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/cancelTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelTournament,
      callback);
};


/**
 * @param {!proto.poker.CancelTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.CancelTournamentResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.cancelTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/cancelTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetGameplayHistoriesRequest,
 *   !proto.poker.GetGameplayHistoriesResponse>}
 */
const methodDescriptor_Sng_getGameplayHistories = new grpc.web.MethodDescriptor(
  '/poker.Sng/getGameplayHistories',
  grpc.web.MethodType.UNARY,
  proto.poker.GetGameplayHistoriesRequest,
  proto.poker.GetGameplayHistoriesResponse,
  /**
   * @param {!proto.poker.GetGameplayHistoriesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetGameplayHistoriesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetGameplayHistoriesRequest,
 *   !proto.poker.GetGameplayHistoriesResponse>}
 */
const methodInfo_Sng_getGameplayHistories = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetGameplayHistoriesResponse,
  /**
   * @param {!proto.poker.GetGameplayHistoriesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetGameplayHistoriesResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GetGameplayHistoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetGameplayHistoriesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetGameplayHistoriesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getGameplayHistories =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getGameplayHistories',
      request,
      metadata || {},
      methodDescriptor_Sng_getGameplayHistories,
      callback);
};


/**
 * @param {!proto.poker.GetGameplayHistoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetGameplayHistoriesResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getGameplayHistories =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getGameplayHistories',
      request,
      metadata || {},
      methodDescriptor_Sng_getGameplayHistories);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetHandHistoryRequest,
 *   !proto.poker.GetHandHistoryResponse>}
 */
const methodDescriptor_Sng_getAllHandHistoryData = new grpc.web.MethodDescriptor(
  '/poker.Sng/getAllHandHistoryData',
  grpc.web.MethodType.UNARY,
  proto.poker.GetHandHistoryRequest,
  proto.poker.GetHandHistoryResponse,
  /**
   * @param {!proto.poker.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetHandHistoryResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetHandHistoryRequest,
 *   !proto.poker.GetHandHistoryResponse>}
 */
const methodInfo_Sng_getAllHandHistoryData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetHandHistoryResponse,
  /**
   * @param {!proto.poker.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetHandHistoryResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetHandHistoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetHandHistoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getAllHandHistoryData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getAllHandHistoryData',
      request,
      metadata || {},
      methodDescriptor_Sng_getAllHandHistoryData,
      callback);
};


/**
 * @param {!proto.poker.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetHandHistoryResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getAllHandHistoryData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getAllHandHistoryData',
      request,
      metadata || {},
      methodDescriptor_Sng_getAllHandHistoryData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetHandHistoryRequest,
 *   !proto.poker.GetHandHistoryResponse>}
 */
const methodDescriptor_Sng_getHandHistoryStat = new grpc.web.MethodDescriptor(
  '/poker.Sng/getHandHistoryStat',
  grpc.web.MethodType.UNARY,
  proto.poker.GetHandHistoryRequest,
  proto.poker.GetHandHistoryResponse,
  /**
   * @param {!proto.poker.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetHandHistoryResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetHandHistoryRequest,
 *   !proto.poker.GetHandHistoryResponse>}
 */
const methodInfo_Sng_getHandHistoryStat = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetHandHistoryResponse,
  /**
   * @param {!proto.poker.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetHandHistoryResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetHandHistoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetHandHistoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getHandHistoryStat =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getHandHistoryStat',
      request,
      metadata || {},
      methodDescriptor_Sng_getHandHistoryStat,
      callback);
};


/**
 * @param {!proto.poker.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetHandHistoryResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getHandHistoryStat =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getHandHistoryStat',
      request,
      metadata || {},
      methodDescriptor_Sng_getHandHistoryStat);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetHandHistoryRequest,
 *   !proto.poker.GetHandHistoryResponse>}
 */
const methodDescriptor_Sng_getHandHistoryData = new grpc.web.MethodDescriptor(
  '/poker.Sng/getHandHistoryData',
  grpc.web.MethodType.UNARY,
  proto.poker.GetHandHistoryRequest,
  proto.poker.GetHandHistoryResponse,
  /**
   * @param {!proto.poker.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetHandHistoryResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetHandHistoryRequest,
 *   !proto.poker.GetHandHistoryResponse>}
 */
const methodInfo_Sng_getHandHistoryData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetHandHistoryResponse,
  /**
   * @param {!proto.poker.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetHandHistoryResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetHandHistoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetHandHistoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getHandHistoryData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getHandHistoryData',
      request,
      metadata || {},
      methodDescriptor_Sng_getHandHistoryData,
      callback);
};


/**
 * @param {!proto.poker.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetHandHistoryResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getHandHistoryData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getHandHistoryData',
      request,
      metadata || {},
      methodDescriptor_Sng_getHandHistoryData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.DrawReplaceActionRequest,
 *   !proto.poker.GetStatusResult>}
 */
const methodDescriptor_Sng_drawReplaceAction = new grpc.web.MethodDescriptor(
  '/poker.Sng/drawReplaceAction',
  grpc.web.MethodType.UNARY,
  proto.poker.DrawReplaceActionRequest,
  proto.poker.GetStatusResult,
  /**
   * @param {!proto.poker.DrawReplaceActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.DrawReplaceActionRequest,
 *   !proto.poker.GetStatusResult>}
 */
const methodInfo_Sng_drawReplaceAction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetStatusResult,
  /**
   * @param {!proto.poker.DrawReplaceActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetStatusResult.deserializeBinary
);


/**
 * @param {!proto.poker.DrawReplaceActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.drawReplaceAction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/drawReplaceAction',
      request,
      metadata || {},
      methodDescriptor_Sng_drawReplaceAction,
      callback);
};


/**
 * @param {!proto.poker.DrawReplaceActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetStatusResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.drawReplaceAction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/drawReplaceAction',
      request,
      metadata || {},
      methodDescriptor_Sng_drawReplaceAction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.DrawAddActionRequest,
 *   !proto.poker.GetStatusResult>}
 */
const methodDescriptor_Sng_drawAddAction = new grpc.web.MethodDescriptor(
  '/poker.Sng/drawAddAction',
  grpc.web.MethodType.UNARY,
  proto.poker.DrawAddActionRequest,
  proto.poker.GetStatusResult,
  /**
   * @param {!proto.poker.DrawAddActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.DrawAddActionRequest,
 *   !proto.poker.GetStatusResult>}
 */
const methodInfo_Sng_drawAddAction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetStatusResult,
  /**
   * @param {!proto.poker.DrawAddActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetStatusResult.deserializeBinary
);


/**
 * @param {!proto.poker.DrawAddActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.drawAddAction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/drawAddAction',
      request,
      metadata || {},
      methodDescriptor_Sng_drawAddAction,
      callback);
};


/**
 * @param {!proto.poker.DrawAddActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetStatusResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.drawAddAction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/drawAddAction',
      request,
      metadata || {},
      methodDescriptor_Sng_drawAddAction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.JoinTournamentTemplateRequest,
 *   !proto.poker.JoinTournamentTemplateResponse>}
 */
const methodDescriptor_Sng_joinTournamentTempalte = new grpc.web.MethodDescriptor(
  '/poker.Sng/joinTournamentTempalte',
  grpc.web.MethodType.UNARY,
  proto.poker.JoinTournamentTemplateRequest,
  proto.poker.JoinTournamentTemplateResponse,
  /**
   * @param {!proto.poker.JoinTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.JoinTournamentTemplateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.JoinTournamentTemplateRequest,
 *   !proto.poker.JoinTournamentTemplateResponse>}
 */
const methodInfo_Sng_joinTournamentTempalte = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.JoinTournamentTemplateResponse,
  /**
   * @param {!proto.poker.JoinTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.JoinTournamentTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.poker.JoinTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.JoinTournamentTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.JoinTournamentTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.joinTournamentTempalte =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/joinTournamentTempalte',
      request,
      metadata || {},
      methodDescriptor_Sng_joinTournamentTempalte,
      callback);
};


/**
 * @param {!proto.poker.JoinTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.JoinTournamentTemplateResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.joinTournamentTempalte =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/joinTournamentTempalte',
      request,
      metadata || {},
      methodDescriptor_Sng_joinTournamentTempalte);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetTournamentTemplateDetailRequest,
 *   !proto.poker.GetTournamentTemplateDetailResponse>}
 */
const methodDescriptor_Sng_getTournamentTemplateDetail = new grpc.web.MethodDescriptor(
  '/poker.Sng/getTournamentTemplateDetail',
  grpc.web.MethodType.UNARY,
  proto.poker.GetTournamentTemplateDetailRequest,
  proto.poker.GetTournamentTemplateDetailResponse,
  /**
   * @param {!proto.poker.GetTournamentTemplateDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetTournamentTemplateDetailResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetTournamentTemplateDetailRequest,
 *   !proto.poker.GetTournamentTemplateDetailResponse>}
 */
const methodInfo_Sng_getTournamentTemplateDetail = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetTournamentTemplateDetailResponse,
  /**
   * @param {!proto.poker.GetTournamentTemplateDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetTournamentTemplateDetailResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GetTournamentTemplateDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetTournamentTemplateDetailResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetTournamentTemplateDetailResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getTournamentTemplateDetail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getTournamentTemplateDetail',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateDetail,
      callback);
};


/**
 * @param {!proto.poker.GetTournamentTemplateDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetTournamentTemplateDetailResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getTournamentTemplateDetail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getTournamentTemplateDetail',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateDetail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AddTournamentTemplateToLobbyRequest,
 *   !proto.poker.AddTournamentTemplateToLobbyResponse>}
 */
const methodDescriptor_Sng_addTournamentTemplateToLobby = new grpc.web.MethodDescriptor(
  '/poker.Sng/addTournamentTemplateToLobby',
  grpc.web.MethodType.UNARY,
  proto.poker.AddTournamentTemplateToLobbyRequest,
  proto.poker.AddTournamentTemplateToLobbyResponse,
  /**
   * @param {!proto.poker.AddTournamentTemplateToLobbyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.AddTournamentTemplateToLobbyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AddTournamentTemplateToLobbyRequest,
 *   !proto.poker.AddTournamentTemplateToLobbyResponse>}
 */
const methodInfo_Sng_addTournamentTemplateToLobby = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.AddTournamentTemplateToLobbyResponse,
  /**
   * @param {!proto.poker.AddTournamentTemplateToLobbyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.AddTournamentTemplateToLobbyResponse.deserializeBinary
);


/**
 * @param {!proto.poker.AddTournamentTemplateToLobbyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.AddTournamentTemplateToLobbyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.AddTournamentTemplateToLobbyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.addTournamentTemplateToLobby =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/addTournamentTemplateToLobby',
      request,
      metadata || {},
      methodDescriptor_Sng_addTournamentTemplateToLobby,
      callback);
};


/**
 * @param {!proto.poker.AddTournamentTemplateToLobbyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.AddTournamentTemplateToLobbyResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.addTournamentTemplateToLobby =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/addTournamentTemplateToLobby',
      request,
      metadata || {},
      methodDescriptor_Sng_addTournamentTemplateToLobby);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.RemoveTournamentTemplateFromLobbyRequest,
 *   !proto.poker.RemoveTournamentTemplateFromLobbyResponse>}
 */
const methodDescriptor_Sng_removeTournamentTemplateFromLobby = new grpc.web.MethodDescriptor(
  '/poker.Sng/removeTournamentTemplateFromLobby',
  grpc.web.MethodType.UNARY,
  proto.poker.RemoveTournamentTemplateFromLobbyRequest,
  proto.poker.RemoveTournamentTemplateFromLobbyResponse,
  /**
   * @param {!proto.poker.RemoveTournamentTemplateFromLobbyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.RemoveTournamentTemplateFromLobbyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.RemoveTournamentTemplateFromLobbyRequest,
 *   !proto.poker.RemoveTournamentTemplateFromLobbyResponse>}
 */
const methodInfo_Sng_removeTournamentTemplateFromLobby = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.RemoveTournamentTemplateFromLobbyResponse,
  /**
   * @param {!proto.poker.RemoveTournamentTemplateFromLobbyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.RemoveTournamentTemplateFromLobbyResponse.deserializeBinary
);


/**
 * @param {!proto.poker.RemoveTournamentTemplateFromLobbyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.RemoveTournamentTemplateFromLobbyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.RemoveTournamentTemplateFromLobbyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.removeTournamentTemplateFromLobby =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/removeTournamentTemplateFromLobby',
      request,
      metadata || {},
      methodDescriptor_Sng_removeTournamentTemplateFromLobby,
      callback);
};


/**
 * @param {!proto.poker.RemoveTournamentTemplateFromLobbyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.RemoveTournamentTemplateFromLobbyResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.removeTournamentTemplateFromLobby =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/removeTournamentTemplateFromLobby',
      request,
      metadata || {},
      methodDescriptor_Sng_removeTournamentTemplateFromLobby);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.CreateTournamentTemplateRequest,
 *   !proto.poker.CreateTournamentTemplateResponse>}
 */
const methodDescriptor_Sng_createTournamentTemplate = new grpc.web.MethodDescriptor(
  '/poker.Sng/createTournamentTemplate',
  grpc.web.MethodType.UNARY,
  proto.poker.CreateTournamentTemplateRequest,
  proto.poker.CreateTournamentTemplateResponse,
  /**
   * @param {!proto.poker.CreateTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CreateTournamentTemplateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.CreateTournamentTemplateRequest,
 *   !proto.poker.CreateTournamentTemplateResponse>}
 */
const methodInfo_Sng_createTournamentTemplate = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.CreateTournamentTemplateResponse,
  /**
   * @param {!proto.poker.CreateTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CreateTournamentTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.poker.CreateTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.CreateTournamentTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.CreateTournamentTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.createTournamentTemplate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/createTournamentTemplate',
      request,
      metadata || {},
      methodDescriptor_Sng_createTournamentTemplate,
      callback);
};


/**
 * @param {!proto.poker.CreateTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.CreateTournamentTemplateResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.createTournamentTemplate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/createTournamentTemplate',
      request,
      metadata || {},
      methodDescriptor_Sng_createTournamentTemplate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetTournamentTemplateListRequest,
 *   !proto.poker.GetTournamentTemplateListResponse>}
 */
const methodDescriptor_Sng_getTournamentTemplateList = new grpc.web.MethodDescriptor(
  '/poker.Sng/getTournamentTemplateList',
  grpc.web.MethodType.UNARY,
  proto.poker.GetTournamentTemplateListRequest,
  proto.poker.GetTournamentTemplateListResponse,
  /**
   * @param {!proto.poker.GetTournamentTemplateListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetTournamentTemplateListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetTournamentTemplateListRequest,
 *   !proto.poker.GetTournamentTemplateListResponse>}
 */
const methodInfo_Sng_getTournamentTemplateList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetTournamentTemplateListResponse,
  /**
   * @param {!proto.poker.GetTournamentTemplateListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetTournamentTemplateListResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GetTournamentTemplateListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetTournamentTemplateListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetTournamentTemplateListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getTournamentTemplateList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getTournamentTemplateList',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateList,
      callback);
};


/**
 * @param {!proto.poker.GetTournamentTemplateListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetTournamentTemplateListResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getTournamentTemplateList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getTournamentTemplateList',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetLobbyTournamentTemplateListRequest,
 *   !proto.poker.GetLobbyTournamentTemplateListResponse>}
 */
const methodDescriptor_Sng_getLobbyTournamentTemplateList = new grpc.web.MethodDescriptor(
  '/poker.Sng/getLobbyTournamentTemplateList',
  grpc.web.MethodType.UNARY,
  proto.poker.GetLobbyTournamentTemplateListRequest,
  proto.poker.GetLobbyTournamentTemplateListResponse,
  /**
   * @param {!proto.poker.GetLobbyTournamentTemplateListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetLobbyTournamentTemplateListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetLobbyTournamentTemplateListRequest,
 *   !proto.poker.GetLobbyTournamentTemplateListResponse>}
 */
const methodInfo_Sng_getLobbyTournamentTemplateList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetLobbyTournamentTemplateListResponse,
  /**
   * @param {!proto.poker.GetLobbyTournamentTemplateListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetLobbyTournamentTemplateListResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GetLobbyTournamentTemplateListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetLobbyTournamentTemplateListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetLobbyTournamentTemplateListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getLobbyTournamentTemplateList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getLobbyTournamentTemplateList',
      request,
      metadata || {},
      methodDescriptor_Sng_getLobbyTournamentTemplateList,
      callback);
};


/**
 * @param {!proto.poker.GetLobbyTournamentTemplateListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetLobbyTournamentTemplateListResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getLobbyTournamentTemplateList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getLobbyTournamentTemplateList',
      request,
      metadata || {},
      methodDescriptor_Sng_getLobbyTournamentTemplateList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetTournamentTemplateBufferStateRequest,
 *   !proto.poker.GetTournamentTemplateBufferStateResponse>}
 */
const methodDescriptor_Sng_getTournamentTemplateBufferState = new grpc.web.MethodDescriptor(
  '/poker.Sng/getTournamentTemplateBufferState',
  grpc.web.MethodType.UNARY,
  proto.poker.GetTournamentTemplateBufferStateRequest,
  proto.poker.GetTournamentTemplateBufferStateResponse,
  /**
   * @param {!proto.poker.GetTournamentTemplateBufferStateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetTournamentTemplateBufferStateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetTournamentTemplateBufferStateRequest,
 *   !proto.poker.GetTournamentTemplateBufferStateResponse>}
 */
const methodInfo_Sng_getTournamentTemplateBufferState = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetTournamentTemplateBufferStateResponse,
  /**
   * @param {!proto.poker.GetTournamentTemplateBufferStateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetTournamentTemplateBufferStateResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GetTournamentTemplateBufferStateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetTournamentTemplateBufferStateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetTournamentTemplateBufferStateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getTournamentTemplateBufferState =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getTournamentTemplateBufferState',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateBufferState,
      callback);
};


/**
 * @param {!proto.poker.GetTournamentTemplateBufferStateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetTournamentTemplateBufferStateResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getTournamentTemplateBufferState =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getTournamentTemplateBufferState',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateBufferState);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.UnsubscribeFromTournamentTemplateBufferRequest,
 *   !proto.poker.UnsubscribeFromTournamentTemplateBufferResponse>}
 */
const methodDescriptor_Sng_unsubscribeFromTournamentTemplateBuffer = new grpc.web.MethodDescriptor(
  '/poker.Sng/unsubscribeFromTournamentTemplateBuffer',
  grpc.web.MethodType.UNARY,
  proto.poker.UnsubscribeFromTournamentTemplateBufferRequest,
  proto.poker.UnsubscribeFromTournamentTemplateBufferResponse,
  /**
   * @param {!proto.poker.UnsubscribeFromTournamentTemplateBufferRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UnsubscribeFromTournamentTemplateBufferResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.UnsubscribeFromTournamentTemplateBufferRequest,
 *   !proto.poker.UnsubscribeFromTournamentTemplateBufferResponse>}
 */
const methodInfo_Sng_unsubscribeFromTournamentTemplateBuffer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.UnsubscribeFromTournamentTemplateBufferResponse,
  /**
   * @param {!proto.poker.UnsubscribeFromTournamentTemplateBufferRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UnsubscribeFromTournamentTemplateBufferResponse.deserializeBinary
);


/**
 * @param {!proto.poker.UnsubscribeFromTournamentTemplateBufferRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.UnsubscribeFromTournamentTemplateBufferResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.UnsubscribeFromTournamentTemplateBufferResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.unsubscribeFromTournamentTemplateBuffer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/unsubscribeFromTournamentTemplateBuffer',
      request,
      metadata || {},
      methodDescriptor_Sng_unsubscribeFromTournamentTemplateBuffer,
      callback);
};


/**
 * @param {!proto.poker.UnsubscribeFromTournamentTemplateBufferRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.UnsubscribeFromTournamentTemplateBufferResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.unsubscribeFromTournamentTemplateBuffer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/unsubscribeFromTournamentTemplateBuffer',
      request,
      metadata || {},
      methodDescriptor_Sng_unsubscribeFromTournamentTemplateBuffer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.LaunchTournamentRequest,
 *   !proto.poker.LaunchTournamentResponse>}
 */
const methodDescriptor_Sng_launchTournament = new grpc.web.MethodDescriptor(
  '/poker.Sng/launchTournament',
  grpc.web.MethodType.UNARY,
  proto.poker.LaunchTournamentRequest,
  proto.poker.LaunchTournamentResponse,
  /**
   * @param {!proto.poker.LaunchTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.LaunchTournamentResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.LaunchTournamentRequest,
 *   !proto.poker.LaunchTournamentResponse>}
 */
const methodInfo_Sng_launchTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.LaunchTournamentResponse,
  /**
   * @param {!proto.poker.LaunchTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.LaunchTournamentResponse.deserializeBinary
);


/**
 * @param {!proto.poker.LaunchTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.LaunchTournamentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.LaunchTournamentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.launchTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/launchTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_launchTournament,
      callback);
};


/**
 * @param {!proto.poker.LaunchTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.LaunchTournamentResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.launchTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/launchTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_launchTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.SignupRequest,
 *   !proto.poker.SignupResult>}
 */
const methodDescriptor_Sng_Signup = new grpc.web.MethodDescriptor(
  '/poker.Sng/Signup',
  grpc.web.MethodType.UNARY,
  proto.poker.SignupRequest,
  proto.poker.SignupResult,
  /**
   * @param {!proto.poker.SignupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.SignupResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.SignupRequest,
 *   !proto.poker.SignupResult>}
 */
const methodInfo_Sng_Signup = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.SignupResult,
  /**
   * @param {!proto.poker.SignupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.SignupResult.deserializeBinary
);


/**
 * @param {!proto.poker.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.SignupResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.SignupResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.signup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/Signup',
      request,
      metadata || {},
      methodDescriptor_Sng_Signup,
      callback);
};


/**
 * @param {!proto.poker.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.SignupResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.signup =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/Signup',
      request,
      metadata || {},
      methodDescriptor_Sng_Signup);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.LoginRequest,
 *   !proto.poker.LoginResult>}
 */
const methodDescriptor_Sng_Login = new grpc.web.MethodDescriptor(
  '/poker.Sng/Login',
  grpc.web.MethodType.UNARY,
  proto.poker.LoginRequest,
  proto.poker.LoginResult,
  /**
   * @param {!proto.poker.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.LoginResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.LoginRequest,
 *   !proto.poker.LoginResult>}
 */
const methodInfo_Sng_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.LoginResult,
  /**
   * @param {!proto.poker.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.LoginResult.deserializeBinary
);


/**
 * @param {!proto.poker.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.LoginResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.LoginResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/Login',
      request,
      metadata || {},
      methodDescriptor_Sng_Login,
      callback);
};


/**
 * @param {!proto.poker.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.LoginResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/Login',
      request,
      metadata || {},
      methodDescriptor_Sng_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.LogoutRequest,
 *   !proto.poker.LogoutResult>}
 */
const methodDescriptor_Sng_Logout = new grpc.web.MethodDescriptor(
  '/poker.Sng/Logout',
  grpc.web.MethodType.UNARY,
  proto.poker.LogoutRequest,
  proto.poker.LogoutResult,
  /**
   * @param {!proto.poker.LogoutRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.LogoutResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.LogoutRequest,
 *   !proto.poker.LogoutResult>}
 */
const methodInfo_Sng_Logout = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.LogoutResult,
  /**
   * @param {!proto.poker.LogoutRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.LogoutResult.deserializeBinary
);


/**
 * @param {!proto.poker.LogoutRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.LogoutResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.LogoutResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.logout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/Logout',
      request,
      metadata || {},
      methodDescriptor_Sng_Logout,
      callback);
};


/**
 * @param {!proto.poker.LogoutRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.LogoutResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.logout =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/Logout',
      request,
      metadata || {},
      methodDescriptor_Sng_Logout);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.MakeDepositRequest,
 *   !proto.poker.MakeDepositResponse>}
 */
const methodDescriptor_Sng_makeDeposit = new grpc.web.MethodDescriptor(
  '/poker.Sng/makeDeposit',
  grpc.web.MethodType.UNARY,
  proto.poker.MakeDepositRequest,
  proto.poker.MakeDepositResponse,
  /**
   * @param {!proto.poker.MakeDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.MakeDepositResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.MakeDepositRequest,
 *   !proto.poker.MakeDepositResponse>}
 */
const methodInfo_Sng_makeDeposit = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.MakeDepositResponse,
  /**
   * @param {!proto.poker.MakeDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.MakeDepositResponse.deserializeBinary
);


/**
 * @param {!proto.poker.MakeDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.MakeDepositResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.MakeDepositResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.makeDeposit =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/makeDeposit',
      request,
      metadata || {},
      methodDescriptor_Sng_makeDeposit,
      callback);
};


/**
 * @param {!proto.poker.MakeDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.MakeDepositResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.makeDeposit =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/makeDeposit',
      request,
      metadata || {},
      methodDescriptor_Sng_makeDeposit);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.MakeWithdrawalRequest,
 *   !proto.poker.MakeWithdrawalResponse>}
 */
const methodDescriptor_Sng_makeWithdrawal = new grpc.web.MethodDescriptor(
  '/poker.Sng/makeWithdrawal',
  grpc.web.MethodType.UNARY,
  proto.poker.MakeWithdrawalRequest,
  proto.poker.MakeWithdrawalResponse,
  /**
   * @param {!proto.poker.MakeWithdrawalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.MakeWithdrawalResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.MakeWithdrawalRequest,
 *   !proto.poker.MakeWithdrawalResponse>}
 */
const methodInfo_Sng_makeWithdrawal = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.MakeWithdrawalResponse,
  /**
   * @param {!proto.poker.MakeWithdrawalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.MakeWithdrawalResponse.deserializeBinary
);


/**
 * @param {!proto.poker.MakeWithdrawalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.MakeWithdrawalResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.MakeWithdrawalResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.makeWithdrawal =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/makeWithdrawal',
      request,
      metadata || {},
      methodDescriptor_Sng_makeWithdrawal,
      callback);
};


/**
 * @param {!proto.poker.MakeWithdrawalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.MakeWithdrawalResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.makeWithdrawal =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/makeWithdrawal',
      request,
      metadata || {},
      methodDescriptor_Sng_makeWithdrawal);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AccountStatementsRequest,
 *   !proto.poker.AccountStatementsResponse>}
 */
const methodDescriptor_Sng_getAccountStatements = new grpc.web.MethodDescriptor(
  '/poker.Sng/getAccountStatements',
  grpc.web.MethodType.UNARY,
  proto.poker.AccountStatementsRequest,
  proto.poker.AccountStatementsResponse,
  /**
   * @param {!proto.poker.AccountStatementsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.AccountStatementsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AccountStatementsRequest,
 *   !proto.poker.AccountStatementsResponse>}
 */
const methodInfo_Sng_getAccountStatements = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.AccountStatementsResponse,
  /**
   * @param {!proto.poker.AccountStatementsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.AccountStatementsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.AccountStatementsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.AccountStatementsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.AccountStatementsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getAccountStatements =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getAccountStatements',
      request,
      metadata || {},
      methodDescriptor_Sng_getAccountStatements,
      callback);
};


/**
 * @param {!proto.poker.AccountStatementsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.AccountStatementsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getAccountStatements =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getAccountStatements',
      request,
      metadata || {},
      methodDescriptor_Sng_getAccountStatements);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.CaptureDepositRequest,
 *   !proto.poker.CaptureDepositResponse>}
 */
const methodDescriptor_Sng_captureProcessedDeposit = new grpc.web.MethodDescriptor(
  '/poker.Sng/captureProcessedDeposit',
  grpc.web.MethodType.UNARY,
  proto.poker.CaptureDepositRequest,
  proto.poker.CaptureDepositResponse,
  /**
   * @param {!proto.poker.CaptureDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CaptureDepositResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.CaptureDepositRequest,
 *   !proto.poker.CaptureDepositResponse>}
 */
const methodInfo_Sng_captureProcessedDeposit = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.CaptureDepositResponse,
  /**
   * @param {!proto.poker.CaptureDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CaptureDepositResponse.deserializeBinary
);


/**
 * @param {!proto.poker.CaptureDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.CaptureDepositResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.CaptureDepositResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.captureProcessedDeposit =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/captureProcessedDeposit',
      request,
      metadata || {},
      methodDescriptor_Sng_captureProcessedDeposit,
      callback);
};


/**
 * @param {!proto.poker.CaptureDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.CaptureDepositResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.captureProcessedDeposit =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/captureProcessedDeposit',
      request,
      metadata || {},
      methodDescriptor_Sng_captureProcessedDeposit);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.CaptureWithdrawalRequest,
 *   !proto.poker.CaptureWithdrawalResponse>}
 */
const methodDescriptor_Sng_captureProcessedWithdrawal = new grpc.web.MethodDescriptor(
  '/poker.Sng/captureProcessedWithdrawal',
  grpc.web.MethodType.UNARY,
  proto.poker.CaptureWithdrawalRequest,
  proto.poker.CaptureWithdrawalResponse,
  /**
   * @param {!proto.poker.CaptureWithdrawalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CaptureWithdrawalResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.CaptureWithdrawalRequest,
 *   !proto.poker.CaptureWithdrawalResponse>}
 */
const methodInfo_Sng_captureProcessedWithdrawal = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.CaptureWithdrawalResponse,
  /**
   * @param {!proto.poker.CaptureWithdrawalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CaptureWithdrawalResponse.deserializeBinary
);


/**
 * @param {!proto.poker.CaptureWithdrawalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.CaptureWithdrawalResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.CaptureWithdrawalResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.captureProcessedWithdrawal =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/captureProcessedWithdrawal',
      request,
      metadata || {},
      methodDescriptor_Sng_captureProcessedWithdrawal,
      callback);
};


/**
 * @param {!proto.poker.CaptureWithdrawalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.CaptureWithdrawalResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.captureProcessedWithdrawal =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/captureProcessedWithdrawal',
      request,
      metadata || {},
      methodDescriptor_Sng_captureProcessedWithdrawal);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AddPayoutStructureRequest,
 *   !proto.poker.AddPayoutStructureResponse>}
 */
const methodDescriptor_Sng_addPayoutStructure = new grpc.web.MethodDescriptor(
  '/poker.Sng/addPayoutStructure',
  grpc.web.MethodType.UNARY,
  proto.poker.AddPayoutStructureRequest,
  proto.poker.AddPayoutStructureResponse,
  /**
   * @param {!proto.poker.AddPayoutStructureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.AddPayoutStructureResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AddPayoutStructureRequest,
 *   !proto.poker.AddPayoutStructureResponse>}
 */
const methodInfo_Sng_addPayoutStructure = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.AddPayoutStructureResponse,
  /**
   * @param {!proto.poker.AddPayoutStructureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.AddPayoutStructureResponse.deserializeBinary
);


/**
 * @param {!proto.poker.AddPayoutStructureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.AddPayoutStructureResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.AddPayoutStructureResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.addPayoutStructure =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/addPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_addPayoutStructure,
      callback);
};


/**
 * @param {!proto.poker.AddPayoutStructureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.AddPayoutStructureResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.addPayoutStructure =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/addPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_addPayoutStructure);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetPayoutStructureRequest,
 *   !proto.poker.GetPayoutStructureResponse>}
 */
const methodDescriptor_Sng_getPayoutStructure = new grpc.web.MethodDescriptor(
  '/poker.Sng/getPayoutStructure',
  grpc.web.MethodType.UNARY,
  proto.poker.GetPayoutStructureRequest,
  proto.poker.GetPayoutStructureResponse,
  /**
   * @param {!proto.poker.GetPayoutStructureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetPayoutStructureResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetPayoutStructureRequest,
 *   !proto.poker.GetPayoutStructureResponse>}
 */
const methodInfo_Sng_getPayoutStructure = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetPayoutStructureResponse,
  /**
   * @param {!proto.poker.GetPayoutStructureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetPayoutStructureResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GetPayoutStructureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetPayoutStructureResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetPayoutStructureResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getPayoutStructure =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_getPayoutStructure,
      callback);
};


/**
 * @param {!proto.poker.GetPayoutStructureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetPayoutStructureResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getPayoutStructure =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_getPayoutStructure);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ChangePasswordRequest,
 *   !proto.poker.ChangePasswordResponse>}
 */
const methodDescriptor_Sng_changePassword = new grpc.web.MethodDescriptor(
  '/poker.Sng/changePassword',
  grpc.web.MethodType.UNARY,
  proto.poker.ChangePasswordRequest,
  proto.poker.ChangePasswordResponse,
  /**
   * @param {!proto.poker.ChangePasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ChangePasswordResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ChangePasswordRequest,
 *   !proto.poker.ChangePasswordResponse>}
 */
const methodInfo_Sng_changePassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.ChangePasswordResponse,
  /**
   * @param {!proto.poker.ChangePasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ChangePasswordResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.ChangePasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.ChangePasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.changePassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/changePassword',
      request,
      metadata || {},
      methodDescriptor_Sng_changePassword,
      callback);
};


/**
 * @param {!proto.poker.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.ChangePasswordResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.changePassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/changePassword',
      request,
      metadata || {},
      methodDescriptor_Sng_changePassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ClientTokenRequest,
 *   !proto.poker.ClientTokenResponse>}
 */
const methodDescriptor_Sng_getClientToken = new grpc.web.MethodDescriptor(
  '/poker.Sng/getClientToken',
  grpc.web.MethodType.UNARY,
  proto.poker.ClientTokenRequest,
  proto.poker.ClientTokenResponse,
  /**
   * @param {!proto.poker.ClientTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ClientTokenResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ClientTokenRequest,
 *   !proto.poker.ClientTokenResponse>}
 */
const methodInfo_Sng_getClientToken = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.ClientTokenResponse,
  /**
   * @param {!proto.poker.ClientTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ClientTokenResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ClientTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.ClientTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.ClientTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getClientToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getClientToken',
      request,
      metadata || {},
      methodDescriptor_Sng_getClientToken,
      callback);
};


/**
 * @param {!proto.poker.ClientTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.ClientTokenResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getClientToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getClientToken',
      request,
      metadata || {},
      methodDescriptor_Sng_getClientToken);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.VaultPaymentMethodRequest,
 *   !proto.poker.VaultPaymentMethodResponse>}
 */
const methodDescriptor_Sng_vaultPaymentMethod = new grpc.web.MethodDescriptor(
  '/poker.Sng/vaultPaymentMethod',
  grpc.web.MethodType.UNARY,
  proto.poker.VaultPaymentMethodRequest,
  proto.poker.VaultPaymentMethodResponse,
  /**
   * @param {!proto.poker.VaultPaymentMethodRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.VaultPaymentMethodResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.VaultPaymentMethodRequest,
 *   !proto.poker.VaultPaymentMethodResponse>}
 */
const methodInfo_Sng_vaultPaymentMethod = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.VaultPaymentMethodResponse,
  /**
   * @param {!proto.poker.VaultPaymentMethodRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.VaultPaymentMethodResponse.deserializeBinary
);


/**
 * @param {!proto.poker.VaultPaymentMethodRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.VaultPaymentMethodResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.VaultPaymentMethodResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.vaultPaymentMethod =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/vaultPaymentMethod',
      request,
      metadata || {},
      methodDescriptor_Sng_vaultPaymentMethod,
      callback);
};


/**
 * @param {!proto.poker.VaultPaymentMethodRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.VaultPaymentMethodResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.vaultPaymentMethod =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/vaultPaymentMethod',
      request,
      metadata || {},
      methodDescriptor_Sng_vaultPaymentMethod);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.SignupRequest,
 *   !proto.poker.SignupResult>}
 */
const methodDescriptor_Sng_validateExperian = new grpc.web.MethodDescriptor(
  '/poker.Sng/validateExperian',
  grpc.web.MethodType.UNARY,
  proto.poker.SignupRequest,
  proto.poker.SignupResult,
  /**
   * @param {!proto.poker.SignupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.SignupResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.SignupRequest,
 *   !proto.poker.SignupResult>}
 */
const methodInfo_Sng_validateExperian = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.SignupResult,
  /**
   * @param {!proto.poker.SignupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.SignupResult.deserializeBinary
);


/**
 * @param {!proto.poker.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.SignupResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.SignupResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.validateExperian =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/validateExperian',
      request,
      metadata || {},
      methodDescriptor_Sng_validateExperian,
      callback);
};


/**
 * @param {!proto.poker.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.SignupResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.validateExperian =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/validateExperian',
      request,
      metadata || {},
      methodDescriptor_Sng_validateExperian);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetUserByEmailRequest,
 *   !proto.poker.GetUserByEmailResponse>}
 */
const methodDescriptor_Sng_GetUserByEmail = new grpc.web.MethodDescriptor(
  '/poker.Sng/GetUserByEmail',
  grpc.web.MethodType.UNARY,
  proto.poker.GetUserByEmailRequest,
  proto.poker.GetUserByEmailResponse,
  /**
   * @param {!proto.poker.GetUserByEmailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetUserByEmailResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetUserByEmailRequest,
 *   !proto.poker.GetUserByEmailResponse>}
 */
const methodInfo_Sng_GetUserByEmail = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetUserByEmailResponse,
  /**
   * @param {!proto.poker.GetUserByEmailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetUserByEmailResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GetUserByEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetUserByEmailResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetUserByEmailResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getUserByEmail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/GetUserByEmail',
      request,
      metadata || {},
      methodDescriptor_Sng_GetUserByEmail,
      callback);
};


/**
 * @param {!proto.poker.GetUserByEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetUserByEmailResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getUserByEmail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/GetUserByEmail',
      request,
      metadata || {},
      methodDescriptor_Sng_GetUserByEmail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.MakeSngWithRandomUsersRequest,
 *   !proto.poker.GetStatusResult>}
 */
const methodDescriptor_Sng_MakeSngWithRandomUsers = new grpc.web.MethodDescriptor(
  '/poker.Sng/MakeSngWithRandomUsers',
  grpc.web.MethodType.UNARY,
  proto.poker.MakeSngWithRandomUsersRequest,
  proto.poker.GetStatusResult,
  /**
   * @param {!proto.poker.MakeSngWithRandomUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.MakeSngWithRandomUsersRequest,
 *   !proto.poker.GetStatusResult>}
 */
const methodInfo_Sng_MakeSngWithRandomUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetStatusResult,
  /**
   * @param {!proto.poker.MakeSngWithRandomUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetStatusResult.deserializeBinary
);


/**
 * @param {!proto.poker.MakeSngWithRandomUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.makeSngWithRandomUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/MakeSngWithRandomUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_MakeSngWithRandomUsers,
      callback);
};


/**
 * @param {!proto.poker.MakeSngWithRandomUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetStatusResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.makeSngWithRandomUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/MakeSngWithRandomUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_MakeSngWithRandomUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetRankingsRequest,
 *   !proto.poker.GetRankingsResult>}
 */
const methodDescriptor_Sng_GetRankings = new grpc.web.MethodDescriptor(
  '/poker.Sng/GetRankings',
  grpc.web.MethodType.UNARY,
  proto.poker.GetRankingsRequest,
  proto.poker.GetRankingsResult,
  /**
   * @param {!proto.poker.GetRankingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetRankingsResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetRankingsRequest,
 *   !proto.poker.GetRankingsResult>}
 */
const methodInfo_Sng_GetRankings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetRankingsResult,
  /**
   * @param {!proto.poker.GetRankingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetRankingsResult.deserializeBinary
);


/**
 * @param {!proto.poker.GetRankingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetRankingsResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetRankingsResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getRankings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/GetRankings',
      request,
      metadata || {},
      methodDescriptor_Sng_GetRankings,
      callback);
};


/**
 * @param {!proto.poker.GetRankingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetRankingsResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getRankings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/GetRankings',
      request,
      metadata || {},
      methodDescriptor_Sng_GetRankings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.TableSubscribeRequest,
 *   !proto.poker.TableSubscribeResponse>}
 */
const methodDescriptor_Sng_TableSubscribe = new grpc.web.MethodDescriptor(
  '/poker.Sng/TableSubscribe',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.poker.TableSubscribeRequest,
  proto.poker.TableSubscribeResponse,
  /**
   * @param {!proto.poker.TableSubscribeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.TableSubscribeResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.TableSubscribeRequest,
 *   !proto.poker.TableSubscribeResponse>}
 */
const methodInfo_Sng_TableSubscribe = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.TableSubscribeResponse,
  /**
   * @param {!proto.poker.TableSubscribeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.TableSubscribeResponse.deserializeBinary
);


/**
 * @param {!proto.poker.TableSubscribeRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.poker.TableSubscribeResponse>}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.tableSubscribe =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/poker.Sng/TableSubscribe',
      request,
      metadata || {},
      methodDescriptor_Sng_TableSubscribe);
};


/**
 * @param {!proto.poker.TableSubscribeRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.poker.TableSubscribeResponse>}
 *     The XHR Node Readable Stream
 */
proto.poker.SngPromiseClient.prototype.tableSubscribe =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/poker.Sng/TableSubscribe',
      request,
      metadata || {},
      methodDescriptor_Sng_TableSubscribe);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeolocationRequest,
 *   !proto.poker.GeolocationResult>}
 */
const methodDescriptor_Sng_sendGeolocationData = new grpc.web.MethodDescriptor(
  '/poker.Sng/sendGeolocationData',
  grpc.web.MethodType.UNARY,
  proto.poker.GeolocationRequest,
  proto.poker.GeolocationResult,
  /**
   * @param {!proto.poker.GeolocationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeolocationResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeolocationRequest,
 *   !proto.poker.GeolocationResult>}
 */
const methodInfo_Sng_sendGeolocationData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeolocationResult,
  /**
   * @param {!proto.poker.GeolocationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeolocationResult.deserializeBinary
);


/**
 * @param {!proto.poker.GeolocationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeolocationResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeolocationResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.sendGeolocationData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/sendGeolocationData',
      request,
      metadata || {},
      methodDescriptor_Sng_sendGeolocationData,
      callback);
};


/**
 * @param {!proto.poker.GeolocationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeolocationResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.sendGeolocationData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/sendGeolocationData',
      request,
      metadata || {},
      methodDescriptor_Sng_sendGeolocationData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.SearchUserRequest,
 *   !proto.poker.SearchUserResult>}
 */
const methodDescriptor_Sng_searchUserByUsername = new grpc.web.MethodDescriptor(
  '/poker.Sng/searchUserByUsername',
  grpc.web.MethodType.UNARY,
  proto.poker.SearchUserRequest,
  proto.poker.SearchUserResult,
  /**
   * @param {!proto.poker.SearchUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.SearchUserResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.SearchUserRequest,
 *   !proto.poker.SearchUserResult>}
 */
const methodInfo_Sng_searchUserByUsername = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.SearchUserResult,
  /**
   * @param {!proto.poker.SearchUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.SearchUserResult.deserializeBinary
);


/**
 * @param {!proto.poker.SearchUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.SearchUserResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.SearchUserResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.searchUserByUsername =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/searchUserByUsername',
      request,
      metadata || {},
      methodDescriptor_Sng_searchUserByUsername,
      callback);
};


/**
 * @param {!proto.poker.SearchUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.SearchUserResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.searchUserByUsername =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/searchUserByUsername',
      request,
      metadata || {},
      methodDescriptor_Sng_searchUserByUsername);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.WhitelistUserRequest,
 *   !proto.poker.WhitelistUserResult>}
 */
const methodDescriptor_Sng_whitelistUser = new grpc.web.MethodDescriptor(
  '/poker.Sng/whitelistUser',
  grpc.web.MethodType.UNARY,
  proto.poker.WhitelistUserRequest,
  proto.poker.WhitelistUserResult,
  /**
   * @param {!proto.poker.WhitelistUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.WhitelistUserResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.WhitelistUserRequest,
 *   !proto.poker.WhitelistUserResult>}
 */
const methodInfo_Sng_whitelistUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.WhitelistUserResult,
  /**
   * @param {!proto.poker.WhitelistUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.WhitelistUserResult.deserializeBinary
);


/**
 * @param {!proto.poker.WhitelistUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.WhitelistUserResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.WhitelistUserResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.whitelistUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/whitelistUser',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistUser,
      callback);
};


/**
 * @param {!proto.poker.WhitelistUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.WhitelistUserResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.whitelistUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/whitelistUser',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AcceptTOSRequest,
 *   !proto.poker.AcceptTOSResult>}
 */
const methodDescriptor_Sng_acceptTOS = new grpc.web.MethodDescriptor(
  '/poker.Sng/acceptTOS',
  grpc.web.MethodType.UNARY,
  proto.poker.AcceptTOSRequest,
  proto.poker.AcceptTOSResult,
  /**
   * @param {!proto.poker.AcceptTOSRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.AcceptTOSResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AcceptTOSRequest,
 *   !proto.poker.AcceptTOSResult>}
 */
const methodInfo_Sng_acceptTOS = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.AcceptTOSResult,
  /**
   * @param {!proto.poker.AcceptTOSRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.AcceptTOSResult.deserializeBinary
);


/**
 * @param {!proto.poker.AcceptTOSRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.AcceptTOSResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.AcceptTOSResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.acceptTOS =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/acceptTOS',
      request,
      metadata || {},
      methodDescriptor_Sng_acceptTOS,
      callback);
};


/**
 * @param {!proto.poker.AcceptTOSRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.AcceptTOSResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.acceptTOS =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/acceptTOS',
      request,
      metadata || {},
      methodDescriptor_Sng_acceptTOS);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AccountUpdatesRequest,
 *   !proto.poker.AccountUpdatesResult>}
 */
const methodDescriptor_Sng_checkForUpdates = new grpc.web.MethodDescriptor(
  '/poker.Sng/checkForUpdates',
  grpc.web.MethodType.UNARY,
  proto.poker.AccountUpdatesRequest,
  proto.poker.AccountUpdatesResult,
  /**
   * @param {!proto.poker.AccountUpdatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.AccountUpdatesResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AccountUpdatesRequest,
 *   !proto.poker.AccountUpdatesResult>}
 */
const methodInfo_Sng_checkForUpdates = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.AccountUpdatesResult,
  /**
   * @param {!proto.poker.AccountUpdatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.AccountUpdatesResult.deserializeBinary
);


/**
 * @param {!proto.poker.AccountUpdatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.AccountUpdatesResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.AccountUpdatesResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.checkForUpdates =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/checkForUpdates',
      request,
      metadata || {},
      methodDescriptor_Sng_checkForUpdates,
      callback);
};


/**
 * @param {!proto.poker.AccountUpdatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.AccountUpdatesResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.checkForUpdates =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/checkForUpdates',
      request,
      metadata || {},
      methodDescriptor_Sng_checkForUpdates);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.WhitelistedUsersRequest,
 *   !proto.poker.WhitelistedUsersResult>}
 */
const methodDescriptor_Sng_getWhitelistedUsers = new grpc.web.MethodDescriptor(
  '/poker.Sng/getWhitelistedUsers',
  grpc.web.MethodType.UNARY,
  proto.poker.WhitelistedUsersRequest,
  proto.poker.WhitelistedUsersResult,
  /**
   * @param {!proto.poker.WhitelistedUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.WhitelistedUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.WhitelistedUsersRequest,
 *   !proto.poker.WhitelistedUsersResult>}
 */
const methodInfo_Sng_getWhitelistedUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.WhitelistedUsersResult,
  /**
   * @param {!proto.poker.WhitelistedUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.WhitelistedUsersResult.deserializeBinary
);


/**
 * @param {!proto.poker.WhitelistedUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.WhitelistedUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.WhitelistedUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getWhitelistedUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getWhitelistedUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedUsers,
      callback);
};


/**
 * @param {!proto.poker.WhitelistedUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.WhitelistedUsersResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getWhitelistedUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getWhitelistedUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.WhitelistUserRequest,
 *   !proto.poker.WhitelistUserResult>}
 */
const methodDescriptor_Sng_removeWhitelistUser = new grpc.web.MethodDescriptor(
  '/poker.Sng/removeWhitelistUser',
  grpc.web.MethodType.UNARY,
  proto.poker.WhitelistUserRequest,
  proto.poker.WhitelistUserResult,
  /**
   * @param {!proto.poker.WhitelistUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.WhitelistUserResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.WhitelistUserRequest,
 *   !proto.poker.WhitelistUserResult>}
 */
const methodInfo_Sng_removeWhitelistUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.WhitelistUserResult,
  /**
   * @param {!proto.poker.WhitelistUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.WhitelistUserResult.deserializeBinary
);


/**
 * @param {!proto.poker.WhitelistUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.WhitelistUserResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.WhitelistUserResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.removeWhitelistUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/removeWhitelistUser',
      request,
      metadata || {},
      methodDescriptor_Sng_removeWhitelistUser,
      callback);
};


/**
 * @param {!proto.poker.WhitelistUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.WhitelistUserResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.removeWhitelistUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/removeWhitelistUser',
      request,
      metadata || {},
      methodDescriptor_Sng_removeWhitelistUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.TournamentDetailsRequest,
 *   !proto.poker.TournamentDetailsResponse>}
 */
const methodDescriptor_Sng_getTournamentDetails = new grpc.web.MethodDescriptor(
  '/poker.Sng/getTournamentDetails',
  grpc.web.MethodType.UNARY,
  proto.poker.TournamentDetailsRequest,
  proto.poker.TournamentDetailsResponse,
  /**
   * @param {!proto.poker.TournamentDetailsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.TournamentDetailsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.TournamentDetailsRequest,
 *   !proto.poker.TournamentDetailsResponse>}
 */
const methodInfo_Sng_getTournamentDetails = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.TournamentDetailsResponse,
  /**
   * @param {!proto.poker.TournamentDetailsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.TournamentDetailsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.TournamentDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.TournamentDetailsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.TournamentDetailsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getTournamentDetails =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getTournamentDetails',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentDetails,
      callback);
};


/**
 * @param {!proto.poker.TournamentDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.TournamentDetailsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getTournamentDetails =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getTournamentDetails',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentDetails);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.PlayerAccountBalanceRequest,
 *   !proto.poker.PlayerAccountBalanceResult>}
 */
const methodDescriptor_Sng_getPlayerAccountBalance = new grpc.web.MethodDescriptor(
  '/poker.Sng/getPlayerAccountBalance',
  grpc.web.MethodType.UNARY,
  proto.poker.PlayerAccountBalanceRequest,
  proto.poker.PlayerAccountBalanceResult,
  /**
   * @param {!proto.poker.PlayerAccountBalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerAccountBalanceResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.PlayerAccountBalanceRequest,
 *   !proto.poker.PlayerAccountBalanceResult>}
 */
const methodInfo_Sng_getPlayerAccountBalance = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.PlayerAccountBalanceResult,
  /**
   * @param {!proto.poker.PlayerAccountBalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerAccountBalanceResult.deserializeBinary
);


/**
 * @param {!proto.poker.PlayerAccountBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.PlayerAccountBalanceResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.PlayerAccountBalanceResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getPlayerAccountBalance =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getPlayerAccountBalance',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerAccountBalance,
      callback);
};


/**
 * @param {!proto.poker.PlayerAccountBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.PlayerAccountBalanceResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getPlayerAccountBalance =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getPlayerAccountBalance',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerAccountBalance);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.NextTournamentRequest,
 *   !proto.poker.NextTournamentResult>}
 */
const methodDescriptor_Sng_getNextTournament = new grpc.web.MethodDescriptor(
  '/poker.Sng/getNextTournament',
  grpc.web.MethodType.UNARY,
  proto.poker.NextTournamentRequest,
  proto.poker.NextTournamentResult,
  /**
   * @param {!proto.poker.NextTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.NextTournamentResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.NextTournamentRequest,
 *   !proto.poker.NextTournamentResult>}
 */
const methodInfo_Sng_getNextTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.NextTournamentResult,
  /**
   * @param {!proto.poker.NextTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.NextTournamentResult.deserializeBinary
);


/**
 * @param {!proto.poker.NextTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.NextTournamentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.NextTournamentResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getNextTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getNextTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_getNextTournament,
      callback);
};


/**
 * @param {!proto.poker.NextTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.NextTournamentResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getNextTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getNextTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_getNextTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.JoinAnyTournamentRequest,
 *   !proto.poker.JoinAnyTournamentResult>}
 */
const methodDescriptor_Sng_joinAnyTournament = new grpc.web.MethodDescriptor(
  '/poker.Sng/joinAnyTournament',
  grpc.web.MethodType.UNARY,
  proto.poker.JoinAnyTournamentRequest,
  proto.poker.JoinAnyTournamentResult,
  /**
   * @param {!proto.poker.JoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.JoinAnyTournamentResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.JoinAnyTournamentRequest,
 *   !proto.poker.JoinAnyTournamentResult>}
 */
const methodInfo_Sng_joinAnyTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.JoinAnyTournamentResult,
  /**
   * @param {!proto.poker.JoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.JoinAnyTournamentResult.deserializeBinary
);


/**
 * @param {!proto.poker.JoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.JoinAnyTournamentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.JoinAnyTournamentResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.joinAnyTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/joinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_joinAnyTournament,
      callback);
};


/**
 * @param {!proto.poker.JoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.JoinAnyTournamentResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.joinAnyTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/joinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_joinAnyTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.UnregisterAnyTournamentRequest,
 *   !proto.poker.UnregisterAnyTournamentResult>}
 */
const methodDescriptor_Sng_unregisterAnyTournament = new grpc.web.MethodDescriptor(
  '/poker.Sng/unregisterAnyTournament',
  grpc.web.MethodType.UNARY,
  proto.poker.UnregisterAnyTournamentRequest,
  proto.poker.UnregisterAnyTournamentResult,
  /**
   * @param {!proto.poker.UnregisterAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UnregisterAnyTournamentResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.UnregisterAnyTournamentRequest,
 *   !proto.poker.UnregisterAnyTournamentResult>}
 */
const methodInfo_Sng_unregisterAnyTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.UnregisterAnyTournamentResult,
  /**
   * @param {!proto.poker.UnregisterAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UnregisterAnyTournamentResult.deserializeBinary
);


/**
 * @param {!proto.poker.UnregisterAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.UnregisterAnyTournamentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.UnregisterAnyTournamentResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.unregisterAnyTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/unregisterAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_unregisterAnyTournament,
      callback);
};


/**
 * @param {!proto.poker.UnregisterAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.UnregisterAnyTournamentResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.unregisterAnyTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/unregisterAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_unregisterAnyTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.JoinAnyTournamentStatusRequest,
 *   !proto.poker.JoinAnyTournamentStatusResult>}
 */
const methodDescriptor_Sng_getJoinAnyTournamentStatus = new grpc.web.MethodDescriptor(
  '/poker.Sng/getJoinAnyTournamentStatus',
  grpc.web.MethodType.UNARY,
  proto.poker.JoinAnyTournamentStatusRequest,
  proto.poker.JoinAnyTournamentStatusResult,
  /**
   * @param {!proto.poker.JoinAnyTournamentStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.JoinAnyTournamentStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.JoinAnyTournamentStatusRequest,
 *   !proto.poker.JoinAnyTournamentStatusResult>}
 */
const methodInfo_Sng_getJoinAnyTournamentStatus = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.JoinAnyTournamentStatusResult,
  /**
   * @param {!proto.poker.JoinAnyTournamentStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.JoinAnyTournamentStatusResult.deserializeBinary
);


/**
 * @param {!proto.poker.JoinAnyTournamentStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.JoinAnyTournamentStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.JoinAnyTournamentStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getJoinAnyTournamentStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getJoinAnyTournamentStatus',
      request,
      metadata || {},
      methodDescriptor_Sng_getJoinAnyTournamentStatus,
      callback);
};


/**
 * @param {!proto.poker.JoinAnyTournamentStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.JoinAnyTournamentStatusResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getJoinAnyTournamentStatus =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getJoinAnyTournamentStatus',
      request,
      metadata || {},
      methodDescriptor_Sng_getJoinAnyTournamentStatus);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ActiveJoinAnyTournamentsRequest,
 *   !proto.poker.ActiveJoinAnyTournamentsResult>}
 */
const methodDescriptor_Sng_getActiveJoinAnyTournaments = new grpc.web.MethodDescriptor(
  '/poker.Sng/getActiveJoinAnyTournaments',
  grpc.web.MethodType.UNARY,
  proto.poker.ActiveJoinAnyTournamentsRequest,
  proto.poker.ActiveJoinAnyTournamentsResult,
  /**
   * @param {!proto.poker.ActiveJoinAnyTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ActiveJoinAnyTournamentsResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ActiveJoinAnyTournamentsRequest,
 *   !proto.poker.ActiveJoinAnyTournamentsResult>}
 */
const methodInfo_Sng_getActiveJoinAnyTournaments = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.ActiveJoinAnyTournamentsResult,
  /**
   * @param {!proto.poker.ActiveJoinAnyTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ActiveJoinAnyTournamentsResult.deserializeBinary
);


/**
 * @param {!proto.poker.ActiveJoinAnyTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.ActiveJoinAnyTournamentsResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.ActiveJoinAnyTournamentsResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getActiveJoinAnyTournaments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getActiveJoinAnyTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getActiveJoinAnyTournaments,
      callback);
};


/**
 * @param {!proto.poker.ActiveJoinAnyTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.ActiveJoinAnyTournamentsResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getActiveJoinAnyTournaments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getActiveJoinAnyTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getActiveJoinAnyTournaments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.JoinAnyUsersListRequest,
 *   !proto.poker.JoinAnyUsersListResult>}
 */
const methodDescriptor_Sng_getJoinAnyUsersList = new grpc.web.MethodDescriptor(
  '/poker.Sng/getJoinAnyUsersList',
  grpc.web.MethodType.UNARY,
  proto.poker.JoinAnyUsersListRequest,
  proto.poker.JoinAnyUsersListResult,
  /**
   * @param {!proto.poker.JoinAnyUsersListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.JoinAnyUsersListResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.JoinAnyUsersListRequest,
 *   !proto.poker.JoinAnyUsersListResult>}
 */
const methodInfo_Sng_getJoinAnyUsersList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.JoinAnyUsersListResult,
  /**
   * @param {!proto.poker.JoinAnyUsersListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.JoinAnyUsersListResult.deserializeBinary
);


/**
 * @param {!proto.poker.JoinAnyUsersListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.JoinAnyUsersListResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.JoinAnyUsersListResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getJoinAnyUsersList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getJoinAnyUsersList',
      request,
      metadata || {},
      methodDescriptor_Sng_getJoinAnyUsersList,
      callback);
};


/**
 * @param {!proto.poker.JoinAnyUsersListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.JoinAnyUsersListResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getJoinAnyUsersList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getJoinAnyUsersList',
      request,
      metadata || {},
      methodDescriptor_Sng_getJoinAnyUsersList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.CancelJoinAnyTournamentRequest,
 *   !proto.poker.CancelJoinAnyTournamentResult>}
 */
const methodDescriptor_Sng_cancelJoinAnyTournament = new grpc.web.MethodDescriptor(
  '/poker.Sng/cancelJoinAnyTournament',
  grpc.web.MethodType.UNARY,
  proto.poker.CancelJoinAnyTournamentRequest,
  proto.poker.CancelJoinAnyTournamentResult,
  /**
   * @param {!proto.poker.CancelJoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CancelJoinAnyTournamentResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.CancelJoinAnyTournamentRequest,
 *   !proto.poker.CancelJoinAnyTournamentResult>}
 */
const methodInfo_Sng_cancelJoinAnyTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.CancelJoinAnyTournamentResult,
  /**
   * @param {!proto.poker.CancelJoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CancelJoinAnyTournamentResult.deserializeBinary
);


/**
 * @param {!proto.poker.CancelJoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.CancelJoinAnyTournamentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.CancelJoinAnyTournamentResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.cancelJoinAnyTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/cancelJoinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyTournament,
      callback);
};


/**
 * @param {!proto.poker.CancelJoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.CancelJoinAnyTournamentResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.cancelJoinAnyTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/cancelJoinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.CancelJoinAnyUsersRequest,
 *   !proto.poker.CancelJoinAnyUsersResult>}
 */
const methodDescriptor_Sng_cancelJoinAnyMultipleUsers = new grpc.web.MethodDescriptor(
  '/poker.Sng/cancelJoinAnyMultipleUsers',
  grpc.web.MethodType.UNARY,
  proto.poker.CancelJoinAnyUsersRequest,
  proto.poker.CancelJoinAnyUsersResult,
  /**
   * @param {!proto.poker.CancelJoinAnyUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CancelJoinAnyUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.CancelJoinAnyUsersRequest,
 *   !proto.poker.CancelJoinAnyUsersResult>}
 */
const methodInfo_Sng_cancelJoinAnyMultipleUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.CancelJoinAnyUsersResult,
  /**
   * @param {!proto.poker.CancelJoinAnyUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CancelJoinAnyUsersResult.deserializeBinary
);


/**
 * @param {!proto.poker.CancelJoinAnyUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.CancelJoinAnyUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.CancelJoinAnyUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.cancelJoinAnyMultipleUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/cancelJoinAnyMultipleUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyMultipleUsers,
      callback);
};


/**
 * @param {!proto.poker.CancelJoinAnyUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.CancelJoinAnyUsersResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.cancelJoinAnyMultipleUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/cancelJoinAnyMultipleUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyMultipleUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.JoinAnyTournamentStatusRequest,
 *   !proto.poker.CancelJoinAnyUsersResult>}
 */
const methodDescriptor_Sng_cancelJoinAnyAllUsers = new grpc.web.MethodDescriptor(
  '/poker.Sng/cancelJoinAnyAllUsers',
  grpc.web.MethodType.UNARY,
  proto.poker.JoinAnyTournamentStatusRequest,
  proto.poker.CancelJoinAnyUsersResult,
  /**
   * @param {!proto.poker.JoinAnyTournamentStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CancelJoinAnyUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.JoinAnyTournamentStatusRequest,
 *   !proto.poker.CancelJoinAnyUsersResult>}
 */
const methodInfo_Sng_cancelJoinAnyAllUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.CancelJoinAnyUsersResult,
  /**
   * @param {!proto.poker.JoinAnyTournamentStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CancelJoinAnyUsersResult.deserializeBinary
);


/**
 * @param {!proto.poker.JoinAnyTournamentStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.CancelJoinAnyUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.CancelJoinAnyUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.cancelJoinAnyAllUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/cancelJoinAnyAllUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyAllUsers,
      callback);
};


/**
 * @param {!proto.poker.JoinAnyTournamentStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.CancelJoinAnyUsersResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.cancelJoinAnyAllUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/cancelJoinAnyAllUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyAllUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.CancelTournamentsRequest,
 *   !proto.poker.CancelTournamentsResponse>}
 */
const methodDescriptor_Sng_cancelTournaments = new grpc.web.MethodDescriptor(
  '/poker.Sng/cancelTournaments',
  grpc.web.MethodType.UNARY,
  proto.poker.CancelTournamentsRequest,
  proto.poker.CancelTournamentsResponse,
  /**
   * @param {!proto.poker.CancelTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CancelTournamentsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.CancelTournamentsRequest,
 *   !proto.poker.CancelTournamentsResponse>}
 */
const methodInfo_Sng_cancelTournaments = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.CancelTournamentsResponse,
  /**
   * @param {!proto.poker.CancelTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CancelTournamentsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.CancelTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.CancelTournamentsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.CancelTournamentsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.cancelTournaments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/cancelTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelTournaments,
      callback);
};


/**
 * @param {!proto.poker.CancelTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.CancelTournamentsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.cancelTournaments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/cancelTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelTournaments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AddonPlayerRequest,
 *   !proto.poker.AddonPlayerResponse>}
 */
const methodDescriptor_Sng_addonPlayer = new grpc.web.MethodDescriptor(
  '/poker.Sng/addonPlayer',
  grpc.web.MethodType.UNARY,
  proto.poker.AddonPlayerRequest,
  proto.poker.AddonPlayerResponse,
  /**
   * @param {!proto.poker.AddonPlayerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.AddonPlayerResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AddonPlayerRequest,
 *   !proto.poker.AddonPlayerResponse>}
 */
const methodInfo_Sng_addonPlayer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.AddonPlayerResponse,
  /**
   * @param {!proto.poker.AddonPlayerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.AddonPlayerResponse.deserializeBinary
);


/**
 * @param {!proto.poker.AddonPlayerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.AddonPlayerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.AddonPlayerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.addonPlayer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/addonPlayer',
      request,
      metadata || {},
      methodDescriptor_Sng_addonPlayer,
      callback);
};


/**
 * @param {!proto.poker.AddonPlayerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.AddonPlayerResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.addonPlayer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/addonPlayer',
      request,
      metadata || {},
      methodDescriptor_Sng_addonPlayer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.PrizeRevealRequest,
 *   !proto.poker.PrizeRevealResponse>}
 */
const methodDescriptor_Sng_setPrizeAsRevealed = new grpc.web.MethodDescriptor(
  '/poker.Sng/setPrizeAsRevealed',
  grpc.web.MethodType.UNARY,
  proto.poker.PrizeRevealRequest,
  proto.poker.PrizeRevealResponse,
  /**
   * @param {!proto.poker.PrizeRevealRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PrizeRevealResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.PrizeRevealRequest,
 *   !proto.poker.PrizeRevealResponse>}
 */
const methodInfo_Sng_setPrizeAsRevealed = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.PrizeRevealResponse,
  /**
   * @param {!proto.poker.PrizeRevealRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PrizeRevealResponse.deserializeBinary
);


/**
 * @param {!proto.poker.PrizeRevealRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.PrizeRevealResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.PrizeRevealResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.setPrizeAsRevealed =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/setPrizeAsRevealed',
      request,
      metadata || {},
      methodDescriptor_Sng_setPrizeAsRevealed,
      callback);
};


/**
 * @param {!proto.poker.PrizeRevealRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.PrizeRevealResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.setPrizeAsRevealed =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/setPrizeAsRevealed',
      request,
      metadata || {},
      methodDescriptor_Sng_setPrizeAsRevealed);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeofenceRequest,
 *   !proto.poker.GeofenceResponse>}
 */
const methodDescriptor_Sng_getGeofenceData = new grpc.web.MethodDescriptor(
  '/poker.Sng/getGeofenceData',
  grpc.web.MethodType.UNARY,
  proto.poker.GeofenceRequest,
  proto.poker.GeofenceResponse,
  /**
   * @param {!proto.poker.GeofenceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeofenceRequest,
 *   !proto.poker.GeofenceResponse>}
 */
const methodInfo_Sng_getGeofenceData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeofenceResponse,
  /**
   * @param {!proto.poker.GeofenceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GeofenceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeofenceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeofenceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getGeofenceData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_getGeofenceData,
      callback);
};


/**
 * @param {!proto.poker.GeofenceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeofenceResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getGeofenceData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_getGeofenceData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeofenceAddRequest,
 *   !proto.poker.GeofenceAddResponse>}
 */
const methodDescriptor_Sng_addGeofenceData = new grpc.web.MethodDescriptor(
  '/poker.Sng/addGeofenceData',
  grpc.web.MethodType.UNARY,
  proto.poker.GeofenceAddRequest,
  proto.poker.GeofenceAddResponse,
  /**
   * @param {!proto.poker.GeofenceAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceAddResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeofenceAddRequest,
 *   !proto.poker.GeofenceAddResponse>}
 */
const methodInfo_Sng_addGeofenceData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeofenceAddResponse,
  /**
   * @param {!proto.poker.GeofenceAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceAddResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GeofenceAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeofenceAddResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeofenceAddResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.addGeofenceData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/addGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_addGeofenceData,
      callback);
};


/**
 * @param {!proto.poker.GeofenceAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeofenceAddResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.addGeofenceData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/addGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_addGeofenceData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeofenceUpdateRequest,
 *   !proto.poker.GeofenceUpdateResponse>}
 */
const methodDescriptor_Sng_updateGeofenceData = new grpc.web.MethodDescriptor(
  '/poker.Sng/updateGeofenceData',
  grpc.web.MethodType.UNARY,
  proto.poker.GeofenceUpdateRequest,
  proto.poker.GeofenceUpdateResponse,
  /**
   * @param {!proto.poker.GeofenceUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceUpdateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeofenceUpdateRequest,
 *   !proto.poker.GeofenceUpdateResponse>}
 */
const methodInfo_Sng_updateGeofenceData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeofenceUpdateResponse,
  /**
   * @param {!proto.poker.GeofenceUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceUpdateResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GeofenceUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeofenceUpdateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeofenceUpdateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.updateGeofenceData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/updateGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateGeofenceData,
      callback);
};


/**
 * @param {!proto.poker.GeofenceUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeofenceUpdateResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.updateGeofenceData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/updateGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateGeofenceData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeofenceRemoveRequest,
 *   !proto.poker.GeofenceRemoveResponse>}
 */
const methodDescriptor_Sng_removeGeofenceData = new grpc.web.MethodDescriptor(
  '/poker.Sng/removeGeofenceData',
  grpc.web.MethodType.UNARY,
  proto.poker.GeofenceRemoveRequest,
  proto.poker.GeofenceRemoveResponse,
  /**
   * @param {!proto.poker.GeofenceRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceRemoveResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeofenceRemoveRequest,
 *   !proto.poker.GeofenceRemoveResponse>}
 */
const methodInfo_Sng_removeGeofenceData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeofenceRemoveResponse,
  /**
   * @param {!proto.poker.GeofenceRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceRemoveResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GeofenceRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeofenceRemoveResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeofenceRemoveResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.removeGeofenceData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/removeGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeGeofenceData,
      callback);
};


/**
 * @param {!proto.poker.GeofenceRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeofenceRemoveResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.removeGeofenceData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/removeGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeGeofenceData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeofenceWhitelistRequest,
 *   !proto.poker.GeofenceWhitelistResponse>}
 */
const methodDescriptor_Sng_whitelistUsersOnGeofence = new grpc.web.MethodDescriptor(
  '/poker.Sng/whitelistUsersOnGeofence',
  grpc.web.MethodType.UNARY,
  proto.poker.GeofenceWhitelistRequest,
  proto.poker.GeofenceWhitelistResponse,
  /**
   * @param {!proto.poker.GeofenceWhitelistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceWhitelistResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeofenceWhitelistRequest,
 *   !proto.poker.GeofenceWhitelistResponse>}
 */
const methodInfo_Sng_whitelistUsersOnGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeofenceWhitelistResponse,
  /**
   * @param {!proto.poker.GeofenceWhitelistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceWhitelistResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GeofenceWhitelistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeofenceWhitelistResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeofenceWhitelistResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.whitelistUsersOnGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/whitelistUsersOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistUsersOnGeofence,
      callback);
};


/**
 * @param {!proto.poker.GeofenceWhitelistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeofenceWhitelistResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.whitelistUsersOnGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/whitelistUsersOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistUsersOnGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeofenceBlacklistRequest,
 *   !proto.poker.GeofenceBlacklistResponse>}
 */
const methodDescriptor_Sng_blacklistUsersOnGeofence = new grpc.web.MethodDescriptor(
  '/poker.Sng/blacklistUsersOnGeofence',
  grpc.web.MethodType.UNARY,
  proto.poker.GeofenceBlacklistRequest,
  proto.poker.GeofenceBlacklistResponse,
  /**
   * @param {!proto.poker.GeofenceBlacklistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceBlacklistResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeofenceBlacklistRequest,
 *   !proto.poker.GeofenceBlacklistResponse>}
 */
const methodInfo_Sng_blacklistUsersOnGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeofenceBlacklistResponse,
  /**
   * @param {!proto.poker.GeofenceBlacklistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceBlacklistResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GeofenceBlacklistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeofenceBlacklistResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeofenceBlacklistResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.blacklistUsersOnGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/blacklistUsersOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_blacklistUsersOnGeofence,
      callback);
};


/**
 * @param {!proto.poker.GeofenceBlacklistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeofenceBlacklistResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.blacklistUsersOnGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/blacklistUsersOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_blacklistUsersOnGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeofenceWhitelistRequest,
 *   !proto.poker.GeofenceWhitelistResponse>}
 */
const methodDescriptor_Sng_whitelistClientsOnGeofence = new grpc.web.MethodDescriptor(
  '/poker.Sng/whitelistClientsOnGeofence',
  grpc.web.MethodType.UNARY,
  proto.poker.GeofenceWhitelistRequest,
  proto.poker.GeofenceWhitelistResponse,
  /**
   * @param {!proto.poker.GeofenceWhitelistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceWhitelistResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeofenceWhitelistRequest,
 *   !proto.poker.GeofenceWhitelistResponse>}
 */
const methodInfo_Sng_whitelistClientsOnGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeofenceWhitelistResponse,
  /**
   * @param {!proto.poker.GeofenceWhitelistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceWhitelistResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GeofenceWhitelistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeofenceWhitelistResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeofenceWhitelistResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.whitelistClientsOnGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/whitelistClientsOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistClientsOnGeofence,
      callback);
};


/**
 * @param {!proto.poker.GeofenceWhitelistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeofenceWhitelistResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.whitelistClientsOnGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/whitelistClientsOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistClientsOnGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeofenceBlacklistRequest,
 *   !proto.poker.GeofenceBlacklistResponse>}
 */
const methodDescriptor_Sng_blacklistClientsOnGeofence = new grpc.web.MethodDescriptor(
  '/poker.Sng/blacklistClientsOnGeofence',
  grpc.web.MethodType.UNARY,
  proto.poker.GeofenceBlacklistRequest,
  proto.poker.GeofenceBlacklistResponse,
  /**
   * @param {!proto.poker.GeofenceBlacklistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceBlacklistResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeofenceBlacklistRequest,
 *   !proto.poker.GeofenceBlacklistResponse>}
 */
const methodInfo_Sng_blacklistClientsOnGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeofenceBlacklistResponse,
  /**
   * @param {!proto.poker.GeofenceBlacklistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceBlacklistResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GeofenceBlacklistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeofenceBlacklistResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeofenceBlacklistResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.blacklistClientsOnGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/blacklistClientsOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_blacklistClientsOnGeofence,
      callback);
};


/**
 * @param {!proto.poker.GeofenceBlacklistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeofenceBlacklistResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.blacklistClientsOnGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/blacklistClientsOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_blacklistClientsOnGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeofenceUsersRequest,
 *   !proto.poker.GeofenceUsersResponse>}
 */
const methodDescriptor_Sng_getWhitelistedUsersonGeofence = new grpc.web.MethodDescriptor(
  '/poker.Sng/getWhitelistedUsersonGeofence',
  grpc.web.MethodType.UNARY,
  proto.poker.GeofenceUsersRequest,
  proto.poker.GeofenceUsersResponse,
  /**
   * @param {!proto.poker.GeofenceUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceUsersResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeofenceUsersRequest,
 *   !proto.poker.GeofenceUsersResponse>}
 */
const methodInfo_Sng_getWhitelistedUsersonGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeofenceUsersResponse,
  /**
   * @param {!proto.poker.GeofenceUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceUsersResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GeofenceUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeofenceUsersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeofenceUsersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getWhitelistedUsersonGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getWhitelistedUsersonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedUsersonGeofence,
      callback);
};


/**
 * @param {!proto.poker.GeofenceUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeofenceUsersResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getWhitelistedUsersonGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getWhitelistedUsersonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedUsersonGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeofenceUsersRequest,
 *   !proto.poker.GeofenceUsersResponse>}
 */
const methodDescriptor_Sng_getBlacklistedUsersonGeofence = new grpc.web.MethodDescriptor(
  '/poker.Sng/getBlacklistedUsersonGeofence',
  grpc.web.MethodType.UNARY,
  proto.poker.GeofenceUsersRequest,
  proto.poker.GeofenceUsersResponse,
  /**
   * @param {!proto.poker.GeofenceUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceUsersResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeofenceUsersRequest,
 *   !proto.poker.GeofenceUsersResponse>}
 */
const methodInfo_Sng_getBlacklistedUsersonGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeofenceUsersResponse,
  /**
   * @param {!proto.poker.GeofenceUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceUsersResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GeofenceUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeofenceUsersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeofenceUsersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getBlacklistedUsersonGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getBlacklistedUsersonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getBlacklistedUsersonGeofence,
      callback);
};


/**
 * @param {!proto.poker.GeofenceUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeofenceUsersResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getBlacklistedUsersonGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getBlacklistedUsersonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getBlacklistedUsersonGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeofenceGlobalRuleRequest,
 *   !proto.poker.GeofenceGlobalRuleResponse>}
 */
const methodDescriptor_Sng_setGeofenceGlobalRule = new grpc.web.MethodDescriptor(
  '/poker.Sng/setGeofenceGlobalRule',
  grpc.web.MethodType.UNARY,
  proto.poker.GeofenceGlobalRuleRequest,
  proto.poker.GeofenceGlobalRuleResponse,
  /**
   * @param {!proto.poker.GeofenceGlobalRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceGlobalRuleResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeofenceGlobalRuleRequest,
 *   !proto.poker.GeofenceGlobalRuleResponse>}
 */
const methodInfo_Sng_setGeofenceGlobalRule = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeofenceGlobalRuleResponse,
  /**
   * @param {!proto.poker.GeofenceGlobalRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceGlobalRuleResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GeofenceGlobalRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeofenceGlobalRuleResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeofenceGlobalRuleResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.setGeofenceGlobalRule =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/setGeofenceGlobalRule',
      request,
      metadata || {},
      methodDescriptor_Sng_setGeofenceGlobalRule,
      callback);
};


/**
 * @param {!proto.poker.GeofenceGlobalRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeofenceGlobalRuleResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.setGeofenceGlobalRule =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/setGeofenceGlobalRule',
      request,
      metadata || {},
      methodDescriptor_Sng_setGeofenceGlobalRule);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeofenceClientsRequest,
 *   !proto.poker.GeofenceClientsResponse>}
 */
const methodDescriptor_Sng_getWhitelistedClientsonGeofence = new grpc.web.MethodDescriptor(
  '/poker.Sng/getWhitelistedClientsonGeofence',
  grpc.web.MethodType.UNARY,
  proto.poker.GeofenceClientsRequest,
  proto.poker.GeofenceClientsResponse,
  /**
   * @param {!proto.poker.GeofenceClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceClientsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeofenceClientsRequest,
 *   !proto.poker.GeofenceClientsResponse>}
 */
const methodInfo_Sng_getWhitelistedClientsonGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeofenceClientsResponse,
  /**
   * @param {!proto.poker.GeofenceClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceClientsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GeofenceClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeofenceClientsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeofenceClientsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getWhitelistedClientsonGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getWhitelistedClientsonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedClientsonGeofence,
      callback);
};


/**
 * @param {!proto.poker.GeofenceClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeofenceClientsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getWhitelistedClientsonGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getWhitelistedClientsonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedClientsonGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeofenceClientsRequest,
 *   !proto.poker.GeofenceClientsResponse>}
 */
const methodDescriptor_Sng_getBlacklistedClientsonGeofence = new grpc.web.MethodDescriptor(
  '/poker.Sng/getBlacklistedClientsonGeofence',
  grpc.web.MethodType.UNARY,
  proto.poker.GeofenceClientsRequest,
  proto.poker.GeofenceClientsResponse,
  /**
   * @param {!proto.poker.GeofenceClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceClientsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeofenceClientsRequest,
 *   !proto.poker.GeofenceClientsResponse>}
 */
const methodInfo_Sng_getBlacklistedClientsonGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeofenceClientsResponse,
  /**
   * @param {!proto.poker.GeofenceClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceClientsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GeofenceClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeofenceClientsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeofenceClientsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getBlacklistedClientsonGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getBlacklistedClientsonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getBlacklistedClientsonGeofence,
      callback);
};


/**
 * @param {!proto.poker.GeofenceClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeofenceClientsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getBlacklistedClientsonGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getBlacklistedClientsonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getBlacklistedClientsonGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeofenceClientGlobalRuleRequest,
 *   !proto.poker.GeofenceClientGlobalRuleResponse>}
 */
const methodDescriptor_Sng_setGeofenceClientGlobalRule = new grpc.web.MethodDescriptor(
  '/poker.Sng/setGeofenceClientGlobalRule',
  grpc.web.MethodType.UNARY,
  proto.poker.GeofenceClientGlobalRuleRequest,
  proto.poker.GeofenceClientGlobalRuleResponse,
  /**
   * @param {!proto.poker.GeofenceClientGlobalRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceClientGlobalRuleResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeofenceClientGlobalRuleRequest,
 *   !proto.poker.GeofenceClientGlobalRuleResponse>}
 */
const methodInfo_Sng_setGeofenceClientGlobalRule = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeofenceClientGlobalRuleResponse,
  /**
   * @param {!proto.poker.GeofenceClientGlobalRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeofenceClientGlobalRuleResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GeofenceClientGlobalRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeofenceClientGlobalRuleResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeofenceClientGlobalRuleResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.setGeofenceClientGlobalRule =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/setGeofenceClientGlobalRule',
      request,
      metadata || {},
      methodDescriptor_Sng_setGeofenceClientGlobalRule,
      callback);
};


/**
 * @param {!proto.poker.GeofenceClientGlobalRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeofenceClientGlobalRuleResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.setGeofenceClientGlobalRule =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/setGeofenceClientGlobalRule',
      request,
      metadata || {},
      methodDescriptor_Sng_setGeofenceClientGlobalRule);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.WhitelistedClientsRequest,
 *   !proto.poker.WhitelistedClientsResult>}
 */
const methodDescriptor_Sng_getClients = new grpc.web.MethodDescriptor(
  '/poker.Sng/getClients',
  grpc.web.MethodType.UNARY,
  proto.poker.WhitelistedClientsRequest,
  proto.poker.WhitelistedClientsResult,
  /**
   * @param {!proto.poker.WhitelistedClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.WhitelistedClientsResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.WhitelistedClientsRequest,
 *   !proto.poker.WhitelistedClientsResult>}
 */
const methodInfo_Sng_getClients = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.WhitelistedClientsResult,
  /**
   * @param {!proto.poker.WhitelistedClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.WhitelistedClientsResult.deserializeBinary
);


/**
 * @param {!proto.poker.WhitelistedClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.WhitelistedClientsResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.WhitelistedClientsResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getClients =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getClients',
      request,
      metadata || {},
      methodDescriptor_Sng_getClients,
      callback);
};


/**
 * @param {!proto.poker.WhitelistedClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.WhitelistedClientsResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getClients =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getClients',
      request,
      metadata || {},
      methodDescriptor_Sng_getClients);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.UpdateAccountBalanceRequest,
 *   !proto.poker.UpdateAccountBalanceResponse>}
 */
const methodDescriptor_Sng_updatePlayerAccountBalance = new grpc.web.MethodDescriptor(
  '/poker.Sng/updatePlayerAccountBalance',
  grpc.web.MethodType.UNARY,
  proto.poker.UpdateAccountBalanceRequest,
  proto.poker.UpdateAccountBalanceResponse,
  /**
   * @param {!proto.poker.UpdateAccountBalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UpdateAccountBalanceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.UpdateAccountBalanceRequest,
 *   !proto.poker.UpdateAccountBalanceResponse>}
 */
const methodInfo_Sng_updatePlayerAccountBalance = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.UpdateAccountBalanceResponse,
  /**
   * @param {!proto.poker.UpdateAccountBalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UpdateAccountBalanceResponse.deserializeBinary
);


/**
 * @param {!proto.poker.UpdateAccountBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.UpdateAccountBalanceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.UpdateAccountBalanceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.updatePlayerAccountBalance =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/updatePlayerAccountBalance',
      request,
      metadata || {},
      methodDescriptor_Sng_updatePlayerAccountBalance,
      callback);
};


/**
 * @param {!proto.poker.UpdateAccountBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.UpdateAccountBalanceResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.updatePlayerAccountBalance =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/updatePlayerAccountBalance',
      request,
      metadata || {},
      methodDescriptor_Sng_updatePlayerAccountBalance);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.RankHandsRequest,
 *   !proto.poker.RankHandsResult>}
 */
const methodDescriptor_Sng_rankHands = new grpc.web.MethodDescriptor(
  '/poker.Sng/rankHands',
  grpc.web.MethodType.UNARY,
  proto.poker.RankHandsRequest,
  proto.poker.RankHandsResult,
  /**
   * @param {!proto.poker.RankHandsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.RankHandsResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.RankHandsRequest,
 *   !proto.poker.RankHandsResult>}
 */
const methodInfo_Sng_rankHands = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.RankHandsResult,
  /**
   * @param {!proto.poker.RankHandsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.RankHandsResult.deserializeBinary
);


/**
 * @param {!proto.poker.RankHandsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.RankHandsResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.RankHandsResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.rankHands =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/rankHands',
      request,
      metadata || {},
      methodDescriptor_Sng_rankHands,
      callback);
};


/**
 * @param {!proto.poker.RankHandsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.RankHandsResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.rankHands =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/rankHands',
      request,
      metadata || {},
      methodDescriptor_Sng_rankHands);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.NewDeckRequest,
 *   !proto.poker.NewDeckResponse>}
 */
const methodDescriptor_Sng_getShuffledDeck = new grpc.web.MethodDescriptor(
  '/poker.Sng/getShuffledDeck',
  grpc.web.MethodType.UNARY,
  proto.poker.NewDeckRequest,
  proto.poker.NewDeckResponse,
  /**
   * @param {!proto.poker.NewDeckRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.NewDeckResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.NewDeckRequest,
 *   !proto.poker.NewDeckResponse>}
 */
const methodInfo_Sng_getShuffledDeck = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.NewDeckResponse,
  /**
   * @param {!proto.poker.NewDeckRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.NewDeckResponse.deserializeBinary
);


/**
 * @param {!proto.poker.NewDeckRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.NewDeckResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.NewDeckResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getShuffledDeck =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getShuffledDeck',
      request,
      metadata || {},
      methodDescriptor_Sng_getShuffledDeck,
      callback);
};


/**
 * @param {!proto.poker.NewDeckRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.NewDeckResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getShuffledDeck =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getShuffledDeck',
      request,
      metadata || {},
      methodDescriptor_Sng_getShuffledDeck);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetUserInfoRequest,
 *   !proto.poker.GetUserInfoResponse>}
 */
const methodDescriptor_Sng_getUserInfo = new grpc.web.MethodDescriptor(
  '/poker.Sng/getUserInfo',
  grpc.web.MethodType.UNARY,
  proto.poker.GetUserInfoRequest,
  proto.poker.GetUserInfoResponse,
  /**
   * @param {!proto.poker.GetUserInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetUserInfoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetUserInfoRequest,
 *   !proto.poker.GetUserInfoResponse>}
 */
const methodInfo_Sng_getUserInfo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetUserInfoResponse,
  /**
   * @param {!proto.poker.GetUserInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetUserInfoResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GetUserInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetUserInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetUserInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getUserInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getUserInfo',
      request,
      metadata || {},
      methodDescriptor_Sng_getUserInfo,
      callback);
};


/**
 * @param {!proto.poker.GetUserInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetUserInfoResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getUserInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getUserInfo',
      request,
      metadata || {},
      methodDescriptor_Sng_getUserInfo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.UpdateUserInfoRequest,
 *   !proto.poker.UpdateUserInfoResponse>}
 */
const methodDescriptor_Sng_updateUserInfo = new grpc.web.MethodDescriptor(
  '/poker.Sng/updateUserInfo',
  grpc.web.MethodType.UNARY,
  proto.poker.UpdateUserInfoRequest,
  proto.poker.UpdateUserInfoResponse,
  /**
   * @param {!proto.poker.UpdateUserInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UpdateUserInfoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.UpdateUserInfoRequest,
 *   !proto.poker.UpdateUserInfoResponse>}
 */
const methodInfo_Sng_updateUserInfo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.UpdateUserInfoResponse,
  /**
   * @param {!proto.poker.UpdateUserInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UpdateUserInfoResponse.deserializeBinary
);


/**
 * @param {!proto.poker.UpdateUserInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.UpdateUserInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.UpdateUserInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.updateUserInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/updateUserInfo',
      request,
      metadata || {},
      methodDescriptor_Sng_updateUserInfo,
      callback);
};


/**
 * @param {!proto.poker.UpdateUserInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.UpdateUserInfoResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.updateUserInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/updateUserInfo',
      request,
      metadata || {},
      methodDescriptor_Sng_updateUserInfo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GlobalSettingsRequest,
 *   !proto.poker.GlobalSettingsResponse>}
 */
const methodDescriptor_Sng_getGlobalSettings = new grpc.web.MethodDescriptor(
  '/poker.Sng/getGlobalSettings',
  grpc.web.MethodType.UNARY,
  proto.poker.GlobalSettingsRequest,
  proto.poker.GlobalSettingsResponse,
  /**
   * @param {!proto.poker.GlobalSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GlobalSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GlobalSettingsRequest,
 *   !proto.poker.GlobalSettingsResponse>}
 */
const methodInfo_Sng_getGlobalSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GlobalSettingsResponse,
  /**
   * @param {!proto.poker.GlobalSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GlobalSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GlobalSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GlobalSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GlobalSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getGlobalSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getGlobalSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getGlobalSettings,
      callback);
};


/**
 * @param {!proto.poker.GlobalSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GlobalSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getGlobalSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getGlobalSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getGlobalSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GlobalSettingsRequest,
 *   !proto.poker.GlobalSettingsResponse>}
 */
const methodDescriptor_Sng_setGlobalSettings = new grpc.web.MethodDescriptor(
  '/poker.Sng/setGlobalSettings',
  grpc.web.MethodType.UNARY,
  proto.poker.GlobalSettingsRequest,
  proto.poker.GlobalSettingsResponse,
  /**
   * @param {!proto.poker.GlobalSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GlobalSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GlobalSettingsRequest,
 *   !proto.poker.GlobalSettingsResponse>}
 */
const methodInfo_Sng_setGlobalSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GlobalSettingsResponse,
  /**
   * @param {!proto.poker.GlobalSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GlobalSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GlobalSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GlobalSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GlobalSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.setGlobalSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/setGlobalSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_setGlobalSettings,
      callback);
};


/**
 * @param {!proto.poker.GlobalSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GlobalSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.setGlobalSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/setGlobalSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_setGlobalSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetPasswordResetLinkRequest,
 *   !proto.poker.GetPasswordResetLinkResponse>}
 */
const methodDescriptor_Sng_getPasswordResetLink = new grpc.web.MethodDescriptor(
  '/poker.Sng/getPasswordResetLink',
  grpc.web.MethodType.UNARY,
  proto.poker.GetPasswordResetLinkRequest,
  proto.poker.GetPasswordResetLinkResponse,
  /**
   * @param {!proto.poker.GetPasswordResetLinkRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetPasswordResetLinkResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetPasswordResetLinkRequest,
 *   !proto.poker.GetPasswordResetLinkResponse>}
 */
const methodInfo_Sng_getPasswordResetLink = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetPasswordResetLinkResponse,
  /**
   * @param {!proto.poker.GetPasswordResetLinkRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetPasswordResetLinkResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GetPasswordResetLinkRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetPasswordResetLinkResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetPasswordResetLinkResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getPasswordResetLink =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getPasswordResetLink',
      request,
      metadata || {},
      methodDescriptor_Sng_getPasswordResetLink,
      callback);
};


/**
 * @param {!proto.poker.GetPasswordResetLinkRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetPasswordResetLinkResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getPasswordResetLink =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getPasswordResetLink',
      request,
      metadata || {},
      methodDescriptor_Sng_getPasswordResetLink);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.FetchSecurityQuestionsRequest,
 *   !proto.poker.FetchSecurityQuestionsResponse>}
 */
const methodDescriptor_Sng_fetchSecurityQuestions = new grpc.web.MethodDescriptor(
  '/poker.Sng/fetchSecurityQuestions',
  grpc.web.MethodType.UNARY,
  proto.poker.FetchSecurityQuestionsRequest,
  proto.poker.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.poker.FetchSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.FetchSecurityQuestionsRequest,
 *   !proto.poker.FetchSecurityQuestionsResponse>}
 */
const methodInfo_Sng_fetchSecurityQuestions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.poker.FetchSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.FetchSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.FetchSecurityQuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.FetchSecurityQuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.fetchSecurityQuestions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/fetchSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_fetchSecurityQuestions,
      callback);
};


/**
 * @param {!proto.poker.FetchSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.FetchSecurityQuestionsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.fetchSecurityQuestions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/fetchSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_fetchSecurityQuestions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ResetPasswordRequest,
 *   !proto.poker.ResetPasswordResponse>}
 */
const methodDescriptor_Sng_resetPassword = new grpc.web.MethodDescriptor(
  '/poker.Sng/resetPassword',
  grpc.web.MethodType.UNARY,
  proto.poker.ResetPasswordRequest,
  proto.poker.ResetPasswordResponse,
  /**
   * @param {!proto.poker.ResetPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ResetPasswordResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ResetPasswordRequest,
 *   !proto.poker.ResetPasswordResponse>}
 */
const methodInfo_Sng_resetPassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.ResetPasswordResponse,
  /**
   * @param {!proto.poker.ResetPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ResetPasswordResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ResetPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.ResetPasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.ResetPasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.resetPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/resetPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_resetPassword,
      callback);
};


/**
 * @param {!proto.poker.ResetPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.ResetPasswordResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.resetPassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/resetPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_resetPassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.VerifyUserPasswordRequest,
 *   !proto.poker.VerifyUserPasswordResponse>}
 */
const methodDescriptor_Sng_verifyUserPassword = new grpc.web.MethodDescriptor(
  '/poker.Sng/verifyUserPassword',
  grpc.web.MethodType.UNARY,
  proto.poker.VerifyUserPasswordRequest,
  proto.poker.VerifyUserPasswordResponse,
  /**
   * @param {!proto.poker.VerifyUserPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.VerifyUserPasswordResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.VerifyUserPasswordRequest,
 *   !proto.poker.VerifyUserPasswordResponse>}
 */
const methodInfo_Sng_verifyUserPassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.VerifyUserPasswordResponse,
  /**
   * @param {!proto.poker.VerifyUserPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.VerifyUserPasswordResponse.deserializeBinary
);


/**
 * @param {!proto.poker.VerifyUserPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.VerifyUserPasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.VerifyUserPasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.verifyUserPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/verifyUserPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_verifyUserPassword,
      callback);
};


/**
 * @param {!proto.poker.VerifyUserPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.VerifyUserPasswordResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.verifyUserPassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/verifyUserPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_verifyUserPassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.LoginRequest,
 *   !proto.poker.LoginResult>}
 */
const methodDescriptor_Sng_adminLogin = new grpc.web.MethodDescriptor(
  '/poker.Sng/adminLogin',
  grpc.web.MethodType.UNARY,
  proto.poker.LoginRequest,
  proto.poker.LoginResult,
  /**
   * @param {!proto.poker.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.LoginResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.LoginRequest,
 *   !proto.poker.LoginResult>}
 */
const methodInfo_Sng_adminLogin = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.LoginResult,
  /**
   * @param {!proto.poker.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.LoginResult.deserializeBinary
);


/**
 * @param {!proto.poker.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.LoginResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.LoginResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.adminLogin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/adminLogin',
      request,
      metadata || {},
      methodDescriptor_Sng_adminLogin,
      callback);
};


/**
 * @param {!proto.poker.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.LoginResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.adminLogin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/adminLogin',
      request,
      metadata || {},
      methodDescriptor_Sng_adminLogin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ValidateSecurityQuestionsRequest,
 *   !proto.poker.ValidateSecurityQuestionsResponse>}
 */
const methodDescriptor_Sng_validateSecurityQuestionsForLogin = new grpc.web.MethodDescriptor(
  '/poker.Sng/validateSecurityQuestionsForLogin',
  grpc.web.MethodType.UNARY,
  proto.poker.ValidateSecurityQuestionsRequest,
  proto.poker.ValidateSecurityQuestionsResponse,
  /**
   * @param {!proto.poker.ValidateSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ValidateSecurityQuestionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ValidateSecurityQuestionsRequest,
 *   !proto.poker.ValidateSecurityQuestionsResponse>}
 */
const methodInfo_Sng_validateSecurityQuestionsForLogin = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.ValidateSecurityQuestionsResponse,
  /**
   * @param {!proto.poker.ValidateSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ValidateSecurityQuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ValidateSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.ValidateSecurityQuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.ValidateSecurityQuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.validateSecurityQuestionsForLogin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/validateSecurityQuestionsForLogin',
      request,
      metadata || {},
      methodDescriptor_Sng_validateSecurityQuestionsForLogin,
      callback);
};


/**
 * @param {!proto.poker.ValidateSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.ValidateSecurityQuestionsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.validateSecurityQuestionsForLogin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/validateSecurityQuestionsForLogin',
      request,
      metadata || {},
      methodDescriptor_Sng_validateSecurityQuestionsForLogin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.IsEmailAvailableRequest,
 *   !proto.poker.IsEmailAvailableResponse>}
 */
const methodDescriptor_Sng_checkIsEmailAvailable = new grpc.web.MethodDescriptor(
  '/poker.Sng/checkIsEmailAvailable',
  grpc.web.MethodType.UNARY,
  proto.poker.IsEmailAvailableRequest,
  proto.poker.IsEmailAvailableResponse,
  /**
   * @param {!proto.poker.IsEmailAvailableRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.IsEmailAvailableResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.IsEmailAvailableRequest,
 *   !proto.poker.IsEmailAvailableResponse>}
 */
const methodInfo_Sng_checkIsEmailAvailable = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.IsEmailAvailableResponse,
  /**
   * @param {!proto.poker.IsEmailAvailableRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.IsEmailAvailableResponse.deserializeBinary
);


/**
 * @param {!proto.poker.IsEmailAvailableRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.IsEmailAvailableResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.IsEmailAvailableResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.checkIsEmailAvailable =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/checkIsEmailAvailable',
      request,
      metadata || {},
      methodDescriptor_Sng_checkIsEmailAvailable,
      callback);
};


/**
 * @param {!proto.poker.IsEmailAvailableRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.IsEmailAvailableResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.checkIsEmailAvailable =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/checkIsEmailAvailable',
      request,
      metadata || {},
      methodDescriptor_Sng_checkIsEmailAvailable);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.StartTournamentTableInstanceRequest,
 *   !proto.poker.StartTournamentTableInstanceResponse>}
 */
const methodDescriptor_Sng_startTournamentTableInstance = new grpc.web.MethodDescriptor(
  '/poker.Sng/startTournamentTableInstance',
  grpc.web.MethodType.UNARY,
  proto.poker.StartTournamentTableInstanceRequest,
  proto.poker.StartTournamentTableInstanceResponse,
  /**
   * @param {!proto.poker.StartTournamentTableInstanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StartTournamentTableInstanceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.StartTournamentTableInstanceRequest,
 *   !proto.poker.StartTournamentTableInstanceResponse>}
 */
const methodInfo_Sng_startTournamentTableInstance = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.StartTournamentTableInstanceResponse,
  /**
   * @param {!proto.poker.StartTournamentTableInstanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StartTournamentTableInstanceResponse.deserializeBinary
);


/**
 * @param {!proto.poker.StartTournamentTableInstanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.StartTournamentTableInstanceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.StartTournamentTableInstanceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.startTournamentTableInstance =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/startTournamentTableInstance',
      request,
      metadata || {},
      methodDescriptor_Sng_startTournamentTableInstance,
      callback);
};


/**
 * @param {!proto.poker.StartTournamentTableInstanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.StartTournamentTableInstanceResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.startTournamentTableInstance =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/startTournamentTableInstance',
      request,
      metadata || {},
      methodDescriptor_Sng_startTournamentTableInstance);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.TournamentDetailsRequest,
 *   !proto.poker.TournamentPayoutStructureResponse>}
 */
const methodDescriptor_Sng_tournamentPayoutStructure = new grpc.web.MethodDescriptor(
  '/poker.Sng/tournamentPayoutStructure',
  grpc.web.MethodType.UNARY,
  proto.poker.TournamentDetailsRequest,
  proto.poker.TournamentPayoutStructureResponse,
  /**
   * @param {!proto.poker.TournamentDetailsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.TournamentPayoutStructureResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.TournamentDetailsRequest,
 *   !proto.poker.TournamentPayoutStructureResponse>}
 */
const methodInfo_Sng_tournamentPayoutStructure = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.TournamentPayoutStructureResponse,
  /**
   * @param {!proto.poker.TournamentDetailsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.TournamentPayoutStructureResponse.deserializeBinary
);


/**
 * @param {!proto.poker.TournamentDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.TournamentPayoutStructureResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.TournamentPayoutStructureResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.tournamentPayoutStructure =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/tournamentPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_tournamentPayoutStructure,
      callback);
};


/**
 * @param {!proto.poker.TournamentDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.TournamentPayoutStructureResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.tournamentPayoutStructure =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/tournamentPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_tournamentPayoutStructure);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ActiveUsersRequest,
 *   !proto.poker.ActiveUsersResult>}
 */
const methodDescriptor_Sng_getActiveUsers = new grpc.web.MethodDescriptor(
  '/poker.Sng/getActiveUsers',
  grpc.web.MethodType.UNARY,
  proto.poker.ActiveUsersRequest,
  proto.poker.ActiveUsersResult,
  /**
   * @param {!proto.poker.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ActiveUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ActiveUsersRequest,
 *   !proto.poker.ActiveUsersResult>}
 */
const methodInfo_Sng_getActiveUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.ActiveUsersResult,
  /**
   * @param {!proto.poker.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ActiveUsersResult.deserializeBinary
);


/**
 * @param {!proto.poker.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.ActiveUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.ActiveUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getActiveUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getActiveUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_getActiveUsers,
      callback);
};


/**
 * @param {!proto.poker.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.ActiveUsersResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getActiveUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getActiveUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_getActiveUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ClientRequest,
 *   !proto.poker.ClientResponse>}
 */
const methodDescriptor_Sng_getClientData = new grpc.web.MethodDescriptor(
  '/poker.Sng/getClientData',
  grpc.web.MethodType.UNARY,
  proto.poker.ClientRequest,
  proto.poker.ClientResponse,
  /**
   * @param {!proto.poker.ClientRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ClientResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ClientRequest,
 *   !proto.poker.ClientResponse>}
 */
const methodInfo_Sng_getClientData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.ClientResponse,
  /**
   * @param {!proto.poker.ClientRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ClientResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ClientRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.ClientResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.ClientResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getClientData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_getClientData,
      callback);
};


/**
 * @param {!proto.poker.ClientRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.ClientResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getClientData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_getClientData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ClientAddRequest,
 *   !proto.poker.ClientAddResponse>}
 */
const methodDescriptor_Sng_addClientData = new grpc.web.MethodDescriptor(
  '/poker.Sng/addClientData',
  grpc.web.MethodType.UNARY,
  proto.poker.ClientAddRequest,
  proto.poker.ClientAddResponse,
  /**
   * @param {!proto.poker.ClientAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ClientAddResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ClientAddRequest,
 *   !proto.poker.ClientAddResponse>}
 */
const methodInfo_Sng_addClientData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.ClientAddResponse,
  /**
   * @param {!proto.poker.ClientAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ClientAddResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ClientAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.ClientAddResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.ClientAddResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.addClientData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/addClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_addClientData,
      callback);
};


/**
 * @param {!proto.poker.ClientAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.ClientAddResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.addClientData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/addClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_addClientData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ClientUpdateRequest,
 *   !proto.poker.ClientUpdateResponse>}
 */
const methodDescriptor_Sng_updateClientData = new grpc.web.MethodDescriptor(
  '/poker.Sng/updateClientData',
  grpc.web.MethodType.UNARY,
  proto.poker.ClientUpdateRequest,
  proto.poker.ClientUpdateResponse,
  /**
   * @param {!proto.poker.ClientUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ClientUpdateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ClientUpdateRequest,
 *   !proto.poker.ClientUpdateResponse>}
 */
const methodInfo_Sng_updateClientData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.ClientUpdateResponse,
  /**
   * @param {!proto.poker.ClientUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ClientUpdateResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ClientUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.ClientUpdateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.ClientUpdateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.updateClientData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/updateClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateClientData,
      callback);
};


/**
 * @param {!proto.poker.ClientUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.ClientUpdateResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.updateClientData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/updateClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateClientData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ClientRemoveRequest,
 *   !proto.poker.ClientRemoveResponse>}
 */
const methodDescriptor_Sng_removeClientData = new grpc.web.MethodDescriptor(
  '/poker.Sng/removeClientData',
  grpc.web.MethodType.UNARY,
  proto.poker.ClientRemoveRequest,
  proto.poker.ClientRemoveResponse,
  /**
   * @param {!proto.poker.ClientRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ClientRemoveResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ClientRemoveRequest,
 *   !proto.poker.ClientRemoveResponse>}
 */
const methodInfo_Sng_removeClientData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.ClientRemoveResponse,
  /**
   * @param {!proto.poker.ClientRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ClientRemoveResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ClientRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.ClientRemoveResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.ClientRemoveResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.removeClientData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/removeClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeClientData,
      callback);
};


/**
 * @param {!proto.poker.ClientRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.ClientRemoveResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.removeClientData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/removeClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeClientData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ComponentPermissionRequest,
 *   !proto.poker.DataResponse>}
 */
const methodDescriptor_Sng_getComponentPermissionData = new grpc.web.MethodDescriptor(
  '/poker.Sng/getComponentPermissionData',
  grpc.web.MethodType.UNARY,
  proto.poker.ComponentPermissionRequest,
  proto.poker.DataResponse,
  /**
   * @param {!proto.poker.ComponentPermissionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ComponentPermissionRequest,
 *   !proto.poker.DataResponse>}
 */
const methodInfo_Sng_getComponentPermissionData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.DataResponse,
  /**
   * @param {!proto.poker.ComponentPermissionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DataResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ComponentPermissionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getComponentPermissionData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_getComponentPermissionData,
      callback);
};


/**
 * @param {!proto.poker.ComponentPermissionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.DataResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getComponentPermissionData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_getComponentPermissionData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ComponentPermissionAddRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodDescriptor_Sng_addComponentPermissionData = new grpc.web.MethodDescriptor(
  '/poker.Sng/addComponentPermissionData',
  grpc.web.MethodType.UNARY,
  proto.poker.ComponentPermissionAddRequest,
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.ComponentPermissionAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ComponentPermissionAddRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodInfo_Sng_addComponentPermissionData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.ComponentPermissionAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ComponentPermissionAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.addComponentPermissionData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/addComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_addComponentPermissionData,
      callback);
};


/**
 * @param {!proto.poker.ComponentPermissionAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.addComponentPermissionData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/addComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_addComponentPermissionData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ComponentPermissionUpdateRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodDescriptor_Sng_updateComponentPermissionData = new grpc.web.MethodDescriptor(
  '/poker.Sng/updateComponentPermissionData',
  grpc.web.MethodType.UNARY,
  proto.poker.ComponentPermissionUpdateRequest,
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.ComponentPermissionUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ComponentPermissionUpdateRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodInfo_Sng_updateComponentPermissionData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.ComponentPermissionUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ComponentPermissionUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.updateComponentPermissionData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/updateComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateComponentPermissionData,
      callback);
};


/**
 * @param {!proto.poker.ComponentPermissionUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.updateComponentPermissionData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/updateComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateComponentPermissionData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ComponentPermissionRemoveRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodDescriptor_Sng_removeComponentPermissionData = new grpc.web.MethodDescriptor(
  '/poker.Sng/removeComponentPermissionData',
  grpc.web.MethodType.UNARY,
  proto.poker.ComponentPermissionRemoveRequest,
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.ComponentPermissionRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ComponentPermissionRemoveRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodInfo_Sng_removeComponentPermissionData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.ComponentPermissionRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ComponentPermissionRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.removeComponentPermissionData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/removeComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeComponentPermissionData,
      callback);
};


/**
 * @param {!proto.poker.ComponentPermissionRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.removeComponentPermissionData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/removeComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeComponentPermissionData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AdminRoleRequest,
 *   !proto.poker.DataResponse>}
 */
const methodDescriptor_Sng_getAdminRoleData = new grpc.web.MethodDescriptor(
  '/poker.Sng/getAdminRoleData',
  grpc.web.MethodType.UNARY,
  proto.poker.AdminRoleRequest,
  proto.poker.DataResponse,
  /**
   * @param {!proto.poker.AdminRoleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AdminRoleRequest,
 *   !proto.poker.DataResponse>}
 */
const methodInfo_Sng_getAdminRoleData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.DataResponse,
  /**
   * @param {!proto.poker.AdminRoleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DataResponse.deserializeBinary
);


/**
 * @param {!proto.poker.AdminRoleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getAdminRoleData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdminRoleData,
      callback);
};


/**
 * @param {!proto.poker.AdminRoleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.DataResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getAdminRoleData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdminRoleData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AdminRoleAddRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodDescriptor_Sng_addAdminRoleData = new grpc.web.MethodDescriptor(
  '/poker.Sng/addAdminRoleData',
  grpc.web.MethodType.UNARY,
  proto.poker.AdminRoleAddRequest,
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.AdminRoleAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AdminRoleAddRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodInfo_Sng_addAdminRoleData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.AdminRoleAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.AdminRoleAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.addAdminRoleData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/addAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_addAdminRoleData,
      callback);
};


/**
 * @param {!proto.poker.AdminRoleAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.addAdminRoleData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/addAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_addAdminRoleData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AdminRoleUpdateRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodDescriptor_Sng_updateAdminRoleData = new grpc.web.MethodDescriptor(
  '/poker.Sng/updateAdminRoleData',
  grpc.web.MethodType.UNARY,
  proto.poker.AdminRoleUpdateRequest,
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.AdminRoleUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AdminRoleUpdateRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodInfo_Sng_updateAdminRoleData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.AdminRoleUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.AdminRoleUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.updateAdminRoleData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/updateAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateAdminRoleData,
      callback);
};


/**
 * @param {!proto.poker.AdminRoleUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.updateAdminRoleData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/updateAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateAdminRoleData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AdminRoleRemoveRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodDescriptor_Sng_removeAdminRoleData = new grpc.web.MethodDescriptor(
  '/poker.Sng/removeAdminRoleData',
  grpc.web.MethodType.UNARY,
  proto.poker.AdminRoleRemoveRequest,
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.AdminRoleRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AdminRoleRemoveRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodInfo_Sng_removeAdminRoleData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.AdminRoleRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.AdminRoleRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.removeAdminRoleData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/removeAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeAdminRoleData,
      callback);
};


/**
 * @param {!proto.poker.AdminRoleRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.removeAdminRoleData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/removeAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeAdminRoleData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AdminUpdateRequest,
 *   !proto.poker.DataResponse>}
 */
const methodDescriptor_Sng_getAdminRoles = new grpc.web.MethodDescriptor(
  '/poker.Sng/getAdminRoles',
  grpc.web.MethodType.UNARY,
  proto.poker.AdminUpdateRequest,
  proto.poker.DataResponse,
  /**
   * @param {!proto.poker.AdminUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AdminUpdateRequest,
 *   !proto.poker.DataResponse>}
 */
const methodInfo_Sng_getAdminRoles = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.DataResponse,
  /**
   * @param {!proto.poker.AdminUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DataResponse.deserializeBinary
);


/**
 * @param {!proto.poker.AdminUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getAdminRoles =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getAdminRoles',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdminRoles,
      callback);
};


/**
 * @param {!proto.poker.AdminUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.DataResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getAdminRoles =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getAdminRoles',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdminRoles);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AdminRoleRequest,
 *   !proto.poker.DataResponse>}
 */
const methodDescriptor_Sng_getDistinctRole = new grpc.web.MethodDescriptor(
  '/poker.Sng/getDistinctRole',
  grpc.web.MethodType.UNARY,
  proto.poker.AdminRoleRequest,
  proto.poker.DataResponse,
  /**
   * @param {!proto.poker.AdminRoleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AdminRoleRequest,
 *   !proto.poker.DataResponse>}
 */
const methodInfo_Sng_getDistinctRole = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.DataResponse,
  /**
   * @param {!proto.poker.AdminRoleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DataResponse.deserializeBinary
);


/**
 * @param {!proto.poker.AdminRoleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getDistinctRole =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getDistinctRole',
      request,
      metadata || {},
      methodDescriptor_Sng_getDistinctRole,
      callback);
};


/**
 * @param {!proto.poker.AdminRoleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.DataResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getDistinctRole =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getDistinctRole',
      request,
      metadata || {},
      methodDescriptor_Sng_getDistinctRole);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ActiveUsersRequest,
 *   !proto.poker.DataResponse>}
 */
const methodDescriptor_Sng_getAdmins = new grpc.web.MethodDescriptor(
  '/poker.Sng/getAdmins',
  grpc.web.MethodType.UNARY,
  proto.poker.ActiveUsersRequest,
  proto.poker.DataResponse,
  /**
   * @param {!proto.poker.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ActiveUsersRequest,
 *   !proto.poker.DataResponse>}
 */
const methodInfo_Sng_getAdmins = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.DataResponse,
  /**
   * @param {!proto.poker.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DataResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getAdmins =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getAdmins',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdmins,
      callback);
};


/**
 * @param {!proto.poker.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.DataResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getAdmins =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getAdmins',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdmins);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AdminAddRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodDescriptor_Sng_addAdminData = new grpc.web.MethodDescriptor(
  '/poker.Sng/addAdminData',
  grpc.web.MethodType.UNARY,
  proto.poker.AdminAddRequest,
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.AdminAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AdminAddRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodInfo_Sng_addAdminData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.AdminAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.AdminAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.addAdminData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/addAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_addAdminData,
      callback);
};


/**
 * @param {!proto.poker.AdminAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.addAdminData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/addAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_addAdminData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AdminUpdateRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodDescriptor_Sng_updateAdminData = new grpc.web.MethodDescriptor(
  '/poker.Sng/updateAdminData',
  grpc.web.MethodType.UNARY,
  proto.poker.AdminUpdateRequest,
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.AdminUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AdminUpdateRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodInfo_Sng_updateAdminData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.AdminUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.AdminUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.updateAdminData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/updateAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateAdminData,
      callback);
};


/**
 * @param {!proto.poker.AdminUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.updateAdminData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/updateAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateAdminData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AdminRemoveRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodDescriptor_Sng_removeAdminData = new grpc.web.MethodDescriptor(
  '/poker.Sng/removeAdminData',
  grpc.web.MethodType.UNARY,
  proto.poker.AdminRemoveRequest,
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.AdminRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AdminRemoveRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodInfo_Sng_removeAdminData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.AdminRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.AdminRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.removeAdminData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/removeAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeAdminData,
      callback);
};


/**
 * @param {!proto.poker.AdminRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.removeAdminData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/removeAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeAdminData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.poker.FloatResponse>}
 */
const methodDescriptor_Sng_getAmountInplay = new grpc.web.MethodDescriptor(
  '/poker.Sng/getAmountInplay',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.poker.FloatResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.FloatResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.poker.FloatResponse>}
 */
const methodInfo_Sng_getAmountInplay = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.FloatResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.FloatResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.FloatResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.FloatResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getAmountInplay =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getAmountInplay',
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
 * @return {!Promise<!proto.poker.FloatResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getAmountInplay =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getAmountInplay',
      request,
      metadata || {},
      methodDescriptor_Sng_getAmountInplay);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GetTournamentTemplateDetailRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodDescriptor_Sng_removeTournament = new grpc.web.MethodDescriptor(
  '/poker.Sng/removeTournament',
  grpc.web.MethodType.UNARY,
  proto.poker.GetTournamentTemplateDetailRequest,
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.GetTournamentTemplateDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GetTournamentTemplateDetailRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodInfo_Sng_removeTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.GetTournamentTemplateDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GetTournamentTemplateDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.removeTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/removeTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_removeTournament,
      callback);
};


/**
 * @param {!proto.poker.GetTournamentTemplateDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.removeTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/removeTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_removeTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.UpdateTournamentTemplateRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodDescriptor_Sng_updateTournament = new grpc.web.MethodDescriptor(
  '/poker.Sng/updateTournament',
  grpc.web.MethodType.UNARY,
  proto.poker.UpdateTournamentTemplateRequest,
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.UpdateTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.UpdateTournamentTemplateRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodInfo_Sng_updateTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.UpdateTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.UpdateTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.updateTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/updateTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_updateTournament,
      callback);
};


/**
 * @param {!proto.poker.UpdateTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.updateTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/updateTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_updateTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.PlayerTournamentRequest,
 *   !proto.poker.GetTournamentsResponse>}
 */
const methodDescriptor_Sng_getPlayerTournaments = new grpc.web.MethodDescriptor(
  '/poker.Sng/getPlayerTournaments',
  grpc.web.MethodType.UNARY,
  proto.poker.PlayerTournamentRequest,
  proto.poker.GetTournamentsResponse,
  /**
   * @param {!proto.poker.PlayerTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetTournamentsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.PlayerTournamentRequest,
 *   !proto.poker.GetTournamentsResponse>}
 */
const methodInfo_Sng_getPlayerTournaments = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GetTournamentsResponse,
  /**
   * @param {!proto.poker.PlayerTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GetTournamentsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.PlayerTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GetTournamentsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GetTournamentsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getPlayerTournaments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getPlayerTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerTournaments,
      callback);
};


/**
 * @param {!proto.poker.PlayerTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GetTournamentsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getPlayerTournaments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getPlayerTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerTournaments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.SimulateGamesRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodDescriptor_Sng_simulateGames = new grpc.web.MethodDescriptor(
  '/poker.Sng/simulateGames',
  grpc.web.MethodType.UNARY,
  proto.poker.SimulateGamesRequest,
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.SimulateGamesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.SimulateGamesRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodInfo_Sng_simulateGames = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.SimulateGamesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.SimulateGamesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.simulateGames =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/simulateGames',
      request,
      metadata || {},
      methodDescriptor_Sng_simulateGames,
      callback);
};


/**
 * @param {!proto.poker.SimulateGamesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.simulateGames =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/simulateGames',
      request,
      metadata || {},
      methodDescriptor_Sng_simulateGames);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.PendingDepositRequest,
 *   !proto.poker.DataResponse>}
 */
const methodDescriptor_Sng_getPendingRequest = new grpc.web.MethodDescriptor(
  '/poker.Sng/getPendingRequest',
  grpc.web.MethodType.UNARY,
  proto.poker.PendingDepositRequest,
  proto.poker.DataResponse,
  /**
   * @param {!proto.poker.PendingDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.PendingDepositRequest,
 *   !proto.poker.DataResponse>}
 */
const methodInfo_Sng_getPendingRequest = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.DataResponse,
  /**
   * @param {!proto.poker.PendingDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DataResponse.deserializeBinary
);


/**
 * @param {!proto.poker.PendingDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getPendingRequest =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getPendingRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_getPendingRequest,
      callback);
};


/**
 * @param {!proto.poker.PendingDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.DataResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getPendingRequest =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getPendingRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_getPendingRequest);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.PendingDepositRequest,
 *   !proto.poker.DataResponse>}
 */
const methodDescriptor_Sng_getApprovedRequest = new grpc.web.MethodDescriptor(
  '/poker.Sng/getApprovedRequest',
  grpc.web.MethodType.UNARY,
  proto.poker.PendingDepositRequest,
  proto.poker.DataResponse,
  /**
   * @param {!proto.poker.PendingDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.PendingDepositRequest,
 *   !proto.poker.DataResponse>}
 */
const methodInfo_Sng_getApprovedRequest = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.DataResponse,
  /**
   * @param {!proto.poker.PendingDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DataResponse.deserializeBinary
);


/**
 * @param {!proto.poker.PendingDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getApprovedRequest =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getApprovedRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_getApprovedRequest,
      callback);
};


/**
 * @param {!proto.poker.PendingDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.DataResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getApprovedRequest =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getApprovedRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_getApprovedRequest);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.UpdatePendingRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodDescriptor_Sng_actionOnPendingRequest = new grpc.web.MethodDescriptor(
  '/poker.Sng/actionOnPendingRequest',
  grpc.web.MethodType.UNARY,
  proto.poker.UpdatePendingRequest,
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.UpdatePendingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.UpdatePendingRequest,
 *   !proto.poker.StatusResponse>}
 */
const methodInfo_Sng_actionOnPendingRequest = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.StatusResponse,
  /**
   * @param {!proto.poker.UpdatePendingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.UpdatePendingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.actionOnPendingRequest =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/actionOnPendingRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_actionOnPendingRequest,
      callback);
};


/**
 * @param {!proto.poker.UpdatePendingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.actionOnPendingRequest =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/actionOnPendingRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_actionOnPendingRequest);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ActiveUsersRequest,
 *   !proto.poker.ActiveUsersResult>}
 */
const methodDescriptor_Sng_getBotList = new grpc.web.MethodDescriptor(
  '/poker.Sng/getBotList',
  grpc.web.MethodType.UNARY,
  proto.poker.ActiveUsersRequest,
  proto.poker.ActiveUsersResult,
  /**
   * @param {!proto.poker.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ActiveUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ActiveUsersRequest,
 *   !proto.poker.ActiveUsersResult>}
 */
const methodInfo_Sng_getBotList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.ActiveUsersResult,
  /**
   * @param {!proto.poker.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ActiveUsersResult.deserializeBinary
);


/**
 * @param {!proto.poker.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.ActiveUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.ActiveUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getBotList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getBotList',
      request,
      metadata || {},
      methodDescriptor_Sng_getBotList,
      callback);
};


/**
 * @param {!proto.poker.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.ActiveUsersResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getBotList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getBotList',
      request,
      metadata || {},
      methodDescriptor_Sng_getBotList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.CreateMultipleUsersRequest,
 *   !proto.poker.CreateMultipleUsersResult>}
 */
const methodDescriptor_Sng_createMultipleUsers = new grpc.web.MethodDescriptor(
  '/poker.Sng/createMultipleUsers',
  grpc.web.MethodType.UNARY,
  proto.poker.CreateMultipleUsersRequest,
  proto.poker.CreateMultipleUsersResult,
  /**
   * @param {!proto.poker.CreateMultipleUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CreateMultipleUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.CreateMultipleUsersRequest,
 *   !proto.poker.CreateMultipleUsersResult>}
 */
const methodInfo_Sng_createMultipleUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.CreateMultipleUsersResult,
  /**
   * @param {!proto.poker.CreateMultipleUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CreateMultipleUsersResult.deserializeBinary
);


/**
 * @param {!proto.poker.CreateMultipleUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.CreateMultipleUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.CreateMultipleUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.createMultipleUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/createMultipleUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_createMultipleUsers,
      callback);
};


/**
 * @param {!proto.poker.CreateMultipleUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.CreateMultipleUsersResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.createMultipleUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/createMultipleUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_createMultipleUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.DeletePrizePoolStatusRequest,
 *   !proto.poker.DeletePrizePoolStatusResponse>}
 */
const methodDescriptor_Sng_deletePrizePoolPayout = new grpc.web.MethodDescriptor(
  '/poker.Sng/deletePrizePoolPayout',
  grpc.web.MethodType.UNARY,
  proto.poker.DeletePrizePoolStatusRequest,
  proto.poker.DeletePrizePoolStatusResponse,
  /**
   * @param {!proto.poker.DeletePrizePoolStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DeletePrizePoolStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.DeletePrizePoolStatusRequest,
 *   !proto.poker.DeletePrizePoolStatusResponse>}
 */
const methodInfo_Sng_deletePrizePoolPayout = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.DeletePrizePoolStatusResponse,
  /**
   * @param {!proto.poker.DeletePrizePoolStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.DeletePrizePoolStatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.DeletePrizePoolStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.DeletePrizePoolStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.DeletePrizePoolStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.deletePrizePoolPayout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/deletePrizePoolPayout',
      request,
      metadata || {},
      methodDescriptor_Sng_deletePrizePoolPayout,
      callback);
};


/**
 * @param {!proto.poker.DeletePrizePoolStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.DeletePrizePoolStatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.deletePrizePoolPayout =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/deletePrizePoolPayout',
      request,
      metadata || {},
      methodDescriptor_Sng_deletePrizePoolPayout);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AdminJoinAnyTournamentRequest,
 *   !proto.poker.JoinAnyTournamentResult>}
 */
const methodDescriptor_Sng_adminJoinAnyTournament = new grpc.web.MethodDescriptor(
  '/poker.Sng/adminJoinAnyTournament',
  grpc.web.MethodType.UNARY,
  proto.poker.AdminJoinAnyTournamentRequest,
  proto.poker.JoinAnyTournamentResult,
  /**
   * @param {!proto.poker.AdminJoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.JoinAnyTournamentResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AdminJoinAnyTournamentRequest,
 *   !proto.poker.JoinAnyTournamentResult>}
 */
const methodInfo_Sng_adminJoinAnyTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.JoinAnyTournamentResult,
  /**
   * @param {!proto.poker.AdminJoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.JoinAnyTournamentResult.deserializeBinary
);


/**
 * @param {!proto.poker.AdminJoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.JoinAnyTournamentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.JoinAnyTournamentResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.adminJoinAnyTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/adminJoinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_adminJoinAnyTournament,
      callback);
};


/**
 * @param {!proto.poker.AdminJoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.JoinAnyTournamentResult>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.adminJoinAnyTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/adminJoinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_adminJoinAnyTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.UiSettingsRequest,
 *   !proto.poker.UiSettingsResponse>}
 */
const methodDescriptor_Sng_getUiSettings = new grpc.web.MethodDescriptor(
  '/poker.Sng/getUiSettings',
  grpc.web.MethodType.UNARY,
  proto.poker.UiSettingsRequest,
  proto.poker.UiSettingsResponse,
  /**
   * @param {!proto.poker.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UiSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.UiSettingsRequest,
 *   !proto.poker.UiSettingsResponse>}
 */
const methodInfo_Sng_getUiSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.UiSettingsResponse,
  /**
   * @param {!proto.poker.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UiSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.UiSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.UiSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getUiSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getUiSettings,
      callback);
};


/**
 * @param {!proto.poker.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.UiSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getUiSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getUiSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.UiSettingsRequest,
 *   !proto.poker.UiSettingsResponse>}
 */
const methodDescriptor_Sng_getAllUiSettings = new grpc.web.MethodDescriptor(
  '/poker.Sng/getAllUiSettings',
  grpc.web.MethodType.UNARY,
  proto.poker.UiSettingsRequest,
  proto.poker.UiSettingsResponse,
  /**
   * @param {!proto.poker.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UiSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.UiSettingsRequest,
 *   !proto.poker.UiSettingsResponse>}
 */
const methodInfo_Sng_getAllUiSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.UiSettingsResponse,
  /**
   * @param {!proto.poker.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UiSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.UiSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.UiSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getAllUiSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getAllUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getAllUiSettings,
      callback);
};


/**
 * @param {!proto.poker.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.UiSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getAllUiSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getAllUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getAllUiSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AllUiSettingsRequest,
 *   !proto.poker.UiSettingsResponse>}
 */
const methodDescriptor_Sng_setUiSettings = new grpc.web.MethodDescriptor(
  '/poker.Sng/setUiSettings',
  grpc.web.MethodType.UNARY,
  proto.poker.AllUiSettingsRequest,
  proto.poker.UiSettingsResponse,
  /**
   * @param {!proto.poker.AllUiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UiSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AllUiSettingsRequest,
 *   !proto.poker.UiSettingsResponse>}
 */
const methodInfo_Sng_setUiSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.UiSettingsResponse,
  /**
   * @param {!proto.poker.AllUiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UiSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.AllUiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.UiSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.UiSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.setUiSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/setUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_setUiSettings,
      callback);
};


/**
 * @param {!proto.poker.AllUiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.UiSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.setUiSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/setUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_setUiSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.UiSettingsRequest,
 *   !proto.poker.UiSettingsResponse>}
 */
const methodDescriptor_Sng_deleteUiSettings = new grpc.web.MethodDescriptor(
  '/poker.Sng/deleteUiSettings',
  grpc.web.MethodType.UNARY,
  proto.poker.UiSettingsRequest,
  proto.poker.UiSettingsResponse,
  /**
   * @param {!proto.poker.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UiSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.UiSettingsRequest,
 *   !proto.poker.UiSettingsResponse>}
 */
const methodInfo_Sng_deleteUiSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.UiSettingsResponse,
  /**
   * @param {!proto.poker.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UiSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.UiSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.UiSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.deleteUiSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/deleteUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_deleteUiSettings,
      callback);
};


/**
 * @param {!proto.poker.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.UiSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.deleteUiSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/deleteUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_deleteUiSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ThemesRequest,
 *   !proto.poker.ThemesResponse>}
 */
const methodDescriptor_Sng_getThemes = new grpc.web.MethodDescriptor(
  '/poker.Sng/getThemes',
  grpc.web.MethodType.UNARY,
  proto.poker.ThemesRequest,
  proto.poker.ThemesResponse,
  /**
   * @param {!proto.poker.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ThemesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ThemesRequest,
 *   !proto.poker.ThemesResponse>}
 */
const methodInfo_Sng_getThemes = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.ThemesResponse,
  /**
   * @param {!proto.poker.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ThemesResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.ThemesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.ThemesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getThemes =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getThemes',
      request,
      metadata || {},
      methodDescriptor_Sng_getThemes,
      callback);
};


/**
 * @param {!proto.poker.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.ThemesResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getThemes =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getThemes',
      request,
      metadata || {},
      methodDescriptor_Sng_getThemes);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ThemesRequest,
 *   !proto.poker.ThemesResponse>}
 */
const methodDescriptor_Sng_setTheme = new grpc.web.MethodDescriptor(
  '/poker.Sng/setTheme',
  grpc.web.MethodType.UNARY,
  proto.poker.ThemesRequest,
  proto.poker.ThemesResponse,
  /**
   * @param {!proto.poker.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ThemesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ThemesRequest,
 *   !proto.poker.ThemesResponse>}
 */
const methodInfo_Sng_setTheme = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.ThemesResponse,
  /**
   * @param {!proto.poker.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ThemesResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.ThemesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.ThemesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.setTheme =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/setTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_setTheme,
      callback);
};


/**
 * @param {!proto.poker.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.ThemesResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.setTheme =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/setTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_setTheme);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.EditThemesRequest,
 *   !proto.poker.ThemesResponse>}
 */
const methodDescriptor_Sng_editTheme = new grpc.web.MethodDescriptor(
  '/poker.Sng/editTheme',
  grpc.web.MethodType.UNARY,
  proto.poker.EditThemesRequest,
  proto.poker.ThemesResponse,
  /**
   * @param {!proto.poker.EditThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ThemesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.EditThemesRequest,
 *   !proto.poker.ThemesResponse>}
 */
const methodInfo_Sng_editTheme = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.ThemesResponse,
  /**
   * @param {!proto.poker.EditThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ThemesResponse.deserializeBinary
);


/**
 * @param {!proto.poker.EditThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.ThemesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.ThemesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.editTheme =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/editTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_editTheme,
      callback);
};


/**
 * @param {!proto.poker.EditThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.ThemesResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.editTheme =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/editTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_editTheme);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.ThemesRequest,
 *   !proto.poker.ThemesResponse>}
 */
const methodDescriptor_Sng_deleteTheme = new grpc.web.MethodDescriptor(
  '/poker.Sng/deleteTheme',
  grpc.web.MethodType.UNARY,
  proto.poker.ThemesRequest,
  proto.poker.ThemesResponse,
  /**
   * @param {!proto.poker.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ThemesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.ThemesRequest,
 *   !proto.poker.ThemesResponse>}
 */
const methodInfo_Sng_deleteTheme = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.ThemesResponse,
  /**
   * @param {!proto.poker.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.ThemesResponse.deserializeBinary
);


/**
 * @param {!proto.poker.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.ThemesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.ThemesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.deleteTheme =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/deleteTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_deleteTheme,
      callback);
};


/**
 * @param {!proto.poker.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.ThemesResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.deleteTheme =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/deleteTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_deleteTheme);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.GeopollRequest,
 *   !proto.poker.GeopollResponse>}
 */
const methodDescriptor_Sng_getGeopoll = new grpc.web.MethodDescriptor(
  '/poker.Sng/getGeopoll',
  grpc.web.MethodType.UNARY,
  proto.poker.GeopollRequest,
  proto.poker.GeopollResponse,
  /**
   * @param {!proto.poker.GeopollRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeopollResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.GeopollRequest,
 *   !proto.poker.GeopollResponse>}
 */
const methodInfo_Sng_getGeopoll = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.GeopollResponse,
  /**
   * @param {!proto.poker.GeopollRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.GeopollResponse.deserializeBinary
);


/**
 * @param {!proto.poker.GeopollRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.GeopollResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.GeopollResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getGeopoll =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getGeopoll',
      request,
      metadata || {},
      methodDescriptor_Sng_getGeopoll,
      callback);
};


/**
 * @param {!proto.poker.GeopollRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.GeopollResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getGeopoll =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getGeopoll',
      request,
      metadata || {},
      methodDescriptor_Sng_getGeopoll);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.UpdateSecurityQuestionsRequest,
 *   !proto.poker.UpdateSecurityQuestionsResponse>}
 */
const methodDescriptor_Sng_updateSecurityQuestions = new grpc.web.MethodDescriptor(
  '/poker.Sng/updateSecurityQuestions',
  grpc.web.MethodType.UNARY,
  proto.poker.UpdateSecurityQuestionsRequest,
  proto.poker.UpdateSecurityQuestionsResponse,
  /**
   * @param {!proto.poker.UpdateSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UpdateSecurityQuestionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.UpdateSecurityQuestionsRequest,
 *   !proto.poker.UpdateSecurityQuestionsResponse>}
 */
const methodInfo_Sng_updateSecurityQuestions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.UpdateSecurityQuestionsResponse,
  /**
   * @param {!proto.poker.UpdateSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.UpdateSecurityQuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.UpdateSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.UpdateSecurityQuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.UpdateSecurityQuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.updateSecurityQuestions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/updateSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_updateSecurityQuestions,
      callback);
};


/**
 * @param {!proto.poker.UpdateSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.UpdateSecurityQuestionsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.updateSecurityQuestions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/updateSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_updateSecurityQuestions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.FetchSecurityQuestionsResponse,
 *   !proto.poker.FetchSecurityQuestionsResponse>}
 */
const methodDescriptor_Sng_getUserSecurityQuestions = new grpc.web.MethodDescriptor(
  '/poker.Sng/getUserSecurityQuestions',
  grpc.web.MethodType.UNARY,
  proto.poker.FetchSecurityQuestionsResponse,
  proto.poker.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.poker.FetchSecurityQuestionsResponse} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.FetchSecurityQuestionsResponse,
 *   !proto.poker.FetchSecurityQuestionsResponse>}
 */
const methodInfo_Sng_getUserSecurityQuestions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.poker.FetchSecurityQuestionsResponse} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.FetchSecurityQuestionsResponse} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.FetchSecurityQuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.FetchSecurityQuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getUserSecurityQuestions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getUserSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_getUserSecurityQuestions,
      callback);
};


/**
 * @param {!proto.poker.FetchSecurityQuestionsResponse} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.FetchSecurityQuestionsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getUserSecurityQuestions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getUserSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_getUserSecurityQuestions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.CustomCssRequest,
 *   !proto.poker.CustomCssResponse>}
 */
const methodDescriptor_Sng_updateCustomCss = new grpc.web.MethodDescriptor(
  '/poker.Sng/updateCustomCss',
  grpc.web.MethodType.UNARY,
  proto.poker.CustomCssRequest,
  proto.poker.CustomCssResponse,
  /**
   * @param {!proto.poker.CustomCssRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CustomCssResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.CustomCssRequest,
 *   !proto.poker.CustomCssResponse>}
 */
const methodInfo_Sng_updateCustomCss = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.CustomCssResponse,
  /**
   * @param {!proto.poker.CustomCssRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CustomCssResponse.deserializeBinary
);


/**
 * @param {!proto.poker.CustomCssRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.CustomCssResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.CustomCssResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.updateCustomCss =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/updateCustomCss',
      request,
      metadata || {},
      methodDescriptor_Sng_updateCustomCss,
      callback);
};


/**
 * @param {!proto.poker.CustomCssRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.CustomCssResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.updateCustomCss =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/updateCustomCss',
      request,
      metadata || {},
      methodDescriptor_Sng_updateCustomCss);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.CustomCssRequest,
 *   !proto.poker.CustomCssResponse>}
 */
const methodDescriptor_Sng_getCustomCss = new grpc.web.MethodDescriptor(
  '/poker.Sng/getCustomCss',
  grpc.web.MethodType.UNARY,
  proto.poker.CustomCssRequest,
  proto.poker.CustomCssResponse,
  /**
   * @param {!proto.poker.CustomCssRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CustomCssResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.CustomCssRequest,
 *   !proto.poker.CustomCssResponse>}
 */
const methodInfo_Sng_getCustomCss = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.CustomCssResponse,
  /**
   * @param {!proto.poker.CustomCssRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.CustomCssResponse.deserializeBinary
);


/**
 * @param {!proto.poker.CustomCssRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.CustomCssResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.CustomCssResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getCustomCss =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getCustomCss',
      request,
      metadata || {},
      methodDescriptor_Sng_getCustomCss,
      callback);
};


/**
 * @param {!proto.poker.CustomCssRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.CustomCssResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getCustomCss =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getCustomCss',
      request,
      metadata || {},
      methodDescriptor_Sng_getCustomCss);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.PlayerMailingAddressUpdateRequest,
 *   !proto.poker.PlayerMailingAddressStatusResponse>}
 */
const methodDescriptor_Sng_addPlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/poker.Sng/addPlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.poker.PlayerMailingAddressUpdateRequest,
  proto.poker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.poker.PlayerMailingAddressUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.PlayerMailingAddressUpdateRequest,
 *   !proto.poker.PlayerMailingAddressStatusResponse>}
 */
const methodInfo_Sng_addPlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.poker.PlayerMailingAddressUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.PlayerMailingAddressUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.PlayerMailingAddressStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.PlayerMailingAddressStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.addPlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/addPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_addPlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.poker.PlayerMailingAddressUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.PlayerMailingAddressStatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.addPlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/addPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_addPlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.PlayerMailingAddressRequest,
 *   !proto.poker.PlayerMailingAddressResponse>}
 */
const methodDescriptor_Sng_getPlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/poker.Sng/getPlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.poker.PlayerMailingAddressRequest,
  proto.poker.PlayerMailingAddressResponse,
  /**
   * @param {!proto.poker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerMailingAddressResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.PlayerMailingAddressRequest,
 *   !proto.poker.PlayerMailingAddressResponse>}
 */
const methodInfo_Sng_getPlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.PlayerMailingAddressResponse,
  /**
   * @param {!proto.poker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerMailingAddressResponse.deserializeBinary
);


/**
 * @param {!proto.poker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.PlayerMailingAddressResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.PlayerMailingAddressResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getPlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.poker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.PlayerMailingAddressResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getPlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.PlayerMailingAddressRequest,
 *   !proto.poker.PlayerMailingAddressesResponse>}
 */
const methodDescriptor_Sng_getPlayerMailingAddresses = new grpc.web.MethodDescriptor(
  '/poker.Sng/getPlayerMailingAddresses',
  grpc.web.MethodType.UNARY,
  proto.poker.PlayerMailingAddressRequest,
  proto.poker.PlayerMailingAddressesResponse,
  /**
   * @param {!proto.poker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerMailingAddressesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.PlayerMailingAddressRequest,
 *   !proto.poker.PlayerMailingAddressesResponse>}
 */
const methodInfo_Sng_getPlayerMailingAddresses = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.PlayerMailingAddressesResponse,
  /**
   * @param {!proto.poker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerMailingAddressesResponse.deserializeBinary
);


/**
 * @param {!proto.poker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.PlayerMailingAddressesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.PlayerMailingAddressesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getPlayerMailingAddresses =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getPlayerMailingAddresses',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerMailingAddresses,
      callback);
};


/**
 * @param {!proto.poker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.PlayerMailingAddressesResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getPlayerMailingAddresses =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getPlayerMailingAddresses',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerMailingAddresses);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.PlayerMailingAddressUpdateRequest,
 *   !proto.poker.PlayerMailingAddressStatusResponse>}
 */
const methodDescriptor_Sng_updatePlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/poker.Sng/updatePlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.poker.PlayerMailingAddressUpdateRequest,
  proto.poker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.poker.PlayerMailingAddressUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.PlayerMailingAddressUpdateRequest,
 *   !proto.poker.PlayerMailingAddressStatusResponse>}
 */
const methodInfo_Sng_updatePlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.poker.PlayerMailingAddressUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.PlayerMailingAddressUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.PlayerMailingAddressStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.PlayerMailingAddressStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.updatePlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/updatePlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_updatePlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.poker.PlayerMailingAddressUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.PlayerMailingAddressStatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.updatePlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/updatePlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_updatePlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.PlayerMailingAddressRequest,
 *   !proto.poker.PlayerMailingAddressResponse>}
 */
const methodDescriptor_Sng_getDefaultPlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/poker.Sng/getDefaultPlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.poker.PlayerMailingAddressRequest,
  proto.poker.PlayerMailingAddressResponse,
  /**
   * @param {!proto.poker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerMailingAddressResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.PlayerMailingAddressRequest,
 *   !proto.poker.PlayerMailingAddressResponse>}
 */
const methodInfo_Sng_getDefaultPlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.PlayerMailingAddressResponse,
  /**
   * @param {!proto.poker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerMailingAddressResponse.deserializeBinary
);


/**
 * @param {!proto.poker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.PlayerMailingAddressResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.PlayerMailingAddressResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getDefaultPlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getDefaultPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_getDefaultPlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.poker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.PlayerMailingAddressResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getDefaultPlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getDefaultPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_getDefaultPlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.PlayerMailingAddressRequest,
 *   !proto.poker.PlayerMailingAddressStatusResponse>}
 */
const methodDescriptor_Sng_setDefaultPlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/poker.Sng/setDefaultPlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.poker.PlayerMailingAddressRequest,
  proto.poker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.poker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.PlayerMailingAddressRequest,
 *   !proto.poker.PlayerMailingAddressStatusResponse>}
 */
const methodInfo_Sng_setDefaultPlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.poker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.PlayerMailingAddressStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.PlayerMailingAddressStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.setDefaultPlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/setDefaultPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_setDefaultPlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.poker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.PlayerMailingAddressStatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.setDefaultPlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/setDefaultPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_setDefaultPlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.PlayerMailingAddressRequest,
 *   !proto.poker.PlayerMailingAddressStatusResponse>}
 */
const methodDescriptor_Sng_deletePlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/poker.Sng/deletePlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.poker.PlayerMailingAddressRequest,
  proto.poker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.poker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.PlayerMailingAddressRequest,
 *   !proto.poker.PlayerMailingAddressStatusResponse>}
 */
const methodInfo_Sng_deletePlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.poker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @param {!proto.poker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.PlayerMailingAddressStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.PlayerMailingAddressStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.deletePlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/deletePlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_deletePlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.poker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.PlayerMailingAddressStatusResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.deletePlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/deletePlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_deletePlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.FetchSecurityQuestionsRequest,
 *   !proto.poker.FetchSecurityQuestionsResponse>}
 */
const methodDescriptor_Sng_getRandomSecurityQuestion = new grpc.web.MethodDescriptor(
  '/poker.Sng/getRandomSecurityQuestion',
  grpc.web.MethodType.UNARY,
  proto.poker.FetchSecurityQuestionsRequest,
  proto.poker.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.poker.FetchSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.FetchSecurityQuestionsRequest,
 *   !proto.poker.FetchSecurityQuestionsResponse>}
 */
const methodInfo_Sng_getRandomSecurityQuestion = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.poker.FetchSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.poker.FetchSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.FetchSecurityQuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.FetchSecurityQuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.getRandomSecurityQuestion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/getRandomSecurityQuestion',
      request,
      metadata || {},
      methodDescriptor_Sng_getRandomSecurityQuestion,
      callback);
};


/**
 * @param {!proto.poker.FetchSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.FetchSecurityQuestionsResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.getRandomSecurityQuestion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/getRandomSecurityQuestion',
      request,
      metadata || {},
      methodDescriptor_Sng_getRandomSecurityQuestion);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.AnswerVerifyPasswordRequest,
 *   !proto.poker.AnswerVerifyPasswordResponse>}
 */
const methodDescriptor_Sng_answerSecurityQusetionAndVerifyPassword = new grpc.web.MethodDescriptor(
  '/poker.Sng/answerSecurityQusetionAndVerifyPassword',
  grpc.web.MethodType.UNARY,
  proto.poker.AnswerVerifyPasswordRequest,
  proto.poker.AnswerVerifyPasswordResponse,
  /**
   * @param {!proto.poker.AnswerVerifyPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.AnswerVerifyPasswordResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.AnswerVerifyPasswordRequest,
 *   !proto.poker.AnswerVerifyPasswordResponse>}
 */
const methodInfo_Sng_answerSecurityQusetionAndVerifyPassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.AnswerVerifyPasswordResponse,
  /**
   * @param {!proto.poker.AnswerVerifyPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.AnswerVerifyPasswordResponse.deserializeBinary
);


/**
 * @param {!proto.poker.AnswerVerifyPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.AnswerVerifyPasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.AnswerVerifyPasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.answerSecurityQusetionAndVerifyPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/answerSecurityQusetionAndVerifyPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_answerSecurityQusetionAndVerifyPassword,
      callback);
};


/**
 * @param {!proto.poker.AnswerVerifyPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.AnswerVerifyPasswordResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.answerSecurityQusetionAndVerifyPassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/answerSecurityQusetionAndVerifyPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_answerSecurityQusetionAndVerifyPassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.poker.VerifySSNLastFourRequest,
 *   !proto.poker.VerifySSNLastFourResponse>}
 */
const methodDescriptor_Sng_verifySSNLastFourDigits = new grpc.web.MethodDescriptor(
  '/poker.Sng/verifySSNLastFourDigits',
  grpc.web.MethodType.UNARY,
  proto.poker.VerifySSNLastFourRequest,
  proto.poker.VerifySSNLastFourResponse,
  /**
   * @param {!proto.poker.VerifySSNLastFourRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.VerifySSNLastFourResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.poker.VerifySSNLastFourRequest,
 *   !proto.poker.VerifySSNLastFourResponse>}
 */
const methodInfo_Sng_verifySSNLastFourDigits = new grpc.web.AbstractClientBase.MethodInfo(
  proto.poker.VerifySSNLastFourResponse,
  /**
   * @param {!proto.poker.VerifySSNLastFourRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.poker.VerifySSNLastFourResponse.deserializeBinary
);


/**
 * @param {!proto.poker.VerifySSNLastFourRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.poker.VerifySSNLastFourResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.poker.VerifySSNLastFourResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.poker.SngClient.prototype.verifySSNLastFourDigits =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/poker.Sng/verifySSNLastFourDigits',
      request,
      metadata || {},
      methodDescriptor_Sng_verifySSNLastFourDigits,
      callback);
};


/**
 * @param {!proto.poker.VerifySSNLastFourRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.poker.VerifySSNLastFourResponse>}
 *     Promise that resolves to the response
 */
proto.poker.SngPromiseClient.prototype.verifySSNLastFourDigits =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/poker.Sng/verifySSNLastFourDigits',
      request,
      metadata || {},
      methodDescriptor_Sng_verifySSNLastFourDigits);
};


module.exports = proto.poker;

