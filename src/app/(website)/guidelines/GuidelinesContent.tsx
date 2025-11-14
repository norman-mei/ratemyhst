'use client'

import { useEffect, useState } from 'react'

import { LegalDocument } from '@/components/LegalDocument'
import { LANGUAGE_VALUES, type LanguageChoice } from '@/lib/languageContent'

const ENGLISH_GUIDELINES = `RateMyHST Guidelines

These are the official posting guidelines ("Site Guidelines") for www.ratemyhst.com website, application or other interactive service ("Site"). The Site is owned, operated and/or provided by RateMyHST, LLC ("RateMyHST," "we," "us," or "our") and these Site Guidelines are a part of, and Additional Terms under, our Terms of Use Agreement.

RateMyHST is the largest online destination for students to research and rate teachers, schools, and districts across the United States. Our mission is to provide a safe forum to share classroom experiences to help fellow students make critical education choices.

THE SITE/APP

The RateMyHST website (www.ratemyhst.com) and mobile app provide user generated feedback on teachers' teaching methods and their respective courses as well as user generated feedback on the lifestyle and facilities of school and district campuses.

Teacher ratings should only be posted by users who have taken a class from the teacher or who are currently taking a class with the teacher. For each course a teacher teaches, users are limited to posting one (1) comment. School ratings should only be posted by students who have attended or are currently attending the specific course, school or district being rated.

RateMyHST is NOT the place to report dangerous, illegal or illicit behaviors. If you believe that you, another teacher, or a student is in danger, we strongly advise you to report such incidences directly to your campus authorities or local law enforcement. (For more information and resources, please read here).

HOW WE WORK

RateMyHST has a team of moderators who read every rating submitted. We have defined site guidelines to help reinforce our mission and most importantly to ensure our decisions around moderation are 100% consistent, regardless of student or teacher. Our moderators are experts on our guidelines and will remove any comment that doesn't comply.

Did we miss something? If you feel an inappropriate comment should be removed from the site, we want to know. You can flag a comment for re-review and it will immediately be escalated to our moderators. Moderators will determine whether to remove the rating permanently or restore it to the website. Our moderators will never edit a rating to make it comply or remove a rating simply because it is a low score or negative review.

GUIDELINES:

Student Guidelines:

    Be honest in your reviews. You want to be able to trust these reviews when evaluating your course options so we ask that you contribute in the same spirit.
    When you are reviewing a class and/or teacher, it's often helpful to provide both pros and cons. This leads to much more credible and constructive feedback for your peers.
    Reviews should focus specifically on the course and your learning experience. Do not comment on a teacher's appearance, dress, age, gender or race.
    Avoid hearsay. We want you to share your individual experience and what you took away from the course. Don't speak on behalf of another; encourage others to submit their own reviews.
    This is not a forum for debate. Reviews that specifically reference another review will be removed. If you do not agree with someone's individual experience, we encourage you to share your own.
    We understand that not all teachers are the perfect match for each individual learning style. Tell us how the course or teacher wasn't the best for you in a way that helps others make their own decision.
    Reviews fueled by anger do not reflect well on the author and can be removed for violations such as profanity. Take a minute to step back and make sure your review will genuinely help others understand your experience.
    RateMyHST reserves the right to remove ratings that do not contain substantive comments.
    We only allow one student to review a teacher one time per course. Spamming or dogpiling an account will lead to comment removal and the account being temporarily locked on the site.
    When reading your fellow students' reviews, we encourage you to use your discretion and weigh every review amongst the others. Online reviews should be one of the many resources used when making a decision that affects your academic future.

Prohibited Content: Comments that contain the following will be removed:

    Profanity, name-calling, and/or vulgarity, derogatory remarks about religion, ethnicity or race, gender, physical appearance, age, mental and/or physical disabilities;
    Identifiable information about a teacher or student that would allow someone to contact the teacher/student outside of their school;
    References to a teacher's or student's family, personal life and/or sex life, including sexual innuendos;
    Claims that a teacher shows bias for or against a student or specific group of students (For more information and resources, please read here);
    Claims about a teacher's employment status, including previous employment;
    Claims that a teacher or student engages or has engaged in illegal activities;
    Direct references to other existing comments or comments that have been deleted by our moderators;
    Accusations that the teacher is rating themselves or their colleagues;
    A language other than English. Comments must be written in English only. French is allowed if you attend a French-Canadian school;
    Hyperlinks and/or URLs.

Teacher Guidelines:

    This is an anonymous website where students can share their classroom experiences. We are unable to provide any data or personal information about the submitter of a review.
    We do not proactively add any teacher, course or campus to our website, every profile was submitted by our student community.
    We are unable to remove a comment simply because it is negative. It will only be removed if it doesn't comply with our site guidelines.
    We encourage you to engage with students on the site by creating a RateMyHST account. With a teacher account, you have the ability to post a reply and get alerted when new ratings are posted on your profile. To create your teacher account, get started here.
    Replies fueled by anger do not reflect well on the author and can be removed for violations such as profanity. Take a minute to step back and make sure your reply will genuinely help others.
    RateMyHST's moderation team is unable to prove or disprove details mentioned in a review. We are not arbiters of facts. If you disagree with the details mentioned in a review, see paragraph above regarding managing your profile.
    If you believe that your profile is being spammed or dogpiled, please tell us. You can contact us at support@ratemyhst.com. We're here to help and will happily review the comments in question.
    While it is against our guidelines for a teacher to rate themselves, we recommend for teachers to encourage their students to provide ratings each semester. The more reviews you have, the more representative they will be.
    Teacher replies are subject to the same limitations regarding Prohibited Content, as set forth above.

FLAGGING A RATING

If you see a rating that you believe violates these Site Guidelines, please click the "report this rating" at the bottom of the comment and state the problem. Such comments will be evaluated by the Site's personnel. Please do not flag a rating just because you disagree with it.

SOME LEGAL STUFF

RateMyHST occasionally receives removal demands that include threats to sue RateMyHST. To date, no one has followed through with a lawsuit against us for our reviews.

The law protects RateMyHST from legal responsibility for the content submitted by our users, like the reviews that appear on our site. Specifically, the Communications Decency Act of 1996 (47 U.S.C. Sec. 230) created a federal immunity to any cause of action that would make service providers, like RateMyHST, liable for information originating with a third-party user of the service.

The law is clear on this. Anyone who wishes to sue RateMyHST for the reviews posted by our members risks penalties imposed by the court. These may include financial sanctions and reimbursement of our attorney's fees for our having to defend against a lawsuit that ignores obvious legal protections for RateMyHST.

If, despite our caution, you feel that legal action is the only recourse for you, our address for service of legal process is:

RateMyHST, LLC
50 Broad Street
20th Floor
New York, NY 10004

If you intend to serve documents on RateMyHST, LLC, please make sure that service is properly effected in the U.S. in accordance with all applicable law. We are not obligated to respond if service is not valid.

These guidelines are provided for informational purposes only and do not constitute legal advice. While we stand by our guidelines, you are encouraged to seek advice from an attorney who is competent in the relevant field of law.

RESERVATION OF RIGHTS

The Site reserves the right to remove any comments deemed as inappropriate, libelous, defamatory, indecent, vulgar or obscene, pornographic, sexually explicit or sexually suggestive, racially, culturally, or ethnically offensive, harmful, harassing, intimidating, threatening, hateful, objectionable, discriminatory, or abusive, or which may or may not appear to impersonate anyone else or that otherwise violate the Terms of Use Agreement.

The Site reserves the right to remove, provide to authorities or otherwise take appropriate action regarding comments that threaten violence or bodily harm to another user or teacher including, but not limited to, notifying the authorities of your IP address, where available, and the time you rated and taking any action as described in the Terms of Use Agreement and Privacy Policy.`

type GuidelinesCopy = {
  title: string
  description: string
  content: string
}

const GUIDELINES_COPY: Record<LanguageChoice, GuidelinesCopy> = {
  English: {
    title: 'Site Guidelines',
    description: 'Posting expectations for students and teachers across RateMyHST.',
    content: ENGLISH_GUIDELINES,
  },
  Español: {
    title: 'Directrices del sitio',
    description: 'Expectativas de publicación para estudiantes y docentes en RateMyHST.',
    content: buildSpanishContent(),
  },
  Français: {
    title: 'Directives du site',
    description: 'Règles de publication pour les élèves et les enseignants sur RateMyHST.',
    content: buildFrenchContent(),
  },
  Deutsch: {
    title: 'Website-Richtlinien',
    description: 'Verhaltens- und Postingregeln für Schüler:innen und Lehrkräfte auf RateMyHST.',
    content: buildGermanContent(),
  },
  中文: {
    title: '网站指南',
    description: 'RateMyHST 学生与教师的发帖须知。',
    content: buildChineseContent(),
  },
  日本語: {
    title: 'サイトガイドライン',
    description: 'RateMyHST 全体での投稿ルール。',
    content: buildJapaneseContent(),
  },
}

export default function GuidelinesContent() {
  const [language, setLanguage] = useState<LanguageChoice>('English')

  useEffect(() => {
    if (typeof document === 'undefined') return
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

  const copy = GUIDELINES_COPY[language] ?? GUIDELINES_COPY.English

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

function buildSpanishContent() {
  return `Guía del Sitio RateMyHST

Estas son las directrices oficiales de publicación ("Guía del Sitio") para el sitio web, la aplicación o cualquier otro servicio interactivo en www.ratemyhst.com ("Sitio"). El Sitio es propiedad y está operado por RateMyHST, LLC ("RateMyHST", "nosotros") y esta Guía del Sitio forma parte de, y constituye Términos Adicionales dentro de, nuestro Acuerdo de Términos de Uso.

RateMyHST es el mayor destino en línea para que estudiantes de todo Estados Unidos investiguen y califiquen docentes, escuelas y distritos. Nuestra misión es ofrecer un espacio seguro para compartir experiencias de aula que ayuden a otros estudiantes a tomar decisiones educativas fundamentales.

EL SITIO / LA APLICACIÓN

El sitio web de RateMyHST (www.ratemyhst.com) y la app móvil brindan opiniones generadas por los usuarios sobre los métodos de enseñanza de los docentes y sus cursos, así como comentarios acerca de la vida estudiantil e instalaciones de escuelas y distritos.

Las calificaciones sobre docentes solo deben publicarse si tomaste una clase con esa persona o la estás cursando actualmente. Para cada curso que dicta un docente, los usuarios solo pueden publicar un (1) comentario. Las valoraciones sobre escuelas solo deben publicarse si asististe o asistes al curso, escuela o distrito evaluado.

RateMyHST NO es el lugar para denunciar conductas peligrosas, ilegales o ilícitas. Si crees que tú, otro docente o un estudiante corren peligro, te recomendamos informar el incidente directamente a las autoridades del campus o a las fuerzas de seguridad locales. (Para más información y recursos, haz clic aquí).

CÓMO TRABAJAMOS

RateMyHST cuenta con un equipo de moderadores que lee cada reseña enviada. Definimos estas directrices para reforzar nuestra misión y garantizar que las decisiones de moderación sean 100% consistentes, sin importar el estudiante o docente. Nuestros moderadores conocen a fondo las reglas y eliminarán cualquier comentario que no las cumpla.

¿Nos falta algo? Si consideras que un comentario inapropiado debe retirarse del sitio, avísanos. Puedes marcarlo para que sea revisado nuevamente y se enviará de inmediato a nuestros moderadores. Ellos decidirán si eliminarlo de forma permanente o restaurarlo. Nunca editaremos una reseña para que cumpla las reglas ni la quitaremos solo porque tiene una calificación baja o es negativa.

DIRECTRICES:

Directrices para estudiantes:

    Sé honesto en tus reseñas. Querrás confiar en los comentarios cuando evalúes tus opciones, así que contribuye con ese mismo espíritu.
    Al evaluar una clase y/o docente, resulta útil compartir tanto aspectos positivos como negativos. Eso vuelve tus aportes más creíbles y constructivos para tus pares.
    Concéntrate en el curso y en tu experiencia de aprendizaje. No comentes la apariencia, vestimenta, edad, género o raza del docente.
    Evita el rumor o lo que oíste de terceros. Comparte tu vivencia personal y lo que aprendiste. No hables en nombre de otra persona; invítala a publicar su propia reseña.
    Este no es un foro de debate. Las reseñas que hagan referencia directa a otra serán eliminadas. Si no estás de acuerdo con la experiencia de alguien, comparte la tuya.
    Sabemos que no todos los docentes se ajustan a cada estilo de aprendizaje. Explica por qué el curso o el docente no fueron ideales para ti de una manera que ayude a otros a decidir.
    Las reseñas escritas con rabia no reflejan bien a quien las publica y pueden eliminarse por infracciones como lenguaje ofensivo. Tómate un minuto para asegurarte de que tu reseña realmente ayudará a otros.
    RateMyHST se reserva el derecho de eliminar las valoraciones que no contengan comentarios sustanciales.
    Solo permitimos que un estudiante evalúe a un docente una vez por curso. El spam o los intentos coordinados para saturar un perfil resultarán en la eliminación de los comentarios y el bloqueo temporal de la cuenta.
    Cuando leas las reseñas de otros estudiantes, usa tu criterio y compáralas entre sí. Las opiniones en línea deben ser solo uno de los recursos que consideres al tomar decisiones académicas importantes.

Contenido prohibido: Se eliminarán los comentarios que contengan:

    Palabrotas, insultos, vulgaridades o descalificaciones sobre religión, etnia, raza, género, apariencia física, edad o discapacidades físicas o mentales.
    Información que permita identificar y contactar a un docente o estudiante fuera de la escuela.
    Referencias a la familia, vida personal y/o vida sexual de un docente o estudiante, incluidas insinuaciones sexuales.
    Afirmaciones de que un docente muestra favoritismo o prejuicio hacia un estudiante o grupo específico (para más información y recursos, lee aquí).
    Comentarios sobre la situación laboral del docente, incluido su historial de empleo.
    Afirmaciones de que un docente o estudiante participa o participó en actividades ilegales.
    Referencias directas a otros comentarios existentes o a comentarios eliminados por nuestros moderadores.
    Acusaciones de que el docente se califica a sí mismo o a sus colegas.
    Idiomas distintos al inglés. Las reseñas deben escribirse únicamente en inglés. Se permite francés si asistes a una escuela franco-canadiense.
    Hipervínculos y/o URL.

Directrices para docentes:

    Este es un sitio anónimo donde los estudiantes comparten experiencias de aula. No podemos proporcionar datos ni información personal sobre quienes envían reseñas.
    No añadimos de forma proactiva docentes, cursos o campus. Cada perfil fue creado por nuestra comunidad estudiantil.
    No podemos eliminar un comentario solo porque sea negativo. Solo se retirará si incumple estas directrices.
    Te animamos a interactuar con los estudiantes creando una cuenta de RateMyHST para docentes. Con ella puedes responder reseñas y recibir alertas cuando se publique una nueva en tu perfil. Para crearla, comienza aquí.
    Las respuestas escritas con rabia no reflejan bien a la persona autora y pueden eliminarse por infringir reglas como el uso de insultos. Respira antes de responder y asegúrate de que tu aporte ayude a otros.
    El equipo de moderación de RateMyHST no puede probar o refutar los hechos mencionados en una reseña. No somos árbitros de la verdad. Si no estás de acuerdo con los detalles, revisa el párrafo anterior sobre cómo administrar tu perfil.
    Si crees que tu perfil está recibiendo spam o ataques coordinados, cuéntanoslo. Puedes escribirnos a support@ratemyhst.com. Queremos ayudarte y revisaremos con gusto los comentarios señalados.
    Aunque va en contra de nuestras directrices que un docente se califique a sí mismo, recomendamos que animen a su alumnado a publicar reseñas cada semestre. Cuantas más reseñas tengas, más representativas serán.
    Las respuestas de docentes están sujetas a las mismas limitaciones de Contenido Prohibido descritas más arriba.

REPORTAR UNA CALIFICACIÓN

Si ves una reseña que viola estas Directrices del Sitio, haz clic en "report this rating" al final del comentario e indica el problema. Nuestro personal la evaluará. No marques una reseña solo porque no estés de acuerdo con ella.

ALGUNOS ASPECTOS LEGALES

RateMyHST a veces recibe solicitudes de eliminación que incluyen amenazas de demanda. Hasta la fecha, nadie ha seguido adelante con una demanda contra nosotros por las reseñas del sitio.

La ley protege a RateMyHST de la responsabilidad legal por el contenido enviado por los usuarios, como las reseñas publicadas en nuestro sitio. En particular, la Ley de Decencia en las Comunicaciones de 1996 (47 U.S.C. Sec. 230) otorga inmunidad federal a los proveedores de servicios, como RateMyHST, frente a acciones basadas en contenido generado por terceros.

La ley es clara al respecto. Quien decida demandar a RateMyHST por reseñas publicadas por nuestros miembros se expone a sanciones del tribunal. Estas pueden incluir multas y el reembolso de los honorarios legales en los que incurramos para defendernos de una demanda que ignore las protecciones legales evidentes para RateMyHST.

Si, pese a esta advertencia, consideras que la acción legal es tu único recurso, nuestra dirección para notificaciones legales es:

RateMyHST, LLC
50 Broad Street
20th Floor
New York, NY 10004

Si planeas notificar a RateMyHST, LLC, asegúrate de que la notificación se efectúe correctamente en EE. UU. conforme a la ley aplicable. No estamos obligados a responder si la notificación no es válida.

Estas directrices se ofrecen solo con fines informativos y no constituyen asesoría legal. Aunque las respaldamos, te animamos a buscar la orientación de un abogado competente en la materia.

RESERVA DE DERECHOS

El Sitio se reserva el derecho de eliminar cualquier comentario que consideremos inapropiado, difamatorio, indecente, vulgar u obsceno; pornográfico, sexualmente explícito o sugerente; ofensivo por razones raciales, culturales o étnicas; dañino, acosador, intimidante, amenazante, odioso, discriminatorio o abusivo; que pretenda suplantar a otra persona; o que infrinja el Acuerdo de Términos de Uso.

El Sitio se reserva el derecho de retirar, entregar a las autoridades o tomar las medidas que correspondan respecto de comentarios que amenacen con violencia o daño físico a otra persona. Esto incluye, entre otros, notificar a las autoridades tu dirección IP (cuando esté disponible), la hora en que publicaste la reseña y cualquier otra acción descrita en el Acuerdo de Términos de Uso y la Política de Privacidad.`
}

function buildFrenchContent() {
  return `Directives de RateMyHST

Voici les directives officielles de publication ("Directives du Site") pour le site web, l'application ou tout autre service interactif www.ratemyhst.com ("Site"). Le Site appartient à RateMyHST, LLC ("RateMyHST", "nous") et ces Directives du Site font partie intégrante de nos Conditions d'utilisation.

RateMyHST est la plus grande plateforme en ligne pour que les élèves des États-Unis recherchent et évaluent des enseignants, des écoles et des districts. Notre mission est d'offrir un espace sûr pour partager des expériences de classe et aider les autres à faire des choix scolaires essentiels.

LE SITE / L'APPLICATION

Le site web RateMyHST (www.ratemyhst.com) et l'application mobile proposent des avis générés par les utilisateurs sur les méthodes d'enseignement et les cours des professeurs, ainsi que sur la vie étudiante et les infrastructures des écoles et districts.

Les évaluations d'enseignants ne doivent être publiées que par des utilisateurs qui ont suivi (ou suivent actuellement) un cours avec cet enseignant. Pour chaque cours assuré par un enseignant, un utilisateur est limité à un (1) commentaire. Les évaluations d'écoles ne doivent être publiées que par des élèves qui ont fréquenté ou fréquentent encore l'établissement ou le district évalué.

RateMyHST n'est PAS un endroit pour signaler des comportements dangereux, illégaux ou illicites. Si vous pensez que vous-même, un enseignant ou un élève êtes en danger, informez immédiatement les autorités de votre établissement ou les forces de l'ordre locales. (Pour plus d'informations et de ressources, cliquez ici.)

NOTRE MÉTHODE DE TRAVAIL

RateMyHST dispose d'une équipe de modérateurs qui lit chaque avis reçu. Nous avons défini ces directives pour renforcer notre mission et garantir que nos décisions de modération soient cohérentes à 100 %, quel que soit l'élève ou l'enseignant concerné. Nos modérateurs maîtrisent ces règles et supprimeront tout commentaire qui ne s'y conforme pas.

Avons-nous manqué quelque chose ? Si vous pensez qu'un commentaire inapproprié doit être retiré, faites-le-nous savoir. Vous pouvez le signaler pour une nouvelle vérification : il sera immédiatement transmis à nos modérateurs, qui décideront de le supprimer définitivement ou de le rétablir. Nous n'éditerons jamais un avis pour le rendre conforme et ne le retirerons pas uniquement parce qu'il est négatif ou assorti d'une note faible.

DIRECTIVES :

Directives pour les élèves :

    Soyez honnête dans vos avis. Vous voulez pouvoir faire confiance aux évaluations lorsque vous choisissez vos cours, alors contribuez avec le même sérieux.
    Lorsque vous évaluez une classe et/ou un enseignant, il est utile de présenter les points forts et les points faibles. Cela rend votre retour plus crédible et constructif pour vos pairs.
    Concentrez-vous sur le cours et votre expérience d'apprentissage. N'abordez pas l'apparence, la tenue, l'âge, le genre ou l'origine ethnique d'un enseignant.
    Évitez les rumeurs. Partagez votre expérience personnelle et ce que vous en avez retiré. Ne parlez pas au nom d'autrui; encouragez les autres à publier leur propre avis.
    Ce n'est pas un forum de débat. Les avis qui répondent spécifiquement à un autre seront supprimés. Si vous n'êtes pas d'accord avec l'expérience de quelqu'un, partagez la vôtre.
    Nous savons que tous les enseignants ne correspondent pas à chaque style d'apprentissage. Expliquez pourquoi le cours ou l'enseignant n'était pas idéal pour vous d'une façon qui aide les autres à décider.
    Les avis rédigés sous l'effet de la colère ne valorisent pas leur auteur et peuvent être supprimés pour des motifs tels que le langage grossier. Prenez un instant pour vérifier que votre avis aidera réellement les autres.
    RateMyHST se réserve le droit de retirer les évaluations qui ne comportent pas de commentaires substantiels.
    Un élève ne peut évaluer un enseignant qu'une seule fois par cours. Le spam ou les attaques coordonnées entraîneront la suppression des commentaires et le verrouillage temporaire du compte.
    Lorsque vous lisez les avis d'autres élèves, exercez votre jugement et remettez chaque avis en contexte. Les avis en ligne doivent être l'une des nombreuses ressources utilisées pour vos décisions académiques.

Contenu interdit : seront supprimés les commentaires contenant :

    Propos grossiers, insultes, vulgarités ou remarques dénigrantes sur la religion, l'origine ethnique ou raciale, le genre, l'apparence physique, l'âge, les handicaps physiques ou mentaux.
    Toute information permettant d'identifier un enseignant ou un élève et de le contacter en dehors de l'école.
    Des références à la famille, à la vie personnelle et/ou à la vie sexuelle d'un enseignant ou d'un élève, y compris les insinuations sexuelles.
    Des affirmations selon lesquelles un enseignant favorise ou discrimine un élève ou un groupe spécifique (pour plus de ressources, cliquez ici).
    Des déclarations sur la situation professionnelle d'un enseignant, y compris ses emplois précédents.
    Des allégations affirmant qu'un enseignant ou un élève se livre à des activités illégales.
    Des références directes à d'autres commentaires existants ou à des commentaires supprimés par nos modérateurs.
    Des accusations selon lesquelles un enseignant s'autoévalue ou évalue ses collègues.
    Un autre langage que l'anglais. Les avis doivent être rédigés uniquement en anglais. Le français est autorisé si vous fréquentez une école franco-canadienne.
    Des hyperliens et/ou URL.

Directives pour les enseignants :

    Ce site est anonyme : les élèves y partagent leurs expériences de classe. Nous ne pouvons pas fournir d'informations ni de données personnelles sur l'auteur d'un avis.
    Nous n'ajoutons pas proactivement d'enseignants, de cours ou d'établissements. Chaque profil provient de notre communauté d'élèves.
    Nous ne pouvons pas supprimer un commentaire simplement parce qu'il est négatif. Il ne sera retiré que s'il ne respecte pas ces directives.
    Nous vous encourageons à dialoguer avec les élèves sur le site en créant un compte enseignant RateMyHST. Vous pourrez répondre aux avis et recevoir une alerte lorsqu'un nouveau commentaire est publié. Pour créer votre compte enseignant, cliquez ici.
    Les réponses rédigées sous l'effet de la colère ne valorisent pas leur auteur et peuvent être supprimées pour langage inapproprié. Prenez du recul et assurez-vous que votre réponse aidera réellement les lecteurs.
    L'équipe de modération de RateMyHST ne peut pas vérifier ou infirmer les faits mentionnés dans un avis. Nous ne sommes pas arbitres de la vérité. Si vous contestez un détail, reportez-vous au paragraphe ci-dessus sur la gestion de votre profil.
    Si vous pensez que votre profil est visé par du spam ou une campagne coordonnée, contactez-nous à support@ratemyhst.com. Nous examinerons volontiers les commentaires concernés.
    Même s'il est contraire à nos directives qu'un enseignant s'évalue lui-même, nous lui recommandons d'encourager ses élèves à laisser un avis chaque semestre. Plus vous avez d'avis, plus ils sont représentatifs.
    Les réponses des enseignants sont soumises aux mêmes restrictions concernant le Contenu interdit mentionné ci-dessus.

SIGNALER UNE ÉVALUATION

Si vous voyez une évaluation qui enfreint ces Directives du Site, cliquez sur "report this rating" au bas du commentaire et précisez le problème. Le personnel du Site l'examinera. Ne signalez pas une évaluation uniquement parce que vous n'êtes pas d'accord.

QUELQUES PRÉCISIONS JURIDIQUES

RateMyHST reçoit parfois des demandes de retrait accompagnées de menaces de poursuites. À ce jour, personne n'a donné suite à une action en justice à cause des avis publiés sur notre site.

La loi protège RateMyHST contre la responsabilité liée au contenu soumis par nos utilisateurs, notamment les avis publiés en ligne. La section 230 du Communications Decency Act de 1996 (47 U.S.C. Sec. 230) offre une immunité fédérale à tout fournisseur de services tel que RateMyHST pour le contenu créé par des tiers.

La loi est très claire. Toute personne qui poursuit RateMyHST pour des avis rédigés par nos membres s'expose à des sanctions du tribunal. Elles peuvent inclure des amendes et le remboursement de nos frais d'avocat, car nous devons nous défendre contre une plainte qui ignore ces protections légales.

Si, malgré nos avertissements, vous estimez que seule une action en justice est possible, notre adresse pour toute signification est :

RateMyHST, LLC
50 Broad Street
20th Floor
New York, NY 10004

Si vous souhaitez signifier un acte à RateMyHST, LLC, assurez-vous que la procédure respecte les lois en vigueur aux États-Unis. Nous ne sommes pas tenus de répondre si la signification n'est pas valide.

Ces directives sont fournies à titre informatif uniquement et ne constituent pas un avis juridique. Même si nous les soutenons, nous vous recommandons de consulter un avocat qualifié dans le domaine concerné.

RÉSERVE DE DROITS

Le Site se réserve le droit de retirer tout commentaire jugé inapproprié, diffamatoire, indécent, vulgaire ou obscène; pornographique, sexuellement explicite ou suggestif; offensant sur le plan racial, culturel ou ethnique; nuisible, harcelant, intimidant, menaçant, haineux, discriminatoire ou abusif; usurpant l'identité de quelqu'un; ou contrevenant de toute autre manière aux Conditions d'utilisation.

Le Site se réserve le droit de retirer, de transmettre aux autorités ou de prendre toute mesure appropriée concernant les commentaires qui menacent de violence ou de dommages corporels. Cela comprend, sans s'y limiter, la communication aux autorités de votre adresse IP (le cas échéant), de l'heure de publication de la note et toute autre action décrite dans les Conditions d'utilisation et la Politique de confidentialité.`
}

function buildGermanContent() {
  return `RateMyHST-Richtlinien

Dies sind die offiziellen Veröffentlichungsrichtlinien ("Site Guidelines") für die Website, App oder jeden anderen interaktiven Dienst unter www.ratemyhst.com ("Site"). Die Site gehört zu RateMyHST, LLC ("RateMyHST", "wir") und diese Richtlinien sind Teil unserer Nutzungsbedingungen.

RateMyHST ist die größte Online-Anlaufstelle für Schüler:innen in den USA, um Lehrkräfte, Schulen und Schulbezirke zu recherchieren und zu bewerten. Unser Ziel ist es, einen sicheren Raum zu schaffen, in dem Klassenerfahrungen geteilt werden können, damit andere bessere Bildungsentscheidungen treffen.

DIE WEBSITE / APP

Die RateMyHST-Website (www.ratemyhst.com) und die mobile App enthalten nutzergenerierte Rückmeldungen zu Unterrichtsmethoden, Kursen sowie zur Campus-Erfahrung von Schulen und Distrikten.

Bewertungen von Lehrkräften dürfen nur von Nutzer:innen veröffentlicht werden, die den Unterricht besucht haben oder aktuell besuchen. Pro Kurs darf nur ein (1) Kommentar pro Nutzer:in abgegeben werden. Schulbewertungen dürfen nur von Schüler:innen abgegeben werden, die den betreffenden Kurs, die Schule oder den Bezirk besucht haben oder aktuell besuchen.

RateMyHST ist NICHT der Ort, um gefährliches, illegales oder unerlaubtes Verhalten zu melden. Wenn du glaubst, dass du selbst, eine Lehrkraft oder ein:e Schüler:in in Gefahr bist, informiere unverzüglich die Verantwortlichen deiner Schule oder die örtlichen Behörden. (Weitere Informationen findest du hier.)

SO ARBEITEN WIR

RateMyHST verfügt über ein Moderationsteam, das jede eingereichte Bewertung liest. Wir haben diese Richtlinien festgelegt, um unsere Mission zu stärken und zu gewährleisten, dass Moderationsentscheidungen zu 100 % konsistent sind – unabhängig von der Person, die bewertet. Unsere Moderator:innen kennen jede Regel genau und entfernen Kommentare, die dagegen verstoßen.

Haben wir etwas übersehen? Wenn du meinst, dass ein unangemessener Kommentar entfernt werden sollte, sag es uns. Du kannst ihn zur erneuten Prüfung melden; dann landet er sofort bei unserem Moderations-Team. Dieses entscheidet, ob der Eintrag dauerhaft gelöscht oder wiederhergestellt wird. Wir bearbeiten Bewertungen niemals, um sie konform zu machen, und entfernen sie nicht nur aufgrund niedriger Noten oder negativer Aussagen.

RICHTLINIEN:

Richtlinien für Schüler:innen:

    Sei ehrlich in deinen Bewertungen. Du möchtest dich später selbst auf diese Einschätzungen verlassen können – gib deine Beiträge daher im selben Geist ab.
    Wenn du einen Kurs und/oder eine Lehrkraft bewertest, sind sowohl Plus- als auch Minuspunkte hilfreich. So entsteht konstruktives und glaubwürdiges Feedback.
    Konzentriere dich auf den Kurs und deine Lernerfahrung. Kommentare zum Aussehen, zur Kleidung, zum Alter, Geschlecht oder zur Herkunft einer Lehrkraft sind tabu.
    Vermeide Hörensagen. Teile deine eigene Erfahrung und das, was du aus dem Kurs mitgenommen hast. Sprich nicht für andere; bitte sie, ihre eigene Bewertung abzugeben.
    Das ist kein Diskussionsforum. Bewertungen, die sich ausdrücklich auf eine andere Bewertung beziehen, werden entfernt. Wenn du nicht zustimmst, schildere stattdessen deine Sicht.
    Wir wissen, dass nicht jede Lehrkraft zu jedem Lernstil passt. Erkläre, warum der Kurs oder die Lehrkraft für dich nicht ideal war – auf eine Art, die anderen hilft.
    Aus Wut geschriebene Bewertungen wirken schlecht auf die Autor:innen und können wegen Verstößen wie vulgärer Sprache entfernt werden. Atme kurz durch und frag dich, ob dein Beitrag wirklich hilfreich ist.
    RateMyHST behält sich das Recht vor, Bewertungen ohne aussagekräftigen Kommentar zu löschen.
    Jede Lehrkraft darf von einem/einer Schüler:in nur einmal pro Kurs bewertet werden. Spam oder koordinierte Angriffe führen zur Löschung der Kommentare und zur temporären Sperre des Accounts.
    Wenn du die Bewertungen anderer liest, nutze dein Urteilsvermögen und setze jede Rezension in Relation zu den anderen. Online-Bewertungen sollten nur eine von vielen Entscheidungsgrundlagen sein.

Unzulässige Inhalte: Folgende Kommentare werden entfernt:

    Profanitäten, Beleidigungen oder vulgäre Äußerungen sowie abwertende Bemerkungen über Religion, Ethnie, Geschlecht, Aussehen, Alter oder körperliche/psychische Beeinträchtigungen.
    Identifizierbare Informationen, die es ermöglichen, eine Lehrkraft oder einen/eine Schüler:in außerhalb der Schule zu kontaktieren.
    Hinweise auf Familie, Privatleben und/oder Sexualleben einer Lehrkraft oder eines/einer Schüler:in, einschließlich sexueller Anspielungen.
    Behauptungen, dass eine Lehrkraft eine bestimmte Person oder Gruppe bevorzugt oder benachteiligt (weitere Informationen findest du hier).
    Aussagen über den Beschäftigungsstatus einer Lehrkraft, einschließlich früherer Anstellungen.
    Behauptungen, dass eine Lehrkraft oder ein:e Schüler:in illegale Aktivitäten ausübt oder ausgeübt hat.
    Direkte Verweise auf andere bestehende Kommentare oder auf Beiträge, die unsere Moderator:innen gelöscht haben.
    Anschuldigungen, dass Lehrkräfte sich selbst oder Kolleg:innen bewerten.
    Andere Sprachen als Englisch. Bewertungen müssen auf Englisch verfasst werden. Französisch ist erlaubt, wenn du eine frankokanadische Schule besuchst.
    Hyperlinks und/oder URLs.

Richtlinien für Lehrkräfte:

    Das ist eine anonyme Website, auf der Schüler:innen ihre Erfahrungen teilen. Wir können keine Daten oder persönlichen Informationen über Verfasser:innen einer Bewertung herausgeben.
    Wir fügen keine Lehrkräfte, Kurse oder Standorte eigenständig hinzu – jedes Profil stammt aus unserer Community.
    Ein Kommentar wird nicht allein deshalb gelöscht, weil er negativ ist. Er wird nur entfernt, wenn er gegen diese Richtlinien verstößt.
    Wir ermutigen dich, mit den Schüler:innen auf der Website zu interagieren, indem du ein RateMyHST-Lehrkraftkonto anlegst. Damit kannst du antworten und wirst informiert, wenn neue Bewertungen erscheinen. Hier geht es los.
    Antworten, die aus Wut geschrieben werden, werfen kein gutes Licht auf dich und können wegen Verstößen wie Fäkalsprache entfernt werden. Nimm dir einen Moment Zeit, bevor du antwortest.
    Das Moderationsteam von RateMyHST kann die in einer Bewertung genannten Details weder bestätigen noch widerlegen. Wir sind keine Schiedsrichter der Wahrheit. Wenn du anderer Meinung bist, sieh dir den Absatz oben zur Profilverwaltung an.
    Wenn du glaubst, dass dein Profil gespammt oder angegriffen wird, sag uns Bescheid. Schreib an support@ratemyhst.com. Wir helfen gern und prüfen die betroffenen Kommentare.
    Auch wenn es gegen unsere Richtlinien verstößt, dass Lehrkräfte sich selbst bewerten, empfehlen wir dir, deine Schüler:innen zu motivieren, jedes Semester Feedback zu geben. Je mehr Bewertungen, desto aussagekräftiger.
    Antworten von Lehrkräften unterliegen denselben Regeln zu unzulässigen Inhalten wie oben beschrieben.

MELDEN EINER BEWERTUNG

Wenn du eine Bewertung entdeckst, die gegen diese Site Guidelines verstößt, klicke unten auf "report this rating" und beschreibe das Problem. Unser Team prüft den Beitrag. Bitte melde keine Bewertung nur, weil du anderer Meinung bist.

RECHTLICHE HINWEISE

RateMyHST erhält gelegentlich Löschungsforderungen, die mit Klagedrohungen verbunden sind. Bisher hat jedoch niemand wegen der Bewertungen auf unserer Website tatsächlich geklagt.

Das Gesetz schützt RateMyHST vor Haftung für Inhalte, die von Nutzer:innen stammen – also auch für die Bewertungen auf unserer Seite. Insbesondere gewährt der Communications Decency Act von 1996 (47 U.S.C. Sec. 230) Diensteanbietern wie RateMyHST Immunität gegenüber Klagen, die sich auf Inhalte Dritter beziehen.

Das Gesetz ist eindeutig. Wer RateMyHST wegen der Bewertungen unserer Community verklagt, riskiert gerichtliche Sanktionen. Dazu können Geldstrafen und die Erstattung unserer Anwaltskosten gehören, weil wir uns gegen eine Klage verteidigen müssen, die offensichtliche Schutzmechanismen ignoriert.

Solltest du trotz dieser Hinweise rechtliche Schritte für unvermeidbar halten, lautet unsere Zustelladresse:

RateMyHST, LLC
50 Broad Street
20th Floor
New York, NY 10004

Wenn du RateMyHST, LLC Schriftstücke zustellen willst, achte darauf, dass die Zustellung in den USA ordnungsgemäß und nach geltendem Recht erfolgt. Wir sind nicht verpflichtet zu reagieren, wenn die Zustellung unwirksam ist.

Diese Richtlinien dienen ausschließlich Informationszwecken und stellen keine Rechtsberatung dar. Auch wenn wir dahinterstehen, empfehlen wir dir, anwaltlichen Rat von einer fachkundigen Person einzuholen.

RECHTSVORBEHALT

Die Site behält sich das Recht vor, Kommentare zu entfernen, die wir als unangemessen, verleumderisch, anstößig, vulgär oder obszön; pornografisch, sexuell explizit oder suggestiv; rassistisch, kulturell oder ethnisch verletzend; schädlich, belästigend, einschüchternd, bedrohend, hasserfüllt, diskriminierend oder missbräuchlich einstufen oder die eine andere Person imitieren oder sonst gegen die Nutzungsbedingungen verstoßen.

Die Site behält sich das Recht vor, Kommentare, die Gewalt oder körperlichen Schaden androhen, zu entfernen, an Behörden weiterzugeben oder andere geeignete Maßnahmen zu ergreifen. Dazu gehört unter anderem, den Behörden deine IP-Adresse (falls verfügbar) und den Zeitpunkt deiner Bewertung mitzuteilen sowie jede weitere Maßnahme einzuleiten, die in den Nutzungsbedingungen und der Datenschutzrichtlinie genannt ist.`
}

function buildChineseContent() {
  return `RateMyHST 网站指南

以下内容是 www.ratemyhst.com 网站、应用或任何其他交互式服务（统称“网站”）的官方发布规范（“网站指南”）。本网站由 RateMyHST, LLC（“RateMyHST”“我们”）拥有、运营并/或提供，本指南属于我们的《使用条款》并构成其中的附加条款。

RateMyHST 是全美最大的在线平台，帮助学生查找并评价教师、学校与学区。我们的使命是在安全的环境中分享课堂体验，帮助更多同伴做出重要的教育选择。

网站 / 应用：

RateMyHST 网站（www.ratemyhst.com）和移动应用提供用户生成的反馈，内容涉及教师的教学方式、所授课程，以及学校和学区校园的生活与设施。

只有真正上过该教师课程或正在上课的用户才能发布教师评价。对于教师所教授的每一门课，用户最多只能发表一条评论。只有曾就读或正在就读所评课程、学校或学区的学生才可以发布学校评价。

RateMyHST 不是报告危险、违法或不当行为的渠道。如果你认为自己、其他教师或学生正处于危险之中，请立即向校园安全部门或当地执法机构报告。（了解更多信息和资源，请点击此处。）

我们的工作方式：

RateMyHST 拥有一支审核团队，会阅读每一条提交的评价。我们制定这些指南，是为了强化我们的使命，并确保无论是谁，审核标准都保持 100% 一致。我们的审核人员非常熟悉这些规则，任何不符合要求的评论都会被移除。

是不是漏掉了什么？如果你认为网站上的某条不当评论应该被删除，请告诉我们。你可以标记该评论以便重新审核，它会立即发送给我们的审核团队。我们会决定是否永久删除或恢复该评论。我们不会为了让评论合规而编辑内容，也不会因为评分低或意见负面就删除评论。

指南：

学生须知：

    请在评价中保持诚实。你希望在选择课程时可以信赖他人的评论，因此我们也请你以同样的态度做出贡献。
    当你评价课程和/或教师时，同时提供优点和不足常常更有帮助，这能让你的反馈更可信、更具建设性。
    评论应专注于课程和你的学习体验。不要评论教师的外貌、穿着、年龄、性别或种族。
    避免传播道听途说。我们希望你分享个人经历以及从课程中获得的收获。不要代替他人发声；邀请他们自己撰写评论。
    这里不是辩论论坛。引用或针对其他评论的内容会被删除。如果不同意别人的经历，欢迎分享你自己的。
    我们理解并非每位教师都适合所有学习风格。请用能够帮助他人的方式解释为何这门课或这位教师不适合你。
    带着怒气写下的评论不会给作者留下好印象，并可能因包含粗俗语言等违规内容而被删除。请先冷静一下，确保你的评论真正有助于他人理解你的经历。
    RateMyHST 保留删除未包含实质性评论的评分的权利。
    每位学生在同一门课上只能评价某个教师一次。刷屏或串联攻击将导致评论被删除，并使账号在本站被暂时锁定。
    阅读其他学生的评论时，请保持判断，综合参考不同意见。在线评论应只是影响你学业选择的众多资源之一。

禁止内容：包含以下内容的评论将被删除：

    脏话、辱骂和/或粗俗语言；关于宗教、种族、性别、外貌、年龄、身心障碍等的贬损言论。
    能够让他人在校外联系某位教师或学生的识别信息。
    关于教师或学生家庭、个人生活和/或性生活的内容，包括任何性暗示。
    声称某位教师偏爱或歧视某名学生或某个特定群体的内容（了解更多信息和资源，请点击此处）。
    关于教师就业状态的说法，包括曾经的任职情况。
    声称某位教师或学生正在或曾经从事非法活动。
    直接引用其他现有评论或引用已被我们审核人员删除的评论。
    指控教师为自己或同事打分。
    非英文内容。评论必须使用英文书写。如果你就读于法语系加拿大学校，可以使用法语。
    任何超链接和/或 URL。

教师须知：

    本站是匿名平台，学生可以分享课堂体验。我们无法提供评论作者的任何数据或个人信息。
    我们不会主动添加教师、课程或校园，所有资料均由学生社区提交。
    我们不会因为评论是负面的就删除它。只有在违反本站指南时才会移除。
    我们鼓励教师创建 RateMyHST 账号，与学生在网站上互动。建立教师账号后，你可以回复评论，并在个人档案收到新评分时获得通知。点此开始创建。
    带着怒气写下的回复同样不会给作者留下好印象，并可能因为含有粗俗语言而被删除。回复前先停一下，确保你的回应真正能够帮助他人。
    RateMyHST 的审核团队无法证实或否定评论中提到的细节。我们不是事实仲裁者。如果你不同意某条评论中的内容，请参阅上文关于管理个人档案的说明。
    如果你认为有人对你的档案进行刷屏或恶意攻击，请告诉我们。你可以发送邮件至 support@ratemyhst.com。我们乐意提供帮助，并会仔细审查相关评论。
    虽然教师给自己评分违反我们的指南，但我们鼓励教师在每个学期鼓励学生提供评价。评论越多，越具代表性。
    教师回复同样受上述禁止内容条款的限制。

举报评分：

如果你发现某条评分违反本网站指南，请点击评论底部的 "report this rating" 并说明问题。我们的网站团队会进行评估。请不要仅仅因为不同意就举报他人的评论。

法律事项：

RateMyHST 偶尔会收到伴随提告威胁的删除要求。截至目前，没有任何人因为我们网站上的评论对我们提起诉讼。

法律明确保护 RateMyHST 免于为用户提交的内容承担法律责任，包括展示在网站上的评论。特别是 1996 年《通信规范法》(47 U.S.C. Sec. 230) 赋予如 RateMyHST 等服务提供商针对第三方内容的联邦豁免权。

法律态度十分明确。任何人若因网站会员发布的评论而起诉 RateMyHST，都可能面临法院制裁，包括罚金以及补偿我们为应对这类诉讼而支付的律师费。

如果在我们已经提醒的情况下，你仍然认为只能诉诸法律，我们的送达地址如下：

RateMyHST, LLC
50 Broad Street
20th Floor
New York, NY 10004

若你要向 RateMyHST, LLC 送达法律文件，请确保送达符合美国所有适用法律。若送达不合法，我们没有义务回应。

本指南仅供参考，不构成法律意见。虽然我们坚守这些规则，仍建议你向相关领域的专业律师咨询。

权利保留：

本网站保留删除任何被认定为不当、诽谤、下流、粗俗或淫秽；色情、露骨或带有性暗示；具有种族、文化或民族攻击性；有害、骚扰、恐吓、威胁、仇恨、歧视或虐待性质；冒充他人；或以其他方式违反《使用条款》的评论的权利。

本网站保留针对威胁实施暴力或人身伤害的评论采取删除、移交给相关部门或其他适当措施的权利，包括（但不限于）向相关机构提供你的 IP 地址（若可用）、评分时间，并采取《使用条款》和《隐私政策》中描述的任何行动。`
}

function buildJapaneseContent() {
  return `RateMyHST サイトガイドライン

以下は、www.ratemyhst.com のウェブサイト、アプリ、その他のインタラクティブサービス（以下「サイト」）に適用される公式投稿ガイドライン（「サイトガイドライン」）です。サイトは RateMyHST, LLC（「RateMyHST」「当社」）が所有・運営しており、本ガイドラインは利用規約の追加条項となります。

RateMyHST は、米国中の高校生が教師・学校・学区を調べて評価できる最大級のオンラインコミュニティです。私たちの使命は、教室での体験を安心して共有できる場を提供し、進路選択に役立ててもらうことです。

サイト / アプリ：

RateMyHST のウェブサイト（www.ratemyhst.com）とモバイルアプリでは、教師の指導方法や担当授業、学校や学区の生活環境や設備に関するユーザー投稿のフィードバックを掲載しています。

教師の評価は、その教師の授業を受けた、または現在受講しているユーザーのみが投稿できます。教師が担当する各授業につき、ユーザーが投稿できるコメントは1件のみです。学校の評価は、その授業・学校・学区に在籍した、または在籍している生徒のみが投稿してください。

RateMyHST は危険行為や違法行為を通報する場所ではありません。自分自身、別の教師、生徒が危険にさらされていると感じた場合は、速やかに学校関係者または地域の警察に連絡してください。（詳しい情報はこちらをご覧ください。）

運営方法：

RateMyHST には、送信されたすべての評価を確認するモデレーターチームがいます。私たちは、使命を守り、学生・教師を問わず常に一貫した判断ができるように、本ガイドラインを定めています。モデレーターはガイドラインの専門家であり、違反するコメントは削除します。

見落としている点はありますか？不適切と思われるコメントを見つけたら、ぜひ教えてください。コメントを再審査のためにフラグすると、すぐにモデレーターに送られます。削除するか、サイトに復元するかはモデレーターが判断します。評価をガイドラインに合わせるために編集したり、低評価やネガティブな内容という理由だけで削除することはありません。

ガイドライン：

生徒向けガイドライン：

    レビューは正直に書いてください。自分が授業を選ぶときに信頼できる情報であってほしいのと同じように、同じ姿勢で貢献してください。
    授業や教師を評価するときは、長所と短所の両方を書くと役立ちます。その方が仲間にとって信頼度が高く、建設的です。
    コメントは授業内容とあなたの学習体験に集中させてください。教師の外見、服装、年齢、性別、人種について触れてはいけません。
    伝聞は避け、あなた自身の経験と得られたことを共有してください。他人の代弁はせず、本人にレビュー投稿を勧めてください。
    ここは議論の場ではありません。ほかのレビューに直接言及する投稿は削除されます。誰かの体験に賛同できない場合は、自分の体験を共有してください。
    すべての教師がすべての学習スタイルに合うわけではありません。コースや教師が自分に合わなかった理由を、他の人の判断材料になるよう説明してください。
    怒りに任せて書かれたレビューは書き手の印象を悪くし、汚い言葉遣いなどの違反で削除されることがあります。投稿前に一呼吸置き、本当に他の人の役に立つか確かめてください。
    RateMyHST は、実質的なコメントを含まない評価を削除する権利を留保します。
    1 人の生徒が 1 つの授業について教師を評価できるのは 1 度だけです。スパム投稿や集団による荒らし行為はコメントの削除とアカウントの一時ロックにつながります。
    他の生徒のレビューを読むときは、自分の判断で複数の意見を比較してください。オンラインレビューは大切な進路を決める際の情報源のひとつに過ぎません。

禁止コンテンツ：以下を含むコメントは削除されます。

    罵倒、侮辱、下品な表現、宗教・民族・人種・性別・外見・年齢・心身の障がいに対する差別的な発言。
    教師や生徒を学校外で特定・連絡できる個人情報。
    教師や生徒の家族、私生活、性生活への言及、性的なほのめかし。
    教師が特定の生徒またはグループをひいきまたは差別しているという主張（詳しくはここをご覧ください）。
    教師の雇用状況に関する主張（以前の職歴を含む）。
    教師や生徒が違法行為に関与している、またはいたという主張。
    他の既存コメント、またはモデレーターにより削除されたコメントへの直接的な参照。
    教師が自分自身や同僚を評価しているという非難。
    英語以外の言語。レビューは英語で記載する必要があります。フランス系カナダの学校に在籍している場合のみフランス語を使用できます。
    ハイパーリンクや URL。

教師向けガイドライン：

    このサイトは匿名で、学生が教室での体験を共有する場所です。レビュー投稿者に関する個人情報やデータは提供できません。
    教師やコース、キャンパスをこちらで勝手に追加することはありません。すべてのプロフィールは学生コミュニティによって送信されたものです。
    ネガティブだからという理由だけではコメントを削除できません。本ガイドラインに違反した場合のみ削除されます。
    RateMyHST の教師アカウントを作成し、サイト上で学生と交流することをおすすめします。教師アカウントでは返信を投稿でき、新しいレビューが追加されたときに通知を受け取れます。作成はこちらから。
    怒りに任せた返信は投稿者の印象を損ない、暴言などの違反で削除される可能性があります。落ち着いて、本当に周囲の役に立つ内容か確認してください。
    RateMyHST のモデレーターはレビューに書かれた詳細を証明したり反証したりできません。事実の裁定者ではないため、内容に異議がある場合は上記のプロフィール管理の段落をご確認ください。
    プロフィールがスパムや集中的な攻撃を受けていると思ったらお知らせください。support@ratemyhst.com 宛にご連絡いただければ、該当するコメントを喜んで確認します。
    教師が自分自身を評価することは禁止ですが、各学期に生徒へレビュー投稿を促すことを推奨しています。レビューが多いほど結果はより正確になります。
    教師の返信にも、前述の禁止コンテンツに関する制限がそのまま適用されます。

評価の報告：

本サイトのガイドラインに違反していると思われる評価を見つけたら、コメント下部の「report this rating」をクリックして問題点を記入してください。サイトのスタッフが審査します。単に気に入らないという理由だけで報告しないでください。

法的事項：

RateMyHST には削除要求とともに訴訟をほのめかす通知が届くことがありますが、レビューを巡って実際に私たちを訴えた人はこれまでいません。

法律は、ユーザーが投稿したコンテンツ（本サイトに掲載されるレビューなど）について RateMyHST を免責しています。特に 1996 年の通信品位法（47 U.S.C. Sec. 230）は、RateMyHST のようなサービスプロバイダーに、第三者が作成したコンテンツに関する連邦レベルの免責を与えています。

法律は明確です。本サイトのメンバーが投稿したレビューを理由に RateMyHST を訴える人は、裁判所からの制裁を受けるリスクがあります。これには、明白な法的保護を無視した訴訟への対応に必要な弁護士費用の補填などが含まれます。

それでも法的措置しか選択肢がないと考える場合は、以下の住所に書類を送達してください。

RateMyHST, LLC
50 Broad Street
20th Floor
New York, NY 10004

RateMyHST, LLC に書類を送る際は、米国の適用法に沿って正しく手続きを行ってください。適切に送達されていない場合、当社は対応する義務を負いません。

本ガイドラインは情報提供のみを目的としており、法的助言には該当しません。内容を支持していますが、必要に応じて専門の弁護士に相談することを推奨します。

権利の留保：

本サイトは、不適切、中傷的、わいせつ、下品または猥褻、ポルノ、露骨または性的に示唆的、 人種・文化・民族的に攻撃的、有害、嫌がらせ、威圧的、脅迫的、憎悪的、差別的、虐待的、他者のなりすまし、もしくは利用規約に違反するコメントを削除する権利を留保します。

また、他人に対する暴力や身体的危害をほのめかすコメントについては、削除、当局への提供、または適切な措置を取る権利を留保します。これには、利用可能な場合は IP アドレスやレビュー投稿時刻を当局に通知すること、および利用規約やプライバシーポリシーに記載されたその他の措置を講じることが含まれます。`
}
