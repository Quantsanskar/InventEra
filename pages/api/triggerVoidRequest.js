export default async function handler(req, res) {
    try {
        const authHeader = "Basic " + Buffer.from("qwerty@buildersspace9999Revant:asdfghjkwertyuicvbnmrevantsdfghjk234").toString("base64");

        const response = await fetch("https://builderspace.onrender.com/api/void-request-for-active-state/", {
            method: "GET",
            headers: {
                "Authorization": authHeader,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to call API", details: error.message });
    }
}
