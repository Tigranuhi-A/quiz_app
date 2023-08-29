import HarryPotter from "@/components/HarryPotter";

async function fetchHarryPotter() {
  const res = await fetch("http://localhost:3000/api/HarryPotter", {
    next: {
      revalidate: 10,
    },
  });

  const data = await res.json();
  return data.harrypotter_questions;
}


export default async function HarryPotterpage() {

  const harrypotter_questions = await fetchHarryPotter();

  return (
    <div>
      <HarryPotter harrypotter_questions={harrypotter_questions} />
    </div>
  )
}
