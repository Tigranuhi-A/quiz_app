import USHistory from "@/components/USHistory";

async function fetchUSHistory() {
    const res = await fetch("http://localhost:3000/api/UShistory", {
      next: {
        revalidate: 10,
      },
    });
  
    const data = await res.json();
    return data.ushistory_questions;
  }
  

export default async function USHistorypage() {

    const ushistory_questions = await fetchUSHistory();

  return (
    <div>
      <USHistory ushistory_questions={ushistory_questions} />
    </div>
  )
}
