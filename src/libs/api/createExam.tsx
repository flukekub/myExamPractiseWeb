export default async function createExam(
    name: string,
    imageData: Blob,
    answer: string,
    subject: string,
    type: string,
    difficulty: string,
    answerImageData:Blob,
    choices: string ,
    token: string
  ) {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", imageData); // เปลี่ยน key เป็น image หรือแล้วแต่ backend
      formData.append("answerImage", answerImageData); // เปลี่ยน key เป็น answerImage หรือแล้วแต่ backend
      formData.append("answer", answer);
      formData.append("subject", subject);
      formData.append("type", type);
      formData.append("difficulty", difficulty);
      formData.append("choices", choices);
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/exams`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`, // ✅ แนบ token ใน headers
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to create exam");
      }
  
      return response.json();
    } catch (error) {
      console.error("Error creating exam:", error);
      return null;
    }
  }