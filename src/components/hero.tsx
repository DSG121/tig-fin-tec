import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50 opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                  TigFin
                </span>{" "}
                Business Management System
              </h1>

              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                An all-in-one cloud platform for managing clients, finances,
                projects, and employees with real-time analytics.
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

              <div className="mt-16 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-orange-500" />
                  <span>Role-based dashboards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-orange-500" />
                  <span>Real-time notifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-orange-500" />
                  <span>Financial analytics</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
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
      </div>
    </div>
  );
}
