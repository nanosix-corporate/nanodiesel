import React, { useState } from 'react'
import { useClient } from 'sanity'
import { Card, Stack, Text, Flex, Button, Box, Badge, Spinner } from '@sanity/ui'
import { DownloadIcon } from '@sanity/icons'

// ─── Tipe Data ────────────────────────────────────────────────────────────────

interface ArticleReport {
  judul: string
  slug: string
  kategori: string
  penulis: string
  tanggalDibuat: string
  tanggalDiupdate: string
  ringkasan: string
  metaTitle: string
  metaDescription: string
  focusKeywords: string
  geoScore: number
  aeoScore: number
}

// ─── GEO Score (sama dengan SEOScoreDashboard) ────────────────────────────────

function calcGEO(content: any[], seo: any): number {
  let total = 0

  const hasMetaTitle = !!(seo?.metaTitle && seo.metaTitle.trim().length > 0)
  total += hasMetaTitle ? 10 : 0

  const hasMetaDesc = !!(seo?.metaDescription && seo.metaDescription.trim().length > 20)
  total += hasMetaDesc ? 10 : 0

  const kwCount = Array.isArray(seo?.seoKeywords) ? seo.seoKeywords.length : 0
  total += kwCount >= 3 ? 10 : kwCount >= 1 ? 5 : 0

  const tableCount = (content || []).filter((b: any) => b._type === 'tableBlock').length
  total += Math.min(tableCount * 10, 20)

  const blockCount = (content || []).filter((b: any) => b._type === 'block').length
  total += blockCount >= 15 ? 15 : blockCount >= 10 ? 10 : blockCount >= 5 ? 5 : 0

  const hasLinks = (content || []).some((b: any) => {
    if (b._type !== 'block') return false
    return (b.markDefs || []).some((m: any) => m._type === 'internalLink')
  })
  total += hasLinks ? 15 : 0

  const hasH = (content || []).some(
    (b: any) => b._type === 'block' && ['h2', 'h3', 'h4'].includes(b.style)
  )
  total += hasH ? 20 : 0

  return total
}

function calcAEO(content: any[], seo: any, excerpt: string): number {
  let total = 0

  const hasFaq = (content || []).some((b: any) => b._type === 'faqSection')
  total += hasFaq ? 25 : 0

  const faqCount = (content || [])
    .filter((b: any) => b._type === 'faqSection')
    .reduce((sum: number, b: any) => sum + (Array.isArray(b.items) ? b.items.length : 0), 0)
  total += Math.min(faqCount * 5, 25)

  const excerptLen = (excerpt || '').trim().length
  total += excerptLen >= 80 ? 20 : excerptLen >= 30 ? 10 : 0

  const hasH = (content || []).some(
    (b: any) => b._type === 'block' && ['h2', 'h3', 'h4'].includes(b.style)
  )
  total += hasH ? 15 : 0

  const hasList = (content || []).some(
    (b: any) => b._type === 'block' && (b.listItem === 'bullet' || b.listItem === 'number')
  )
  total += hasList ? 15 : 0

  return total
}

// ─── Utilitas CSV ─────────────────────────────────────────────────────────────

function escapeCsv(val: any): string {
  if (val === null || val === undefined) return ''
  const str = String(val)
  if (str.includes('"') || str.includes(',') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function buildCsv(rows: ArticleReport[]): string {
  const headers = [
    'Judul',
    'URL/Slug',
    'Kategori',
    'Penulis',
    'Tanggal Dibuat',
    'Tanggal Diupdate',
    'Ringkasan (Excerpt)',
    'Meta Title',
    'Meta Description',
    'Focus Keywords',
    'GEO Score (/100)',
    'AEO Score (/100)',
  ]

  const csvRows = rows.map((row) => [
    escapeCsv(row.judul),
    escapeCsv(row.slug),
    escapeCsv(row.kategori),
    escapeCsv(row.penulis),
    escapeCsv(row.tanggalDibuat),
    escapeCsv(row.tanggalDiupdate),
    escapeCsv(row.ringkasan),
    escapeCsv(row.metaTitle),
    escapeCsv(row.metaDescription),
    escapeCsv(row.focusKeywords),
    escapeCsv(row.geoScore),
    escapeCsv(row.aeoScore),
  ])

  return [headers.join(','), ...csvRows.map((r) => r.join(','))].join('\n')
}

function downloadCsv(csvContent: string, filename: string) {
  // BOM agar Excel bisa baca UTF-8 (karakter bahasa Indonesia) dengan benar
  const bom = '\uFEFF'
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function getGradeLabel(score: number): string {
  if (score >= 80) return 'Sangat Baik'
  if (score >= 60) return 'Baik'
  if (score >= 40) return 'Cukup'
  return 'Perlu Perbaikan'
}

function getGradeTone(score: number): 'positive' | 'caution' | 'critical' {
  if (score >= 60) return 'positive'
  if (score >= 40) return 'caution'
  return 'critical'
}

// ─── Komponen Utama ───────────────────────────────────────────────────────────

export function ExportReportTool() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<{
    total: number
    avgGeo: number
    avgAeo: number
  } | null>(null)
  const [lastExport, setLastExport] = useState<string | null>(null)

  async function handleExport() {
    setLoading(true)
    try {
      const rawArticles = await client.fetch(`
        *[_type == "post"] | order(_createdAt desc) {
          title,
          "slug": slug.current,
          category,
          author,
          excerpt,
          content,
          seo,
          _createdAt,
          _updatedAt
        }
      `)

      const rows: ArticleReport[] = rawArticles.map((article: any) => {
        const geoScore = calcGEO(article.content || [], article.seo)
        const aeoScore = calcAEO(article.content || [], article.seo, article.excerpt || '')
        const keywords = Array.isArray(article.seo?.seoKeywords)
          ? article.seo.seoKeywords.join('; ')
          : (article.seo?.seoKeywords || '')

        return {
          judul: article.title || '',
          slug: article.slug ? `/artikel/${article.slug}` : '',
          kategori: article.category || '',
          penulis: article.author || '',
          tanggalDibuat: article._createdAt
            ? new Date(article._createdAt).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })
            : '',
          tanggalDiupdate: article._updatedAt
            ? new Date(article._updatedAt).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })
            : '',
          ringkasan: article.excerpt || '',
          metaTitle: article.seo?.metaTitle || '',
          metaDescription: article.seo?.metaDescription || '',
          focusKeywords: keywords,
          geoScore,
          aeoScore,
        }
      })

      const avgGeo = rows.length
        ? Math.round(rows.reduce((s, r) => s + r.geoScore, 0) / rows.length)
        : 0
      const avgAeo = rows.length
        ? Math.round(rows.reduce((s, r) => s + r.aeoScore, 0) / rows.length)
        : 0

      setStats({ total: rows.length, avgGeo, avgAeo })

      const csvContent = buildCsv(rows)
      const date = new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).replace(/\//g, '-')
      const filename = `report-artikel-nanodiesel-${date}.csv`
      downloadCsv(csvContent, filename)
      setLastExport(new Date().toLocaleTimeString('id-ID'))
    } catch (err) {
      console.error('Gagal mengekspor:', err)
      alert('Terjadi kesalahan saat mengekspor data. Cek konsol untuk detail.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box style={{ padding: '32px', maxWidth: 640, margin: '0 auto' }}>
      <Stack space={5}>
        {/* Header */}
        <Stack space={2}>
          <Text size={4} weight="bold">
            📊 Export Report Artikel
          </Text>
          <Text size={1} muted>
            Download semua data artikel beserta metadata SEO, skor GEO dan AEO ke dalam file
            Excel/CSV untuk keperluan diskusi tim.
          </Text>
        </Stack>

        {/* Info Box */}
        <Card padding={4} radius={3} tone="primary" border>
          <Stack space={3}>
            <Text size={1} weight="semibold">
              📋 Kolom yang akan diexport:
            </Text>
            <Stack space={1}>
              {[
                'Judul Artikel',
                'URL / Slug',
                'Kategori',
                'Penulis',
                'Tanggal Dibuat & Tanggal Diupdate',
                'Ringkasan (Excerpt)',
                'Meta Title & Meta Description',
                'Focus Keywords',
                'GEO Score (/100)',
                'AEO Score (/100)',
              ].map((col, i) => (
                <Text key={i} size={1} muted>
                  ✓ {col}
                </Text>
              ))}
            </Stack>
          </Stack>
        </Card>

        {/* Tombol Download */}
        <Flex gap={3} align="center">
          <Button
            icon={loading ? undefined : DownloadIcon}
            text={loading ? 'Memuat data...' : 'Download Report CSV'}
            tone="primary"
            disabled={loading}
            onClick={handleExport}
            style={{ minWidth: 220 }}
          />
          {loading && <Spinner muted />}
        </Flex>

        {lastExport && (
          <Text size={0} muted>
            ✅ Terakhir diexport pukul {lastExport}
          </Text>
        )}

        {/* Ringkasan Statistik (muncul setelah export) */}
        {stats && (
          <Card padding={4} radius={3} tone="transparent" border>
            <Stack space={4}>
              <Text size={1} weight="semibold">
                📈 Ringkasan Statistik (dari data yang diexport)
              </Text>
              <Flex gap={4} wrap="wrap">
                <Stack space={2} style={{ minWidth: 140 }}>
                  <Text size={4} weight="bold" style={{ color: '#6366f1' }}>
                    {stats.total}
                  </Text>
                  <Text size={1} muted>
                    Total Artikel
                  </Text>
                </Stack>
                <Stack space={2} style={{ minWidth: 140 }}>
                  <Flex align="center" gap={2}>
                    <Text size={4} weight="bold" style={{ color: '#10b981' }}>
                      {stats.avgGeo}
                    </Text>
                    <Badge tone={getGradeTone(stats.avgGeo)} mode="outline">
                      {getGradeLabel(stats.avgGeo)}
                    </Badge>
                  </Flex>
                  <Text size={1} muted>
                    Rata-rata GEO Score
                  </Text>
                </Stack>
                <Stack space={2} style={{ minWidth: 140 }}>
                  <Flex align="center" gap={2}>
                    <Text size={4} weight="bold" style={{ color: '#6366f1' }}>
                      {stats.avgAeo}
                    </Text>
                    <Badge tone={getGradeTone(stats.avgAeo)} mode="outline">
                      {getGradeLabel(stats.avgAeo)}
                    </Badge>
                  </Flex>
                  <Text size={1} muted>
                    Rata-rata AEO Score
                  </Text>
                </Stack>
              </Flex>
            </Stack>
          </Card>
        )}

        {/* Catatan penggunaan */}
        <Card padding={3} radius={2} tone="caution">
          <Stack space={2}>
            <Text size={1} weight="semibold">
              💡 Tips Membuka di Excel:
            </Text>
            <Text size={0} muted>
              Buka file CSV dengan Excel → pilih &quot;Data&quot; → &quot;From Text/CSV&quot; → pilih encoding{' '}
              <strong>UTF-8</strong> agar karakter Indonesia (é, ā, dll.) tampil dengan benar. Atau
              bisa langsung dibuka di Google Sheets.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Box>
  )
}
