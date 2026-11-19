# Exploração: recurso de usuários (ServeRest)

- Data da exploração: 18 e 19/11/2026
- Ambiente: serverest.dev (API pública)
- Ferramentas: Swagger e Postman

## O que a API faz

A ServeRest é uma API REST pública e gratuita que simula uma loja virtual e serve como material de estudo de testes de API. Neste projeto, estou explorando o recurso de usuários, que, segundo a documentação, permite cadastrar, consultar, atualizar e excluir. Até agora testei o cadastro, a listagem, a busca por ID e a exclusão.

Segundo a documentação, o cadastro exige nome, e-mail, senha e o campo administrador. Testei a ausência do campo nome, e a API retornou 400. Observei também que cada usuário recebe um identificador único (_id) gerado pela API. Quando o cadastro é válido, a API retorna 201; quando o e-mail já existe ou falta um campo, retorna 400 com uma mensagem explicando o erro. Depois de excluir um usuário, a busca pelo mesmo _id retorna 400 com a mensagem "Usuário não encontrado", e uma segunda exclusão retorna 200 com "Nenhum registro excluído". Os dois comportamentos estão previstos na documentação. Também percebi que a API devolve o campo password nas consultas.

## Recursos e métodos (segundo a documentação)

- Recursos: Login, Usuários, Produtos e Carrinhos
- Usuários: GET e POST em /usuarios; GET, PUT e DELETE em /usuarios/{_id}

## Campos do usuário

- _id: gerado pela API (não é enviado no cadastro)
- nome, email, password: texto, obrigatórios no cadastro
- administrador: texto com valor "true" ou "false", obrigatório

## Respostas observadas

| Ação | Status | Estrutura da resposta | Observações |
|---|---|---|---|
| Listar usuários (GET /usuarios) | 200 | quantidade e usuarios | Devolve o campo password |
| Cadastrar usuário (POST /usuarios) | 201 | message e _id | _id gerado pela API |
| Buscar por ID (GET /usuarios/{_id}) | 200 | o próprio usuário | Também devolve o campo password |
| Cadastrar com e-mail repetido | 400 (confirmado no Postman) | message | O Swagger exibiu 201 na coluna Code, mas o texto dizia 400 |
| Cadastrar sem o campo nome | 400 (confirmado no Postman) | nome | Mesma divergência de exibição no Swagger |
| Excluir usuário (DELETE /usuarios/{_id}) | 200 | message: "Registro excluído com sucesso" | Exclusão confirmada |
| Buscar usuário excluído (GET /usuarios/{_id}) | 400 | message: "Usuário não encontrado" | Previsto na documentação ("ID inválido ou usuário não encontrado"). Não é bug |
| Excluir usuário já excluído (DELETE /usuarios/{_id}) | 200 | message: "Nenhum registro excluído" | Previsto na documentação (200 cobre "Registro excluído com sucesso" e "Nenhum registro excluído"). Não é bug |

## Observações

- A documentação do GET por ID prevê 400 para usuário não encontrado e mostra o campo password no exemplo de resposta (comportamento documentado, mas vale questionar a exposição de senha em uma API real).
- A documentação do DELETE prevê 200 tanto para "Registro excluído com sucesso" quanto para "Nenhum registro excluído". O mesmo status cobre os dois resultados, e só a mensagem os diferencia.
- Para um usuário inexistente, o GET retorna 400 e o DELETE retorna 200 (ambos documentados).
- A documentação do DELETE prevê 400 ao excluir usuário que possui carrinho ("Não é permitido excluir usuário com carrinho cadastrado"). Regra de negócio para virar caso de teste.
- Nos POST com erro, a coluna Code do Swagger mostrou 201 enquanto o texto indicava 400. Conferir o status no Postman antes de abrir um bug.
- O ServeRest online limita requisições (429). Evitar muitos requests seguidos.

## Dúvidas

- Por que o Swagger mostrou 201 na coluna Code se o status real era 400?
- Por que /carrinhos/concluir-compra e /carrinhos/cancelar-compra usam DELETE?
- O que acontece se eu enviar um _id no corpo do cadastro?
- Um _id mal formado retorna o mesmo 400 de um _id inexistente?

## Ainda não explorado

- PUT em /usuarios/{_id}
- Excluir usuário que possui carrinho (400; depende de Login, Produtos e Carrinhos)
- Recursos Login, Produtos e Carrinhos