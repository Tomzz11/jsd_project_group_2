import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productAPI } from "../services/api";
import { Progress } from "@/components/ui/progress";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    let timer1;
    let timer2;

    const fetchFeatured = async () => {
      try {
        const res = await productAPI.getFeatured();
        setFeatured(Array.isArray(res?.data?.data) ? res.data.data : []);

        // progress step
        timer1 = setTimeout(() => setProgress(66), 500);
        timer2 = setTimeout(() => {
          setProgress(100);
          setLoading(false);
        }, 2000);
      } catch (e) {
        console.error(e);
        setFeatured([]);
        setLoading(false);
      }
    };

    fetchFeatured();

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (loading)
    return (
      <div className="absolute inset-0 z-0 flex h-screen items-center justify-center bg-[url('/catcat.jpg')] bg-center">
        <Progress value={progress} className="w-[60%]" />
      </div>
    );

  return (
    <>
      <main>
        <video
          className="absolute inset-0 z-0 h-screen w-full object-cover"
          src="/BG.mp4"
          autoPlay
          loop
          muted
          preload="auto"
          playsInline
        />

        <div className="relative z-10 w-full h-[calc(100vh-80px)]  overflow-hidden">
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="flex items-center gap-20 rounded-2xl p-8 pt-100 text-white">
              <Link to="/products">
                <button className="group relative h-40 w-40 overflow-hidden rounded-full border border-white/30 bg-white/20 shadow-xl backdrop-blur-md transition-transform duration-300 hover:scale-105">
                  <img
                    src="/dogproduct.png"
                    alt="Dog Essentials"
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </button>
              </Link>

              <Link to="/products">
                <button className="group relative h-40 w-40 overflow-hidden rounded-full border border-white/30 bg-white/20 shadow-xl backdrop-blur-md transition-transform duration-300 hover:scale-105">
                  <img
                    src="/catproduct.png"
                    alt="Cat Essentials"
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </button>
              </Link>

              <Link to="/products">
                <button className="group relative h-40 w-40 overflow-hidden rounded-full border border-white/30 bg-white/20 shadow-xl backdrop-blur-md transition-transform duration-300 hover:scale-105">
                  <img
                    src="/fishproduct.png"
                    alt="Fish Essentials"
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </button>
              </Link>

              <Link to="/products">
                <button className="group relative h-40 w-40 overflow-hidden rounded-full border border-white/30 bg-white/20 shadow-xl backdrop-blur-md transition-transform duration-300 hover:scale-105">
                  <img
                    src="/birdproduct.png"
                    alt="Bird Essentials"
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <section
          id="listitem"
          className="bg-[linear-gradient(to_right_top,#e9dbbf,#e4d3b3,#d2c1a2,#dfceae,#eddcba,#eddcbb,#ecddbd,#ecddbe,#ded0b5,#d0c3ab,#fceacb,#e9dcc6)]"
        >
          <div className="text-center">
            <h1 className="pt-5 text-3xl font-bold">Suggestion Product</h1>
          </div>

          <div className="relative flex justify-center py-10">
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={[
                Autoplay({
                  delay: 2000,
                  stopOnInteraction: true,
                }),
              ]}
              className="mx-auto w-full max-w-4xl"
            >
              <CarouselContent className="-ml-3">
                {featured.map((product) => (
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
                      <CardContent className="flex h-[220px] flex-col p-6">
                        <h3 className="line-clamp-2 text-base font-semibold">
                          {product.name}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
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
      </main>

      <footer></footer>
    </>
  );
};

export default Home;