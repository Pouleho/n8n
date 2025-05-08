// Script to REMOVE default exports from node files if they exist
const fs = require('fs');
const path = require('path');

function removeDefaultNodeExports(baseDir, subDir) {
  const fullPath = path.join(baseDir, subDir);
  
  // Get all entries in the directory
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  
  let filesFixed = 0;
  
  // Process directories
  entries.filter(entry => entry.isDirectory()).forEach(dir => {
    // Recursively process subdirectories
    filesFixed += removeDefaultNodeExports(fullPath, dir.name);
    
    // Check for node files in this directory
    const nodeFile = path.join(fullPath, dir.name, `${dir.name}.node.ts`);
    if (fs.existsSync(nodeFile)) {
      let content = fs.readFileSync(nodeFile, 'utf8');
      
      // Extract the class name
      const classMatch = content.match(/export class (\w+) implements INodeType/);
      
      if (classMatch && classMatch[1]) {
        const className = classMatch[1];
        const defaultExportString = `\n\n// Add default export to ensure the class can be found by the class loader\nexport default ${className};\n`;
        
        // Check if default export exists and remove it
        if (content.includes(defaultExportString)) {
          content = content.replace(defaultExportString, '');
          
          // Save the updated content
          fs.writeFileSync(nodeFile, content);
          console.log(`Removed default export for ${className} in ${nodeFile}`);
          filesFixed++;
        }
      }
    }
  });
  
  // Process files directly in this directory
  entries.filter(entry => entry.isFile() && entry.name.endsWith('.node.ts')).forEach(file => {
    const nodeFile = path.join(fullPath, file.name);
    let content = fs.readFileSync(nodeFile, 'utf8');
    
    // Extract the class name
    const classMatch = content.match(/export class (\w+) implements INodeType/);
    
    if (classMatch && classMatch[1]) {
      const className = classMatch[1];
      const defaultExportString = `\n\n// Add default export to ensure the class can be found by the class loader\nexport default ${className};\n`;
      
      // Check if default export exists and remove it
      if (content.includes(defaultExportString)) {
        content = content.replace(defaultExportString, '');
        
        // Save the updated content
        fs.writeFileSync(nodeFile, content);
        console.log(`Removed default export for ${className} in ${nodeFile}`);
        filesFixed++;
      }
    }
  });
  
  return filesFixed;
}

// Base directory for nodes-langchain
const baseLangchainDir = path.join(__dirname, 'packages/@n8n/nodes-langchain/nodes');

// Start removing default exports
const langchainFixCount = removeDefaultNodeExports(path.dirname(baseLangchainDir), 'nodes');

console.log(`Removed default exports from ${langchainFixCount} files in total`); 