import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    console.log("New Appointment Request:", data);
    
    // In a real application, you would use a service like Resend, SendGrid, or Nodemailer
    // to send an actual email to alneval20@gmail.com
    
    /*
    Example with a hypothetical email service:
    await emailService.send({
      to: 'alneval20@gmail.com',
      subject: 'Yeni Randevu Talebi: ' + data.name,
      text: `
        Yeni bir randevu talebi geldi:
        
        İsim: ${data.name}
        E-posta: ${data.email}
        Telefon: ${data.phone}
        Hizmet: ${data.service}
        Tercih Edilen Tarih: ${data.preferredDate}
        Mesaj: ${data.message}
      `
    });
    */

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notification API error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
