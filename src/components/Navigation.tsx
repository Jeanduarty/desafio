'use client'

import { Gitlab, Info, UserPlus2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const pathName = usePathname()

  function activeLink(path: string) {
    if (path === pathName) {
      return true
    }
  }

  return (
    <nav className="flex items-center justify-center sm:flex-col h-full p-8">
      <div className="flex-1">
        <Link href="/">
          <Gitlab
            size={32}
            className={
              activeLink('/')
                ? 'text-emerald-300'
                : 'hover:text-emerald-300 transition-all'
            }
          />
        </Link>
      </div>
      <div className="flex sm:flex-col gap-12">
        <Link
          href="/register"
          className={
            activeLink('/register')
              ? 'text-emerald-300'
              : 'hover:text-emerald-300 transition-all'
          }
        >
          <UserPlus2 className="cursor-pointer" size={26} />
        </Link>

        <Link
          href="/about"
          className={
            activeLink('/about')
              ? 'text-emerald-300'
              : 'hover:text-emerald-300 transition-all'
          }
        >
          <Info size={26} className="cursor-pointer" />
        </Link>
      </div>
    </nav>
  )
}
