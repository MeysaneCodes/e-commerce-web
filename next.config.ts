import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

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

export default withFlowbiteReact(nextConfig);