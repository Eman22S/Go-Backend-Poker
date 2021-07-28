import React from "react";

import GrpcClient from "../grpc/grpc_client";

/**
 * A context to hold shared custom grpc client
 */
const GrpcClientContext = React.createContext(new GrpcClient());

/**
 * Custom hook to use grpc client context
 */
function useGrpcClient() {
    return React.useContext(GrpcClientContext);
}

export default useGrpcClient;
