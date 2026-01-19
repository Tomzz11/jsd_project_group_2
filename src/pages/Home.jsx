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
      <div className="absolute inset-0 z-0 flex h-screen pt-250 items-center justify-center bg-[url('/catcat.jpg')] bg-center">
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
              className="mx-auto w-full max-w-4xl "
            >
              <CarouselContent className="-ml-6 pt-10 pb-10">
                {featured.map((product) => (
                  <CarouselItem key={product._id} className="basis-1/3 pl-6">
                    <Link to={`/products/${product._id}`}>
                      <Card className="min-h-[480px] overflow-hidden rounded-3xl shadow-md pt-10 pb-10 transition-transform duration-300 hover:scale-[1.03]">
                        {/* Image area */}
                        <div className="min-h-[300px] bg-muted">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Content area */}
                        <CardContent className="flex flex-col p-6">
                          <h3 className="line-clamp-2 text-base font-semibold">
                            {product.name}
                          </h3>

                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {product.description}
                          </p>

                          <p className="pt-3 text-3xl font-bold">
                            ฿{Number(product.price).toLocaleString("th-TH")}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              ทำไมต้องเลือกเรา?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">สินค้าคุณภาพ</h3>
                <p className="text-gray-500">
                  คัดสรรสินค้าคุณภาพดี จากแบรนด์ชั้นนำ มั่นใจได้
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚚</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">จัดส่งรวดเร็ว</h3>
                <p className="text-gray-500">
                  จัดส่งทั่วประเทศ รวดเร็ว ปลอดภัย ติดตามสถานะได้
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💬</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">บริการหลังขาย</h3>
                <p className="text-gray-500">
                  ทีมงานพร้อมให้คำปรึกษาและดูแลคุณตลอด 24 ชั่วโมง
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer></footer>
    </>
  );
};

export default Home;
