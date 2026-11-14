# LABMedical

Sistema web de prontuário eletrônico para clínicas, desenvolvido em **Angular 17**.
Permite cadastrar pacientes, registrar consultas e exames e acompanhar o histórico
de cada paciente em um prontuário organizado por data.

Projeto desenvolvido no programa **Fullstack Health (LAB365 / SENAI-SC)**.

🔗 **Acesse o projeto:** [https://labmedical-dc41.onrender.com](https://labmedical-dc41.onrender.com)

> Para testar, crie uma conta na tela de login e use dados fictícios.

## Funcionalidades

- **Autenticação**: criação de conta e login, com rotas internas protegidas.
- **Painel inicial**: totais de pacientes, consultas e exames, com busca rápida de pacientes.
- **Pacientes**: cadastro completo (dados pessoais, contato de emergência, alergias,
  convênio e endereço), edição e exclusão.
- **Endereço automático**: preenchimento de logradouro, bairro, cidade e estado a partir do CEP,
  pela API pública do [ViaCEP](https://viacep.com.br).
- **Consultas e exames**: cadastro, edição e exclusão vinculados a cada paciente.
- **Prontuário**: listagem de pacientes e página individual com o histórico de consultas
  e exames, do mais recente para o mais antigo.
- **Busca**: por nome, telefone, e-mail ou número de registro.
- **Validação de formulários**: campos obrigatórios, tamanhos mínimo e máximo e formato de e-mail,
  com mensagens de erro em cada campo.
- **Menu lateral recolhível**: mostra só os ícones quando recolhido e lembra a preferência do usuário.

## Tecnologias

- [Angular 17](https://angular.dev) com componentes standalone
- TypeScript, HTML e SCSS
- Reactive Forms
- [PrimeNG](https://primeng.org) e [Angular Material](https://material.angular.io)
- [ngx-mask](https://github.com/JsDaddy/ngx-mask) para máscaras de telefone e CEP
- Jasmine e Karma para testes
- Git, GitHub e Trello para organização das atividades

## Arquitetura

```
src/app/
├── models/                 # Interfaces tipadas: Paciente, Consulta, Exame, Usuario
├── services/
│   ├── paciente.service    # Acesso aos dados de pacientes, consultas e exames
│   ├── auth.service        # Cadastro, login e sessão
│   ├── address.service     # Consulta de CEP no ViaCEP
│   └── menu.service        # Estado do menu lateral
├── shared/
│   ├── components/         # Menu lateral, toolbar, rodapé, busca, cards e estatísticas
│   └── guards/             # authGuard, que protege as rotas internas
├── login/
├── inicio/
├── cadastro-de-paciente/
├── cadastro-de-consulta/
├── cadastro-de-exame/
├── listagem-de-prontuario/
└── prontuario-do-paciente/
```

O acesso aos dados fica concentrado nos serviços, e os componentes cuidam apenas da tela.
Toda busca, edição e exclusão é feita pelo identificador do registro.

> Por ser um projeto de front-end, os dados ficam salvos no `localStorage` do navegador
> e a autenticação é simulada. Use apenas dados fictícios.

## Rotas

| Rota | Tela |
| --- | --- |
| `/login` | Login e criação de conta |
| `/inicio` | Estatísticas e busca rápida |
| `/pacientes` | Cadastro de paciente |
| `/pacientes/:id` | Edição de paciente |
| `/consultas/:pacienteId` | Nova consulta |
| `/consultas/:pacienteId/:consultaId` | Edição de consulta |
| `/exames/:pacienteId` | Novo exame |
| `/exames/:pacienteId/:exameId` | Edição de exame |
| `/lista` | Listagem de prontuários |
| `/prontuario/:id` | Prontuário do paciente |

Todas as rotas, exceto `/login`, exigem que o usuário esteja logado.

## Como executar

Pré-requisitos: [Node.js](https://nodejs.org) 18 ou superior e o Angular CLI.

```bash
git clone https://github.com/Cristina-Freitas/LabMedical.git
cd LabMedical
npm install
npm start
```

Acesse http://localhost:4200, crie uma conta na tela de login e entre no sistema.

Para rodar os testes:

```bash
npm test
```

## Deploy

A aplicação está publicada no [Render](https://render.com) como site estático:

| Configuração | Valor |
| --- | --- |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist/lab-medical/browser` |
| Rewrite | `/*` → `/index.html` |

## Autora

**Cristina Freitas**
[GitHub](https://github.com/Cristina-Freitas)
