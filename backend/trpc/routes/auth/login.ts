import { z } from "zod";
import { publicProcedure } from "../../create-context";

// Function to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export default publicProcedure
  .input(z.object({ phoneNumber: z.string().min(10).max(10) }))
  .mutation(async ({ input }) => {
    try {
      // Generate OTP
      const otp = generateOTP();
      
      // In a real app, you would store this OTP in a database
      // and associate it with the phone number
      
      // For demo purposes, we'll just return the OTP
      // In production, you would send this via SMS/WhatsApp
      return {
        success: true,
        message: "OTP sent successfully",
        otp: otp, // In production, don't return this
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to send OTP",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  });