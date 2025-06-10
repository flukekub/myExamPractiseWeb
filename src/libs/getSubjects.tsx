export default async function getSubjects() {
    try {
        const response = await fetch("http://localhost:5000/api/v1/subjects", {
            method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch subjects");
        }

        return data;
    } catch (error: any) {
        console.error("Subjects fetch error:", error.message || error);
        return null;
    }
}