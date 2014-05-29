# folhas

Proposto por [Thiago Henrique Poiani](http://github.com/thpoiani 'Thiago Henrique Poiani') como Projeto Final do curso superior de [Tecnologia em Análise e Desenvolvimento de Sistema](http://www.ifspsaocarlos.edu.br/portal/index.php/ads 'IFSP - Tecnologia em Análise e Desenvolvimento de Sistema'), **folhas** age como uma aplicação web de edição coletiva de documentos. <br>
Idealizado como código aberto, o projeto ficará disponível pelo seguinte repositório público, podendo ser executado, revisado, distribuído e aperfeiçoado, sobre condições da [licença MIT](../LICENSE 'licença MIT'):

[https://github.com/thpoiani/folhas](https://github.com/thpoiani/folhas 'folhas - Editor Colaborativo de Documentos em Tempo Real')

A seguinte representação gráfica define, de maneira simplificada, a infraestrutura da aplicação:

![Diagrama Simplificado de Infraestrutura](./diagramas/infraestrutura/diagrama-simplificado.png 'Diagrama Simplificado de Infraestrutura')

## Abrangência

**folhas** tem como principal objetivo o rápido compartilhamento de documentos para edição coletiva de usuários conectados. Para isso, será uma aplicação de tempo real, ao qual o *Socket.IO* possibilita comunicação entre diversos clientes. A grande quantidade de requisições será controlada pelo *Node.js*, um servidor *JavaScript*. <br>
O compartilhamento de um documento pode ser feito por redes sociais *(Facebook, Google Plus e Twitter)* ou simplesmente repassando o caminho específico *(URL)* para outro usuário. <br>
Para garantir a integridade do sistema, será obrigatório a autenticação do usuário por integração à redes sociais *(Facebook, GitHub, Google Plus e Twitter)* ou credenciais próprias adquiridas ao realizar o cadastro no site. <br>
Ao considerar escalabilidade, as entidades mapeadas, como por exemplo, os clientes e seus documentos, serão armazenadas em *MongoDB*, um banco de dados não relacional orientado a documentos. <br>
Visando a inovação do sistema e usabilidade para desenvolvedores, **folhas** amplia-se a uma *REST API*, com notação *JSON*, possibilitando a criação de novas ferramentas que utilizarão do serviço provido por esse projeto. <br>
O principal foco está voltado à experiência do usuário. <br>
Como escopo negativo, durante a edição de um documento, não haverá nenhuma ferramenta de interação virtual entre os usuários conectados, como batepapos ou videochamadas.

### Descrição dos usuários

Usuário é um indivíduo que utilizam o serviço **folhas**

1. *Cliente*: usuário que deseja compartilhar documentos com outras pessoas. Abrange todos que utilizam apenas a aplicação web.
2. *Desenvolvedor*: usuário avançado, tendo como principal foco a leitura da documentação e o uso da API. Podem contribuir para a evolução do projeto.

![Diagrama de Caso de Uso](./diagramas/caso%20de%20uso/folhas-diagrama-caso-de-uso.png 'Diagrama de Caso de Uso')

---

## Telas

Este seção caracteriza e detalha as telas do projeto **folhas**, de acordo com o modelo a seguir

```
Nome: Nome da tela
URI: URI da tela
Descrição: descrição dos elementos e informações contidas nessa tela
> Requisito: descrições detalhadas e segmentadas, em índices, dessa tela
> Nível funcional: grau de funcionalidade da ideia (Dispensável, Razoável, Regular, Necessário, Obrigatório)
```

**Nome**: Home <br>
**URI**: / <br>
**Descrição**: Tela inicial contendo as informações básicas de uso do projeto para o usuário, com menu com navegação em âncoras, descrição do projeto, contato do desenvolvedor, cadastro e login.

> **Requisito-00**: Logotipo que represente a ideia de compartilhamento <br>
> **Nível funcional**: Obrigatório
>
**Requisito-01**: Menu fixo [com diminuição de tamanho após altura específica (?)] com os seguintes canais: ['folhas', 'Como usar', 'Tecnologias', 'API', 'Contato'] <br>
> **Nível funcional**: Necessário
>
> **Requisito-02**: Descrição do **folhas** explicando a ideia do projeto e o porquê de usá-lo. Devido à âncora, alterar URI para `/why` <br>
> **Nível funcional**: Necessário
>
> **Requisito-03**: Como usar o **folhas**, contendo um vídeo demonstrativo. <br>
> **Nível funcional**: Necessário
>
> **Requisito-04**: Tecnologias usadas: node.js, git, socket.io, travis, etc. Devido à âncora, alterar URI para `/how` <br>
> **Nível funcional**: Necessário
>
> **Requisito-05**: Informações sobre a API voltada para desenvolvedores. Devido à âncora, alterar URI para `/api` <br>
> **Nível funcional**: Obrigatório
>
> **Requisito-06**: Informações de contato, como email, github e facebook. Devido à âncora, alterar URI para `/contact` <br>
> **Nível funcional**: Obrigatório
>
> **Requisito-07**: Rodapé contendo: ['Termos de uso', 'Política de privacidade', 'Política de utilização aceitável'] <br>
> **Nível funcional**: Obrigatório
>
> **Requisito-08**: Campos de autenticação no sistema e botão de cadastro. <br>
> **Nível funcional**: Obrigatório

===

**Nome**: Autenticação <br>
**URI**: /signup <br>
**Descrição**: Tela de cadastro de usuários.

> **Requisito-09**: Cadastro de usuários no próprio sistema. <br>
> **Nível funcional**: Obrigatório
>
> **Requisito-10**: Autenticação integrada com Facebook, Google e GitHub <br>
> **Nível funcional**: Necessário

===

**Nome**: Área do usuário <br>
**URI**: /me <br>
**Descrição**: Tela com listagem de documentos do usuário, com área de alterações de dados cadastrais.

> **Requisito-11**: Alteração de dados cadastrais. <br>
> **Nível funcional**: Obrigatório
>
> **Requisito-12**: Listagem de documentos criados ordenados por data ou nome, com exibição específica de permissão. <br>
> **Nível funcional**: Obrigatório
>
> **Requisito-13**: Referência para criação de documento (botão) <br>
> **Nível funcional**: Obrigatório
>
**Requisito-14**: UX - Exibir tutorial do sistema ao primeiro acesso do usuário. Próximos acessos, após tempo determinado, perguntar se deseja refazer tutorial. <br>
> **Nível funcional**: Necessário
>
> **Requisito-15**: Possibilidade de compartilhamento de documento. <br>
> **Nível funcional**: Regular

===

**Nome**: API <br>
**URI**: /api <br>
**Descrição**: Tela com informações específicas sobre API para desenvolvedores.

> **Requisito-16**: Explicações detalhadas do projeto usando ferramentas para documentação de API (http://apiary.io/). <br>
> **Nível funcional**: Obrigatório
>
> **Requisito-17**: Reforçar segurança. <br>
> **Nível funcional**: Obrigatório

===

**Nome**: Aplicação <br>
**URI**: /!#/:hash <br>
**Descrição**: Tela principal do sistema, responsável pela criação e edição de documentos.

> **Requisito-18**: Campo de texto para digitação com funcionalidades de atualização simultânea. <br>
> **Nível funcional**: Obrigatório.
>
> **Requisito-19**: Possibilidade de compartilhamento de documento. <br>
> **Nível funcional**: Obrigado.
>
> **Requisito-20**: Cursores com cores específicas para cada usuário conectado ao documento. <br>
> **Nível funcional**: Obrigatório.
>
> **Requisito-21**: Atribuição de permissões de compartilhamento. <br>
> **Nível funcional**: Obrigatório.

---

## Cores

![Autumn leaves (pantone) crop](./imagens/Autumn_leaves_(pantone)_crop.jpg 'By Chris Glass, Cincinnati, USA - flickr.com - CC-BY-2.0 http://creativecommons.org/licenses/by/2.0, via Wikimedia Commons')
> http://commons.wikimedia.org/wiki/File:Autumn_leaves_(pantone)_crop.jpg

[![Paleta de Cores](./cores/folhas-paleta-cores.png 'Paleta de Cores')](./cores/folhas-paleta.html 'Paleta de Cores')
