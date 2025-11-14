'use client'

import { useEffect, useState } from 'react'

import { LegalDocument } from '@/components/LegalDocument'
import { LANGUAGE_VALUES, type LanguageChoice } from '@/lib/languageContent'

const ENGLISH_POLICY = `This is the privacy policy ("Privacy Policy") describing our privacy practices for the RateMyHST.com website, applications and other interactive services ("Site"). The Site is owned, operated and/or provided by RateMyHST, LLC ("RateMyHST," "we," "us," or "our"). This Privacy Policy is intended to explain our privacy practices and covers the following areas:

    When This Privacy Policy Applies.
    U.S. Governing Law.
    What Information Is Collected.
    How Is Collected Information Used.
    Your Choices.
    [reserved]
    Sharing and Disclosure of Information.
    Reviewing, Updating or Deleting Certain Information.
    Protection of Information.
    California Residents: Notice of Privacy Rights.
    Additional State Privacy Laws.
    Changes to this Privacy Policy and Notice.
    Miscellaneous.

1. When This Privacy Policy Applies. This Privacy Policy applies:

    Regardless of whether you are accessing the Site via a personal computer, a mobile device or any other technology or devices now known or hereafter developed or discovered (each, a "Device");
    Whether you are accessing the Site as a registered user (if offered by the Site) or other user of the Site;
    To all Information (as that term is defined below) collected by the Site (as defined above)
    To our use of combined information if we combine Information (as that term is defined below) collected by the Site with other information we collect from other sources, such as information received from RateMyHST (for example, information collected at a physical location), marketing companies or Advertisers; and
    Will remain in full force and effect even if your use of or participation in the Site or any particular service, feature, function or promotional activity offered through the Site terminates, expires, ceases, is suspended or deactivated for any reason.

This Privacy Policy does not, unless specifically stated, apply to any Information (as that term is defined below) collected by any other company or collected in any other manner or by any other website, application or other interactive service offered by RateMyHST.

By participating in this Site or any features, activities or services offered through the Site, you consent to our privacy practices as described in this Privacy Policy.

Certain products or services offered by this Site may be subject to additional privacy practices, such as practices on how Information is collected, used, shared and/or disclosed by such products or services and/or how you may exercise choice with regard to such Information ("Additional Privacy Statements"). These Additional Privacy Statements, if any, shall be provided to you in conjunction with those products and services and are hereby incorporated in this Privacy Policy by reference. To the extent that there is a conflict between this Privacy Policy and the Additional Privacy Statement for the activity in which you choose to participate, the Additional Privacy Statement shall govern.
2. U.S. Governing Law. The Site is designed and targeted to U.S. audiences and is governed by and operated in accordance with the laws of the U.S. We make no representation that this Site is operated in accordance with the laws or regulations of, or governed by, other nations. If you are located outside of the U.S., you use this Site at your own risk and initiative and you, not us, are responsible for compliance with any applicable local and national laws. Please be aware that any Personal Information and Other Information you provide to us or we obtain as a result of your use of this Site shall be collected in the U.S. and/or transferred to the U.S. and subject to U.S. law. By using this Site, participating in any Site activities and/or providing us with your Personal Information and Other Information, you (a) consent to the transfer and/or processing of any Information to and in the U.S., (b) acknowledge that U.S. law may provide a lower standard of protection for personal data than the laws of your location and (c) understand that we shall collect, transfer, store, process and/or deal with your Information in accordance with this Privacy Policy and U.S. law. Consequently, to the full extent permitted by law, you hereby waive any claims relating to the processing of your Personal Information or Other Information in accordance with this Privacy Policy that may arise under the laws and regulations that apply to you in or of any other country or jurisdiction.
3. What Information Is Collected.The Site is designed and targeted to U.S. audiences and is governed by and operated in accordance with the laws of the U.S. We make no representation that this Site is operated in accordance with the laws or regulations of, or governed by, other nations. If you are located outside of the U.S., you use this Site at your own risk and initiative and you, not us, are responsible for compliance with any applicable local and national laws. Please be aware that any Personal Information and Other Information you provide to us or we obtain as a result of your use of this Site shall be collected in the U.S. and/or transferred to the U.S. and subject to U.S. law. By using this Site, participating in any Site activities and/or providing us with your Personal Information and Other Information, you (a) consent to the transfer and/or processing of any Information to and in the U.S., (b) acknowledge that U.S. law may provide a lower standard of protection for personal data than the laws of your location and (c) understand that we shall collect, transfer, store, process and/or deal with your Information in accordance with this Privacy Policy and U.S. law. Consequently, to the full extent permitted by law, you hereby waive any claims relating to the processing of your Personal Information or Other Information in accordance with this Privacy Policy that may arise under the laws and regulations that apply to you in or of any other country or jurisdiction.

3.1 Information You Provide.

3.1.1 User RegistrationTo register as a member of the Site, you are required to select a user name and password (together, your "User ID") and may be required to also provide other Information, such as your email address and date of birth. Additional Information may be requested and/or required during the registration process. After you have registered for the Site, we may recognize you when you visit certain other RateMyHST websites, applications or other interactive services across Devices to register for and login on such other websites, applications or other interactive services, but please note that other RateMyHST websites, applications or other interactive services may set additional or different requirements for membership, such as minimum age. Also note that, for your online privacy and security, if other people have access to your Device, we recommend you log out of your account after visiting any of the websites, applications or other interactive services that are associated with your account.

3.1.2 In Connection with Certain Features and Functions.We may also provide you with access to certain features or functions that we may offer on the Site, such as the option to participate in commenting, shopping and member profile pages. To sign up for or participate in these features or functions, you may be required to provide us with certain Information about you in order for us to personalize and/or allow you to use such features and functions.

3.1.3 In Connection with Promotions such as Contests and Sweepstakes.There may be a separate registration process to enter Promotions (as defined in the Site's Terms of Use Agreement) such as contests and sweepstakes which may require the submission of all or some of the following: your first and last name, street address, city, state and zip code, email address, telephone number and date of birth. Additional Information may be requested depending on the specific Promotion. The Promotion's entry page and/or Rules shall provide the specific requirements. You may also have the opportunity to opt-in to receive special Promotions or offers from our third party advertisers, sponsors or promotional partners ("Advertisers") as a result of your use of the Site in connection with these Promotions.

3.2 Information Collected Through Use of Cookies and Other Tracking Technologies.The Site and/or third parties may use "cookies", "web beacons", Flash local shared objects and other similar tracking technologies (collectively, "Tracking Technologies") to collect information automatically as you browse the Site and the web. "Cookies" are typically html or browser-based text or other files (and often referred to as browser cookies) that help store information, user preferences and/or user activity. "Web beacons" (also known as image tags, gif, tracking pixels or web bugs) are small pieces of code used to collect data, such as counting page views, promotion views or advertising responses. Flash local shared objects ("LSOs") (sometimes known as Flash cookies and used if Adobe Flash is used) are text or other files that help store user preferences and/or activity.

These Tracking Technologies collect "click stream" data and additional information regarding your visits to the Site (such as your visits to the Site's webpages, type of browser use, type of operating system used, date and time of viewing, use of our features and purchasing history or preferences) or other websites, applications or interactive services. Through these Tracking Technologies, we may collect such information across multiple sessions on this Site and other websites, applications or other interactive services and may also collect or access your IP address (which is automatically assigned to any Device(s) and/or Device and Internet browser combination you use to access the Site) and/or set or access some other identifier unique to the Device(s), Device platform and/or Device-Internet browser combination you use to access the Site ("Identifier"). For example, we may set a unique alphanumeric Identifier unique to your home computer on Firefox, or access an Identifier provided by a mobile platform, such as the application or advertising Identifiers offered by Apple. We may combine any or all of the information we collect using Tracking Technologies and associate it and/or Identifiers with the Personal Information you provide to us and/or with other non-personally identifiable unique identifiers assigned by RateMyHST or third parties.

3.2.1 The Site's Use of Tracking Technologies to Collect Information.By visiting the Site, whether as a registered user or otherwise, you acknowledge and understand that you are giving us your consent to track your activities and your use of the Site and other websites, applications or interactive services through these Tracking Technologies and that we may use Tracking Technologies in the emails we send to you. See Your Choices section below for more information on how you can withdraw your consent for certain purposes.

We use Tracking Technologies to enable us to collect and then use Information as described in Section 4.2 below. For example, we may use Tracking Technologies to prevent you from seeing the same advertisements too many times or seeing advertisements too frequently, to tailor your experience on the Site by delivering relevant personalized advertising, email marketing and other content and to record if you have opted out of receiving personalized advertising from us.

3.2.2 Third Parties' Use of Tracking Technologies to Collect Information.This Site may additionally use a variety of third party advertising networks, data exchanges, data management platforms, supply side platforms, ad exchanges, traffic or audience measurement service providers, marketing analytics service providers and other third parties (collectively, "Third Party Service Providers") to, for example, facilitate personalized advertisements ("Customized Advertising") and/or other content, serve advertisements on the Site and/or measure and analyze advertising or content effectiveness and/or traffic on the Site. Customized Advertising enable us to, among other things, help deliver advertisements to you for products and services that you might be interested in based on your visits to the Site and other websites, applications or other interactive services you have visited.

Third Party Service Providers, as well as Advertisers and other third parties, may themselves set and access their own Tracking Technologies on your Device subject to your choices about those Tracking Technologies (see Sections 5.2.1 and 5.2.3 below) and/or they may otherwise collect or have access to Information about you and your online activities over time and across different websites when you use the Site.

We may also enlist the assistance of Third Party Service Providers so that the Site may set Tracking Technologies. For example, to the extent necessary to provide basic advertising serving services such as controlling how often you see advertisements or ensuring you do not see the same advertisement repeatedly, we may enlist the assistance of such Third Party Service Providers to create, customize or modify Tracking Technologies set by the Site.

Except to the extent necessary to provide services to the Site, Third Party Service Providers do not have access to Tracking Technologies set by the Site, but we may provide to Third Party Service Providers certain Information collected by Tracking Technologies set by the Site in order for the Site to provide Customized Advertising or in order for the Third Party Service Providers to provide other services to the Site, such as measuring or analyzing advertising or content effectiveness or traffic on the Site. For example, in order to analyze traffic on the Site, we may provide to our Third Party Service Providers certain information we collect about your interaction with the Site along with an Identifier so that the Third Party Service Provider may provide analytics services to the Site.
4. How Collected Information is Used.

4.1 Information You Provide.We use the Personal Information you provide in a variety of ways, including:

    Sending marketing and promotional emails, newsletters or text messages offering goods and/or services that may be of interest to users, whether those goods and/or services are provided by the Site, RateMyHST or third parties;
    Processing your registration with the Site, such as verifying that your email address is active and valid;
    Contacting you regarding the administration of your account, any services, features or functions you have enrolled in or registered to use, any Promotions you have participated in or have entered, any goods and/or services you have ordered through e-Commerce services available on the Site or any other transactions you have undertaken with the Site;
    Allowing you to participate in the public areas and/or other features of the Site;
    Responding to your questions or other requests;
    Contacting you regarding your use of the Site, for informational purposes related to the Site or, in our discretion, regarding changes to the Site's policies;
    Improving the Site or our services and for internal business purposes;
    Tailoring your experience on, and/or otherwise customizing what you see when you visit, the Site and/or other sites, applications or other interactive services across Devices whether owned, operated and/or provided by RateMyHST or by third parties (for example, to provide recommendations on content or provide advertisements, emails or other content of more interest to you);
    Saving your User ID or other Personal Information, so you don't have to re-enter it each time you visit the Site;
    Otherwise to maintain and administer the Site and
    For other purposes disclosed at the time you provide the Personal Information (for example, as set forth in the Rules for any Promotions you enter).

4.2 Identifiers and Information Collected Via Tracking Technologies.We use the Information we collect using Tracking Technologies in a variety of ways, including:

    Keeping count of your return visits to the Site or Advertisers' or partners' sites, applications or other interactive services;
    Accumulating and reporting aggregate, statistical information in connection with the Site and user activity;
    Analyzing, determining or anticipating which features, webpages, products and services users like best to, among other things, help us operate the Site and/or other RateMyHST websites, applications or other interactive services, enhance and improve our services and the Site and/or other RateMyHST or third party websites, applications or other interactive services and display advertising and marketing information on the Site and/or other RateMyHST or third party websites, applications or other interactive services (for example, to provide ads of interest to you on the Site or third party sites, to analyze effectiveness of advertisements, to assess the appeal of certain content to our general site audience and to understand your interactions with email messages we send and the content contained in such messages (such as the links clicked on within marketing and promotional emails we send and whether such messages were opened or forwarded));
    Preparing statistics reports;
    Allowing you to participate in the public areas and/or other features of the Site (for example, to enable you to use shopping carts on the Site);
    Improving our services, the Site and/or other websites, applications or other interactive services and for internal business purposes;
    Tailoring your experience on, and/or otherwise customizing what you see when you visit the Site and/or other sites, applications or other interactive services across Devices whether owned, operated and/or provided by RateMyHST or by third parties (for example, to provide recommendations on content or provide advertisements, emails or other content of more interest to you);
    Saving certain Information for use on your return visits to the Site and making your experience on this Site more convenient for you (for example, to recognize you by name when you return to the Site, to apply certain settings or preferences you have identified on this Site or other RateMyHST websites and to save your password in password-protected areas;
    Using certain characteristics that you enter about yourself on the Site, such as age or gender, for tailoring the online advertising and/or other content that you see when you visit the Site or other websites, applications or other interactive services whether owned, operated and/or provided by RateMyHST or by third parties, whether alone or in combination with other Information;
    Otherwise to maintain and administer the Site (for example, to prevent you from seeing the same advertisements too many times or seeing advertisements too frequently, to record if you have opted out of receiving personalized content or using IP address to pre-populate registration fields to facilitate your sign-up);
    For the uses described for "Personal Information" above; and
    For other purposes disclosed at or before the time the Information is collected.

4.3. Information Collected by Third Party Service Providers and Advertisers.The use of Tracking Technologies by Third Party Service Providers and Advertisers is within their control and not ours. Even if we have a relationship with the Third Party Service Provider or Advertiser, we do not control their websites, applications or other interactive services or their policies and practices regarding your Information and you should be aware that different rules might apply to the collection, use or disclosure of your Information by third parties in connection with their advertisements or promotions and other sites, applications or other interactive services you encounter on the Internet.
`

type PrivacyCopy = {
  title: string
  description: string
  updatedAt?: string
  content: string
}

const PRIVACY_COPY: Record<LanguageChoice, PrivacyCopy> = {
  English: {
    title: 'Privacy Policy',
    description: 'How RateMyHST collects, uses, shares, and safeguards personal information.',
    updatedAt: 'February 8, 2024',
    content: ENGLISH_POLICY,
  },
  Español: {
    title: 'Política de privacidad',
    description: 'Principios sobre recopilación de datos, opciones y derechos del usuario.',
    updatedAt: '8 de febrero de 2024',
    content: buildSpanishContent(),
  },
  Français: {
    title: 'Politique de confidentialité',
    description: 'Comment RateMyHST collecte, utilise et protège vos données.',
    updatedAt: '8 février 2024',
    content: buildFrenchContent(),
  },
  Deutsch: {
    title: 'Datenschutzerklärung',
    description: 'Transparenz über Datenerhebung, Nutzung, Weitergabe und Rechte.',
    updatedAt: '8. Februar 2024',
    content: buildGermanContent(),
  },
  中文: {
    title: '隐私政策',
    description: '了解 RateMyHST 如何收集、使用并保护个人数据。',
    updatedAt: '2024年2月8日',
    content: buildChineseContent(),
  },
  日本語: {
    title: 'プライバシーポリシー',
    description: 'RateMyHST におけるデータ収集・利用・共有と権利の説明。',
    updatedAt: '2024年2月8日',
    content: buildJapaneseContent(),
  },
}

export default function PrivacyContent() {
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

  const copy = PRIVACY_COPY[language] ?? PRIVACY_COPY.English

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

function buildSpanishContent() {
  return `Política de privacidad de RateMyHST

Esta traducción al español se ofrece para tu comodidad; la versión oficial es la inglesa.

1. Alcance. Aplica a todas las interacciones con el sitio y aplicaciones, sin importar el dispositivo ni si tienes cuenta.
2. Ley aplicable. El servicio opera bajo la ley de EE. UU.; al usarlo aceptas que tus datos se procesen en EE. UU.
3. Datos que recopilamos:
    • Información que proporcionas (registro, reseñas, mensajes, formularios).
    • Datos técnicos (IP, identificadores de dispositivo, cookies, registros).
    • Datos de terceros confiables para seguridad y marketing.
4. Uso de la información:
    • Operar, proteger y personalizar RateMyHST.
    • Moderar contenido, prevenir fraude y hacer cumplir los Términos de Uso.
    • Comunicaciones de servicio y avisos legales.
    • Cumplir requisitos legales y defender nuestros derechos.
5. Tus opciones:
    • Ajustar idioma, notificaciones y privacidad en el panel de configuración.
    • Controlar cookies desde el navegador (algunas funciones pueden cambiar).
    • Cancelar correos promocionales mediante el enlace de baja.
6. Cómo compartimos los datos:
    • Proveedores que nos prestan servicios (hosting, analítica, moderación) con obligaciones contractuales.
    • Autoridades u otras partes cuando la ley lo exige o para prevenir daños.
    • Transacciones corporativas, siempre que el sucesor respete este aviso.
7. Acceso y eliminación: envía solicitudes verificables a privacy@ratemyhst.com o a 50 Broad Street, 20th Floor, New York, NY 10004.
8. Seguridad: aplicamos medidas administrativas, técnicas y físicas apropiadas, aunque ningún sistema es infalible.
9. Derechos de California (CCPA):
    • Derecho a saber, eliminar, optar por no vender/compartir datos y a no recibir trato discriminatorio por ejercer tus derechos.
10. Otras leyes estatales: cumplimos con los requisitos adicionales (Colorado, Connecticut, Utah, Virginia, etc.) cuando corresponde.
11. Cambios: indicaremos la fecha “Última actualización” y, si el cambio es importante, lo notificaremos.
12. Contacto: privacy@ratemyhst.com.

Consulta la versión inglesa para el texto completo y vinculante.`
}

function buildFrenchContent() {
  return `Politique de confidentialité – Résumé français

Traduction fournie à titre informatif; l’original anglais prévaut.

1. Champ d’application : toutes les visites sur le site et les applis, via n’importe quel appareil.
2. Droit applicable : droit américain; l’utilisation implique un transfert de vos données vers les États‑Unis.
3. Informations collectées :
    • Données fournies (compte, évaluations, formulaires, messages).
    • Données techniques (adresse IP, cookies, identifiants d’appareils, logs).
    • Données de partenaires (sécurité, marketing).
4. Utilisation :
    • Fournir et sécuriser les services, personnaliser l’expérience.
    • Modérer le contenu et appliquer les Conditions d’utilisation.
    • Envoyer des notifications, remplir nos obligations légales.
5. Choix :
    • Modifier les préférences dans le panneau Paramètres.
    • Gérer les cookies via le navigateur.
    • Se désinscrire des emails marketing.
6. Partage :
    • Prestataires sous contrat, autorités lorsque la loi l’exige, opérations d’entreprise.
7. Accès / suppression : contactez privacy@ratemyhst.com pour soumettre une demande vérifiable.
8. Sécurité : protections administratives, techniques et physiques raisonnables.
9. Droits des Californiens (CCPA) : droit de savoir, de supprimer, d’opt-out de la “vente/partage” de données et d’obtenir un traitement non discriminatoire.
10. Autres lois d’État : nous respectons les exigences supplémentaires applicables.
11. Modifications : la date de mise à jour sera affichée et les changements majeurs seront signalés clairement.
12. Contact : privacy@ratemyhst.com.

Reportez-vous à la version anglaise pour toute interprétation officielle.`
}

function buildGermanContent() {
  return `RateMyHST Datenschutzhinweise (deutsche Zusammenfassung)

Nur zu Informationszwecken – rechtlich bindend ist der englische Text.

1. Geltung: alle Besuche des Angebots, egal welches Gerät oder ob ein Konto besteht.
2. Recht: US-Recht; Nutzung bedeutet Übermittlung der Daten in die USA.
3. Erhobene Daten:
    • Selbst eingegebene Informationen (Registrierung, Bewertungen, Support).
    • Technische Daten (IP, Cookies, Gerätekennungen, Nutzungsprotokolle).
    • Daten vertrauenswürdiger Dritter.
4. Nutzung:
    • Betrieb, Personalisierung, Missbrauchsbekämpfung, Kommunikation, Rechtspflichten.
5. Wahlmöglichkeiten:
    • Einstellungen für Sprache/Benachrichtigungen/Privatsphäre.
    • Cookie-Kontrolle via Browser.
    • Abmeldung von Marketing-E-Mails.
6. Weitergabe:
    • Dienstleister, Behörden bei Bedarf, Unternehmensübertragungen mit gleicher Schutzstufe.
7. Zugriff/Löschung: privacy@ratemyhst.com.
8. Sicherheit: angemessene technische/organisatorische Maßnahmen, keine Garantie absoluter Sicherheit.
9. Kalifornische Rechte (CCPA): Auskunft, Löschung, Opt-out, diskriminierungsfreie Behandlung.
10. Weitere Bundesstaaten: zusätzliche Anforderungen werden eingehalten.
11. Änderungen: neues Gültigkeitsdatum + Hinweis bei wesentlichen Anpassungen.
12. Kontakt: privacy@ratemyhst.com.

Bitte sieh dir für vollständige Details die englische Fassung an.`
}

function buildChineseContent() {
  return `RateMyHST 隐私政策（中文要点）

此内容仅供参考，最终以英文原文为准。

1. 适用范围：网站与应用的所有使用场景、设备与角色（注册或未注册）。
2. 法律：适用美国法律，使用即表示同意数据在美国处理。
3. 收集信息：
    • 用户提供的数据（账户、评论、联系）。
    • 自动信息（IP、Cookie、设备、活动日志）。
    • 可信第三方提供的数据。
4. 使用方式：提供与改进服务、个性化体验、执行条款、满足法律要求。
5. 选择权：在设置中管理语言/通知/隐私，浏览器控制 Cookie，邮件提供退订。
6. 信息共享：与受合同约束的供应商、法律要求的机构、企业交易相关方共享。
7. 访问/删除：发送可验证请求至 privacy@ratemyhst.com。
8. 安全：采取合理防护，但无法保证绝对安全。
9. 加州权利：知情权、删除权、拒绝出售/共享及无差别对待权（CCPA）。
10. 其他州法规：根据适用法律提供额外权利与控制。
11. 变更：更新时会标注日期，并在重大更改时发出通知。
12. 联系方式：privacy@ratemyhst.com。

请参阅英文原版以获取完整说明。`
}

function buildJapaneseContent() {
  return `RateMyHST プライバシーポリシー（日本語サマリー）

参照用の翻訳であり、法的効力は英語版が持ちます。

1. 対象範囲：サイトとアプリのあらゆる利用。
2. 準拠法：米国法。利用により米国内でのデータ処理に同意したとみなされます。
3. 収集情報：
    • ユーザーが提供するデータ。
    • 自動取得データ（IP、Cookie、デバイス情報、ログ）。
    • 信頼できる第三者からのデータ。
4. 利用目的：サービス運営、パーソナライズ、モデレーション、法令遵守。
5. 選択肢：設定パネルで言語や通知等を変更、ブラウザで Cookie 制御、メールの配信停止。
6. 共有：委託先や法的要求への対応、事業再編時の移転。
7. 開示・削除請求：privacy@ratemyhst.com まで。
8. セキュリティ：合理的な保護策を実装（絶対的な安全は保証できません）。
9. カリフォルニア州の権利：開示、削除、販売/共有のオプトアウト、差別禁止。
10. その他州法：対象州の追加義務を順守します。
11. 改定：更新日を明示し、重要な変更は適切に通知。
12. 問い合わせ：privacy@ratemyhst.com。

詳細は英語版をご確認ください。`
}
