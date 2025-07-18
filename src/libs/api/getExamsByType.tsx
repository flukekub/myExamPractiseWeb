export default async function getExamsByType(type: string) {
    try {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/exams/type/${type}`, {
            method: "GET",
        });
        

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch exams");
        }

        return data;
    } 
    catch (error: any) {
        console.error("Exams fetch error:", error.message || error);
        return null;
    }
}