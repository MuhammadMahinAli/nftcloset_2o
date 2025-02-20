
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const PageOne = () => {
  const products = [
    {
      id: 1,
      name: 'Blue Jacket',
      price: '40$',
      image: 'https://img.freepik.com/free-photo/tropical-podium-3d-background_135149-54.jpg'
    },
    {
      id: 2,
      name: 'Blue Jacket',
      price: '40$',
      image: 'https://img.freepik.com/free-photo/tropical-podium-3d-background_135149-54.jpg'
    },
    {
      id: 3,
      name: 'Blue Jacket',
      price: '40$',
      image: 'https://img.freepik.com/free-photo/tropical-podium-3d-background_135149-54.jpg'
    },
    {
      id: 4,
      name: 'Blue Jacket',
      price: '40$',
      image: 'https://img.freepik.com/free-photo/tropical-podium-3d-background_135149-54.jpg'
    },
    {
      id: 5,
      name: 'Blue Jacket',
      price: '40$',
      image: 'https://img.freepik.com/free-photo/tropical-podium-3d-background_135149-54.jpg'
    },
    {
      id: 6,
      name: 'Blue Jacket',
      price: '40$',
      image: 'https://img.freepik.com/free-photo/tropical-podium-3d-background_135149-54.jpg'
    },
    {
      id: 7,
      name: 'Blue Jacket',
      price: '40$',
      image: 'https://img.freepik.com/free-photo/tropical-podium-3d-background_135149-54.jpg'
    },
    {
      id: 8,
      name: 'Blue Jacket',
      price: '40$',
      image: 'https://img.freepik.com/free-photo/tropical-podium-3d-background_135149-54.jpg'
    },
    // ... add more products
  ];

  return (
    <div className="relative px-4 md:px-6 lg:px-8">
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
            slidesPerView: 2,
            spaceBetween: 40
          }
        }}
        className="relative"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-red-200 rounded-lg shadow-md overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PageOne;