import { PropsWithChildren } from "react";

export default function UserFormLayout({ children }: PropsWithChildren) {
   return (
      <main className="min-h-[80vh] flex items-center justify-center py-6 px-4">
         <div className="max-w-md w-full">{children}</div>
      </main>
   );
}
