const themeSelector = document.getElementById('light-or-dark');
function changeTheme() {
    const currentSetting = themeSelector.value;
    
    const body = document.body;
    const byuiLogo = document.getElementById('logo');

    if (currentSetting === 'dark') {
        body.classList.add('dark');
        byuiLogo.src = 'byui-logo_dark.png';
    } else {
        body.classList.remove('dark');
        byuiLogo.src = 'byui-logo_blue.webp';
    }
}
themeSelector.addEventListener('change', changeTheme);
