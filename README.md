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

Não remova nem limpe o armazenamento do navegador sem exportar um backup. Restaurar substitui todos os dados.

## Exclusão de registros

Ingredientes, receitas e produtos têm um botão **Excluir** em suas listas. É necessário confirmar no formulário antes de salvar a exclusão. Cadastros vinculados a receitas ou produtos não podem ser excluídos até que esses vínculos sejam removidos. Cadastros com lotes, movimentações ou produção registrados ficam protegidos para preservar o histórico.

Em **Estoque**, o botão **Excluir** retira o lote da lista e zera seu saldo por uma movimentação identificada. Informe responsável e motivo e confirme a exclusão. O lote permanece no histórico, junto dos seus custos. Lotes com saldo zero também aparecem na lista até serem excluídos. Lotes excluídos não ficam disponíveis para ajustes de inventário. Para recuperar cadastros removidos, restaure um backup anterior.

## Peso cru e preço na ficha técnica

Na aba Receitas, o peso cru é calculado automaticamente. Ingredientes em gramas são somados diretamente. Mililitros usam a densidade em g/ml e ingredientes em unidades usam o peso em g/unidade, editáveis em Ingredientes. Conversões aproximadas ficam identificadas; sem conversão, a ficha mostra peso parcial e não calcula porções completas. Nas receitas antigas, ml usam provisoriamente 1 g/ml e ovos 54 g/unidade, marcados como estimativa. Corantes e outras unidades sem peso precisam de revisão.

Na ficha técnica, informe o peso cru por forma para estimar porções inteiras e sobra. Esse resultado não substitui o rendimento real após o preparo, que continua sendo a base do custo por unidade. Para recheios, o rendimento real é em gramas finais e os valores unitários são por grama. A ficha mostra custos de cada ingrediente, custo por unidade com embalagem e outros custos, preço sugerido, preço aplicado e percentual comprometido. Os parâmetros da ficha são independentes do cadastro de Produtos.

A receita **Bolo de leite — padrão Serena** é adicionada uma única vez, preservando suas receitas e alterações. Contém 100 g de composto na base e 40 g na saborização, 8 ovos de 50 g, rendimento real informado de 9 bolos, embalagem R$ 0,80 e preço aplicado R$ 8,00. O peso cru estimado é 3.973 g. A porção inicial de 450 g é somente uma estimativa editável: resulta em 8 porções e 373 g de sobra; ajuste-a ao peso realmente colocado em cada forma para comparar com os 9 bolos informados.

O composto usa embalagem de 200 g por R$ 4,90 conforme a hipótese do chat enviado. O óleo de 100 ml foi aproximado como 100 g para usar o preço de R$ 8,00/800 g; a baunilha de 8 g foi aproximada como 8 ml. Revise esses valores pesando os ingredientes. Água tem custo zero contabilizado. Bicarbonato permanece com preço pendente, sem transformar o valor desconhecido em um preço confirmado. O custo conhecido exato é R$ 24,265333… (exibição R$ 24,27), e não R$ 24,26: a soma evita arredondar cada linha antecipadamente. Para 9 bolos: custo parcial com embalagem de R$ 3,496148… por bolo (R$ 3,50), equivalente a 43,70% da venda. Não inclui despesas não informadas nem o bicarbonato. A receita original enviada não foi substituída.

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
