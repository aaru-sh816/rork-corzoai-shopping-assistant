import { z } from "zod";
import { publicProcedure } from "../../create-context";

export default publicProcedure
  .input(z.object({ 
    phoneNumber: z.string().min(10).max(10),
    otp: z.string().length(6)
  }))
  .mutation(async ({ input }) => {
    try {
      // In a real app, you would verify the OTP against what's stored in the database
      // For demo purposes, we'll just simulate a successful verification
      
      return {
        success: true,
        message: "OTP verified successfully",
        user: {
          id: Date.now().toString(),
          phoneNumber: input.phoneNumber,
          name: "Demo User",
        },
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to verify OTP",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  });