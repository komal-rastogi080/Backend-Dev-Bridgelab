const fs = require("fs");
const readline = require("readline");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function listDirectory() {
  const dir = await ask("Enter directory path: ");
  if (fs.existsSync(dir) && fs.lstatSync(dir).isDirectory()) {
    console.log("\nDirectory Contents:");
    const items = fs.readdirSync(dir);
    items.forEach(item => console.log(item));
  } else {
    console.log("Directory does not exist.");
  }
}

async function readFile() {
  const filePath = await ask("Enter file path to read: ");
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      console.log("\nFile Contents:\n" + data);
    } catch (err) {
      console.log("Error reading file.");
    }
  } else {
    console.log("File not found.");
  }
}

async function writeFile() {
  const filePath = await ask("Enter file path to write to: ");
  const content = await ask("Enter text to write (will overwrite file): ");

  try {
    fs.writeFileSync(filePath, content);
    console.log("File written successfully.");
  } catch (err) {
    console.log("Error writing to file.");
  }
}

async function copyFile() {
  const src = await ask("Enter source file path: ");
  const dest = await ask("Enter destination file path: ");
  try {
    fs.copyFileSync(src, dest);
    console.log("File copied successfully.");
  } catch (err) {
    console.log("Error copying file. Make sure the source exists.");
  }
}

async function deleteFile() {
  const filePath = await ask("Enter file path to delete: ");
  try {
    fs.unlinkSync(filePath);
    console.log("File deleted successfully.");
  } catch (err) {
    console.log("Error deleting file or file does not exist.");
  }
}

async function main() {
  while (true) {
    console.log("\n--- File Manager ---");
    console.log("1. List Directory Contents");
    console.log("2. Read File");
    console.log("3. Write File");
    console.log("4. Copy File");
    console.log("5. Delete File");
    console.log("6. Exit");

    const choice = await ask("Choose an option (1–6): ");

    switch (choice) {
      case "1":
        await listDirectory();
        break;
      case "2":
        await readFile();
        break;
      case "3":
        await writeFile();
        break;
      case "4":
        await copyFile();
        break;
      case "5":
        await deleteFile();
        break;
      case "6":
        console.log("Exiting...");
        rl.close();
        return;
      default:
        console.log("Invalid choice, try again.");
    }
  }
}

main();
