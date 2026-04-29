const Razorpay = require('razorpay');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // SECURITY WARNING: Hardcoding secrets is dangerous. 
  // We use Vercel environment variables as priority, with the provided keys as fallback.
  // The user should define RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel Dashboard.
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_SjF2ykfo6N8E6m',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'opAj2xsCgDf33UOgGt4vuyp3'
  });

  try {
    // We are hardcoding the amount to 5000 INR as requested for the E-commerce website package.
    const options = {
      amount: 5000 * 100, // amount in smallest currency unit (paise for INR)
      currency: "INR",
      receipt: `rcptid_${Math.floor(Math.random() * 100000)}`
    };

    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      success: true,
      order: order,
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_SjF2ykfo6N8E6m' // We send the key_id to the frontend to initialize the widget
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      error: 'Failed to create order',
      details: error.message
    });
  }
};
