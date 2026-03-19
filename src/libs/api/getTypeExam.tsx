export default async function getTypeExam(subject: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/exams/subject/${subject}`,
    {
      method: "GET",
    }
  );

  const data = await res.json();
  return data;
}