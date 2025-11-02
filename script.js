document.addEventListener('DOMContentLoaded', () => {

    /* 
       1. Constantes globais
        */

    const chaveArmazenamento = 'portfolio-tema';
    const modoEscuroNome = 'dark';
    
    const paletaCores = {
        'cor-fundo-principal': '#938D6C',
        'cor-fundo-secundario': '#B0A97C',
        'cor-borda-principal': '#847D52',
        'cor-borda-escura': '#5D593F',
        'cor-texto-principal': '#000000',
        'cor-texto-secundario': '#060606',
        'cor-hover': '#b8b27e',
        'cor-overlay': 'rgba(0, 0, 0, 0.7)'
    };
    
   
    const botaoTrocaTema = document.getElementById('troca-tema');
    const formulario = document.getElementById('formulario-contato');
    const statusEnvio = document.getElementById('status-envio');
    const btnHamburguer = document.getElementById('menu-hamburguer');
    const menuNavegacao = document.querySelector('.menu-navegacao-rapida');
    const linksMenu = document.querySelectorAll('.menu-navegacao-rapida a');
    const linksNavegacao = document.querySelectorAll('.container-caixas a[href^="#"]'); 


    /* 
       2. Funções Validação
      */


    function applyCssVariables(colors) {
        const root = document.documentElement; 
        for (const [key, value] of Object.entries(colors)) {
            root.style.setProperty(`--${key}`, value);
        }
    }
    

    function validarEmailFormato(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function exibirErro(idElemento, mensagem_erro) {
        const spanErro = document.getElementById(idElemento);
        spanErro.textContent = mensagem_erro;
        
        const campo = spanErro.previousElementSibling;
        if (mensagem_erro) {
            campo.style.borderColor = '#cc0000';
        } else {
            campo.style.borderColor = ''; 
        }
    }

    /* 
       3. Mudar Tema
      */

   
    function definirTema(tema) {
        const elementoHtml = document.documentElement;

        if (tema === modoEscuroNome) {
            elementoHtml.setAttribute('site-theme', modoEscuroNome);
            localStorage.setItem(chaveArmazenamento, modoEscuroNome);
            if (botaoTrocaTema) {
                botaoTrocaTema.textContent = '🌙'; 
                botaoTrocaTema.setAttribute('aria-label', 'Alternar para o Tema Claro');
            }
        } else {
            elementoHtml.removeAttribute('site-theme');
            localStorage.setItem(chaveArmazenamento, 'claro'); 
            if (botaoTrocaTema) {
                botaoTrocaTema.textContent = '☀️'; 
                botaoTrocaTema.setAttribute('aria-label', 'Alternar para o Tema Escuro');
            }
        }
    }

 
    function alternarTema() {
        const elementoHtml = document.documentElement;
        const temaAtual = elementoHtml.getAttribute('site-theme');
        
        if (temaAtual === modoEscuroNome) {
            definirTema('claro');
        } else {
            definirTema(modoEscuroNome);
        }
    }

    /* 
       4. Navegação e menu hamburguer
      */

    
    function toggleMenu() {
        if (btnHamburguer && menuNavegacao) {
            btnHamburguer.classList.toggle('aberto');
            menuNavegacao.classList.toggle('aberto');
        }
    }


    /* 
       5. Relogio e Boas vindas
      */


    function atualizarRelogio() {
        const agora = new Date();
        const hora = String(agora.getHours()).padStart(2, '0');
        const minuto = String(agora.getMinutes()).padStart(2, '0');
        const segundo = String(agora.getSeconds()).padStart(2, '0');
        
        const tempoFormatado = `${hora}:${minuto}:${segundo}`;
        
        const elementoRelogio = document.getElementById('relogio-digital');
        if (elementoRelogio) {
            elementoRelogio.textContent = tempoFormatado;
        }
    }

  
    function exibirMensagemBoasVindas() {
        const hora = new Date().getHours();
        let mensagem_topo;

        if (hora >= 6 && hora < 12) {
            mensagem_topo = "Bom dia, visitante!"; 
        } else if (hora >= 12 && hora < 18) {
            mensagem_topo = "Boa tarde, visitante!"; 
        } else {
            mensagem_topo = "Boa noite, visitante!";
        }

        const elementoTopo = document.getElementById('mensagem-topo');
        if (elementoTopo) {
            elementoTopo.textContent = mensagem_topo;
        }
    }

    /* 
       6. Formulario Contato
       */

    function validarFormulario() {
        let valido = true;
        
        const nome = document.getElementById('nome');
        if (nome.value.trim() === '') {
            exibirErro('erro-nome', 'O campo Nome é obrigatório.');
            valido = false;
        } else {
            exibirErro('erro-nome', '');
        }

        const email = document.getElementById('email');
        if (email.value.trim() === '') {
            exibirErro('erro-email', 'O campo E-mail é obrigatório.');
            valido = false;
        } else if (!validarEmailFormato(email.value)) {
            exibirErro('erro-email', 'Por favor, insira um e-mail válido.');
            valido = false;
        } else {
            exibirErro('erro-email', '');
        }

        const mensagem = document.getElementById('mensagem-contato'); // Assumindo 'mensagem-contato' se 'mensagem' é o ID da section
        if (mensagem && mensagem.value.trim() === '') {
            exibirErro('erro-mensagem', 'O campo Mensagem é obrigatório.');
            valido = false;
        } else if (mensagem && mensagem.value.trim().length < 10) {
            exibirErro('erro-mensagem', 'A mensagem deve ter pelo menos 10 caracteres.');
            valido = false;
        } else {
            exibirErro('erro-mensagem', '');
        }

        return valido;
    }

    /* 
       7. Inicialização de eventos
    */


    const temaSalvo = localStorage.getItem(chaveArmazenamento);

    if (temaSalvo) {
        definirTema(temaSalvo);
    } 
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        definirTema(modoEscuroNome);
    } 
    else {
        definirTema('claro');
    }

    if (botaoTrocaTema) {
        botaoTrocaTema.addEventListener('click', alternarTema);
    }

  
    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);
    exibirMensagemBoasVindas();

    linksNavegacao.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            const idSecao = this.getAttribute('href'); 
            
            if (idSecao === '#') return; 
            
            const secaoAlvo = document.querySelector(idSecao);

            if (secaoAlvo) {
                secaoAlvo.scrollIntoView({
                    behavior: 'smooth' 
                });
            } 
        });
    });


    if (btnHamburguer) {
        btnHamburguer.addEventListener('click', toggleMenu);
    }

    linksMenu.forEach(link => {
        link.addEventListener('click', () => {
            if (menuNavegacao && menuNavegacao.classList.contains('aberto')) {
                toggleMenu();
            }
        });
    });

  
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            statusEnvio.textContent = '';
            
            const ehValido = validarFormulario();
            
            if (ehValido) {
                formulario.reset(); 
                
                statusEnvio.textContent = '✅ Mensagem enviada com sucesso!';
                statusEnvio.style.color = '#38761d'; 
                
            } else {
                statusEnvio.textContent = '❌ Por favor, corrija os erros nos campos.';
                statusEnvio.style.color = '#cc0000'; 
            }
        });
    }

});