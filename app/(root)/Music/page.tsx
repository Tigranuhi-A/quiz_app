import Music from "@/components/Music";

async function fetchMusic() {
    const res = await fetch("http://localhost:3000/api/music", {
      next: {
        revalidate: 10,
      },
    });
  
    const data = await res.json();
    return data.music_questions;
  }
  

export default async function Musicpage() {

    const music_questions = await fetchMusic();

  return (
    <div>
      <Music music_questions={music_questions} />
    </div>
  )
}
