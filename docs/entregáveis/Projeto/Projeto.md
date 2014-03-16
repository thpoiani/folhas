# Projeto

`24 de fevereiro`

## Descrição de API

> API é um conjunto definido de mensagens de requisição e resposta HTTP, geralmente expressado nos formatos XML ou JSON. Ainda que termo seja um sinônimo para web service, a chamada Web 2.0 está aos poucos depreciando o modelo de serviços SOAP para a técnica REST.

> pt.wikipedia.org/wiki/API‎

Visando a inovação do sistema e usabilidade para desenvolvedores, **folhas** amplia-se a uma *REST API*, com notação *JSON*, possibilitando a criação de novas ferramentas que utilizarão dos serviços providos por esse projeto:

* manipulação de documento (criação, visualização, edição e remoção)
* alteração de permissões de documentos

Por padrões e segurança, a API deverá possuir:

* documentação detalhada com exemplos
* termos de uso e condições
* API key
* autenticação
* limite de uso
* cache de dados
* formato padrão JSON

## Comparação de Projetos similares:

* [Etherpad](http://etherpad.org/ 'Etherpad')
* [Firepad - An open source collaborative code and text editor](http://www.firepad.io/ 'Firepad - An open source collaborative code and text editor')
* [Koding | A new way for developers to work](https://koding.com/ 'Koding | A new way for developers to work')
* [MeetingWords: Realtime Collaborative Text Editing](http://meetingwords.com/ 'MeetingWords: Realtime Collaborative Text Editing')
* [online text editor - collabedit](http://collabedit.com/ 'online text editor - collabedit')
* [Floobits: Cross-editor real-time collaboration](https://floobits.com/ 'Floobits: Cross-editor real-time collaboration')
* [Squad: Collaborative IDE](https://squadedit.com/ 'Squad: Collaborative IDE')
* [Cloud9 IDE | Your code anywhere, anytime](https://c9.io/ 'Cloud9 IDE | Your code anywhere, anytime')
* [Ace - The High Performance Code Editor for the Web](http://ace.c9.io/ 'Ace - The High Performance Code Editor for the Web')
* [ETC - Editor de Texto Coletivo - NUTED](http://www.nuted.ufrgs.br/?page_id=81 'ETC – Editor de Texto Coletivo - NUTED')

### Considerações individuais

* Etherpad <br>
    Projeto *open source* bem documentado *(wiki)*, feito usando *Node.js* com contribuição de grandes empresas *(Google, Mozilla)*. <br>
    Possui uma API para criar, deletar, obter e atribuir conteúdo a um documento. <br>
    Pode exportar um documento em diversos formatos, porém foi planejado para uso local. <br>
<br>

* Firepad <br>
    O projeto implementa apenas o *client side*. Vários outros serviços utilizam esse editor de texto. <br>
<br>

* Koding <br>
    Rede social para desenvolvedores, possuindo autenticação com conta do GitHub e várias interações coletivas (console, edição de imagens). <br>
    Aplicação que utiliza Firepad. <br>
<br>

* MeetingWords <br>
    Aplicação que utiliza Etherpad. <br>
<br>

* collabedit <br>
    O documento é compartilhando por um *hash* na URL *(/hash)*. <br>
<br>

* Floobits <br>
    O compartilhamento de documentos ocorre entre a aplicação web e editores de texto *(Emacs, Sublime, VIM)*. <br>
    Possui batepapo com vídeo chamadas. <br>
<br>

* Squad <br>
    Aplicação voltada para empresas. Os usuários possuem autenticação e permissões de acessos a documentos. <br>
    A quantidade de usuários define o valor a ser pago. <br>
<br>

* Cloud9 <br>
    Ambiente de desenvolvimento colaborativo. <br>
<br>

* Ace <br>
    Editor de código escrito em *JavaScript*, com reace de sintaxe. <br>
    Mantido pelo *Cloud9* e *Mozilla*. <br>
<br>

* ETC <br>
    Projeto nacional desenvolvido na UFRGS e financiado pelo CNPq. <br>
    Projeto similar ao *Moodle*. <br>

### Diferenciais

Aplicação com autenticação, por redes sociais ou criando usuários, com área de documentos criados pelo usuário. <br>
Integração com redes sociais e compartilhamento de documentos. Permissões para cada documento e seus colaboradores. <br>
Planejado à experiência do usuário *(UX)*. <br>

### Contribuição

Não pretendo contribuir *(fork)* em nenhum projeto, mas possivelmente utilizarei o editor de código **Ace** e as tecnologias aplicadas no **Etherpad**.

## Diagrama de Caso de Uso


![Diagrama de Caso de Uso](../../diagramas/caso%20de%20uso/folhas-diagrama-caso-de-uso.png 'Diagrama de Caso de Uso')