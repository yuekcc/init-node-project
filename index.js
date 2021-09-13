#!/usr/bin/env node

const packageTemplate = require('./package.json');
const path = require('path');
const fs = require('fs');

const projectName = path.basename(process.cwd());
packageTemplate.name = projectName;

fs.writeFileSync('package.json', JSON.stringify(packageTemplate, null, 2), 'utf-8');

const editorconfig = `
root = true

[*]
indent_size = 2
indent_style = space
`

fs.writeFileSync('.editorconfig', JSON.stringify(editorconfig, null, 2), 'utf-8');
