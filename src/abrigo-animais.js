class AbrigoAnimais {
  
//[1] Validação, [2] Processamento e [3] Formatação
   
  //encontraPessoas - valida, processa e formata os dados
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const animais = {
      'rex':   { nome: 'Rex', especie: 'cão',  favoritos: ['RATO', 'BOLA'] },
      'mimi':  { nome: 'Mimi', especie: 'gato', favoritos: ['BOLA', 'LASER'] },
      'fofo':  { nome: 'Fofo', especie: 'gato', favoritos: ['BOLA', 'RATO', 'LASER'] },
      'zero':  { nome: 'Zero', especie: 'gato', favoritos: ['RATO', 'BOLA'] },
      'bola':  { nome: 'Bola', especie: 'cão',  favoritos: ['CAIXA', 'NOVELO'] },
      'bebe':  { nome: 'Bebe', especie: 'cão',  favoritos: ['LASER', 'RATO', 'BOLA'] },
      'loco':  { nome: 'Loco', especie: 'jabuti', favoritos: ['SKATE', 'RATO'], companhia: 'loco' }
    };

    const dadosValidados = this.validarEntradas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais, animais);
    if (dadosValidados.erro) return dadosValidados;

    const resultadoAdocoes = this.processarAdocoes(dadosValidados, animais);
    
    return this.formatarResultado(resultadoAdocoes);
  }

  //[1] VALIDAÇÃO
  validarEntradas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais, animais) {
    const brinquedosValidos = new Set(Object.values(animais).flatMap(a => a.favoritos));

    const arrayLista = str => str.split(',').map(s => s.trim()).filter(Boolean);
    const toUpperCase = arr => arr.map(x => x.toUpperCase());
    const toLowerCase = nome => nome.trim().toLowerCase();
    const duplicadoLista = arr => new Set(arr).size !== arr.length;

  //[1] UpperCase e LowerCase para no caso de escrita do nome correto porém
  //diferente na formatação ex: 'Rex' 'rex' ou até 'REx' 'reX'
    const brinquedosPessoa1Processados = toUpperCase(arrayLista(brinquedosPessoa1));
    const brinquedosPessoa2Processados = toUpperCase(arrayLista(brinquedosPessoa2));
    const ordemAnimaisProcessada = arrayLista(ordemAnimais).map(toLowerCase);
  
  //[1]Validação dos brinquedos  
    if (duplicadoLista(brinquedosPessoa1Processados) || duplicadoLista(brinquedosPessoa2Processados)) {
      return { erro: 'Brinquedo inválido' };
    }
    if ([...brinquedosPessoa1Processados, ...brinquedosPessoa2Processados].some(b => !brinquedosValidos.has(b))) {
      return { erro: 'Brinquedo inválido' };
    }
  
  //[1]Validação dos animais
    if (duplicadoLista(ordemAnimaisProcessada)) return { erro: 'Animal inválido' };
    for (const nome of ordemAnimaisProcessada) {
      if (!animais[nome]) return { erro: 'Animal inválido' };
    }

    return {
      brinquedosPessoa1Processados,
      brinquedosPessoa2Processados, 
      ordemAnimaisProcessada
    };
  }

  //[2] PROCESSAMENTO INICIAL
  processarAdocoes(dadosValidados, animais) {
    const { brinquedosPessoa1Processados, brinquedosPessoa2Processados, ordemAnimaisProcessada } = dadosValidados;
    
    const adotados = { 1: [], 2: [] };
    const destino = new Map();
    const pendenteLoco = { pessoa: null, nome: null };

    const temBrinquedosNaOrdem = (brinquedosDisponiveis, brinquedosNecessarios) => {
      let i = 0;
      for (const item of brinquedosDisponiveis) {
        if (item === brinquedosNecessarios[i]) i++;
        if (i === brinquedosNecessarios.length) return true;
      }
      return brinquedosNecessarios.length === 0;
    };

    const temTodosBrinquedos = (lista, necessarios) => {
      return necessarios.every(n => lista.includes(n));
    };

    const podeAdotar = (animal, listaBrinquedos) => {
      if (animal.companhia === 'loco') return temTodosBrinquedos(listaBrinquedos, animal.favoritos);
      return temBrinquedosNaOrdem(listaBrinquedos, animal.favoritos);
    };

    
    for (const nomeAnimal of ordemAnimaisProcessada) {
      const animal = animais[nomeAnimal];
      const resultado = this.determinarAdocao(animal, brinquedosPessoa1Processados, brinquedosPessoa2Processados, podeAdotar);
      
      this.executarAdocao(animal, resultado, adotados, destino, pendenteLoco);
    }
    return { destino };
  }

  //[2] PROCESAMENTO DE QUEM PODE ADOTAR
  determinarAdocao(animal, brinquedosPessoa1, brinquedosPessoa2, podeAdotar) {
    const pessoa1PodeAdotar = podeAdotar(animal, brinquedosPessoa1);
    const pessoa2PodeAdotar = podeAdotar(animal, brinquedosPessoa2);
  
    //ambos podem adotar
    if (pessoa1PodeAdotar && pessoa2PodeAdotar) {
      return { adotante: null, destino: 'abrigo' };
    }
  
  //Quem pode adotar
    let adotante = null;
    if (pessoa1PodeAdotar && !pessoa2PodeAdotar) adotante = 1;
    if (pessoa2PodeAdotar && !pessoa1PodeAdotar) adotante = 2;
    return { 
      adotante, 
      destino: adotante ? `pessoa ${adotante}` : 'abrigo' 
    };
  }

  //[2] PROCESAMENTO DA ADOÇÃO
  executarAdocao(animal, resultado, adotados, destino, pendenteLoco) {
    const { adotante } = resultado;

    if (!adotante) {
      destino.set(animal.nome, 'abrigo');
      return;
    }

    //Limite descrito no desafio
    const limiteMaximo = animal.companhia === 'loco' ? 1 : 3;
    if (adotados[adotante].length >= limiteMaximo) {
      destino.set(animal.nome, 'abrigo');
    
    //Caso do loco
      if (animal.companhia === 'loco' && adotados[adotante].length < 1) {
        pendenteLoco.pessoa = adotante;
        pendenteLoco.nome = animal.nome;
      }
      return;
    }

    //aprovado
    adotados[adotante].push(animal.nome);
    destino.set(animal.nome, `pessoa ${adotante}`);

    //verificação final loco
    if (pendenteLoco.pessoa === adotante && pendenteLoco.nome && adotados[adotante].length < 3) {
      adotados[adotante].push(pendenteLoco.nome);
      destino.set(pendenteLoco.nome, `pessoa ${adotante}`);
      pendenteLoco.pessoa = null;
      pendenteLoco.nome = null;
    }
  }

  //[3] FORMATAÇÃO
  formatarResultado(resultadoAdocoes) {
    const { destino } = resultadoAdocoes;
    
    const lista = Array.from(destino.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([nome, dest]) => `${nome} - ${dest}`);

    return { lista };
  }
}

export { AbrigoAnimais as AbrigoAnimais };