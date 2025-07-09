export default async function getExam(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/exams/${id}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch exam");
    }

    return data;
  } catch (error: any) {
    console.error("Exam fetch error:", error.message || error);
    return null;
  }
}
