# Abrigo de Animais

Este projeto é uma solução para um teste técnico proposto pela StartDB para 2025. O objetivo é implementar uma lógica para alocar animais em um abrigo, determinando a quem cada animal deve ser atribuído com base em brinquedos preferidos.

## Estrutura do Projeto

- `src/abrigo-animais.js`: Implementação da classe principal `AbrigoAnimais`.
- `src/abrigo-animais.test.js`: Testes automatizados utilizando Jest.
- `package.json`: Configuração do projeto e dependências.
- `jest.config.js`: Configuração do Jest.

## Como executar os testes

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute os testes:
   ```bash
   npm test
   ```

## Descrição da Solução

Implemente a função `encontraPessoas` na classe `AbrigoAnimais` para que, dado o interesse de duas pessoas por brinquedos e uma ordem de animais, retorne a lista de alocação dos animais e possíveis erros.

### Exemplo de uso

Veja os testes em `src/abrigo-animais.test.js` para exemplos de uso e critérios de aceitação.

## Requisitos
- Node.js
- npm

## Licença
ISC
