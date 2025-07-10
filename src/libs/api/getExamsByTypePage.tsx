export default async function getExamsByType(type: string, page: number) {
    try {
        
        const limit = 10; // Set a default limit for pagination
        
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString()
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/exams/type/${type}?${params}`, {
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