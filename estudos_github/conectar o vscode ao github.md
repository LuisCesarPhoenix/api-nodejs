Passo a passo para enviar o projeto do VS Code para o GitHub e sincronizar as alterações.

Pré-requisitos:
a) Conta no GitHub: Se você ainda não tem uma, crie uma conta gratuita em https://github.com
b) Git instalado: O Git é essencial para controlar as versões do seu código. Você pode baixá-lo em https://git-scm.com/
c) VS Code instalado: Certifique-se de ter o Visual Studio Code instalado no seu computador. Você pode baixá-lo em 
https://code.visualstudio.com/download
d) Extensão GitHub: Após baixar e instalar o VS Code, instale a extensão "GitHub Pull Requests and Issues" no VS Code para 
facilitar a integração com o GitHub.

Passo 1: Criar um repositório no GitHub
a) Acesse sua conta no GitHub e clique no botão "New" (Novo) para criar um novo repositório.
b) Dê um nome ao seu repositório (por exemplo, "meu-projeto").
c) Você pode adicionar uma descrição opcional.
d) Escolha se o repositório será público ou privado.
e) Marque a opção "Add a README file" (Adicionar um arquivo README) para criar um arquivo de documentação inicial.
f) Clique em "Create repository" (Criar repositório).

Passo 2: Inicializar o Git no seu projeto (VS Code)
a) Logue com a sua conta do GitHub no VS Code.
b) Abra a pasta do seu projeto no VS Code.
c) Abra o terminal integrado do VS Code (Visualizar > Terminal > New terminal ou CTRL + J).
observação: ALT + Z quebra a linha.
d) No terminal, execute o seguinte comando para inicializar um repositório Git dentro do diretório local: git init
e) dê o comando git config --global user.email "cesarrodriguesgoncalves@hotmail.com" (substitua pelo seu email)
f) dê o comando git config --global user.name "LuisCesarPhoenix" (substitua pelo seu nome de usuário) 
Observação:
O --global define essa configuração para todos os repositórios no seu computador.
Se quiser configurar apenas para um projeto específico, remova --global e execute dentro da pasta do projeto.

Passo 3: Conectar o repositório local ao repositório remoto (GitHub)
a) Dentro do repositório que você criou no GitHub, clique no botão verde escrito Code e copie a URL do repositório. A URL (HTTPS 
ou SSH) do repositório termina com .git
b) No terminal do VSCode, execute o seguinte comando: git remote add origin https://github.com/LuisCesarPhoenix/curso-youtube-react-next-typescript.git 
(substitua pela URL do seu repositório).

Passo 4: Adicionar e commitar os arquivos
a) Use o comando git add caminhnho-do-arq/diretório/arquivo para adicionar os arquivos do seu projeto à área de preparação do Git.
Exemplo: git add src/controllers/migrationController.js
b) Use o comando git commit -m "Mensagem inicial do commit" para criar um commit para cada arquivo. Substitua "Mensagem inicial do 
commit" por uma mensagem descritiva.
Exemplo: git commit -m "Corrigida conexão no migrationController.js"

Passo 5: Enviar os arquivos para o GitHub
a) Use o comando git push -u origin nome-da-branch para enviar seus commits para o repositório remoto no GitHub. No meu caso eu usei 
o master, mas você pode substituir. Porém o mais indicado é criar uma branch de trabalho para cada atualização e depois de revisar, 
discutir as alterações e mesclá-las à branch principal, excluir essa branch temporária.
b)Para criar uma branch diferente, antes de fazer um git push, você pode executar o comando git checkout -b nome-da-branch, 
em seguida executa o comando git branch para saber qual branch está sendo usada e depois você executa o comando git push -u origin 
nome-da-branch.

Passo 6: Sincronizar alterações futuras
1-Sempre que você fizer alterações no seu código no VS Code:
a) Use git add caminhnho-do-arq./diretório/arquivo para adicionar as alterações.
Exemplo: git add src/config/mongoConfig.js
b) Use o comando git commit -m "Mensagem descritiva das alterações" para criar um novo commit.
Exemplo: git commit -m "Refatorado método queryMongoDB para melhorar reutilização"
c) Use git push -u origin nome-da-branch para enviar seus commits para o repositório remoto no GitHub.

Dicas adicionais:
-Arquivo .gitignore: Crie um arquivo .gitignore na raiz do seu projeto para ignorar arquivos e pastas que você não quer enviar 
para o GitHub (por exemplo, arquivo de configuração de variáveis de ambiente(.env), pastas de dependências).
-Branches: Use branches para desenvolver novas funcionalidades ou corrigir bugs sem afetar a versão principal do seu código.
-Pull requests(Solicitação de pull): Use pull requests para revisar e discutir as alterações antes de mesclá-las à branch 
principal.

Quando você altera vários arquivos de uma vez, pode seguir dois caminhos no VS Code para descrever cada alteração de forma clara 
antes de fazer o commit:

1) Fazendo commits para cada arquivo:
a)Usando o Terminal (Manual para cada Arquivo)
Se quiser descrever alterações separadamente para cada arquivo modificado, pode adicionar os arquivos individualmente e fazer 
commits distintos:
git add src/controllers/migrationController.js
git commit -m "Corrigida conexão no migrationController.js"
git add src/config/mongoConfig.js
git commit -m "Refatorado método queryMongoDB para melhorar reutilização"
git push
Observação: utilize o comando git status para ver o caminho de cada arquivo alterado.

b)Usando o VS Code (Interface Gráfica)
Abra o VS Code e clique no ícone do Git (canto esquerdo, terceiro ícone).
Você verá a lista de arquivos modificados em "Changes".
Clique com o botão direito no arquivo ou no sinal de +(Stage Changes) do arquivo que quer commitar primeiro.
Digite uma mensagem de commit específica para aquele arquivo e clique em "Commit".
Repita o processo para os outros arquivos, adicionando mensagens personalizadas.
Depois, clique em "Sync Changes" (ou rode git push no terminal) para enviar os commits para o repositório remoto.

2 - Fazendo um Commit Único Com Uma Mensagem Detalhada
Se quiser fazer um único commit, mas com uma descrição mais detalhada, pode usar este comando:
git commit -m "Refatoração do código
- Corrigida conexão no migrationController.js
- Melhorada reutilização do queryMongoDB no mongoConfig.js
- Ajustados logs para maior clareza"
git push

Como fazer um versionamento(controle de versões):
-depois de gerar os commits, você pode executar um dos comandos a seguir:

a)Caso seja uma versão de patch:
npm version patch
v1.0.0 versão inicial
v1.0.1 versão atualizada 
A versão patch normalmente é usada para atualizações pequenas, correções, etc...

b)Caso seja uma versão minor:
npm version minor
v1.0.0 versão inicial
v1.1.0 versão atualizada 
A versão minor normalmente é usada quando você adiciona alguma funcionalidade ou novo componente.

c)Caso seja uma versão major:
npm version major
v1.0.0 versão inicial
v2.0.0 versão atualizada 
A versão major normalmente é usada para atualizações significantes, que normalmente podem modificar dependências e tornar a 
aplicação incompatível com algum outro sistema.

Exemplo: a aplicação está disponível com packages compatíveis com node 20, porém você adiciona um pacote que depende do node 22, 
isso pode acarretar em incompatibilidade com projetos que usam o node 20. Então você atualiza para a versão major.

Depois de fazer um dos 3 versionamentos(npm version patch, npm version minor ou npm version major), você executa o seguinte 
comando: git push -u origin nome-da-branch --tags

Caso você esteja confiante na atualização, você pode enviar a nova tag direto para o master(ou main):
git push -u origin master --tags

Caso tenha algum erro, você pode voltar para a versão anterior executando o checkout:
Exemplo: existem duas versões, a antiga(v1.0.1) e a nova(v1.0.2), caso tenha ocorrido alguma falha na v1.0.2, você executa o 
checkout na versão v1.0.1
git checkout v1.0.1 

Como clonar o repositório do Github no VS Code:
Clonar um repositório do GitHub diretamente no VS Code é uma maneira eficiente de começar a trabalhar em projetos. Aqui estão os 
passos para realizar essa ação:

1. Abra a Paleta de Comandos:
No VS Code, pressione Ctrl + Shift + P (Windows/Linux) ou Cmd + Shift + P (Mac) para abrir a Paleta de Comandos.

2. Digite "Git: Clone":
Na Paleta de Comandos, digite "Git: Clone" e selecione a opção correspondente.

3. Forneça a URL do Repositório:
Você será solicitado a fornecer a URL do repositório Git que deseja clonar. Cole a URL do repositório GitHub que você copiou 
anteriormente.
Login no Github: Se você estiver logado no github pelo VS code, ele apresentará seus repositórios para clonagem, facilitando o 
processo.

4. Escolha o Diretório de Destino:
Selecione a pasta onde você deseja clonar o repositório.

5. Aguarde a Conclusão:
O VS Code irá lidar com o processo de clonagem. Aguarde até que o processo seja concluído.
O VS code irá perguntar se você deseja abrir o repositório clonado, clique em abrir.

Dicas adicionais:
Extensão Git: O VS Code possui suporte integrado para Git, mas certifique-se de que a extensão Git esteja habilitada.
Terminal integrado: Você também pode usar o terminal integrado do VS Code para executar o comando git clone diretamente. Para 
abrir 
o terminal, pressione Ctrl + j ou Visualizar(...) > Terminal > New terminal(Windows/Linux) ou Cmd + j (Mac).

*Pesquisar sobre merger, versionamento(controle de versões), pull request e como criar branch de trabalho para subir as 
atualizações.
É melhor criar branches de acordo com o assunto que está você alterando.
Criar branches específicas para cada funcionalidade ou correção ajuda a manter o repositório organizado e facilita a revisão de 
código. 

Para trocar para uma branch existente:
$ git branch (para listar todas as branches existentes)
$ git checkout nome-da-branch ou git switch nome-da-branch(para trocar para a branch desejada)
Switched to branch 'master'
Your branch is up to date with 'origin/master'.

Como fazer um fork:
Vamos detalhar os passos para fazer um fork e enviar suas alterações usando o VS Code.
Observação: É preciso já ter o diretório baixado na sua máquina e aberto no VS Code, e sua conta do GitHub deve estar conectada no
VS Code.

1. Fazer o Fork no GitHub (pelo navegador):
a)Acesse o repositório no GitHub:
-Abra o navegador e vá para o repositório que você deseja fazer o fork.
b)Clique no botão "Fork":
-No canto superior direito da página do repositório, clique no botão "Fork".
-Selecione a sua conta do GitHub para onde o fork será criado.
c)Aguarde a criação do fork:
-O GitHub criará uma cópia do repositório na sua conta.

2. Adicionar o Repositório Remoto do Seu Fork no VS Code:
a)Copie a URL do seu fork:
-No GitHub, vá para o seu fork do repositório.
-Clique no botão "Code" e copie a URL do repositório (HTTPS ou SSH).
b)Abra o terminal integrado no VS Code:
-Vá para "Terminal" > "Novo Terminal" no menu do VS Code ou CTRL+j.
c)Adicione o repositório remoto:
-No terminal, execute o seguinte comando, substituindo URL-do-seu-fork pela URL que você copiou:
-git remote add fork URL-do-seu-fork
d)Verifique os repositórios remotos:
-Execute o seguinte comando para verificar se o repositório remoto foi adicionado corretamente: git remote -v
-Você deve ver o repositório original (origin) e o seu fork (fork) na lista.

3. Enviar as Alterações para o Seu Fork:
a)Faça suas alterações no VS Code:
-Edite os arquivos no VS Code conforme necessário.
b)Adicione as alterações ao staging area:
-No terminal, execute o seguinte comando: git add caminhnho-do-arq/diretório/arquivo.ext
c)Faça um commit das alterações:
-No terminal, execute o seguinte comando, substituindo "Mensagem do commit" por uma mensagem descritiva:
git commit -m "Mensagem do commit"
d)Envie as alterações para o seu fork:
-No terminal, execute o seguinte comando: git push fork nome-da-branch
-Se for a primeira vez que você envia para este branch, você pode precisar usar: git push -u fork nome-da-branch

4. Criar um Pull Request (PR) no GitHub:
a)Acesse o seu fork no GitHub:
-Abra o navegador e vá para o seu fork do repositório.
b)Clique no botão "Compare & pull request":
-O GitHub deve exibir um aviso indicando que você enviou um novo branch.
-Clique no botão "Compare & pull request".
c)Preencha os detalhes do PR:
-Adicione um título e uma descrição para o seu PR.
-Certifique-se de que o branch base seja o branch correto no repositório original.
d)Clique no botão "Create pull request":
-O seu PR será criado e enviado para o repositório original.

Dicas:
1-Use mensagens de commit descritivas para explicar suas alterações.
2-Mantenha seu fork sincronizado com o repositório original.
3-Siga as diretrizes de contribuição do projeto original.

Quick setup — if you’ve done this kind of thing before
or	
https://github.com/LuisCesarPhoenix/n8n.git
Get started by creating a new file or uploading an existing file. We recommend every repository include a README, LICENSE, and 
.gitignore.

…or create a new repository on the command line
echo "# n8n" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/LuisCesarPhoenix/n8n.git
git push -u origin main
…or push an existing repository from the command line
git remote add origin https://github.com/LuisCesarPhoenix/n8n.git
git branch -M main
git push -u origin main