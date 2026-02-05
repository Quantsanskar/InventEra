"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { insertRegistration } from "@/lib/supabase";

export default function CampfireRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    whyCampfire: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value || value.length < 2) {
          return "Name must be at least 2 characters";
        }
        break;
      case "email":
        if (!value) {
          return "Email is required";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Invalid email format";
        }
        break;
      case "whatsapp":
        if (!value || value.length < 10) {
          return "WhatsApp number must be at least 10 characters";
        }
        break;
      case "whyCampfire":
        if (!value || value.length < 10) {
          return "Please tell us more (at least 10 characters)";
        }
        break;
      default:
        return null;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const triggerConfetti = () => {
    const count = 100;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        spread: 70,
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert registration into Supabase
      const result = await insertRegistration(formData);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to submit registration');
      }
      
      console.log("Registration successful");
      
      // Success!
      setIsSuccess(true);
      triggerConfetti();
    } catch (error) {
      console.error("Registration error:", error);
      alert('Registration failed. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="relative min-h-screen bg-[hsl(142,76%,11%)] text-white">
        {/* Fixed Background */}
        <div className="fixed inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/hero.png')" }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
            <div className="max-w-[1152px] mx-auto px-6 py-6 flex justify-between items-center">
              <Link href="/" className="text-xl font-medium hover:opacity-80 transition-opacity">
                Builder's Space
              </Link>
              <Link 
                href="/campfire" 
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                Back to Campfire
              </Link>
            </div>
          </nav>

          {/* Success Message */}
          <div className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-[576px] w-full text-center space-y-6">
              <div className="text-8xl mb-8">🔥</div>
              <h1 className="text-3xl md:text-4xl font-['League_Spartan'] font-bold">
                You're In
              </h1>
              <p className="prose-camp text-lg">
                We'll reach out on WhatsApp with details. See you at Lodhi Garden.
              </p>
              <div className="pt-8">
                <Link 
                  href="/campfire"
                  className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" /> Back to Campfire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[hsl(142,76%,11%)] text-white">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/hero.png')" }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
          <div className="max-w-[1152px] mx-auto px-6 py-6 flex justify-between items-center">
            <Link href="/" className="text-xl font-medium hover:opacity-80 transition-opacity">
              Builder's Space
            </Link>
            <Link 
              href="/campfire" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              Back to Campfire
            </Link>
          </div>
        </nav>

        {/* Registration Form */}
        <div className="min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-[576px] w-full">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-['League_Spartan'] font-bold mb-4">
                Register for Campfire
              </h1>
              <p className="text-gray-400">
                Join us at Lodhi Garden on 22 February
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your name"
                  className="w-full h-12 px-4 bg-white/5 border border-[hsl(142,40%,22%)] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                  required
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  className="w-full h-12 px-4 bg-white/5 border border-[hsl(142,40%,22%)] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                  required
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* WhatsApp Field */}
              <div>
                <label 
                  htmlFor="whatsapp" 
                  className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2"
                >
                  WhatsApp
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+91 98765 43210"
                  className="w-full h-12 px-4 bg-white/5 border border-[hsl(142,40%,22%)] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                  required
                />
                {errors.whatsapp && (
                  <p className="mt-2 text-sm text-red-400">{errors.whatsapp}</p>
                )}
              </div>

              {/* Why Campfire Field */}
              <div>
                <label 
                  htmlFor="whyCampfire" 
                  className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2"
                >
                  What are you building?
                </label>
                <textarea
                  id="whyCampfire"
                  name="whyCampfire"
                  value={formData.whyCampfire}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell us about yourself, what you're working on, or what brings you here..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-[hsl(142,40%,22%)] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white transition-all resize-none"
                  required
                />
                {errors.whyCampfire && (
                  <p className="mt-2 text-sm text-red-400">{errors.whyCampfire}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-white text-[hsl(142,76%,11%)] font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Register Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[hsl(142,40%,22%)] px-6 md:px-12 lg:px-20 py-12">
          <div className="max-w-[1152px] mx-auto">
            <div className="text-sm text-gray-400 text-center">
              © {new Date().getFullYear()} Builder's Space
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
