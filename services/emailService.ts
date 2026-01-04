import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

interface DonationEmailParams {
  creatorEmail: string;
  donorName: string;
  donorEmail?: string;
  coffeeCount: number;
  message?: string;
}

export const sendDonationEmail = async ({
  creatorEmail,
  donorName,
  donorEmail,
  coffeeCount,
  message
}: DonationEmailParams): Promise<boolean> => {
  try {
    const totalAmount = coffeeCount * 5000;
    const currentDate = new Date().toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Email template parameters
    const templateParams = {
      to_email: creatorEmail,
      donor_name: donorName,
      donor_email: donorEmail || '미제공',
      coffee_count: coffeeCount,
      total_amount: totalAmount.toLocaleString(),
      donation_message: message || '(메시지 없음)',
      donation_date: currentDate,
      subject: `[커피 후원] ${donorName}님이 ${coffeeCount}잔의 커피를 후원했어요! ☕️`
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      console.log('✅ Email sent successfully!', response);
      return true;
    } else {
      console.error('❌ Email sending failed:', response);
      return false;
    }
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
};
