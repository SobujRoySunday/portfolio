import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE, verifyAuthToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // The real gate. Middleware only checks that a cookie exists; here the
    // signature and expiry are verified before any dashboard UI is rendered.
    const token = cookies().get(AUTH_COOKIE)?.value;

    if (!verifyAuthToken(token)) {
        // Via /api/logout so the stale cookie is cleared, otherwise middleware
        // would bounce us straight back here.
        redirect("/api/logout");
    }

    return (
        <>
            {children}
        </>
    )
}
