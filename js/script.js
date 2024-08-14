document.addEventListener('DOMContentLoaded', () => {
    console.log('Página carregada e pronta!');
});

$(document).ready(function() {
    // Contadores de produtos e anexos
    let produtoIndex = 1;
    let anexoIndex = 1;

    // Adicionar novo produto
    $('#adicionar-produto').click(function() {
        produtoIndex++;
        let novoProduto = `
        <div class="produto" id="produto-${produtoIndex}">
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="produto-descricao-${produtoIndex}">Produto</label>
                    <input type="text" class="form-control" id="produto-descricao-${produtoIndex}" required>
                </div>
                <div class="form-group col-md-2">
                    <label for="produto-unidade-${produtoIndex}">UND. Medida</label>
                    <select class="form-control" id="produto-unidade-${produtoIndex}" required>
                        <option value="unidade">Unidade</option>
                        <option value="litro">Litro</option>
                        <option value="quilo">Quilo</option>
                        <!-- Adicione outras unidades conforme necessário -->
                    </select>
                </div>
                <div class="form-group col-md-2">
                    <label for="produto-quantidade-${produtoIndex}">QTD. em Estoque</label>
                    <input type="number" class="form-control quantidade" id="produto-quantidade-${produtoIndex}" required>
                </div>
                <div class="form-group col-md-2">
                    <label for="produto-valor-unitario-${produtoIndex}">Valor Unitário</label>
                    <input type="number" class="form-control valor-unitario" id="produto-valor-unitario-${produtoIndex}" required>
                </div>
                <div class="form-group col-md-2">
                    <label for="produto-valor-total-${produtoIndex}">Valor Total</label>
                    <input type="number" class="form-control valor-total" id="produto-valor-total-${produtoIndex}" readonly>
                </div>
            </div>
            <button type="button" class="btn btn-danger btn-sm remover-produto">Remover</button>
        </div>`;
        $('#produtos-container').append(novoProduto);
    });

    // Remover produto
    $(document).on('click', '.remover-produto', function() {
        $(this).closest('.produto').remove();
    });

    // Calcular valor total do produto
    $(document).on('input', '.valor-unitario, .quantidade', function() {
        let linha = $(this).closest('.produto');
        let quantidade = parseFloat(linha.find('.quantidade').val());
        let valorUnitario = parseFloat(linha.find('.valor-unitario').val());
        if (!isNaN(quantidade) && !isNaN(valorUnitario)) {
            linha.find('.valor-total').val(quantidade * valorUnitario);
        }
    });

    // Adicionar novo anexo
    $('#incluir-anexo').click(function() {
        anexoIndex++;
        let novoAnexo = `
        <div class="anexo" id="anexo-${anexoIndex}">
            <div class="form-row">
                <div class="form-group col-md-10">
                    <label for="anexo-${anexoIndex}">Documento anexo ${anexoIndex}</label>
                    <input type="file" class="form-control" id="anexo-${anexoIndex}" required>
                </div>
                <div class="form-group col-md-2">
                    <button type="button" class="btn btn-danger btn-sm remover-anexo">Excluir</button>
                    <button type="button" class="btn btn-info btn-sm visualizar-anexo">Visualizar</button>
                </div>
            </div>
        </div>`;
        $('#anexos-container').append(novoAnexo);
    });

    // Remover anexo
    $(document).on('click', '.remover-anexo', function() {
        $(this).closest('.anexo').remove();
    });

    // Enviar dados do formulário
    $('#salvar-fornecedor').click(function() {
        let fornecedor = {
            razaoSocial: $('#razao-social').val(),
            cnpj: $('#cnpj').val(),
            nomeFantasia: $('#nome-fantasia').val(),
            inscricaoEstadual: $('#inscricao-estadual').val(),
            cep: $('#cep').val(),
            endereco: $('#endereco').val(),
            numero: $('#numero').val(),
            complemento: $('#complemento').val(),
            bairro: $('#bairro').val(),
            municipio: $('#municipio').val(),
            estado: $('#estado').val(),
            nomeContato: $('#nome-contato').val(),
            telefone: $('#telefone').val(),
            email: $('#email').val(),
            produtos: [],
            anexos: []
        };

        $('.produto').each(function() {
            let produto = {
                descricao: $(this).find('input[id^="produto-descricao"]').val(),
                unidadeMedida: $(this).find('select[id^="produto-unidade"]').val(),
                quantidade: $(this).find('input[id^="produto-quantidade"]').val(),
                valorUnitario: $(this).find('input[id^="produto-valor-unitario"]').val(),
                valorTotal: $(this).find('input[id^="produto-valor-total"]').val(),
            };
            fornecedor.produtos.push(produto);
        });

        $('.anexo').each(function() {
            let anexo = $(this).find('input[type="file"]')[0].files[0];
            if (anexo) {
                fornecedor.anexos.push(anexo.name);
            }
        });

        console.log(fornecedor);

        // Aqui você pode fazer a integração com backend ou salvamento em banco de dados
    });
});
