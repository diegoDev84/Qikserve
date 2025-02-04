//src/app/contact/page.tsx
"use client";
import React from "react";
import { BiMailSend } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { useRestaurantContext } from "../../context/RestaurantProvider";
/**
 * ContactPage component renders the contact section of the application.
 *
 * @component
 * @example
 * return (
 *   <ContactPage />
 * )
 *
 * @remarks
 * This component uses the useRestaurantContext to retrieve restaurant data
 * and its associated webSettings. If the restaurant data is not available, it renders
 * a "No data" message. When data is available, it displays contact information for email
 * and WhatsApp, utilizing icons (e.g., BiMailSend, BsWhatsapp) styled according to the
 * primaryColour defined in webSettings.
 *
 * @returns JSX.Element - A React element containing the styled contact section.
 */

export default function ContactPage() {
  const { restaurant } = useRestaurantContext();

  if (!restaurant) return <div>No data</div>;

  const { webSettings } = restaurant;

  return (
    <div className="container p-5 bg-light">
      <div className="text-center" style={{ color: webSettings.primaryColour }}>
        <div className="text-center fw-bold fs-3">Fale conosco</div>
        <div className="text-center fw-light fs-6 mb-2">
          Entre em contato conosco para obter mais informações.
        </div>
      </div>
      <div className="row justify-content-center gap-3 mt-3">
        <div className="col-lg-4 col-md-6 bg-white border rounded">
          <div className="contact-info-box d-flex align-items-center h-100">
            <BiMailSend size={100} color={webSettings.primaryColour} />
            <div className="text-start ms-3">
              <h3>Email</h3>
              <p>
                <a
                  href="mailto:diegofpetry@gmail.com"
                  style={{ color: webSettings.primaryColour }}
                >
                  diegofpetry@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 bg-white border rounded">
          <div className="contact-info-box d-flex align-items-center h-100">
            <BsWhatsapp size={100} color={webSettings.primaryColour} />
            <div className="text-start ms-3">
              <h3>WhatsApp</h3>
              <p>
                <a
                  href="https://wa.me/5551982188221?text=Olá, gostaria de saber mais sobre o seu trabalho."
                  target="_blank"
                  style={{ color: webSettings.primaryColour }}
                >
                  51 98218-8221
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
