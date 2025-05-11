export default async function getDentists() {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/exams`, {
            method: "GET",
            
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch exams");
        }

        return data;
    } 
    catch (error: any) {
        console.error("Dentists fetch error:", error.message || error);
        return null;
    }
};