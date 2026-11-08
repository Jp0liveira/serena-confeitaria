# Publicação no GitHub Pages

Esta pasta é a raiz do repositório sugerido `serena-confeitaria`.

O workflow `.github/workflows/pages.yml` testa o projeto e publica apenas os cinco arquivos necessários à aplicação. Não publica testes, documentação ou o código React original no artefato do site. Esses arquivos permanecem no repositório.

Após criar o repositório e enviar a branch `main`, configure **Settings → Pages → Build and deployment → Source → GitHub Actions**. Execute o workflow **Testar e publicar Serena** na aba **Actions**, se necessário. A URL definitiva aparece no resultado da implantação e em **Settings → Pages**.

Atualizações na branch `main` executam os testes antes de publicar. Não há instalação de dependências nem etapa de compilação.

## Acesso e dados

O aplicativo não tem login. O site publicado no Pages pode ser acessível publicamente conforme o plano e a configuração de acesso do GitHub. Os arquivos do site incluem as receitas e os preços iniciais importados; um repositório público também expõe seu código e histórico.

Compras e movimentações lançadas no aplicativo ficam no armazenamento local do navegador. Elas não são enviadas ao GitHub e não são compartilhadas entre dispositivos. Nunca adicione backups operacionais ao repositório. Exporte um backup antes de migrar do endereço local para o endereço do Pages e restaure-o no novo endereço.

GitHub Pages não fornece um banco de dados. Sincronização entre dispositivos, contas de usuários e proteção das receitas exigem uma evolução com autenticação e backend.

Referência: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
