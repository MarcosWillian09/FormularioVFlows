document.addEventListener('DOMContentLoaded', () => {

    const produtoContainer = document.getElementById('produtos');
    const anexoContainer = document.getElementById('anexos');

    // Adicionar produto
    document.getElementById('adicionar-produto').addEventListener('click', () => {
        const produtoCount = produtoContainer.children.length + 1;

        const produtoDiv = document.createElement('div');
        produtoDiv.className = 'produto';
        produtoDiv.innerHTML = `
        
            <div><button class="delete"><i class="bi bi-trash3"></i></button></div>
            <div class="form-group">
                <label for="produto${produtoCount}">Produto ${produtoCount}</label>
                <input type="text" id="produto${produtoCount}" required>
            </div>
            <div class="form-group">
                <label for="undMedida${produtoCount}">UND. Medida</label>
                <select id="undMedida${produtoCount}" required>
                    <option value="unidade">Unidade</option>
                    <option value="kg">Kg</option>
                    <option value="litro">Litro</option>
                </select>
            </div>
            <div class="form-group">
                <label for="qtdEstoque${produtoCount}">QTD. em Estoque</label>
                <input type="number" id="qtdEstoque${produtoCount}" required>
            </div>
            <div class="form-group">
                <label for="valorUnitario${produtoCount}">Valor Unitário</label>
                <input type="number" id="valorUnitario${produtoCount}" step="0.01" required>
            </div>
            <div class="form-group">
                <label for="valorTotal${produtoCount}">Valor Total</label>
                <input type="number" id="valorTotal${produtoCount}" step="0.01" readonly>
            </div>
        `;

        produtoContainer.appendChild(produtoDiv);

        // Atualizar valor total ao mudar quantidade ou valor unitário
        const qtdEstoque = produtoDiv.querySelector(`#qtdEstoque${produtoCount}`);
        const valorUnitario = produtoDiv.querySelector(`#valorUnitario${produtoCount}`);
        const valorTotal = produtoDiv.querySelector(`#valorTotal${produtoCount}`);

        qtdEstoque.addEventListener('input', updateTotal);
        valorUnitario.addEventListener('input', updateTotal);

        function updateTotal() {
            const total = parseFloat(qtdEstoque.value) * parseFloat(valorUnitario.value);
            valorTotal.value = total.toFixed(2);
        }

        // Remover produto
        produtoDiv.querySelector('.delete').addEventListener('click', () => {
            produtoDiv.remove();
        });
    });

    // Adicionar anexo
    document.getElementById('incluir-anexo').addEventListener('click', () => {
        const anexoCount = anexoContainer.children.length + 1;

        const anexoDiv = document.createElement('div');
        anexoDiv.className = 'anexo';
        anexoDiv.innerHTML = `
            <button class="delete"><i class="bi bi-trash3"></i></button>
            <button class="view"><i class="bi bi-eye"></i></button>
            <span>Documento anexo ${anexoCount}</span>
        `;

        anexoContainer.appendChild(anexoDiv);

        // Remover anexo
        anexoDiv.querySelector('.delete').addEventListener('click', () => {
            anexoDiv.remove();
        });

        // Visualizar anexo (apenas como exemplo, função não implementada)
        anexoDiv.querySelector('.view').addEventListener('click', () => {
            alert('Visualizar Documento anexo ' + anexoCount);
        });
    });

    // Salvar fornecedor (apenas exibição)
    document.getElementById('salvar-fornecedor').addEventListener('click', () => {
        alert('Fornecedor salvo com sucesso!');
    });
});