const fs = require('fs/promises');
const path = require('path');

async function syncDirectories(source, destination) {
    try {
        await fs.mkdir(destination, { recursive: true });

        const sourceEntries = await fs.readdir(source, { withFileTypes: true });
        const destEntries = await fs.readdir(destination, { withFileTypes: true });

        for (const entry of sourceEntries) {
            const srcPath = path.join(source, entry.name);
            const destPath = path.join(destination, entry.name);

            if (entry.isDirectory()) {
                await syncDirectories(srcPath, destPath);
            } else {
                await syncFile(srcPath, destPath);
            }
        }

        for (const entry of destEntries) {
            const srcPath = path.join(source, entry.name);
            const destPath = path.join(destination, entry.name);

            try {
                await fs.access(srcPath);
            } catch {
                console.log(`[Cleanup] Removing ${destPath}`);
                await fs.rm(destPath, { recursive: true, force: true });
            }
        }

    } catch (err) {
        console.error(`Critical Sync Error: ${err.message}`);
    }
}

async function syncFile(src, dest) {
    try {
        const srcStat = await fs.stat(src);
        let shouldCopy = false;

        try {
            const destStat = await fs.stat(dest);
            if (srcStat.mtimeMs > destStat.mtimeMs || srcStat.size !== destStat.size) {
                shouldCopy = true;
            }
        } catch {
            shouldCopy = true;
        }

        if (shouldCopy) {
            console.log(`[Syncing] ${src} -> ${dest}`);
            await fs.copyFile(src, dest);
        }
    } catch (err) {
        console.error(`Failed to sync file ${src}: ${err.message}`);
    }
}

const srcDir = path.resolve(__dirname, 'source_folder');
const destDir = path.resolve(__dirname, 'backup_folder');

console.log('Starting synchronization...');
syncDirectories(srcDir, destDir).then(() => console.log('Sync complete.'));