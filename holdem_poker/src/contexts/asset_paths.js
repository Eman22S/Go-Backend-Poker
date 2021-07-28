import React from "react";

const AssetPathsContext = React.createContext(null);

/**
 * Custom hook to use asset paths
 */
function useAssetPaths() {
    return React.useContext(AssetPathsContext);
}

export { useAssetPaths, AssetPathsContext };
