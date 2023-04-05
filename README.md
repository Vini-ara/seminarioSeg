# CJR Blog

Esse projeto é a aplicação que será desenvolvida durante o primeiro Processo Trainee da CJR do ano de 2023. 

O projeto consiste em um simples mini blog interno da empresa, inspirado no twitter.

Comando para inicializar o projeto:
`npm run dev`

## Front-End

O front-end do projeto vai ser feito puramente em HTML/CSS e JavaScript com o auxílio de apenas duas Bibliotecas.

- [SimpleMDE](https://simplemde.com) - para criar os post com markdown, escolhemos essa biblioteca pois ela possibilita estilizar o editor markdown facilmente.
- [Markded](https://marked.js.org) - para receber um texto em markdown e transformar em html

Qualquer dúvida sobre como usar as bibliotecas eu (vini) posso ajudar.

Em relação à como vamos codar em Js puro, para já introduzir um pouco dos conceitos do React podemos utilizar o concieito de componentes. 
Como exemplo achei esse artigo [aqui](https://medium.com/swlh/writing-a-front-end-component-with-vanilla-js-8a8fbff56299) que dá uma boa ideia de como
 utilizar componentes com Js Vanilla, que torna codar o projeto mais fácil e se assemelha bem com React.
 
 - Link do figma com as telas: [telas](https://www.figma.com/file/ikH3l07vswnMSJ9WatwyzI/Processo-Trainee%2F2023.1?t=9KrgS0qjODIwYfnW-0)
 
 ## Back-End
 
 O back-end do projeto vai ser feito com express, prisma e o banco de dados acho que seria melhor utilizar SQLite, pois tiraria qualquer dificuldade relacionada a 
 configuração.
 
 A ideia é fazer com que o backend sirva os arquivos estáticos do front e também sirva a api.
 
 Para servir os arquivos estáticos do front é só usar um middleware que já vem com o express que é `express.static()`.
 
 O link do figjam com o modelo do BD e com um pequeno diagrama de fluxo do projeto segue abaixo:
 
 - [figjam](https://www.figma.com/file/YA7KLaJKhl5O8huNltqmgE/BD---PT-2023.1?t=VXZfMDTWgKh29dSv-0)
