// ===== DOM ELEMENTS =====
const filterButtons = document.querySelectorAll('.filter-btn');
const newsCards = document.querySelectorAll('.news-card');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const newsletterForm = document.getElementById('newsletterForm');
const navLinks = document.querySelectorAll('.nav-link');

// ===== FUNCIONALIDADE DE FILTRO POR CATEGORIA =====
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove classe active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adiciona classe active ao botão clicado
        button.classList.add('active');
        
        // Obtém a categoria selecionada
        const selectedCategory = button.getAttribute('data-filter');
        
        // Filtra as notícias
        filterNews(selectedCategory);
    });
});

function filterNews(category) {
    newsCards.forEach(card => {
        if (category === 'todas') {
            card.classList.remove('hidden');
            // Anima o aparecimento
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = '';
            }, 10);
        } else {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory === category) {
                card.classList.remove('hidden');
                card.style.animation = '';
            } else {
                card.classList.add('hidden');
            }
        }
    });
}

// ===== FUNCIONALIDADE DE BUSCA =====
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        // Se a busca estiver vazia, mostra todas as notícias
        newsCards.forEach(card => {
            card.classList.remove('hidden');
        });
        showMessage('Digite algo para buscar!', 'info');
        return;
    }
    
    let foundCount = 0;
    
    newsCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const excerpt = card.querySelector('.news-excerpt').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
            card.classList.remove('hidden');
            foundCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    if (foundCount === 0) {
        showMessage(`Nenhuma notícia encontrada para "${searchTerm}"`, 'error');
    } else {
        showMessage(`${foundCount} notícia(s) encontrada(s)!`, 'success');
    }
}

// ===== FUNCIONALIDADE DE NEWSLETTER =====
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    // Validação simples
    if (email.includes('@') && email.includes('.')) {
        showMessage(`✓ Email ${email} inscrito com sucesso!`, 'success');
        emailInput.value = '';
        
        // Aqui você poderia enviar o email para um servidor
        console.log('Email subscrito:', email);
    } else {
        showMessage('Por favor, insira um email válido!', 'error');
    }
});

// ===== FUNCIONALIDADE DE NAVEGAÇÃO =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active de todos os links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Adiciona active ao link clicado
        link.classList.add('active');
        
        // Aqui você poderia adicionar navegação entre páginas
        const page = link.textContent.toLowerCase();
        console.log('Navegando para:', page);
    });
});

// ===== FUNÇÃO DE MENSAGENS =====
function showMessage(message, type = 'info') {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Cria nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message show';
    
    if (type === 'error') {
        messageDiv.style.background = '#e53935';
    } else if (type === 'info') {
        messageDiv.style.background = '#1e88e5';
    }
    
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    // Remove mensagem após 4 segundos
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 4000);
}

// ===== ANIMAÇÃO DE SCROLL =====
window.addEventListener('scroll', () => {
    // Adiciona sombra ao header quando scrollar
    const header = document.querySelector('.header');
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// ===== ANIMAÇÃO DE CARDS AO CARREGAR =====
window.addEventListener('load', () => {
    newsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ===== ADICIONAR ANIMAÇÃO DE SLIDEOUT AO CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== FUNCIONALIDADE DE MODO ESCURO (OPCIONAL) =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Carrega preferência de modo escuro
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ===== CONSOLE LOG PARA DEBUG =====
console.log('🚀 Site de Notícias Carregado Com Sucesso!');
console.log('Funcionalidades disponíveis:');
console.log('✓ Filtro por categoria');
console.log('✓ Busca de notícias');
console.log('✓ Inscrição em newsletter');
console.log('✓ Navegação interativa');
