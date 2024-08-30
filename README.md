# ReadX

**ReadX** é uma plataforma de troca de livros desenvolvida com Next.js. O objetivo do projeto é facilitar a troca de livros entre usuários, permitindo que registrem os livros que possuem e busquem por livros de interesse em uma comunidade.

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

- Cadastro e autenticação de usuários
- Registro de livros disponíveis para troca
- Busca de livros por título, autor ou gênero
- Sistema de mensagens para negociação de trocas
- Perfil do usuário com histórico de trocas

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) - Meta framework para renderização SSR e muito mais
- [React](https://reactjs.org/) - Biblioteca para construção de interfaces de usuário
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Prisma](https://www.prisma.io/) - ORM para banco de dados
- [Clerk](https://clerk.com/) - Provedor de autenticação
- [Pusher](https://pusher.com/) - Provedor de API realtime

## Instalação

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
   pnpm install
   ```

4. Crie um arquivo `.env` e adicione as variáveis de ambiente necessárias baseado no `.env.example`

5. Execute o servidor de desenvolvimento:

   ```bash
   pnpm dev
   ```

6. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Uso

Após a instalação, você pode acessar a plataforma e começar a registrar seus livros, buscar por outros livros e iniciar negociações com outros usuários.

## Contribuição

Contribuições são bem-vindas! Para contribuir com o projeto:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça um push para a branch (`git push origin feature/nome-da-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Sinta-se à vontade para personalizar este README conforme as necessidades específicas do seu projeto.
