"use client";

import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYelp } from "react-icons/fa";

export default function OfficeDetails() {
  const office = {
    title: "VR Tax CPA LLC — Irving Office",
    address: "3035 Ivy Hill Lane, Irving, TX 75063",
    phone: "+1 (469) 471-6580",
    email: "info@vrtaxcpa.com",
    hours: "Mon–Fri: 9:00 AM – 5:30 PM CST",
  };

  const socials = [
    { name: "Instagram", icon: <FaInstagram />, href: "https://instagram.com/vstaxcpa" },
    { name: "Facebook", icon: <FaFacebookF />, href: "https://facebook.com/Vstaxcpallc" },
    { name: "LinkedIn", icon: <FaLinkedinIn />, href: "https://linkedin.com/company/vstaxcpa" },
    { name: "Yelp", icon: <FaYelp />, href: "https://yelp.com/biz/vs-tax-cpa" },
  ];

  return (
    <section id="office" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16">

        {/* Office Details Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center rounded-full bg-[#0B1F3B]/8 text-[#0B1F3B] px-4 py-2 text-xs font-bold uppercase tracking-widest border border-[#C5A880]/30 mb-4 font-figtree">
            Our Location
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
            Visit or Contact Our Irving, TX Office
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mt-3 font-manrope">
            Serving individuals and business owners across Irving, Dallas-Fort Worth, and nationwide through our secure virtual client portal.
          </p>
        </div>

        {/* Card & Map Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto w-full">
          
          {/* Office Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#0B1F3B]/8 text-[#0B1F3B] flex items-center justify-center flex-shrink-0">
                  <FiMapPin size={22} className="text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-figtree text-[#0B1F3B]">{office.title}</h3>
                  <p className="text-xs text-slate-500 font-semibold">Professional Tax &amp; Advisory Services</p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3 text-sm">
                  <FiMapPin className="text-[#C5A880] mt-1 flex-shrink-0" size={16} />
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Address</span>
                    <span className="text-slate-700 font-medium leading-relaxed">{office.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <FiPhone className="text-[#C5A880] mt-1 flex-shrink-0" size={16} />
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Phone Number</span>
                    <a href={`tel:${office.phone.replace(/[^0-9+]/g, '')}`} className="text-[#0B1F3B] font-bold hover:text-[#C5A880] transition-colors">
                      {office.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <FiMail className="text-[#C5A880] mt-1 flex-shrink-0" size={16} />
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Official Email</span>
                    <a href={`mailto:${office.email}`} className="text-[#0B1F3B] font-bold hover:text-[#C5A880] transition-colors break-all">
                      {office.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <FiClock className="text-[#C5A880] mt-1 flex-shrink-0" size={16} />
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Business Hours</span>
                    <span className="text-slate-700 font-medium">{office.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="pt-6 border-t border-slate-100">
              <span className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider block mb-3 font-figtree">
                Connect With Us
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:text-white hover:bg-[#0B1F3B] hover:border-[#0B1F3B] transition-all duration-300"
                  >
                    <span>{s.icon}</span>
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 shadow-xl min-h-[380px] relative bg-slate-100"
          >
            <iframe
              src="https://maps.google.com/maps?q=3035+Ivy+Hill+Lane,+Irving,+TX+75063&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VR Tax CPA LLC Irving Office Map"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
