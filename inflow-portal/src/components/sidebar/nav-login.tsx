import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { LogInIcon } from 'lucide-react';
import Link from 'next/link';

export function NavLogin() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                    <Link href="/login">
                        <LogInIcon />
                        <span>Login</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}