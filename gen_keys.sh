mkdir -p keys

# chaves RSA - 2048 bits
openssl genpkey -algorithm RSA -out keys/at_rsa_private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in keys/at_rsa_private_key.pem -out keys/at_rsa_public_key.pem

# chaves RSA - 2048 bits
openssl genpkey -algorithm RSA -out keys/rt_rsa_private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in keys/rt_rsa_private_key.pem -out keys/rt_rsa_public_key.pem

# SSL autoassinado
openssl req -x509 -newkey rsa:2048 -keyout keys/key_ssl.pem -out keys/cert_ssl.pem -days 365 -nodes -subj "//CN=localhost"
