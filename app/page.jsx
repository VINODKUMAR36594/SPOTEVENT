import Image from "next/image";
import {Button} from "../components/ui/button";
import Link from "next/link"; 
// import Image from 'next/image';
export default function Home() {
  return (
    <div>
      <section className="pb-16 relative overflow-hidden">
<div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">         
   {/* left */}
          <div className="text-center  sm:text-left">
            <span className="text-gray-500 font-light tracking-wide mb-6">
              Spott
              <span className="text-purple-400">*</span>
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[0.95] tracking-tight">Discover &<br/>
            create amazing 
            <span className="bg-linear-fto-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">Event.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-lg  font-light">Whether you&apos; looking to attend an exciting concert or host a memorable party, we have the perfect platform for you.Join our community today!</p>

            <Link href="/explore">
              <Button size='xl' className={"rounded-full"}>Explore Events</Button>
            </Link>
          </div>



          {/* right */}
          <div>
            <Image src="/hero.gif" alt="react meetup" width={700} height={700} className="w-full h-auto" priority />
          </div>
        </div>
      </section>
    </div>
  );
}
