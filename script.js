/* =========================================
   ACORDEÕES: ABRIR E FECHAR CONTEÚDOS
========================================= */

document.querySelectorAll(".titulo-acordeao").forEach(botao => {

    botao.addEventListener("click", () => {

        const conteudo = botao.nextElementSibling;
        const simbolo = botao.querySelector("span");

        const estaAberto = conteudo.classList.contains("aberto");

        conteudo.classList.toggle("aberto");

        botao.setAttribute("aria-expanded", String(!estaAberto));

        if (simbolo) {
            simbolo.textContent = estaAberto ? "+" : "−";
        }

    });

});


/* =========================================
   PERGUNTAS DO QUIZ
========================================= */

const perguntas = [
    {
        pergunta: "1. Qual é a principal função do sistema imunológico?",
        alternativas: [
            "Produzir energia para os músculos",
            "Proteger o organismo contra agentes prejudiciais",
            "Transportar oxigênio pelo corpo",
            "Realizar a digestão dos alimentos"
        ],
        correta: 1,
        explicacao: "O sistema imunológico protege o organismo contra agentes infecciosos e outras ameaças."
    },
    {
        pergunta: "2. Qual estrutura funciona como uma barreira física de defesa?",
        alternativas: [
            "O coração",
            "O pâncreas",
            "A pele",
            "Os rins"
        ],
        correta: 2,
        explicacao: "A pele dificulta a entrada de muitos microrganismos no organismo."
    },
    {
        pergunta: "3. Qual célula pode produzir anticorpos após se diferenciar em plasmócito?",
        alternativas: [
            "Linfócito B",
            "Glóbulo vermelho",
            "Plaqueta",
            "Neurônio"
        ],
        correta: 0,
        explicacao: "Os linfócitos B podem se diferenciar em plasmócitos, que produzem anticorpos."
    },
    {
        pergunta: "4. Qual é uma característica da imunidade inata?",
        alternativas: [
            "Depende sempre de vacinação anterior",
            "É a defesa inicial e atua rapidamente",
            "É realizada apenas por anticorpos",
            "Só aparece na adolescência"
        ],
        correta: 1,
        explicacao: "A imunidade inata oferece uma defesa inicial e inclui barreiras, células e mecanismos inflamatórios."
    },
    {
        pergunta: "5. O que caracteriza a imunidade adaptativa?",
        alternativas: [
            "Não envolve células de defesa",
            "Atua somente na pele",
            "Reconhece antígenos específicos",
            "Impede absolutamente todas as doenças"
        ],
        correta: 2,
        explicacao: "A imunidade adaptativa reconhece antígenos específicos e pode desenvolver memória imunológica."
    },
    {
        pergunta: "6. O que é imunidade ativa?",
        alternativas: [
            "Quando o organismo desenvolve sua própria resposta imunológica",
            "Quando a pessoa recebe anticorpos prontos",
            "Quando a pele impede a entrada de microrganismos",
            "Quando o organismo deixa de produzir anticorpos"
        ],
        correta: 0,
        explicacao: "A imunidade ativa ocorre quando o próprio organismo desenvolve uma resposta, por exemplo após uma infecção ou vacinação."
    },
    {
        pergunta: "7. Como as vacinas ajudam a proteger o organismo?",
        alternativas: [
            "Eliminam todos os microrganismos do ambiente",
            "Substituem todas as células de defesa",
            "Impedem qualquer infecção em todas as situações",
            "Estimulam uma resposta imunológica contra alvos específicos"
        ],
        correta: 3,
        explicacao: "As vacinas preparam o sistema imunológico para reconhecer determinados agentes e ajudam a prevenir doenças."
    },
    {
        pergunta: "8. O que é memória imunológica?",
        alternativas: [
            "A capacidade de lembrar acontecimentos da infância",
            "A capacidade de reconhecer novamente um antígeno",
            "A produção de energia pelas células",
            "O transporte de nutrientes pelo sangue"
        ],
        correta: 1,
        explicacao: "A memória imunológica permite uma resposta posterior mais rápida ou eficaz contra um antígeno já reconhecido."
    },
    {
        pergunta: "9. Qual é um exemplo de imunidade passiva natural?",
        alternativas: [
            "Receber anticorpos maternos pela placenta",
            "Produzir anticorpos após uma vacina",
            "Formar células de memória após uma infecção",
            "Desenvolver uma resposta após vacinação"
        ],
        correta: 0,
        explicacao: "A passagem de anticorpos maternos pela placenta é um exemplo de imunidade passiva natural."
    },
    {
        pergunta: "10. Todas as vacinas precisam de doses de reforço?",
        alternativas: [
            "Sim, todas precisam de reforço mensal",
            "Não, nenhuma vacina precisa de mais de uma dose",
            "Não. A necessidade depende da vacina e das recomendações de saúde",
            "Sim, todas precisam ser aplicadas diariamente"
        ],
        correta: 2,
        explicacao: "O esquema de doses varia conforme a vacina, a doença e as recomendações das autoridades de saúde."
    }
];


/* =========================================
   ELEMENTOS DO QUIZ
========================================= */

const elementoProgresso = document.getElementById("progresso");
const elementoPergunta = document.getElementById("pergunta");
const elementoAlternativas = document.getElementById("alternativas");
const elementoFeedback = document.getElementById("feedback");
const botaoProxima = document.getElementById("proxima");

let perguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;


/* INICIALIZAÇÃO */

if (
    elementoProgresso &&
    elementoPergunta &&
    elementoAlternativas &&
    elementoFeedback &&
    botaoProxima
) {

    botaoProxima.addEventListener("click", avancarQuiz);

    mostrarPergunta();

}


/* =========================================
   MOSTRAR PERGUNTA
========================================= */

function mostrarPergunta() {

    respondeu = false;

    const atual = perguntas[perguntaAtual];

    elementoProgresso.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    elementoPergunta.textContent = atual.pergunta;

    elementoAlternativas.innerHTML = "";

    elementoFeedback.textContent = "";

    botaoProxima.disabled = true;

    botaoProxima.textContent =
        perguntaAtual === perguntas.length - 1
            ? "Ver resultado"
            : "Próxima pergunta";

    atual.alternativas.forEach((alternativa, indice) => {

        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "alternativa";
        botao.textContent = alternativa;

        botao.addEventListener("click", () => {
            verificarResposta(indice, botao);
        });

        elementoAlternativas.appendChild(botao);

    });

}


/* =========================================
   VERIFICAR RESPOSTA
========================================= */

function verificarResposta(indiceEscolhido, botaoEscolhido) {

    if (respondeu) {
        return;
    }

    respondeu = true;

    const atual = perguntas[perguntaAtual];

    const botoes =
        elementoAlternativas.querySelectorAll(".alternativa");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (indiceEscolhido === atual.correta) {

        pontuacao++;

        botaoEscolhido.classList.add("correta");

        elementoFeedback.textContent =
            "Correto! " + atual.explicacao;

    } else {

        botaoEscolhido.classList.add("errada");

        botoes[atual.correta].classList.add("correta");

        elementoFeedback.textContent =
            "Resposta incorreta. " + atual.explicacao;

    }

    botaoProxima.disabled = false;

}


/* =========================================
   AVANÇAR NO QUIZ
========================================= */

function avancarQuiz() {

    if (!respondeu) {
        return;
    }

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        mostrarResultado();

    }

}


/* =========================================
   RESULTADO FINAL
========================================= */

function mostrarResultado() {

    elementoProgresso.textContent = "Quiz concluído!";

    elementoPergunta.textContent =
        `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;

    elementoAlternativas.innerHTML = "";

    let mensagem;

    if (pontuacao === perguntas.length) {

        mensagem = "Excelente! Você acertou todas as perguntas.";

    } else if (pontuacao >= 7) {

        mensagem = "Muito bem! Você demonstrou um bom conhecimento.";

    } else if (pontuacao >= 5) {

        mensagem = "Bom trabalho! Revise os conteúdos para aprender ainda mais.";

    } else {

        mensagem = "Continue estudando! Revise as páginas do site e tente novamente.";

    }

    elementoFeedback.textContent = mensagem;

    botaoProxima.textContent = "Refazer quiz";

    botaoProxima.disabled = false;

    botaoProxima.onclick = reiniciarQuiz;

}


/* =========================================
   REINICIAR QUIZ
========================================= */

function reiniciarQuiz() {

    perguntaAtual = 0;
    pontuacao = 0;
    respondeu = false;

    botaoProxima.onclick = null;

    mostrarPergunta();

}