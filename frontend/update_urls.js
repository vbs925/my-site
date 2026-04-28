const fs = require('fs');
const path = require('path');

const directory = './src/app';

function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Replace in template literals: `http://127.0.0.1:8000${...}`
    if (content.includes('`http://127.0.0.1:8000${')) {
        content = content.replace(/`http:\/\/127\.0\.0\.1:8000\$\{/g, '`${process.env.NEXT_PUBLIC_API_URL || \'http://127.0.0.1:8000\'}${');
        updated = true;
    }

    // Replace in regular fetch/strings: 'http://127.0.0.1:8000/...' or "http://127.0.0.1:8000/..."
    if (content.includes("'http://127.0.0.1:8000")) {
        content = content.replace(/'http:\/\/127\.0\.0\.1:8000([^']*)'/g, "`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}$1`");
        updated = true;
    }
    if (content.includes('"http://127.0.0.1:8000')) {
        content = content.replace(/"http:\/\/127\.0\.0\.1:8000([^"]*)"/g, "`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}$1`");
        updated = true;
    }

    if (updated) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            updateFile(fullPath);
        }
    }
}

walkDir(directory);
