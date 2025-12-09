// Types pour les paiements
export interface PaymentIntentData {
  amount: number;
  currency?: string;
  order_id?: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Récupérer le token d'authentification
 */
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required");
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const PaymentService = {
  /**
   * Créer un payment intent Stripe pour traiter un paiement
   */
  async createPaymentIntent(
    data: PaymentIntentData
  ): Promise<PaymentIntentResponse> {
    const res = await fetch(`${API_URL}/payments/checkout/payment-intent`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create payment intent");
    }

    return res.json();
  },

  /**
   * Confirmer un paiement après succès côté client
   */
  async confirmPayment(paymentIntentId: string): Promise<void> {
    const res = await fetch(`${API_URL}/payments/confirm`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ payment_intent_id: paymentIntentId }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to confirm payment");
    }
  },
};
