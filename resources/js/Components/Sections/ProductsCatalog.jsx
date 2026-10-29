import { accessibleText } from "@/lib/accessibleText";
import { useLang } from "@/hooks/useLang";
import { Link, router } from "@inertiajs/react";
import { useEffect, useId, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { Title } from "../UI/Title";

const PRODUCTS_PER_PAGE = 8;

const normalize = (value) =>
    String(value ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

export const ProductsCatalog = ({ categoria, categoriasMenu = [] }) => {
    const lang = useLang();
    const searchId = useId();
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const catalogRef = useRef(null);

    useEffect(() => {
        setPage(0);
    }, [categoria?.id, query]);
    const products = (categoria?.produtos ?? []).flatMap(
        (group) => group.produtos ?? [],
    );
    const filtered = products.filter((product) =>
        normalize(product.nome).includes(normalize(query)),
    );
    const pageCount = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
    const currentPage = Math.min(page, Math.max(0, pageCount - 1));
    const visibleProducts = filtered.slice(
        currentPage * PRODUCTS_PER_PAGE,
        (currentPage + 1) * PRODUCTS_PER_PAGE,
    );
    const pageLinkClass =
        "flex size-7 cursor-pointer items-center justify-center rounded-full border border-white/15 font-admin text-xs text-white/50 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:size-8 md:text-sm";

    const selectCategory = (id) => {
        if (String(id) === String(categoria?.id)) return;
        router.get(
            route("Produtos.index"),
            { categoria: id },
            {
                preserveScroll: true,
                preserveState: true,
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
            },
        );
    };

    return (
        <section
            ref={catalogRef}
            className="py-12 md:py-20 2xl:py-28"
            aria-label={lang("catalogoVinhos")}
        >
            <div className="container mx-auto max-w-medium">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center lg:gap-12">
                    <div
                        role="group"
                        aria-label={lang("categoriasVinhos")}
                        className="flex max-w-full flex-wrap self-start rounded-3xl bg-white/20 p-0.5"
                    >
                        {categoriasMenu.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => selectCategory(item.id)}
                                aria-pressed={
                                    String(categoria?.id) === String(item.id)
                                }
                                disabled={loading}
                                className={`rounded-full border px-4 py-2.5 font-admin text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait md:px-6 md:text-sm ${String(categoria?.id) === String(item.id) ? "border-white/60 bg-primary text-white" : "border-transparent text-white/60 hover:text-white"}`}
                            >
                                {item.nome}
                            </button>
                        ))}
                    </div>

                    <form
                        role="search"
                        className="flex w-full gap-3 lg:max-w-[580px]"
                        onSubmit={(event) => {
                            event.preventDefault();
                            setQuery(search);
                        }}
                    >
                        <label htmlFor={searchId} className="sr-only">
                            {lang("buscarRotulo")}
                        </label>
                        <input
                            id={searchId}
                            type="search"
                            value={search}
                            onChange={(event) => {
                                setSearch(event.target.value);
                                if (!event.target.value) setQuery("");
                            }}
                            placeholder={lang("buscarRotulo")}
                            className="min-w-0 flex-1 rounded-full border border-secondary bg-white px-5 py-2.5 font-admin text-sm text-black placeholder:text-neutral-400 focus:border-primary focus:ring-primary"
                        />
                        <button
                            type="submit"
                            className="rounded-full bg-primary px-6 py-2.5 font-admin text-sm text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:px-10"
                        >
                            {lang("buscar")}
                        </button>
                    </form>
                </div>

                <div
                    aria-busy={loading}
                    className={`mt-10 grid gap-x-5 gap-y-14 grid-cols-2 lg:grid-cols-4 md:mt-14 md:gap-y-20 ${loading ? "opacity-50" : ""}`}
                >
                    {visibleProducts.map((product) => (
                        <article key={product.id} className="min-w-0">
                            <Link
                                href={route("Produtos.produto", {
                                    slug: product.slug,
                                })}
                                aria-label={`Ver vinho ${product.nome || ""}`}
                                className="group relative flex aspect-[233/250] 2xl:aspect-[233/300] items-center justify-center overflow-hidden rounded-xl border border-primary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                            >
                                <img
                                    src={product.imagem}
                                    alt={accessibleText(product.nome || "")}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                                />
                                
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <img
                                        src={product.imagem_alt}
                                        alt={product.nome || ""}
                                        loading="lazy"
                                        aria-hidden="true"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </Link>

                            <p className="mt-5 font-admin text-xs text-white/80 md:text-sm">
                                {categoria?.nome}
                            </p>
                            <Title tag="h4" className="italic !text-primary" variant="h4" html={product.nome} />
                            <Link
                                href={route("Produtos.produto", {
                                    slug: product.slug,
                                })}
                                className="mt-4 inline-block font-admin text-xs text-white/80 underline underline-offset-4 transition hover:text-primary md:text-sm"
                            >
                                {lang("verVinho")} <span aria-hidden="true">→</span>
                            </Link>
                        </article>
                    ))}
                </div>
                {!filtered.length && (
                    <p
                        role="status"
                        className="py-12 text-center font-admin text-white/60"
                    >
                        {query
                            ? lang("nenhumVinhoBusca")
                            : lang("nenhumVinhoCategoria")}
                    </p>
                )}
                {pageCount > 1 && (
                    <nav
                        aria-label={lang("paginacaoVinhos")}
                        className="mt-12 md:mt-16"
                    >
                        <ReactPaginate
                            pageCount={pageCount}
                            forcePage={currentPage}
                            onPageChange={({ selected }) => {
                                setPage(selected);
                                catalogRef.current?.scrollIntoView({
                                    behavior: window.matchMedia(
                                        "(prefers-reduced-motion: reduce)",
                                    ).matches
                                        ? "auto"
                                        : "smooth",
                                    block: "start",
                                });
                            }}
                            onClick={() => (loading ? false : undefined)}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            previousLabel={null}
                            nextLabel={null}
                            previousClassName="hidden"
                            nextClassName="hidden"
                            breakLabel="…"
                            breakAriaLabels={{
                                forward: lang("avancarPaginas"),
                                backward: lang("voltarPaginas"),
                            }}
                            ariaLabelBuilder={(number) => lang("numeroPagina", number)}
                            containerClassName="flex items-center justify-center gap-2"
                            pageLinkClassName={pageLinkClass}
                            breakLinkClassName={pageLinkClass}
                            activeLinkClassName="!border-primary !bg-primary !text-white"
                            renderOnZeroPageCount={null}
                        />
                    </nav>
                )}
            </div>
        </section>
    );
};
