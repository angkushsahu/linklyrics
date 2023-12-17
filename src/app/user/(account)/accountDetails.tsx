"use client";

export default function AccountDetails() {
   const user = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      joinedOn: "12th September, 2023",
   };

   return (
      <section>
         <p>
            <span className="text-muted-foreground">Name:</span> {user.name}
         </p>
         <p>
            <span className="text-muted-foreground">E-mail:</span> {user.email}
         </p>
         <p>
            <span className="text-muted-foreground">Joined on:</span> {user.joinedOn}
         </p>
      </section>
   );
}
