import JSZip from 'jszip';
import { availableComponents } from '../data/componentBlocks';
import { navigationTemplate } from '../data/templates/navigation';
import { heroTemplate } from '../data/templates/hero';
import { featuresTemplate } from '../data/templates/features';

const getComponentTemplate = (id, primaryColor, secondaryColor) => {
  switch (id) {
    case 'navigation':
      return navigationTemplate(primaryColor, secondaryColor);
    case 'hero':
      return heroTemplate(primaryColor, secondaryColor);
    case 'features':
      return featuresTemplate(primaryColor, secondaryColor);
    default:
      return `<div>Component ${id} template not found</div>`;
  }
};

export const generateZipFile = async ({
  components,
  framework,
  primaryColor,
  secondaryColor
}) => {
  const zip = new JSZip();

  // Add HTML file
  const html = generateHTML(components, framework, primaryColor, secondaryColor);
  zip.file('index.html', html);

  // Add CSS file
  const css = generateCSS(framework, primaryColor, secondaryColor);
  zip.file('styles.css', css);

  // Add JavaScript file
  const js = generateJS(framework);
  zip.file('script.js', js);

  // Generate and download zip
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'website.zip';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};

const generateHTML = (components, framework, primaryColor, secondaryColor) => {
  const bootstrapCDN = framework === 'bootstrap' 
    ? `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
       <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">`
    : '';
  
  const bootstrapJS = framework === 'bootstrap'
    ? '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>'
    : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    ${bootstrapCDN}
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    ${components.map(id => getComponentTemplate(id, primaryColor, secondaryColor)).join('\n')}
    ${bootstrapJS}
    <script src="script.js"></script>
</body>
</html>`;
};

const generateCSS = (framework, primaryColor, secondaryColor) => {
  return `
:root {
  --primary-color: ${primaryColor};
  --secondary-color: ${secondaryColor};
}

body {
  background-color: #121212;
  color: white;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: ${primaryColor}dd;
  border-color: ${primaryColor}dd;
}
`;
};

const generateJS = (framework) => {
  return `
// Add your custom JavaScript here
document.addEventListener('DOMContentLoaded', function() {
  // Initialize any custom functionality
});
`;
};