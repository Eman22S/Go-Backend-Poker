/**
 * @fileoverview gRPC-Web generated client stub for sngpoker
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
proto.sngpoker = require('./sng_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.sngpoker.SngClient =
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
proto.sngpoker.SngPromiseClient =
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
  '/sngpoker.Sng/Test',
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
proto.sngpoker.SngClient.prototype.test =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/Test',
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
proto.sngpoker.SngPromiseClient.prototype.test =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/Test',
      request,
      metadata || {},
      methodDescriptor_Sng_Test);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetStatusRequest,
 *   !proto.sngpoker.GetStatusResult>}
 */
const methodDescriptor_Sng_getStatus = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getStatus',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sngpoker.GetStatusRequest,
  proto.sngpoker.GetStatusResult,
  /**
   * @param {!proto.sngpoker.GetStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetStatusRequest,
 *   !proto.sngpoker.GetStatusResult>}
 */
const methodInfo_Sng_getStatus = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetStatusResult,
  /**
   * @param {!proto.sngpoker.GetStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetStatusResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetStatusRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetStatusResult>}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getStatus =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sngpoker.Sng/getStatus',
      request,
      metadata || {},
      methodDescriptor_Sng_getStatus);
};


/**
 * @param {!proto.sngpoker.GetStatusRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetStatusResult>}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngPromiseClient.prototype.getStatus =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sngpoker.Sng/getStatus',
      request,
      metadata || {},
      methodDescriptor_Sng_getStatus);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.MakeSngRequest,
 *   !proto.sngpoker.MakeSngResponse>}
 */
const methodDescriptor_Sng_MakeSng = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/MakeSng',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.MakeSngRequest,
  proto.sngpoker.MakeSngResponse,
  /**
   * @param {!proto.sngpoker.MakeSngRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.MakeSngResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.MakeSngRequest,
 *   !proto.sngpoker.MakeSngResponse>}
 */
const methodInfo_Sng_MakeSng = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.MakeSngResponse,
  /**
   * @param {!proto.sngpoker.MakeSngRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.MakeSngResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.MakeSngRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.MakeSngResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.MakeSngResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.makeSng =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/MakeSng',
      request,
      metadata || {},
      methodDescriptor_Sng_MakeSng,
      callback);
};


/**
 * @param {!proto.sngpoker.MakeSngRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.MakeSngResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.makeSng =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/MakeSng',
      request,
      metadata || {},
      methodDescriptor_Sng_MakeSng);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.MakePlayerActionRequest,
 *   !proto.sngpoker.GetStatusResult>}
 */
const methodDescriptor_Sng_MakePlayerAction = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/MakePlayerAction',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.MakePlayerActionRequest,
  proto.sngpoker.GetStatusResult,
  /**
   * @param {!proto.sngpoker.MakePlayerActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.MakePlayerActionRequest,
 *   !proto.sngpoker.GetStatusResult>}
 */
const methodInfo_Sng_MakePlayerAction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetStatusResult,
  /**
   * @param {!proto.sngpoker.MakePlayerActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetStatusResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.MakePlayerActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.makePlayerAction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/MakePlayerAction',
      request,
      metadata || {},
      methodDescriptor_Sng_MakePlayerAction,
      callback);
};


/**
 * @param {!proto.sngpoker.MakePlayerActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetStatusResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.makePlayerAction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/MakePlayerAction',
      request,
      metadata || {},
      methodDescriptor_Sng_MakePlayerAction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetTournamentsRequest,
 *   !proto.sngpoker.GetTournamentsResponse>}
 */
const methodDescriptor_Sng_getTournaments = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getTournaments',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GetTournamentsRequest,
  proto.sngpoker.GetTournamentsResponse,
  /**
   * @param {!proto.sngpoker.GetTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetTournamentsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetTournamentsRequest,
 *   !proto.sngpoker.GetTournamentsResponse>}
 */
const methodInfo_Sng_getTournaments = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetTournamentsResponse,
  /**
   * @param {!proto.sngpoker.GetTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetTournamentsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetTournamentsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetTournamentsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getTournaments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournaments,
      callback);
};


/**
 * @param {!proto.sngpoker.GetTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetTournamentsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getTournaments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournaments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.JoinTournamentRequest,
 *   !proto.sngpoker.JoinTournamentResponse>}
 */
const methodDescriptor_Sng_joinTournament = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/joinTournament',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.JoinTournamentRequest,
  proto.sngpoker.JoinTournamentResponse,
  /**
   * @param {!proto.sngpoker.JoinTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.JoinTournamentResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.JoinTournamentRequest,
 *   !proto.sngpoker.JoinTournamentResponse>}
 */
const methodInfo_Sng_joinTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.JoinTournamentResponse,
  /**
   * @param {!proto.sngpoker.JoinTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.JoinTournamentResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.JoinTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.JoinTournamentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.JoinTournamentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.joinTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/joinTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_joinTournament,
      callback);
};


/**
 * @param {!proto.sngpoker.JoinTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.JoinTournamentResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.joinTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/joinTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_joinTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.UnregisterTournamentRequest,
 *   !proto.sngpoker.UnregisterTournamentResponse>}
 */
const methodDescriptor_Sng_unregisterTournament = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/unregisterTournament',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.UnregisterTournamentRequest,
  proto.sngpoker.UnregisterTournamentResponse,
  /**
   * @param {!proto.sngpoker.UnregisterTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UnregisterTournamentResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.UnregisterTournamentRequest,
 *   !proto.sngpoker.UnregisterTournamentResponse>}
 */
const methodInfo_Sng_unregisterTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.UnregisterTournamentResponse,
  /**
   * @param {!proto.sngpoker.UnregisterTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UnregisterTournamentResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.UnregisterTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.UnregisterTournamentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.UnregisterTournamentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.unregisterTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/unregisterTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_unregisterTournament,
      callback);
};


/**
 * @param {!proto.sngpoker.UnregisterTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.UnregisterTournamentResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.unregisterTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/unregisterTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_unregisterTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.CancelTournamentRequest,
 *   !proto.sngpoker.CancelTournamentResponse>}
 */
const methodDescriptor_Sng_cancelTournament = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/cancelTournament',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.CancelTournamentRequest,
  proto.sngpoker.CancelTournamentResponse,
  /**
   * @param {!proto.sngpoker.CancelTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CancelTournamentResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.CancelTournamentRequest,
 *   !proto.sngpoker.CancelTournamentResponse>}
 */
const methodInfo_Sng_cancelTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.CancelTournamentResponse,
  /**
   * @param {!proto.sngpoker.CancelTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CancelTournamentResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.CancelTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.CancelTournamentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.CancelTournamentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.cancelTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/cancelTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelTournament,
      callback);
};


/**
 * @param {!proto.sngpoker.CancelTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.CancelTournamentResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.cancelTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/cancelTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetGameplayHistoriesRequest,
 *   !proto.sngpoker.GetGameplayHistoriesResponse>}
 */
const methodDescriptor_Sng_getGameplayHistories = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getGameplayHistories',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GetGameplayHistoriesRequest,
  proto.sngpoker.GetGameplayHistoriesResponse,
  /**
   * @param {!proto.sngpoker.GetGameplayHistoriesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetGameplayHistoriesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetGameplayHistoriesRequest,
 *   !proto.sngpoker.GetGameplayHistoriesResponse>}
 */
const methodInfo_Sng_getGameplayHistories = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetGameplayHistoriesResponse,
  /**
   * @param {!proto.sngpoker.GetGameplayHistoriesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetGameplayHistoriesResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetGameplayHistoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetGameplayHistoriesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetGameplayHistoriesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getGameplayHistories =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getGameplayHistories',
      request,
      metadata || {},
      methodDescriptor_Sng_getGameplayHistories,
      callback);
};


/**
 * @param {!proto.sngpoker.GetGameplayHistoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetGameplayHistoriesResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getGameplayHistories =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getGameplayHistories',
      request,
      metadata || {},
      methodDescriptor_Sng_getGameplayHistories);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetHandHistoryRequest,
 *   !proto.sngpoker.GetHandHistoryResponse>}
 */
const methodDescriptor_Sng_getAllHandHistoryData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getAllHandHistoryData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GetHandHistoryRequest,
  proto.sngpoker.GetHandHistoryResponse,
  /**
   * @param {!proto.sngpoker.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetHandHistoryResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetHandHistoryRequest,
 *   !proto.sngpoker.GetHandHistoryResponse>}
 */
const methodInfo_Sng_getAllHandHistoryData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetHandHistoryResponse,
  /**
   * @param {!proto.sngpoker.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetHandHistoryResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetHandHistoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetHandHistoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getAllHandHistoryData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getAllHandHistoryData',
      request,
      metadata || {},
      methodDescriptor_Sng_getAllHandHistoryData,
      callback);
};


/**
 * @param {!proto.sngpoker.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetHandHistoryResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getAllHandHistoryData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getAllHandHistoryData',
      request,
      metadata || {},
      methodDescriptor_Sng_getAllHandHistoryData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetHandHistoryRequest,
 *   !proto.sngpoker.GetHandHistoryResponse>}
 */
const methodDescriptor_Sng_getHandHistoryStat = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getHandHistoryStat',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GetHandHistoryRequest,
  proto.sngpoker.GetHandHistoryResponse,
  /**
   * @param {!proto.sngpoker.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetHandHistoryResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetHandHistoryRequest,
 *   !proto.sngpoker.GetHandHistoryResponse>}
 */
const methodInfo_Sng_getHandHistoryStat = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetHandHistoryResponse,
  /**
   * @param {!proto.sngpoker.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetHandHistoryResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetHandHistoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetHandHistoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getHandHistoryStat =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getHandHistoryStat',
      request,
      metadata || {},
      methodDescriptor_Sng_getHandHistoryStat,
      callback);
};


/**
 * @param {!proto.sngpoker.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetHandHistoryResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getHandHistoryStat =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getHandHistoryStat',
      request,
      metadata || {},
      methodDescriptor_Sng_getHandHistoryStat);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetHandHistoryRequest,
 *   !proto.sngpoker.GetHandHistoryResponse>}
 */
const methodDescriptor_Sng_getHandHistoryData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getHandHistoryData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GetHandHistoryRequest,
  proto.sngpoker.GetHandHistoryResponse,
  /**
   * @param {!proto.sngpoker.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetHandHistoryResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetHandHistoryRequest,
 *   !proto.sngpoker.GetHandHistoryResponse>}
 */
const methodInfo_Sng_getHandHistoryData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetHandHistoryResponse,
  /**
   * @param {!proto.sngpoker.GetHandHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetHandHistoryResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetHandHistoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetHandHistoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getHandHistoryData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getHandHistoryData',
      request,
      metadata || {},
      methodDescriptor_Sng_getHandHistoryData,
      callback);
};


/**
 * @param {!proto.sngpoker.GetHandHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetHandHistoryResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getHandHistoryData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getHandHistoryData',
      request,
      metadata || {},
      methodDescriptor_Sng_getHandHistoryData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.DrawReplaceActionRequest,
 *   !proto.sngpoker.GetStatusResult>}
 */
const methodDescriptor_Sng_drawReplaceAction = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/drawReplaceAction',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.DrawReplaceActionRequest,
  proto.sngpoker.GetStatusResult,
  /**
   * @param {!proto.sngpoker.DrawReplaceActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.DrawReplaceActionRequest,
 *   !proto.sngpoker.GetStatusResult>}
 */
const methodInfo_Sng_drawReplaceAction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetStatusResult,
  /**
   * @param {!proto.sngpoker.DrawReplaceActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetStatusResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.DrawReplaceActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.drawReplaceAction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/drawReplaceAction',
      request,
      metadata || {},
      methodDescriptor_Sng_drawReplaceAction,
      callback);
};


/**
 * @param {!proto.sngpoker.DrawReplaceActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetStatusResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.drawReplaceAction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/drawReplaceAction',
      request,
      metadata || {},
      methodDescriptor_Sng_drawReplaceAction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.DrawAddActionRequest,
 *   !proto.sngpoker.GetStatusResult>}
 */
const methodDescriptor_Sng_drawAddAction = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/drawAddAction',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.DrawAddActionRequest,
  proto.sngpoker.GetStatusResult,
  /**
   * @param {!proto.sngpoker.DrawAddActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.DrawAddActionRequest,
 *   !proto.sngpoker.GetStatusResult>}
 */
const methodInfo_Sng_drawAddAction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetStatusResult,
  /**
   * @param {!proto.sngpoker.DrawAddActionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetStatusResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.DrawAddActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.drawAddAction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/drawAddAction',
      request,
      metadata || {},
      methodDescriptor_Sng_drawAddAction,
      callback);
};


/**
 * @param {!proto.sngpoker.DrawAddActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetStatusResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.drawAddAction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/drawAddAction',
      request,
      metadata || {},
      methodDescriptor_Sng_drawAddAction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.JoinTournamentTemplateRequest,
 *   !proto.sngpoker.JoinTournamentTemplateResponse>}
 */
const methodDescriptor_Sng_joinTournamentTempalte = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/joinTournamentTempalte',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.JoinTournamentTemplateRequest,
  proto.sngpoker.JoinTournamentTemplateResponse,
  /**
   * @param {!proto.sngpoker.JoinTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.JoinTournamentTemplateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.JoinTournamentTemplateRequest,
 *   !proto.sngpoker.JoinTournamentTemplateResponse>}
 */
const methodInfo_Sng_joinTournamentTempalte = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.JoinTournamentTemplateResponse,
  /**
   * @param {!proto.sngpoker.JoinTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.JoinTournamentTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.JoinTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.JoinTournamentTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.JoinTournamentTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.joinTournamentTempalte =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/joinTournamentTempalte',
      request,
      metadata || {},
      methodDescriptor_Sng_joinTournamentTempalte,
      callback);
};


/**
 * @param {!proto.sngpoker.JoinTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.JoinTournamentTemplateResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.joinTournamentTempalte =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/joinTournamentTempalte',
      request,
      metadata || {},
      methodDescriptor_Sng_joinTournamentTempalte);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetTournamentTemplateDetailRequest,
 *   !proto.sngpoker.GetTournamentTemplateDetailResponse>}
 */
const methodDescriptor_Sng_getTournamentTemplateDetail = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getTournamentTemplateDetail',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GetTournamentTemplateDetailRequest,
  proto.sngpoker.GetTournamentTemplateDetailResponse,
  /**
   * @param {!proto.sngpoker.GetTournamentTemplateDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetTournamentTemplateDetailResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetTournamentTemplateDetailRequest,
 *   !proto.sngpoker.GetTournamentTemplateDetailResponse>}
 */
const methodInfo_Sng_getTournamentTemplateDetail = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetTournamentTemplateDetailResponse,
  /**
   * @param {!proto.sngpoker.GetTournamentTemplateDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetTournamentTemplateDetailResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetTournamentTemplateDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetTournamentTemplateDetailResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetTournamentTemplateDetailResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getTournamentTemplateDetail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getTournamentTemplateDetail',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateDetail,
      callback);
};


/**
 * @param {!proto.sngpoker.GetTournamentTemplateDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetTournamentTemplateDetailResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getTournamentTemplateDetail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getTournamentTemplateDetail',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateDetail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AddTournamentTemplateToLobbyRequest,
 *   !proto.sngpoker.AddTournamentTemplateToLobbyResponse>}
 */
const methodDescriptor_Sng_addTournamentTemplateToLobby = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/addTournamentTemplateToLobby',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AddTournamentTemplateToLobbyRequest,
  proto.sngpoker.AddTournamentTemplateToLobbyResponse,
  /**
   * @param {!proto.sngpoker.AddTournamentTemplateToLobbyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.AddTournamentTemplateToLobbyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AddTournamentTemplateToLobbyRequest,
 *   !proto.sngpoker.AddTournamentTemplateToLobbyResponse>}
 */
const methodInfo_Sng_addTournamentTemplateToLobby = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.AddTournamentTemplateToLobbyResponse,
  /**
   * @param {!proto.sngpoker.AddTournamentTemplateToLobbyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.AddTournamentTemplateToLobbyResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AddTournamentTemplateToLobbyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.AddTournamentTemplateToLobbyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.AddTournamentTemplateToLobbyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.addTournamentTemplateToLobby =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/addTournamentTemplateToLobby',
      request,
      metadata || {},
      methodDescriptor_Sng_addTournamentTemplateToLobby,
      callback);
};


/**
 * @param {!proto.sngpoker.AddTournamentTemplateToLobbyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.AddTournamentTemplateToLobbyResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.addTournamentTemplateToLobby =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/addTournamentTemplateToLobby',
      request,
      metadata || {},
      methodDescriptor_Sng_addTournamentTemplateToLobby);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.RemoveTournamentTemplateFromLobbyRequest,
 *   !proto.sngpoker.RemoveTournamentTemplateFromLobbyResponse>}
 */
const methodDescriptor_Sng_removeTournamentTemplateFromLobby = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/removeTournamentTemplateFromLobby',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.RemoveTournamentTemplateFromLobbyRequest,
  proto.sngpoker.RemoveTournamentTemplateFromLobbyResponse,
  /**
   * @param {!proto.sngpoker.RemoveTournamentTemplateFromLobbyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.RemoveTournamentTemplateFromLobbyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.RemoveTournamentTemplateFromLobbyRequest,
 *   !proto.sngpoker.RemoveTournamentTemplateFromLobbyResponse>}
 */
const methodInfo_Sng_removeTournamentTemplateFromLobby = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.RemoveTournamentTemplateFromLobbyResponse,
  /**
   * @param {!proto.sngpoker.RemoveTournamentTemplateFromLobbyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.RemoveTournamentTemplateFromLobbyResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.RemoveTournamentTemplateFromLobbyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.RemoveTournamentTemplateFromLobbyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.RemoveTournamentTemplateFromLobbyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.removeTournamentTemplateFromLobby =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/removeTournamentTemplateFromLobby',
      request,
      metadata || {},
      methodDescriptor_Sng_removeTournamentTemplateFromLobby,
      callback);
};


/**
 * @param {!proto.sngpoker.RemoveTournamentTemplateFromLobbyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.RemoveTournamentTemplateFromLobbyResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.removeTournamentTemplateFromLobby =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/removeTournamentTemplateFromLobby',
      request,
      metadata || {},
      methodDescriptor_Sng_removeTournamentTemplateFromLobby);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.CreateTournamentTemplateRequest,
 *   !proto.sngpoker.CreateTournamentTemplateResponse>}
 */
const methodDescriptor_Sng_createTournamentTemplate = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/createTournamentTemplate',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.CreateTournamentTemplateRequest,
  proto.sngpoker.CreateTournamentTemplateResponse,
  /**
   * @param {!proto.sngpoker.CreateTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CreateTournamentTemplateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.CreateTournamentTemplateRequest,
 *   !proto.sngpoker.CreateTournamentTemplateResponse>}
 */
const methodInfo_Sng_createTournamentTemplate = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.CreateTournamentTemplateResponse,
  /**
   * @param {!proto.sngpoker.CreateTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CreateTournamentTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.CreateTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.CreateTournamentTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.CreateTournamentTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.createTournamentTemplate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/createTournamentTemplate',
      request,
      metadata || {},
      methodDescriptor_Sng_createTournamentTemplate,
      callback);
};


/**
 * @param {!proto.sngpoker.CreateTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.CreateTournamentTemplateResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.createTournamentTemplate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/createTournamentTemplate',
      request,
      metadata || {},
      methodDescriptor_Sng_createTournamentTemplate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetTournamentTemplateListRequest,
 *   !proto.sngpoker.GetTournamentTemplateListResponse>}
 */
const methodDescriptor_Sng_getTournamentTemplateList = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getTournamentTemplateList',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GetTournamentTemplateListRequest,
  proto.sngpoker.GetTournamentTemplateListResponse,
  /**
   * @param {!proto.sngpoker.GetTournamentTemplateListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetTournamentTemplateListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetTournamentTemplateListRequest,
 *   !proto.sngpoker.GetTournamentTemplateListResponse>}
 */
const methodInfo_Sng_getTournamentTemplateList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetTournamentTemplateListResponse,
  /**
   * @param {!proto.sngpoker.GetTournamentTemplateListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetTournamentTemplateListResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetTournamentTemplateListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetTournamentTemplateListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetTournamentTemplateListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getTournamentTemplateList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getTournamentTemplateList',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateList,
      callback);
};


/**
 * @param {!proto.sngpoker.GetTournamentTemplateListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetTournamentTemplateListResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getTournamentTemplateList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getTournamentTemplateList',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetLobbyTournamentTemplateListRequest,
 *   !proto.sngpoker.GetLobbyTournamentTemplateListResponse>}
 */
const methodDescriptor_Sng_getLobbyTournamentTemplateList = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getLobbyTournamentTemplateList',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GetLobbyTournamentTemplateListRequest,
  proto.sngpoker.GetLobbyTournamentTemplateListResponse,
  /**
   * @param {!proto.sngpoker.GetLobbyTournamentTemplateListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetLobbyTournamentTemplateListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetLobbyTournamentTemplateListRequest,
 *   !proto.sngpoker.GetLobbyTournamentTemplateListResponse>}
 */
const methodInfo_Sng_getLobbyTournamentTemplateList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetLobbyTournamentTemplateListResponse,
  /**
   * @param {!proto.sngpoker.GetLobbyTournamentTemplateListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetLobbyTournamentTemplateListResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetLobbyTournamentTemplateListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetLobbyTournamentTemplateListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetLobbyTournamentTemplateListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getLobbyTournamentTemplateList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getLobbyTournamentTemplateList',
      request,
      metadata || {},
      methodDescriptor_Sng_getLobbyTournamentTemplateList,
      callback);
};


/**
 * @param {!proto.sngpoker.GetLobbyTournamentTemplateListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetLobbyTournamentTemplateListResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getLobbyTournamentTemplateList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getLobbyTournamentTemplateList',
      request,
      metadata || {},
      methodDescriptor_Sng_getLobbyTournamentTemplateList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetTournamentTemplateBufferStateRequest,
 *   !proto.sngpoker.GetTournamentTemplateBufferStateResponse>}
 */
const methodDescriptor_Sng_getTournamentTemplateBufferState = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getTournamentTemplateBufferState',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GetTournamentTemplateBufferStateRequest,
  proto.sngpoker.GetTournamentTemplateBufferStateResponse,
  /**
   * @param {!proto.sngpoker.GetTournamentTemplateBufferStateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetTournamentTemplateBufferStateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetTournamentTemplateBufferStateRequest,
 *   !proto.sngpoker.GetTournamentTemplateBufferStateResponse>}
 */
const methodInfo_Sng_getTournamentTemplateBufferState = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetTournamentTemplateBufferStateResponse,
  /**
   * @param {!proto.sngpoker.GetTournamentTemplateBufferStateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetTournamentTemplateBufferStateResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetTournamentTemplateBufferStateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetTournamentTemplateBufferStateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetTournamentTemplateBufferStateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getTournamentTemplateBufferState =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getTournamentTemplateBufferState',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateBufferState,
      callback);
};


/**
 * @param {!proto.sngpoker.GetTournamentTemplateBufferStateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetTournamentTemplateBufferStateResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getTournamentTemplateBufferState =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getTournamentTemplateBufferState',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentTemplateBufferState);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.UnsubscribeFromTournamentTemplateBufferRequest,
 *   !proto.sngpoker.UnsubscribeFromTournamentTemplateBufferResponse>}
 */
const methodDescriptor_Sng_unsubscribeFromTournamentTemplateBuffer = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/unsubscribeFromTournamentTemplateBuffer',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.UnsubscribeFromTournamentTemplateBufferRequest,
  proto.sngpoker.UnsubscribeFromTournamentTemplateBufferResponse,
  /**
   * @param {!proto.sngpoker.UnsubscribeFromTournamentTemplateBufferRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UnsubscribeFromTournamentTemplateBufferResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.UnsubscribeFromTournamentTemplateBufferRequest,
 *   !proto.sngpoker.UnsubscribeFromTournamentTemplateBufferResponse>}
 */
const methodInfo_Sng_unsubscribeFromTournamentTemplateBuffer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.UnsubscribeFromTournamentTemplateBufferResponse,
  /**
   * @param {!proto.sngpoker.UnsubscribeFromTournamentTemplateBufferRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UnsubscribeFromTournamentTemplateBufferResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.UnsubscribeFromTournamentTemplateBufferRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.UnsubscribeFromTournamentTemplateBufferResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.UnsubscribeFromTournamentTemplateBufferResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.unsubscribeFromTournamentTemplateBuffer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/unsubscribeFromTournamentTemplateBuffer',
      request,
      metadata || {},
      methodDescriptor_Sng_unsubscribeFromTournamentTemplateBuffer,
      callback);
};


/**
 * @param {!proto.sngpoker.UnsubscribeFromTournamentTemplateBufferRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.UnsubscribeFromTournamentTemplateBufferResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.unsubscribeFromTournamentTemplateBuffer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/unsubscribeFromTournamentTemplateBuffer',
      request,
      metadata || {},
      methodDescriptor_Sng_unsubscribeFromTournamentTemplateBuffer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.LaunchTournamentRequest,
 *   !proto.sngpoker.LaunchTournamentResponse>}
 */
const methodDescriptor_Sng_launchTournament = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/launchTournament',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.LaunchTournamentRequest,
  proto.sngpoker.LaunchTournamentResponse,
  /**
   * @param {!proto.sngpoker.LaunchTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.LaunchTournamentResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.LaunchTournamentRequest,
 *   !proto.sngpoker.LaunchTournamentResponse>}
 */
const methodInfo_Sng_launchTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.LaunchTournamentResponse,
  /**
   * @param {!proto.sngpoker.LaunchTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.LaunchTournamentResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.LaunchTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.LaunchTournamentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.LaunchTournamentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.launchTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/launchTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_launchTournament,
      callback);
};


/**
 * @param {!proto.sngpoker.LaunchTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.LaunchTournamentResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.launchTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/launchTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_launchTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.SignupRequest,
 *   !proto.sngpoker.SignupResult>}
 */
const methodDescriptor_Sng_Signup = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/Signup',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.SignupRequest,
  proto.sngpoker.SignupResult,
  /**
   * @param {!proto.sngpoker.SignupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.SignupResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.SignupRequest,
 *   !proto.sngpoker.SignupResult>}
 */
const methodInfo_Sng_Signup = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.SignupResult,
  /**
   * @param {!proto.sngpoker.SignupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.SignupResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.SignupResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.SignupResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.signup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/Signup',
      request,
      metadata || {},
      methodDescriptor_Sng_Signup,
      callback);
};


/**
 * @param {!proto.sngpoker.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.SignupResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.signup =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/Signup',
      request,
      metadata || {},
      methodDescriptor_Sng_Signup);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.LoginRequest,
 *   !proto.sngpoker.LoginResult>}
 */
const methodDescriptor_Sng_Login = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/Login',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.LoginRequest,
  proto.sngpoker.LoginResult,
  /**
   * @param {!proto.sngpoker.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.LoginResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.LoginRequest,
 *   !proto.sngpoker.LoginResult>}
 */
const methodInfo_Sng_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.LoginResult,
  /**
   * @param {!proto.sngpoker.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.LoginResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.LoginResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.LoginResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/Login',
      request,
      metadata || {},
      methodDescriptor_Sng_Login,
      callback);
};


/**
 * @param {!proto.sngpoker.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.LoginResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/Login',
      request,
      metadata || {},
      methodDescriptor_Sng_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.LogoutRequest,
 *   !proto.sngpoker.LogoutResult>}
 */
const methodDescriptor_Sng_Logout = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/Logout',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.LogoutRequest,
  proto.sngpoker.LogoutResult,
  /**
   * @param {!proto.sngpoker.LogoutRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.LogoutResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.LogoutRequest,
 *   !proto.sngpoker.LogoutResult>}
 */
const methodInfo_Sng_Logout = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.LogoutResult,
  /**
   * @param {!proto.sngpoker.LogoutRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.LogoutResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.LogoutRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.LogoutResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.LogoutResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.logout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/Logout',
      request,
      metadata || {},
      methodDescriptor_Sng_Logout,
      callback);
};


/**
 * @param {!proto.sngpoker.LogoutRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.LogoutResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.logout =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/Logout',
      request,
      metadata || {},
      methodDescriptor_Sng_Logout);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.MakeDepositRequest,
 *   !proto.sngpoker.MakeDepositResponse>}
 */
const methodDescriptor_Sng_makeDeposit = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/makeDeposit',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.MakeDepositRequest,
  proto.sngpoker.MakeDepositResponse,
  /**
   * @param {!proto.sngpoker.MakeDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.MakeDepositResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.MakeDepositRequest,
 *   !proto.sngpoker.MakeDepositResponse>}
 */
const methodInfo_Sng_makeDeposit = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.MakeDepositResponse,
  /**
   * @param {!proto.sngpoker.MakeDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.MakeDepositResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.MakeDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.MakeDepositResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.MakeDepositResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.makeDeposit =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/makeDeposit',
      request,
      metadata || {},
      methodDescriptor_Sng_makeDeposit,
      callback);
};


/**
 * @param {!proto.sngpoker.MakeDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.MakeDepositResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.makeDeposit =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/makeDeposit',
      request,
      metadata || {},
      methodDescriptor_Sng_makeDeposit);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.MakeWithdrawalRequest,
 *   !proto.sngpoker.MakeWithdrawalResponse>}
 */
const methodDescriptor_Sng_makeWithdrawal = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/makeWithdrawal',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.MakeWithdrawalRequest,
  proto.sngpoker.MakeWithdrawalResponse,
  /**
   * @param {!proto.sngpoker.MakeWithdrawalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.MakeWithdrawalResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.MakeWithdrawalRequest,
 *   !proto.sngpoker.MakeWithdrawalResponse>}
 */
const methodInfo_Sng_makeWithdrawal = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.MakeWithdrawalResponse,
  /**
   * @param {!proto.sngpoker.MakeWithdrawalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.MakeWithdrawalResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.MakeWithdrawalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.MakeWithdrawalResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.MakeWithdrawalResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.makeWithdrawal =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/makeWithdrawal',
      request,
      metadata || {},
      methodDescriptor_Sng_makeWithdrawal,
      callback);
};


/**
 * @param {!proto.sngpoker.MakeWithdrawalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.MakeWithdrawalResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.makeWithdrawal =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/makeWithdrawal',
      request,
      metadata || {},
      methodDescriptor_Sng_makeWithdrawal);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AccountStatementsRequest,
 *   !proto.sngpoker.AccountStatementsResponse>}
 */
const methodDescriptor_Sng_getAccountStatements = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getAccountStatements',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AccountStatementsRequest,
  proto.sngpoker.AccountStatementsResponse,
  /**
   * @param {!proto.sngpoker.AccountStatementsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.AccountStatementsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AccountStatementsRequest,
 *   !proto.sngpoker.AccountStatementsResponse>}
 */
const methodInfo_Sng_getAccountStatements = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.AccountStatementsResponse,
  /**
   * @param {!proto.sngpoker.AccountStatementsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.AccountStatementsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AccountStatementsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.AccountStatementsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.AccountStatementsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getAccountStatements =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getAccountStatements',
      request,
      metadata || {},
      methodDescriptor_Sng_getAccountStatements,
      callback);
};


/**
 * @param {!proto.sngpoker.AccountStatementsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.AccountStatementsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getAccountStatements =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getAccountStatements',
      request,
      metadata || {},
      methodDescriptor_Sng_getAccountStatements);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.CaptureDepositRequest,
 *   !proto.sngpoker.CaptureDepositResponse>}
 */
const methodDescriptor_Sng_captureProcessedDeposit = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/captureProcessedDeposit',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.CaptureDepositRequest,
  proto.sngpoker.CaptureDepositResponse,
  /**
   * @param {!proto.sngpoker.CaptureDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CaptureDepositResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.CaptureDepositRequest,
 *   !proto.sngpoker.CaptureDepositResponse>}
 */
const methodInfo_Sng_captureProcessedDeposit = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.CaptureDepositResponse,
  /**
   * @param {!proto.sngpoker.CaptureDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CaptureDepositResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.CaptureDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.CaptureDepositResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.CaptureDepositResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.captureProcessedDeposit =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/captureProcessedDeposit',
      request,
      metadata || {},
      methodDescriptor_Sng_captureProcessedDeposit,
      callback);
};


/**
 * @param {!proto.sngpoker.CaptureDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.CaptureDepositResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.captureProcessedDeposit =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/captureProcessedDeposit',
      request,
      metadata || {},
      methodDescriptor_Sng_captureProcessedDeposit);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.CaptureWithdrawalRequest,
 *   !proto.sngpoker.CaptureWithdrawalResponse>}
 */
const methodDescriptor_Sng_captureProcessedWithdrawal = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/captureProcessedWithdrawal',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.CaptureWithdrawalRequest,
  proto.sngpoker.CaptureWithdrawalResponse,
  /**
   * @param {!proto.sngpoker.CaptureWithdrawalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CaptureWithdrawalResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.CaptureWithdrawalRequest,
 *   !proto.sngpoker.CaptureWithdrawalResponse>}
 */
const methodInfo_Sng_captureProcessedWithdrawal = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.CaptureWithdrawalResponse,
  /**
   * @param {!proto.sngpoker.CaptureWithdrawalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CaptureWithdrawalResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.CaptureWithdrawalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.CaptureWithdrawalResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.CaptureWithdrawalResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.captureProcessedWithdrawal =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/captureProcessedWithdrawal',
      request,
      metadata || {},
      methodDescriptor_Sng_captureProcessedWithdrawal,
      callback);
};


/**
 * @param {!proto.sngpoker.CaptureWithdrawalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.CaptureWithdrawalResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.captureProcessedWithdrawal =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/captureProcessedWithdrawal',
      request,
      metadata || {},
      methodDescriptor_Sng_captureProcessedWithdrawal);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AddPayoutStructureRequest,
 *   !proto.sngpoker.AddPayoutStructureResponse>}
 */
const methodDescriptor_Sng_addPayoutStructure = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/addPayoutStructure',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AddPayoutStructureRequest,
  proto.sngpoker.AddPayoutStructureResponse,
  /**
   * @param {!proto.sngpoker.AddPayoutStructureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.AddPayoutStructureResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AddPayoutStructureRequest,
 *   !proto.sngpoker.AddPayoutStructureResponse>}
 */
const methodInfo_Sng_addPayoutStructure = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.AddPayoutStructureResponse,
  /**
   * @param {!proto.sngpoker.AddPayoutStructureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.AddPayoutStructureResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AddPayoutStructureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.AddPayoutStructureResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.AddPayoutStructureResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.addPayoutStructure =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/addPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_addPayoutStructure,
      callback);
};


/**
 * @param {!proto.sngpoker.AddPayoutStructureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.AddPayoutStructureResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.addPayoutStructure =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/addPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_addPayoutStructure);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetPayoutStructureRequest,
 *   !proto.sngpoker.GetPayoutStructureResponse>}
 */
const methodDescriptor_Sng_getPayoutStructure = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getPayoutStructure',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GetPayoutStructureRequest,
  proto.sngpoker.GetPayoutStructureResponse,
  /**
   * @param {!proto.sngpoker.GetPayoutStructureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetPayoutStructureResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetPayoutStructureRequest,
 *   !proto.sngpoker.GetPayoutStructureResponse>}
 */
const methodInfo_Sng_getPayoutStructure = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetPayoutStructureResponse,
  /**
   * @param {!proto.sngpoker.GetPayoutStructureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetPayoutStructureResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetPayoutStructureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetPayoutStructureResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetPayoutStructureResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getPayoutStructure =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_getPayoutStructure,
      callback);
};


/**
 * @param {!proto.sngpoker.GetPayoutStructureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetPayoutStructureResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getPayoutStructure =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_getPayoutStructure);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ChangePasswordRequest,
 *   !proto.sngpoker.ChangePasswordResponse>}
 */
const methodDescriptor_Sng_changePassword = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/changePassword',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ChangePasswordRequest,
  proto.sngpoker.ChangePasswordResponse,
  /**
   * @param {!proto.sngpoker.ChangePasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ChangePasswordResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ChangePasswordRequest,
 *   !proto.sngpoker.ChangePasswordResponse>}
 */
const methodInfo_Sng_changePassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.ChangePasswordResponse,
  /**
   * @param {!proto.sngpoker.ChangePasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ChangePasswordResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.ChangePasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.ChangePasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.changePassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/changePassword',
      request,
      metadata || {},
      methodDescriptor_Sng_changePassword,
      callback);
};


/**
 * @param {!proto.sngpoker.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.ChangePasswordResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.changePassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/changePassword',
      request,
      metadata || {},
      methodDescriptor_Sng_changePassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ClientTokenRequest,
 *   !proto.sngpoker.ClientTokenResponse>}
 */
const methodDescriptor_Sng_getClientToken = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getClientToken',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ClientTokenRequest,
  proto.sngpoker.ClientTokenResponse,
  /**
   * @param {!proto.sngpoker.ClientTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ClientTokenResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ClientTokenRequest,
 *   !proto.sngpoker.ClientTokenResponse>}
 */
const methodInfo_Sng_getClientToken = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.ClientTokenResponse,
  /**
   * @param {!proto.sngpoker.ClientTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ClientTokenResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ClientTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.ClientTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.ClientTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getClientToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getClientToken',
      request,
      metadata || {},
      methodDescriptor_Sng_getClientToken,
      callback);
};


/**
 * @param {!proto.sngpoker.ClientTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.ClientTokenResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getClientToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getClientToken',
      request,
      metadata || {},
      methodDescriptor_Sng_getClientToken);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.VaultPaymentMethodRequest,
 *   !proto.sngpoker.VaultPaymentMethodResponse>}
 */
const methodDescriptor_Sng_vaultPaymentMethod = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/vaultPaymentMethod',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.VaultPaymentMethodRequest,
  proto.sngpoker.VaultPaymentMethodResponse,
  /**
   * @param {!proto.sngpoker.VaultPaymentMethodRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.VaultPaymentMethodResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.VaultPaymentMethodRequest,
 *   !proto.sngpoker.VaultPaymentMethodResponse>}
 */
const methodInfo_Sng_vaultPaymentMethod = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.VaultPaymentMethodResponse,
  /**
   * @param {!proto.sngpoker.VaultPaymentMethodRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.VaultPaymentMethodResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.VaultPaymentMethodRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.VaultPaymentMethodResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.VaultPaymentMethodResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.vaultPaymentMethod =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/vaultPaymentMethod',
      request,
      metadata || {},
      methodDescriptor_Sng_vaultPaymentMethod,
      callback);
};


/**
 * @param {!proto.sngpoker.VaultPaymentMethodRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.VaultPaymentMethodResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.vaultPaymentMethod =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/vaultPaymentMethod',
      request,
      metadata || {},
      methodDescriptor_Sng_vaultPaymentMethod);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.SignupRequest,
 *   !proto.sngpoker.SignupResult>}
 */
const methodDescriptor_Sng_validateExperian = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/validateExperian',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.SignupRequest,
  proto.sngpoker.SignupResult,
  /**
   * @param {!proto.sngpoker.SignupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.SignupResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.SignupRequest,
 *   !proto.sngpoker.SignupResult>}
 */
const methodInfo_Sng_validateExperian = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.SignupResult,
  /**
   * @param {!proto.sngpoker.SignupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.SignupResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.SignupResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.SignupResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.validateExperian =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/validateExperian',
      request,
      metadata || {},
      methodDescriptor_Sng_validateExperian,
      callback);
};


/**
 * @param {!proto.sngpoker.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.SignupResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.validateExperian =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/validateExperian',
      request,
      metadata || {},
      methodDescriptor_Sng_validateExperian);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetUserByEmailRequest,
 *   !proto.sngpoker.GetUserByEmailResponse>}
 */
const methodDescriptor_Sng_GetUserByEmail = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/GetUserByEmail',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GetUserByEmailRequest,
  proto.sngpoker.GetUserByEmailResponse,
  /**
   * @param {!proto.sngpoker.GetUserByEmailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetUserByEmailResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetUserByEmailRequest,
 *   !proto.sngpoker.GetUserByEmailResponse>}
 */
const methodInfo_Sng_GetUserByEmail = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetUserByEmailResponse,
  /**
   * @param {!proto.sngpoker.GetUserByEmailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetUserByEmailResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetUserByEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetUserByEmailResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetUserByEmailResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getUserByEmail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/GetUserByEmail',
      request,
      metadata || {},
      methodDescriptor_Sng_GetUserByEmail,
      callback);
};


/**
 * @param {!proto.sngpoker.GetUserByEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetUserByEmailResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getUserByEmail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/GetUserByEmail',
      request,
      metadata || {},
      methodDescriptor_Sng_GetUserByEmail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.MakeSngWithRandomUsersRequest,
 *   !proto.sngpoker.GetStatusResult>}
 */
const methodDescriptor_Sng_MakeSngWithRandomUsers = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/MakeSngWithRandomUsers',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.MakeSngWithRandomUsersRequest,
  proto.sngpoker.GetStatusResult,
  /**
   * @param {!proto.sngpoker.MakeSngWithRandomUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.MakeSngWithRandomUsersRequest,
 *   !proto.sngpoker.GetStatusResult>}
 */
const methodInfo_Sng_MakeSngWithRandomUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetStatusResult,
  /**
   * @param {!proto.sngpoker.MakeSngWithRandomUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetStatusResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.MakeSngWithRandomUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.makeSngWithRandomUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/MakeSngWithRandomUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_MakeSngWithRandomUsers,
      callback);
};


/**
 * @param {!proto.sngpoker.MakeSngWithRandomUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetStatusResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.makeSngWithRandomUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/MakeSngWithRandomUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_MakeSngWithRandomUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetRankingsRequest,
 *   !proto.sngpoker.GetRankingsResult>}
 */
const methodDescriptor_Sng_GetRankings = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/GetRankings',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GetRankingsRequest,
  proto.sngpoker.GetRankingsResult,
  /**
   * @param {!proto.sngpoker.GetRankingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetRankingsResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetRankingsRequest,
 *   !proto.sngpoker.GetRankingsResult>}
 */
const methodInfo_Sng_GetRankings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetRankingsResult,
  /**
   * @param {!proto.sngpoker.GetRankingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetRankingsResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetRankingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetRankingsResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetRankingsResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getRankings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/GetRankings',
      request,
      metadata || {},
      methodDescriptor_Sng_GetRankings,
      callback);
};


/**
 * @param {!proto.sngpoker.GetRankingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetRankingsResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getRankings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/GetRankings',
      request,
      metadata || {},
      methodDescriptor_Sng_GetRankings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.TableSubscribeRequest,
 *   !proto.sngpoker.TableSubscribeResponse>}
 */
const methodDescriptor_Sng_TableSubscribe = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/TableSubscribe',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sngpoker.TableSubscribeRequest,
  proto.sngpoker.TableSubscribeResponse,
  /**
   * @param {!proto.sngpoker.TableSubscribeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.TableSubscribeResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.TableSubscribeRequest,
 *   !proto.sngpoker.TableSubscribeResponse>}
 */
const methodInfo_Sng_TableSubscribe = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.TableSubscribeResponse,
  /**
   * @param {!proto.sngpoker.TableSubscribeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.TableSubscribeResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.TableSubscribeRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.TableSubscribeResponse>}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.tableSubscribe =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sngpoker.Sng/TableSubscribe',
      request,
      metadata || {},
      methodDescriptor_Sng_TableSubscribe);
};


/**
 * @param {!proto.sngpoker.TableSubscribeRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.TableSubscribeResponse>}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngPromiseClient.prototype.tableSubscribe =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sngpoker.Sng/TableSubscribe',
      request,
      metadata || {},
      methodDescriptor_Sng_TableSubscribe);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeolocationRequest,
 *   !proto.sngpoker.GeolocationResult>}
 */
const methodDescriptor_Sng_sendGeolocationData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/sendGeolocationData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeolocationRequest,
  proto.sngpoker.GeolocationResult,
  /**
   * @param {!proto.sngpoker.GeolocationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeolocationResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeolocationRequest,
 *   !proto.sngpoker.GeolocationResult>}
 */
const methodInfo_Sng_sendGeolocationData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeolocationResult,
  /**
   * @param {!proto.sngpoker.GeolocationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeolocationResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeolocationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeolocationResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeolocationResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.sendGeolocationData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/sendGeolocationData',
      request,
      metadata || {},
      methodDescriptor_Sng_sendGeolocationData,
      callback);
};


/**
 * @param {!proto.sngpoker.GeolocationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeolocationResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.sendGeolocationData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/sendGeolocationData',
      request,
      metadata || {},
      methodDescriptor_Sng_sendGeolocationData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.SearchUserRequest,
 *   !proto.sngpoker.SearchUserResult>}
 */
const methodDescriptor_Sng_searchUserByUsername = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/searchUserByUsername',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.SearchUserRequest,
  proto.sngpoker.SearchUserResult,
  /**
   * @param {!proto.sngpoker.SearchUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.SearchUserResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.SearchUserRequest,
 *   !proto.sngpoker.SearchUserResult>}
 */
const methodInfo_Sng_searchUserByUsername = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.SearchUserResult,
  /**
   * @param {!proto.sngpoker.SearchUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.SearchUserResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.SearchUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.SearchUserResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.SearchUserResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.searchUserByUsername =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/searchUserByUsername',
      request,
      metadata || {},
      methodDescriptor_Sng_searchUserByUsername,
      callback);
};


/**
 * @param {!proto.sngpoker.SearchUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.SearchUserResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.searchUserByUsername =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/searchUserByUsername',
      request,
      metadata || {},
      methodDescriptor_Sng_searchUserByUsername);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.WhitelistUserRequest,
 *   !proto.sngpoker.WhitelistUserResult>}
 */
const methodDescriptor_Sng_whitelistUser = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/whitelistUser',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.WhitelistUserRequest,
  proto.sngpoker.WhitelistUserResult,
  /**
   * @param {!proto.sngpoker.WhitelistUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.WhitelistUserResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.WhitelistUserRequest,
 *   !proto.sngpoker.WhitelistUserResult>}
 */
const methodInfo_Sng_whitelistUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.WhitelistUserResult,
  /**
   * @param {!proto.sngpoker.WhitelistUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.WhitelistUserResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.WhitelistUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.WhitelistUserResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.WhitelistUserResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.whitelistUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/whitelistUser',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistUser,
      callback);
};


/**
 * @param {!proto.sngpoker.WhitelistUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.WhitelistUserResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.whitelistUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/whitelistUser',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AcceptTOSRequest,
 *   !proto.sngpoker.AcceptTOSResult>}
 */
const methodDescriptor_Sng_acceptTOS = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/acceptTOS',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AcceptTOSRequest,
  proto.sngpoker.AcceptTOSResult,
  /**
   * @param {!proto.sngpoker.AcceptTOSRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.AcceptTOSResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AcceptTOSRequest,
 *   !proto.sngpoker.AcceptTOSResult>}
 */
const methodInfo_Sng_acceptTOS = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.AcceptTOSResult,
  /**
   * @param {!proto.sngpoker.AcceptTOSRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.AcceptTOSResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AcceptTOSRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.AcceptTOSResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.AcceptTOSResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.acceptTOS =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/acceptTOS',
      request,
      metadata || {},
      methodDescriptor_Sng_acceptTOS,
      callback);
};


/**
 * @param {!proto.sngpoker.AcceptTOSRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.AcceptTOSResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.acceptTOS =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/acceptTOS',
      request,
      metadata || {},
      methodDescriptor_Sng_acceptTOS);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AccountUpdatesRequest,
 *   !proto.sngpoker.AccountUpdatesResult>}
 */
const methodDescriptor_Sng_checkForUpdates = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/checkForUpdates',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AccountUpdatesRequest,
  proto.sngpoker.AccountUpdatesResult,
  /**
   * @param {!proto.sngpoker.AccountUpdatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.AccountUpdatesResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AccountUpdatesRequest,
 *   !proto.sngpoker.AccountUpdatesResult>}
 */
const methodInfo_Sng_checkForUpdates = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.AccountUpdatesResult,
  /**
   * @param {!proto.sngpoker.AccountUpdatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.AccountUpdatesResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AccountUpdatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.AccountUpdatesResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.AccountUpdatesResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.checkForUpdates =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/checkForUpdates',
      request,
      metadata || {},
      methodDescriptor_Sng_checkForUpdates,
      callback);
};


/**
 * @param {!proto.sngpoker.AccountUpdatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.AccountUpdatesResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.checkForUpdates =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/checkForUpdates',
      request,
      metadata || {},
      methodDescriptor_Sng_checkForUpdates);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.WhitelistedUsersRequest,
 *   !proto.sngpoker.WhitelistedUsersResult>}
 */
const methodDescriptor_Sng_getWhitelistedUsers = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getWhitelistedUsers',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.WhitelistedUsersRequest,
  proto.sngpoker.WhitelistedUsersResult,
  /**
   * @param {!proto.sngpoker.WhitelistedUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.WhitelistedUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.WhitelistedUsersRequest,
 *   !proto.sngpoker.WhitelistedUsersResult>}
 */
const methodInfo_Sng_getWhitelistedUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.WhitelistedUsersResult,
  /**
   * @param {!proto.sngpoker.WhitelistedUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.WhitelistedUsersResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.WhitelistedUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.WhitelistedUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.WhitelistedUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getWhitelistedUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getWhitelistedUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedUsers,
      callback);
};


/**
 * @param {!proto.sngpoker.WhitelistedUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.WhitelistedUsersResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getWhitelistedUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getWhitelistedUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.WhitelistUserRequest,
 *   !proto.sngpoker.WhitelistUserResult>}
 */
const methodDescriptor_Sng_removeWhitelistUser = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/removeWhitelistUser',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.WhitelistUserRequest,
  proto.sngpoker.WhitelistUserResult,
  /**
   * @param {!proto.sngpoker.WhitelistUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.WhitelistUserResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.WhitelistUserRequest,
 *   !proto.sngpoker.WhitelistUserResult>}
 */
const methodInfo_Sng_removeWhitelistUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.WhitelistUserResult,
  /**
   * @param {!proto.sngpoker.WhitelistUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.WhitelistUserResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.WhitelistUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.WhitelistUserResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.WhitelistUserResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.removeWhitelistUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/removeWhitelistUser',
      request,
      metadata || {},
      methodDescriptor_Sng_removeWhitelistUser,
      callback);
};


/**
 * @param {!proto.sngpoker.WhitelistUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.WhitelistUserResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.removeWhitelistUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/removeWhitelistUser',
      request,
      metadata || {},
      methodDescriptor_Sng_removeWhitelistUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.TournamentDetailsRequest,
 *   !proto.sngpoker.TournamentDetailsResponse>}
 */
const methodDescriptor_Sng_getTournamentDetails = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getTournamentDetails',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.TournamentDetailsRequest,
  proto.sngpoker.TournamentDetailsResponse,
  /**
   * @param {!proto.sngpoker.TournamentDetailsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.TournamentDetailsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.TournamentDetailsRequest,
 *   !proto.sngpoker.TournamentDetailsResponse>}
 */
const methodInfo_Sng_getTournamentDetails = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.TournamentDetailsResponse,
  /**
   * @param {!proto.sngpoker.TournamentDetailsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.TournamentDetailsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.TournamentDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.TournamentDetailsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.TournamentDetailsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getTournamentDetails =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getTournamentDetails',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentDetails,
      callback);
};


/**
 * @param {!proto.sngpoker.TournamentDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.TournamentDetailsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getTournamentDetails =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getTournamentDetails',
      request,
      metadata || {},
      methodDescriptor_Sng_getTournamentDetails);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.PlayerAccountBalanceRequest,
 *   !proto.sngpoker.PlayerAccountBalanceResult>}
 */
const methodDescriptor_Sng_getPlayerAccountBalance = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getPlayerAccountBalance',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.PlayerAccountBalanceRequest,
  proto.sngpoker.PlayerAccountBalanceResult,
  /**
   * @param {!proto.sngpoker.PlayerAccountBalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerAccountBalanceResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.PlayerAccountBalanceRequest,
 *   !proto.sngpoker.PlayerAccountBalanceResult>}
 */
const methodInfo_Sng_getPlayerAccountBalance = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.PlayerAccountBalanceResult,
  /**
   * @param {!proto.sngpoker.PlayerAccountBalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerAccountBalanceResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.PlayerAccountBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.PlayerAccountBalanceResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.PlayerAccountBalanceResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getPlayerAccountBalance =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getPlayerAccountBalance',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerAccountBalance,
      callback);
};


/**
 * @param {!proto.sngpoker.PlayerAccountBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.PlayerAccountBalanceResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getPlayerAccountBalance =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getPlayerAccountBalance',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerAccountBalance);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.NextTournamentRequest,
 *   !proto.sngpoker.NextTournamentResult>}
 */
const methodDescriptor_Sng_getNextTournament = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getNextTournament',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.NextTournamentRequest,
  proto.sngpoker.NextTournamentResult,
  /**
   * @param {!proto.sngpoker.NextTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.NextTournamentResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.NextTournamentRequest,
 *   !proto.sngpoker.NextTournamentResult>}
 */
const methodInfo_Sng_getNextTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.NextTournamentResult,
  /**
   * @param {!proto.sngpoker.NextTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.NextTournamentResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.NextTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.NextTournamentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.NextTournamentResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getNextTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getNextTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_getNextTournament,
      callback);
};


/**
 * @param {!proto.sngpoker.NextTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.NextTournamentResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getNextTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getNextTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_getNextTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.JoinAnyTournamentRequest,
 *   !proto.sngpoker.JoinAnyTournamentResult>}
 */
const methodDescriptor_Sng_joinAnyTournament = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/joinAnyTournament',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.JoinAnyTournamentRequest,
  proto.sngpoker.JoinAnyTournamentResult,
  /**
   * @param {!proto.sngpoker.JoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.JoinAnyTournamentResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.JoinAnyTournamentRequest,
 *   !proto.sngpoker.JoinAnyTournamentResult>}
 */
const methodInfo_Sng_joinAnyTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.JoinAnyTournamentResult,
  /**
   * @param {!proto.sngpoker.JoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.JoinAnyTournamentResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.JoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.JoinAnyTournamentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.JoinAnyTournamentResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.joinAnyTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/joinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_joinAnyTournament,
      callback);
};


/**
 * @param {!proto.sngpoker.JoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.JoinAnyTournamentResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.joinAnyTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/joinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_joinAnyTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.UnregisterAnyTournamentRequest,
 *   !proto.sngpoker.UnregisterAnyTournamentResult>}
 */
const methodDescriptor_Sng_unregisterAnyTournament = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/unregisterAnyTournament',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.UnregisterAnyTournamentRequest,
  proto.sngpoker.UnregisterAnyTournamentResult,
  /**
   * @param {!proto.sngpoker.UnregisterAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UnregisterAnyTournamentResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.UnregisterAnyTournamentRequest,
 *   !proto.sngpoker.UnregisterAnyTournamentResult>}
 */
const methodInfo_Sng_unregisterAnyTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.UnregisterAnyTournamentResult,
  /**
   * @param {!proto.sngpoker.UnregisterAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UnregisterAnyTournamentResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.UnregisterAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.UnregisterAnyTournamentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.UnregisterAnyTournamentResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.unregisterAnyTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/unregisterAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_unregisterAnyTournament,
      callback);
};


/**
 * @param {!proto.sngpoker.UnregisterAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.UnregisterAnyTournamentResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.unregisterAnyTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/unregisterAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_unregisterAnyTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.JoinAnyTournamentStatusRequest,
 *   !proto.sngpoker.JoinAnyTournamentStatusResult>}
 */
const methodDescriptor_Sng_getJoinAnyTournamentStatus = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getJoinAnyTournamentStatus',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.JoinAnyTournamentStatusRequest,
  proto.sngpoker.JoinAnyTournamentStatusResult,
  /**
   * @param {!proto.sngpoker.JoinAnyTournamentStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.JoinAnyTournamentStatusResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.JoinAnyTournamentStatusRequest,
 *   !proto.sngpoker.JoinAnyTournamentStatusResult>}
 */
const methodInfo_Sng_getJoinAnyTournamentStatus = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.JoinAnyTournamentStatusResult,
  /**
   * @param {!proto.sngpoker.JoinAnyTournamentStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.JoinAnyTournamentStatusResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.JoinAnyTournamentStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.JoinAnyTournamentStatusResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.JoinAnyTournamentStatusResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getJoinAnyTournamentStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getJoinAnyTournamentStatus',
      request,
      metadata || {},
      methodDescriptor_Sng_getJoinAnyTournamentStatus,
      callback);
};


/**
 * @param {!proto.sngpoker.JoinAnyTournamentStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.JoinAnyTournamentStatusResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getJoinAnyTournamentStatus =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getJoinAnyTournamentStatus',
      request,
      metadata || {},
      methodDescriptor_Sng_getJoinAnyTournamentStatus);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ActiveJoinAnyTournamentsRequest,
 *   !proto.sngpoker.ActiveJoinAnyTournamentsResult>}
 */
const methodDescriptor_Sng_getActiveJoinAnyTournaments = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getActiveJoinAnyTournaments',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ActiveJoinAnyTournamentsRequest,
  proto.sngpoker.ActiveJoinAnyTournamentsResult,
  /**
   * @param {!proto.sngpoker.ActiveJoinAnyTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ActiveJoinAnyTournamentsResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ActiveJoinAnyTournamentsRequest,
 *   !proto.sngpoker.ActiveJoinAnyTournamentsResult>}
 */
const methodInfo_Sng_getActiveJoinAnyTournaments = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.ActiveJoinAnyTournamentsResult,
  /**
   * @param {!proto.sngpoker.ActiveJoinAnyTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ActiveJoinAnyTournamentsResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ActiveJoinAnyTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.ActiveJoinAnyTournamentsResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.ActiveJoinAnyTournamentsResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getActiveJoinAnyTournaments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getActiveJoinAnyTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getActiveJoinAnyTournaments,
      callback);
};


/**
 * @param {!proto.sngpoker.ActiveJoinAnyTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.ActiveJoinAnyTournamentsResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getActiveJoinAnyTournaments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getActiveJoinAnyTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getActiveJoinAnyTournaments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.JoinAnyUsersListRequest,
 *   !proto.sngpoker.JoinAnyUsersListResult>}
 */
const methodDescriptor_Sng_getJoinAnyUsersList = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getJoinAnyUsersList',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.JoinAnyUsersListRequest,
  proto.sngpoker.JoinAnyUsersListResult,
  /**
   * @param {!proto.sngpoker.JoinAnyUsersListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.JoinAnyUsersListResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.JoinAnyUsersListRequest,
 *   !proto.sngpoker.JoinAnyUsersListResult>}
 */
const methodInfo_Sng_getJoinAnyUsersList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.JoinAnyUsersListResult,
  /**
   * @param {!proto.sngpoker.JoinAnyUsersListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.JoinAnyUsersListResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.JoinAnyUsersListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.JoinAnyUsersListResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.JoinAnyUsersListResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getJoinAnyUsersList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getJoinAnyUsersList',
      request,
      metadata || {},
      methodDescriptor_Sng_getJoinAnyUsersList,
      callback);
};


/**
 * @param {!proto.sngpoker.JoinAnyUsersListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.JoinAnyUsersListResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getJoinAnyUsersList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getJoinAnyUsersList',
      request,
      metadata || {},
      methodDescriptor_Sng_getJoinAnyUsersList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.CancelJoinAnyTournamentRequest,
 *   !proto.sngpoker.CancelJoinAnyTournamentResult>}
 */
const methodDescriptor_Sng_cancelJoinAnyTournament = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/cancelJoinAnyTournament',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.CancelJoinAnyTournamentRequest,
  proto.sngpoker.CancelJoinAnyTournamentResult,
  /**
   * @param {!proto.sngpoker.CancelJoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CancelJoinAnyTournamentResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.CancelJoinAnyTournamentRequest,
 *   !proto.sngpoker.CancelJoinAnyTournamentResult>}
 */
const methodInfo_Sng_cancelJoinAnyTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.CancelJoinAnyTournamentResult,
  /**
   * @param {!proto.sngpoker.CancelJoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CancelJoinAnyTournamentResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.CancelJoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.CancelJoinAnyTournamentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.CancelJoinAnyTournamentResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.cancelJoinAnyTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/cancelJoinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyTournament,
      callback);
};


/**
 * @param {!proto.sngpoker.CancelJoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.CancelJoinAnyTournamentResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.cancelJoinAnyTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/cancelJoinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.CancelJoinAnyUsersRequest,
 *   !proto.sngpoker.CancelJoinAnyUsersResult>}
 */
const methodDescriptor_Sng_cancelJoinAnyMultipleUsers = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/cancelJoinAnyMultipleUsers',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.CancelJoinAnyUsersRequest,
  proto.sngpoker.CancelJoinAnyUsersResult,
  /**
   * @param {!proto.sngpoker.CancelJoinAnyUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CancelJoinAnyUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.CancelJoinAnyUsersRequest,
 *   !proto.sngpoker.CancelJoinAnyUsersResult>}
 */
const methodInfo_Sng_cancelJoinAnyMultipleUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.CancelJoinAnyUsersResult,
  /**
   * @param {!proto.sngpoker.CancelJoinAnyUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CancelJoinAnyUsersResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.CancelJoinAnyUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.CancelJoinAnyUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.CancelJoinAnyUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.cancelJoinAnyMultipleUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/cancelJoinAnyMultipleUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyMultipleUsers,
      callback);
};


/**
 * @param {!proto.sngpoker.CancelJoinAnyUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.CancelJoinAnyUsersResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.cancelJoinAnyMultipleUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/cancelJoinAnyMultipleUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyMultipleUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.JoinAnyTournamentStatusRequest,
 *   !proto.sngpoker.CancelJoinAnyUsersResult>}
 */
const methodDescriptor_Sng_cancelJoinAnyAllUsers = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/cancelJoinAnyAllUsers',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.JoinAnyTournamentStatusRequest,
  proto.sngpoker.CancelJoinAnyUsersResult,
  /**
   * @param {!proto.sngpoker.JoinAnyTournamentStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CancelJoinAnyUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.JoinAnyTournamentStatusRequest,
 *   !proto.sngpoker.CancelJoinAnyUsersResult>}
 */
const methodInfo_Sng_cancelJoinAnyAllUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.CancelJoinAnyUsersResult,
  /**
   * @param {!proto.sngpoker.JoinAnyTournamentStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CancelJoinAnyUsersResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.JoinAnyTournamentStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.CancelJoinAnyUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.CancelJoinAnyUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.cancelJoinAnyAllUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/cancelJoinAnyAllUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyAllUsers,
      callback);
};


/**
 * @param {!proto.sngpoker.JoinAnyTournamentStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.CancelJoinAnyUsersResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.cancelJoinAnyAllUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/cancelJoinAnyAllUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelJoinAnyAllUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.CancelTournamentsRequest,
 *   !proto.sngpoker.CancelTournamentsResponse>}
 */
const methodDescriptor_Sng_cancelTournaments = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/cancelTournaments',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.CancelTournamentsRequest,
  proto.sngpoker.CancelTournamentsResponse,
  /**
   * @param {!proto.sngpoker.CancelTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CancelTournamentsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.CancelTournamentsRequest,
 *   !proto.sngpoker.CancelTournamentsResponse>}
 */
const methodInfo_Sng_cancelTournaments = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.CancelTournamentsResponse,
  /**
   * @param {!proto.sngpoker.CancelTournamentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CancelTournamentsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.CancelTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.CancelTournamentsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.CancelTournamentsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.cancelTournaments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/cancelTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelTournaments,
      callback);
};


/**
 * @param {!proto.sngpoker.CancelTournamentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.CancelTournamentsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.cancelTournaments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/cancelTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_cancelTournaments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AddonPlayerRequest,
 *   !proto.sngpoker.AddonPlayerResponse>}
 */
const methodDescriptor_Sng_addonPlayer = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/addonPlayer',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AddonPlayerRequest,
  proto.sngpoker.AddonPlayerResponse,
  /**
   * @param {!proto.sngpoker.AddonPlayerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.AddonPlayerResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AddonPlayerRequest,
 *   !proto.sngpoker.AddonPlayerResponse>}
 */
const methodInfo_Sng_addonPlayer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.AddonPlayerResponse,
  /**
   * @param {!proto.sngpoker.AddonPlayerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.AddonPlayerResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AddonPlayerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.AddonPlayerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.AddonPlayerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.addonPlayer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/addonPlayer',
      request,
      metadata || {},
      methodDescriptor_Sng_addonPlayer,
      callback);
};


/**
 * @param {!proto.sngpoker.AddonPlayerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.AddonPlayerResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.addonPlayer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/addonPlayer',
      request,
      metadata || {},
      methodDescriptor_Sng_addonPlayer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.PrizeRevealRequest,
 *   !proto.sngpoker.PrizeRevealResponse>}
 */
const methodDescriptor_Sng_setPrizeAsRevealed = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/setPrizeAsRevealed',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.PrizeRevealRequest,
  proto.sngpoker.PrizeRevealResponse,
  /**
   * @param {!proto.sngpoker.PrizeRevealRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PrizeRevealResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.PrizeRevealRequest,
 *   !proto.sngpoker.PrizeRevealResponse>}
 */
const methodInfo_Sng_setPrizeAsRevealed = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.PrizeRevealResponse,
  /**
   * @param {!proto.sngpoker.PrizeRevealRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PrizeRevealResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.PrizeRevealRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.PrizeRevealResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.PrizeRevealResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.setPrizeAsRevealed =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/setPrizeAsRevealed',
      request,
      metadata || {},
      methodDescriptor_Sng_setPrizeAsRevealed,
      callback);
};


/**
 * @param {!proto.sngpoker.PrizeRevealRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.PrizeRevealResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.setPrizeAsRevealed =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/setPrizeAsRevealed',
      request,
      metadata || {},
      methodDescriptor_Sng_setPrizeAsRevealed);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeofenceRequest,
 *   !proto.sngpoker.GeofenceResponse>}
 */
const methodDescriptor_Sng_getGeofenceData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getGeofenceData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeofenceRequest,
  proto.sngpoker.GeofenceResponse,
  /**
   * @param {!proto.sngpoker.GeofenceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeofenceRequest,
 *   !proto.sngpoker.GeofenceResponse>}
 */
const methodInfo_Sng_getGeofenceData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeofenceResponse,
  /**
   * @param {!proto.sngpoker.GeofenceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeofenceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeofenceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeofenceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getGeofenceData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_getGeofenceData,
      callback);
};


/**
 * @param {!proto.sngpoker.GeofenceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeofenceResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getGeofenceData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_getGeofenceData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeofenceAddRequest,
 *   !proto.sngpoker.GeofenceAddResponse>}
 */
const methodDescriptor_Sng_addGeofenceData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/addGeofenceData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeofenceAddRequest,
  proto.sngpoker.GeofenceAddResponse,
  /**
   * @param {!proto.sngpoker.GeofenceAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceAddResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeofenceAddRequest,
 *   !proto.sngpoker.GeofenceAddResponse>}
 */
const methodInfo_Sng_addGeofenceData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeofenceAddResponse,
  /**
   * @param {!proto.sngpoker.GeofenceAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceAddResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeofenceAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeofenceAddResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeofenceAddResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.addGeofenceData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/addGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_addGeofenceData,
      callback);
};


/**
 * @param {!proto.sngpoker.GeofenceAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeofenceAddResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.addGeofenceData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/addGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_addGeofenceData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeofenceUpdateRequest,
 *   !proto.sngpoker.GeofenceUpdateResponse>}
 */
const methodDescriptor_Sng_updateGeofenceData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/updateGeofenceData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeofenceUpdateRequest,
  proto.sngpoker.GeofenceUpdateResponse,
  /**
   * @param {!proto.sngpoker.GeofenceUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceUpdateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeofenceUpdateRequest,
 *   !proto.sngpoker.GeofenceUpdateResponse>}
 */
const methodInfo_Sng_updateGeofenceData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeofenceUpdateResponse,
  /**
   * @param {!proto.sngpoker.GeofenceUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceUpdateResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeofenceUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeofenceUpdateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeofenceUpdateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.updateGeofenceData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/updateGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateGeofenceData,
      callback);
};


/**
 * @param {!proto.sngpoker.GeofenceUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeofenceUpdateResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.updateGeofenceData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/updateGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateGeofenceData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeofenceRemoveRequest,
 *   !proto.sngpoker.GeofenceRemoveResponse>}
 */
const methodDescriptor_Sng_removeGeofenceData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/removeGeofenceData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeofenceRemoveRequest,
  proto.sngpoker.GeofenceRemoveResponse,
  /**
   * @param {!proto.sngpoker.GeofenceRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceRemoveResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeofenceRemoveRequest,
 *   !proto.sngpoker.GeofenceRemoveResponse>}
 */
const methodInfo_Sng_removeGeofenceData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeofenceRemoveResponse,
  /**
   * @param {!proto.sngpoker.GeofenceRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceRemoveResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeofenceRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeofenceRemoveResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeofenceRemoveResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.removeGeofenceData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/removeGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeGeofenceData,
      callback);
};


/**
 * @param {!proto.sngpoker.GeofenceRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeofenceRemoveResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.removeGeofenceData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/removeGeofenceData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeGeofenceData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeofenceWhitelistRequest,
 *   !proto.sngpoker.GeofenceWhitelistResponse>}
 */
const methodDescriptor_Sng_whitelistUsersOnGeofence = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/whitelistUsersOnGeofence',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeofenceWhitelistRequest,
  proto.sngpoker.GeofenceWhitelistResponse,
  /**
   * @param {!proto.sngpoker.GeofenceWhitelistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceWhitelistResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeofenceWhitelistRequest,
 *   !proto.sngpoker.GeofenceWhitelistResponse>}
 */
const methodInfo_Sng_whitelistUsersOnGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeofenceWhitelistResponse,
  /**
   * @param {!proto.sngpoker.GeofenceWhitelistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceWhitelistResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeofenceWhitelistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeofenceWhitelistResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeofenceWhitelistResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.whitelistUsersOnGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/whitelistUsersOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistUsersOnGeofence,
      callback);
};


/**
 * @param {!proto.sngpoker.GeofenceWhitelistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeofenceWhitelistResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.whitelistUsersOnGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/whitelistUsersOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistUsersOnGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeofenceBlacklistRequest,
 *   !proto.sngpoker.GeofenceBlacklistResponse>}
 */
const methodDescriptor_Sng_blacklistUsersOnGeofence = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/blacklistUsersOnGeofence',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeofenceBlacklistRequest,
  proto.sngpoker.GeofenceBlacklistResponse,
  /**
   * @param {!proto.sngpoker.GeofenceBlacklistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceBlacklistResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeofenceBlacklistRequest,
 *   !proto.sngpoker.GeofenceBlacklistResponse>}
 */
const methodInfo_Sng_blacklistUsersOnGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeofenceBlacklistResponse,
  /**
   * @param {!proto.sngpoker.GeofenceBlacklistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceBlacklistResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeofenceBlacklistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeofenceBlacklistResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeofenceBlacklistResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.blacklistUsersOnGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/blacklistUsersOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_blacklistUsersOnGeofence,
      callback);
};


/**
 * @param {!proto.sngpoker.GeofenceBlacklistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeofenceBlacklistResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.blacklistUsersOnGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/blacklistUsersOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_blacklistUsersOnGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeofenceWhitelistRequest,
 *   !proto.sngpoker.GeofenceWhitelistResponse>}
 */
const methodDescriptor_Sng_whitelistClientsOnGeofence = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/whitelistClientsOnGeofence',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeofenceWhitelistRequest,
  proto.sngpoker.GeofenceWhitelistResponse,
  /**
   * @param {!proto.sngpoker.GeofenceWhitelistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceWhitelistResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeofenceWhitelistRequest,
 *   !proto.sngpoker.GeofenceWhitelistResponse>}
 */
const methodInfo_Sng_whitelistClientsOnGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeofenceWhitelistResponse,
  /**
   * @param {!proto.sngpoker.GeofenceWhitelistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceWhitelistResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeofenceWhitelistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeofenceWhitelistResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeofenceWhitelistResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.whitelistClientsOnGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/whitelistClientsOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistClientsOnGeofence,
      callback);
};


/**
 * @param {!proto.sngpoker.GeofenceWhitelistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeofenceWhitelistResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.whitelistClientsOnGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/whitelistClientsOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_whitelistClientsOnGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeofenceBlacklistRequest,
 *   !proto.sngpoker.GeofenceBlacklistResponse>}
 */
const methodDescriptor_Sng_blacklistClientsOnGeofence = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/blacklistClientsOnGeofence',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeofenceBlacklistRequest,
  proto.sngpoker.GeofenceBlacklistResponse,
  /**
   * @param {!proto.sngpoker.GeofenceBlacklistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceBlacklistResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeofenceBlacklistRequest,
 *   !proto.sngpoker.GeofenceBlacklistResponse>}
 */
const methodInfo_Sng_blacklistClientsOnGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeofenceBlacklistResponse,
  /**
   * @param {!proto.sngpoker.GeofenceBlacklistRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceBlacklistResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeofenceBlacklistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeofenceBlacklistResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeofenceBlacklistResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.blacklistClientsOnGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/blacklistClientsOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_blacklistClientsOnGeofence,
      callback);
};


/**
 * @param {!proto.sngpoker.GeofenceBlacklistRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeofenceBlacklistResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.blacklistClientsOnGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/blacklistClientsOnGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_blacklistClientsOnGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeofenceUsersRequest,
 *   !proto.sngpoker.GeofenceUsersResponse>}
 */
const methodDescriptor_Sng_getWhitelistedUsersonGeofence = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getWhitelistedUsersonGeofence',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeofenceUsersRequest,
  proto.sngpoker.GeofenceUsersResponse,
  /**
   * @param {!proto.sngpoker.GeofenceUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceUsersResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeofenceUsersRequest,
 *   !proto.sngpoker.GeofenceUsersResponse>}
 */
const methodInfo_Sng_getWhitelistedUsersonGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeofenceUsersResponse,
  /**
   * @param {!proto.sngpoker.GeofenceUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceUsersResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeofenceUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeofenceUsersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeofenceUsersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getWhitelistedUsersonGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getWhitelistedUsersonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedUsersonGeofence,
      callback);
};


/**
 * @param {!proto.sngpoker.GeofenceUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeofenceUsersResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getWhitelistedUsersonGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getWhitelistedUsersonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedUsersonGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeofenceUsersRequest,
 *   !proto.sngpoker.GeofenceUsersResponse>}
 */
const methodDescriptor_Sng_getBlacklistedUsersonGeofence = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getBlacklistedUsersonGeofence',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeofenceUsersRequest,
  proto.sngpoker.GeofenceUsersResponse,
  /**
   * @param {!proto.sngpoker.GeofenceUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceUsersResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeofenceUsersRequest,
 *   !proto.sngpoker.GeofenceUsersResponse>}
 */
const methodInfo_Sng_getBlacklistedUsersonGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeofenceUsersResponse,
  /**
   * @param {!proto.sngpoker.GeofenceUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceUsersResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeofenceUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeofenceUsersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeofenceUsersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getBlacklistedUsersonGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getBlacklistedUsersonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getBlacklistedUsersonGeofence,
      callback);
};


/**
 * @param {!proto.sngpoker.GeofenceUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeofenceUsersResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getBlacklistedUsersonGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getBlacklistedUsersonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getBlacklistedUsersonGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeofenceGlobalRuleRequest,
 *   !proto.sngpoker.GeofenceGlobalRuleResponse>}
 */
const methodDescriptor_Sng_setGeofenceGlobalRule = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/setGeofenceGlobalRule',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeofenceGlobalRuleRequest,
  proto.sngpoker.GeofenceGlobalRuleResponse,
  /**
   * @param {!proto.sngpoker.GeofenceGlobalRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceGlobalRuleResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeofenceGlobalRuleRequest,
 *   !proto.sngpoker.GeofenceGlobalRuleResponse>}
 */
const methodInfo_Sng_setGeofenceGlobalRule = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeofenceGlobalRuleResponse,
  /**
   * @param {!proto.sngpoker.GeofenceGlobalRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceGlobalRuleResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeofenceGlobalRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeofenceGlobalRuleResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeofenceGlobalRuleResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.setGeofenceGlobalRule =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/setGeofenceGlobalRule',
      request,
      metadata || {},
      methodDescriptor_Sng_setGeofenceGlobalRule,
      callback);
};


/**
 * @param {!proto.sngpoker.GeofenceGlobalRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeofenceGlobalRuleResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.setGeofenceGlobalRule =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/setGeofenceGlobalRule',
      request,
      metadata || {},
      methodDescriptor_Sng_setGeofenceGlobalRule);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeofenceClientsRequest,
 *   !proto.sngpoker.GeofenceClientsResponse>}
 */
const methodDescriptor_Sng_getWhitelistedClientsonGeofence = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getWhitelistedClientsonGeofence',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeofenceClientsRequest,
  proto.sngpoker.GeofenceClientsResponse,
  /**
   * @param {!proto.sngpoker.GeofenceClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceClientsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeofenceClientsRequest,
 *   !proto.sngpoker.GeofenceClientsResponse>}
 */
const methodInfo_Sng_getWhitelistedClientsonGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeofenceClientsResponse,
  /**
   * @param {!proto.sngpoker.GeofenceClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceClientsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeofenceClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeofenceClientsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeofenceClientsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getWhitelistedClientsonGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getWhitelistedClientsonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedClientsonGeofence,
      callback);
};


/**
 * @param {!proto.sngpoker.GeofenceClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeofenceClientsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getWhitelistedClientsonGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getWhitelistedClientsonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getWhitelistedClientsonGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeofenceClientsRequest,
 *   !proto.sngpoker.GeofenceClientsResponse>}
 */
const methodDescriptor_Sng_getBlacklistedClientsonGeofence = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getBlacklistedClientsonGeofence',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeofenceClientsRequest,
  proto.sngpoker.GeofenceClientsResponse,
  /**
   * @param {!proto.sngpoker.GeofenceClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceClientsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeofenceClientsRequest,
 *   !proto.sngpoker.GeofenceClientsResponse>}
 */
const methodInfo_Sng_getBlacklistedClientsonGeofence = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeofenceClientsResponse,
  /**
   * @param {!proto.sngpoker.GeofenceClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceClientsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeofenceClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeofenceClientsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeofenceClientsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getBlacklistedClientsonGeofence =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getBlacklistedClientsonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getBlacklistedClientsonGeofence,
      callback);
};


/**
 * @param {!proto.sngpoker.GeofenceClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeofenceClientsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getBlacklistedClientsonGeofence =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getBlacklistedClientsonGeofence',
      request,
      metadata || {},
      methodDescriptor_Sng_getBlacklistedClientsonGeofence);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeofenceClientGlobalRuleRequest,
 *   !proto.sngpoker.GeofenceClientGlobalRuleResponse>}
 */
const methodDescriptor_Sng_setGeofenceClientGlobalRule = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/setGeofenceClientGlobalRule',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeofenceClientGlobalRuleRequest,
  proto.sngpoker.GeofenceClientGlobalRuleResponse,
  /**
   * @param {!proto.sngpoker.GeofenceClientGlobalRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceClientGlobalRuleResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeofenceClientGlobalRuleRequest,
 *   !proto.sngpoker.GeofenceClientGlobalRuleResponse>}
 */
const methodInfo_Sng_setGeofenceClientGlobalRule = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeofenceClientGlobalRuleResponse,
  /**
   * @param {!proto.sngpoker.GeofenceClientGlobalRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeofenceClientGlobalRuleResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeofenceClientGlobalRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeofenceClientGlobalRuleResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeofenceClientGlobalRuleResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.setGeofenceClientGlobalRule =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/setGeofenceClientGlobalRule',
      request,
      metadata || {},
      methodDescriptor_Sng_setGeofenceClientGlobalRule,
      callback);
};


/**
 * @param {!proto.sngpoker.GeofenceClientGlobalRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeofenceClientGlobalRuleResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.setGeofenceClientGlobalRule =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/setGeofenceClientGlobalRule',
      request,
      metadata || {},
      methodDescriptor_Sng_setGeofenceClientGlobalRule);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.WhitelistedClientsRequest,
 *   !proto.sngpoker.WhitelistedClientsResult>}
 */
const methodDescriptor_Sng_getClients = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getClients',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.WhitelistedClientsRequest,
  proto.sngpoker.WhitelistedClientsResult,
  /**
   * @param {!proto.sngpoker.WhitelistedClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.WhitelistedClientsResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.WhitelistedClientsRequest,
 *   !proto.sngpoker.WhitelistedClientsResult>}
 */
const methodInfo_Sng_getClients = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.WhitelistedClientsResult,
  /**
   * @param {!proto.sngpoker.WhitelistedClientsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.WhitelistedClientsResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.WhitelistedClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.WhitelistedClientsResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.WhitelistedClientsResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getClients =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getClients',
      request,
      metadata || {},
      methodDescriptor_Sng_getClients,
      callback);
};


/**
 * @param {!proto.sngpoker.WhitelistedClientsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.WhitelistedClientsResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getClients =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getClients',
      request,
      metadata || {},
      methodDescriptor_Sng_getClients);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.UpdateAccountBalanceRequest,
 *   !proto.sngpoker.UpdateAccountBalanceResponse>}
 */
const methodDescriptor_Sng_updatePlayerAccountBalance = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/updatePlayerAccountBalance',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.UpdateAccountBalanceRequest,
  proto.sngpoker.UpdateAccountBalanceResponse,
  /**
   * @param {!proto.sngpoker.UpdateAccountBalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UpdateAccountBalanceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.UpdateAccountBalanceRequest,
 *   !proto.sngpoker.UpdateAccountBalanceResponse>}
 */
const methodInfo_Sng_updatePlayerAccountBalance = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.UpdateAccountBalanceResponse,
  /**
   * @param {!proto.sngpoker.UpdateAccountBalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UpdateAccountBalanceResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.UpdateAccountBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.UpdateAccountBalanceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.UpdateAccountBalanceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.updatePlayerAccountBalance =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/updatePlayerAccountBalance',
      request,
      metadata || {},
      methodDescriptor_Sng_updatePlayerAccountBalance,
      callback);
};


/**
 * @param {!proto.sngpoker.UpdateAccountBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.UpdateAccountBalanceResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.updatePlayerAccountBalance =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/updatePlayerAccountBalance',
      request,
      metadata || {},
      methodDescriptor_Sng_updatePlayerAccountBalance);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.RankHandsRequest,
 *   !proto.sngpoker.RankHandsResult>}
 */
const methodDescriptor_Sng_rankHands = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/rankHands',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.RankHandsRequest,
  proto.sngpoker.RankHandsResult,
  /**
   * @param {!proto.sngpoker.RankHandsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.RankHandsResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.RankHandsRequest,
 *   !proto.sngpoker.RankHandsResult>}
 */
const methodInfo_Sng_rankHands = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.RankHandsResult,
  /**
   * @param {!proto.sngpoker.RankHandsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.RankHandsResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.RankHandsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.RankHandsResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.RankHandsResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.rankHands =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/rankHands',
      request,
      metadata || {},
      methodDescriptor_Sng_rankHands,
      callback);
};


/**
 * @param {!proto.sngpoker.RankHandsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.RankHandsResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.rankHands =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/rankHands',
      request,
      metadata || {},
      methodDescriptor_Sng_rankHands);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.sngpoker.DeckData>}
 */
const methodDescriptor_Sng_getShuffledDeck = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getShuffledDeck',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.sngpoker.DeckData,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DeckData.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.sngpoker.DeckData>}
 */
const methodInfo_Sng_getShuffledDeck = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.DeckData,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DeckData.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.DeckData)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.DeckData>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getShuffledDeck =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getShuffledDeck',
      request,
      metadata || {},
      methodDescriptor_Sng_getShuffledDeck,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.DeckData>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getShuffledDeck =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getShuffledDeck',
      request,
      metadata || {},
      methodDescriptor_Sng_getShuffledDeck);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetUserInfoRequest,
 *   !proto.sngpoker.GetUserInfoResponse>}
 */
const methodDescriptor_Sng_getUserInfo = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getUserInfo',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GetUserInfoRequest,
  proto.sngpoker.GetUserInfoResponse,
  /**
   * @param {!proto.sngpoker.GetUserInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetUserInfoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetUserInfoRequest,
 *   !proto.sngpoker.GetUserInfoResponse>}
 */
const methodInfo_Sng_getUserInfo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetUserInfoResponse,
  /**
   * @param {!proto.sngpoker.GetUserInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetUserInfoResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetUserInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetUserInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetUserInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getUserInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getUserInfo',
      request,
      metadata || {},
      methodDescriptor_Sng_getUserInfo,
      callback);
};


/**
 * @param {!proto.sngpoker.GetUserInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetUserInfoResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getUserInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getUserInfo',
      request,
      metadata || {},
      methodDescriptor_Sng_getUserInfo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.UpdateUserInfoRequest,
 *   !proto.sngpoker.UpdateUserInfoResponse>}
 */
const methodDescriptor_Sng_updateUserInfo = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/updateUserInfo',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.UpdateUserInfoRequest,
  proto.sngpoker.UpdateUserInfoResponse,
  /**
   * @param {!proto.sngpoker.UpdateUserInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UpdateUserInfoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.UpdateUserInfoRequest,
 *   !proto.sngpoker.UpdateUserInfoResponse>}
 */
const methodInfo_Sng_updateUserInfo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.UpdateUserInfoResponse,
  /**
   * @param {!proto.sngpoker.UpdateUserInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UpdateUserInfoResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.UpdateUserInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.UpdateUserInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.UpdateUserInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.updateUserInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/updateUserInfo',
      request,
      metadata || {},
      methodDescriptor_Sng_updateUserInfo,
      callback);
};


/**
 * @param {!proto.sngpoker.UpdateUserInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.UpdateUserInfoResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.updateUserInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/updateUserInfo',
      request,
      metadata || {},
      methodDescriptor_Sng_updateUserInfo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GlobalSettingsRequest,
 *   !proto.sngpoker.GlobalSettingsResponse>}
 */
const methodDescriptor_Sng_getGlobalSettings = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getGlobalSettings',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GlobalSettingsRequest,
  proto.sngpoker.GlobalSettingsResponse,
  /**
   * @param {!proto.sngpoker.GlobalSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GlobalSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GlobalSettingsRequest,
 *   !proto.sngpoker.GlobalSettingsResponse>}
 */
const methodInfo_Sng_getGlobalSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GlobalSettingsResponse,
  /**
   * @param {!proto.sngpoker.GlobalSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GlobalSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GlobalSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GlobalSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GlobalSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getGlobalSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getGlobalSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getGlobalSettings,
      callback);
};


/**
 * @param {!proto.sngpoker.GlobalSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GlobalSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getGlobalSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getGlobalSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getGlobalSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GlobalSettingsRequest,
 *   !proto.sngpoker.GlobalSettingsResponse>}
 */
const methodDescriptor_Sng_setGlobalSettings = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/setGlobalSettings',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GlobalSettingsRequest,
  proto.sngpoker.GlobalSettingsResponse,
  /**
   * @param {!proto.sngpoker.GlobalSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GlobalSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GlobalSettingsRequest,
 *   !proto.sngpoker.GlobalSettingsResponse>}
 */
const methodInfo_Sng_setGlobalSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GlobalSettingsResponse,
  /**
   * @param {!proto.sngpoker.GlobalSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GlobalSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GlobalSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GlobalSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GlobalSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.setGlobalSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/setGlobalSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_setGlobalSettings,
      callback);
};


/**
 * @param {!proto.sngpoker.GlobalSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GlobalSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.setGlobalSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/setGlobalSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_setGlobalSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetPasswordResetLinkRequest,
 *   !proto.sngpoker.GetPasswordResetLinkResponse>}
 */
const methodDescriptor_Sng_getPasswordResetLink = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getPasswordResetLink',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GetPasswordResetLinkRequest,
  proto.sngpoker.GetPasswordResetLinkResponse,
  /**
   * @param {!proto.sngpoker.GetPasswordResetLinkRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetPasswordResetLinkResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetPasswordResetLinkRequest,
 *   !proto.sngpoker.GetPasswordResetLinkResponse>}
 */
const methodInfo_Sng_getPasswordResetLink = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetPasswordResetLinkResponse,
  /**
   * @param {!proto.sngpoker.GetPasswordResetLinkRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetPasswordResetLinkResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetPasswordResetLinkRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetPasswordResetLinkResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetPasswordResetLinkResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getPasswordResetLink =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getPasswordResetLink',
      request,
      metadata || {},
      methodDescriptor_Sng_getPasswordResetLink,
      callback);
};


/**
 * @param {!proto.sngpoker.GetPasswordResetLinkRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetPasswordResetLinkResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getPasswordResetLink =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getPasswordResetLink',
      request,
      metadata || {},
      methodDescriptor_Sng_getPasswordResetLink);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.FetchSecurityQuestionsRequest,
 *   !proto.sngpoker.FetchSecurityQuestionsResponse>}
 */
const methodDescriptor_Sng_fetchSecurityQuestions = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/fetchSecurityQuestions',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.FetchSecurityQuestionsRequest,
  proto.sngpoker.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.sngpoker.FetchSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.FetchSecurityQuestionsRequest,
 *   !proto.sngpoker.FetchSecurityQuestionsResponse>}
 */
const methodInfo_Sng_fetchSecurityQuestions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.sngpoker.FetchSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.FetchSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.FetchSecurityQuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.FetchSecurityQuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.fetchSecurityQuestions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/fetchSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_fetchSecurityQuestions,
      callback);
};


/**
 * @param {!proto.sngpoker.FetchSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.FetchSecurityQuestionsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.fetchSecurityQuestions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/fetchSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_fetchSecurityQuestions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ResetPasswordRequest,
 *   !proto.sngpoker.ResetPasswordResponse>}
 */
const methodDescriptor_Sng_resetPassword = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/resetPassword',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ResetPasswordRequest,
  proto.sngpoker.ResetPasswordResponse,
  /**
   * @param {!proto.sngpoker.ResetPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ResetPasswordResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ResetPasswordRequest,
 *   !proto.sngpoker.ResetPasswordResponse>}
 */
const methodInfo_Sng_resetPassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.ResetPasswordResponse,
  /**
   * @param {!proto.sngpoker.ResetPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ResetPasswordResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ResetPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.ResetPasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.ResetPasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.resetPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/resetPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_resetPassword,
      callback);
};


/**
 * @param {!proto.sngpoker.ResetPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.ResetPasswordResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.resetPassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/resetPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_resetPassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.VerifyUserPasswordRequest,
 *   !proto.sngpoker.VerifyUserPasswordResponse>}
 */
const methodDescriptor_Sng_verifyUserPassword = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/verifyUserPassword',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.VerifyUserPasswordRequest,
  proto.sngpoker.VerifyUserPasswordResponse,
  /**
   * @param {!proto.sngpoker.VerifyUserPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.VerifyUserPasswordResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.VerifyUserPasswordRequest,
 *   !proto.sngpoker.VerifyUserPasswordResponse>}
 */
const methodInfo_Sng_verifyUserPassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.VerifyUserPasswordResponse,
  /**
   * @param {!proto.sngpoker.VerifyUserPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.VerifyUserPasswordResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.VerifyUserPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.VerifyUserPasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.VerifyUserPasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.verifyUserPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/verifyUserPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_verifyUserPassword,
      callback);
};


/**
 * @param {!proto.sngpoker.VerifyUserPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.VerifyUserPasswordResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.verifyUserPassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/verifyUserPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_verifyUserPassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.LoginRequest,
 *   !proto.sngpoker.LoginResult>}
 */
const methodDescriptor_Sng_adminLogin = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/adminLogin',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.LoginRequest,
  proto.sngpoker.LoginResult,
  /**
   * @param {!proto.sngpoker.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.LoginResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.LoginRequest,
 *   !proto.sngpoker.LoginResult>}
 */
const methodInfo_Sng_adminLogin = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.LoginResult,
  /**
   * @param {!proto.sngpoker.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.LoginResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.LoginResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.LoginResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.adminLogin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/adminLogin',
      request,
      metadata || {},
      methodDescriptor_Sng_adminLogin,
      callback);
};


/**
 * @param {!proto.sngpoker.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.LoginResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.adminLogin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/adminLogin',
      request,
      metadata || {},
      methodDescriptor_Sng_adminLogin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ValidateSecurityQuestionsRequest,
 *   !proto.sngpoker.ValidateSecurityQuestionsResponse>}
 */
const methodDescriptor_Sng_validateSecurityQuestionsForLogin = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/validateSecurityQuestionsForLogin',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ValidateSecurityQuestionsRequest,
  proto.sngpoker.ValidateSecurityQuestionsResponse,
  /**
   * @param {!proto.sngpoker.ValidateSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ValidateSecurityQuestionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ValidateSecurityQuestionsRequest,
 *   !proto.sngpoker.ValidateSecurityQuestionsResponse>}
 */
const methodInfo_Sng_validateSecurityQuestionsForLogin = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.ValidateSecurityQuestionsResponse,
  /**
   * @param {!proto.sngpoker.ValidateSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ValidateSecurityQuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ValidateSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.ValidateSecurityQuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.ValidateSecurityQuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.validateSecurityQuestionsForLogin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/validateSecurityQuestionsForLogin',
      request,
      metadata || {},
      methodDescriptor_Sng_validateSecurityQuestionsForLogin,
      callback);
};


/**
 * @param {!proto.sngpoker.ValidateSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.ValidateSecurityQuestionsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.validateSecurityQuestionsForLogin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/validateSecurityQuestionsForLogin',
      request,
      metadata || {},
      methodDescriptor_Sng_validateSecurityQuestionsForLogin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.IsEmailAvailableRequest,
 *   !proto.sngpoker.IsEmailAvailableResponse>}
 */
const methodDescriptor_Sng_checkIsEmailAvailable = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/checkIsEmailAvailable',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.IsEmailAvailableRequest,
  proto.sngpoker.IsEmailAvailableResponse,
  /**
   * @param {!proto.sngpoker.IsEmailAvailableRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.IsEmailAvailableResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.IsEmailAvailableRequest,
 *   !proto.sngpoker.IsEmailAvailableResponse>}
 */
const methodInfo_Sng_checkIsEmailAvailable = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.IsEmailAvailableResponse,
  /**
   * @param {!proto.sngpoker.IsEmailAvailableRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.IsEmailAvailableResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.IsEmailAvailableRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.IsEmailAvailableResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.IsEmailAvailableResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.checkIsEmailAvailable =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/checkIsEmailAvailable',
      request,
      metadata || {},
      methodDescriptor_Sng_checkIsEmailAvailable,
      callback);
};


/**
 * @param {!proto.sngpoker.IsEmailAvailableRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.IsEmailAvailableResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.checkIsEmailAvailable =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/checkIsEmailAvailable',
      request,
      metadata || {},
      methodDescriptor_Sng_checkIsEmailAvailable);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.StartTournamentTableInstanceRequest,
 *   !proto.sngpoker.StartTournamentTableInstanceResponse>}
 */
const methodDescriptor_Sng_startTournamentTableInstance = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/startTournamentTableInstance',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.StartTournamentTableInstanceRequest,
  proto.sngpoker.StartTournamentTableInstanceResponse,
  /**
   * @param {!proto.sngpoker.StartTournamentTableInstanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StartTournamentTableInstanceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.StartTournamentTableInstanceRequest,
 *   !proto.sngpoker.StartTournamentTableInstanceResponse>}
 */
const methodInfo_Sng_startTournamentTableInstance = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.StartTournamentTableInstanceResponse,
  /**
   * @param {!proto.sngpoker.StartTournamentTableInstanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StartTournamentTableInstanceResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.StartTournamentTableInstanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.StartTournamentTableInstanceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.StartTournamentTableInstanceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.startTournamentTableInstance =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/startTournamentTableInstance',
      request,
      metadata || {},
      methodDescriptor_Sng_startTournamentTableInstance,
      callback);
};


/**
 * @param {!proto.sngpoker.StartTournamentTableInstanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.StartTournamentTableInstanceResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.startTournamentTableInstance =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/startTournamentTableInstance',
      request,
      metadata || {},
      methodDescriptor_Sng_startTournamentTableInstance);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.TournamentDetailsRequest,
 *   !proto.sngpoker.TournamentPayoutStructureResponse>}
 */
const methodDescriptor_Sng_tournamentPayoutStructure = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/tournamentPayoutStructure',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.TournamentDetailsRequest,
  proto.sngpoker.TournamentPayoutStructureResponse,
  /**
   * @param {!proto.sngpoker.TournamentDetailsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.TournamentPayoutStructureResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.TournamentDetailsRequest,
 *   !proto.sngpoker.TournamentPayoutStructureResponse>}
 */
const methodInfo_Sng_tournamentPayoutStructure = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.TournamentPayoutStructureResponse,
  /**
   * @param {!proto.sngpoker.TournamentDetailsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.TournamentPayoutStructureResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.TournamentDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.TournamentPayoutStructureResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.TournamentPayoutStructureResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.tournamentPayoutStructure =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/tournamentPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_tournamentPayoutStructure,
      callback);
};


/**
 * @param {!proto.sngpoker.TournamentDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.TournamentPayoutStructureResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.tournamentPayoutStructure =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/tournamentPayoutStructure',
      request,
      metadata || {},
      methodDescriptor_Sng_tournamentPayoutStructure);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ActiveUsersRequest,
 *   !proto.sngpoker.ActiveUsersResult>}
 */
const methodDescriptor_Sng_getActiveUsers = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getActiveUsers',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ActiveUsersRequest,
  proto.sngpoker.ActiveUsersResult,
  /**
   * @param {!proto.sngpoker.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ActiveUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ActiveUsersRequest,
 *   !proto.sngpoker.ActiveUsersResult>}
 */
const methodInfo_Sng_getActiveUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.ActiveUsersResult,
  /**
   * @param {!proto.sngpoker.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ActiveUsersResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.ActiveUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.ActiveUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getActiveUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getActiveUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_getActiveUsers,
      callback);
};


/**
 * @param {!proto.sngpoker.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.ActiveUsersResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getActiveUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getActiveUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_getActiveUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ClientRequest,
 *   !proto.sngpoker.ClientResponse>}
 */
const methodDescriptor_Sng_getClientData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getClientData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ClientRequest,
  proto.sngpoker.ClientResponse,
  /**
   * @param {!proto.sngpoker.ClientRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ClientResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ClientRequest,
 *   !proto.sngpoker.ClientResponse>}
 */
const methodInfo_Sng_getClientData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.ClientResponse,
  /**
   * @param {!proto.sngpoker.ClientRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ClientResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ClientRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.ClientResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.ClientResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getClientData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_getClientData,
      callback);
};


/**
 * @param {!proto.sngpoker.ClientRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.ClientResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getClientData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_getClientData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ClientAddRequest,
 *   !proto.sngpoker.ClientAddResponse>}
 */
const methodDescriptor_Sng_addClientData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/addClientData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ClientAddRequest,
  proto.sngpoker.ClientAddResponse,
  /**
   * @param {!proto.sngpoker.ClientAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ClientAddResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ClientAddRequest,
 *   !proto.sngpoker.ClientAddResponse>}
 */
const methodInfo_Sng_addClientData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.ClientAddResponse,
  /**
   * @param {!proto.sngpoker.ClientAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ClientAddResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ClientAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.ClientAddResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.ClientAddResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.addClientData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/addClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_addClientData,
      callback);
};


/**
 * @param {!proto.sngpoker.ClientAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.ClientAddResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.addClientData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/addClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_addClientData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ClientUpdateRequest,
 *   !proto.sngpoker.ClientUpdateResponse>}
 */
const methodDescriptor_Sng_updateClientData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/updateClientData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ClientUpdateRequest,
  proto.sngpoker.ClientUpdateResponse,
  /**
   * @param {!proto.sngpoker.ClientUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ClientUpdateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ClientUpdateRequest,
 *   !proto.sngpoker.ClientUpdateResponse>}
 */
const methodInfo_Sng_updateClientData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.ClientUpdateResponse,
  /**
   * @param {!proto.sngpoker.ClientUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ClientUpdateResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ClientUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.ClientUpdateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.ClientUpdateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.updateClientData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/updateClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateClientData,
      callback);
};


/**
 * @param {!proto.sngpoker.ClientUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.ClientUpdateResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.updateClientData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/updateClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateClientData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ClientRemoveRequest,
 *   !proto.sngpoker.ClientRemoveResponse>}
 */
const methodDescriptor_Sng_removeClientData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/removeClientData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ClientRemoveRequest,
  proto.sngpoker.ClientRemoveResponse,
  /**
   * @param {!proto.sngpoker.ClientRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ClientRemoveResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ClientRemoveRequest,
 *   !proto.sngpoker.ClientRemoveResponse>}
 */
const methodInfo_Sng_removeClientData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.ClientRemoveResponse,
  /**
   * @param {!proto.sngpoker.ClientRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ClientRemoveResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ClientRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.ClientRemoveResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.ClientRemoveResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.removeClientData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/removeClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeClientData,
      callback);
};


/**
 * @param {!proto.sngpoker.ClientRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.ClientRemoveResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.removeClientData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/removeClientData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeClientData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ComponentPermissionRequest,
 *   !proto.sngpoker.DataResponse>}
 */
const methodDescriptor_Sng_getComponentPermissionData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getComponentPermissionData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ComponentPermissionRequest,
  proto.sngpoker.DataResponse,
  /**
   * @param {!proto.sngpoker.ComponentPermissionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ComponentPermissionRequest,
 *   !proto.sngpoker.DataResponse>}
 */
const methodInfo_Sng_getComponentPermissionData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.DataResponse,
  /**
   * @param {!proto.sngpoker.ComponentPermissionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DataResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ComponentPermissionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getComponentPermissionData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_getComponentPermissionData,
      callback);
};


/**
 * @param {!proto.sngpoker.ComponentPermissionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.DataResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getComponentPermissionData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_getComponentPermissionData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ComponentPermissionAddRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodDescriptor_Sng_addComponentPermissionData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/addComponentPermissionData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ComponentPermissionAddRequest,
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.ComponentPermissionAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ComponentPermissionAddRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodInfo_Sng_addComponentPermissionData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.ComponentPermissionAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ComponentPermissionAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.addComponentPermissionData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/addComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_addComponentPermissionData,
      callback);
};


/**
 * @param {!proto.sngpoker.ComponentPermissionAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.addComponentPermissionData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/addComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_addComponentPermissionData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ComponentPermissionUpdateRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodDescriptor_Sng_updateComponentPermissionData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/updateComponentPermissionData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ComponentPermissionUpdateRequest,
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.ComponentPermissionUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ComponentPermissionUpdateRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodInfo_Sng_updateComponentPermissionData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.ComponentPermissionUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ComponentPermissionUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.updateComponentPermissionData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/updateComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateComponentPermissionData,
      callback);
};


/**
 * @param {!proto.sngpoker.ComponentPermissionUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.updateComponentPermissionData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/updateComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateComponentPermissionData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ComponentPermissionRemoveRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodDescriptor_Sng_removeComponentPermissionData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/removeComponentPermissionData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ComponentPermissionRemoveRequest,
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.ComponentPermissionRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ComponentPermissionRemoveRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodInfo_Sng_removeComponentPermissionData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.ComponentPermissionRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ComponentPermissionRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.removeComponentPermissionData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/removeComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeComponentPermissionData,
      callback);
};


/**
 * @param {!proto.sngpoker.ComponentPermissionRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.removeComponentPermissionData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/removeComponentPermissionData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeComponentPermissionData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AdminRoleRequest,
 *   !proto.sngpoker.DataResponse>}
 */
const methodDescriptor_Sng_getAdminRoleData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getAdminRoleData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AdminRoleRequest,
  proto.sngpoker.DataResponse,
  /**
   * @param {!proto.sngpoker.AdminRoleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AdminRoleRequest,
 *   !proto.sngpoker.DataResponse>}
 */
const methodInfo_Sng_getAdminRoleData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.DataResponse,
  /**
   * @param {!proto.sngpoker.AdminRoleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DataResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AdminRoleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getAdminRoleData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdminRoleData,
      callback);
};


/**
 * @param {!proto.sngpoker.AdminRoleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.DataResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getAdminRoleData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdminRoleData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AdminRoleAddRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodDescriptor_Sng_addAdminRoleData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/addAdminRoleData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AdminRoleAddRequest,
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.AdminRoleAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AdminRoleAddRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodInfo_Sng_addAdminRoleData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.AdminRoleAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AdminRoleAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.addAdminRoleData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/addAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_addAdminRoleData,
      callback);
};


/**
 * @param {!proto.sngpoker.AdminRoleAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.addAdminRoleData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/addAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_addAdminRoleData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AdminRoleUpdateRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodDescriptor_Sng_updateAdminRoleData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/updateAdminRoleData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AdminRoleUpdateRequest,
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.AdminRoleUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AdminRoleUpdateRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodInfo_Sng_updateAdminRoleData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.AdminRoleUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AdminRoleUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.updateAdminRoleData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/updateAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateAdminRoleData,
      callback);
};


/**
 * @param {!proto.sngpoker.AdminRoleUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.updateAdminRoleData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/updateAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateAdminRoleData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AdminRoleRemoveRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodDescriptor_Sng_removeAdminRoleData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/removeAdminRoleData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AdminRoleRemoveRequest,
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.AdminRoleRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AdminRoleRemoveRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodInfo_Sng_removeAdminRoleData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.AdminRoleRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AdminRoleRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.removeAdminRoleData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/removeAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeAdminRoleData,
      callback);
};


/**
 * @param {!proto.sngpoker.AdminRoleRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.removeAdminRoleData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/removeAdminRoleData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeAdminRoleData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AdminUpdateRequest,
 *   !proto.sngpoker.DataResponse>}
 */
const methodDescriptor_Sng_getAdminRoles = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getAdminRoles',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AdminUpdateRequest,
  proto.sngpoker.DataResponse,
  /**
   * @param {!proto.sngpoker.AdminUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AdminUpdateRequest,
 *   !proto.sngpoker.DataResponse>}
 */
const methodInfo_Sng_getAdminRoles = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.DataResponse,
  /**
   * @param {!proto.sngpoker.AdminUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DataResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AdminUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getAdminRoles =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getAdminRoles',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdminRoles,
      callback);
};


/**
 * @param {!proto.sngpoker.AdminUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.DataResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getAdminRoles =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getAdminRoles',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdminRoles);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AdminRoleRequest,
 *   !proto.sngpoker.DataResponse>}
 */
const methodDescriptor_Sng_getDistinctRole = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getDistinctRole',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AdminRoleRequest,
  proto.sngpoker.DataResponse,
  /**
   * @param {!proto.sngpoker.AdminRoleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AdminRoleRequest,
 *   !proto.sngpoker.DataResponse>}
 */
const methodInfo_Sng_getDistinctRole = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.DataResponse,
  /**
   * @param {!proto.sngpoker.AdminRoleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DataResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AdminRoleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getDistinctRole =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getDistinctRole',
      request,
      metadata || {},
      methodDescriptor_Sng_getDistinctRole,
      callback);
};


/**
 * @param {!proto.sngpoker.AdminRoleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.DataResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getDistinctRole =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getDistinctRole',
      request,
      metadata || {},
      methodDescriptor_Sng_getDistinctRole);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ActiveUsersRequest,
 *   !proto.sngpoker.DataResponse>}
 */
const methodDescriptor_Sng_getAdmins = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getAdmins',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ActiveUsersRequest,
  proto.sngpoker.DataResponse,
  /**
   * @param {!proto.sngpoker.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ActiveUsersRequest,
 *   !proto.sngpoker.DataResponse>}
 */
const methodInfo_Sng_getAdmins = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.DataResponse,
  /**
   * @param {!proto.sngpoker.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DataResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getAdmins =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getAdmins',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdmins,
      callback);
};


/**
 * @param {!proto.sngpoker.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.DataResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getAdmins =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getAdmins',
      request,
      metadata || {},
      methodDescriptor_Sng_getAdmins);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AdminAddRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodDescriptor_Sng_addAdminData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/addAdminData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AdminAddRequest,
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.AdminAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AdminAddRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodInfo_Sng_addAdminData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.AdminAddRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AdminAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.addAdminData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/addAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_addAdminData,
      callback);
};


/**
 * @param {!proto.sngpoker.AdminAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.addAdminData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/addAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_addAdminData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AdminUpdateRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodDescriptor_Sng_updateAdminData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/updateAdminData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AdminUpdateRequest,
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.AdminUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AdminUpdateRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodInfo_Sng_updateAdminData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.AdminUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AdminUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.updateAdminData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/updateAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateAdminData,
      callback);
};


/**
 * @param {!proto.sngpoker.AdminUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.updateAdminData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/updateAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_updateAdminData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AdminRemoveRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodDescriptor_Sng_removeAdminData = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/removeAdminData',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AdminRemoveRequest,
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.AdminRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AdminRemoveRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodInfo_Sng_removeAdminData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.AdminRemoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AdminRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.removeAdminData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/removeAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeAdminData,
      callback);
};


/**
 * @param {!proto.sngpoker.AdminRemoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.removeAdminData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/removeAdminData',
      request,
      metadata || {},
      methodDescriptor_Sng_removeAdminData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.sngpoker.FloatResponse>}
 */
const methodDescriptor_Sng_getAmountInplay = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getAmountInplay',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.sngpoker.FloatResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.FloatResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.sngpoker.FloatResponse>}
 */
const methodInfo_Sng_getAmountInplay = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.FloatResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.FloatResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.FloatResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.FloatResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getAmountInplay =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getAmountInplay',
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
 * @return {!Promise<!proto.sngpoker.FloatResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getAmountInplay =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getAmountInplay',
      request,
      metadata || {},
      methodDescriptor_Sng_getAmountInplay);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GetTournamentTemplateDetailRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodDescriptor_Sng_removeTournament = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/removeTournament',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GetTournamentTemplateDetailRequest,
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.GetTournamentTemplateDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GetTournamentTemplateDetailRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodInfo_Sng_removeTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.GetTournamentTemplateDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GetTournamentTemplateDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.removeTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/removeTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_removeTournament,
      callback);
};


/**
 * @param {!proto.sngpoker.GetTournamentTemplateDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.removeTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/removeTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_removeTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.UpdateTournamentTemplateRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodDescriptor_Sng_updateTournament = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/updateTournament',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.UpdateTournamentTemplateRequest,
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.UpdateTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.UpdateTournamentTemplateRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodInfo_Sng_updateTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.UpdateTournamentTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.UpdateTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.updateTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/updateTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_updateTournament,
      callback);
};


/**
 * @param {!proto.sngpoker.UpdateTournamentTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.updateTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/updateTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_updateTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.PlayerTournamentRequest,
 *   !proto.sngpoker.GetTournamentsResponse>}
 */
const methodDescriptor_Sng_getPlayerTournaments = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getPlayerTournaments',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.PlayerTournamentRequest,
  proto.sngpoker.GetTournamentsResponse,
  /**
   * @param {!proto.sngpoker.PlayerTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetTournamentsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.PlayerTournamentRequest,
 *   !proto.sngpoker.GetTournamentsResponse>}
 */
const methodInfo_Sng_getPlayerTournaments = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GetTournamentsResponse,
  /**
   * @param {!proto.sngpoker.PlayerTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GetTournamentsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.PlayerTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GetTournamentsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GetTournamentsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getPlayerTournaments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getPlayerTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerTournaments,
      callback);
};


/**
 * @param {!proto.sngpoker.PlayerTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GetTournamentsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getPlayerTournaments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getPlayerTournaments',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerTournaments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.SimulateGamesRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodDescriptor_Sng_simulateGames = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/simulateGames',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.SimulateGamesRequest,
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.SimulateGamesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.SimulateGamesRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodInfo_Sng_simulateGames = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.SimulateGamesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.SimulateGamesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.simulateGames =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/simulateGames',
      request,
      metadata || {},
      methodDescriptor_Sng_simulateGames,
      callback);
};


/**
 * @param {!proto.sngpoker.SimulateGamesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.simulateGames =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/simulateGames',
      request,
      metadata || {},
      methodDescriptor_Sng_simulateGames);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.PendingDepositRequest,
 *   !proto.sngpoker.DataResponse>}
 */
const methodDescriptor_Sng_getPendingRequest = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getPendingRequest',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.PendingDepositRequest,
  proto.sngpoker.DataResponse,
  /**
   * @param {!proto.sngpoker.PendingDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.PendingDepositRequest,
 *   !proto.sngpoker.DataResponse>}
 */
const methodInfo_Sng_getPendingRequest = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.DataResponse,
  /**
   * @param {!proto.sngpoker.PendingDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DataResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.PendingDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getPendingRequest =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getPendingRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_getPendingRequest,
      callback);
};


/**
 * @param {!proto.sngpoker.PendingDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.DataResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getPendingRequest =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getPendingRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_getPendingRequest);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.PendingDepositRequest,
 *   !proto.sngpoker.DataResponse>}
 */
const methodDescriptor_Sng_getApprovedRequest = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getApprovedRequest',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.PendingDepositRequest,
  proto.sngpoker.DataResponse,
  /**
   * @param {!proto.sngpoker.PendingDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DataResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.PendingDepositRequest,
 *   !proto.sngpoker.DataResponse>}
 */
const methodInfo_Sng_getApprovedRequest = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.DataResponse,
  /**
   * @param {!proto.sngpoker.PendingDepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DataResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.PendingDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.DataResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.DataResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getApprovedRequest =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getApprovedRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_getApprovedRequest,
      callback);
};


/**
 * @param {!proto.sngpoker.PendingDepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.DataResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getApprovedRequest =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getApprovedRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_getApprovedRequest);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.UpdatePendingRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodDescriptor_Sng_actionOnPendingRequest = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/actionOnPendingRequest',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.UpdatePendingRequest,
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.UpdatePendingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.UpdatePendingRequest,
 *   !proto.sngpoker.StatusResponse>}
 */
const methodInfo_Sng_actionOnPendingRequest = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.StatusResponse,
  /**
   * @param {!proto.sngpoker.UpdatePendingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.UpdatePendingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.actionOnPendingRequest =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/actionOnPendingRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_actionOnPendingRequest,
      callback);
};


/**
 * @param {!proto.sngpoker.UpdatePendingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.actionOnPendingRequest =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/actionOnPendingRequest',
      request,
      metadata || {},
      methodDescriptor_Sng_actionOnPendingRequest);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ActiveUsersRequest,
 *   !proto.sngpoker.ActiveUsersResult>}
 */
const methodDescriptor_Sng_getBotList = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getBotList',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ActiveUsersRequest,
  proto.sngpoker.ActiveUsersResult,
  /**
   * @param {!proto.sngpoker.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ActiveUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ActiveUsersRequest,
 *   !proto.sngpoker.ActiveUsersResult>}
 */
const methodInfo_Sng_getBotList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.ActiveUsersResult,
  /**
   * @param {!proto.sngpoker.ActiveUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ActiveUsersResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.ActiveUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.ActiveUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getBotList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getBotList',
      request,
      metadata || {},
      methodDescriptor_Sng_getBotList,
      callback);
};


/**
 * @param {!proto.sngpoker.ActiveUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.ActiveUsersResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getBotList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getBotList',
      request,
      metadata || {},
      methodDescriptor_Sng_getBotList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.CreateMultipleUsersRequest,
 *   !proto.sngpoker.CreateMultipleUsersResult>}
 */
const methodDescriptor_Sng_createMultipleUsers = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/createMultipleUsers',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.CreateMultipleUsersRequest,
  proto.sngpoker.CreateMultipleUsersResult,
  /**
   * @param {!proto.sngpoker.CreateMultipleUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CreateMultipleUsersResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.CreateMultipleUsersRequest,
 *   !proto.sngpoker.CreateMultipleUsersResult>}
 */
const methodInfo_Sng_createMultipleUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.CreateMultipleUsersResult,
  /**
   * @param {!proto.sngpoker.CreateMultipleUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CreateMultipleUsersResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.CreateMultipleUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.CreateMultipleUsersResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.CreateMultipleUsersResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.createMultipleUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/createMultipleUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_createMultipleUsers,
      callback);
};


/**
 * @param {!proto.sngpoker.CreateMultipleUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.CreateMultipleUsersResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.createMultipleUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/createMultipleUsers',
      request,
      metadata || {},
      methodDescriptor_Sng_createMultipleUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.DeletePrizePoolStatusRequest,
 *   !proto.sngpoker.DeletePrizePoolStatusResponse>}
 */
const methodDescriptor_Sng_deletePrizePoolPayout = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/deletePrizePoolPayout',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.DeletePrizePoolStatusRequest,
  proto.sngpoker.DeletePrizePoolStatusResponse,
  /**
   * @param {!proto.sngpoker.DeletePrizePoolStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DeletePrizePoolStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.DeletePrizePoolStatusRequest,
 *   !proto.sngpoker.DeletePrizePoolStatusResponse>}
 */
const methodInfo_Sng_deletePrizePoolPayout = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.DeletePrizePoolStatusResponse,
  /**
   * @param {!proto.sngpoker.DeletePrizePoolStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.DeletePrizePoolStatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.DeletePrizePoolStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.DeletePrizePoolStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.DeletePrizePoolStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.deletePrizePoolPayout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/deletePrizePoolPayout',
      request,
      metadata || {},
      methodDescriptor_Sng_deletePrizePoolPayout,
      callback);
};


/**
 * @param {!proto.sngpoker.DeletePrizePoolStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.DeletePrizePoolStatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.deletePrizePoolPayout =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/deletePrizePoolPayout',
      request,
      metadata || {},
      methodDescriptor_Sng_deletePrizePoolPayout);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AdminJoinAnyTournamentRequest,
 *   !proto.sngpoker.JoinAnyTournamentResult>}
 */
const methodDescriptor_Sng_adminJoinAnyTournament = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/adminJoinAnyTournament',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AdminJoinAnyTournamentRequest,
  proto.sngpoker.JoinAnyTournamentResult,
  /**
   * @param {!proto.sngpoker.AdminJoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.JoinAnyTournamentResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AdminJoinAnyTournamentRequest,
 *   !proto.sngpoker.JoinAnyTournamentResult>}
 */
const methodInfo_Sng_adminJoinAnyTournament = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.JoinAnyTournamentResult,
  /**
   * @param {!proto.sngpoker.AdminJoinAnyTournamentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.JoinAnyTournamentResult.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AdminJoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.JoinAnyTournamentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.JoinAnyTournamentResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.adminJoinAnyTournament =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/adminJoinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_adminJoinAnyTournament,
      callback);
};


/**
 * @param {!proto.sngpoker.AdminJoinAnyTournamentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.JoinAnyTournamentResult>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.adminJoinAnyTournament =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/adminJoinAnyTournament',
      request,
      metadata || {},
      methodDescriptor_Sng_adminJoinAnyTournament);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.UiSettingsRequest,
 *   !proto.sngpoker.UiSettingsResponse>}
 */
const methodDescriptor_Sng_getUiSettings = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getUiSettings',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.UiSettingsRequest,
  proto.sngpoker.UiSettingsResponse,
  /**
   * @param {!proto.sngpoker.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UiSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.UiSettingsRequest,
 *   !proto.sngpoker.UiSettingsResponse>}
 */
const methodInfo_Sng_getUiSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.UiSettingsResponse,
  /**
   * @param {!proto.sngpoker.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UiSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.UiSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.UiSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getUiSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getUiSettings,
      callback);
};


/**
 * @param {!proto.sngpoker.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.UiSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getUiSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getUiSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.UiSettingsRequest,
 *   !proto.sngpoker.UiSettingsResponse>}
 */
const methodDescriptor_Sng_getAllUiSettings = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getAllUiSettings',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.UiSettingsRequest,
  proto.sngpoker.UiSettingsResponse,
  /**
   * @param {!proto.sngpoker.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UiSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.UiSettingsRequest,
 *   !proto.sngpoker.UiSettingsResponse>}
 */
const methodInfo_Sng_getAllUiSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.UiSettingsResponse,
  /**
   * @param {!proto.sngpoker.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UiSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.UiSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.UiSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getAllUiSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getAllUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getAllUiSettings,
      callback);
};


/**
 * @param {!proto.sngpoker.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.UiSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getAllUiSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getAllUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_getAllUiSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AllUiSettingsRequest,
 *   !proto.sngpoker.UiSettingsResponse>}
 */
const methodDescriptor_Sng_setUiSettings = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/setUiSettings',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AllUiSettingsRequest,
  proto.sngpoker.UiSettingsResponse,
  /**
   * @param {!proto.sngpoker.AllUiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UiSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AllUiSettingsRequest,
 *   !proto.sngpoker.UiSettingsResponse>}
 */
const methodInfo_Sng_setUiSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.UiSettingsResponse,
  /**
   * @param {!proto.sngpoker.AllUiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UiSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AllUiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.UiSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.UiSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.setUiSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/setUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_setUiSettings,
      callback);
};


/**
 * @param {!proto.sngpoker.AllUiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.UiSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.setUiSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/setUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_setUiSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.UiSettingsRequest,
 *   !proto.sngpoker.UiSettingsResponse>}
 */
const methodDescriptor_Sng_deleteUiSettings = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/deleteUiSettings',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.UiSettingsRequest,
  proto.sngpoker.UiSettingsResponse,
  /**
   * @param {!proto.sngpoker.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UiSettingsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.UiSettingsRequest,
 *   !proto.sngpoker.UiSettingsResponse>}
 */
const methodInfo_Sng_deleteUiSettings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.UiSettingsResponse,
  /**
   * @param {!proto.sngpoker.UiSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UiSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.UiSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.UiSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.deleteUiSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/deleteUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_deleteUiSettings,
      callback);
};


/**
 * @param {!proto.sngpoker.UiSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.UiSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.deleteUiSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/deleteUiSettings',
      request,
      metadata || {},
      methodDescriptor_Sng_deleteUiSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ThemesRequest,
 *   !proto.sngpoker.ThemesResponse>}
 */
const methodDescriptor_Sng_getThemes = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getThemes',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ThemesRequest,
  proto.sngpoker.ThemesResponse,
  /**
   * @param {!proto.sngpoker.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ThemesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ThemesRequest,
 *   !proto.sngpoker.ThemesResponse>}
 */
const methodInfo_Sng_getThemes = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.ThemesResponse,
  /**
   * @param {!proto.sngpoker.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ThemesResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.ThemesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.ThemesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getThemes =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getThemes',
      request,
      metadata || {},
      methodDescriptor_Sng_getThemes,
      callback);
};


/**
 * @param {!proto.sngpoker.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.ThemesResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getThemes =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getThemes',
      request,
      metadata || {},
      methodDescriptor_Sng_getThemes);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ThemesRequest,
 *   !proto.sngpoker.ThemesResponse>}
 */
const methodDescriptor_Sng_setTheme = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/setTheme',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ThemesRequest,
  proto.sngpoker.ThemesResponse,
  /**
   * @param {!proto.sngpoker.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ThemesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ThemesRequest,
 *   !proto.sngpoker.ThemesResponse>}
 */
const methodInfo_Sng_setTheme = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.ThemesResponse,
  /**
   * @param {!proto.sngpoker.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ThemesResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.ThemesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.ThemesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.setTheme =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/setTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_setTheme,
      callback);
};


/**
 * @param {!proto.sngpoker.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.ThemesResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.setTheme =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/setTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_setTheme);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.EditThemesRequest,
 *   !proto.sngpoker.ThemesResponse>}
 */
const methodDescriptor_Sng_editTheme = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/editTheme',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.EditThemesRequest,
  proto.sngpoker.ThemesResponse,
  /**
   * @param {!proto.sngpoker.EditThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ThemesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.EditThemesRequest,
 *   !proto.sngpoker.ThemesResponse>}
 */
const methodInfo_Sng_editTheme = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.ThemesResponse,
  /**
   * @param {!proto.sngpoker.EditThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ThemesResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.EditThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.ThemesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.ThemesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.editTheme =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/editTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_editTheme,
      callback);
};


/**
 * @param {!proto.sngpoker.EditThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.ThemesResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.editTheme =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/editTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_editTheme);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.ThemesRequest,
 *   !proto.sngpoker.ThemesResponse>}
 */
const methodDescriptor_Sng_deleteTheme = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/deleteTheme',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.ThemesRequest,
  proto.sngpoker.ThemesResponse,
  /**
   * @param {!proto.sngpoker.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ThemesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.ThemesRequest,
 *   !proto.sngpoker.ThemesResponse>}
 */
const methodInfo_Sng_deleteTheme = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.ThemesResponse,
  /**
   * @param {!proto.sngpoker.ThemesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.ThemesResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.ThemesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.ThemesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.deleteTheme =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/deleteTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_deleteTheme,
      callback);
};


/**
 * @param {!proto.sngpoker.ThemesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.ThemesResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.deleteTheme =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/deleteTheme',
      request,
      metadata || {},
      methodDescriptor_Sng_deleteTheme);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.GeopollRequest,
 *   !proto.sngpoker.GeopollResponse>}
 */
const methodDescriptor_Sng_getGeopoll = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getGeopoll',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.GeopollRequest,
  proto.sngpoker.GeopollResponse,
  /**
   * @param {!proto.sngpoker.GeopollRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeopollResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.GeopollRequest,
 *   !proto.sngpoker.GeopollResponse>}
 */
const methodInfo_Sng_getGeopoll = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.GeopollResponse,
  /**
   * @param {!proto.sngpoker.GeopollRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.GeopollResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.GeopollRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.GeopollResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.GeopollResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getGeopoll =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getGeopoll',
      request,
      metadata || {},
      methodDescriptor_Sng_getGeopoll,
      callback);
};


/**
 * @param {!proto.sngpoker.GeopollRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.GeopollResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getGeopoll =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getGeopoll',
      request,
      metadata || {},
      methodDescriptor_Sng_getGeopoll);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.UpdateSecurityQuestionsRequest,
 *   !proto.sngpoker.UpdateSecurityQuestionsResponse>}
 */
const methodDescriptor_Sng_updateSecurityQuestions = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/updateSecurityQuestions',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.UpdateSecurityQuestionsRequest,
  proto.sngpoker.UpdateSecurityQuestionsResponse,
  /**
   * @param {!proto.sngpoker.UpdateSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UpdateSecurityQuestionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.UpdateSecurityQuestionsRequest,
 *   !proto.sngpoker.UpdateSecurityQuestionsResponse>}
 */
const methodInfo_Sng_updateSecurityQuestions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.UpdateSecurityQuestionsResponse,
  /**
   * @param {!proto.sngpoker.UpdateSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.UpdateSecurityQuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.UpdateSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.UpdateSecurityQuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.UpdateSecurityQuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.updateSecurityQuestions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/updateSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_updateSecurityQuestions,
      callback);
};


/**
 * @param {!proto.sngpoker.UpdateSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.UpdateSecurityQuestionsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.updateSecurityQuestions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/updateSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_updateSecurityQuestions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.FetchSecurityQuestionsResponse,
 *   !proto.sngpoker.FetchSecurityQuestionsResponse>}
 */
const methodDescriptor_Sng_getUserSecurityQuestions = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getUserSecurityQuestions',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.FetchSecurityQuestionsResponse,
  proto.sngpoker.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.sngpoker.FetchSecurityQuestionsResponse} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.FetchSecurityQuestionsResponse,
 *   !proto.sngpoker.FetchSecurityQuestionsResponse>}
 */
const methodInfo_Sng_getUserSecurityQuestions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.sngpoker.FetchSecurityQuestionsResponse} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.FetchSecurityQuestionsResponse} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.FetchSecurityQuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.FetchSecurityQuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getUserSecurityQuestions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getUserSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_getUserSecurityQuestions,
      callback);
};


/**
 * @param {!proto.sngpoker.FetchSecurityQuestionsResponse} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.FetchSecurityQuestionsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getUserSecurityQuestions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getUserSecurityQuestions',
      request,
      metadata || {},
      methodDescriptor_Sng_getUserSecurityQuestions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.CustomCssRequest,
 *   !proto.sngpoker.CustomCssResponse>}
 */
const methodDescriptor_Sng_updateCustomCss = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/updateCustomCss',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.CustomCssRequest,
  proto.sngpoker.CustomCssResponse,
  /**
   * @param {!proto.sngpoker.CustomCssRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CustomCssResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.CustomCssRequest,
 *   !proto.sngpoker.CustomCssResponse>}
 */
const methodInfo_Sng_updateCustomCss = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.CustomCssResponse,
  /**
   * @param {!proto.sngpoker.CustomCssRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CustomCssResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.CustomCssRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.CustomCssResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.CustomCssResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.updateCustomCss =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/updateCustomCss',
      request,
      metadata || {},
      methodDescriptor_Sng_updateCustomCss,
      callback);
};


/**
 * @param {!proto.sngpoker.CustomCssRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.CustomCssResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.updateCustomCss =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/updateCustomCss',
      request,
      metadata || {},
      methodDescriptor_Sng_updateCustomCss);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.CustomCssRequest,
 *   !proto.sngpoker.CustomCssResponse>}
 */
const methodDescriptor_Sng_getCustomCss = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getCustomCss',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.CustomCssRequest,
  proto.sngpoker.CustomCssResponse,
  /**
   * @param {!proto.sngpoker.CustomCssRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CustomCssResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.CustomCssRequest,
 *   !proto.sngpoker.CustomCssResponse>}
 */
const methodInfo_Sng_getCustomCss = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.CustomCssResponse,
  /**
   * @param {!proto.sngpoker.CustomCssRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.CustomCssResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.CustomCssRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.CustomCssResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.CustomCssResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getCustomCss =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getCustomCss',
      request,
      metadata || {},
      methodDescriptor_Sng_getCustomCss,
      callback);
};


/**
 * @param {!proto.sngpoker.CustomCssRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.CustomCssResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getCustomCss =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getCustomCss',
      request,
      metadata || {},
      methodDescriptor_Sng_getCustomCss);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.PlayerMailingAddressUpdateRequest,
 *   !proto.sngpoker.PlayerMailingAddressStatusResponse>}
 */
const methodDescriptor_Sng_addPlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/addPlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.PlayerMailingAddressUpdateRequest,
  proto.sngpoker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.sngpoker.PlayerMailingAddressUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.PlayerMailingAddressUpdateRequest,
 *   !proto.sngpoker.PlayerMailingAddressStatusResponse>}
 */
const methodInfo_Sng_addPlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.sngpoker.PlayerMailingAddressUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.PlayerMailingAddressUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.PlayerMailingAddressStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.PlayerMailingAddressStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.addPlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/addPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_addPlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.sngpoker.PlayerMailingAddressUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.PlayerMailingAddressStatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.addPlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/addPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_addPlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.PlayerMailingAddressRequest,
 *   !proto.sngpoker.PlayerMailingAddressResponse>}
 */
const methodDescriptor_Sng_getPlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getPlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.PlayerMailingAddressRequest,
  proto.sngpoker.PlayerMailingAddressResponse,
  /**
   * @param {!proto.sngpoker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerMailingAddressResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.PlayerMailingAddressRequest,
 *   !proto.sngpoker.PlayerMailingAddressResponse>}
 */
const methodInfo_Sng_getPlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.PlayerMailingAddressResponse,
  /**
   * @param {!proto.sngpoker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerMailingAddressResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.PlayerMailingAddressResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.PlayerMailingAddressResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getPlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.sngpoker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.PlayerMailingAddressResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getPlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.PlayerMailingAddressRequest,
 *   !proto.sngpoker.PlayerMailingAddressesResponse>}
 */
const methodDescriptor_Sng_getPlayerMailingAddresses = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getPlayerMailingAddresses',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.PlayerMailingAddressRequest,
  proto.sngpoker.PlayerMailingAddressesResponse,
  /**
   * @param {!proto.sngpoker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerMailingAddressesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.PlayerMailingAddressRequest,
 *   !proto.sngpoker.PlayerMailingAddressesResponse>}
 */
const methodInfo_Sng_getPlayerMailingAddresses = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.PlayerMailingAddressesResponse,
  /**
   * @param {!proto.sngpoker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerMailingAddressesResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.PlayerMailingAddressesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.PlayerMailingAddressesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getPlayerMailingAddresses =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getPlayerMailingAddresses',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerMailingAddresses,
      callback);
};


/**
 * @param {!proto.sngpoker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.PlayerMailingAddressesResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getPlayerMailingAddresses =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getPlayerMailingAddresses',
      request,
      metadata || {},
      methodDescriptor_Sng_getPlayerMailingAddresses);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.PlayerMailingAddressUpdateRequest,
 *   !proto.sngpoker.PlayerMailingAddressStatusResponse>}
 */
const methodDescriptor_Sng_updatePlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/updatePlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.PlayerMailingAddressUpdateRequest,
  proto.sngpoker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.sngpoker.PlayerMailingAddressUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.PlayerMailingAddressUpdateRequest,
 *   !proto.sngpoker.PlayerMailingAddressStatusResponse>}
 */
const methodInfo_Sng_updatePlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.sngpoker.PlayerMailingAddressUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.PlayerMailingAddressUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.PlayerMailingAddressStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.PlayerMailingAddressStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.updatePlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/updatePlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_updatePlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.sngpoker.PlayerMailingAddressUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.PlayerMailingAddressStatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.updatePlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/updatePlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_updatePlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.PlayerMailingAddressRequest,
 *   !proto.sngpoker.PlayerMailingAddressResponse>}
 */
const methodDescriptor_Sng_getDefaultPlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getDefaultPlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.PlayerMailingAddressRequest,
  proto.sngpoker.PlayerMailingAddressResponse,
  /**
   * @param {!proto.sngpoker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerMailingAddressResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.PlayerMailingAddressRequest,
 *   !proto.sngpoker.PlayerMailingAddressResponse>}
 */
const methodInfo_Sng_getDefaultPlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.PlayerMailingAddressResponse,
  /**
   * @param {!proto.sngpoker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerMailingAddressResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.PlayerMailingAddressResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.PlayerMailingAddressResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getDefaultPlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getDefaultPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_getDefaultPlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.sngpoker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.PlayerMailingAddressResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getDefaultPlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getDefaultPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_getDefaultPlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.PlayerMailingAddressRequest,
 *   !proto.sngpoker.PlayerMailingAddressStatusResponse>}
 */
const methodDescriptor_Sng_setDefaultPlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/setDefaultPlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.PlayerMailingAddressRequest,
  proto.sngpoker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.sngpoker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.PlayerMailingAddressRequest,
 *   !proto.sngpoker.PlayerMailingAddressStatusResponse>}
 */
const methodInfo_Sng_setDefaultPlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.sngpoker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.PlayerMailingAddressStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.PlayerMailingAddressStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.setDefaultPlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/setDefaultPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_setDefaultPlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.sngpoker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.PlayerMailingAddressStatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.setDefaultPlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/setDefaultPlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_setDefaultPlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.PlayerMailingAddressRequest,
 *   !proto.sngpoker.PlayerMailingAddressStatusResponse>}
 */
const methodDescriptor_Sng_deletePlayerMailingAddress = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/deletePlayerMailingAddress',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.PlayerMailingAddressRequest,
  proto.sngpoker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.sngpoker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.PlayerMailingAddressRequest,
 *   !proto.sngpoker.PlayerMailingAddressStatusResponse>}
 */
const methodInfo_Sng_deletePlayerMailingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.PlayerMailingAddressStatusResponse,
  /**
   * @param {!proto.sngpoker.PlayerMailingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.PlayerMailingAddressStatusResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.PlayerMailingAddressStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.PlayerMailingAddressStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.deletePlayerMailingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/deletePlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_deletePlayerMailingAddress,
      callback);
};


/**
 * @param {!proto.sngpoker.PlayerMailingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.PlayerMailingAddressStatusResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.deletePlayerMailingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/deletePlayerMailingAddress',
      request,
      metadata || {},
      methodDescriptor_Sng_deletePlayerMailingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.FetchSecurityQuestionsRequest,
 *   !proto.sngpoker.FetchSecurityQuestionsResponse>}
 */
const methodDescriptor_Sng_getRandomSecurityQuestion = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/getRandomSecurityQuestion',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.FetchSecurityQuestionsRequest,
  proto.sngpoker.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.sngpoker.FetchSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.FetchSecurityQuestionsRequest,
 *   !proto.sngpoker.FetchSecurityQuestionsResponse>}
 */
const methodInfo_Sng_getRandomSecurityQuestion = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.FetchSecurityQuestionsResponse,
  /**
   * @param {!proto.sngpoker.FetchSecurityQuestionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.FetchSecurityQuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.FetchSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.FetchSecurityQuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.FetchSecurityQuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.getRandomSecurityQuestion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/getRandomSecurityQuestion',
      request,
      metadata || {},
      methodDescriptor_Sng_getRandomSecurityQuestion,
      callback);
};


/**
 * @param {!proto.sngpoker.FetchSecurityQuestionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.FetchSecurityQuestionsResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.getRandomSecurityQuestion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/getRandomSecurityQuestion',
      request,
      metadata || {},
      methodDescriptor_Sng_getRandomSecurityQuestion);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.AnswerVerifyPasswordRequest,
 *   !proto.sngpoker.AnswerVerifyPasswordResponse>}
 */
const methodDescriptor_Sng_answerSecurityQusetionAndVerifyPassword = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/answerSecurityQusetionAndVerifyPassword',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.AnswerVerifyPasswordRequest,
  proto.sngpoker.AnswerVerifyPasswordResponse,
  /**
   * @param {!proto.sngpoker.AnswerVerifyPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.AnswerVerifyPasswordResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.AnswerVerifyPasswordRequest,
 *   !proto.sngpoker.AnswerVerifyPasswordResponse>}
 */
const methodInfo_Sng_answerSecurityQusetionAndVerifyPassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.AnswerVerifyPasswordResponse,
  /**
   * @param {!proto.sngpoker.AnswerVerifyPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.AnswerVerifyPasswordResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.AnswerVerifyPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.AnswerVerifyPasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.AnswerVerifyPasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.answerSecurityQusetionAndVerifyPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/answerSecurityQusetionAndVerifyPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_answerSecurityQusetionAndVerifyPassword,
      callback);
};


/**
 * @param {!proto.sngpoker.AnswerVerifyPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.AnswerVerifyPasswordResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.answerSecurityQusetionAndVerifyPassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/answerSecurityQusetionAndVerifyPassword',
      request,
      metadata || {},
      methodDescriptor_Sng_answerSecurityQusetionAndVerifyPassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sngpoker.VerifySSNLastFourRequest,
 *   !proto.sngpoker.VerifySSNLastFourResponse>}
 */
const methodDescriptor_Sng_verifySSNLastFourDigits = new grpc.web.MethodDescriptor(
  '/sngpoker.Sng/verifySSNLastFourDigits',
  grpc.web.MethodType.UNARY,
  proto.sngpoker.VerifySSNLastFourRequest,
  proto.sngpoker.VerifySSNLastFourResponse,
  /**
   * @param {!proto.sngpoker.VerifySSNLastFourRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.VerifySSNLastFourResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sngpoker.VerifySSNLastFourRequest,
 *   !proto.sngpoker.VerifySSNLastFourResponse>}
 */
const methodInfo_Sng_verifySSNLastFourDigits = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sngpoker.VerifySSNLastFourResponse,
  /**
   * @param {!proto.sngpoker.VerifySSNLastFourRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sngpoker.VerifySSNLastFourResponse.deserializeBinary
);


/**
 * @param {!proto.sngpoker.VerifySSNLastFourRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sngpoker.VerifySSNLastFourResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sngpoker.VerifySSNLastFourResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sngpoker.SngClient.prototype.verifySSNLastFourDigits =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sngpoker.Sng/verifySSNLastFourDigits',
      request,
      metadata || {},
      methodDescriptor_Sng_verifySSNLastFourDigits,
      callback);
};


/**
 * @param {!proto.sngpoker.VerifySSNLastFourRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sngpoker.VerifySSNLastFourResponse>}
 *     Promise that resolves to the response
 */
proto.sngpoker.SngPromiseClient.prototype.verifySSNLastFourDigits =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sngpoker.Sng/verifySSNLastFourDigits',
      request,
      metadata || {},
      methodDescriptor_Sng_verifySSNLastFourDigits);
};


module.exports = proto.sngpoker;

