import {
  ArrowUpRight,
  BarChart3,
  Clock,
  DollarSign,
  FileText,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-24 sm:pt-24 sm:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50 opacity-70" />
        <div className="relative container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                  TigFin
                </span>{" "}
                - Your Complete Business Management Solution
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                An all-in-one platform for managing clients, finances, projects,
                and employees with real-time insights and analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-8 py-4 text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors text-lg font-medium"
                >
                  Get Started
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                  alt="TigFin Dashboard"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Dashboards Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Role-Specific Dashboards
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              TigFin provides tailored experiences for every role in your
              organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <DollarSign className="w-6 h-6" />,
                title: "Financial Manager",
                description:
                  "Track revenue metrics, manage recurring payments, and generate financial reports.",
                features: [
                  "Financial KPIs",
                  "Payment Status Overview",
                  "Expense Reports",
                ],
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Project Manager",
                description:
                  "Monitor project performance, track milestones, and manage resource allocation.",
                features: [
                  "Project Metrics",
                  "Resource Allocation",
                  "Timeline Tracking",
                ],
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Client Manager",
                description:
                  "Manage client profiles, organize documents, and track client communications.",
                features: [
                  "Client Profiles",
                  "Document Management",
                  "Communication History",
                ],
              },
            ].map((role, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-orange-100"
              >
                <div className="text-orange-600 mb-4 bg-orange-50 p-3 rounded-full w-fit">
                  {role.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{role.title}</h3>
                <p className="text-gray-600 mb-4">{role.description}</p>
                <ul className="space-y-2">
                  {role.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <span className="mr-2 text-orange-500">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful tools to streamline your business operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Interactive Analytics",
                description:
                  "Real-time data visualization and business intelligence",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Role-Based Security",
                description: "Secure access control for different user roles",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Real-Time Notifications",
                description:
                  "Stay updated with payment reminders and project alerts",
              },
              {
                icon: <DollarSign className="w-6 h-6" />,
                title: "Financial Tracking",
                description:
                  "Comprehensive tools for managing payments and expenses",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-orange-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
