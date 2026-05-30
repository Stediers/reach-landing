import { Metadata } from "next";

// The page itself is a client component and can't export metadata, so the
// self-canonical lives here to stop it inheriting the homepage canonical.
export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.reachgig.com/compliance/account-deletion",
  },
};

export default function AccountDeletionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
