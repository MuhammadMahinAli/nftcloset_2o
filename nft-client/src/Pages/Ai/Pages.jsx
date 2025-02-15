import { FaArrowRight, FaPlus, FaTrash } from "react-icons/fa6";
import { RiPencilLine } from "react-icons/ri";

const Pages = () => {
  const demoSections = [
    {
      id: 1,
      title: "Hero Section",
    },
    {
      id: 2,
      title: "Featured Collections",
    },
    {
      id: 3,
      title: "About Us",
    },
  ];
  return (
    <div>
      {/* homepage */}
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Home Page Control</h1>
            <p className="text-gray-500 mt-2">
              Manage your homepage sections and content
            </p>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600">
            <FaPlus className="h-4 w-4 mr-2" />
            Add New Section
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoSections.map((section) => (
            <div key={section.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{section.title}</h3>
                  <div className="flex gap-2">
                    <button size="icon" className="h-8 w-8">
                      <RiPencilLine className="h-4 w-4" />
                    </button>
                    <button
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="aspect-[16/9] bg-gray-100 rounded-lg mb-4" />

                <div className="flex gap-2">
                  <button className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                    Edit Content
                    <FaArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* order */}
      <div className="bg-white rounded-lg">
        <div className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src="/placeholder.png"
                alt="productName"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  {/* <span className="text-sm text-gray-500">
                            {new Date(order.created).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </span> */}
                </div>
                <h3 className="text-lg font-semibold">productName</h3>
                <p className="text-sm text-gray-500 mt-1">Size</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  The return/exchange window for this item is closed.
                </p>

                <div className="flex gap-3">
                  <button className="flex-1 bg-gray-900 text-white hover:bg-gray-800">
                    Claim Your Digital Assets
                  </button>

                  <button className="flex-1">Status</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages;
