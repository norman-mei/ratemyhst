export type LanguageChoice = 'English' | 'Español' | 'Français' | 'Deutsch' | '中文' | '日本語'

export type LanguageCopy = {
  heroBadge: string
  heroTitle: string
  heroSubtitle: string
  schoolPlaceholder: string
  schoolButton: string
  teacherToggle: string
  teacherPlaceholder: string
  teacherButton: string
  fallbackToggle: string
  ctaButton: string
  featureBadge: string
  featureTitle: string
  featureSubtitle: string
  featurePanels: { icon: string; title: string; description: string }[]
  signupBadge: string
  signupTitle: string
  signupSubtitle: string
  emailPlaceholder: string
  signupButton: string
  signupNote: string
  header: {
    brandSuffix: string
    navFindTeachers: string
    navSchools: string
    myReviews: string
    login: string
    signup: string
    accountSettings: string
    logout: string
    signedIn: string
    menu: string
    openSettings: string
    openProfile: string
  }
  footerContact: string
  footerDescription: string
  footerLegal: {
    help: string
    guidelines: string
    terms: string
    privacy: string
    copyright: string
    caNotice: string
  }
  searchHelpers: {
    noSchools: string
    addSchool: string
    selectSchoolPrompt: string
    teacherRosterInfo: string
    selectedSchool: string
    teacherSectionTitle: string
    noTeachers: string
    addTeacher: string
  }
  toastSaved: string
  settingsPanel: {
    title: string
    theme: string
    themeOptions: {
      light: string
      dark: string
      system: string
    }
    notifications: string
    push: string
    email: string
    privacy: string
    privateProfile: string
    showRatings: string
    language: string
    fontSize: string
    fontSizeOptions: {
      small: string
      medium: string
      large: string
    }
    display: string
    autoSave: string
    compactView: string
    saveButton: string
  }
  profilePanel: {
    tabs: {
      profile: string
      account: string
      saved: string
      reviews: string
      logout: string
    }
    profile: {
      heading: string
      description: string
      privacyNote: string
      firstName: string
      lastName: string
      school: string
      graduationYear: string
      save: string
      saving: string
      success: string
      error: string
    }
    saved: {
      emptyTitle: string
      emptyDescription: string
      removeButton: string
      loading: string
    }
    reviews: {
      heading: string
      emptyTitle: string
      emptyDescription: string
      cta: string
    }
  }
}

export const LANGUAGE_OPTIONS: { value: LanguageChoice; label: string }[] = [
  { value: 'English', label: 'English' },
  { value: 'Español', label: 'Español' },
  { value: 'Français', label: 'Français' },
  { value: 'Deutsch', label: 'Deutsch' },
  { value: '中文', label: '中文 (简体)' },
  { value: '日本語', label: '日本語' },
]
export const LANGUAGE_VALUES = LANGUAGE_OPTIONS.map(
  (option) => option.value,
) as LanguageChoice[]

const BASE_PANELS = [
  {
    icon: 'user',
    titleKey: {
      English: 'Manage and edit your ratings',
      Español: 'Administra y edita tus reseñas',
      Français: 'Gère et modifie tes avis',
      Deutsch: 'Bewertungen verwalten',
      中文: '管理并编辑评价',
      日本語: 'レビューを管理・編集',
    },
    descriptionKey: {
      English: 'Keep track of every review as semesters change and update them instantly.',
      Español: 'Mantén cada reseña actualizada cuando cambian los semestres.',
      Français: 'Actualise tes retours à chaque semestre.',
      Deutsch: 'Aktualisiere jede Bewertung, wenn sich ein Semester ändert.',
      中文: '学期变化时保持评价最新状态。',
      日本語: '学期ごとにレビューを更新して常に最新に。',
    },
  },
  {
    icon: 'shield',
    titleKey: {
      English: 'Your ratings are always anonymous',
      Español: 'Tus reseñas siempre son anónimas',
      Français: 'Tes avis restent anonymes',
      Deutsch: 'Bewertungen bleiben anonym',
      中文: '你的评价始终匿名',
      日本語: 'レビューは常に匿名',
    },
    descriptionKey: {
      English: 'Privacy is the baseline so honest, caring feedback can thrive.',
      Español: 'La privacidad fomenta comentarios honestos y empáticos.',
      Français: 'La confidentialité garantit des retours sincères et bienveillants.',
      Deutsch: 'So bleibt ehrliches, hilfreiches Feedback möglich.',
      中文: '匿名保护让你可以提供真诚、善意的反馈。',
      日本語: '匿名だからこそ、率直で思いやりのあるフィードバックが可能です。',
    },
  },
  {
    icon: 'heart',
    titleKey: {
      English: 'Like or dislike ratings',
      Español: 'Vota reseñas útiles',
      Français: 'Vote pour les avis utiles',
      Deutsch: 'Hilfreiche Bewertungen hervorheben',
      中文: '点赞或点踩评价',
      日本語: '役立つレビューに投票',
    },
    descriptionKey: {
      English: 'Vote on the insights that help you most and keep the signal strong.',
      Español: 'Destaca el contenido que más te ayuda y reduce el ruido.',
      Français: 'Mets en avant les avis les plus pertinents.',
      Deutsch: 'Markiere hilfreiche Rezensionen und reduziere den Lärm.',
      中文: '突出有用内容，减少噪音。',
      日本語: '役立つレビューを目立たせ、不要な情報を減らします。',
    },
  },
]

const BASE_PROFILE_PANEL: LanguageCopy['profilePanel'] = {
  tabs: {
    profile: 'Profile',
    account: 'Account',
    saved: 'Saved teachers',
    reviews: 'My reviews',
    logout: 'Sign out',
  },
  profile: {
    heading: 'Your profile',
    description: 'Share how you’d like your profile to appear on saved reviews.',
    privacyNote: 'This info never appears on public reviews—only you and the moderation team can view it.',
    firstName: 'First name',
    lastName: 'Last name',
    school: 'School',
    graduationYear: 'Expected graduation year',
    save: 'Save profile',
    saving: 'Saving…',
    success: 'Profile updated.',
    error: 'We could not save your profile right now.',
  },
  saved: {
    emptyTitle: 'No saved teachers yet',
    emptyDescription: 'Tap the bookmark icon on any teacher profile to save it here.',
    removeButton: 'Remove',
    loading: 'Loading saved teachers…',
  },
  reviews: {
    heading: 'My reviews',
    emptyTitle: 'You haven’t shared any reviews yet',
    emptyDescription: 'Post your first teacher or school review and it will appear here to edit or archive anytime.',
    cta: 'Start a review',
  },
}

function panelsFor(language: LanguageChoice) {
  return BASE_PANELS.map((panel) => ({
    icon: panel.icon,
    title: panel.titleKey[language],
    description: panel.descriptionKey[language],
  }))
}

export const languageCopy: Record<LanguageChoice, LanguageCopy> = {
  English: {
    heroBadge: 'Enter your school to get started',
    heroTitle: 'Your next RMHST search begins here',
    heroSubtitle:
      'Search by school to see teachers, programs, and culture indicators—or jump straight to a specific educator.',
    schoolPlaceholder: 'Search for your school',
    schoolButton: 'Find my school',
    teacherToggle: "I'd like to look up a high school teacher by name",
    teacherPlaceholder: 'Search for a teacher',
    teacherButton: 'Look up a teacher',
    fallbackToggle: 'I’d like to look up a school by name',
    ctaButton: 'Sign up now',
    featureBadge: 'Join the RMHST family',
    featureTitle: "Love RMHST? Let's make it official.",
    featureSubtitle:
      'Lock in your profile to unlock school dashboards, verified ratings, and mentor shout-outs.',
    featurePanels: panelsFor('English'),
    signupBadge: 'Sign up',
    signupTitle: 'Claim your RMHST account today',
    signupSubtitle:
      'Save favorite teachers, manage every review, and follow the schools that matter most.',
    emailPlaceholder: 'Enter your email',
    signupButton: 'Sign up for RMHST',
    signupNote: "We'll send a single invite link so you can confirm your school community and start rating.",
    header: {
      brandSuffix: '- Rate My High School Teachers',
      navFindTeachers: 'Find teachers',
      navSchools: 'Schools',
      myReviews: 'My reviews',
      login: 'Log in',
      signup: 'Sign up',
      accountSettings: 'Account settings',
      logout: 'Log out',
      signedIn: 'Signed in',
      menu: 'Menu',
      openSettings: 'Open settings',
      openProfile: 'Open profile menu',
    },
    footerContact: 'Contact',
    footerDescription:
      'Built to elevate high school teaching with honest, caring feedback.',
    footerLegal: {
      help: 'Help',
      guidelines: 'Site Guidelines',
      terms: 'Terms & Conditions',
      privacy: 'Privacy Policy',
      copyright: 'Copyright Compliance Policy',
      caNotice: 'CA Notice at Collection',
    },
    searchHelpers: {
      noSchools: 'No schools match that search.',
      addSchool: 'Add “{name}” to RateMyHST',
      selectSchoolPrompt: 'Select a school to search its teachers.',
      teacherRosterInfo: 'Open the school’s ratings page to browse teachers near the bottom.',
      selectedSchool: 'Currently searching: {school}',
      teacherSectionTitle: 'Teachers at {school}',
      noTeachers: 'No teachers match that search.',
      addTeacher: 'Add “{name}” for this school',
    },
    toastSaved: 'Settings saved',
    settingsPanel: {
      title: 'Settings',
      theme: 'Theme',
      themeOptions: {
        light: 'Light',
        dark: 'Dark',
        system: 'Use system setting',
      },
      notifications: 'Notifications',
      push: 'Push notifications',
      email: 'Email updates',
      privacy: 'Privacy',
      privateProfile: 'Private profile',
      showRatings: 'Show my ratings',
      language: 'Language',
      fontSize: 'Font size',
      fontSizeOptions: {
        small: 'Small',
        medium: 'Medium',
        large: 'Large',
      },
      display: 'Display',
      autoSave: 'Auto-save',
      compactView: 'Compact view',
      saveButton: 'Save settings',
    },
    profilePanel: BASE_PROFILE_PANEL,
  },
  Español: {
    heroBadge: 'Ingresa tu escuela para comenzar',
    heroTitle: 'Tu próxima búsqueda en RMHST empieza aquí',
    heroSubtitle:
      'Busca por escuela para ver docentes, programas e indicadores culturales, o salta directo a un profesor específico.',
    schoolPlaceholder: 'Busca tu escuela',
    schoolButton: 'Encontrar mi escuela',
    teacherToggle: 'Quiero buscar a un profesor por nombre',
    teacherPlaceholder: 'Busca a un profesor',
    teacherButton: 'Buscar profesor',
    fallbackToggle: 'Quiero buscar una escuela por nombre',
    ctaButton: 'Regístrate ahora',
    featureBadge: 'Únete a la familia RMHST',
    featureTitle: '¿Amas RMHST? Hagámoslo oficial.',
    featureSubtitle:
      'Activa tu perfil para desbloquear paneles escolares, reseñas verificadas y reconocimientos.',
    featurePanels: panelsFor('Español'),
    signupBadge: 'Regístrate',
    signupTitle: 'Reclama tu cuenta RMHST',
    signupSubtitle:
      'Guarda profesores favoritos, administra reseñas y sigue las escuelas que importan.',
    emailPlaceholder: 'Ingresa tu correo',
    signupButton: 'Crear cuenta RMHST',
    signupNote: 'Te enviaremos un enlace para confirmar tu comunidad escolar y comenzar.',
    header: {
      brandSuffix: '- Califica a tus profesores de secundaria',
      navFindTeachers: 'Buscar docentes',
      navSchools: 'Escuelas',
      myReviews: 'Mis reseñas',
      login: 'Iniciar sesión',
      signup: 'Registrarse',
      accountSettings: 'Configuración de la cuenta',
      logout: 'Cerrar sesión',
      signedIn: 'Sesión iniciada',
      menu: 'Menú',
      openSettings: 'Abrir configuración',
      openProfile: 'Abrir menú de perfil',
    },
    footerContact: 'Contacto',
    footerDescription:
      'Creado para mejorar la enseñanza con comentarios honestos y empáticos.',
    footerLegal: {
      help: 'Ayuda',
      guidelines: 'Guía del sitio',
      terms: 'Términos y condiciones',
      privacy: 'Política de privacidad',
      copyright: 'Política de copyright',
      caNotice: 'Aviso de CA',
    },
    searchHelpers: {
      noSchools: 'No hay escuelas que coincidan con tu búsqueda.',
      addSchool: 'Agregar “{name}” a RateMyHST',
      selectSchoolPrompt: 'Selecciona una escuela para buscar a sus docentes.',
      teacherRosterInfo: 'Abre la página de calificaciones de la escuela para ver a sus profesores al final.',
      selectedSchool: 'Buscando en: {school}',
      teacherSectionTitle: 'Docentes en {school}',
      noTeachers: 'No hay docentes que coincidan con tu búsqueda.',
      addTeacher: 'Agregar “{name}” a esta escuela',
    },
    toastSaved: 'Configuración guardada',
    settingsPanel: {
      title: 'Configuración',
      theme: 'Tema',
      themeOptions: {
        light: 'Claro',
        dark: 'Oscuro',
        system: 'Según el sistema',
      },
      notifications: 'Notificaciones',
      push: 'Notificaciones push',
      email: 'Actualizaciones por correo',
      privacy: 'Privacidad',
      privateProfile: 'Perfil privado',
      showRatings: 'Mostrar mis reseñas',
      language: 'Idioma',
      fontSize: 'Tamaño de fuente',
      fontSizeOptions: {
        small: 'Pequeña',
        medium: 'Mediana',
        large: 'Grande',
      },
      display: 'Pantalla',
      autoSave: 'Autoguardado',
      compactView: 'Vista compacta',
      saveButton: 'Guardar configuración',
    },
    profilePanel: {
    tabs: {
      profile: 'Perfil',
      account: 'Configuración',
      saved: 'Docentes guardados',
      reviews: 'Mis reseñas',
      logout: 'Cerrar sesión',
    },
      profile: {
        heading: 'Tu perfil',
        description: 'Comparte cómo quieres que aparezca tu perfil en las reseñas guardadas.',
        privacyNote: 'Esta información nunca aparece en reseñas públicas; solo la ves tú y nuestro equipo de moderación.',
        firstName: 'Nombre',
        lastName: 'Apellido',
        school: 'Escuela',
        graduationYear: 'Año esperado de graduación',
        save: 'Guardar perfil',
        saving: 'Guardando…',
        success: 'Perfil actualizado.',
        error: 'No pudimos guardar tu perfil en este momento.',
      },
    saved: {
      emptyTitle: 'Aún no guardaste docentes',
      emptyDescription: 'Toca el ícono de marcador en cualquier perfil para guardarlo aquí.',
      removeButton: 'Quitar',
      loading: 'Cargando docentes guardados…',
    },
    reviews: {
      heading: 'Mis reseñas',
      emptyTitle: 'Todavía no has publicado reseñas',
      emptyDescription: 'Comparte tu primera reseña de un profesor o escuela y aparecerá aquí para editarla cuando quieras.',
      cta: 'Escribir una reseña',
    },
  },
  },
  Français: {
    heroBadge: 'Saisis ton lycée pour démarrer',
    heroTitle: 'Ta prochaine recherche RMHST commence ici',
    heroSubtitle:
      'Recherche par établissement pour voir les enseignants, les programmes et la culture scolaire—or va directement vers un professeur précis.',
    schoolPlaceholder: 'Rechercher ton lycée',
    schoolButton: 'Trouver mon lycée',
    teacherToggle: 'Je veux rechercher un professeur par son nom',
    teacherPlaceholder: 'Rechercher un professeur',
    teacherButton: 'Trouver un professeur',
    fallbackToggle: "Je veux rechercher un lycée par son nom",
    ctaButton: "S'inscrire maintenant",
    featureBadge: 'Rejoins la famille RMHST',
    featureTitle: 'Tu aimes RMHST ? Rendons-le officiel.',
    featureSubtitle:
      'Active ton profil pour débloquer tableaux de bord, avis vérifiés et remerciements.',
    featurePanels: panelsFor('Français'),
    signupBadge: "S'inscrire",
    signupTitle: 'Réserve ton compte RMHST',
    signupSubtitle:
      'Enregistre tes professeurs favoris, gère tes avis et suis les établissements clés.',
    emailPlaceholder: 'Entre ton e-mail',
    signupButton: 'Créer un compte RMHST',
    signupNote: "Nous t'enverrons un lien pour confirmer ton lycée et commencer.",
    header: {
      brandSuffix: '- Évalue tes professeurs de lycée',
      navFindTeachers: 'Trouver des professeurs',
      navSchools: 'Établissements',
      myReviews: 'Mes avis',
      login: 'Connexion',
      signup: "S'inscrire",
      accountSettings: 'Paramètres du compte',
      logout: 'Se déconnecter',
      signedIn: 'Connecté',
      menu: 'Menu',
      openSettings: 'Ouvrir les paramètres',
      openProfile: 'Ouvrir le menu profil',
    },
    footerContact: 'Contact',
    footerDescription:
      'Conçu pour élever l’enseignement secondaire via des retours honnêtes et bienveillants.',
    footerLegal: {
      help: 'Aide',
      guidelines: 'Directives du site',
      terms: 'Conditions générales',
      privacy: 'Politique de confidentialité',
      copyright: 'Politique de droits d’auteur',
      caNotice: 'Avis CA',
    },
    searchHelpers: {
      noSchools: 'Aucune école ne correspond à ta recherche.',
      addSchool: 'Ajouter « {name} » sur RateMyHST',
      selectSchoolPrompt: 'Sélectionne un établissement pour rechercher ses enseignants.',
      teacherRosterInfo: 'Ouvre la page d’évaluations de l’établissement pour voir les enseignants en bas de page.',
      selectedSchool: 'Recherche en cours : {school}',
      teacherSectionTitle: 'Enseignants à {school}',
      noTeachers: 'Aucun enseignant ne correspond à ta recherche.',
      addTeacher: 'Ajouter « {name} » pour cet établissement',
    },
    toastSaved: 'Paramètres enregistrés',
    settingsPanel: {
      title: 'Paramètres',
      theme: 'Thème',
      themeOptions: {
        light: 'Clair',
        dark: 'Sombre',
        system: 'Réglage du système',
      },
      notifications: 'Notifications',
      push: 'Notifications push',
      email: 'Alertes e-mail',
      privacy: 'Confidentialité',
      privateProfile: 'Profil privé',
      showRatings: 'Afficher mes avis',
      language: 'Langue',
      fontSize: 'Taille de police',
      fontSizeOptions: {
        small: 'Petite',
        medium: 'Moyenne',
        large: 'Grande',
      },
      display: 'Affichage',
      autoSave: 'Sauvegarde auto',
      compactView: 'Vue compacte',
      saveButton: 'Enregistrer',
    },
    profilePanel: {
    tabs: {
      profile: 'Profil',
      account: 'Compte',
      saved: 'Professeurs enregistrés',
      reviews: 'Mes avis',
      logout: 'Se déconnecter',
    },
      profile: {
        heading: 'Ton profil',
        description: 'Indique comment ton profil doit apparaître sur tes avis enregistrés.',
        privacyNote: 'Ces informations ne s’affichent jamais sur les avis publics — seules toi et notre équipe de modération y avez accès.',
        firstName: 'Prénom',
        lastName: 'Nom',
        school: 'Établissement',
        graduationYear: 'Année de diplôme prévue',
        save: 'Enregistrer le profil',
        saving: 'Enregistrement…',
        success: 'Profil mis à jour.',
        error: 'Impossible d’enregistrer ton profil pour le moment.',
      },
    saved: {
      emptyTitle: 'Aucun professeur enregistré',
      emptyDescription: 'Appuie sur l’icône de signet sur un profil pour l’ajouter ici.',
      removeButton: 'Retirer',
      loading: 'Chargement des professeurs enregistrés…',
    },
    reviews: {
      heading: 'Mes avis',
      emptyTitle: 'Tu n’as pas encore partagé d’avis',
      emptyDescription: 'Publie ton premier retour sur un enseignant ou un établissement et il apparaîtra ici pour que tu puisses le mettre à jour.',
      cta: 'Rédiger un avis',
    },
  },
  },
  Deutsch: {
    heroBadge: 'Gib deine Schule ein, um zu starten',
    heroTitle: 'Deine nächste RMHST-Suche beginnt hier',
    heroSubtitle:
      'Suche nach Schulen, um Lehrkräfte, Programme und Kultur zu sehen – oder spring direkt zu einer bestimmten Lehrkraft.',
    schoolPlaceholder: 'Suche nach deiner Schule',
    schoolButton: 'Schule finden',
    teacherToggle: 'Ich möchte eine Lehrkraft nach Namen suchen',
    teacherPlaceholder: 'Lehrkraft suchen',
    teacherButton: 'Lehrkraft finden',
    fallbackToggle: 'Ich möchte eine Schule nach Namen suchen',
    ctaButton: 'Jetzt registrieren',
    featureBadge: 'RMHST Familie',
    featureTitle: 'Du liebst RMHST? Mach es offiziell.',
    featureSubtitle:
      'Aktiviere dein Profil, um Dashboards, verifizierte Bewertungen und Mentor-Shoutouts zu nutzen.',
    featurePanels: panelsFor('Deutsch'),
    signupBadge: 'Registrieren',
    signupTitle: 'Sichere dir dein RMHST Konto',
    signupSubtitle:
      'Speichere Lieblingslehrkräfte, verwalte Bewertungen und verfolge wichtige Schulen.',
    emailPlaceholder: 'E-Mail eingeben',
    signupButton: 'Für RMHST anmelden',
    signupNote: 'Wir senden dir einen Link, um deine Schule zu bestätigen und loszulegen.',
    header: {
      brandSuffix: '- Lehrerbewertungen für die Oberstufe',
      navFindTeachers: 'Lehrkräfte finden',
      navSchools: 'Schulen',
      myReviews: 'Meine Bewertungen',
      login: 'Anmelden',
      signup: 'Registrieren',
      accountSettings: 'Kontoeinstellungen',
      logout: 'Abmelden',
      signedIn: 'Angemeldet',
      menu: 'Menü',
      openSettings: 'Einstellungen öffnen',
      openProfile: 'Profilmenü öffnen',
    },
    footerContact: 'Kontakt',
    footerDescription:
      'Gemacht, um den Unterricht mit ehrlichem, fürsorglichem Feedback zu verbessern.',
    footerLegal: {
      help: 'Hilfe',
      guidelines: 'Seitenguidelines',
      terms: 'Nutzungsbedingungen',
      privacy: 'Datenschutzerklärung',
      copyright: 'Copyright-Richtlinie',
      caNotice: 'CA-Hinweis',
    },
    searchHelpers: {
      noSchools: 'Keine Schule passt zu deiner Suche.',
      addSchool: '„{name}“ zu RateMyHST hinzufügen',
      selectSchoolPrompt: 'Wähle eine Schule aus, um nach Lehrkräften zu suchen.',
      teacherRosterInfo: 'Öffne die Bewertungsseite der Schule – unten findest du die Lehrkräfte.',
      selectedSchool: 'Aktive Schule: {school}',
      teacherSectionTitle: 'Lehrkräfte an {school}',
      noTeachers: 'Keine Lehrkraft passt zu deiner Suche.',
      addTeacher: '„{name}“ für diese Schule hinzufügen',
    },
    toastSaved: 'Einstellungen gespeichert',
    settingsPanel: {
      title: 'Einstellungen',
      theme: 'Thema',
      themeOptions: {
        light: 'Hell',
        dark: 'Dunkel',
        system: 'Systemstandard',
      },
      notifications: 'Benachrichtigungen',
      push: 'Push-Benachrichtigungen',
      email: 'E-Mail-Updates',
      privacy: 'Privatsphäre',
      privateProfile: 'Privates Profil',
      showRatings: 'Meine Bewertungen anzeigen',
      language: 'Sprache',
      fontSize: 'Schriftgröße',
      fontSizeOptions: {
        small: 'Klein',
        medium: 'Mittel',
        large: 'Groß',
      },
      display: 'Anzeige',
      autoSave: 'Automatisches Speichern',
      compactView: 'Kompakte Ansicht',
      saveButton: 'Speichern',
    },
    profilePanel: {
    tabs: {
      profile: 'Profil',
      account: 'Konto',
      saved: 'Gespeicherte Lehrkräfte',
      reviews: 'Meine Bewertungen',
      logout: 'Abmelden',
    },
      profile: {
        heading: 'Dein Profil',
        description: 'So soll dein Profil bei gespeicherten Bewertungen erscheinen.',
        privacyNote: 'Diese Angaben erscheinen nie in öffentlichen Bewertungen – nur du und unser Moderationsteam seht sie.',
        firstName: 'Vorname',
        lastName: 'Nachname',
        school: 'Schule',
        graduationYear: 'Voraussichtliches Abschlussjahr',
        save: 'Profil speichern',
        saving: 'Speichern…',
        success: 'Profil aktualisiert.',
        error: 'Dein Profil konnte gerade nicht gespeichert werden.',
      },
    saved: {
      emptyTitle: 'Noch keine Lehrkraft gespeichert',
      emptyDescription: 'Tippe das Lesezeichen auf einem Lehrerprofil, um es hier abzulegen.',
      removeButton: 'Entfernen',
      loading: 'Gespeicherte Lehrkräfte werden geladen…',
    },
    reviews: {
      heading: 'Meine Bewertungen',
      emptyTitle: 'Du hast noch keine Bewertungen geteilt',
      emptyDescription: 'Schreibe deine erste Bewertung für eine Lehrkraft oder Schule—sie erscheint hier zur späteren Bearbeitung.',
      cta: 'Bewertung schreiben',
    },
  },
  },
  中文: {
    heroBadge: '输入你的学校以开始',
    heroTitle: '你的下一次 RMHST 搜索从这里开始',
    heroSubtitle:
      '按学校搜索教师、项目和文化指标，或直接查找某位教师。学生声音始终是核心。',
    schoolPlaceholder: '搜索你的学校',
    schoolButton: '查找我的学校',
    teacherToggle: '我想按名字查找高中教师',
    teacherPlaceholder: '搜索教师',
    teacherButton: '查找教师',
    fallbackToggle: '我想按名称查找学校',
    ctaButton: '立即注册',
    featureBadge: '加入 RMHST',
    featureTitle: '喜欢 RMHST？让它成为现实。',
    featureSubtitle:
      '激活个人资料，解锁学校看板、已验证的评分和导师致谢。',
    featurePanels: panelsFor('中文'),
    signupBadge: '注册',
    signupTitle: '立即创建 RMHST 帐户',
    signupSubtitle:
      '收藏喜欢的老师，管理所有评分，并关注最重要的学校。',
    emailPlaceholder: '输入你的邮箱',
    signupButton: '注册 RMHST',
    signupNote: '我们会发送一个链接供你确认学校社区并开始评分。',
    header: {
      brandSuffix: '- 高中教师评价社区',
      navFindTeachers: '查找教师',
      navSchools: '学校',
      myReviews: '我的评价',
      login: '登录',
      signup: '注册',
      accountSettings: '账户设置',
      logout: '退出登录',
      signedIn: '已登录',
      menu: '菜单',
      openSettings: '打开设置',
      openProfile: '打开个人菜单',
    },
    footerContact: '联系',
    footerDescription:
      '通过真诚、关怀的反馈提升高中教学水平。',
    footerLegal: {
      help: '帮助',
      guidelines: '网站指南',
      terms: '条款与条件',
      privacy: '隐私政策',
      copyright: '版权政策',
      caNotice: '加州收集通知',
    },
    searchHelpers: {
      noSchools: '没有符合条件的学校。',
      addSchool: '将“{name}”添加到 RateMyHST',
      selectSchoolPrompt: '请选择学校以搜索该校教师。',
      teacherRosterInfo: '打开该学校的评分页面，在页面底部即可看到老师列表。',
      selectedSchool: '当前学校：{school}',
      teacherSectionTitle: '{school} 的教师',
      noTeachers: '没有符合条件的教师。',
      addTeacher: '为该学校添加“{name}”',
    },
    toastSaved: '设置已保存',
    settingsPanel: {
      title: '设置',
      theme: '主题',
      themeOptions: {
        light: '浅色',
        dark: '深色',
        system: '跟随系统',
      },
      notifications: '通知',
      push: '推送通知',
      email: '邮件更新',
      privacy: '隐私',
      privateProfile: '私人档案',
      showRatings: '显示我的评分',
      language: '语言',
      fontSize: '字体大小',
      fontSizeOptions: {
        small: '小号',
        medium: '中号',
        large: '大号',
      },
      display: '显示',
      autoSave: '自动保存',
      compactView: '紧凑视图',
      saveButton: '保存设置',
    },
    profilePanel: {
    tabs: {
      profile: '个人资料',
      account: '账户设置',
      saved: '已收藏老师',
      reviews: '我的评价',
      logout: '退出登录',
    },
      profile: {
        heading: '你的个人资料',
        description: '让大家知道在你保存的评价中该如何显示你的身份。',
        privacyNote: '这些信息不会显示在公开评价中——只有你和我们的审核团队可见。',
        firstName: '名字',
        lastName: '姓氏',
        school: '学校',
        graduationYear: '预计毕业年份',
        save: '保存资料',
        saving: '正在保存…',
        success: '资料已更新。',
        error: '目前无法保存你的资料。',
      },
    saved: {
      emptyTitle: '还没有收藏老师',
      emptyDescription: '点击任何老师资料旁的书签图标即可收藏。',
      removeButton: '移除',
      loading: '正在加载已收藏的老师…',
    },
    reviews: {
      heading: '我的评价',
      emptyTitle: '你还没有发表评价',
      emptyDescription: '分享第一条老师或学校的评价后，就会显示在这里，方便随时编辑。',
      cta: '撰写评价',
    },
  },
  },
  日本語: {
    heroBadge: '学校名を入力してスタート',
    heroTitle: '次の RMHST 検索はここから',
    heroSubtitle:
      '学校ごとに教師やプログラム、カルチャー指標を確認したり、特定の先生を直接検索できます。',
    schoolPlaceholder: '学校を検索',
    schoolButton: '学校を探す',
    teacherToggle: '高校教師を名前で探したい',
    teacherPlaceholder: '教師を検索',
    teacherButton: '教師を探す',
    fallbackToggle: '学校名で検索したい',
    ctaButton: '今すぐ登録',
    featureBadge: 'RMHST ファミリー',
    featureTitle: 'RMHST が好き？正式に参加しよう。',
    featureSubtitle:
      'プロフィールを有効化し、学校ダッシュボードや認証済みレビューを活用しましょう。',
    featurePanels: panelsFor('日本語'),
    signupBadge: '登録',
    signupTitle: '今すぐ RMHST アカウントを取得',
    signupSubtitle:
      'お気に入りの先生を保存し、レビューを管理し、大切な学校をフォロー。',
    emailPlaceholder: 'メールアドレスを入力',
    signupButton: 'RMHST に登録',
    signupNote: '招待リンクを送り、学校コミュニティを確認してから評価を開始できます。',
    header: {
      brandSuffix: '- 高校教師の評価サイト',
      navFindTeachers: '先生を探す',
      navSchools: '学校',
      myReviews: '自分のレビュー',
      login: 'ログイン',
      signup: '新規登録',
      accountSettings: 'アカウント設定',
      logout: 'ログアウト',
      signedIn: 'ログイン中',
      menu: 'メニュー',
      openSettings: '設定を開く',
      openProfile: 'プロフィールメニューを開く',
    },
    footerContact: 'お問い合わせ',
    footerDescription:
      '誠実で思いやりのあるフィードバックで高校教育を高めるためのサービスです。',
    footerLegal: {
      help: 'ヘルプ',
      guidelines: 'サイトガイドライン',
      terms: '利用規約',
      privacy: 'プライバシーポリシー',
      copyright: '著作権ポリシー',
      caNotice: 'カリフォルニア通知',
    },
    searchHelpers: {
      noSchools: '該当する学校は見つかりませんでした。',
      addSchool: '「{name}」を RateMyHST に追加する',
      selectSchoolPrompt: '教師を探す学校を選択してください。',
      teacherRosterInfo: '学校の評価ページを開くと、ページ下部に教員リストが表示されます。',
      selectedSchool: '検索対象の学校：{school}',
      teacherSectionTitle: '{school} の先生',
      noTeachers: '該当する先生は見つかりませんでした。',
      addTeacher: 'この学校に「{name}」を追加する',
    },
    toastSaved: '設定を保存しました',
    settingsPanel: {
      title: '設定',
      theme: 'テーマ',
      themeOptions: {
        light: 'ライト',
        dark: 'ダーク',
        system: 'システム設定',
      },
      notifications: '通知',
      push: 'プッシュ通知',
      email: 'メール更新',
      privacy: 'プライバシー',
      privateProfile: '非公開プロフィール',
      showRatings: '自分の評価を表示',
      language: '言語',
      fontSize: '文字サイズ',
      fontSizeOptions: {
        small: '小さめ',
        medium: '標準',
        large: '大きめ',
      },
      display: '表示',
      autoSave: '自動保存',
      compactView: 'コンパクトビュー',
      saveButton: '設定を保存',
    },
    profilePanel: {
    tabs: {
      profile: 'プロフィール',
      account: 'アカウント設定',
      saved: '保存した先生',
      reviews: '自分のレビュー',
      logout: 'ログアウト',
    },
      profile: {
        heading: 'あなたのプロフィール',
        description: '保存したレビューでどのように表示されるかを設定してください。',
        privacyNote: 'この情報が公開レビューに表示されることはありません。見えるのはあなたと運営チームだけです。',
        firstName: '名',
        lastName: '姓',
        school: '学校',
        graduationYear: '卒業予定年',
        save: 'プロフィールを保存',
        saving: '保存中…',
        success: 'プロフィールを更新しました。',
        error: 'プロフィールを保存できませんでした。',
      },
    saved: {
      emptyTitle: '保存した先生はまだありません',
      emptyDescription: '先生のプロフィールでブックマークをタップするとここに表示されます。',
      removeButton: '削除',
      loading: '保存した先生を読み込み中…',
    },
    reviews: {
      heading: '自分のレビュー',
      emptyTitle: 'まだレビューを投稿していません',
      emptyDescription: '最初の先生または学校のレビューを書けば、ここに表示されて後から編集できます。',
      cta: 'レビューを投稿',
    },
  },
  },
}

export function getLanguageCopy(language: LanguageChoice): LanguageCopy {
  return languageCopy[language] ?? languageCopy.English
}
