import React from 'react'

type LegalDocumentProps = {
  title: string
  description?: string
  updatedAt?: string
  content: string
}

type ListBlock = {
  type: 'ol' | 'ul'
  items: string[]
}

export function LegalDocument({ title, description, updatedAt, content }: LegalDocumentProps) {
  const blocks = formatBlocks(content)

  return (
    <article className="space-y-8 text-base leading-7 text-zinc-700 dark:text-zinc-200">
      <header className="mb-2 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600 dark:text-emerald-400">
          Official Policy
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">{title}</h1>
        {description && (
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">{description}</p>
        )}
        {updatedAt && (
          <p className="mt-1 text-sm font-semibold italic text-zinc-500 dark:text-zinc-400">
            Last updated {updatedAt}
          </p>
        )}
      </header>
      <div className="space-y-5">{blocks}</div>
    </article>
  )
}

function formatBlocks(content: string): React.ReactNode[] {
  return content
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((segment, index) => formatBlock(segment.trim(), index))
    .filter(notEmpty)
}

function formatBlock(block: string, index: number): React.ReactNode | null {
  if (!block) {
    return null
  }

  if (isMajorHeading(block)) {
    return (
      <h2
        key={`heading-${index}`}
        className="pt-6 text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400"
      >
        {block}
      </h2>
    )
  }

  if (isSubheading(block)) {
    const label = block.replace(/:$/, '')
    return (
      <h3 key={`subheading-${index}`} className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
        {label}
      </h3>
    )
  }

  if (/^Last Modified:/i.test(block)) {
    const [label, ...rest] = block.split(':')
    return (
      <p key={`meta-${index}`} className="text-sm font-semibold italic text-zinc-500 dark:text-zinc-400">
        <span className="font-bold">{label}:</span> {rest.join(':').trim()}
      </p>
    )
  }

  if (isNotice(block)) {
    return (
      <p
        key={`notice-${index}`}
        className="rounded-2xl bg-amber-50 p-4 text-sm font-semibold italic text-amber-900 dark:bg-amber-900/20 dark:text-amber-200"
      >
        {normalize(block)}
      </p>
    )
  }

  if (/^Read more$/i.test(block)) {
    return (
      <p key={`cta-${index}`} className="text-sm font-semibold italic text-emerald-600 dark:text-emerald-400">
        Read more →
      </p>
    )
  }

  const list = parseList(block)
  if (list) {
    if (list.type === 'ol') {
      return (
        <ol key={`list-${index}`} className="ml-6 list-decimal space-y-2">
          {list.items.map((item, itemIndex) => (
            <li key={`list-${index}-${itemIndex}`}>{normalize(item)}</li>
          ))}
        </ol>
      )
    }
    return (
      <ul key={`list-${index}`} className="ml-6 list-disc space-y-2">
        {list.items.map((item, itemIndex) => (
          <li key={`list-${index}-${itemIndex}`}>{normalize(item)}</li>
        ))}
      </ul>
    )
  }

  return (
    <p key={`paragraph-${index}`}>{normalize(block)}</p>
  )
}

function parseList(block: string): ListBlock | null {
  const lines = block
    .split('\n')
    .map((raw) => ({ raw, trimmed: raw.trim() }))
    .filter(({ trimmed }) => trimmed.length > 0)

  if (lines.length <= 1) {
    return null
  }

  const ordered = lines.every(({ trimmed }) => /^\(?\d+\)?[.)]?/.test(trimmed))
  if (ordered) {
    const items = lines.map(({ trimmed }) => trimmed.replace(/^\(?\d+\)?[.)]?\s*/, ''))
    return { type: 'ol', items }
  }

  const bulletFriendly = lines.every(({ trimmed, raw }) => /^[-*•]/.test(trimmed) || raw.startsWith('    '))
  if (bulletFriendly) {
    const items = lines.map(({ trimmed }) => trimmed.replace(/^[-*•]\s*/, ''))
    return { type: 'ul', items }
  }

  return null
}

function normalize(value: string): string {
  return value.replace(/\s*\n\s*/g, ' ').replace(/\s{2,}/g, ' ').trim()
}

function isMajorHeading(text: string): boolean {
  const trimmed = text.trim()
  if (!trimmed) {
    return false
  }
  if (/^Read more$/i.test(trimmed)) {
    return false
  }
  const wordCount = trimmed.split(/\s+/).length
  if (wordCount > 16) {
    return false
  }
  if (/^\d+\./.test(trimmed)) {
    return true
  }
  const letters = trimmed.replace(/[^A-Za-z]/g, '')
  if (!letters) {
    return false
  }
  if (letters === letters.toUpperCase()) {
    return true
  }
  if (!/[.?!]/.test(trimmed)) {
    const capitalizedWords = trimmed
      .split(/\s+/)
      .filter(Boolean)
      .filter((word) => /^[A-Z][A-Za-z0-9'()/-]*$/.test(word))
    return capitalizedWords.length / wordCount > 0.7
  }
  return false
}

function isSubheading(text: string): boolean {
  const trimmed = text.trim()
  return trimmed.endsWith(':') && trimmed.length <= 140
}

function isNotice(text: string): boolean {
  const trimmed = text.trim()
  if (/^(WE CAUTION YOU|DO NOT SEND|THE SITE RESERVES|WE HAVE A POLICY)/i.test(trimmed)) {
    return true
  }
  const letters = trimmed.replace(/[^A-Za-z]/g, '')
  return letters.length > 0 && letters === letters.toUpperCase() && trimmed.length > 40
}

function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}
