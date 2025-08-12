const logo = document.getElementById('logoImg');
const darkModeToggle = document.getElementById('darkModeToggle');

function setTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');

    if (theme === 'dark') {
        logo.src = 'lightQuoteIcon.png';
    } else {
        logo.src = 'quoteIcon.png';
    }

    localStorage.setItem('theme', theme);
}

darkModeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    setTheme(newTheme);
});

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);
