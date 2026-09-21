# rescattoo
## Autenticacao

O modelo `Usuario` usa `id_usuario`, `nome`, `endereco`, `contato`, `senha` e `perfil`. `contato` e o e-mail/login e possui `@unique` no Prisma. No cadastro e login, o e-mail e normalizado e deve obrigatoriamente terminar em `@gmail.com`; a senha deve ter de 8 a 72 caracteres, com maiuscula, minuscula e numero.

Senhas nunca sao persistidas em texto puro: o controller aplica `bcrypt.hash(senha, 10)` antes de salvar. O login usa `bcrypt.compare` e nunca devolve o hash.

As rotas `POST /auth/register` e `POST /auth/login` sao unicas para os dois perfis. O cadastro recebe `perfil: "usuario"` ou `perfil: "admin"`; o perfil admin e criado normalmente pelo campo do payload, sem necessidade de chave especial. Retornam `201` no cadastro, `200` no login, `400` para dados invalidos, `409` para e-mail duplicado e `401` para credenciais incorretas.

O login emite um JWT valido por sete dias (`JWT_EXPIRES_IN`). O middleware `autenticar` valida `Authorization: Bearer <token>` e popula `req.usuario`. `GET /auth/perfil` e `POST`, `PUT` e `DELETE /gatos` sao rotas protegidas.

## Validacao e e-mail

As entradas de body, params e query passam por schemas Zod aplicados com o middleware generico `validate(schema)` antes dos Controllers. Os schemas normalizam e-mail, exigem senha forte, campos obrigatorios e IDs inteiros positivos. O error handler centralizado responde `400` com `issues` contendo `path` e `message`; `404` indica recurso inexistente e `409` indica conflito, como e-mail duplicado.

O cadastro dispara um e-mail de boas-vindas depois de responder `201`. O envio esta isolado em `src/services/sendMail.ts`, com texto puro e HTML. Sem SMTP configurado, o desenvolvimento usa uma conta Ethereal de teste e imprime a URL de preview no terminal. Falhas SMTP sao registradas sem alterar o cadastro concluido. Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` e `SMTP_FROM` no `.env`; nunca coloque credenciais no repositorio.

Abra `teste.http` com a extensao REST Client do VS Code, execute cadastro e login, copie o `token` para `COLAR_TOKEN` e teste as rotas protegidas. O arquivo inclui os principais cenarios de erro.

No front-end, os formularios chamam a API, o token e o usuario ficam em `localStorage` para sobreviver ao fechamento da aba, o cabecalho mostra o usuario e `Sair` encerra a sessao. Operacoes de gatos enviam o Bearer automaticamente.

Durante `npm install`, se `.env` ainda nao existir, ele e criado automaticamente a partir de `.env.example`. O arquivo `.env` continua fora do Git; para manter uma chave personalizada entre Codespaces, configure `JWT_SECRET` como segredo do Codespaces ou copie sua chave para o arquivo criado. `DATABASE_URL="file:./rescatto.db"` aponta para o banco local; o caminho e relativo a `prisma/schema.prisma`.

## Executar

```bash
npm install
npx prisma generate
npm run dev
```

Servidor: `http://localhost:3000`.
