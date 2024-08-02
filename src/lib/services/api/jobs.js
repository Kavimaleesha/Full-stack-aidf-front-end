export const getJobs = async () => {
  const res = await fetch(
    "https://full-stack-aidf-back-end-production.up.railway.app/jobs",
    {
      method: "GET",
    }
  );
  const data = await res.json();
  return data;
};

export const getJobById = async (id) => {
  if (!window.Clerk || !window.Clerk.session) {
    throw new Error("Clerk is not initialized properly.");
  }

  const token = await window.Clerk.session.getToken();

  console.log("Fetching job with ID:", id);
  console.log("Using token:", token);
  
  const res = await fetch(`https://full-stack-aidf-back-end-production.up.railway.app/jobs/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  console.log(data);
  return data;
};

export const createJob = async ({
  title,
  description,
  type,
  location,
  questions,
}) => {
  const token = await window.Clerk.session.getToken();

  await fetch("https://full-stack-aidf-back-end-production.up.railway.app/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      type,
      location,
      questions,
    }),
  });
};
