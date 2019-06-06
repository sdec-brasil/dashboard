const serializers = Object.create(null);

serializers.invoice = (inv) => {
  const invoice = JSON.parse(JSON.stringify(inv));
  const invoiceStructure = {
    prestacao: [
      'prefeituraIncidencia',
      'competencia',
      'baseCalculo',
      'aliqServicos',
      'codServico',
      'valIss',
      'valLiquiNfse',
      'valServicos',
      'valDeducoes',
      'issRetido',
      'itemLista',
      'discriminacao',
      'codTributMunicipio',
      'exigibilidadeISS',
      'simplesNacional',
      'incentivoFiscal',
      'respRetencao',
      'valPis',
      'valCofins',
      'valInss',
      'valIr',
      'valCsll',
      'outrasRetencoes',
      'valTotalTributos',
      'descontoIncond',
      'descontoCond',
      'codCnae',
      'codNBS',
      'numProcesso',
      'regimeEspTribut',
      'optanteSimplesNacional',
    ],
    tomador: [
      'identificacaoTomador',
      'nif',
      'nomeRazaoTomador',
      'logEnd',
      'numEnd',
      'compEnd',
      'bairroEnd',
      'cidadeEnd',
      'estadoEnd',
      'paisEnd',
      'cepEnd',
      'email',
      'tel',
    ],
    intermediario: [
      'identificacaoIntermed',
      'nomeRazaoIntermed',
      'cidadeIntermed',
    ],
    constCivil: [
      'codObra',
      'art',
    ],
  };
  Object.keys(invoiceStructure).forEach((category) => {
    invoiceStructure[category].forEach((field) => {
      if (invoice[field]) {
        if (!invoice[category]) {
          invoice[category] = {};
        }
        invoice[category][field] = invoice[field];
        delete invoice[field];
      }
    });
  });
  return invoice;
};

export default serializers;
