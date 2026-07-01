"use server";

import { Resend } from "resend";
import { siteConfig } from "@config/site";

export type ContactFormState = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return { success: false, message: "Completá todos los campos antes de enviar." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Ese email no parece válido." };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      success: false,
      message: `El formulario todavía no está conectado a un servicio de email. Escribime directo a ${siteConfig.email}.`,
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: siteConfig.email,
      replyTo: email,
      subject: `Nuevo mensaje de ${name} desde el portfolio`,
      text: `${message}\n\n— ${name} (${email})`,
    });

    if (error) {
      return {
        success: false,
        message: `Hubo un error enviando el mensaje. Escribime directo a ${siteConfig.email}.`,
      };
    }

    return { success: true, message: "¡Listo! Te voy a responder a la brevedad." };
  } catch {
    return {
      success: false,
      message: `Hubo un error enviando el mensaje. Escribime directo a ${siteConfig.email}.`,
    };
  }
}
