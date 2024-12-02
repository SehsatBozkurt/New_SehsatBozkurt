export const navigationTemplate = (primaryColor, secondaryColor) => `
<nav class="navbar navbar-expand-lg" style="background-color: ${primaryColor};">
  <div class="container">
    <a class="navbar-brand text-white" href="#">Your Brand</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link text-white" href="#home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#about">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#services">Services</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#contact">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`;