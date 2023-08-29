import Science from "@/components/Science";

async function fetchScience() {
    const res = await fetch("http://localhost:3000/api/science", {
      next: {
        revalidate: 10,
      },
    });
  
    const data = await res.json();
    return data.science_questions;
  }
  

export default async function Sciencepage() {

    const science_questions = await fetchScience();

  return (
    <div>
      <Science science_questions={science_questions} />
    </div>
  )
}
