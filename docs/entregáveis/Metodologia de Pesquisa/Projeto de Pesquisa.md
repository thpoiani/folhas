☑ DESENVOLVIMENTO DE EDITOR DE TEXTO COM ESTRATÉGIAS DE ESCRITA COLABORATIVA PARA COMPARTILHAMENTO DE DOCUMENTOS EM REDES SOCIAIS
================================================================================================================================


☑ Pergunta
----------

O compartilhamento de documentos em redes sociais contribui para a
participação de colaboradores?


☑ Resumo
--------

Com a popularidade das redes sociais, grupos de amigos trabalham em conjunto para alcançar objetivos em comum, desencadeando a colaboração social que, se envolvida à produção de textos, torna-se escrita colaborativa. A conexão dessas comunidades ultrapassa o domínio dos próprios sites, integrando-se a variados sistemas externos. Softwares de edição de texto para múltiplos usuários são ineficientes em integração com redes sociais, portanto o objetivo desse projeto é desenvolver uma aplicação colaborativa de edição de texto com estratégias de escrita colaborativa para compartilhamento de documentos em redes sociais, promovendo a participação de amigos relacionados aos autores, que constribuirão sem um planejamento prévio, em tempo real, à documentos, empregando conceitos de escrita reativa.


☑ Palavras-chaves
-----------------

Escrita colaborativa, editor de texto, rede social, colaboração, tempo real


☑ Introdução e Justificativa
----------------------------

Redes sociais são serviços que permitem aos indivíduos construírem perfis públicos e agruparem outros usuários por conexões em comum (BOYD e ELLISON, 2007). Populares pelo dinamismo de interações entre amigos, combinar essas comunidades com aplicações tecnológicas estabelece uma conexão com um usuário real, permitindo expressar-se com círculos de amigos pelo sistema utilizado.

O trabalho em conjunto de um grupo de usuários de uma rede social para alcançar uma meta em comum é chamada de colaboração social. David Carr (2014), autor de "Social Collaboration for Dummies", exemplifica que uma empresa se beneficia desse trabalho colaborativo, especialmente quando possui empregados que trabalham remotamente.

Após avaliar diversas definições de colaboração, Carlos Dominguez (2011) a descreve como equipes diversificadas trabalhando juntas com o propósito de atribuir valor a algo, aproveitando tecnologias para interações efetivas, independentemente do espaço (virtual ou físico). Consequentemente, um software colaborativo deve auxiliar os usuários a atingirem seus objetivos executando tarefas em conjunto.

Num trabalho de escrita em grupo, conhecido como escrita colaborativa, "pode ocorrer a complementaridade de capacidades, de conhecimentos, de esforços individuais, de opiniões e pontos de vista" (PINHEIRO, 2011, p. 228). Em ambiente virtual, essa atividade colaborativa exige ferramentas como mensageiros instantâneos ou correios eletrônicos (Op. cit., p. 232).

O *Microsoft OneDrive* é um modelo aplicado de software de edição de texto em tempo real para escrita colaborativa. Contudo, não se integra com as redes sociais mais populares, restringindo o usuário a utilizar seus recursos sem compartilhar informação para suas conexões de amigos.

Como resultado de tal observação, o objetivo desse projeto é desenvolver um software colaborativo de edição de texto com estratégias de escrita colaborativa para compartilhamento de documentos em redes sociais, promovendo a participação de grupos de usuários relacionados aos autores.


☑ Objetivos
-----------

Com a popularidade de redes sociais, durante a concepção de um software, a equipe responsável pelo planejamento deve considerar a integração com tais comunidades, pois caracteriza que o usuário poderá se relacionar com seus amigos.

Observado a ineficiência de alguns editores de texto colaborativos em relação à integração com redes sociais, o objetivo desse projeto é desenvolver um software colaborativo de edição de texto com foco em compartilhamento de documentos em redes sociais.

Quando o software estiver finalizado e em estado operacional, surgirá a necessidade de analisar dados referentes ao uso e produtividade dos usuários. Em caso de resultados positivos, será fundamental realizar ajustes no projeto para aprimorar a experiência do usuário e promover a participação em documentos colaborados.


☑ Material e métodos
--------------------

Considerando a falta de editores de texto com integração social, o software desenvolvido nesse artigo terá como fundamento a escrita reativa. Pinheiro (2011) esclarece que os colaboradores que executam essa estratégia de escrita colaborativa "criam um documento em tempo real, reagindo às mudanças e contribuições de cada um do grupo e ajustando o texto, sem que haja necessariamente um planejamento prévio e uma coordenação explícita do texto a ser elaborado".

Para facilitar a usabilidade do editor colaborativo, esse será uma aplicação web, sendo integrado às redes sociais. A escrita colaborativa entre múltiplos usuários será permitida implementando conceitos de *real-time system* e *websockets*, ambos com o propósito de estabelecer conexões entre cliente e servidor (TOMISLAV CAPAN, 2014).

De acordo com Tomislav Capan (Op. cit), a plataforma *Node.js* é excepcional em *aplicações em tempo real* por empregar *websockets*. Conceituando esse desenvolvedor, este projeto implementará essa tecnologia pelo fato de ser eficiente nesse padrão de aplicação.

Simplificando a integração com banco de dados, será usado *MongoDB*, um banco de dados não relacional orientado a documentos. Tais documentos são escritos em formato *JSON*, que são objetos em *Node.js*, desse modo nenhuma conversão é necessária para manipulação de dados (TOMISLAV CAPAN, Op. cit.).

A navegação do usuário será registrada usando softwares estatísticos de visitação de sites, recolhendo informações de tempo de uso, áreas de cliques e interação social. A possibilidade de criação de metas, na ferramenta *Google Analytics* (GOOGLE ANALYTICS, 2014), permite analisar se o usuário completou certos requisitos durante o acesso ao sistema, enquanto o *Facebook Insights* (FACEBOOK DEVELOPERS, 2014) informa dados dos colaboradores como sexo, idade e horário de acesso.


☑ Forma de análise dos resultados
---------------------------------

Com os relatórios oferecidos das ferramentas de análises métricas, *Google Analytics* e *Facebook Insights*, será verificado qual o público alvo do sistema e se o usaram de maneira esperada. Ambas ferramentas representam os dados em formas gráficas, facilitando a interpretação e distribuição dos resultados.

Considerando os resultados analisados, o software sofrerá novas atualizações, com correções ou implementações de novos recursos, para garantir a qualidade esperada aos usuários.


☑ Cronograma de trabalho
------------------------------------------------

| Atividade                     | jan   | fev   | mar   | abr   | mai   | jun   |
|----------------------------   |:---:  |:---:  |:---:  |:---:  |:---:  |:---:  |
| Concepção                     | **X** |       |       |       |       |       |
| Estudo de tecnologias         | **X** | **X** | **X** |       |       |       |
| Levantamento de literatura    |       |       | **X** |       |       |       |
| Desenvolvimento               |       |       | **X** | **X** |       |       |
| Go-Live                       |       |       |       | **X** |       |       |
| Coleta de Dados               |       |       |       | **X** | **X** |       |
| Análise de Dados              |       |       |       | **X** | **X** |       |
| Elaboração de artigo          |       |       |       |       | **X** |       |
| Revisão do texto              |       |       |       |       | **X** | **X** |
| Entrega                       |       |       |       |       |       | **X** |


☑ Bibliografia
--------------

BOYD, D. M.; ELLISON, N. B. **Social Network Sites: Definition, History, and Scholarship**. In: Journal of Computer-Mediated Communication, 2007. v.13, p. 210-230.

CARR, David F. **Social Collaboration, Small Business Style**. InformationWeek: Connecting The Business Technology Community. 2014. Disponível em: <http://www.informationweek.com/software/productivity-collaboration-apps/social-collaboration-small-business-style/d/d-id/1113955>. Acesso em: mar 2014.

CAPAN, Tomislav. **Why The Hell Would I Use Node.js? A Case-by-Case Introduction**. Toptal | Exclusive access to top developer. 2014. Disponível em: <http://www.toptal.com/nodejs/why-the-hell-would-i-use-node-js>. Acesso em: abr 2014.

DOMINGUEZ, Carlos. **Collaboration: What Does it really mean?**. Cisco Blogs. 2011. Disponível em: <https://blogs.cisco.com/news/collaboration-what-does-it-really-mean>. Acesso em: mar 2014.

FACEBOOK DEVELOPERS. **Custom Stories Insights**. Disponível em:
<https://developers.facebook.com/docs/opengraph/guides/insights/#demographics>. Acesso em: abr 2014.

GOOGLE ANALYTICS. **About Goals - Analytics Help**. Disponível em:
<https://support.google.com/analytics/answer/1012040>. Acesso em: abr 2014.

PINHEIRO, Petrilson Alan. **A escrita colaborativa por meio do uso de ferramentas digitais: ressignificando a produção textual no contexto escolar**. In: Calidoscópio (UNISINOS), 2011. v. 9, p. 226-239.