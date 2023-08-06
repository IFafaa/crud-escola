# Teste Angular Escola
## Objetivo

A prefeitura de uma cidade no interior do país está com dificuldades para controlar suas
escolas públicas. Já existe um controle feito em Excel para controle das escolas e suas
turmas, porém, o cadastro está sempre obsoleto por não existir um sistema centralizado de
controle destes alunos. A prefeitura então nos contratou para desenvolver um sistema online
onde serão cadastradas as escolas públicas e suas respectivas turmas.


## Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

* Node.js (versão 12 ou superior)
* Angular CLI (8 ou superior)

## Iniciando o projeto
Siga as etapas abaixo para iniciar o projeto em sua máquina local:

Clone este repositório para o diretório desejado em sua máquina:

```
git clone https://github.com/IFafaa/crud-escola
```

Navegue até o diretório do projeto:

```
cd crud-escola
```

Altere o ambiente para o ambiente de desenvolvimento:

```
git checkout develop
```

Instale as dependências do projeto utilizando o npm (gerenciador de pacotes do Node.js):

```
npm install
```

Após a conclusão da instalação das dependências, você pode iniciar o servidor de desenvolvimento executando o seguinte comando:

```
ng serve
```

Em outro terminal para iniciar o servidor json-server(back-end - mockado) execute o seguinte comando:

```
json-server --watch server.json
```

O servidor de desenvolvimento será iniciado e estará disponível no endereço http://localhost:4200/. Acesse este endereço em seu navegador para ver o aplicativo em execução.

## Estrutura

O projeto utiliza de uma estrutura de pastas a nivel de modulos com as principais pastas sendo:

* <b>Core</b>: Arquivos essenciais para a aplicação;

* <b>Shared</b>: Onde ficarão os Dumb Components, que são componentes que não fazem nada por conta própria;

* <b>Modules</b>: São as páginas do nosso projeto onde estarão disponível os Smart Components.

<b>Core</b>: nesse diretório ficarão disponíveis os serviços singleton, tokens de injeção, constantes, configurações da aplicação, pipes, interceptors, guards, auth, service, utils. etc. São arquivos que serão usados em toda aplicação. Se conter algo que seja específico para a própria aplicação, implementação, CI/CD e API então colocamos no Core.

<b>Shared</b>: considere os módulos compartilhados como uma mini-biblioteca para seus componentes de IU. Eles não são específicos para um único recurso de negócios. Eles devem ser Dumb Components onde você possa pegá-los e colocar em outro projeto angular que funcione, não esquecendo que neste caso, as dependências sejam atendidas.

Um alerta para nosso SharedModule é que devemos ficar atentos em não deixá-lo gigantesco. Para evitar que isso ocorra é granularizar pensando em uma metodologia "Atomic Design" ou "Design Atômico" com a intenção de deixar caracterizada como um mini-biblioteca personalizada.

<b>Modules</b>: Esse diretório é a parte mais interessante dessa nossa arquitetura. Vamos pensar como um funil, onde os módulos de recursos caem, mas nada sai ou seja, nada exportado. As controllers não terão lógica de negócios. Eles são meramente apresentador e orquestrador do componentes dos módulos de recursos de negócio.

Dentro de um módulo, é comum criar segmentos de pastas adicionais para organizar os diferentes tipos de artefatos que são específicos daquele módulo. Alguns exemplos comuns de segmentos de pastas dentro de um módulo incluem  <b>Services</b>,  <b>Models</b>, <b>Pages</b> e <b>Components</b>.

* <b>Services</b>: O segmento de pastas Services é usado para armazenar os serviços que são específicos do módulo. Um serviço é uma classe Angular que fornece funcionalidades específicas para serem utilizadas por outros componentes do módulo. Por exemplo, um serviço pode ser responsável por realizar chamadas de API, manipular dados ou fornecer funcionalidades compartilhadas entre os componentes do módulo.

* <b>Models</b>: O segmento de pastas Models é usado para armazenar as classes de modelo que são específicas do módulo. Um modelo representa uma estrutura de dados que é usada dentro do módulo. Por exemplo, se o módulo estiver lidando com informações de usuários, você pode ter uma classe de modelo chamada User que define a estrutura e os atributos de um usuário.

* <b>Pages</b>: O segmento de pastas Pages é usado para armazenar os componentes que representam as páginas ou telas do aplicativo dentro do contexto do módulo. Uma página é geralmente um componente que exibe uma visualização completa e é responsável por interagir com o usuário. Cada módulo pode ter suas próprias páginas específicas.

* <b>Components</b>: O segmento de pastas Components é usado para armazenar outros componentes reutilizáveis específicos do módulo. Esses componentes podem ser utilizados dentro das páginas do módulo ou em outros componentes do módulo. Eles são projetados para fornecer funcionalidades específicas que são necessárias dentro do contexto do módulo.

A criação desses segmentos de pastas ajuda a manter uma estrutura organizada do código, tornando mais fácil encontrar e gerenciar os diferentes artefatos relacionados ao módulo. Cada módulo pode ter sua própria estrutura de pastas específica, dependendo das necessidades e complexidade do aplicativo. Deixando ela escalavel para novos modulos caso o projeto necessite

## Testes Unitários

O projeto foi desenvolvido e projetado com cobertura de testes unitários em Jasmine com um coverage de pelo menos 85% ou mais em todos os COMPONENTES

![image](https://github.com/IFafaa/crud-escola/assets/105167072/7f0df475-9b95-46c2-a980-713930d2864e)


Para executar os testes e mostrar o coverage utilize o comando:

```
ng test --code-coverage
```

## Comandos úteis

Aqui estão alguns comandos úteis que você pode utilizar durante o desenvolvimento do projeto:

* ng serve: Inicia o servidor de desenvolvimento em http://localhost:4200/.

* ng build: Compila o projeto para produção. Os arquivos de saída serão gerados no diretório dist/.

* ng test: Executa os testes unitários do projeto.

Certifique-se de consultar a documentação oficial do Angular para obter mais informações sobre o uso do Angular CLI e todas as suas funcionalidades.
