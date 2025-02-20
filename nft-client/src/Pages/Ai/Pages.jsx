
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Page = ({products}) => {
 
console.log("plpl",products.image);
  return (
    <div className="relative py-2 px-4 md:px-6 lg:px-8">
      <Swiper
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
        modules={[Navigation,Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        breakpoints={{
          // Mobile
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          // Tablet
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          // Desktop
          1024: {
            slidesPerView: 3,
            spaceBetween: 40
          }
        }}
        className="relative"
      >
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="rounded-lg shadow-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Page;