# Serena — Precificação e estoque

Aplicação local, sem dependências externas, baseada nas receitas do projeto original. Interface em português, responsiva para computador e celular. Não requer React, npm ou internet para funcionar.

## Abrir

Abra `index.html` no navegador. Mantenha a pasta inteira no mesmo local para preservar a origem do armazenamento.

Opcionalmente, com Python instalado, execute na pasta do projeto:

```powershell
python -m http.server 8080
```

Acesse http://localhost:8080. Utilize sempre o mesmo endereço e navegador: abrir como arquivo e abrir por servidor são armazenamentos diferentes.

## Primeiro uso

1. Em **Ingredientes**, confira os preços importados, quantidades das embalagens e unidades. Cadastre embalagens em unidades. Corantes e raspas precisam de revisão especial.
2. Em **Receitas**, informe o rendimento real: unidades de bolos por receita de massa; gramas finais após preparo para recheios e caldas. O rendimento começa em zero para evitar preços baseados em estimativas incorretas. É possível criar e editar receitas e ingredientes.
3. Em **Produtos**, ajuste as massas, gramas de cada recheio, embalagem por unidade, custos variáveis, margem, taxas e preço praticado. Zero no preço praticado aplica o preço sugerido.
4. Em **Estoque**, registre as compras na unidade base: 1 kg corresponde a 1.000 g. Informe custo TOTAL da entrada, lote, validade e fornecedor/responsável. A compra atualiza o preço do cadastro para o custo da última compra, não média ponderada. Lotes preservam seus próprios custos históricos.
5. Em **Produção**, prepare receitas informando o multiplicador da receita e o rendimento efetivo do lote. Depois monte os produtos. As quantidades são baixadas automaticamente, priorizando lotes que vencem primeiro. A operação inteira só é salva quando todos os insumos estão disponíveis e válidos.
6. Em **Estoque**, registre vendas, perdas e vencimentos por lote. A venda permite apenas produtos prontos dentro da validade. Use **Ajustar saldo contado** para corrigir diferenças físicas com justificativa. Em **Registrar devolução**, informe as unidades aptas a revenda, a validade original e o custo histórico. A identificação registra mercado/responsável e justificativa.
7. Em **Metas**, configure gastos fixos mensais e resultado desejado.
8. Em **Backup**, exporte regularmente. É possível restaurar JSON e exportar movimentações em CSV.

## Cálculos

- Ingrediente: preço da embalagem ÷ quantidade da embalagem × quantidade na receita.
- Massa por unidade: custo da receita ÷ rendimento informado.
- Recheio: custo da receita ÷ gramas finais × gramas usadas no produto.
- Produto: massa + recheios + embalagem integral por unidade + mão de obra variável + demais custos variáveis.
- Preço sugerido: custo variável ÷ (1 − margem percentual − taxas percentuais).
- Contribuição: preço aplicado × (1 − taxas) − custo variável.
- Meta: arredondar para cima (gastos fixos + resultado desejado) ÷ contribuição.

As metas por produto simulam a venda exclusiva daquele sabor. Custos fixos são considerados nas metas e não devem ser duplicados em outros custos variáveis. A margem informada é de contribuição; não é lucro líquido garantido. Os lotes guardam o custo dos insumos efetivamente consumidos, inclusive das preparações.

## Dados importados e limites

Preservadas 9 massas, 3 recheios/caldas e 3 combinações originais. Embalagem inicial de R$ 8 veio do código enviado e deve ser conferida. Ingredientes com o mesmo nome mas embalagens/preços diferentes foram mantidos separados, preservando os valores originais. Escolha o cadastro correto nas fichas técnicas se quiser unificá-los. Ovos não são convertidos automaticamente em 54 g; não há conversão de ml para g.

Sistema para operação local em um único navegador. Sem login, nuvem ou sincronização. Não use em várias abas simultaneamente para lançar movimentações. Não inclui emissão fiscal, contas a receber, consignação, pedidos ou apuração tributária. As taxas são informadas pela Serena. Validades são definidas pelo responsável pelo processo; o app não determina prazos sanitários.

Não remova nem limpe o armazenamento do navegador sem exportar um backup. Restaurar substitui todos os dados. Cadastros não são excluídos para proteger as referências do histórico.

## Estrutura

- `index.html`: entrada da aplicação.
- `style.css`: identidade visual e layout responsivo.
- `seed.js`: dados iniciais importados.
- `core.js`: regras de custo, estoque, produção e validação.
- `app.js`: telas, formulários, persistência, backup e relatórios.
- `tests.cjs`: testes das regras e renderização das telas.
- `original.jsx`: referência original enviada, preservada para consulta.

## Testar

Com Node.js instalado, execute `node tests.cjs`. Os testes não alteram dados do navegador.