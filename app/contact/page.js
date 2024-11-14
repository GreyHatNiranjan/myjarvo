import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "next/image";
export default function Profile() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Sidebar */}
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <div className="text-center">
              <Image
              src="/logo.png"
              width={80}
              height={30}
                className="mx-auto object-contain h-32 w-32 rounded-full"
                alt="Profile Picture"
              />
              {/* <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                John Doe
              </h2>
              <p className="text-gray-600">CEO & Founder, Jarvo Cotton</p> */}
            </div>

            {/* Contact Info */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">
                Contact Information
              </h3>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>
                  <strong>Email:</strong> support@jarvocotton.com
                </li>
                <li>
                  <strong>Phone:</strong> +1 234 567 890
                </li>
                <li>
                  <strong>Location:</strong> 123 Cotton St, Cottonville, Surat, India
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Follow Us</h3>
              <ul className="mt-4 space-y-2 text-indigo-600">
                <li>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Profile Content */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 shadow-lg rounded-lg mb-8">
              <h2 className="text-3xl font-bold text-gray-900">About Us</h2>
              <p className="mt-4 text-gray-600">
              At Jarvo Cotton, we are dedicated to bringing you high-quality, sustainable cotton clothing that blends comfort, style, and eco-consciousness. Our mission is to create garments that not only feel great on your skin but also leave a positive impact on the planet. From sourcing the finest organic cotton to employing ethical production methods, we prioritize sustainability at every step. Whether you&rsquo;re looking for everyday essentials or timeless pieces, Jarvo Cotton is committed to delivering fashion  that&rsquo;s both beautiful and responsible.
              </p>
            </div>

            {/* Achievements */}
            <div className="bg-white p-8 shadow-lg rounded-lg mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Achievements</h2>
              <ul className="mt-4 space-y-4 text-gray-600">
                <li>🏆 Pillars of India Award 2018 to Chairman</li>
                <li>🌟 Recognized as Top 100 Sustainable Companies - 2022</li>
                <li>🚀 Expanded to 3 new international markets - 2021</li>
                <li>🌿 Launched Eco-Friendly Cotton Line - 2020</li>
                <li>🏆 Best Cotton Exporter Award - 2023</li>
              </ul>
            </div>

            {/* Work Experience */}
            {/* <div className="bg-white p-8 shadow-lg rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900">
                Work Experience
              </h2>
              <div className="mt-4 space-y-4 text-gray-600">
                <div>
                  <h3 className="text-xl font-semibold">
                    CEO & Founder, Jarvo Cotton
                  </h3>
                  <p className="text-sm text-gray-500">2015 - Present</p>
                  <p className="mt-2">
                    Leading the company in sustainable cotton production,
                    expanding operations internationally, and launching
                    eco-friendly product lines.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Cotton Expert, Cotton Industries
                  </h3>
                  <p className="text-sm text-gray-500">2010 - 2015</p>
                  <p className="mt-2">
                    Managed supply chains, quality assurance, and developed key
                    partnerships with international markets.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
