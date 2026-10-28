import { Link, usePage } from '@inertiajs/react'
import { useLang } from '@/hooks/useLang';
import { useEffect, useState, useRef, useId } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export const LanguageSwitcher = ({ isReverse }) => {
    const lang = useLang();
    const { idiomas, idioma } = usePage().props
    const [open, setOpen] = useState(false);
    const listId = useId();
    const buttonRef = useRef(null);
    const currentCode = typeof idioma === 'string' ? idioma : idioma?.codigo;
    
    const wrapperRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div ref={wrapperRef} className="relative w-fit ml-auto"
            onKeyDown={(event) => {
                if (event.key === 'Escape' && open) {
                    event.preventDefault();
                    setOpen(false);
                    buttonRef.current?.focus();
                }
            }}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
            }}
        >
            <button
                ref={buttonRef}
                type="button"
                aria-expanded={open}
                aria-controls={listId}
                aria-label={lang("selecionarIdioma")}
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-2 font-secondary${isReverse ? ' text-black': ''}`}
            >
                {currentCode?.toUpperCase()}

                <FontAwesomeIcon
                    aria-hidden="true"
                    icon={faChevronDown}
                    className={`text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            <div id={listId} ref={contentRef} hidden={!open} className="absolute right-0 mt-2 w-max bg-white shadow overflow-hidden">
                {idiomas.map(locale => (
                    <Link
                        key={locale.codigo}
                        href={locale.url}
                        lang={locale.codigo}
                        hrefLang={locale.codigo}
                        aria-label={locale.nome || locale.codigo.toUpperCase()}
                        aria-current={locale.codigo === currentCode ? 'true' : undefined}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full"
                    >
                        <img src={`/site/img/flags/${locale.codigo}.png`} className="w-5 h-5" alt="" aria-hidden="true" />
                        <span className="font-secondary text-black">{locale.codigo.toUpperCase()}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
