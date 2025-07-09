export default async function userLogin(email: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to login");
  }
    const data = await res.json();
    return data;
}
