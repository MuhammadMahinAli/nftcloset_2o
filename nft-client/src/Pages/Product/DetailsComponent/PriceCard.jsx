import { BiTime } from 'react-icons/bi';
import { BsCart3 } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const PriceCard = () => {

      return (
        <div className="bg-white rounded-xl shadow-lg p-4 space-y-4">
          {/* Sale Date */}
          <div className="flex items-center gap-2 text-gray-600">
            <BiTime className="text-xl" />
            <span className="text-sm">Sale end July 24,2024 at 10:00pm</span>
          </div>
    
          {/* Current Price */}
          <div className="space-y-1">
            <span className="text-sm text-gray-500">Current Price</span>
            <div className="text-2xl font-bold">0.001 ETH</div>
          </div>
    
          {/* Action Buttons */}
          <div className="flex gap-3">
          <Link to='/orders' className="flex-1 bg-indigo-500 text-white py-3 px-3 md:px-4 rounded-lg font-medium hover:bg-indigo-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <BsCart3 className="text-xl" />
              Buy now
            </Link>
            <button className="flex-1 bg-gray-200 text-gray-700 py-3 px-3 md:px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200">
              AI Try On
            </button>
          </div>
        </div>
      );
    };
    

export default PriceCard;