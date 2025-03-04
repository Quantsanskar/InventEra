export default async function handler(req, res) {
    try {
        // Use the updated credentials from Postman
        const username = "qwerty@buildersspace9999Revant";
        const password = "asdfghjkwertyuicvbnmrevantsdfghjk2345678fghjrpeavaarnttkh";
        
        const authHeader = "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

        const response = await fetch(
            "https://builderspace.onrender.com/api/void-request-for-active-state/",
            {
                method: "GET", // Ensure this matches the Django view's allowed method
                headers: {
                    "Authorization": authHeader,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to call API", details: error.message });
    }
}