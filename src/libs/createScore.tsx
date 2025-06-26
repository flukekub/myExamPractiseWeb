export default async function createScore(score: number, total: number, subject: string, type: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/scores`, {
            method: "POST",
        });

        const data =  await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to create score");
        }

        return data;
    }catch (error: any) {
        console.error("crete Score error:", error.message || error);
        return null;
    }
}