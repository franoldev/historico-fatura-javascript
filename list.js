const gastos = [
    { name: 'Uber', value: 1430.00, month: 12, },
    { name: 'PS Store', value: 40.0, month: 3, },
    { name: 'GPlay', value: 37.50, month: 3, },
    { name: 'Uber', value: 1382.0, month: 3, },
    { name: 'iFood', value: 77.0, month: 02, },
    { name: 'Uber', value: 3.00, month: 01, },
    { name: 'iFood', value: 20.34, month: 01, },
    { name: 'iFood', value: 37.40, month: 01, },
    { name: 'Uber', value: 17.70, month: 03, },
    { name: 'GPlay', value: 16.70, month: 03, },
    { name: 'AppStore', value: 15.0, month: 02, },
    { name: 'Uber', value: 96.11, month: 02, },
    { name: 'GPlay', value: 7.71, month: 02, },
    { name: 'AppStore', value: 3.33, month: 02, },
    { name: 'iFood', value: 47.98, month: 03, },
    { name: 'AppStore', value: 12.22, month: 03, },
    { name: 'Uber', value: 2.56, month: 04, },
    { name: 'Uber', value: 5.32, month: 03, },
    { name: 'PS Store', value: 5.44, month: 03, },
    { name: 'PS Store', value: 98.37, month: 03, },
    { name: 'PS Store', value: 78.90, month: 01, },
    { name: 'GPlay', value: 65.03, month: 03, },
    { name: 'iFood', value: 32.12, month: 03, },
    { name: 'iFood', value: 34.56, month: 01, },
    { name: 'iFood', value: 1480.0, month: 03, },
    { name: 'Uber', value: 5.34, month: 03, },
    { name: 'iFood', value: 6.12, month: 01, },
    { name: 'Uber', value: 344.12, month: 03, },
    { name: 'GPlay', value: 96.10, month: 03, },
    { name: 'Uber', value: 6.09, month: 01, },
    { name: 'PS Store', value: 3.21, month: 03, },
];

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

const converteMes = meses => {
    posicao = meses.month - 1
    mes = months[posicao]
    return mes;
}
var mesTotal = []

const group = item => {
    var gastoPorMes = gastos.reduce((items, item) => {
        items[item.month] = [...items[item.month] || [], item];
        return items;
    }, {});
    var totalMes = gastoPorMes[item];
    consolidado = totalMes.map(transacao => transacao.value)
        .reduce((auxiliar, transacao) => auxiliar + transacao, 0).toFixed(2)
    var mesConsolidado = { month: item, total: consolidado }
    mesTotal.push(mesConsolidado)
    return mesTotal;
    
}

var tabelaTotal = document.getElementById('tb_consolidado');


var tabelaLancamentos = document.getElementById('tb_fatura');
const addLancamento = transacao => {
    const data = converteMes(transacao);
    const tr = document.createElement('tr')
    const valor = Math.abs(transacao.value)


    tr.innerHTML = `
      <td scope='col'>${transacao.name}</td>
      <td scope='col'> R$ ${valor}</td>
      <td scope='col'>${converteMes(transacao)}</td>
        `

    tabelaLancamentos.append(tr)

}

const atualizaValores = () => {
    var meses = gastos.map(transacao => transacao.month)
    meses = meses.reduce((unico, item) => {
        return unico.includes(item) ? unico : [...unico, item]
    }, []);
    meses.forEach(group)
}

const tr = document.createElement('tr')
const addTotal = transacao => {
    const tr = document.createElement('tr') 
    tr.innerHTML = " "
    const valor = parseFloat(transacao.total)


    tr.innerHTML = `
          <td scope='col'>${converteMes(transacao)}</td>
          <td scope='col'> R$ ${valor}</td>
            `

    tabelaTotal.append(tr)
}

const inicializa = () => {
    tr.innerHTML = ' '
    gastos.forEach(addLancamento)
    atualizaValores()
    mesTotal.forEach(addTotal)
}

inicializa();
const form = document.getElementById('form')
const inputname = document.getElementById('name')
const inputvalue = document.getElementById('value')
const inputmonth = document.getElementById('month')

form.addEventListener('submit', event => {
    event.preventDefault()

    var name = inputname.value.trim()
    var value = inputvalue.value.trim()
    var month = inputmonth.value.trim()

    if (name === " "||value === " "|| month === " ") {
        alert("Por favor, preencha todos os campos! Dados obrigatórios.")
        return
    }

    const transacao =  { name: name, value:Number(value), month: Number(month) }
    gastos.push(transacao)
    inicializa()
    inputname.value = ' '
    inputvalue.value = null
    inputmonth.value = null

})
