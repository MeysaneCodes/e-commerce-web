export const ROUTES  = {
    HOME: "/",
    LOGIN: "/myaccount/auth/login",
    SIGNUP: "/myaccount/auth/signup",
    PRODUCT: (slug:string) => `products/${slug}`,
    CHECKOUT_CART: "/checkout",
    MY_PROFILE: "myaccount/profile",
    ABOUT_US : "/aboutus",
    NOT_FOUND: "/not-found",
}