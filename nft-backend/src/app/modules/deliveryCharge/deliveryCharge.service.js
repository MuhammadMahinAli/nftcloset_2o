import Stripe from "stripe";
import { DeliveryCharge } from "./deliveryCharge.model.js";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ---------- create payment and store stripe
export const createPaymentSessionService = async (paymentData) => {
  const { paidAmount, status, paidBy, chargeFor } = paymentData;
  console.log(paymentData);
  //console.log("Paym", paymentData);
  try {
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Delivery charge for order id ${chargeFor}`, // Product details
              description: ` Sender ID: ${paidBy}`, // Include sender and receiver in the description
            },
            unit_amount: paidAmount * 100, // Stripe expects the amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`, // Use session ID in the success URL
      cancel_url: `http://localhost:5173/funding-failed`,
      metadata: { paidAmount, status, paidBy, chargeFor }, // Include metadata for later use
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error("Error creating payment session:", error);
    throw error;
  }
};

export const confirmPaymentService = async (sessionId) => {
  try {
    // Retrieve session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    // Check if payment was successful
    if (session.payment_status !== "paid") {
      throw new Error("Payment was not successful");
    }

    const { paidAmount, status, paidBy, chargeFor } =
      session.metadata;
    // console.log("session", session.metadata);

   // Check for existing proposal to prevent duplicates
    const existingProposal = await DeliveryCharge.findOne({
        paidAmount, status, paidBy, chargeFor
    });

    if (existingProposal) {
      throw new Error("Payment proposal already exists");
    }

    // Save the funding proposal to the database after successful payment
    const fundProposal = await DeliveryCharge.create({
        paidAmount, status, paidBy, chargeFor
    });

    return { message: "Payment successful and proposal created", fundProposal };
  } catch (error) {
    console.error("Error confirming payment:", error);
    throw error;
  }
};

//--------- get all fundProposal 

export const getAllStripeFundRequestService = async () => {
  const fundRequests = await DeliveryCharge.find({ })
    .populate("requestedBy")
    .populate("requestedTo")
    .sort({ createdAt: -1 });
  return fundRequests;
};
//--------- get fundProposal by project Id

export const getAllFundRequestByProjectService = async (id) => {
  const fundRequests = await DeliveryCharge.find({ projectId: id })
    .populate("requestedBy")
    .populate("requestedTo")
    .populate("projectId")
    .sort({ createdAt: -1 });
  return fundRequests;
};

//--------- get sent fundProposal [ requestedby ]

export const getAllFundRequestByRequestedByService = async (id) => {
  const sentFundRequests = await DeliveryCharge.find({ requestedBy: id })
    .populate("requestedBy")
    .populate("requestedTo")
    .populate("projectId")
    .sort({ createdAt: -1 });
  return sentFundRequests;
};
//--------- get recieve fundProposal [ requestedTo ]

export const getAllFundRequestByRequestedToService = async (id) => {
  const recieveFundRequests = await DeliveryCharge.find({ requestedTo: id })
  .populate("requestedBy")
  .populate("requestedTo")
  .sort(
    { createdAt: -1 }
  );
  return recieveFundRequests;
};

//--------- delete fund request

export const deleteFundRequestService = async(id)=>{
  const result = await DeliveryCharge.findByIdAndDelete({_id:id});
  return result;
};

  //--------- update status
  export const updateStripeFundStatusService = async (id, status) => {
    const updatedStripeFundStatus = await DeliveryCharge.findById({
      _id: id,
    });
  
    if (!updatedStripeFundStatus) {
      throw new ApiError(httpStatus.NOT_FOUND, "Bank Transfer Fund not found");
    }
    updatedStripeFundStatus.status = status;
    await updatedStripeFundStatus.save();
    return updatedStripeFundStatus;
  };