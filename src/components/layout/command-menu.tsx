"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { FileText, FolderGit2, Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import type { SearchItem } from "@/lib/search";

export function CommandMenu({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const fuse = useMemo(
    () => new Fuse(items, { keys: ["title", "description", "tags"], threshold: 0.35 }),
    [items],
  );

  const results = query ? fuse.search(query).map((r) => r.item) : items;
  const projectResults = results.filter((r) => r.type === "project");
  const postResults = results.filter((r) => r.type === "post");

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function onSelect(url: string) {
    setOpen(false);
    setQuery("");
    router.push(url);
  }

  return (
    <>
      <Button
        variant="outline"
        aria-label="Abrir buscador"
        className="relative h-9 w-9 justify-start gap-2 px-0 text-sm text-muted-foreground sm:w-56 sm:px-3"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        <span className="hidden sm:inline-flex">Buscar…</span>
        <kbd className="pointer-events-none absolute right-2 hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium select-none sm:flex">
          ⌘K
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Buscar"
        description="Buscar proyectos y posts del blog"
      >
        <CommandInput
          placeholder="Buscar proyectos y posts…"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>Sin resultados.</CommandEmpty>
          {projectResults.length > 0 && (
            <CommandGroup heading="Proyectos">
              {projectResults.map((item) => (
                <CommandItem key={item.url} value={item.title} onSelect={() => onSelect(item.url)}>
                  <FolderGit2 />
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {postResults.length > 0 && (
            <CommandGroup heading="Blog">
              {postResults.map((item) => (
                <CommandItem key={item.url} value={item.title} onSelect={() => onSelect(item.url)}>
                  <FileText />
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
