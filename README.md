folhas
======

**folhas** será uma aplicação web de edição colaborativa de documentos.

Metodologia
-----------

Proposto como Projeto Final do curso superior de [Tecnologia em Análise e
Desenvolvimento de Sistema](http://www.ifspsaocarlos.edu.br/portal/index.php/ads
'IFSP - Tecnologia em Análise e Desenvolvimento de Sistema'), **folhas** tem
como principal objetivo o compartilhamento de documentos para edição
colaborativa.

Para isso, será uma aplicação de tempo real, ao qual o
[Socket.IO](http://socket.io/ 'Socket.io') possibilitará comunicação entre
clientes.

Devido a quantidade de requisições, será desenvolvido em
[Node.js](http://nodejs.org/ 'Node.js').

O compartilhamento de um documento poderá ser feito através de redes sociais ou
repassando uma URL específica para outro usuário.

Ao considerar escalabilidade, as entidades mapeadas serão armazenadas em
[MongoDB](http://www.mongodb.org/ 'MongoDB').

Visando a inovação do sistema e usabilidade para desenvolvedores, **folhas**
amplia-se a uma *REST API*, com notação *JSON*, possibilitando a criação de
novas ferramentas que utilizarão do serviço provido por esse projeto.

Idealizado como código aberto, o projeto ficará disponível podendo ser
executado, revisado, distribuído e aperfeiçoado, sobre condições da [licença
MIT](LICENSE 'licença MIT').
