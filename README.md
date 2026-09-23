# FinTrack Dashboard

O FinTrack foi criado para substituir o uso de planilhas do Google no controle financeiro pessoal e familiar.

Embora planilhas sejam úteis, elas exigem preenchimento manual, podem ficar desorganizadas com o tempo e dificultam a visualização rápida de informações importantes, como saldo disponível, total de receitas, despesas por categoria e comparação entre meses.

O FinTrack centraliza esse controle em uma interface mais simples e visual. A aplicação permite cadastrar, editar e excluir transações, pesquisar lançamentos, filtrar por mês ou tipo, acompanhar gráficos financeiros e gerar relatórios em PDF.

Os dados são armazenados em um banco PostgreSQL por meio de uma API construída com Node.js e Express, trazendo mais organização e persistência para o controle financeiro.

Com isso, o usuário pode acompanhar sua vida financeira sem depender de fórmulas, abas ou configurações manuais de planilhas.

## Funcionalidades

# Landing Page + Modo Claro.

<img width="692" height="388" alt="LandingPage" src="https://github.com/user-attachments/assets/5d0fb527-982c-4b57-b887-25e071f5cd70" />

# Funcionalidade de cadastro e sistema de meta.

<img width="692" height="388" alt="Demonstração cadastro e meta" src="https://github.com/user-attachments/assets/c6c82b30-1a2a-4a1c-8c59-811244f50e72" />

# Edição e exclusão.

<img width="692" height="388" alt="Edição e exclusão" src="https://github.com/user-attachments/assets/41a19f4e-b5f1-4c22-8c27-1e1938a0c467" />

# Opção para exportar para PDF.

<img width="692" height="388" alt="Exportar PDF" src="https://github.com/user-attachments/assets/18a98925-471e-4b9f-8d6f-8dbffe21982a" />

# Demonstração do arquivo PDF gerado.

<img width="1920" height="1080" alt="Capturar" src="https://github.com/user-attachments/assets/1d02b233-450b-433a-aa05-c55a1fde958b" />

# Responsividade.

<img width="692" height="388" alt="Responsividade" src="https://github.com/user-attachments/assets/ec115830-1681-4253-8e60-791339a8906c" />

## Tecnologias

- HTML, CSS e JavaScript puro.
- Chart.js para gráficos, Lucide para ícones e jsPDF para documentos PDF.
- Node.js, Express e CORS no backend.
- PostgreSQL e `pg` para persistência de dados.


## Próximos passos

- Criar autenticação e associar transações a cada usuário.
- Permitir criar e editar categorias personalizadas.
- Criar testes automatizados para a API e a interface.
- Preparar a publicação do frontend, backend e banco de dados.
