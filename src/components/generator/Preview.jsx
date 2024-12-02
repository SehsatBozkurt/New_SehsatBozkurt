import React from 'react';
import { motion } from 'framer-motion';
import { useWebsiteContext } from '../../contexts/WebsiteContext';
import { generateZipFile } from '../../utils/exportUtils';
import { navigationTemplate } from '../../data/templates/navigation';
import { heroTemplate } from '../../data/templates/hero';
import { featuresTemplate } from '../../data/templates/features';

const Preview = () => {
  const { selectedComponents, framework, primaryColor, secondaryColor } = useWebsiteContext();

  const handleExport = async () => {
    await generateZipFile({
      components: selectedComponents,
      framework,
      primaryColor,
      secondaryColor
    });
  };

  const getComponentTemplate = (id) => {
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

  const previewContent = selectedComponents.map(id => getComponentTemplate(id)).join('\n');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1E0000] to-black rounded-xl p-6 border border-[#380808]"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Preview</h2>
        <button
          onClick={handleExport}
          className="px-6 py-2 bg-[#5A1818] hover:bg-[#380808] rounded-full transition-colors text-white"
        >
          Export
        </button>
      </div>

      <div className="bg-white rounded-lg aspect-video overflow-hidden">
        <iframe
          title="Website Preview"
          className="w-full h-full"
          srcDoc={`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Preview</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
                <style>
                  body {
                    background-color: #121212;
                  }
                </style>
              </head>
              <body>
                ${previewContent}
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
              </body>
            </html>
          `}
        />
      </div>
    </motion.div>
  );
};

export default Preview;