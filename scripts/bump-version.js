import fs from 'fs';
import path from 'path';

const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const versionParts = packageJson.version.split('.').map(Number);
versionParts[2] += 1; // Auto-increment patch version

if (versionParts[2] >= 100) {
    versionParts[2] = 0;
    versionParts[1] += 1;
}

if (versionParts[1] >= 20) {
    versionParts[1] = 0;
    versionParts[0] += 1;
}

packageJson.version = versionParts.join('.');

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log(`🚀 Version bumped to ${packageJson.version}`);
