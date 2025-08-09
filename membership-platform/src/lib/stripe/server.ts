import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export const getStripeCustomer = async (email: string) => {
  const customers = await stripe.customers.list({
    email,
    limit: 1,
  });

  return customers.data[0] || null;
};

export const createStripeCustomer = async (email: string, userId: string) => {
  return await stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  });
};