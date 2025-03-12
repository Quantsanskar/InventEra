export default async function handler(req, res) {
    const { CLIENT_ID, CLIENT_SECRET } = process.env;

    if (!CLIENT_ID || !CLIENT_SECRET) {
        return res.status(500).json({ error: "Server misconfiguration: Missing API credentials" });
    }

    res.status(200).json({ message: "Secure API Call Successful" });
}