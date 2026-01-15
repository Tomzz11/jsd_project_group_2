import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { products } from "@/components/mockdata/products";



const App = () => {
  return (
    <>
      <main>
        <div className=" h-210 w-full overflow-hidden">
          <video
            className="absolute inset-0 z-0 h-230 w-full object-cover"
            src="/BG.mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="text-white  pt-55 p-8 rounded-2xl  flex  items-center gap-20 ">
              <Link to="/products">
                <button
                  className="
                  group
                  relative
                  w-30 h-30
                  rounded-full
                  overflow-hidden
                   bg-white/20 backdrop-blur-md
                   border border-white/30
                   shadow-xl
                   transition-transform duration-300
                   hover:scale-105"
                >
                  <img
                    src=" /dogproduct.png"
                    alt="Dog Essentials"
                    className="
                    object-contain
                    transition-transform duration-300
                    group-hover:scale-110"
                  />
                </button>
              </Link>
              <Link to="/products">
                <button
                  className="
                  group
                  relative
                  w-30 h-30
                  rounded-full
                  overflow-hidden
                   bg-white/20 backdrop-blur-md
                   border border-white/30
                   shadow-xl
                   transition-transform duration-300
                   hover:scale-105"
                >
                  <img
                    src=" /catproduct.png"
                    alt="Dog Essentials"
                    className="
                    object-contain
                    transition-transform duration-300
                    group-hover:scale-110"
                  />
                </button>
              </Link>
              <Link to="/products">
                <button
                  className="
                  group
                  relative
                  w-30 h-30
                  rounded-full
                  overflow-hidden
                   bg-white/20 backdrop-blur-md
                   border border-white/30
                   shadow-xl
                   transition-transform duration-300
                   hover:scale-105"
                >
                  <img
                    src=" /fishproduct.png"
                    alt="Dog Essentials"
                    className="
                    object-contain
                    transition-transform duration-300
                    group-hover:scale-110"
                  />
                </button>
              </Link>
              <Link to="/products">
                <button
                  className="
                  group
                  relative
                  w-30 h-30
                  rounded-full
                  overflow-hidden
                   bg-white/20 backdrop-blur-md
                   border border-white/30
                   shadow-xl
                   transition-transform duration-300
                   hover:scale-105"
                >
                  <img
                    src=" /birdproduct.png"
                    alt=" Essentials"
                    className="
                    object-contain
                    transition-transform duration-300
                    group-hover:scale-110"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <section
          id="listitem"
         
        >
          <div  className=" relative flex justify-center py-10 bg-slate-50">
            <Carousel
              opts={{ align: "start" }}
              className="w-full max-w-3xl mx-auto"
            >
              <CarouselContent className="-ml-3">
                {products.map((product) => (
                  <CarouselItem key={product.id} className="basis-1/3 pl-3">
                    <Card className="min-h-[480px] overflow-hidden rounded-3xl shadow-md">
                      {/* Image area */}
                      <div className="min-h-[200px] bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Content area */}
                      <CardContent className=" flex h-[220px] flex-col p-6">
                        <h3 className="line-clamp-2 text-base font-semibold">
                          {product.name}
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>

                        <div className="mt-3 flex items-end justify-between">
                          <p className="text-xl font-bold">
                            ฿{Number(product.price).toLocaleString("th-TH")}
                          </p>

                          {product.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              ฿
                              {Number(product.originalPrice).toLocaleString(
                                "th-TH"
                              )}
                            </p>
                          )}
                        </div>

                        {/* Push actions to bottom */}
                        <div className="mt-auto flex gap-2">
                          <button
                            className="flex-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                            onClick={() => console.log("add", product.id)}
                          >
                            Add to cart
                          </button>
                          <button
                            className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-muted"
                            onClick={() => console.log("view", product.id)}
                          >
                            View
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
        <section className=""></section>
      </main>
      <footer></footer>
    </>
  );
};

export default App;
