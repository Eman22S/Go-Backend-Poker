/**
 * Get local access token of user
 * @returns saved access token string or undefined if not saved before
 */
function get_local_token() {
    return localStorage.getItem("access_token");
}

function get_local_admin_token() {
    return localStorage.getItem("admin_access_token");
}


function get_is_admin() {
    return localStorage.getItem("is_admin");
}
/**
 * Set access token locally for subsequent grpc calls
 * @param {str} token_value : token string found from grpc server
 */
function set_local_token(token_value) {
    localStorage.setItem("access_token", token_value);
}

/**
 * Set access token locally for subsequent grpc calls
 * @param {str} token_value : token string found from grpc server
 */
function set_local_admin_token(token_value) {
    localStorage.setItem("admin_access_token", token_value);
}


function set_is_admin(is_admin) {
    localStorage.setItem("is_admin", is_admin)
}

/**
 * Checks if a user has logged in the app locally, no remote communication
 * @returns {str || null}: locally stored access token or null if not found
 */
function is_logged_in() {
    return get_local_token();
}

function is_admin_logged_in() {
    return get_local_admin_token();
}


function is_admin() {
    return get_is_admin() === "true";
}

function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("user");
    localStorage.removeItem("admin_access_token");

}

export { get_local_token, set_local_token, is_logged_in, is_admin, set_is_admin, get_is_admin, logout, is_admin_logged_in, set_local_admin_token, get_local_admin_token  };
