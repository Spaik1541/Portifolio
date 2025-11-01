
document.addEventListener('DOMContentLoaded', () => {


const linksNavegacao = document.querySelectorAll('.container-caixas a[href^="#"]'); 

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


function applyCssVariables(colors) {
    const root = document.documentElement; 
    for (const [key, value] of Object.entries(colors)) {
      
        root.style.setProperty(`--${key}`, value);
    }
}


const chaveArmazenamento = 'portfolio-tema';
const modoEscuroNome = 'dark';


function definirTema(tema) {
    const elementoHtml = document.documentElement;
    const botaoTrocaTema = document.getElementById('troca-tema');

    if (tema === modoEscuroNome) {
        elementoHtml.setAttribute('data-theme', modoEscuroNome);
        localStorage.setItem(chaveArmazenamento, modoEscuroNome);
        if (botaoTrocaTema) {
            botaoTrocaTema.textContent = '☀️'; 
            botaoTrocaTema.setAttribute('aria-label', 'Alternar para o Tema Claro');
        }
    } else {
        elementoHtml.removeAttribute('data-theme');
        localStorage.setItem(chaveArmazenamento, 'claro'); 
        if (botaoTrocaTema) {
            botaoTrocaTema.textContent = '🌙'; 
            botaoTrocaTema.setAttribute('aria-label', 'Alternar para o Tema Escuro');
        }
    }
}

function alternarTema() {
    const elementoHtml = document.documentElement;
    const temaAtual = elementoHtml.getAttribute('data-theme');
    
    if (temaAtual === modoEscuroNome) {
        definirTema('claro');
    } else {
        definirTema(modoEscuroNome);
    }
}



    const botaoTrocaTema = document.getElementById('troca-tema');
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

   
    const formulario = document.getElementById('formulario-contato');
    const statusEnvio = document.getElementById('status-envio');

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

        const mensagem = document.getElementById('mensagem');
        if (mensagem.value.trim() === '') {
            exibirErro('erro-mensagem', 'O campo Mensagem é obrigatório.');
            valido = false;
        } else if (mensagem.value.trim().length < 10) {
            exibirErro('erro-mensagem', 'A mensagem deve ter pelo menos 10 caracteres.');
            valido = false;
        } else {
            exibirErro('erro-mensagem', '');
        }

        return valido;
    }

    
    function exibirErro(idElemento, mensagem) {
        const spanErro = document.getElementById(idElemento);
        spanErro.textContent = mensagem;
        
        const campo = spanErro.previousElementSibling;
        if (mensagem) {
            campo.style.borderColor = '#cc0000';
        } else {
           
            campo.style.borderColor = ''; 
        }
    }
 
    function validarEmailFormato(email) {

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }


   

});