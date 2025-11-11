document.addEventListener('DOMContentLoaded', () => {
    // Funcao para normalizar e remover acentos
    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const API_KEY_SIMULADA = "AIzaSy...Sua-Chave-Ficticia-Aqui"; 
    
    const ChatService = {
        models: {
            generateContent: async (config) => {
                const lastContent = config.contents[config.contents.length - 1];
                const message = lastContent.parts[0].text;
                
                const botResponse = getDemoResponse(message);

                return {
                    text: botResponse,
                };
            }
        }
    };
    
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const chatWindow = document.getElementById('chatWindow');
    
    const responses = [
        { 
            keywords: ["ola", "oi", "bom dia", "boa tarde", "boa noite", "e ai", "tudo bem"], 
            answer: "Olá! Sou o CineBot. Estou pronto para te dar a melhor sugestão de filme ou série. Qual gênero, ator, ou clima você está buscando hoje? 🍿"
        },
        { 
            keywords: ["terror", "assustador", "medo", "horro", "sobrenatural"], 
            answer: "Se você busca terror de qualidade, sugiro o clássico **O Exorcista** (1973) para algo visceral, ou **Hereditário** (2018) para um terror psicológico e atmosférico. Boa sorte com os pesadelos! 👻"
        },
        { 
            keywords: ["comedia", "engracado", "rir", "palhacada", "humor"], 
            answer: "Para dar boas risadas, vá de **Superbad: É Hoje** (2007), uma comédia adolescente que se tornou um clássico, ou a série **The Office** para maratonar humor no estilo 'falso documentário'. Divirta-se! 😂"
        },
        { 
            keywords: ["acao", "luta", "explosao", "adrenalina", "tiro", "briga"], 
            answer: "Adrenalina garantida! Recomendo **Mad Max: Estrada da Fúria** (2015), uma obra-prima de ação ininterrupta, ou o recente **John Wick 4** se você gosta de coreografias de luta impecáveis. 💥"
        },
        { 
            keywords: ["ficcao", "cientifica", "futuro", "espaco", "alien"], 
            answer: "Viaje para o futuro! Assista **Duna** (2021) se busca um épico visual deslumbrante, ou **Blade Runner 2049** se prefere uma ficção científica mais contemplativa e estilosa. 🚀"
        },
        { 
            keywords: ["drama", "chorar", "triste", "emocionante", "profundo"], 
            answer: "Para um bom drama, você não pode errar com **Um Sonho de Liberdade** (1994) ou o sul-coreano **Parasita** (2019), que mistura drama e crítica social de forma brilhante. Prepare os lenços! 😭"
        },
        { 
            keywords: ["romance", "apaixonado", "amor", "casal"], 
            answer: "Que lindo! Sugiro **Diário de Uma Paixão** (2004) se você gosta de romances épicos, ou a comédia romântica mais moderna **Loucamente Apaixonados** (2017). ❤️"
        },
        { 
            keywords: ["documentario", "historia", "real", "natureza"], 
            answer: "Um bom documentário é sempre educativo. Recomendo **O Dilema das Redes** (2020) para reflexão social, ou a série **Planeta Terra** da BBC, se quiser se maravilhar com a natureza. 🌎"
        },
        { 
            keywords: ["thriller", "suspense", "misterio", "investigacao"], 
            answer: "Nada como um bom mistério! Assista **Zodíaco** (2007) para um suspense policial tenso, ou **Seven: Os Sete Crimes Capitais** (1995) se busca algo mais sombrio. 🕵️"
        },
        { 
            keywords: ["fantasia", "magia", "elfo", "dragao", "medieval"], 
            answer: "Mundo de fantasia! Sugiro a trilogia **O Senhor dos Anéis**, um clássico incontestável, ou a série **A Casa do Dragão** (prelúdio de GoT) se busca algo novo e épico. ✨"
        },
        { 
            keywords: ["serie", "maratonar", "episodios", "temporada"], 
            answer: "Para maratonar, não tem erro: **Breaking Bad** (drama intenso e aclamado) ou **Stranger Things** (mistério e nostalgia dos anos 80). Qual é o seu humor hoje?"
        },
        { 
            keywords: ["filme", "curto", "rapido", "longa"], 
            answer: "Um bom filme para hoje? O premiado **Nomadland** (2020) para um drama reflexivo ou **Pulp Fiction** (1994) para um clássico divertido e cheio de diálogos. 🎬"
        },
        { 
            keywords: ["dicaprio", "leonardo", "ator"], 
            answer: "Ah, o mestre Leonardo DiCaprio! Recomendo **A Origem** (2010) para uma ficção científica complexa ou **O Lobo de Wall Street** (2013) para uma performance intensa e cômica. 🐺"
        },
        { 
            keywords: ["nolan", "cristopher", "diretor"], 
            answer: "Christopher Nolan é sinônimo de excelência! Se você já viu **A Origem**, tente **Interestelar** (2014) ou o recente **Oppenheimer** (2023) para um drama histórico épico. 🧠"
        },
        { 
            keywords: ["novo", "lancamento", "recente"], 
            answer: "Quer algo novo? Verifique os últimos lançamentos do ano! **Oppenheimer** e a série **The Last of Us** foram destaques recentes e aclamados pela crítica. 🆕"
        },
        { 
            keywords: ["infantil", "crianca", "animacao", "familia"], 
            answer: "Para toda a família, recomendo as animações da Pixar: **Divertidamente** (2015) para uma jornada emocionante, ou **Soul** (2020) para uma reflexão profunda. 👨‍👩‍👧‍👦"
        }
    ];

    const defaultResponse = "Hmm, essa é uma pergunta difícil! Tente perguntar sobre um gênero (ex: Ação, Comédia) ou se você quer um Filme ou Série para eu te ajudar melhor. 😉";

    let history = [];


    function getDemoResponse(message) {
        // Aplica normalizacao de texto para remover acentos e garantir minusculas
        const normalizedMessage = normalizeText(message);
        let finalAnswer = defaultResponse;

        for (const response of responses) {
            for (const keyword of response.keywords) {
                if (normalizedMessage.includes(keyword)) { 
                    return response.answer; 
                }
            }
        }
        return finalAnswer;
    }

    function addMessage(role, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
        
        const p = document.createElement('p');
        p.innerHTML = text; 
        
        messageDiv.appendChild(p);
        chatWindow.appendChild(messageDiv);
        
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageDiv;
    }

    async function sendMessageSimulated(message) {
        history.push({ role: "user", parts: [{ text: message }] });

        const loadingMessage = addMessage('bot', 'CineBot está acessando a base de dados...');
        
        try {
            const response = await ChatService.models.generateContent({
                model: "gemini-2.5-flash",
                contents: history,
                config: {
                    systemInstruction: "Você é o CineBot, um assistente especializado em sugestões de filmes e séries.",
                }
            });

            const botResponseText = response.text;
            
            await new Promise(resolve => setTimeout(resolve, 800)); 

            chatWindow.removeChild(loadingMessage);

            addMessage('bot', botResponseText); 
            
            history.push({ role: "model", parts: [{ text: botResponseText }] });

        } catch (error) {
            console.error('Erro na simulação de API:', error);
            chatWindow.removeChild(loadingMessage);
            addMessage('bot', 'Erro na comunicação simulada. O serviço está temporariamente indisponível.');
        }
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const message = userInput.value.trim();
        
        if (message) {
            addMessage('user', message);
            sendMessageSimulated(message);
            userInput.value = '';
        }
    });
});