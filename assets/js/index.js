document.addEventListener("DOMContentLoaded", function () {
    // Simula o carregamento da página
    setTimeout(function () {
        var loaderWrapper = document.querySelector('.loader-wrapper');
        loaderWrapper.classList.add('slide-out');

        // Opcional: Adicione um listener para remover o elemento após a animação
        loaderWrapper.addEventListener('animationend', function () {
            loaderWrapper.style.display = 'none';
        });
    }, 2000); // Tempo de simulação (em milissegundos)
});

document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.querySelector(".timeline")
    const events = document.querySelectorAll(".hidden")
    const observeTimeline = new IntersectionObserver(entries => {
        if (entries[0].intersectionRect.top > 0) {
            events.forEach(event => {
                event.classList.remove('animation')
            })
        }
    })

    observeTimeline.observe(timeline)

    function isInViewport(element) {
        const rect = element.getBoundingClientRect()
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    function animateTimeline() {

        events.forEach((event) => {
            if (isInViewport(event)) {

                event.classList.add("show")
                event.classList.add("animation")
            } else {
                event.classList.remove('show')
            }
        });
    }


    animateTimeline();

    document.addEventListener("scroll", animateTimeline);
})

function displayRandomImage() {


    var estado = Math.floor(Math.random() * 26) + 1;


    const banner = document.querySelector('.banner');

    banner.style.backgroundImage = `url(../assets/img/estados/${estado}.jpg)`;
}

displayRandomImage();

function trocarImgPizza() {
    const containerPizza = document.querySelector('.pizza-rotate');
    let i = 0;

    function trocarImagem() {
        let newImg = document.createElement('img');
        newImg.src = `./assets/img/pizza-${i}.png`;
        newImg.alt = `Pizza-${i}`;
        containerPizza.innerHTML = '';
        containerPizza.appendChild(newImg);
        i = (i + 1) % 6;
    }

    setInterval(trocarImagem, 1000);
}

trocarImgPizza();


const carrossel = document.querySelector('.carrossel');
const firstCardWidth = carrossel.querySelector(".card").offsetWidth;
const carrosselChildrens = [...carrossel.children];
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');



let cardPerView = Math.round(carrossel.offsetWidth / firstCardWidth);

carrosselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carrossel.insertAdjacentHTML("afterbegin", card.outerHTML);
});


carrosselChildrens.slice(0, cardPerView).forEach(card => {
    carrossel.insertAdjacentHTML("beforeend", card.outerHTML);
});


prev.addEventListener('click', () => {
    disableButtons()
    carrossel.scrollLeft += -firstCardWidth;
    setTimeout(() => {
        enableButtons()
    }, 700);
})

next.addEventListener('click', () => {
    disableButtons()
    carrossel.scrollLeft += firstCardWidth;
    setTimeout(() => {
        enableButtons()
    }, 700);
})

const infiniteScroll = () => {

    if (carrossel.scrollLeft === 0) {
        carrossel.classList.add("no-transition");
        carrossel.scrollLeft = carrossel.scrollWidth - (2 * carrossel.offsetWidth);
        carrossel.classList.remove("no-transition");
    }

    else if (Math.ceil(carrossel.scrollLeft) === carrossel.scrollWidth - carrossel.offsetWidth) {
        carrossel.classList.add("no-transition");
        carrossel.scrollLeft = carrossel.offsetWidth;
        carrossel.classList.remove("no-transition");
    }

}


//Botão de adicionar no carrinho

const cardButton = document.querySelectorAll('.card-button');
const modalPedido = document.getElementById('pizza-pedido');
const btnConfirmar = document.getElementById("btn-confirmar");


cardButton.forEach(function (button) {

    button.addEventListener('click', function () {
        cardButton.forEach(btn => btn.classList.remove('selected'));

        button.classList.add('selected');

        modalPedido.style.display = 'block';
        window.addEventListener('click', function (event) {
            if (event.target === modalPedido) {
                modalPedido.style.display = 'none';
            }
        });
    });
});


btnConfirmar.addEventListener('click', function () {

    var radioButtons = document.querySelectorAll('input[name="radioGroup"]');
    var tamanhoSelecionado = null;

    radioButtons.forEach(function (radioButton) {
        if (radioButton.checked) {
            tamanhoSelecionado = radioButton.value;
        }
    });


    if (tamanhoSelecionado !== null) {
        const selectedButton = document.querySelector('.card-button.selected');
        if (selectedButton) {
            const popup = criarPopup();

            mostrarPopup(popup);
            tamanhoPizza(selectedButton, tamanhoSelecionado);
            modalPedido.style.display = 'none';
        }

    } else {
        console.log('Nenhum tamanho de pizza selecionado. Contate o desenvolvedor');
    }
});


function tamanhoPizza(button, tamanho) {
    const titleElement = button.closest('.card').querySelector('.card__title');
    const title = titleElement.textContent;
    const imageElement = button.closest('.card').querySelector('.cardImage');
    const image = imageElement.src;
    addListCarrinho(title, tamanho, image);
}

//Desabilita a os botões 

function disableButtons() {
    prev.disabled = true;
    next.disabled = true;
}

function enableButtons() {
    prev.disabled = false;
    next.disabled = false;
}

let popupCount = 0;



function criarPopup() {
    const popupContainer = document.getElementById('popups-container');

    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = 'Pedido adicionado com sucesso!';
    popup.id = `popup-${popupCount}`;
    popupCount++;

    popupContainer.appendChild(popup);

    return popup;
}

function mostrarPopup(popup) {
    void popup.offsetWidth;
    popup.classList.add('show');
    setTimeout(function () {
        popup.classList.remove('show');
    }, 3000);
}

carrossel.addEventListener("scroll", infiniteScroll);


// TOGGLE MENU MOBILE

const fixedMenu = document.querySelector('#fixed-menu')
const mobileToggle = document.querySelector('#togglerLable')

mobileToggle.addEventListener('click', () => {
    if (fixedMenu.classList.contains('fixed-menu-mobile-active')) {
        fixedMenu.classList.add('fixed-menu-mobile-unactive');
        fixedMenu.classList.remove('fixed-menu-mobile-active');
    } else {
        fixedMenu.classList.remove('fixed-menu-mobile-unactive');
        fixedMenu.classList.add('fixed-menu-mobile-active');
    }
})

fixedMenu.addEventListener('click', () => {
    fixedMenu.classList.remove('fixed-menu-mobile-active');
})

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.about-options button');
    const descriptions = document.querySelectorAll('.card-about-pizza div');

    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            // Remove a classe 'active' de todas as descrições
            descriptions.forEach((desc) => {
                desc.classList.remove('active');
            });

            // Adiciona a classe 'active' à descrição correspondente ao botão clicado
            const target = button.getAttribute('data-target');
            document.getElementById(`descricao-${target}`).classList.add('active');
        });
    });
});