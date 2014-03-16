# **folhas** <br> Editor Colaborativo de Documentos em Tempo Real

Proposto por [Thiago Henrique Poiani](http://github.com/thpoiani 'Thiago Henrique Poiani') como Projeto Final do curso superior de [Tecnologia em Análise e Desenvolvimento de Sistema](http://www.ifspsaocarlos.edu.br/portal/index.php/ads 'IFSP - Tecnologia em Análise e Desenvolvimento de Sistema'), **folhas** age como uma aplicação web de edição coletiva de documentos. <br>
Idealizado como código aberto, o projeto ficará disponível pelo seguinte repositório público, podendo ser executado, revisado, distribuído e aperfeiçoado, sobre condições da [licença MIT](https://github.com/thpoiani/folhas/blob/master/LICENSE 'licença MIT'):

[https://github.com/thpoiani/folhas](https://github.com/thpoiani/folhas 'folhas - Editor Colaborativo de Documentos em Tempo Real')

As seguintes representações gráficas definem, de maneira simplificada, a infraestrutura e tecnologias empregadas para o desenvolvimento da aplicação.

![Diagrama Simplificado de Infraestrutura](https://dl.dropboxusercontent.com/u/49252928/static-content/folhas/folhas-diagrama-infraestrutura-logos.png 'Diagrama Simplificado de Infraestrutura')
![Diagrama Simplificado de Tecnologias](https://dl.dropboxusercontent.com/u/49252928/static-content/folhas/folhas-diagrama-estrutura-tecnologias.png 'Diagrama Simplificado de Tecnologias')

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

![Diagrama de Caso de Uso](https://dl.dropboxusercontent.com/u/49252928/static-content/folhas/folhas-diagrama-caso-de-uso.png 'Diagrama de Caso de Uso')

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

![Autumn leaves (pantone) crop](http://upload.wikimedia.org/wikipedia/commons/7/70/Autumn_leaves_%28pantone%29_crop.jpg 'By Chris Glass, Cincinnati, USA - flickr.com - CC-BY-2.0 http://creativecommons.org/licenses/by/2.0, via Wikimedia Commons')
> http://commons.wikimedia.org/wiki/File:Autumn_leaves_(pantone)_crop.jpg

![Paleta de Cores](https://dl.dropboxusercontent.com/u/49252928/static-content/folhas/folhas-paleta-cores.png 'Paleta de Cores')

---

## Requisitos

Requisito é uma característica, atributo, habilidade ou qualidade que o sistema **folhas** deve prover.

### Resposive
Abordagem de design destinada a elaborar layouts para fornecer experiência de visualização, fácil leitura e navegação com um mínimo de redimensionamento e visionamento, para qualquer dispositivos (de monitores de computador a celulares).

### Meta tags
Marcação HTML para declaração de informações sobre a página web.

```html
<title></title>
<meta name="description" content="" />
<meta name="keywords" content="" />
<meta name="author" content="" />
<meta name="robots" content="" />
<link rel="canonical" href="" />
```

### [Facebook Open Graph](https://developers.facebook.com/docs/opengraph/ 'Facebook Open Graph')
Recurso oferido pelo [Facebook](https://www.facebook.com/ 'Facebook') para extração de dados relevantes. <br>
[Open Graph Debugger - Facebook](https://developers.facebook.com/tools/debug/ 'Open Graph Debugger - Facebook')

```html
<meta property="og:title" content="" />
<meta property="og:description" content="" />
<meta property="og:url" content="" />
<meta property="og:type" content="" />
<meta property="og:image" content="" />
<meta property="fb:admins" content="" />
```

### [Twitter Card](https://dev.twitter.com/docs/cards 'Twitter Card')
Recurso oferecido pelo [Twitter](https://twitter.com/ 'Twitter') para compartilhamento personalizado de conteúdo. <br>
[Twitter Cards | Twitter Developers](https://dev.twitter.com/docs/cards/validation/validator 'Twitter Cards | Twitter Developers')

```html
<meta name="twitter:card" content="" />
<meta name="twitter:url" content="" />
<meta name="twitter:title" content="" />
<meta name="twitter:description" content="" />
<meta name="twitter:image" content="" />
<meta name="twitter:site" content="" />
```

### [Google Authorship](https://plus.google.com/authorship 'Google Authorship')
Recurso oferecido pelo [Google+](https://plus.google.com/ 'Google+') para vínculo de conteúdo a um autor.

```html
<link rel="author" href="" />
<link rel="publisher" href="" />
```

### [Microsoft Pinned Site](http://windows.microsoft.com/en-us/internet-explorer/products/ie-9/features/pinned-sites 'Microsoft Pinned Site')
Recurso oferido pela [Microsoft](http://www.microsoft.com/ 'Microsoft') para fixar sites no menu e barra de tarefas. <br>
[Build My Pinned Site](http://www.buildmypinnedsite.com/ 'Build My Pinned Site')

```html
<meta name="application-name" content="" />
<meta name="msapplication-TileColor" content="" />
<meta name="msapplication-TileImage" content="" />
```

### [Google Analytics](https://www.google.com.br/analytics/‎ 'Google Analytics')
Recurso oferido pelo Google para gerar estatísticas detalhadas para monitoramento de tráfego de dados.

```html
<script>
    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
    function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
    e=o.createElement(i);r=o.getElementsByTagName(i)[0];
    e.src='//www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
    ga('create','UA-XXXXX-X');ga('send','pageview');
</script>
```

### [sitemap.xml](http://www.sitemaps.org/ 'sitemap.xml')
Documento com informações para indexação em motores de busca.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc></loc>
        <changefreq></changefreq>
    </url>
</urlset>
```

```html
<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
```

### [humans.txt](http://humanstxt.org/ 'humans.txt')
Documento com crédito aos desenvolvedores do sistema.

```
# humanstxt.org/
# The humans responsible & technology colophon

# TEAM
    <name> -- <role> -- <twitter>

# THANKS
    <name>

# TECHNOLOGY COLOPHON
    <name>

```

### [robots.txt](http://www.robotstxt.org/ 'robots.txt')
Documento com informações para indexação em motores de busca.

```
# www.robotstxt.org/

# Allow crawling of all content
User-agent: *
Disallow: <url>
Sitemap: <url>
```

```html
<meta name="robots" content="index, follow" />
```

### Microdata
Recurso para representar dados estruturados de maneira semântica. <br>
[schema.org](http://schema.org/ 'schema.org') <br>
[Google Structured Data Testing Tool](http://www.google.com/webmasters/tools/richsnippets 'Google Structured Data Testing Tool')

```html
<div itemscope itemtype="http://schema.org/Organization">
  <span itemprop="name">Google.org (GOOG)</span>

Contact Details:
  <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
    Main address:
      <span itemprop="streetAddress">38 avenue de l'Opera</span>
      <span itemprop="postalCode">F-75002</span>
      <span itemprop="addressLocality">Paris, France</span>
  </div>
    Tel:<span itemprop="telephone">( 33 1) 42 68 53 00 </span>,
    Fax:<span itemprop="faxNumber">( 33 1) 42 68 53 01 </span>,
    E-mail: <span itemprop="email">secretariat(at)google.org</span>
</div>
```

### Cross Browser
Habilidade da aplicação ser compatível a múltiplos navegadores.

#### [html5shim](https://code.google.com/p/html5shim/ 'html5shim')
JavaScript para habilitar tags HTML5 em navegadores antigos.

```html
<!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
```

#### [normalize.css](http://necolas.github.io/normalize.css/‎ 'normalize.css')
Estilos CSS para normalizar estilos específicos de navegadores.

```html
<link rel="stylesheet" href="http://necolas.github.io/normalize.css/3.0.0/normalize.css">
```

#### [Google Chrome Frame](https://www.google.com/chromeframe 'Google Chrome Frame')
Google Chrome Frame é um plug-in para tornar o Internet Explorer compatível com as tecnologias oferecidas pelo Google Chrome.

```html
<!-- IE deve rodar em modo desktop e ativar Chrome Frame, se existir -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
```

### Favicons e Apple Touch Icons
Touch Icons podem ser vistos como favicons (ícones do site) para dispositivos mobile e tablets.

```html
<link rel="apple-touch-icon-precomposed" sizes="152x152" href="">
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="">
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="">
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="">
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="">
<link rel="apple-touch-icon-precomposed" href="">
<link rel="icon" sizes="32x32" href="">
<link rel="icon" sizes="16x16 32x32" href="">
<link rel="shortcut icon" href="">
```
