'use client'

import { useEffect, useState } from 'react'

import { LegalDocument } from '@/components/LegalDocument'
import {
  LANGUAGE_VALUES,
  type LanguageChoice,
} from '@/lib/languageContent'

const HELP_COPY: Record<
  LanguageChoice,
  { title: string; description: string; content: string }
> = {
  English: {
    title: 'Help Center',
    description:
      'Answers to common questions plus the fastest way to reach the RMHST support team.',
    content: `Welcome to the RMHST Help Center

We built RateMyHighSchoolTeachers to make it easier for students and families to understand what happens inside the classroom. This Help Center collects the most common questions about using the site, reporting content, and getting in touch with our team.

Getting Started with Searches

Type a school name into the main search bar to see its teachers, featured programs, and culture indicators. If you already know the teacher you are looking for, switch the search mode to "teacher" and enter any part of their name. You can filter results further once you land on a school profile.

Creating and Managing Ratings

You must verify a school email address before you can post public reviews. After submitting a rating, it appears in your dashboard where you can edit, archive, or delete it. We limit each student to one rating per teacher per course to keep things fair for everyone.

Staying Anonymous

All published reviews remove personal identifiers automatically. We never display your name, email address, or student ID. If you believe a review accidentally reveals your identity, let us know and our moderation team will take care of it.

Reporting Issues

See something that violates the Site Guidelines? Click the "Report" button next to any review and choose the closest reason. Our moderators read every report and follow up within two business days. For urgent safety concerns, contact your local authorities first and then alert us.

Contacting Support

Most questions can be answered by emailing support@ratemyhst.com. Include the URL you are referencing, screenshots if possible, and the email tied to your account. We reply Monday through Friday, 9 a.m. to 6 p.m. Eastern Time.

Educator & District Requests

Teachers, administrators, and district representatives can use the same support channel to request profile updates, confirm employment, or dispute reviews. Please send messages from an official school email address so we can verify the request quickly.

Accessibility

RMHST supports system-level dark mode, adjustable font sizes, and keyboard navigation across every interactive element. If you encounter an accessibility gap, we want to hear about it. Please share the device, browser, and steps to reproduce the problem when you reach out.

Data Requests

You can request a copy of the personal information tied to your account or ask us to delete it entirely by emailing privacy@ratemyhst.com. We verify every request before we respond.

Need More Help?

If your situation is not covered above, message support@ratemyhst.com with the subject line "Help Request" so we can route your ticket faster.`,
  },
  Español: {
    title: 'Centro de ayuda',
    description:
      'Respuestas a las preguntas más frecuentes y la forma más rápida de contactar al equipo de RMHST.',
    content: `Bienvenido al Centro de Ayuda de RMHST

Creamos RateMyHighSchoolTeachers para ayudar a estudiantes y familias a comprender lo que sucede en el aula. Aquí reunimos las preguntas más comunes sobre cómo usar el sitio, reportar contenido y comunicarse con nuestro equipo.

Primeros pasos en la búsqueda

Escribe el nombre de tu escuela en la barra de búsqueda para ver a sus docentes, programas destacados e indicadores de cultura escolar. Si ya sabes qué profesor buscas, cambia el modo a "profesor" e ingresa parte de su nombre. Una vez dentro del perfil de la escuela podrás aplicar más filtros.

Crear y administrar reseñas

Debes verificar un correo escolar antes de publicar reseñas públicas. Tras enviar una reseña aparecerá en tu panel, donde puedes editarla, archivarla o eliminarla. Limitamos a cada estudiante a una reseña por profesor y por curso para mantener la equidad.

Permanecer anónimo

Todas las reseñas públicas ocultan tu identidad de forma automática. Nunca mostraremos tu nombre, correo o identificación. Si notas que se incluyó información personal, avísanos y nuestro equipo la revisará.

Reportar problemas

¿Viste algo que infringe las Directrices del sitio? Presiona "Reportar" junto a la reseña y selecciona el motivo. Nuestros moderadores leen todos los reportes y responden en un máximo de dos días hábiles. Para asuntos urgentes de seguridad, contacta primero a las autoridades locales.

Contactar soporte

La mayoría de las consultas se resuelven escribiendo a support@ratemyhst.com. Incluye el enlace, capturas si es posible y el correo asociado a tu cuenta. Respondemos de lunes a viernes, de 9 a 18 h (hora del Este).

Solicitudes de docentes y distritos

Docentes, administradores y representantes distritales pueden usar el mismo correo para pedir actualizaciones de perfil, confirmar empleo o disputar reseñas. Envía el mensaje desde un correo institucional para agilizar la verificación.

Accesibilidad

RMHST ofrece modo oscuro, tamaños de fuente ajustables y navegación con teclado. Si encuentras una barrera de accesibilidad, cuéntanos qué dispositivo y navegador usas y cómo podemos reproducir el problema.

Solicitudes de datos

Para solicitar una copia de tu información personal o pedir su eliminación, escribe a privacy@ratemyhst.com. Verificaremos cada solicitud antes de responder.

¿Necesitas más ayuda?

Si tu caso no aparece aquí, envía un correo con el asunto "Help Request" a support@ratemyhst.com y aceleraremos tu ticket.`,
  },
  Français: {
    title: "Centre d'aide",
    description:
      'Les réponses aux questions les plus fréquentes et la façon la plus rapide de contacter l’équipe de RMHST.',
    content: `Bienvenue dans le centre d’aide RMHST

RateMyHighSchoolTeachers aide les élèves et les familles à mieux comprendre ce qui se passe en classe. Ce centre regroupe les questions les plus courantes sur l’utilisation du site, le signalement de contenu et la manière de nous contacter.

Premiers pas

Saisis le nom de ton établissement pour afficher ses enseignants, ses programmes et les indicateurs de culture scolaire. Si tu connais déjà le professeur que tu recherches, passe en mode “professeur” et entre son nom, même partiellement.

Créer et gérer des avis

Tu dois vérifier une adresse e-mail scolaire avant de publier un avis public. Une fois l’avis envoyé, tu peux l’éditer, l’archiver ou le supprimer depuis ton tableau de bord. Chaque élève est limité à un avis par professeur et par cours.

Rester anonyme

Tous les avis publics suppriment automatiquement les identifiants personnels. Nous n’affichons jamais ton nom, ton e-mail ou ton identifiant étudiant. Signale-nous tout contenu qui révélerait ton identité.

Signaler un problème

Si un avis enfreint les directives, clique sur “Signaler” et choisis la raison. Nos modérateurs lisent tous les signalements et répondent sous deux jours ouvrés. Pour les urgences, contacte d’abord les autorités locales.

Contacter le support

La plupart des questions trouvent réponse à support@ratemyhst.com. Indique l’URL concernée, des captures si possible et l’e-mail lié à ton compte. Nous répondons du lundi au vendredi, de 9 h à 18 h (heure de l’Est).

Demandes des enseignants et des districts

Les enseignants, administrateurs et représentants peuvent utiliser ce même canal pour mettre à jour un profil, confirmer un emploi ou contester un avis. Utilise un e-mail institutionnel pour accélérer la vérification.

Accessibilité

RMHST propose un mode sombre, des tailles de police ajustables et une navigation clavier. Si tu rencontres un souci d’accessibilité, précise le dispositif, le navigateur et les étapes pour reproduire le problème.

Demandes de données

Pour recevoir une copie de tes données ou demander leur suppression, écris à privacy@ratemyhst.com. Nous vérifions chaque demande avant d’y répondre.

Besoin d’aide supplémentaire ?

Si ta situation n’est pas couverte ici, envoie un e-mail avec l’objet “Help Request” à support@ratemyhst.com.`,
  },
  Deutsch: {
    title: 'Hilfe-Center',
    description:
      'Antworten auf häufige Fragen und der schnellste Weg, das RMHST-Team zu erreichen.',
    content: `Willkommen im RMHST Hilfe-Center

RateMyHighSchoolTeachers hilft Schüler:innen und Familien, das Unterrichtsgeschehen besser zu verstehen. Hier findest du die häufigsten Fragen zur Nutzung der Website, zum Melden von Inhalten und zur Kontaktaufnahme.

Erste Schritte

Gib den Namen deiner Schule ein, um Lehrkräfte, Programme und Kulturindikatoren zu sehen. Wenn du bereits eine Lehrkraft im Kopf hast, wechsle in den Modus “Lehrkraft” und gib ihren Namen ein.

Bewertungen erstellen und verwalten

Du musst eine Schul-E-Mail verifizieren, bevor du öffentliche Bewertungen posten kannst. Nach dem Absenden kannst du deine Bewertung im Dashboard bearbeiten, archivieren oder löschen. Pro Lehrkraft und Kurs ist nur eine Bewertung erlaubt.

Anonym bleiben

Alle veröffentlichten Bewertungen entfernen persönliche Daten. Dein Name, deine E-Mail und deine Schüler-ID werden nie angezeigt. Melde uns, falls eine Bewertung versehentlich deine Identität verrät.

Probleme melden

Verstößt eine Bewertung gegen die Richtlinien, klicke auf “Melden” und wähle den Grund. Unser Moderationsteam reagiert in der Regel innerhalb von zwei Werktagen. Bei dringenden Sicherheitsfragen wende dich zuerst an die Behörden vor Ort.

Support kontaktieren

Die meisten Fragen beantwortet support@ratemyhst.com. Sende den relevanten Link, Screenshots (falls möglich) und die E-Mail, die mit deinem Konto verknüpft ist. Wir antworten Montag bis Freitag von 9 bis 18 Uhr (Eastern Time).

Anfragen von Lehrkräften und Bezirken

Lehrkräfte, Administrator:innen und Bezirksvertreter:innen können denselben Kanal für Profil-Updates, Beschäftigungsbestätigungen oder Einsprüche nutzen. Verwende eine Schuladresse zur schnelleren Verifizierung.

Barrierefreiheit

RMHST unterstützt systemweiten Dark Mode, anpassbare Schriftgrößen und Tastaturnavigation. Teile uns mit, wenn du eine Barriere feststellst (Gerät, Browser, Schritte zur Reproduktion).

Datenauskünfte

Fordere deine personenbezogenen Daten an oder bitte um Löschung, indem du an privacy@ratemyhst.com schreibst. Wir verifizieren jede Anfrage.

Weitere Hilfe

Ist dein Anliegen hier nicht abgedeckt, sende eine E-Mail mit dem Betreff “Help Request” an support@ratemyhst.com.`,
  },
  中文: {
    title: '帮助中心',
    description: '最常见问题的解答，以及最快的 RMHST 支持联系方式。',
    content: `欢迎来到 RMHST 帮助中心

RateMyHighSchoolTeachers 旨在帮助学生和家庭了解课堂情况。此帮助中心汇总了使用网站、举报内容以及联系团队的常见问题。

搜索入门

在搜索栏输入学校名称，即可查看教师、项目和校园文化指标。如果你已知道教师姓名，可切换到“教师”模式并输入其名字的一部分。

创建和管理评价

在发布公共评价前，你需要验证学校邮箱。评价提交后会出现在你的仪表板中，方便编辑、归档或删除。每位学生对同一教师同一课程仅限一次评价。

保持匿名

所有评价都会自动移除个人信息。我们不会显示姓名、邮箱或学生编号。如发现评价泄露身份，请联系团队处理。

举报问题

若评价违反网站指南，请点击“举报”并选择理由。审核团队会在两个工作日内回复。若涉及安全问题，请先联系当地执法部门。

联系客服

大多数问题可发送邮件至 support@ratemyhst.com 解决。请附上相关链接、截图（如有）和账户邮箱。工作时间为周一至周五，美东时间 9:00-18:00。

教师与学区请求

教师、管理员和学区代表可通过同一渠道请求更新资料、确认任职或申诉。请使用官方学校邮箱以便快速验证。

无障碍支持

RMHST 支持系统暗色模式、可调字体和键盘导航。如遇无障碍问题，请告知设备、浏览器及复现步骤。

数据请求

若需获取或删除个人信息，请邮件 privacy@ratemyhst.com。我们会在回应前进行验证。

需要更多帮助？

若此处未覆盖你的情况，请以“Help Request”为主题发送邮件至 support@ratemyhst.com。`,
  },
  日本語: {
    title: 'ヘルプセンター',
    description: 'よくある質問への回答と、RMHST サポートへの最短ルートをご案内します。',
    content: `RMHST ヘルプセンターへようこそ

RateMyHighSchoolTeachers は、教室で何が起きているかを生徒や保護者が理解しやすくするために作られました。このヘルプセンターでは、サイトの使い方やコンテンツ報告、サポートチームへの連絡方法など、よくある質問をまとめています。

検索の始め方

検索バーに学校名を入力すると、その学校の教師やプログラム、文化指標が表示されます。探している教師が決まっている場合は「教師」モードに切り替えて名前を入力してください。

レビューの作成と管理

公共のレビューを投稿する前に、学校のメールアドレスを確認する必要があります。投稿後はダッシュボードで編集・アーカイブ・削除が可能です。公平性を保つため、同じ教師・同じ科目へのレビューは1件に制限しています。

匿名性の確保

公開されたレビューから個人を特定できる情報は自動的に削除されます。名前・メールアドレス・学生IDが表示されることはありません。もし身元が分かる記述を見つけた場合はご連絡ください。

問題の報告

サイトポリシーに違反する内容を見つけたら、「報告する」ボタンから該当理由を選択してください。モデレーターが全ての報告を確認し、通常2営業日以内に対応します。緊急の場合は先に地元の当局へ連絡をお願いします。

サポートへの連絡

多くの質問は support@ratemyhst.com へのメールで解決できます。参考リンクやスクリーンショット（可能であれば）、アカウントに登録しているメールアドレスを記載してください。対応時間は平日 9:00〜18:00（米国東部時間）です。

教職員・学区からの依頼

教師、管理者、学区の担当者も同じ窓口でプロフィールの更新や在職確認、レビューへの異議申し立てができます。認証をスムーズにするため、公式の学校メールを使用してください。

アクセシビリティ

RMHST はシステムのダークモード、可変フォントサイズ、キーボード操作に対応しています。アクセシビリティ上の問題があれば、利用環境と再現手順を添えてお知らせください。

データリクエスト

アカウントに紐づく個人情報の取得または削除を希望する場合は、privacy@ratemyhst.com までメールをお送りください。各リクエストは確認の上で対応します。

さらにサポートが必要ですか？

ここで解決しない場合は、件名に “Help Request” と記載して support@ratemyhst.com までご連絡ください。`,
  },
}

export default function HelpCenterContent() {
  const [language, setLanguage] = useState<LanguageChoice>('English')

  useEffect(() => {
    const current = document.documentElement.dataset
      .language as LanguageChoice
    if (current && LANGUAGE_VALUES.includes(current)) {
      setLanguage(current)
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

  const copy = HELP_COPY[language] ?? HELP_COPY.English

  return (
    <div className="flex min-h-screen flex-col bg-white py-10 dark:bg-black md:py-16">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="rounded-3xl border border-zinc-200 bg-white/90 p-8 shadow-xl shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-950/60 dark:shadow-black/30">
          <LegalDocument
            title={copy.title}
            description={copy.description}
            content={copy.content}
          />
        </div>
      </div>
    </div>
  )
}

