import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
    /* async redirects(){
      return [
          {
              source: '/myaccount/Auth/:path*',
              destination: '/myaccount/auth/:path*',
              permanent: false,
          }
      ]
    }*/
};

export default nextConfig;
