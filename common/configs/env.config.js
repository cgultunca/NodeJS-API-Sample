module.exports = {
    "port": 3200,
    "appEndpoint": "http://localhost:3200",
    "apiEndpoint": "http://localhost:3200",
    "jwt_secret": "node!!apitSecret",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 2,
        "ADMIN": 3
    }
};