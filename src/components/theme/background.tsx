import {  Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


import background1 from "../../assets/background1.png";
import background2 from "../../assets/background2.png";
import background3 from "../../assets/background3.png";

function BackgroundHeader() {
  return (
    <header className="relative h-[440px] w-full overflow-hidden">
      <Swiper
        modules={[ Pagination, Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {[background1, background2, background3].map((bg, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              
              {/* IMAGEM */}
              <img
                src={bg}
                alt={`Banner ${index + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* GRADIENTE AMAZON (bottom fade) */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-[#1f1f1f]" />

              {/* CONTEÚDO OPCIONAL */}
              <div className="relative z-10 flex h-full flex-col justify-center px-10 md:px-20 text-white">
                <h1 className="max-w-2xl text-4xl md:text-5xl font-bold">
                  Ofertas imperdíveis
                </h1>

                <p className="mt-4 max-w-xl text-gray-300">
                  Produtos selecionados com descontos exclusivos por tempo limitado.
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </header>
  );
}

export default BackgroundHeader;
