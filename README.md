# UnBlog

Esse projeto é a aplicação desenvolvida pro seminário de segurança computacional. 

O projeto consiste em um simples mini blog focado na parte de autenticação via tokens assinados (JWT).

## Rodando o projeto

É um projeto em node.js então é necessário alguma versão do node.js instalada.

O projeto usa HTTPS, então é necessário informar pelo menos um certificado e uma chave.

Para rodar localmente rode o comando: 
`mkdir keys && openssl req -x509 -newkey rsa:2048 -keyout keys/key_ssl.pem -out keys/cert_ssl.pem -days 365 -nodes -subj "//CN=localhost"`

Assim, serão gerados dois arquivos .pem em uma pasta `keys`, copie esses arquivos e ponha seus conteúdos no seu `.env`.

### O .env

```
JWT_AT_SECRET_KEY="" # uma chave para o HMAC do token aqui
JWT_AT_EXPIRES_IN="" # tempo de expiração do token
DATABASE_URL=""      # url do banco postgres

SSL_KEY=""  # chave privada do certificado
SSL_CERT="" # certificado
```

Com tudo configurado, basta rodar `npm install` para instalar as dependências.

Comando para inicializar o projeto:
`npm run dev`
