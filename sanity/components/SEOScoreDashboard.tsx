import React from 'react'
import { useFormValue } from 'sanity'
import { Card, Stack, Text, Flex, Box, Badge } from '@sanity/ui'

// ─── Tipe Data ────────────────────────────────────────────────────────────────

interface ScoreItem {
  label: string
  earned: number
  max: number
  tip: string
}

interface ScoreResult {
  total: number
  items: ScoreItem[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function countTextBlocks(content: any[]): number {
  return content.filter((b: any) => b._type === 'block').length
}

function hasInternalLinks(content: any[]): boolean {
  return content.some((b: any) => {
    if (b._type !== 'block') return false
    return (b.markDefs || []).some((m: any) => m._type === 'internalLink')
  })
}

function hasHeadings(content: any[]): boolean {
  return content.some(
    (b: any) => b._type === 'block' && ['h2', 'h3', 'h4'].includes(b.style)
  )
}

function countTables(content: any[]): number {
  return content.filter((b: any) => b._type === 'tableBlock').length
}

function countFaqItems(content: any[]): number {
  return content
    .filter((b: any) => b._type === 'faqSection')
    .reduce((sum: number, b: any) => {
      return sum + (Array.isArray(b.items) ? b.items.length : 0)
    }, 0)
}

function hasFaqSection(content: any[]): boolean {
  return content.some((b: any) => b._type === 'faqSection')
}

function hasListBlocks(content: any[]): boolean {
  return content.some(
    (b: any) =>
      b._type === 'block' &&
      (b.listItem === 'bullet' || b.listItem === 'number')
  )
}

// ─── Kalkulasi GEO Score ──────────────────────────────────────────────────────

function calcGEO(content: any[], seo: any): ScoreResult {
  const items: ScoreItem[] = []

  // 1. Meta Title (10 pts)
  const hasMetaTitle = !!(seo?.metaTitle && seo.metaTitle.trim().length > 0)
  items.push({
    label: 'Meta Title',
    earned: hasMetaTitle ? 10 : 0,
    max: 10,
    tip: hasMetaTitle ? '✓ Sudah diisi' : 'Isi Meta Title di bagian SEO',
  })

  // 2. Meta Description (10 pts)
  const hasMetaDesc = !!(seo?.metaDescription && seo.metaDescription.trim().length > 20)
  items.push({
    label: 'Meta Description',
    earned: hasMetaDesc ? 10 : 0,
    max: 10,
    tip: hasMetaDesc ? '✓ Sudah diisi' : 'Isi Meta Description minimal 20 karakter',
  })

  // 3. Focus Keywords (10 pts)
  const kwCount = Array.isArray(seo?.seoKeywords) ? seo.seoKeywords.length : 0
  const kwScore = kwCount >= 3 ? 10 : kwCount >= 1 ? 5 : 0
  items.push({
    label: 'Focus Keywords',
    earned: kwScore,
    max: 10,
    tip:
      kwCount === 0
        ? 'Tambahkan minimal 1 keyword (ideal: 3–5)'
        : kwCount < 3
        ? `Ada ${kwCount} keyword, tambahkan lebih banyak`
        : `✓ ${kwCount} keyword terdefinisi`,
  })

  // 4. Tabel Data / Structured Data (20 pts)
  const tableCount = countTables(content)
  const tableScore = Math.min(tableCount * 10, 20)
  items.push({
    label: 'Tabel Data',
    earned: tableScore,
    max: 20,
    tip:
      tableCount === 0
        ? 'Tambahkan tabel data — AI search sangat menyukai data terstruktur'
        : tableCount === 1
        ? '✓ Ada 1 tabel — tambah lagi untuk nilai penuh'
        : `✓ ${tableCount} tabel terdeteksi`,
  })

  // 5. Kedalaman Konten (15 pts)
  const blockCount = countTextBlocks(content)
  const depthScore = blockCount >= 15 ? 15 : blockCount >= 10 ? 10 : blockCount >= 5 ? 5 : 0
  items.push({
    label: 'Kedalaman Konten',
    earned: depthScore,
    max: 15,
    tip:
      blockCount < 5
        ? `Konten terlalu pendek (${blockCount} blok). Ideal: 15+ blok teks`
        : blockCount < 10
        ? `${blockCount} blok teks — tambah lebih dalam`
        : `✓ ${blockCount} blok teks`,
  })

  // 6. Internal Links (15 pts)
  const hasLinks = hasInternalLinks(content)
  items.push({
    label: 'Internal Links',
    earned: hasLinks ? 15 : 0,
    max: 15,
    tip: hasLinks
      ? '✓ Ada internal link ke artikel lain'
      : 'Tambahkan Internal Link ke artikel/halaman lain yang relevan',
  })

  // 7. Struktur Heading (20 pts)
  const hasH = hasHeadings(content)
  items.push({
    label: 'Heading (H2/H3)',
    earned: hasH ? 20 : 0,
    max: 20,
    tip: hasH
      ? '✓ Heading terstruktur ditemukan'
      : 'Tambahkan heading H2/H3 untuk struktur konten yang jelas',
  })

  const total = items.reduce((s, i) => s + i.earned, 0)
  return { total, items }
}

// ─── Kalkulasi AEO Score ──────────────────────────────────────────────────────

function calcAEO(content: any[], seo: any, excerpt: string): ScoreResult {
  const items: ScoreItem[] = []

  // 1. Modul FAQ (25 pts)
  const hasFaq = hasFaqSection(content)
  items.push({
    label: 'Modul FAQ',
    earned: hasFaq ? 25 : 0,
    max: 25,
    tip: hasFaq
      ? '✓ Modul FAQ ditemukan — sangat baik untuk featured snippet'
      : 'Tambahkan Modul FAQ (Tanya Jawab) di dalam konten artikel',
  })

  // 2. Jumlah Pertanyaan FAQ (25 pts)
  const faqCount = countFaqItems(content)
  const faqScore = Math.min(faqCount * 5, 25)
  items.push({
    label: 'Jumlah FAQ Items',
    earned: faqScore,
    max: 25,
    tip:
      faqCount === 0
        ? 'Belum ada FAQ item'
        : faqCount < 3
        ? `${faqCount} FAQ — tambahkan hingga 5+ untuk nilai penuh`
        : `✓ ${faqCount} pertanyaan FAQ`,
  })

  // 3. Excerpt / Ringkasan (20 pts)
  const excerptLen = (excerpt || '').trim().length
  const excerptScore = excerptLen >= 80 ? 20 : excerptLen >= 30 ? 10 : 0
  items.push({
    label: 'Ringkasan (Excerpt)',
    earned: excerptScore,
    max: 20,
    tip:
      excerptLen === 0
        ? 'Isi Ringkasan artikel — ini sering digunakan sebagai answer snippet'
        : excerptLen < 80
        ? `Terlalu pendek (${excerptLen} karakter) — ideal: 80+ karakter`
        : `✓ Ringkasan terisi (${excerptLen} karakter)`,
  })

  // 4. Heading Struktur (15 pts)
  const hasH = hasHeadings(content)
  items.push({
    label: 'Heading Terstruktur',
    earned: hasH ? 15 : 0,
    max: 15,
    tip: hasH
      ? '✓ Heading H2/H3 terdeteksi — memudahkan AI memahami struktur jawaban'
      : 'Tambahkan heading H2/H3 sebagai pemisah topik',
  })

  // 5. List / Numbered Items (15 pts)
  const hasList = hasListBlocks(content)
  items.push({
    label: 'Poin / Daftar Bernomor',
    earned: hasList ? 15 : 0,
    max: 15,
    tip: hasList
      ? '✓ Bullet list atau numbered list ditemukan'
      : 'Gunakan bullet list atau angka — AI lebih mudah mengutip poin-poin terstruktur',
  })

  const total = items.reduce((s, i) => s + i.earned, 0)
  return { total, items }
}

// ─── Sub-komponen Skor ────────────────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 80
      ? '#10b981' // emerald
      : score >= 50
      ? '#f59e0b' // amber
      : '#ef4444' // red

  return (
    <Box
      style={{
        width: '100%',
        height: '8px',
        borderRadius: '4px',
        background: '#e5e7eb',
        overflow: 'hidden',
        marginTop: '4px',
      }}
    >
      <Box
        style={{
          width: `${score}%`,
          height: '100%',
          borderRadius: '4px',
          background: color,
          transition: 'width 0.4s ease',
        }}
      />
    </Box>
  )
}

function ScoreCircle({ score, label, color }: { score: number; label: string; color: string }) {
  return (
    <Flex direction="column" align="center" gap={2}>
      <Box
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `conic-gradient(${color} ${score * 3.6}deg, #e5e7eb 0deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box
          style={{
            width: 62,
            height: 62,
            borderRadius: '50%',
            background: '#1a1f2e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text size={3} weight="bold" style={{ color }}>
            {score}
          </Text>
        </Box>
      </Box>
      <Text size={1} weight="semibold" muted>
        {label}
      </Text>
    </Flex>
  )
}

function getGrade(score: number): { label: string; tone: 'positive' | 'caution' | 'critical' } {
  if (score >= 80) return { label: 'Sangat Baik', tone: 'positive' }
  if (score >= 60) return { label: 'Baik', tone: 'positive' }
  if (score >= 40) return { label: 'Cukup', tone: 'caution' }
  return { label: 'Perlu Perbaikan', tone: 'critical' }
}

// ─── Komponen Utama ───────────────────────────────────────────────────────────

export function SEOScoreDashboard(_props: any) {
  const content = (useFormValue(['content']) as any[]) || []
  const seo = (useFormValue(['seo']) as any) || {}
  const excerpt = (useFormValue(['excerpt']) as string) || ''

  const geo = calcGEO(content, seo)
  const aeo = calcAEO(content, seo, excerpt)

  const geoGrade = getGrade(geo.total)
  const aeoGrade = getGrade(aeo.total)

  return (
    <Stack space={4}>
      {/* Header */}
      <Card padding={4} radius={3} tone="transparent" border>
        <Stack space={4}>
          <Flex align="center" justify="space-between">
            <Stack space={1}>
              <Text size={2} weight="bold">
                🤖 Skor Optimasi AI
              </Text>
              <Text size={1} muted>
                Penilaian real-time berdasarkan konten artikel
              </Text>
            </Stack>
          </Flex>

          {/* Score Circles */}
          <Flex justify="space-around" align="center" gap={4} style={{ padding: '8px 0' }}>
            <ScoreCircle score={geo.total} label="GEO Score" color="#10b981" />
            <Stack space={2} style={{ textAlign: 'center' }}>
              <Text size={0} muted style={{ maxWidth: 120 }}>
                GEO = AI Search (ChatGPT, Perplexity, Google AI)
              </Text>
              <Text size={0} muted style={{ maxWidth: 120 }}>
                AEO = Answer Engine (Featured Snippet, Voice)
              </Text>
            </Stack>
            <ScoreCircle score={aeo.total} label="AEO Score" color="#6366f1" />
          </Flex>
        </Stack>
      </Card>

      {/* GEO Detail */}
      <Card padding={4} radius={3} border>
        <Stack space={3}>
          <Flex align="center" justify="space-between">
            <Text size={2} weight="semibold">
              GEO — Generative Engine Optimization
            </Text>
            <Flex align="center" gap={2}>
              <Badge tone={geoGrade.tone} mode="outline">
                {geoGrade.label}
              </Badge>
              <Text size={2} weight="bold" style={{ color: '#10b981' }}>
                {geo.total}/100
              </Text>
            </Flex>
          </Flex>
          <ScoreBar score={geo.total} />
          <Stack space={2} style={{ marginTop: 4 }}>
            {geo.items.map((item, i) => (
              <Box key={i}>
                <Flex justify="space-between" align="center">
                  <Text size={1}>{item.label}</Text>
                  <Text size={1} weight="semibold" style={{ color: item.earned === item.max ? '#10b981' : item.earned > 0 ? '#f59e0b' : '#9ca3af' }}>
                    {item.earned}/{item.max}
                  </Text>
                </Flex>
                <Text size={0} muted style={{ marginTop: 2 }}>
                  {item.tip}
                </Text>
                {i < geo.items.length - 1 && (
                  <Box style={{ borderBottom: '1px solid #e5e7eb', marginTop: 6 }} />
                )}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Card>

      {/* AEO Detail */}
      <Card padding={4} radius={3} border>
        <Stack space={3}>
          <Flex align="center" justify="space-between">
            <Text size={2} weight="semibold">
              AEO — Answer Engine Optimization
            </Text>
            <Flex align="center" gap={2}>
              <Badge tone={aeoGrade.tone} mode="outline">
                {aeoGrade.label}
              </Badge>
              <Text size={2} weight="bold" style={{ color: '#6366f1' }}>
                {aeo.total}/100
              </Text>
            </Flex>
          </Flex>
          <ScoreBar score={aeo.total} />
          <Stack space={2} style={{ marginTop: 4 }}>
            {aeo.items.map((item, i) => (
              <Box key={i}>
                <Flex justify="space-between" align="center">
                  <Text size={1}>{item.label}</Text>
                  <Text size={1} weight="semibold" style={{ color: item.earned === item.max ? '#10b981' : item.earned > 0 ? '#f59e0b' : '#9ca3af' }}>
                    {item.earned}/{item.max}
                  </Text>
                </Flex>
                <Text size={0} muted style={{ marginTop: 2 }}>
                  {item.tip}
                </Text>
                {i < aeo.items.length - 1 && (
                  <Box style={{ borderBottom: '1px solid #e5e7eb', marginTop: 6 }} />
                )}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )
}
