import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const order = await razorpay.orders.create({
      amount: 1900 * 100, // ₹19 in paise
      currency: 'INR',
      receipt: `receipt_pro_${Date.now()}`,
      notes: {
        plan: 'Pro Monthly Subscription',
      },
    });

    res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('[RAZORPAY_ORDER_ERROR]', error);
    res.status(500).json({ message: 'Failed to create Razorpay order' });
  }
}