// Runs before the tests: checks the environment and warms caches. Some demo branches break it on purpose.
const required = [];

for (const name of required) {
    if (!process.env[name]) {
        console.error(`Error: Missing required environment variable ${name}`);
        process.exit(1);
    }
}
console.log("environment ok");
