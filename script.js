const openMenu = document.querySelector('.open-menu');
const closeMenu = document.querySelector('.close-menu');
const shade = document.querySelector('.shade');
const dropdownButtons = document.querySelectorAll('.dropdown-button');

function setDropdown(button, isOpen) {
  const menu = document.getElementById(button.getAttribute('aria-controls'));

  button.setAttribute('aria-expanded', isOpen);
  menu.hidden = !isOpen;
}

dropdownButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    setDropdown(button, !isOpen);
  });
});

function hideMenu() {
  document.body.classList.remove('menu-open');
  openMenu.setAttribute('aria-expanded', 'false');

  dropdownButtons.forEach((button) => {
    setDropdown(button, false);
  });

  openMenu.focus();
}

openMenu.addEventListener('click', () => {
  document.body.classList.add('menu-open');
  openMenu.setAttribute('aria-expanded', 'true');
  closeMenu.focus();
});

closeMenu.addEventListener('click', hideMenu);
shade.addEventListener('click', hideMenu);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const dropdown = document.activeElement.closest('.dropdown');

    if (dropdown) {
      const button = dropdown.querySelector('.dropdown-button');

      if (button.getAttribute('aria-expanded') === 'true') {
        setDropdown(button, false);
        button.focus();
        return;
      }
    }

    if (document.body.classList.contains('menu-open')) {
      hideMenu();
    } else {
      dropdownButtons.forEach((button) => {
        setDropdown(button, false);
      });
    }
  }
});
