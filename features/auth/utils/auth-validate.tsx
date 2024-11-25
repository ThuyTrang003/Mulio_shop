import { z } from "zod";

// Định nghĩa schema cho User, nhiều thông tin khác
const UserSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters long")
        .max(30, "fullname must not be more than 30 characters long"),

    email: z.string().email("Invalid email"),
    phoneNumber: z.string().regex(/^(03|05|07|08|09)\d{8}$/, {
        message: "Invalid phone number format",
    }),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(255, "Password must not be more than 255 characters long")
        .refine(
            (value) => {
                // Kiểm tra có ít nhất 1 chữ cái viết hoa
                const hasUpperCase = /[A-Z]/.test(value);
                // Kiểm tra có ít nhất 1 chữ cái viết thường
                const hasLowerCase = /[a-z]/.test(value);
                // Kiểm tra có ít nhất 1 ký tự đặc biệt
                const hasSpecialChar = /[@$!%*#?&]/.test(value);

                return hasUpperCase && hasLowerCase && hasSpecialChar;
            },
            {
                message:
                    "Password must have contains at least 1 upcase letter, 1 lowercase letter and one special character",
            },
        ),
});

// Định nghĩa AuthDTO với các schema cho đăng nhập và đăng ký
export class AuthDTO {
    public static signinSchema = UserSchema.pick({
        email: true,
        password: true,
    });

    public static signupSchema = UserSchema.pick({
        username: true,
        email: true,
        password: true,
    })
        .extend({
            confirmPassword: z
                .string()
                .min(6, "Password must be at least 6 characters long"),
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ["confirmPassword"],
            message: "Passwords must match",
        });

    public static usernameSchema = UserSchema.pick({
        username: true,
    });
}

export type Signin = z.infer<typeof AuthDTO.signinSchema>;
export type Signup = z.infer<typeof AuthDTO.signupSchema>;
export type Username = z.infer<typeof AuthDTO.usernameSchema>;
