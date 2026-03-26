# Gerenciador de Tarefas

Aplicação mobile desenvolvida em React Native utilizando Expo, com o objetivo de gerenciar tarefas com múltiplos atributos e ordenação. 

## 📱 Funcionalidades

- Cadastro de tarefas com:
  - Descrição
  - Prioridade (1 a 5)
  - Prazo (dd/mm/aaaa)
- Edição de tarefas
- Exclusão individual de tarefas
- Remoção de todas as tarefas
- Ordenação automática por:
  - Prazo (data mais próxima primeiro)
  - Prioridade (em caso de empate)
- Máscara automática no campo de data

## 🧠 Regras de Negócio

- Prioridade varia de 1 (mais alta) a 5 (mais baixa)
- O prazo deve ser informado no formato `dd/mm/aaaa`
- A lista é ordenada primeiro por data e, em caso de empate, por prioridade


## ▶️ Como executar

```bash
npm install
npx expo start
```
---

Desenvolvido para fins acadêmicos.
