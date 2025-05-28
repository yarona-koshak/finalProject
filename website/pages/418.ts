let coffeeImg = document.getElementById('coffeeImg');

if (coffeeImg) {
  coffeeImg.addEventListener('click', () => {
    window.location.href = '/website/pages/index.html';
  });
} else {
  console.error('Element with id "coffeeImg" not found');
}
