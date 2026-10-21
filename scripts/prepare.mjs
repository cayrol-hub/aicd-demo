// Runs before the tests: checks the environment and warms caches. Some demo branches break it on purpose.
const required = [];

for (const name of required) {
    if (!process.env[name]) {
        console.error(`Error: Missing required environment variable ${name}`);
        process.exit(1);
    }
}
console.log("environment ok");

// Warm the currency rates cache.
try {
    const response = await fetch("https://rates.shop-demo.invalid/eur");
    console.log("rates", response.status);
} catch (error) {
    console.error("Error: cannot fetch currency rates:", error.cause ?? error);
    process.exit(1);
}
