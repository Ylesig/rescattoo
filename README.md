# rescattoo
## Autenticacao

O modelo `Usuario` usa `id_usuario`, `nome`, `endereco`, `contato`, `senha` e `perfil`. `contato` e o e-mail/login e possui `@unique` no Prisma. No cadastro e login, o e-mail e normalizado e deve obrigatoriamente terminar em `@gmail.com`; a senha deve ter de 8 a 72 caracteres, com maiuscula, minuscula e numero.

Senhas nunca sao persistidas em texto puro: o controller aplica `bcrypt.hash(senha, 10)` antes de salvar. O login usa `bcrypt.compare` e nunca devolve o hash.

As rotas `POST /auth/register` e `POST /auth/login` sao unicas para os dois perfis. O cadastro recebe `perfil: "usuario"` ou `perfil: "admin"`; para administrador, tambem exige o header `X-Admin-Key`, que deve corresponder a uma das variaveis `ADMIN_REGISTRATION_KEY_1`, `ADMIN_REGISTRATION_KEY_2` etc. no `.env`. Assim o cliente nao pode elevar o proprio perfil sem uma chave autorizada. Retornam `201` no cadastro, `200` no login, `400` para dados invalidos, `409` para e-mail duplicado e `401` para credenciais incorretas.

O login emite um JWT valido por sete dias (`JWT_EXPIRES_IN`). O middleware `autenticar` valida `Authorization: Bearer <token>` e popula `req.usuario`. `GET /auth/perfil` e `POST`, `PUT` e `DELETE /gatos` sao rotas protegidas.

Abra `teste.http` com a extensao REST Client do VS Code, execute cadastro e login, copie o `token` para `COLAR_TOKEN` e teste as rotas protegidas. O arquivo inclui os principais cenarios de erro.

No front-end, os formularios chamam a API, o token e o usuario ficam em `localStorage` para sobreviver ao fechamento da aba, o cabecalho mostra o usuario e `Sair` encerra a sessao. Operacoes de gatos enviam o Bearer automaticamente.

Copie `.env.example` para `.env` e defina `JWT_SECRET` e as chaves administrativas numeradas com valores fortes. `DATABASE_URL="file:./rescatto.db"` aponta para o banco local; o caminho e relativo a `prisma/schema.prisma`.

### Como criar a chave administrativa

Se ainda nao houver uma chave, execute no terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie o resultado para `env.env`, depois de `ADMIN_REGISTRATION_KEY=`, reinicie o servidor e informe essa mesma chave no formulario de cadastro administrativo. A chave nao deve ser compartilhada nem publicada no repositorio.

## Executar

```bash
npm install
npx prisma generate
npm run dev
```

Servidor: `http://localhost:3000`.
