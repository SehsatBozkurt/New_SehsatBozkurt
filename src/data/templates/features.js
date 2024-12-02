export const featuresTemplate = (primaryColor, secondaryColor) => `
<section class="py-5">
  <div class="container">
    <div class="text-center mb-5">
      <h2 class="display-5 fw-bold text-white">Our Features</h2>
      <p class="lead text-white-50">Discover what makes us different</p>
    </div>
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100 border-0" style="background-color: ${secondaryColor};">
          <div class="card-body text-center p-4">
            <div class="mb-3">
              <i class="bi bi-star-fill fs-1" style="color: ${primaryColor};"></i>
            </div>
            <h3 class="h4 text-white">Feature One</h3>
            <p class="text-white-50">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100 border-0" style="background-color: ${secondaryColor};">
          <div class="card-body text-center p-4">
            <div class="mb-3">
              <i class="bi bi-gear-fill fs-1" style="color: ${primaryColor};"></i>
            </div>
            <h3 class="h4 text-white">Feature Two</h3>
            <p class="text-white-50">Sed do eiusmod tempor incididunt ut labore et dolore.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100 border-0" style="background-color: ${secondaryColor};">
          <div class="card-body text-center p-4">
            <div class="mb-3">
              <i class="bi bi-lightning-fill fs-1" style="color: ${primaryColor};"></i>
            </div>
            <h3 class="h4 text-white">Feature Three</h3>
            <p class="text-white-50">Ut enim ad minim veniam, quis nostrud exercitation.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;