import Navbar from "@/components/Navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const App = () => {
  return (
    <>
      <header>
        {/* <div className="w-full h-350 relative overflow-hidden">
      <Navbar/>
        </div> */}
      </header>
      <main>
         <div>
            <video
            className="absolute inset-0 z-0 w-full h-325 object-cover"
            src="/Video Project 2.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
          </div>
          <div class="relative z-10  text-white h-[576px] w-400 mx-auto ">
            <div class="mt- max-w-xl p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 shadow-xl ">
            </div>
          </div>
        {/* <section id="listitem" className="bg-">
          <Carousel
            plugins={[
              Autoplay({
                delay: 1500,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem>
                <img
                  src="https://www.feedmeplease.com/images/pdimg/2742/1.webp"
                  alt=""
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://media.allonline.7eleven.co.th/pdmain/355225_01_cat-food_me-o.jpg"
                  alt=""
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://www.feedmeplease.com/images/pdimg/2742/1.webp"
                  alt=""
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://media.allonline.7eleven.co.th/pdmain/355225_01_cat-food_me-o.jpg"
                  alt=""
                />
              </CarouselItem>
               <CarouselItem>
                <img
                  src="https://media.allonline.7eleven.co.th/pdmain/355225_01_cat-food_me-o.jpg"
                  alt=""
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://www.feedmeplease.com/images/pdimg/2742/1.webp"
                  alt=""
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://www.feedmeplease.com/images/pdimg/2742/1.webp"
                  alt=""
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
        <section className=""></section> */}
      </main>
      <footer></footer>
    </>
  );
};

export default App;
