
// Add this after auth initialization
if (fs.existsSync('sessions/creds.json')) {
    console.log('Using existing session...');
} else {
    console.log('New session - scan QR code');
}
