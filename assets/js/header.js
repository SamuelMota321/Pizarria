let prevScrollPos = window.pageYOffset;
const header = document.querySelector('header');


window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    let contentSelected = document.getElementById('header-carrinho-menu');
    if (!contentSelected.classList.contains('active')) {

        if (prevScrollPos < currentScrollPos) {
            header.style.top = `-${header.offsetHeight}px`;
        } else if (prevScrollPos > currentScrollPos) {
            header.style.top = '0';
        }
    }
    prevScrollPos = currentScrollPos;
};

function toggleMenu() {


    let menuExpansivo = document.getElementById('header-carrinho-menu');


    if (menuExpansivo.classList.contains('active')) {

        menuExpansivo.classList.remove('active');
        menuExpansivo.classList.toggle('unactive');


    } else {
        menuExpansivo.classList.toggle('active');
        menuExpansivo.classList.remove('unactive');

    }

}

function reloadPage() {
    location.reload();
}

//Tudo a ver com o carrinho de compras

var pedidos = [];

function vazioTela() {
    const menuCarrinho = document.getElementById('header-carrinho-menu');
    const mensagemVazio = document.getElementById('mensagem-vazio');
    const botaoPedido = document.getElementById('finalize-order');
    const tituloPedido = document.getElementById('titulo-carrinho');

    if (pedidos.length === 0) {
        if (!mensagemVazio) {
            const novaMensagemVazio = document.createElement('div');
            novaMensagemVazio.setAttribute('id', 'mensagem-vazio');
            botaoPedido.style.visibility = 'hidden';
            tituloPedido.style.visibility = 'hidden';

            const vazioIcone = document.createElement('img');
            vazioIcone.src = "../assets/img/iconevazio.png";

            const avisoVazio = document.createElement('h1');
            const avisoVazio2 = document.createElement('h2');

            avisoVazio.setAttribute('id', 'aviso-vazio');
            avisoVazio2.setAttribute('id', 'aviso-vazio-2');
            vazioIcone.setAttribute('id', 'icone-vazio');

            avisoVazio.innerHTML = "Seu carrinho está vazio!";
            avisoVazio2.textContent = "Adicione os itens pelo nosso carrossel";

            novaMensagemVazio.appendChild(vazioIcone);
            novaMensagemVazio.appendChild(avisoVazio);
            novaMensagemVazio.appendChild(avisoVazio2);


            menuCarrinho.appendChild(novaMensagemVazio);
        }
    } else {
        if (mensagemVazio && mensagemVazio.parentNode) {
            menuCarrinho.removeChild(mensagemVazio);
            botaoPedido.style.visibility = 'visible';
            tituloPedido.style.visibility = "visible ";
        }
    }

    console.log()
}

vazioTela();

function addListCarrinho(titulo, tamanho, imagem) {
    const index = pedidos.findIndex(pedido => pedido.titulo === titulo && pedido.tamanho === tamanho);

    if (index !== -1) {
        pedidos[index].quantidade += 1;

    } else {
        pedidos.push({
            titulo,
            tamanho,
            imagem,
            quantidade: 1,
            preco: (tamanho === "Pequena" ? 30 : 60)
        });
    }
    vazioTela();
    updateCarrinho();
}

function updateCarrinho() {
    const carrinhoPedido = document.getElementById('carrinho-pedido'); //Obtem <ul>
    carrinhoPedido.innerHTML = ''; //Zera o que tiver na <ul>

    const totalPedido = document.getElementById('titulo-carrinho');

    let totalvalor = 0;

    


    pedidos.forEach(pedido => { //Essa função complementa a lista para cada item dentro dela

    

        const pedidoArea = document.createElement("li");
        pedidoArea.classList.add('carrinho-pedido-item');

        const imagemPedido = document.createElement("img");
        imagemPedido.src = `${pedido.imagem}`;
        imagemPedido.classList.add('carrinho-pedido-imagem');

        const areaContent = document.createElement("div");
        areaContent.classList.add('carrinho-pedido-conteudo');

        const saborPedido = document.createElement("h2");
        saborPedido.textContent = pedido.titulo;
        saborPedido.classList.add('carrinho-pedido-sabor');

        const tamanhoPedido = document.createElement("h2")
        tamanhoPedido.textContent = `${pedido.tamanho}`;
        tamanhoPedido.classList.add('carrinho-pedido-tamanho');

        let quantidadeMenos = document.createElement("button");
        quantidadeMenos.textContent = "-";
       
        let quantidadeMais = document.createElement("button");
        quantidadeMais.textContent = "+";

        let quantidadeValor = document.createElement("h2");

        quantidadeValor.textContent = `${pedido.quantidade}`;
        quantidadeValor.classList.add('input-quantidade')

        let quantidadeDiv = document.createElement("div");

        quantidadeDiv.appendChild(quantidadeMenos);
        quantidadeDiv.appendChild(quantidadeValor);
        quantidadeDiv.appendChild(quantidadeMais);

        
        quantidadeMenos.classList.add('input-menos');
        quantidadeMais.classList.add('input-mais');
        quantidadeDiv.classList.add('carrinho-pedido-input');

        quantidadeMenos.addEventListener('click', ()=>{
            pedido.quantidade -= 1;
            if(pedido.quantidade <= 0){
                const index = pedidos.indexOf(pedido);
                if (index !== -1) {
                    pedidos.splice(index, 1);
                }
                updateCarrinho();
            }else{
            quantidadeValor.textContent = `${pedido.quantidade}`;
            updateCarrinho();
            }
        })

        quantidadeMais.addEventListener('click', ()=>{
            pedido.quantidade++;
            quantidadeValor.textContent = `${pedido.quantidade}`;


            updateCarrinho();
        })


        const precoPedido = document.createElement("h2");

        const precoTotal = pedido.preco * pedido.quantidade;
     
        precoPedido.textContent = `Preço Total: R$${precoTotal}`;

        precoPedido.classList.add('carrinho-pedido-preco');

        totalvalor += precoTotal;

        pedidoArea.appendChild(imagemPedido);
        areaContent.appendChild(saborPedido);
        areaContent.appendChild(tamanhoPedido);
        areaContent.appendChild(quantidadeDiv);
        areaContent.appendChild(precoPedido);


        pedidoArea.appendChild(areaContent);
        carrinhoPedido.appendChild(pedidoArea);

    }
    )

    vazioTela();
    totalPedido.textContent = `Total: ________________R$${totalvalor}`; 
}



