const assert = require('node:assert/strict');

async function testarConsultaUsuarios() {
    const resposta = await fetch('https://serverest.dev/usuarios');

    assert.equal(resposta.status, 200);

    const dados = await resposta.json();

    assert.ok(
        Object.hasOwn(dados, 'quantidade'),
        'A resposta deve conter a propriedade quantidade'
    );

    assert.equal(
        typeof dados.quantidade,
        'number',
        'A propriedade quantidade deve ser um número'
    );

    assert.ok(
        Object.hasOwn(dados, 'usuarios'),
        'A resposta deve conter a propriedade usuarios'
    );

    assert.ok(
        Array.isArray(dados.usuarios),
        'A propriedade usuarios deve ser um array'
    );

    assert.equal(
        dados.quantidade,
        dados.usuarios.length,
        'A quantidade informada deve corresponder ao número de usuários retornados'
    );

}

async function testarUsuarioInexistente() {
    const resposta = await fetch(
        'https://serverest.dev/usuarios/USUARIOQA0000001'
    );

    assert.equal(resposta.status, 400);

    const dados = await resposta.json();

    assert.equal(dados.message, 'Usuário não encontrado');

}

async function executarTestes() {
    await executarTeste('CT-AUTO-001', testarConsultaUsuarios);
    await executarTeste('CT-AUTO-002', testarUsuarioInexistente);

    exibirRelatorio();

    const reprovados = resultados.filter(
        (resultado) => resultado.status === 'FALHOU'
    ).length;

    if (reprovados > 0) {
        process.exitCode = 1;
    }
}

const resultados = [];

async function executarTeste(nome, funcaoTeste) {
    try {
        await funcaoTeste();

        resultados.push({
            nome: nome,
            status: 'PASSOU'
        });

        console.log(`${nome}: PASSOU`);

    } catch (erro) {
        resultados.push({
            nome: nome,
            status: 'FALHOU',
            erro: erro.message
        });

        console.error(`${nome}: FALHOU — ${erro.message}`);
    }
}

function exibirRelatorio() {
    console.log('\n====================================');
    console.log('RELATÓRIO FINAL DOS TESTES');
    console.log('====================================');

    resultados.forEach((resultado) => {
        console.log(`${resultado.nome}: ${resultado.status}`);
    });

    const total = resultados.length;
    const aprovados = resultados.filter(
        (resultado) => resultado.status === 'PASSOU'
    ).length;

    const reprovados = resultados.filter(
        (resultado) => resultado.status === 'FALHOU'
    ).length;

    console.log('------------------------------------');
    console.log(`Total de testes: ${total}`);
    console.log(`Aprovados: ${aprovados}`);
    console.log(`Reprovados: ${reprovados}`);
    console.log('====================================');
}

executarTestes().catch((erro) => {
    console.error('FALHA NA EXECUÇÃO DOS TESTES:', erro.message);
    process.exitCode = 1;
});