export const heroTemplate = (primaryColor, secondaryColor) => `
<section class="py-5" style="background-color: ${secondaryColor};">
  <div class="container">
    <div class="row align-items-center min-vh-75">
      <div class="col-lg-6">
        <h1 class="display-4 fw-bold text-white mb-4">Welcome to Your Website</h1>
        <p class="lead text-white-50 mb-4">Create a stunning website with our easy-to-use generator. Choose from various components and customize them to match your brand.</p>
        <div class="d-flex gap-3">
          <button class="btn btn-lg px-4" style="background-color: ${primaryColor}; color: white;">Get Started</button>
          <button class="btn btn-lg btn-outline-light px-4">Learn More</button>
        </div>
      </div>
      <div class="col-lg-6">
        <img src="https://via.placeholder.com/600x400" alt="Hero Image" class="img-fluid rounded-3 shadow">
      </div>
    </div>
  </div>
</section>
`;