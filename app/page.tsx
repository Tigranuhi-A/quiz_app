import Link from "next/link";

async function fetchTopics() {
  const res = await fetch("http://localhost:3000/api/topics", {
    next: {
      revalidate: 10,
    },
  });

  const data = await res.json();
  return data.topics;
}


export default async function Home() {

  const topics = await fetchTopics();

  return (
    <main>
      <div className=" text-[3rem] text-slate-800 font-bold flex justify-center mt-4 font-serif text-center">Quiz</div>
      <div className=" text-[2rem] text-slate-800 font-bold flex justify-center my-14 font-serif text-center">Pick a topic and get started!</div>

      <div className=" grid md:grid-cols-2 grid-cols-1 ">

        {
          topics.map((topic: any) => (
            <Link href={topic.title.replace(' ', '')} className=" flex flex-col justify-center items-center">
              <img src={topic.image} alt="" style={{ width: "800px", height: "400px" }} />
              <button className="absolute px-4 py-3 bg-slate-800/80 rounded font-bold text-white/30 text-[1.1rem] hover:text-white duration-300">Start {topic.title} quiz</button>
            </Link>
          ))
        }
      </div>

    </main>
  )
}
