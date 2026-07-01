import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Compass className="size-10 text-muted-foreground" />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">404</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        No encontré esta página. Puede que se haya movido o nunca haya existido.
      </p>
      <Button className="mt-8" nativeButton={false} render={<Link href="/" />}>
        <ArrowLeft className="size-4" />
        Volver al inicio
      </Button>
    </Container>
  );
}
