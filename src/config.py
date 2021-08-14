from mysql.connector.constants import ClientFlag
db_config = config = {
    'user': 'user',
    'password': 'pw',
    'host': 'host',
    'client_flags': [ClientFlag.SSL],
    'ssl_ca': '../ssl/server-ca.pem',
    'ssl_cert': '../ssl/client-cert.pem',
    'ssl_key': '../ssl/client-key.pem',
}

