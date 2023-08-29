import Sport from "@/components/Sport";

async function fetchSport() {
    const res = await fetch("http://localhost:3000/api/sport", {
      next: {
        revalidate: 10,
      },
    });
  
    const data = await res.json();
    return data.sport_questions;
  }
  

export default async function Sportpage() {

    const sport_questions = await fetchSport();

  return (
    <div>
      <Sport sport_questions={sport_questions} />
    </div>
  )
}
