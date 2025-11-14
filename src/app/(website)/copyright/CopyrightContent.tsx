'use client'

import { useEffect, useState } from 'react'

import { LegalDocument } from '@/components/LegalDocument'
import {
  LANGUAGE_VALUES,
  type LanguageChoice,
} from '@/lib/languageContent'

const currentYear = new Date().getFullYear()

type CopyrightCopy = {
  title: string
  description: string
  updatedAt: string
  content: string
}

const COPYRIGHT_COPY: Record<LanguageChoice, CopyrightCopy> = {
  English: {
    title: 'Copyright Compliance Policy',
    description:
      'How to report infringement, submit counternotices, and understand our repeat infringer rules.',
    updatedAt: 'November 13, 2025',
    content: buildEnglishContent(),
  },
  Español: {
    title: 'Política de cumplimiento de copyright',
    description:
      'Procedimiento para avisos DMCA, contra-notificaciones y política para infractores reincidentes.',
    updatedAt: '13 de noviembre de 2025',
    content: buildSpanishContent(),
  },
  Français: {
    title: 'Politique de conformité au droit d’auteur',
    description:
      'Comment envoyer un avis, une contre-notification et comprendre notre politique envers les récidivistes.',
    updatedAt: '13 novembre 2025',
    content: buildFrenchContent(),
  },
  Deutsch: {
    title: 'Urheberrechtsrichtlinie',
    description:
      'So meldest du Verstöße, reichst Gegenanzeigen ein und erfährst mehr über unsere Regelung bei Wiederholungstätern.',
    updatedAt: '13. November 2025',
    content: buildGermanContent(),
  },
  中文: {
    title: '版权合规政策',
    description: '说明如何提交侵权通知、反通知以及重复侵权处理规则。',
    updatedAt: '2025年11月13日',
    content: buildChineseContent(),
  },
  日本語: {
    title: '著作権コンプライアンス方針',
    description:
      '違反報告、反通知、再犯者への対応方法について説明します。',
    updatedAt: '2025年11月13日',
    content: buildJapaneseContent(),
  },
}

export default function CopyrightContent() {
  const [language, setLanguage] = useState<LanguageChoice>('English')

  useEffect(() => {
    const initial = document.documentElement.dataset
      .language as LanguageChoice
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

  const copy = COPYRIGHT_COPY[language] ?? COPYRIGHT_COPY.English

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

function buildEnglishContent() {
  return `This document explains how RateMyHighSchoolTeachers (RateMyHST) responds to claims of copyright infringement. It is part of our Terms of Use Agreement and legally binding on every user. We pursue infringements promptly, whether they involve our own works or those of third parties.

HOW TO SEND A DMCA NOTICE

If you own the copyright (or represent the owner) and believe material on RateMyHST infringes your rights, please send a written DMCA notice to our designated agent. The notice must include:

1. A physical or electronic signature of the copyright owner or authorized agent.
2. Identification of the copyrighted work claimed to have been infringed (or a list of works if the notice covers multiple items).
3. Identification of the material that is allegedly infringing along with sufficient information for us to locate it (URL or direct link).
4. Adequate contact information for you (address, telephone number, and email).
5. A statement that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.
6. A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner.

DESIGNATED AGENT

Copyright Agent  
50 Broad Street, 20th Floor  
New York, NY 10004  
copyright@ratemyhst.com

Please do not send unrelated requests to this address. Non-copyright inquiries will not receive a response.

COUNTER-NOTICES

If your content was removed due to a DMCA notice and you believe it was a mistake, you may file a counter-notification that includes:

1. Your physical or electronic signature.
2. Identification of the material that has been removed and where it appeared before removal.
3. A statement, under penalty of perjury, that you have a good-faith belief the material was removed due to mistake or misidentification.
4. Your name, address, telephone number, and consent to the jurisdiction of the Federal District Court for the judicial district in which you reside (or any district where RateMyHST can be found if you live outside the U.S.).

We will forward your counter-notification to the original claimant. Unless we receive notice within 10 business days that the claimant has filed a lawsuit seeking to prevent further infringement, we may restore your material.

REPEAT INFRINGER POLICY

RateMyHST may terminate accounts belonging to users who repeatedly infringe copyrights. If your account is terminated, you agree not to create another account without our written permission.

SOLE STATEMENT

This policy is the only valid statement regarding copyright on RateMyHST. Translations are provided for convenience; in the event of conflict, the English version controls.

Copyright (c) ${currentYear} RateMyHST - All Rights Reserved.`
}

function buildSpanishContent() {
  return `Esta política describe cómo RateMyHST responde a avisos DMCA y contra-notificaciones. Forma parte de nuestros Términos de Uso y es vinculante para todos los usuarios.

Avisos de infracción

Envía un aviso por escrito a nuestro agente designado con tu firma, la obra protegida, el enlace exacto, tus datos de contacto y las declaraciones exigidas por la DMCA (buena fe y autorización). Dirección del agente:

Copyright Agent  
50 Broad Street, 20th Floor  
New York, NY 10004  
copyright@ratemyhst.com

Contra-notificaciones

Si tu contenido fue retirado por error, puedes presentar una contra-notificación con tu firma, la ubicación del material y la declaración de buena fe (bajo pena de perjurio).

Política de reincidencia

Podemos suspender o cancelar cuentas con múltiples avisos válidos. Las cuentas canceladas no pueden reabrirse sin nuestro permiso.

Aviso legal

Esta traducción se proporciona para tu comodidad; la versión inglesa prevalece.

Copyright (c) ${currentYear} RateMyHST - Todos los derechos reservados.`
}

function buildFrenchContent() {
  return `Cette politique explique comment RateMyHST traite les avis DMCA. Joignez votre signature, l’œuvre concernée, le lien précis, vos coordonnées ainsi que les déclarations requises par la loi.

Agent désigné :

Copyright Agent  
50 Broad Street, 20th Floor  
New York, NY 10004  
copyright@ratemyhst.com

Notifications et contre-notifications sont traitées conformément à la DMCA. Nous supprimons le contenu signalé, avertissons l’utilisateur et pouvons rétablir le contenu si nous recevons une contre-notification valide.

Les récidivistes peuvent perdre l’accès au site. Cette traduction est fournie à titre informatif; la version anglaise fait foi.

Copyright (c) ${currentYear} RateMyHST - Tous droits réservés.`
}

function buildGermanContent() {
  return `RateMyHST folgt der DMCA-Systematik. Bitte sende Meldungen an unseren Agenten mit Signatur, Werksbeschreibung, exakter URL, Kontaktdaten und den gesetzlichen Erklärungen.

Copyright Agent  
50 Broad Street, 20th Floor  
New York, NY 10004  
copyright@ratemyhst.com

Wir informieren den betreffenden Nutzer über jede Meldung. Gegenanzeigen, die alle gesetzlichen Anforderungen erfüllen, können zur Wiederherstellung des Inhalts führen, sofern keine Klage eingereicht wurde. Mehrfache Verstöße können zur Kündigung des Kontos führen. Bei Widersprüchen gilt die englische Version.

Copyright (c) ${currentYear} RateMyHST - Alle Rechte vorbehalten.`
}

function buildChineseContent() {
  return `RateMyHST 遵循 DMCA 程序处理版权投诉。通知需包含签名、作品信息、侵权链接、联系方式以及善意声明。反通知需包含签名、原始位置和声明。本页面译文仅供参考，冲突时以英文为准。

Copyright (c) ${currentYear} RateMyHST - 版权所有。`
}

function buildJapaneseContent() {
  return `DMCA に基づく通知・反通知の方法と再犯者対応を説明します。通知には署名、作品情報、URL、連絡先、善意の宣言を含めてください。反通知でも同様に必要事項を記載してください。本翻訳は参考用であり、英語版が優先されます。

Copyright (c) ${currentYear} RateMyHST - All Rights Reserved.`
}
