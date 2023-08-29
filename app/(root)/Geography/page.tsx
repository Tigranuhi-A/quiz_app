import Geography from "@/components/Geography";

async function fetchGeography() {
    const res = await fetch("http://localhost:3000/api/geography", {
      next: {
        revalidate: 10,
      },
    });
  
    const data = await res.json();
    return data.geography_questions;
  }
  

export default async function Geographypage() {

    const geography_questions = await fetchGeography();

  return (
    <div>
      <Geography geography_questions={geography_questions} />
    </div>
  )
}
