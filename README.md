# **Desafio Abrigo de Animais - Solução 2025**
Este projeto foi desenvolvido como parte de um desafio técnico para um sistema de adoção de animais de um abrigo. 
O objetivo é criar um algoritmo que determine quais pessoas podem adotar quais animais baseado em regras específicas sobre brinquedos e compatibilidade.

# **Objetivos do Desafio**
- Valide entradas de brinquedos e animais
- Determine compatibilidade entre pessoas e animais
- Aplique regras específicas de adoção
- Retorne resultados formatados ou mensagens de erro

# **Regras de Adoção**
- **Ordem dos Brinquedos:** O animal vai para a pessoa que tiver todos os brinquedos favoritos na ordem correta
- **Intercalação Permitida:** Pessoas podem ter outros brinquedos entre os favoritos do animal
- **Conflito de Adoção:** Se ambas as pessoas podem adotar, o animal fica no abrigo
- **Limite por Pessoa:** Máximo de 3 animais por pessoa
- **Regra Especial Loco:** Não se importa com ordem, mas precisa de companhia (máximo 1 por pessoa)

```plaintext
Animais Cadastrados:
Nome            Espécie          Brinquedos Favoritos
 Rex             Cão                  RATO, BOLA
Mimi             Gato                 BOLA, LASER
Fofo             Gato              BOLA, RATO, LASER
Zero             Gato                 RATO, BOLA
Bola             Cão                CAIXA, NOVELO
Bebe             Cão              LASER, RATO, BOLA
Loco            Jabuti                SKATE, RATO
```

# **ETAPA 1: VALIDAÇÃO**
- Valida duplicatas em brinquedos e animais
- Verifica se brinquedos e animais existem no sistema
- Processa e normaliza as entradas (trim, case conversion)

# **ETAPA 2: PROCESSAMENTO**
- Determinação: Decide quem pode adotar cada animal
- Execução: Aplica limites e regras especiais (como Loco)
- Gerencia estado de adoções e pendências

# **ETAPA 3: FORMATAÇÃO**
- Ordena resultados alfabeticamente
- Formata saída no padrão: "Nome - destino"

# **Casos de Teste Cobertos**
**Casos Válidos:**
- Adoção simples com match perfeito
- Adoção com intercalação de brinquedos
- Animais indo para abrigo por conflito
- Aplicação de limites de adoção

**Casos de Erro:**
- Animal inexistente
- Brinquedo inválido
- Duplicatas em entradas

# **RESULTADO**

<img width="813" height="357" alt="test" src="https://github.com/user-attachments/assets/3d9b11f3-a3b4-4eb2-bc38-fecd49a0617c" />

