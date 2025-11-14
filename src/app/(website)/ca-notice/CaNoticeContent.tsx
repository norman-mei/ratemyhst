'use client'

import { useEffect, useState } from 'react'

import { LegalDocument } from '@/components/LegalDocument'
import { LANGUAGE_VALUES, type LanguageChoice } from '@/lib/languageContent'

const ENGLISH_NOTICE = `California Consumer Privacy Act Notice at Collection

This notice applies to California residents using RateMyHighSchoolTeachers (RMHST) and supplements our Privacy Policy. It explains the categories of personal information we collect, why we collect them, and how long we retain the data.

Categories of Personal Information We Collect

    Identifiers such as name, email address, IP address, or device identifiers supplied when you create an account or contact us.
    School affiliation, class year, or teacher relationships that you voluntarily submit when building your profile or publishing reviews.
    Internet activity, including log data, device information, and diagnostic analytics generated while browsing RMHST.
    User-generated content like ratings, comments, flags, and feedback forms.
    Professional or educational information included in educator or administrator communications.

Purpose of Collection

    Operate and improve the RMHST platform, including personalization, accessibility settings, and anti-fraud monitoring.
    Communicate with users about accounts, support requests, contests, or policy updates.
    Moderate reviews for guideline compliance and protect the integrity of the community.
    Analyze trends to improve student tools, school pages, and educator resources.
    Comply with legal obligations and respond to verified law-enforcement or district requests.

Data Retention

We retain account information for as long as your account remains active plus a reasonable back-up window. Review content and moderation logs may be stored longer to maintain platform integrity. Aggregated analytics that no longer identify you may be kept indefinitely.

Do We Sell or Share Personal Information?

RMHST does not sell your personal information. We also do not share personal information for cross-context behavioral advertising. We may disclose information to trusted service providers (for example, email delivery, customer support, or cloud hosting) under written contracts that restrict their use of the data.

Your Rights

California residents can request access to, correction of, or deletion of their personal information. You can also request information about the categories of personal information we disclosed for a business purpose. Submit requests by emailing privacy@ratemyhst.com with the subject line "CCPA Request." We will verify your identity before fulfilling the request.

Authorized Agents

If you use an authorized agent to submit a request, we need (1) a signed permission letter and (2) proof of your identity. Agents can email privacy@ratemyhst.com with the subject line "Authorized Agent Request."

Non-Discrimination

We will not deny services, charge different prices, or provide a different level of quality because you exercised your CCPA rights.

Contact Information

Email privacy@ratemyhst.com or write to RateMyHST, LLC, 228 Park Ave S, PMB 62348, New York, NY 10003, Attn: Privacy.

Last updated November 13, 2025.`

type CaNoticeCopy = {
  title: string
  description: string
  updatedAt: string
  content: string
}

const NOTICE_COPY: Record<LanguageChoice, CaNoticeCopy> = {
  English: {
    title: 'California Notice at Collection',
    description: 'Required disclosures about the information RMHST collects from California residents.',
    updatedAt: 'November 13, 2025',
    content: ENGLISH_NOTICE,
  },
  Español: {
    title: 'Aviso de recopilación para California',
    description: 'Datos que recopilamos, fines y derechos conforme a la CCPA.',
    updatedAt: '13 de noviembre de 2025',
    content: buildSpanishNotice(),
  },
  Français: {
    title: 'Avis de collecte – Californie',
    description: 'Catégories de données collectées, objectifs et droits CCPA.',
    updatedAt: '13 novembre 2025',
    content: buildFrenchNotice(),
  },
  Deutsch: {
    title: 'Hinweis zur Datenerfassung (Kalifornien)',
    description: 'Welche Daten wir sammeln, wozu wir sie nutzen und welche Rechte du hast.',
    updatedAt: '13. November 2025',
    content: buildGermanNotice(),
  },
  中文: {
    title: '加州信息收集通知',
    description: '说明 RateMyHST 收集哪些信息、用途及 CCPA 权利。',
    updatedAt: '2025年11月13日',
    content: buildChineseNotice(),
  },
  日本語: {
    title: 'カリフォルニア州収集通知',
    description: 'RateMyHST が収集するデータ内容と CCPA 上の権利。',
    updatedAt: '2025年11月13日',
    content: buildJapaneseNotice(),
  },
}

export default function CaNoticeContent() {
  const [language, setLanguage] = useState<LanguageChoice>('English')

  useEffect(() => {
    if (typeof document === 'undefined') return
    const initial = document.documentElement.dataset.language as LanguageChoice
    if (initial && LANGUAGE_VALUES.includes(initial)) {
      setLanguage(initial)
    }

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<LanguageChoice>).detail
      if (detail && LANGUAGE_VALUES.includes(detail)) {
        setLanguage(detail)
      }
    }

    window.addEventListener('rmhst-language-change', handler)
    return () => window.removeEventListener('rmhst-language-change', handler)
  }, [])

  const copy = NOTICE_COPY[language] ?? NOTICE_COPY.English

  return (
    <div className="flex min-h-screen flex-col bg-white py-10 dark:bg-black md:py-16">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="rounded-3xl border border-zinc-200 bg-white/90 p-8 shadow-xl shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-950/60 dark:shadow-black/30">
          <LegalDocument
            title={copy.title}
            description={copy.description}
            updatedAt={copy.updatedAt}
            content={copy.content}
          />
        </div>
      </div>
    </div>
  )
}

function buildSpanishNotice() {
  return `Aviso de recopilación para residentes de California (traducción informativa; prevalece el texto en inglés).

Categorías de datos:
    • Identificadores (nombre, correo, IP, ID de dispositivo).
    • Relación escolar o docente que registras al crear reseñas.
    • Actividad en Internet y analíticas del portal.
    • Contenido generado por el usuario (reseñas, comentarios, reportes).
    • Información profesional/educativa incluida en comunicaciones con docentes o distritos.

Fines:
    • Operar y mejorar RMHST, incluidas funciones de accesibilidad y prevención de fraude.
    • Comunicarnos sobre cuentas, soporte, concursos o cambios de políticas.
    • Moderar reseñas y proteger la integridad de la comunidad.
    • Analizar tendencias y cumplir obligaciones legales.

Retención:
    • Datos de cuenta se conservan mientras la cuenta esté activa, más un margen razonable.
    • Contenido y registros de moderación pueden conservarse más tiempo para garantizar la integridad del sitio.
    • Analíticas agregadas (sin identificación) pueden mantenerse indefinidamente.

Venta/compartición:
    • No vendemos ni compartimos datos para publicidad conductual entre contextos.
    • Solo divulgamos información a proveedores bajo contrato (correo, soporte, alojamiento, etc.).

Derechos CCPA:
    • Acceso, corrección, eliminación y conocimiento de divulgaciones.
    • Enviar solicitudes verificables a privacy@ratemyhst.com con el asunto “CCPA Request”.

Agentes autorizados:
    • Requieren carta de autorización firmada y prueba de identidad del consumidor.

No discriminación:
    • No aplicamos precios ni servicios diferentes por ejercer tus derechos.

Contacto:
    • privacy@ratemyhst.com o RateMyHST, LLC, 228 Park Ave S, PMB 62348, New York, NY 10003, Attn: Privacy.`
}

function buildFrenchNotice() {
  return `Avis de collecte – Californiens (version française résumée; seule la version anglaise fait foi).

Catégories:
    • Identifiants (nom, email, IP, identifiants d’appareils).
    • Informations d’affiliation scolaire ou relation enseignant.
    • Données de navigation et diagnostics.
    • Contenus générés (notes, commentaires, signalements).
    • Informations professionnelles ou scolaires issues d’échanges avec les éducateurs.

Finalités:
    • Exploiter et améliorer RMHST, personnaliser l’expérience, lutter contre la fraude.
    • Communiquer sur les comptes, concours ou mises à jour.
    • Modérer les avis et protéger la communauté.
    • Respecter les obligations légales.

Durée de conservation:
    • Comptes: tant qu’ils sont actifs + période raisonnable pour sauvegardes.
    • Contenus/modération: plus longtemps si nécessaire pour l’intégrité du service.
    • Statistiques anonymisées: conservées indéfiniment.

Vente/partage:
    • Aucune vente ni partage pour la publicité inter-contexte.
    • Prestataires sous contrat seulement (email, support, hébergement).

Vos droits (CCPA):
    • Accès, rectification, suppression, information sur les divulgations.
    • Envoyer une demande vérifiable à privacy@ratemyhst.com (sujet « CCPA Request »).

Agents autorisés:
    • Lettre d’autorisation + preuve d’identité requises.

Non-discrimination:
    • Aucun traitement différent pour avoir exercé vos droits.

Contact:
    • privacy@ratemyhst.com ou RateMyHST, LLC, 228 Park Ave S, PMB 62348, New York, NY 10003, Attn: Privacy.`
}

function buildGermanNotice() {
  return `Hinweis nach CCPA (deutsche Zusammenfassung; rechtlich bindend ist der englische Text).

Kategorien:
    • Identifikatoren wie Name, E-Mail, IP, Gerätekennungen.
    • Schulzugehörigkeit / Beziehung zu Lehrkräften aus deinem Profil.
    • Internet-/Diagnosedaten bei der Nutzung von RMHST.
    • Von dir erstellte Inhalte (Bewertungen, Kommentare, Meldungen).
    • Berufliche oder schulische Informationen aus Kommunikation mit Lehrenden.

Zwecke:
    • Betrieb, Verbesserung, Personalisierung und Betrugsprävention.
    • Kommunikation über Konten, Support und Richtlinien.
    • Moderation zur Durchsetzung der Guidelines.
    • Trendanalysen und gesetzliche Pflichten.

Aufbewahrung:
    • Kontoinformationen solange dein Konto aktiv ist plus Sicherungszeitraum.
    • Inhalte/Moderationsprotokolle ggf. länger zur Sicherung der Plattform.
    • Aggregierte, anonymisierte Analysen unbegrenzt.

Verkauf / Teilen:
    • Keine Verkäufe oder Cross-Context-Werbung.
    • Weitergabe nur an Dienstleister mit Verträgen (Mail, Support, Hosting).

CCPA-Rechte:
    • Auskunft, Berichtigung, Löschung, Infos über Offenlegungen.
    • Sende verifizierbare Anfragen an privacy@ratemyhst.com („CCPA Request“).

Bevollmächtigte Agenten:
    • Benötigen Vollmachtsschreiben und Identitätsnachweis.

Keine Diskriminierung:
    • Keine Preis-/Service-Unterschiede bei Rechteausübung.

Kontakt:
    • privacy@ratemyhst.com oder RateMyHST, LLC, 228 Park Ave S, PMB 62348, New York, NY 10003, Attn: Privacy.`
}

function buildChineseNotice() {
  return `加州收集通知（中文概要，法律以英文版为准）

收集的类别：
    • 识别信息（姓名、邮箱、IP、设备 ID）。
    • 你主动提供的学校、年级或教师关联信息。
    • 站点使用日志、设备/诊断数据。
    • 用户生成内容（评分、评论、举报、反馈）。
    • 与教师或管理员沟通时包含的专业/教育信息。

目的：
    • 运营和改进 RMHST，防止欺诈，维护可访问性设置。
    • 与你沟通账户、支持、活动或政策。
    • 审核评论以确保符合指南。
    • 分析趋势并履行法律义务。

保留：
    • 账户数据：账号有效期 + 合理备份时间。
    • 评论与审核记录：为维护平台可适度延长。
    • 已匿名化的统计：可长期保存。

出售/共享：
    • 不出售个人信息，也不用于跨情境行为广告。
    • 仅与受合同约束的服务提供商共享（邮件、客服、云托管等）。

权利：
    • 可请求查阅、纠正或删除个人信息，了解披露类别。
    • 将可验证请求发送至 privacy@ratemyhst.com（主题“CCPA Request”）。

授权代理：
    • 需提供授权书及消费者身份证明。

非歧视：
    • 行使权利不会导致服务或价格差异。

联系方式：
    • privacy@ratemyhst.com 或 RateMyHST, LLC, 228 Park Ave S, PMB 62348, New York, NY 10003, Attn: Privacy.`
}

function buildJapaneseNotice() {
  return `カリフォルニア州向け収集通知（日本語サマリー。法的効力は英語版にあります）

取得する情報カテゴリ:
    • 氏名・メール・IP・デバイス ID などの識別子
    • プロフィールで提供した学校・学年・教師との関係
    • 利用中に生成されるアクセスログや診断データ
    • ユーザー生成コンテンツ（評価、コメント、報告等）
    • 教職員とのやり取りに含まれる職務/教育情報

利用目的:
    • RMHST の運営・改善・個別化、セキュリティ/不正防止
    • アカウントやサポート、ポリシー変更の連絡
    • ガイドライン遵守のためのモデレーション
    • トレンド分析および法令遵守

保持期間:
    • アカウント情報は有効期間＋バックアップ期間
    • レビューやモデレーション記録はサイト保全のため長期保存する場合あり
    • 匿名化済みの統計は長期間保持可

販売・共有:
    • 個人情報を販売せず、クロスコンテキスト広告のために共有しません
    • 共有は契約で制限されたサービス提供者のみ

権利:
    • 開示、訂正、削除、開示カテゴリの請求が可能
    • 「CCPA Request」を件名に付けて privacy@ratemyhst.com まで

代理人:
    • 委任状と本人確認書類が必要

差別の禁止:
    • 権利行使による価格やサービスの差別は行いません

連絡先:
    • privacy@ratemyhst.com または RateMyHST, LLC, 228 Park Ave S, PMB 62348, New York, NY 10003, Attn: Privacy.`
}
