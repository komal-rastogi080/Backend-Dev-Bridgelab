const fs = require('fs');
const readline = require('readline');

async function analyzeLog(filePath) {
    const stats = {
        totalLines: 0,
        counts: { INFO: 0, WARN: 0, ERROR: 0 },
        errorMessages: {}, // To track specific error frequency
    };

    // Create a readable stream
    const fileStream = fs.createReadStream(filePath);

    // Use readline to process the stream line-by-line
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    console.log(`--- Analyzing: ${filePath} ---`);

    for await (const line of rl) {
        stats.totalLines++;

        // Simple Regex to find log level (assuming format like: [ERROR] or INFO:)
        const match = line.match(/\[?(INFO|WARN|ERROR)\]?/i);
        
        if (match) {
            const level = match[1].toUpperCase();
            stats.counts[level]++;

            // If it's an error, let's grab the text after the level
            if (level === 'ERROR') {
                const msg = line.split(match[0])[1]?.trim() || 'Unknown Error';
                stats.errorMessages[msg] = (stats.errorMessages[msg] || 0) + 1;
            }
        }
    }

    displayReport(stats);
}

function displayReport(stats) {
    console.log("\n--- Log Analysis Report ---");
    console.log(`Total Lines Processed: ${stats.totalLines}`);
    console.table(stats.counts);

    console.log("Top Error Messages:");
    const topErrors = Object.entries(stats.errorMessages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    topErrors.forEach(([msg, count]) => {
        console.log(`- [${count} hits]: ${msg}`);
    });
}

// Usage: Pass your log file path here
analyzeLog('app.log').catch(console.error);