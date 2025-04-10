# ReadX

**ReadX** é uma plataforma que visa facilitar a busca de livros usados e a troca dos mesmos entre os usuários do sistema, permitindo que registrem os livros de sua posse e possibilitando outros usuários oferecer seus livros como moeda de troca.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral

ReadX é uma aplicação web desenvolvida para conectar amantes de livros e facilitar a troca de livros entre eles. Com uma interface intuitiva, os usuários podem facilmente listar, buscar e negociar livros.

## Funcionalidades

- Cadastro e autenticação com email-senha ou Github
- Registro de livros disponíveis para troca em sua _estante virtual_
- Busca de livros por título, autor ou gênero
- Sistema de mensagens para negociação de trocas (chat)
- Perfil do usuário personalizável
  
## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) - Meta framework componente core do sistema
- [React](https://reactjs.org/) - Biblioteca para construção de interfaces de usuário
- [Tailwind](https://tailwindcss.com/) - Framework CSS
- [Prisma](https://www.prisma.io/) - ORM para banco de dados
- [Clerk](https://clerk.com/) - Provedor de autenticação
- [Terraform](https://www.terraform.io/) - Infrastructure as Code
- [Bun](https://bun.sh/) - Runtime JS batteries included
- [Docker](https://www.docker.com/) - Ferramenta para conteinerização

## Instalação

Antes de iniciar o projeto, tenha certeza que tem instalado em sua máquina:

- Docker e Docker Compose
- Bun
- Terraform

Para iniciar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/leonardonicola/readx.git readx
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd readx
   ```

3. Instale as dependências:

   ```bash
   bun install
   ```

4. Crie um arquivo `.env` e adicione as variáveis de ambiente necessárias baseado no `.env.example`. É necessário uma conta no Clerk para ter acesso as chaves descritas no `.env`.

5. Execute o servidor de desenvolvimento:

   ```bash
   bun dev
   ```

6. Acesse a aplicação em [http://localhost:3000](http://localhost:3000) em modo dev ou rode `docker compose --profile=dev up --build` e acesse [http://localhost](http://localhost) na porta 80

## Uso

Após a instalação, você pode acessar a plataforma e começar a registrar seus livros, buscar por outros livros e iniciar negociações com outros usuários.

## Contribuição

Contribuições são bem-vindas! Para contribuir com o projeto:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feat/nome-da-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça um push para a branch (`git push origin feat/nome-da-feature`).
5. Abra um Pull Request.

---
