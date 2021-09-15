#!/usr/bin/env node

const path = require('path');
const fs = require('fs').promises;

async function writeFile(filename, content) {
  return fs.writeFile(filename, content, 'utf-8');
}

function addEditorConfig() {
  const content = `root = true

[*]
indent_size = 2
indent_style = space
`;

  return writeFile('.editorconfig', content);
}

function addPackageJson() {
  const packageTemplate = require('./package.json');
  const projectName = path.basename(process.cwd());
  packageTemplate.name = projectName;

  delete packageTemplate.bin;

  const content = JSON.stringify(packageTemplate, null, 2);

  return writeFile('package.json', content);
}

function addGitIgnore() {
  const content = `node_modules
*.log
`;

  return writeFile('.gitignore', content);
}

Promise.all([addEditorConfig(), addGitIgnore(), addPackageJson()]).catch(err => {
  console.warn('error, ', err.message);
  process.exit(-1);
});
