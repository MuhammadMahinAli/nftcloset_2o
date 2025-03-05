import { z } from "zod";
//user roles
const deliveryAddressSchema = z.object({
  homeAddress: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
  isDefault: z.boolean().optional(),
});
//
export const createMemberZodSchema = z.object({
  body: z
    .object({
      password: z.string({
        required_error: "Password is required",
      }),
      name: z.object({
        firstName: z.string({
          required_error: "First name is required",
        }),

        lastName: z.string({
          required_error: "Last name is required",
        }),
      }),
      email: z
        .string({
          required_error: "email is required",
        })
        .email(),
      phoneNumber: z.string({
        required_error: "Phone Number is required",
      }),
      uniqueId: z.string({
        required_error: "Unique Id is required",
      }),
      phoneNumberPrivacy: z.boolean().default(false),
      role: z.string().optional(),
      addresses: z.array(deliveryAddressSchema).optional(),
      addressPrivacy: z.boolean().default(false),
      country: z.string().optional(),
      profession: z.string().optional(),
      profilePic: z.string().optional(),
      coverPic: z.string().optional(),
      about: z.string().optional(),
      emailVerified: z.boolean().default(false),
      verificationToken: z.string().optional(),
    })
    .strict(),
});

//---------
export const updateMemberCoverPicZodSchema = z
  .object({
    body: z.object({
      coverPic: z.string({
        required_error: "Cover image is required",
      }),
    }),
  })
  .strict();
