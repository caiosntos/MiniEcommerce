document.addEventListener('DOMContentLoaded', function() {
    const filtroTipo = document.getElementById('filtroTipo');
    const ordenarPreco = document.getElementById('ordenarPreco');
    const precoRange = document.getElementById('precoRange');
    const precoSelecionado = document.getElementById('precoSelecionado');
    const produtos = document.querySelectorAll('.produto');

    
    function aplicarFiltros() {
        const tipoSelecionado = filtroTipo.value;
        const precoMaximo = parseInt(precoRange.value);
        
    precoSelecionado.textContent = `R$ 0 - R$ ${precoMaximo}`;

    
        produtos.forEach(produto => {
            const tipoProduto = produto.getAttribute('data-tipo');
            const precoProduto = parseInt(produto.getAttribute('data-preco'));
            
    const exibirPorTipo = tipoSelecionado === 'todos' || tipoProduto === tipoSelecionado;
            const exibirPorPreco = precoProduto <= precoMaximo;
            
            if (exibirPorTipo && exibirPorPreco) {
                produto.classList.remove('oculto');
            } else {
                produto.classList.add('oculto');
            }
        });
        

        ordenarProdutos();
    }


    function ordenarProdutos() {
        const produtosContainer = document.getElementById('produtos');
        const produtosArray = Array.from(produtos).filter(produto => !produto.classList.contains('oculto'));
        
        if (ordenarPreco.value === 'menorPreco') {
            produtosArray.sort((a, b) => {
                return parseInt(a.getAttribute('data-preco')) - parseInt(b.getAttribute('data-preco'));
            });
        } else if (ordenarPreco.value === 'maiorPreco') {
            produtosArray.sort((a, b) => {
                return parseInt(b.getAttribute('data-preco')) - parseInt(a.getAttribute('data-preco'));
            });
        }
        
        
        produtosContainer.innerHTML = '';
        
        
        produtosArray.forEach(produto => {
            produtosContainer.appendChild(produto);
        });
    }

    
    filtroTipo.addEventListener('change', aplicarFiltros);
    ordenarPreco.addEventListener('change', aplicarFiltros);
    precoRange.addEventListener('input', function() {
        precoSelecionado.textContent = `R$ 0 - R$ ${this.value}`;
    });
    precoRange.addEventListener('change', aplicarFiltros);

   
    aplicarFiltros();
});