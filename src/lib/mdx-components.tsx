import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

function MdxLink({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  if (isInternalHref(href)) {
    return (
      <Link href={href} className="font-medium text-brand underline underline-offset-4">
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-brand underline underline-offset-4"
      {...props}
    >
      {children}
    </a>
  );
}

function MdxImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;
  return (
    <span className="my-6 block overflow-hidden rounded-xl border border-border">
      <Image
        src={src}
        alt={alt ?? ""}
        width={1200}
        height={675}
        className="h-auto w-full"
      />
    </span>
  );
}

const calloutStyles = {
  info: "border-brand/30 bg-brand/5 text-foreground",
  warning: "border-amber-500/30 bg-amber-500/5 text-foreground",
  success: "border-emerald-500/30 bg-emerald-500/5 text-foreground",
};

const calloutIcons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle2,
};

export function Callout({
  type = "info",
  children,
}: {
  type?: keyof typeof calloutStyles;
  children: ReactNode;
}) {
  const Icon = calloutIcons[type];
  return (
    <div className={cn("my-6 flex gap-3 rounded-lg border px-4 py-3 text-sm", calloutStyles[type])}>
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="[&>p]:m-0 [&>p+p]:mt-2">{children}</div>
    </div>
  );
}

export const mdxComponents = {
  a: MdxLink,
  img: MdxImage,
  Callout,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-brand/40 bg-muted/50 py-2 pl-4 text-muted-foreground italic"
      {...props}
    />
  ),
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mt-10 scroll-mt-24 text-3xl font-semibold tracking-tight" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 scroll-mt-24 border-b border-border pb-2 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="leading-7 [&:not(:first-child)]:mt-4" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-4 ml-6 list-disc space-y-2" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-4 ml-6 list-decimal space-y-2" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="border-b border-border bg-muted px-4 py-2 text-left font-medium" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-border px-4 py-2" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => <hr className="my-8 border-border" {...props} />,
};
