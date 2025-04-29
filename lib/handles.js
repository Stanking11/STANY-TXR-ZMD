// Wrap your initialization in try-catch
async initialize() {
    try {
        // Your existing code
    } catch (error) {
        console.error('Critical Error:', error);
        process.exit(1);
    }
}
