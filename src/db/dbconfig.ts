import fs from 'fs';
const DB_FILE = 'db.json';

// Ensure the database file exists
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// Helper function to read database
export const readDatabase = () => {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
};

// Helper function to write database
export const writeDatabase = (data: any) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};