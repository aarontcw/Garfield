from mysql.connector.constants import ClientFlag
db_config = config = {
    'user': 'user',
    'password': 'user',
    'host': '34.87.154.208',
    'client_flags': [ClientFlag.SSL],
    'ssl_ca': '../ssl/server-ca.pem',
    'ssl_cert': '../ssl/client-cert.pem',
    'ssl_key': '../ssl/client-key.pem',
}

