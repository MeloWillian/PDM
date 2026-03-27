# 🎮 Jogo da Velha - React Native (PDM 2026)

Implementação de um Jogo da Velha desenvolvido em React Native, seguindo uma abordagem incremental por etapas, com foco em modelagem orientada a objetos e integração com interface gráfica.

---

## 📌 Sobre o Projeto

Este projeto foi desenvolvido como atividade prática da disciplina de
Programação para Dispositivos Móveis (PDM).

O objetivo principal é construir um jogo da velha evoluindo sua
complexidade ao longo de etapas, aplicando conceitos como:

- Interface gráfica responsiva
- Programação orientada a objetos (OO)
- Separação de responsabilidades
- Integração entre lógica de negócio e UI
- Inteligência artificial (minimax)

---

## 🧱 Estrutura do Projeto

    Jogo_da_Velha/
    ├── app/
    │   └── index.tsx
    ├── src/
    │   ├── classes/
    │   │   ├── Jogador.ts
    │   │   ├── JogadorCPU.ts
    │   │   ├── Tabuleiro.ts
    │   │   └── JogoDaVelha.ts
    │   └── types/
    │       └── jogo.ts

---

## 🚀 Etapas do Desenvolvimento

### 🟢 Etapa 1 - Interface com o Usuário

- Criação da interface do jogo
- Uso de useWindowDimensions para responsividade
- Exibição do tabuleiro
- Exibição do placar

---

### 🟡 Etapa 2 - Modelagem Orientada a Objetos

- Implementação da lógica do jogo utilizando OO
- Criação das classes principais
- Separação da lógica da interface
- CPU simples

---

### 🔵 Etapa 3 - Integração OO + Interface Gráfica

- Integração completa entre UI e classes
- Jogada automática da CPU
- Implementação de IA com Minimax
- Controle de vitória e empate
- Atualização do placar

---

## 🧠 Arquitetura

- UI (index.tsx): interface e interação
- JogoDaVelha: controle do jogo
- Tabuleiro: estado do tabuleiro
- Jogador / JogadorCPU: jogadores

---

## ▶️ Como Executar

    npm install
    npx expo start

---

## 👨‍💻 Autor

Willian de Melo Araújo
