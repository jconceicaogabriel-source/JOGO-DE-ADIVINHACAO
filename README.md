# 🎮 Jogo de Adivinhação de Números

## 📝 Descrição do Projeto
Este projeto é um jogo interativo de adivinhação desenvolvido para rodar diretamente no navegador. O sistema gera um número secreto aleatório e desafia o usuário a descobri-lo dentro de um limite máximo de tentativas, fornecendo dicas em tempo real se o palpite enviado é maior ou menor que o número correto.

## 🚀 O que o site entrega
* Geração Dinâmica: Criação de um número secreto aleatório entre 1 e 100 a cada nova partida.
* Validação de Entrada: Controle de erros para garantir que o jogador insira apenas números válidos dentro do intervalo estipulado.
* Interface Responsiva: Painel limpo contendo feedbacks visuais automáticos sobre o sucesso, dicas ("o número é maior/menor") e o contador regressivo de tentativas restantes.
* Mecânica de Fim de Jogo: Bloqueio automático das interações ao esgotar as chances ou ao acertar o número.

## 🛠️ Tecnologias Utilizadas e Justificativa
* HTML5: Utilizado para estruturar os elementos essenciais da interface (campos de entrada, botões de ação e parágrafos de texto).
* CSS3: Aplicado para criar um design intuitivo e amigável, garantindo que as mensagens de status ganhem destaque visual.
* JavaScript (Vanilla): A escolha central do projeto. Utilizado para gerenciar a lógica de controle (`if/else`), manipulação de eventos de clique e geração matemática do número aleatório com `Math.random()`, demonstrando o domínio de algoritmos síncronos básicos.
