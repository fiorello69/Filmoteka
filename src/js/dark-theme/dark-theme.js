let isDarkMode = false;
const root = document.documentElement;
const darkModeSwitch = document.querySelector('.switch__input');

darkModeSwitch.addEventListener('click', toggleColorTheme);

function toggleColorTheme() {
  isDarkMode = !isDarkMode;
  root.classList.toggle('dark-theme', isDarkMode);
}
