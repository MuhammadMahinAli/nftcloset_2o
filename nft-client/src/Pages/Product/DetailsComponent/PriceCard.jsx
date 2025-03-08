// import { BiTime } from 'react-icons/bi';
// import { BsCart3 } from 'react-icons/bs';
// import { Link } from 'react-router-dom';

// const PriceCard = ({price,collection}) => {

//       return (
//         <div className="bg-white rounded-xl shadow-lg p-4 space-y-4">
//           {/* Sale Date */}
//           <div className="flex items-center gap-2 text-gray-600">
//             <BiTime className="text-xl" />
//             <span className="text-sm">Sale end July 24,2024 at 10:00pm</span>
//           </div>
    
//           {/* Current Price */}
//           <div className="space-y-1">
//             <span className="text-sm text-gray-500">Current Price</span>
//             <div className="text-2xl font-bold">$ {price}</div>
//           </div>
    
//           {/* Action Buttons */}
//           <div className="flex gap-3">
//           <Link to='/orders' className="flex-1 bg-indigo-500 text-white py-3 px-3 md:px-4 rounded-lg font-medium hover:bg-indigo-600 transition-colors duration-200 flex items-center justify-center gap-2">
//               <BsCart3 className="text-xl" />
//               Buy now
//             </Link>
//             <button className="flex-1 bg-gray-200 text-gray-700 py-3 px-3 md:px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200">
//               AI Try On
//             </button>
//           </div>
//         </div>
//       );
//     };
    

// export default PriceCard;
import { BiTime } from 'react-icons/bi';
import { BsCart3 } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const PriceCard = ({ _id, price, collection }) => {
  
  const {discount, toDate,} = collection.collectionId;

  const toDatee = new Date(toDate);
  const isOfferValid = new Date() <= toDatee;
  const originalPrice = price;
  const discountPercentage = discount;
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discountAmount;
  const savingAmount = originalPrice - finalPrice;

  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] p-4 space-y-4">
      {/* Sale Date */}
      {isOfferValid && discount > 0 && (
        <div className="flex items-center gap-2 text-gray-600">
          <BiTime className="text-xl" />
          <span className="text-sm">Offer ends {formatDate(toDate)}</span>
        </div>
      )}

      {/* Current Price */}
      <div className="space-y-1">
        <span className="text-sm text-gray-500">Current Price</span>
        <div className="flex items-center gap-3">
          {isOfferValid && discount > 0 ? (
            <>
              <div className="text-2xl font-bold text-green-600">
                ${finalPrice.toFixed(2)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="text-sm text-green-600">
                  Save ${savingAmount.toFixed(2)} ({discountPercentage}% off)
                </span>
              </div>
            </>
          ) : (
            <div className="text-2xl font-bold">
              ${originalPrice.toFixed(2)}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Link 
          to={`/orders/${_id}`} 
          className={`flex-1 py-3 px-3 md:px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
            isOfferValid && discount > 0 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-indigo-500 hover:bg-indigo-600 text-white'
          }`}
        >
          <BsCart3 className="text-xl" />
          {isOfferValid && discount > 0 ? 'Buy with discount' : 'Buy now'}
        </Link>
        <button className="flex-1 bg-gray-200 text-gray-700 py-3 px-3 md:px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200">
          AI Try On
        </button>
      </div>

      {/* Limited Time Offer Badge */}
      {isOfferValid && discount > 0 && (
        <div className="mt-3 bg-orange-100 text-orange-700 text-sm py-2 px-3 rounded-lg flex items-center justify-center">
          <span>Limited time offer - Don't miss out!</span>
        </div>
      )}
    </div>
  );
};

export default PriceCard;