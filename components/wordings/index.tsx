// Modules
import * as React from 'react'

export interface Wordings {
    [key: string]: {
        [lang: string]: string
    }
}

export interface CompiledWordings {
    [key: string]: string
}

export const MULTILANGUAGE_WORDINGS: Wordings = {

    /** Common wordings. */

    save: {
        'en-US': 'Save',
        'fr-FR': 'Enregistrer'
    },

    saveChanges: {
        'en-US': 'Save changes',
        'fr-FR': 'Enregistrer modifications'
    },

    cancel: {
        'en-US': 'Cancel',
        'fr-FR': 'Annuler'
    },

    clear: {
        'en-US': 'Clear',
        'fr-FR': 'Nettoyer'
    },

    email: {
        'en-US': 'Email',
        'fr-FR': 'Email'
    },

    submit: {
        'en-US': 'Submit',
        'fr-FR': 'Valider'
    },

    confirm: {
        'en-US': 'Confirm',
        'fr-FR': 'Confirmer'
    },

    delete: {
        'en-US': 'Delete',
        'fr-FR': 'Supprimer'
    },

    enabled: {
        'en-US': 'Enabled',
        'fr-FR': 'Actif'
    },

    permissions: {
        'en-US': 'Permissions',
        'fr-FR': 'Permissions'
    },

    description: {
        'en-US': 'Description',
        'fr-FR': 'Description'
    },

    name: {
        'en-US': 'Name',
        'fr-FR': 'Nom'
    },

    noDataFound: {
        'en-US': 'No data found',
        'fr-FR': 'Aucune donnée'
    },

    firstname: {
        'en-US': 'First name',
        'fr-FR': 'Prénom'
    },

    loadingError: {
        'en-US': 'Loading error',
        'fr-FR': 'Erreur de chargement'
    },

    details: {
        'en-US': 'Details',
        'fr-FR': 'Détails'
    },

    lastname: {
        'en-US': 'Last name',
        'fr-FR': 'Nom'
    },

    error: {
        'en-US': 'Error',
        'fr-FR': 'Erreur'
    },

    register: {
        'en-US': 'Register',
        'fr-FR': 'S\'enregistrer'
    },

    instance: {
        'en-US': 'Instance',
        'fr-FR': 'Instance'
    },

    messages: {
        'en-US': 'Messages',
        'fr-FR': 'Messages'
    },

    // Profile START
    title: {
        'en-US': 'Title',
        'fr-FR': 'Titre'
    },

    user: {
        'en-US': 'User',
        'fr-FR': 'Utilisateur'
    },

    mr: {
        'en-US': 'Mr.',
        'fr-FR': 'M.'
    },

    mrs: {
        'en-US': 'Mrs.',
        'fr-FR': 'Mme'
    },

    ms: {
        'en-US': 'Ms.',
        'fr-FR': 'Melle'
    },

    prof: {
        'en-US': 'Prof.',
        'fr-FR': 'Pr'
    },

    dr: {
        'en-US': 'Dr.',
        'fr-FR': 'Dr'
    },

    salutation: {
        'en-US': 'Salutation',
        'fr-FR': 'Salutation'
    },

    company: {
        'en-US': 'Company',
        'fr-FR': 'Société'
    },

    companyName: {
        'en-US': 'Company name',
        'fr-FR': 'Nom de la société'
    },

    address: {
        'en-US': 'Address',
        'fr-FR': 'Adresse'
    },

    city: {
        'en-US': 'City',
        'fr-FR': 'Ville'
    },

    state: {
        'en-US': 'State',
        'fr-FR': 'État'
    },

    country: {
        'en-US': 'Country',
        'fr-FR': 'Pays'
    },

    zip: {
        'en-US': 'Zip',
        'fr-FR': 'Code postal'
    },

    phone: {
        'en-US': 'Phone',
        'fr-FR': 'Téléphone'
    },

    mobile: {
        'en-US': 'Mobile',
        'fr-FR': 'Mobile'
    },

    website: {
        'en-US': 'Website',
        'fr-FR': 'Site web'
    },

    // Profile END

    start: {
        'en-US': 'Start',
        'fr-FR': 'Démarrer'
    },

    stop: {
        'en-US': 'Stop',
        'fr-FR': 'Arrêter'
    },

    reset: {
        'en-US': 'Reset',
        'fr-FR': 'Réinitialiser'
    },

    edit: {
        'en-US': 'Edit',
        'fr-FR': 'Éditer'
    },

    create: {
        'en-US': 'Create',
        'fr-FR': 'Créer'
    },

    actions: {
        'en-US': 'Actions',
        'fr-FR': 'Actions'
    },

    info: {
        'en-US': 'Info',
        'fr-FR': 'Info'
    },

    searchPlaceholder: {
        'en-US': 'Search...',
        'fr-FR': 'Rechercher...'
    },

    key: {
        'en-US': 'Key',
        'fr-FR': 'Clé'
    },

    value: {
        'en-US': 'Value',
        'fr-FR': 'Valeur'
    },

    fieldRequired: {
        'en-US': 'Required field',
        'fr-FR': 'Champ obligatoire'
    },

    showDetails: {
        'en-US': 'Show details',
        'fr-FR': 'Voir les détails'
    },

    closeDetails: {
        'en-US': 'Close details',
        'fr-FR': 'Fermer les détails'
    },

    search: {
        'en-US': 'Search',
        'fr-FR': 'Rechercher'
    },

    administration: {
        'en-US': 'Administration',
        'fr-FR': 'Administration'
    },

    itemCreated: {
        'en-US': 'Item created',
        'fr-FR': 'Élément créé'
    },

    itemUpdated: {
        'en-US': 'Item updated',
        'fr-FR': 'Élément modifié'
    },

    itemRenamed: {
        'en-US': 'Item renamed',
        'fr-FR': 'Nom de l\'élément modifié'
    },

    itemDeleted: {
        'en-US': 'Item deleted',
        'fr-FR': 'Élément supprimé'
    },

    confirmDelete: {
        'en-US': 'Are you sure you want to delete this item?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer cet élément ?'
    },

    itemsImported: {
        'en-US': 'Items imported',
        'fr-FR': 'Éléments importés'
    },

    confirmItemsDelete: {
        'en-US': 'Are you sure you want to delete these items?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer ces éléments ?'
    },

    itemsDeleteImpossible: {
        'en-US': 'You can\'t delete these items',
        'fr-FR': 'Impossible de supprimer ces éléments'
    },

    warning: {
        'en-US': 'Warning',
        'fr-FR': 'Attention'
    },

    exportJSON: {
        'en-US': 'Export as JSON',
        'fr-FR': 'Exporter (JSON)'
    },

    profile: {
        'en-US': 'Profile',
        'fr-FR': 'Profil'
    },

    target: {
        'en-US': 'Target',
        'fr-FR': 'Cible'
    },

    by: {
        'en-US': 'by',
        'fr-FR': 'par'
    },

    invalidEmail: {
        'en-US': 'Invalid email',
        'fr-FR': 'Email invalide'
    },

    invalidNumber: {
        'en-US': 'Must be a number',
        'fr-FR': 'Doit être un nombre'
    },

    invalidUrl: {
        'en-US': 'Invalid https url',
        'fr-FR': 'Url https invalid'
    },

    success: {
        'en-US': 'Success',
        'fr-FR': 'Succès'
    },

    // Tab title START

    tabList: {
        'en-US': 'List ({total})',
        'fr-FR': 'Liste ({total})'
    },

    tabEdit: {
        'en-US': 'Edit - {name}',
        'fr-FR': 'Éditer - {name}'
    },

    tabAdd: {
        'en-US': 'Add - New item',
        'fr-FR': 'Ajouter - Nouvel élément'
    },

    tabRun: {
        'en-US': 'Run - {name}',
        'fr-FR': 'Exécuter - {name}'
    },

    tabView: {
        'en-US': 'View - {name}',
        'fr-FR': 'Afficher - {name}'
    },

    // Tab title END


    selectAll: {
        'en-US': 'Select all',
        'fr-FR': 'Sélectionner tout'
    },

    unselectAll: {
        'en-US': 'Unselect all',
        'fr-FR': 'Désélectionner tout'
    },

    add: {
        'en-US': 'Add',
        'fr-FR': 'Ajouter'
    },

    import: {
        'en-US': 'Import',
        'fr-FR': 'Importer'
    },

    export: {
        'en-US': 'Export',
        'fr-FR': 'Exporter'
    },

    exportAll: {
        'en-US': 'Export all',
        'fr-FR': 'Exporter tout'
    },

    deleteAll: {
        'en-US': 'Delete all',
        'fr-FR': 'Supprimer tout'
    },

    saveAll: {
        'en-US': 'Save all',
        'fr-FR': 'Sauvegarder tout'
    },

    saveToProfile: {
        'en-US': 'Save to profile',
        'fr-FR': 'Sauvegarder dans le profil'
    },

    run: {
        'en-US': 'Run',
        'fr-FR': 'Exécuter'
    },

    rename: {
        'en-US': 'Rename',
        'fr-FR': 'Renommer'
    },

    duplicate: {
        'en-US': 'Duplicate',
        'fr-FR': 'Dupliquer'
    },

    types: {
        'en-US': 'Types',
        'fr-FR': 'Types'
    },

    fullscreen: {
        'en-US': 'Full-screen',
        'fr-FR': 'Plein écran'
    },

    reduce: {
        'en-US': 'Reduce',
        'fr-FR': 'Réduire'
    },

    appKey: {
        'en-US': 'Application key',
        'fr-FR': 'Clé d\'application'
    },

    appInfo: {
        'en-US': 'Application info',
        'fr-FR': 'Information sur l\'application'
    },

    lastModification: {
        'en-US': 'Last modification',
        'fr-FR': 'Dernière modification'
    },

    lastModificationBy: {
        'en-US': 'Last modification made by {name} on {date}',
        'fr-FR': 'Dernière modification faite par {name} le {date}'
    },

    keyExist: {
        'en-US': 'Key already exist.',
        'fr-FR': 'La clé existe déjà.'
    },

    size: {
        'en-US': 'Size',
        'fr-FR': 'Taille'
    },

    tabCloseUnsave: {
        'en-US': 'There are unsaved changes. Are you sure you want to close this tab and lose your updates?',
        'fr-FR': 'Vous avez effectué des modifications sans les enregistrer. Êtes-vous sûr(e) de vouloir fermer cet onglet et perdre les données non sauvegardées ?'
    },

    nameAlreadyTaken: {
        'en-US': 'Name already taken.',
        'fr-FR': 'Nom déjà utilisé.'
    },

    nameNoDot: {
        'en-US': 'The name cannot contain a \'.\'',
        'fr-FR': 'Le nom ne peut pas contenir de \'.\''
    },

    resource: {
        'en-US': 'Resource',
        'fr-FR': 'Ressource'
    },

    targetRoot: {
        'en-US': 'Target root',
        'fr-FR': 'Racine de la cible'
    },

    targetPath: {
        'en-US': 'Target path',
        'fr-FR': 'Chemin vers la cible'
    },

    targetFilePath: {
        'en-US': 'Target file path',
        'fr-FR': 'Chemin vers le fichier'
    },

    properties: {
        'en-US': 'Properties',
        'fr-FR': 'Propriétés'
    },

    propertiesEmpty: {
        'en-US': 'You don\'t have any property',
        'fr-FR': 'Vous n\'avez aucune propriété'
    },

    keyUnique: {
        'en-US': 'The key must be unique.',
        'fr-FR': 'La clé doit être unique.'
    },

    propertyAdd: {
        'en-US': 'Add property',
        'fr-FR': 'Ajouter une propriété'
    },

    multilanguageField: {
        'en-US': 'This is a multilingual field. English is required.',
        'fr-FR': 'Ceci est un champ multilingue. L\'anglais est obligatoire.'
    },

    englishDescriptionRequired: {
        'en-US': 'English description is required.',
        'fr-FR': 'La description anglaise est obligatoire.'
    },

    maxSize1GB: {
        'en-US': 'Maximum size allowed is 1GB.',
        'fr-FR': 'La taille maximale authorisée est de 1GO.'
    },

    invalidSizeMax1GB: {
        'en-US': 'File too big, maximum size allowed is 1GB.',
        'fr-FR': 'Fichier trop lourd, la taille maximale authorisée est de 1GO.'
    },

    nameAlreadyExist: {
        'en-US': 'This name already exists.',
        'fr-FR': 'Ce nom existe déjà.'
    },

    resourceNotFound: {
        'en-US': 'No resource has been found',
        'fr-FR': 'Aucune ressource n\'a été trouvée'
    },

    resourcesAttached: {
        'en-US': 'Resource attached',
        'fr-FR': 'Ressource attachée'
    },

    confirmUpdateForConsistancy: {
        'en-US': 'It seems like your items are not synchronized with the server anymore, you should save your work and update the service.',
        'fr-FR': 'Il semble que vos éléments ne sont plus synchronisés avec le serveur, vous devriez sauvegarder votre travail et mettre à jour le service.'
    },

    itemNotFound: {
        'en-US': 'Item not found.',
        'fr-US': 'Aucun élément trouvé.'
    },

    status: {
        'en-US': 'Status',
        'fr-FR': 'Statut'
    },

    none: {
        'en-US': 'None',
        'fr-FR': 'Aucun'
    },

    itemsReadonly: {
        'en-US': 'These items are only readable. They can not be deleted.',
        'fr-FR': 'Ces éléments ne sont pas modifiables. Ils ne peuvent pas être supprimés.'
    },

    registration: {
        'en-US': 'Registration',
        'fr-FR': 'Enregistrement'
    },

    backToLogin: {
        'en-US': 'Back to sign in page',
        'fr-FR': 'Retour à la page de connexion'
    },

    registrationSuccess: {
        'en-US': 'Successful registration',
        'fr-FR': 'Enregistrement réussi'
    },

    successRegisterMailSent: {
        'en-US': 'You will receive a confirmation email.',
        'fr-FR': 'Vous allez recevoir un email de confirmation.'
    },

    successRegistrationMessage: {
        'en-US': 'If you already set your password, you can now sign in. Otherwise, please click on the link sent to you by email to activate your account.',
        'fr-FR': 'Si vous avez déjà créé votre mot de passe, vous pouvez vous connecter dès maintenant. Sinon, vous trouverez un lien dans l\'email de confirmation qui vous pemettra d\'activer votre compte.'
    },

    registrationEmailHelp: {
        'en-US': 'Make sure the email is correct to receive the confirmation link',
        'fr-FR': 'Merci de vous assurer que votre email est correct pour pouvoir finaliser l\'enregistrement'
    },

    pleaseWait: {
        'en-US': 'Please wait',
        'fr-FR': 'Merci de patienter'
    },

    importLoading: {
        'en-US': 'Your import file is being processed...',
        'fr-FR': 'Votre import est en cours de traitement...'
    },

    exportLoading: {
        'en-US': 'Your export file is being prepared...',
        'fr-FR': 'Votre export est en cours de chargement...'
    },

    close: {
        'en-US': 'Close',
        'fr-FR': 'Fermer'
    },

    service: {
        'en-US': 'Service',
        'fr-FR': 'Service'
    },

    renameDisabled: {
        'en-US': 'Please close any view or edit tab concerning this item if you want to rename it',
        'fr-FR': 'Merci de fermer tout onglet concernant cet élément si vous souhaitez le renommer'
    },

    deleteDisabled: {
        'en-US': 'Please close any view or edit tab concerning this item if you want to delete it',
        'fr-FR': 'Merci de fermer tout onglet concernant cet élément si vous souhaitez le supprimer'
    },

    result: {
        'en-US': 'result',
        'fr-FR': 'résultat'
    },

    results: {
        'en-US': 'results',
        'fr-FR': 'résultats'
    },

    /** Portal Wordings */


    /** CHEVRON SPECIFIC SECTION */

    CHEVRON_registrationTypeLabel: {
        'en-US': 'Registration type',
        'fr-FR': 'Type d\'enregistrement'
    },

    CHEVRON_registrationRegistrationTypeError: {
        'en-US': 'Please select the type of registration',
        'fr-FR': 'Merci de sélectionner le type d\'enregistrement'
    },

    CHEVRON_registrationTypeSupplier: {
        'en-US': 'Supplier',
        'fr-FR': 'Fournisseur'
    },

    CHEVRON_registrationTypeCapitalProject: {
        'en-US': 'Capital Project',
        'fr-FR': 'Capital Project'
    },

    CHEVRON_registrationTypeInternalUser: {
        'en-US': 'Internal User',
        'fr-FR': 'Internal User'
    },

    CHEVRON_registrationIntro1: {
        'en-US': 'This Community enables Chevron Suppliers, Chevron Internal Users and Chevron Major Capital Projects to perform electronic transactions with Chevron IT systems in a highly secure but very easy manner.',
        'fr-FR': 'Cette communauté permet aux fournisseurs, "Internal User" et "Capital Project" Chevron de réaliser des échanges électroniques avec les systèmes informatiques de Chevron de façon simple et sécurisée.'
    },

    CHEVRON_registrationSupplierIntro: {
        'en-US': 'To be part of the Chevron Community, you must have been invited and/or authorized by Chevron.',
        'fr-FR': 'Pour faire partie de la communauté Chevron, vous devez avoir reçu une invitation et/ou une autorisation de la part de Chevron.'
    },

    CHEVRON_registrationPidxid: {
        'en-US': 'PIDX ID',
        'fr-FR': 'PIDX ID'
    },

    CHEVRON_registrationPidxidHelp: {
        'en-US': 'The Chevron PIDX ID is found in the invitation email sent by Chevron',
        'fr-FR': 'Le "PIDX ID" Chevron se trouve dans l\'email d\'invitation envoyé par Chevron'
    },

    CHEVRON_registrationPidxidError: {
        'en-US': 'Please enter the Chevron PIDX ID',
        'fr-FR': 'Merci de saisir le "PIDX ID" Chevron'
    },

    CHEVRON_registrationVendorid: {
        'en-US': 'ERP Vendor ID',
        'fr-FR': 'ERP Vendor ID'
    },

    CHEVRON_registrationVendoridHelp: {
        'en-US': 'The Chevron ERP Vendor ID is found in the invitation email sent to you by Chevron',
        'fr-FR': 'Le "ERP Vendor ID" Chevron se trouve dans l\'email d\'invitation envoyé par Chevron'
    },

    CHEVRON_registrationVendoridError: {
        'en-US': 'Please enter the Chevron ERP Vendor ID',
        'fr-FR': 'Merci de saisir le "ERP Vendor ID" Chevron'
    },

    CHEVRON_registrationAgreementIntro: {
        'en-US': `
            <span>
                <span>Please read the&nbsp;</span>
                <a target="_blank" href="http://www.b2een.com/_communitymaterial/chevron/Agreement_b2een_Chevron_Prod.pdf">contractual agreement</a>
                <span>&nbsp;and confirm below</span>
            </span>
        `,
        'fr-FR': `
            <span>
                <span>Merci de lire&nbsp;</span>
                <a target="_blank" href="http://www.b2een.com/_communitymaterial/chevron/Agreement_b2een_Chevron_Prod.pdf">l'accord contractuel</a>
                <span>&nbsp;et de valider ci-dessous</span>
            </span>
        `
    },

    CHEVRON_registrationAgreementLabel: {
        'en-US': 'I have read and I accept the Terms and Conditions of this Agreement',
        'fr-FR': 'J\'ai lu et accepte les Conditions Générales de ce contrat'
    },

    CHEVRON_registrationAgreementError: {
        'en-US': 'Please accept the Terms and Conditions',
        'fr-FR': 'Merci de valider les Conditions Générales'
    },

    CHEVRON_registrationInternalUserIntro2: {
        'en-US': 'To get your registration accepted, please provide the appropriate PIDX ID and Chevron password.',
        'fr-FR': 'Pour poursuivre votre enregistrement, merci d\'entrer le "PIDX ID" et mot de passe Chevron puis valider.'
    },

    CHEVRON_registrationPassword: {
        'en-US': 'Chevron password',
        'fr-FR': 'Mot de passe Chevron'
    },

    CHEVRON_registrationPasswordHelp: {
        'en-US': 'The Chevron password is found in the invitation email sent by Chevron',
        'fr-FR': 'Le mot de passe Chevron se trouve dans l\'email d\'invitation envoyé par Chevron'
    },

    CHEVRON_registrationPasswordError: {
        'en-US': 'Please enter the Chevron password',
        'fr-FR': 'Merci de saisir le mot de passe Chevron'
    },

    CHEVRON_registrationCapitalProjectIntro: {
        'en-US': 'You are creating this account for a Chevron Major Capital Project.',
        'fr-FR': 'Vous créez ce compte pour un "Chevron Major Capital Project".'
    },

    CHEVRON_registrationPidxidVendoridError: {
        'en-US': 'PIDX ID / ERP Vendor ID are not correct. Please check the values you provided and retry.',
        'fr-FR': '"PIDX ID" / "ERP Vendor ID" incorrects. Merci de vérifier les valeurs saisies avant de réessayer.'
    },

    CHEVRON_registrationPidxidPasswordError: {
        'en-US': 'PIDX ID / Chevron Password are not correct. Please check the values you provided and retry.',
        'fr-FR': '"PIDX ID" / Mot de passe incorrects. Merci de vérifier les valeurs saisies avant de réessayer.'
    },

    /** END OF CHEVRON SECTION */


    permissionSetTooltipDelete: {
        'en-US': 'Delete permission set',
        'fr-FR': 'Supprimer ce groupe de permissions'
    },

    permissionSetTooltipEdit: {
        'en-US': 'Edit permission set',
        'fr-FR': 'Éditer ce groupe de permissions'
    },

    permissionSetTooltipClone: {
        'en-US': 'Create a new permission set with prefilled data from this one',
        'fr-FR': 'Créer un nouveau groupe de permissions avec les données de celui-ci'
    },

    permissionSetTooltipCrossInstances: {
        'en-US': 'This is a global permission set',
        'fr-FR': 'Ce groupe de permissions est global'
    },

    permissionSetAtLeastOneScopeRequired: {
        'en-US': 'At least one scope string is required',
        'fr-FR': 'Au moins un scope doit être renseigné'
    },

    permissionSetsDeleteConfirm: {
        'en-US': 'Are you sure you want to delete this permission set?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer ce groupe de permissions ?'
    },

    userDisassociate: {
        'en-US': 'Disassociate user',
        'fr-FR': 'Désassocier cet utilisateur'
    },

    realm: {
        'en-US': 'Realm',
        'fr-FR': 'Domaine'
    },

    emailVerified: {
        'en-US': 'Email verified',
        'fr-FR': 'Email confirmé'
    },

    policies: {
        'en-US': 'Policies',
        'fr-FR': 'Droits d\'accès'
    },

    orgPositions: {
        'en-US': 'Organization positions',
        'fr-FR': 'Positions d\'organisation'
    },

    userReloadOrgPositions: {
        'en-US': 'Reload user organization positions',
        'fr-FR': 'Rafraîchir les positions d\'organisation'
    },

    permissionSet: {
        'en-US': 'Permission set',
        'fr-FR': 'Groupe de permissions'
    },

    userResendActivationEmail: {
        'en-US': 'Resend activation email',
        'fr-FR': 'Renvoyer l\'email d\'activation'
    },

    userShowOrgPositions: {
        'en-US': 'Show user organization positions',
        'fr-FR': 'Voir les positions d\'organisation'
    },

    permissionSetsForInstance: {
        'en-US': 'Permission sets for instance',
        'fr-FR': 'Groupes de permissions pour l\'instance'
    },

    otherProperties: {
        'en-US': 'Other properties',
        'fr-FR': 'Autres propriétés'
    },

    permissionSetRequired: {
        'en-US': 'At least one permission set must be selected',
        'fr-FR': 'Au moins un groupe de permissions doît être assigné à l\'utilisateur'
    },

    orgPosition: {
        'en-US': 'Organization position',
        'fr-FR': 'Position dans l\'organisation'
    },

    usersEmailPlaceholder: {
        'en-US': 'Email...',
        'fr-FR': 'Email...'
    },

    searchBy: {
        'en-US': 'Search by',
        'fr-FR': 'Rechercher par'
    },

    tooltipAddUser: {
        'en-US': 'Type the email address of the new user you want to associate to this instance',
        'fr-FR': 'Entrer l\'adresse email du nouvel utilisateur que vous souhaitez associer à cette instance'
    },

    associateUser: {
        'en-US': 'Associate new user',
        'fr-FR': 'Associer nouvel utilisateur'
    },

    userDeleteConfirm: {
        'en-US': 'Are you sure you want to delete this user?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer cet utilisateur ?'
    },

    userDisassociateConfirm: {
        'en-US': 'Are you sure you want to disassociate this user from the current instance?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir désassocier cet utilisateur de l\'instance ?'
    },

    showAllUsers: {
        'en-US': 'Display users of all instances',
        'fr-FR': 'Afficher les utilisateurs de toutes les instances'
    },

    showScopelessUsers: {
        'en-US': 'Only display users without any permission',
        'fr-FR': 'Afficher seulement les utilisateurs sans droits d\'accès'
    },

    showOrglessUsers: {
        'en-US': 'Only display users without any associated org node',
        'fr-FR': 'Afficher seulement les utilisateurs sans position d\'organisation'
    },

    disassociate: {
        'en-US': 'Disassociate',
        'fr-FR': 'Désassocier'
    },

    permissionSets: {
        'en-US': 'Permission sets',
        'fr-FR': 'Groupes de permissions'
    },

    users: {
        'en-US': 'Users',
        'fr-FR': 'Utilisateurs'
    },

    fields: {
        'en-US': 'Fields',
        'fr-FR': 'Champs'
    },

    isKey: {
        'en-US': 'Key?',
        'fr-FR': 'Clé ?'
    },

    addField: {
        'en-US': 'Add a field',
        'fr-FR': 'Ajouter un champ'
    },

    createTable: {
        'en-US': 'Create a new table',
        'fr-FR': 'Créer une nouvelle table'
    },

    editTable: {
        'en-US': 'Update the table',
        'fr-FR': 'Modifier la table'
    },

    invalidXmlTag: {
        'en-US': 'Invalid value. Allowed chars: a-z A-Z 0-9 _ : - .',
        'fr-FR': 'Valeur invalide. Caractères autorisés : a-z A-Z 0-9 _ : - .'
    },

    width: {
        'en-US': 'Width',
        'fr-FR': 'Largeur'
    },

    height: {
        'en-US': 'Height',
        'fr-FR': 'Hauteur'
    },

    smallSize: {
        'en-US': 'Small',
        'fr-FR': 'Petit'
    },

    mediumSize: {
        'en-US': 'Medium',
        'fr-FR': 'Moyen'
    },

    largeSize: {
        'en-US': 'Large',
        'fr-FR': 'Grand'
    },

    fullSize: {
        'en-US': 'Full',
        'fr-FR': 'Plein'
    },

    editDocument: {
        'en-US': 'Edit document',
        'fr-FR': 'Éditer le document'
    },

    viewDocument: {
        'en-US': 'View document',
        'fr-FR': 'Voir le document'
    },

    reprocessDocument: {
        'en-US': 'Reprocess document',
        'fr-FR': 'Relancer le document'
    },

    reloadDocument: {
        'en-US': 'Reload document',
        'fr-FR': 'Recharger le document'
    },

    printDocument: {
        'en-US': 'Print document',
        'fr-FR': 'Imprimer le document'
    },

    viewFormJs: {
        'en-US': 'View the form',
        'fr-FR': 'Voir le formulaire'
    },

    editFormJs: {
        'en-US': 'Edit using the form',
        'fr-FR': 'Editer à l\'aide du formulaire'
    },

    viewSource: {
        'en-US': 'View the source',
        'fr-FR': 'Voir la source'
    },

    editTransaction: {
        'en-US': 'Edit transaction',
        'fr-FR': 'Éditer la transaction'
    },

    viewTransaction: {
        'en-US': 'View transaction',
        'fr-FR': 'Voir la transaction'
    },

    reprocessTransaction: {
        'en-US': 'Reprocess transaction',
        'fr-FR': 'Relancer la transaction'
    },

    flagTransaction: {
        'en-US': 'Flag transaction',
        'fr-FR': 'Marquer la transaction'
    },

    createTransaction: {
        'en-US': 'Create transaction',
        'fr-FR': 'Créer une transaction'
    },

    transactionsDeleted: {
        'en-US': 'Transactions deleted',
        'fr-FR': 'Transactions supprimés'
    },

    lockedTransaction: {
        'en-US': 'This transaction is currently locked',
        'fr-FR': 'Cette transaction est verrouillée'
    },

    reloadTransaction: {
        'en-US': 'Reload transaction',
        'fr-FR': 'Recharger la transaction'
    },

    printTransaction: {
        'en-US': 'Print transaction',
        'fr-FR': 'Imprimer la transaction'
    },

    createdTransactionsIds: {
        'en-US': 'Created transaction(s) ID(s):',
        'fr-FR': 'ID(s) de la/des transaction(s) créé(s) :'
    },

    fetchTransactionFailure: {
        'en-US': 'Transaction cannot be loaded',
        'fr-FR': 'La transaction ne peut être chargée'
    },

    multipleTransactionReprocessImpossible: {
        'en-US': 'One or more of the selected transactions cannot be reprocessed. Please check your selection and retry!',
        'fr-FR': 'Une ou plusieurs des transactions sélectionnées ne peuvent pas être relancées. Merci de verifier votre sélection et de réessayer !'
    },

    multipleTransactionDeleteImpossible: {
        'en-US': 'One or more of the selected transactions cannot be deleted. Please check your selection and retry!',
        'fr-FR': 'Une ou plusieurs des transactions sélectionnées ne peuvent pas être supprimées. Merci de verifier votre sélection et de réessayer !'
    },

    confirmMultipleTransactionsDelete: {
        'en-US': 'Are you sure you want to delete the selected transactions?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer les transactions sélectionnées ?'
    },

    confirmMultipleTransactionsReprocess: {
        'en-US': 'Are you sure you want to reprocess the selected transactions?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir relancer les transactions sélectionnéss ?'
    },

    multipleTransactionsReprocessSuccess: {
        'en-US': 'Transactions reprocessed',
        'fr-FR': 'Transactions relancées'
    },

    multipleTransactionsReprocessFailure: {
        'en-US': 'transaction(s) not reprocessed',
        'fr-FR': 'transaction(s) non relancée(s)'
    },

    confirmCloseTransactionSubmit: {
        'en-US': 'Are you sure you want to close this message submission session?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir terminer cette session de création de message ?'
    },

    editMessage: {
        'en-US': 'Edit message',
        'fr-FR': 'Éditer le message'
    },

    viewMessage: {
        'en-US': 'View message',
        'fr-FR': 'Voir le message'
    },

    reprocessMessage: {
        'en-US': 'Reprocess message',
        'fr-FR': 'Relancer le message'
    },

    reloadMessage: {
        'en-US': 'Reload message',
        'fr-FR': 'Recharger le message'
    },

    printMessage: {
        'en-US': 'Print message',
        'fr-FR': 'Imprimer le message'
    },

    lockedMessage: {
        'en-US': 'This message is currently locked',
        'fr-FR': 'Ce message est verrouillé'
    },

    backToList: {
        'en-US': 'Return to list',
        'fr-FR': 'Retour à la liste'
    },

    emptyApp: {
        'en-US': 'None',
        'fr-FR': 'Aucune'
    },

    noAppSelected: {
        'en-US': 'No application selected',
        'fr-FR': 'Aucune application sélectionnée'
    },

    selectApp: {
        'en-US': 'Select an application',
        'fr-FR': 'Sélectionner une application'
    },

    logout: {
        'en-US': 'Sign out',
        'fr-FR': 'Déconnexion'
    },

    lastSyncDate: {
        'en-US': 'Last synchronization date',
        'fr-FR': 'Date de dernière synchronisation'
    },

    homeConfigurationInvalidName: {
        'en-US': 'Invalid value. Authorized characters : a-z A-Z 0-9 _ : - .',
        'fr-FR': 'Valeur invalide. Caractères autorisés : a-z A-Z 0-9 _ : - .'
    },

    homeConfigurationNameAlreadyUsed: {
        'en-US': 'The name `{name}`is already in use by another configuration, choose another one please',
        'fr-FR': 'Le nom `{name}` est déjà utilisé pour une autre configuration, veuillez en choisir un autre'
    },

    instanceChangeDisabled: {
        'en-US': 'Instance change isn\'t possible when you are editing users or permission sets',
        'fr-FR': 'Changer d\'instance est impossible pendant l\'édition d\'utilisateurs ou de groupes de permissions.'
    },

    quitEdit: {
        'en-US': 'Quit edit',
        'fr-FR': 'Annuler édition'
    },

    reloadInstancesList: {
        'en-US': 'Reload instances list',
        'fr-FR': 'Rafraîchir la liste des instances'
    },

    instanceFetchWarning: {
        'en-US': 'App endpoints not loaded',
        'fr-FR': 'Les \'endpoints\' ne sont pas chargés'
    },

    menu: {
        'en-US': 'Menu',
        'fr-FR': 'Menu'
    },

    home: {
        'en-US': 'Home',
        'fr-FR': 'Accueil'
    },

    transactions: {
        'en-US': 'Transactions',
        'fr-FR': 'Transactions'
    },

    reports: {
        'en-US': 'Reports',
        'fr-FR': 'Rapports'
    },

    workItems: {
        'en-US': 'Work Items',
        'fr-FR': 'Tâches'
    },

    workflowTasks: {
        'en-US': 'Workflow Tasks',
        'fr-FR': 'Tâches'
    },

    workflowTask: {
        'en-US': 'Workflow Task',
        'fr-FR': 'Tâche'
    },

    workflowTasksMultiTasks: {
        'en-US': 'Workflow multi task',
        'fr-FR': 'Actions sur les tâches'
    },

    handleWorkflowTasks: {
        'en-US': 'Handle workflow task(s)',
        'fr-FR': 'Traiter tâche(s)'
    },

    noWorkflowTasksAvailable: {
        'en-US': 'No common actions available for the selected tasks',
        'fr-FR': 'Aucune actions commune pour les tâches sélectionnées'
    },

    tables: {
        'en-US': 'Tables',
        'fr-FR': 'Tables'
    },

    documents: {
        'en-US': 'Documents',
        'fr-FR': 'Documents'
    },

    oauthSettings: {
        'en-US': 'OAuth Settings',
        'fr-FR': 'Paramètres OAuth'
    },

    organisations: {
        'en-US': 'Organizations',
        'fr-FR': 'Organisations'
    },

    localTest: {
        'en-US': 'Local test',
        'fr-FR': 'Test local'
    },

    retry: {
        'en-US': 'Retry?',
        'fr-FR': 'Réessayer ?'
    },

    noMenuEntry: {
        'en-US': 'No entry found',
        'fr-FR': 'Aucun menu accessible'
    },

    createdMessagesIds: {
        'en-US': 'Created message(s) ID(s):',
        'fr-FR': 'ID(s) du/des message(s) créé(s) :'
    },

    flagMessage: {
        'en-US': 'Flag message',
        'fr-FR': 'Marquer le message'
    },

    flags: {
        'en-US': 'Flags',
        'fr-FR': 'Marqueurs'
    },

    setFlags: {
        'en-US': 'Set flags',
        'fr-FR': 'Marquer'
    },

    availableFields: {
        'en-US': 'Available fields',
        'fr-FR': 'Champs disponibles'
    },

    alwaysVisible: {
        'en-US': 'Always visible',
        'fr-FR': 'Toujours visible'
    },

    visibleIfOpened: {
        'en-US': 'Visible if opened',
        'fr-FR': 'Visible si ouvert'
    },

    backgroundColor: {
        'en-US': 'Background color',
        'fr-FR': 'Couleur du fond'
    },

    fontColor: {
        'en-US': 'Default font color',
        'fr-FR': 'Couleur de base du texte'
    },

    createMessage: {
        'en-US': 'Create message',
        'fr-FR': 'Créer un message'
    },

    uploadFiles: {
        'en-US': 'Upload files',
        'fr-FR': 'Envoyer des fichiers'
    },

    end: {
        'en-US': 'Close',
        'fr-FR': 'Terminer'
    },

    process: {
        'en-US': 'Process',
        'fr-FR': 'Valider'
    },

    filesDropped: {
        'en-US': 'file(s) dropped',
        'fr-FR': 'fichier(s) déposé(s)'
    },

    filesUploaded: {
        'en-US': 'file(s) uploaded',
        'fr-FR': 'fichier(s) envoyé(s)'
    },

    showProcessedFiles: {
        'en-US': 'Display successfully processed files',
        'fr-FR': 'Afficher les fichiers traités avec succès'
    },

    hideProcessedFiles: {
        'en-US': 'Hide successfully processed files',
        'fr-FR': 'Masquer les fichiers traités avec succès'
    },

    filesSubmitSuccess: {
        'en-US': 'Files successfully processed!',
        'fr-FR': 'Fichiers traités avec succès !'
    },

    hiddenColumns: {
        'en-US': 'Hidden columns',
        'fr-FR': 'Colonnes cachées'
    },

    hiddenColumnsTip: {
        'en-US': '(click to re-display)',
        'fr-FR': '(cliquer pour ré-afficher)'
    },

    allColumnsVisible: {
        'en-US': 'All columns are currently displayed. Hiddens columns can be found here and re-displayed.',
        'fr-FR': 'Toutes les colonnes sont actuellement visibles. Les colonnes cachées apparaitront ici et pourront être ré-affichées.'
    },

    dateFrom: {
        'en-US': 'From',
        'fr-FR': 'Début'
    },

    dateTo: {
        'en-US': 'To',
        'fr-FR': 'Fin'
    },

    documentType: {
        'en-US': 'View',
        'fr-FR': 'Vue'
    },

    collapseOption: {
        'en-US': 'Collapse after search',
        'fr-FR': 'Réduire après recherche'
    },

    resetSearchOption: {
        'en-US': 'Launch search after reset',
        'fr-FR': 'Lancer la recherche après réinitialisation'
    },

    displayLabel: {
        'en-US': 'Display label',
        'fr-FR': 'Afficher label'
    },

    workflowInProgress: {
        'en-US': 'In a workflow',
        'fr-FR': 'Flux en cours'
    },

    assignUser: {
        'en-US': 'Assign user',
        'fr-FR': 'Assigner utilisateur'
    },

    assignedUsers: {
        'en-US': 'Assigned user(s)',
        'fr-FR': 'Utilisateur(s) assigné(s)'
    },

    assignUserToPosition: {
        'en-US': 'Add this user to this position',
        'fr-FR': 'Ajouter cet utilisateur à cette position'
    },

    removeUserOrgPosition: {
        'en-US': 'Remove this user from this position',
        'fr-FR': 'Supprimer cet utilisateur de cette position'
    },

    layoutBuilder: {
        'en-US': 'Layout builder',
        'fr-FR': 'Personnalisation de l\'affichage'
    },

    theme: {
        'en-US': 'Theme',
        'fr-FR': 'Thème'
    },

    fontSize: {
        'en-US': 'Font size',
        'fr-FR': 'Taille caractères'
    },

    showInvisibles: {
        'en-US': 'Show invisibles',
        'fr-FR': 'Afficher les caractères invisibles'
    },

    showGutter: {
        'en-US': 'Show gutter',
        'fr-FR': 'Afficher la marge'
    },

    showIndent: {
        'en-US': 'Show indent guides',
        'fr-FR': 'Afficher les guides d\'indentation'
    },

    wrap: {
        'en-US': 'Wrap',
        'fr-FR': 'Débordement'
    },

    preview: {
        'en-US': 'Preview',
        'fr-FR': 'Prévisualisation'
    },


    showHiddenColumns: {
        'en-US': 'Show hidden columns',
        'fr-FR': 'Afficher les colonnes cachées'
    },

    resetDisplaySettings: {
        'en-US': 'Reset all display settings',
        'fr-FR': 'Réinitialiser les préférences d\'affichage'
    },

    displayHiddenColumns: {
        'en-US': 'Hidden columns (click to re-display)',
        'fr-FR': 'Colonnes cachées (cliquer pour ré-afficher)'
    },

    displaySettingsChanged: {
        'en-US': 'Display settings changed!',
        'fr-FR': 'Préférences d\'affichage modifiées !'
    },

    displaySettings: {
        'en-US': 'Display settings!',
        'fr-FR': 'Préférences d\'affichage'
    },

    datagridSaveDisplaySettings: {
        'en-US': `
            <div>
                <span>Do you want to save your modifications?</span><br/>
                <em class="text-medium">Your preferences (presence, width and order of columns...) will be saved in your user profile.</em>
            </div>
        `,
        'fr-FR': `
            <div>
                <span>Voulez-vous sauvegarder vos modifications ?</span><br/>
                <em class="text-medium">Vos préférences d'affichage (présence, largeur et ordre des colonnes...) seront enregistrées dans votre profil utilisateur.</em>
            </div>
        `
    },

    displaySettingsResetConfirm: {
        'en-US': 'Are you sure you want to reset all your display settings?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir réinitialiser vos préférences d\'affichage ?'
    },

    displayMode: {
        'en-US': 'Display mode:',
        'fr-FR': 'Affichage :'
    },

    displayLaptop: {
        'en-US': 'Medium screen size',
        'fr-FR': 'Écran de taille moyenne'
    },

    displayDesktop: {
        'en-US': 'Large screen size',
        'fr-FR': 'Écran de grande taille'
    },

    unexpectedErrorCheckUrl: {
        'en-US': 'An unexpected error has occured. Please retry and check for the URL you requested or contact your system administrator.',
        'fr-FR': 'Une erreur est survenue. Merci de réessayer en vérifiant l\'URL ou contactez votre administrateur système.'
    },

    seeErrorDetails: {
        'en-US': 'See error details',
        'fr-FR': 'Voir les détails de l\'erreur'
    },

    second: {
        'en-US': 'Second',
        'fr-FR': 'Seconde'
    },

    minute: {
        'en-US': 'Minute',
        'fr-FR': 'Minute'
    },

    hour: {
        'en-US': 'Hour',
        'fr-FR': 'Heure'
    },

    dayOfMonth: {
        'en-US': 'Day of month',
        'fr-FR': 'Jour du mois'
    },

    month: {
        'en-US': 'Month',
        'fr-FR': 'Mois'
    },

    dayOfWeek: {
        'en-US': 'Day of week',
        'fr-FR': 'Jour de la semaine'
    },

    year: {
        'en-US': 'Year',
        'fr-FR': 'Année'
    },

    inputInvalid: {
        'en-US': 'Invalid input',
        'fr-FR': 'Champ invalide'
    },

    importDataFromFile: {
        'en-US': 'Import data from a file',
        'fr-FR': 'Importer des données depuis un fichier'
    },

    selectedFile: {
        'en-US': 'Selected file',
        'fr-FR': 'Fichier sélectionné'
    },

    fileType: {
        'en-US': 'File type',
        'fr-FR': 'Type du fichier'
    },

    fieldsSeparator: {
        'en-US': 'Fields separator',
        'fr-FR': 'Séparateur de colonnes'
    },

    encoding: {
        'en-US': 'Encoding',
        'fr-FR': 'Encodage'
    },

    quoteChar: {
        'en-US': 'Quote character',
        'fr-FR': 'Caractère de guillemet'
    },

    headerOnFirstRow: {
        'en-US': 'Headers on first row',
        'fr-FR': 'Entêtes sur la première ligne'
    },

    overwriteExistingData: {
        'en-US': 'Overwrite existing data',
        'fr-FR': 'Écraser les données existantes'
    },

    dropZoneTitle: {
        'en-US': 'Drop files here to upload them',
        'fr-FR': 'Déposer les fichiers à envoyer ici'
    },

    dropZoneSubtitle: {
        'en-US': '(or click)',
        'fr-FR': '(ou cliquer)'
    },

    invalidFile: {
        'en-US': 'Invalid file(s)',
        'fr-FR': 'Fichier(s) invalide(s)'
    },

    contentType: {
        'en-US': 'Accepted Content-types:',
        'fr-FR': 'Content-types acceptés :'
    },

    maxSize: {
        'en-US': 'Max size:',
        'fr-FR': 'Taille max :'
    },

    unknownFormat: {
        'en-US': 'unknown format',
        'fr-FR': 'unknown size'
    },

    addTextProperty: {
        'en-US': 'Add a text property',
        'fr-FR': 'Ajouter une valeur de type texte'
    },

    addFileProperty: {
        'en-US': 'Add a file property',
        'fr-FR': 'Ajouter un fichier'
    },

    selectFile: {
        'en-US': 'Select a file:',
        'fr-FR': 'Ajouter un fichier :'
    },

    download: {
        'en-US': 'Download',
        'fr-FR': 'Télécharger'
    },

    uploadFile: {
        'en-US': 'Upload a file',
        'fr-FR': 'Envoyer un fichier'
    },

    selectedLanguage: {
        'en-US': 'Selected language',
        'fr-FR': 'Langue sélectionnée'
    },

    addLanguage: {
        'en-US': 'Add a language',
        'fr-FR': 'Ajouter une langue'
    },

    removeLanguageSelected: {
        'en-US': 'Remove selected language',
        'fr-FR': 'Supprimer la langue sélectionnée'
    },

    closeLanguageSelector: {
        'en-US': 'Close language selector',
        'fr-FR': 'Fermer la sélection de langue'
    },

    searchLanguage: {
        'en-US': 'Search language...',
        'fr-FR': 'Rechercher une langue'
    },

    page: {
        'en-US': 'Page',
        'fr-FR': 'Page'
    },

    of: {
        'en-US': 'of',
        'fr-FR': 'sur'
    },

    pdfLoadingError: {
        'en-US': 'PDF loading error',
        'fr-FR': 'Erreur de chargement du PDF'
    },

    noFileChosen: {
        'en-US': 'No file chosen',
        'fr-FR': 'Aucun fichier choisi'
    },

    fileUploaded: {
        'en-US': 'File uploaded',
        'fr-FR': 'Fichier téléchargé'
    },

    previewLowerCase: {
        'en-US': 'preview',
        'fr-FR': 'aperçu'
    },

    fileUploadFailed: {
        'en-US': 'File upload failed',
        'fr-FR': 'Échec du téléchargement du fichier'
    },

    restart: {
        'en-US': 'Restart',
        'fr-FR': 'Redémarrer'
    },

    showStatusControls: {
        'en-US': 'Show status controls',
        'fr-FR': 'Afficher les contrôles de statut'
    },

    hideStatusControls: {
        'en-US': 'Hide status controls',
        'fr-FR': 'Cacher les contrôles de statut'
    },

    refreshStatus: {
        'en-US': 'Refresh status',
        'fr-FR': 'Rafraîchir statut'
    },

    running: {
        'en-US': 'Running',
        'fr-FR': 'En cours'
    },

    stopped: {
        'en-US': 'Stopped',
        'fr-FR': 'Arrêté'
    },

    sortBy: {
        'en-US': 'Sort by',
        'fr-FR': 'Trier par'
    },

    createChild: {
        'en-US': 'Create child',
        'fr-FR': 'Créer enfant'
    },

    validate: {
        'en-US': 'Validate',
        'fr-FR': 'Valider'
    },

    treeUpdate: {
        'en-US': 'Update',
        'fr-FR': 'Valider'
    },

    id: {
        'en-US': 'ID',
        'fr-FR': 'ID'
    },

    propertiesKey: {
        'en-US': 'Properties key(s)',
        'fr-FR': 'Clé(s) de propriétés'
    },

    invalidUniqueNodeName: {
        'en-US': 'Node name must be unique among direct children',
        'fr-FR': 'Le nom du noeud doit être unique parmi les enfants directs'
    },

    additionalProperties: {
        'en-US': 'Additional properties',
        'fr-FR': 'Propriétés additionnelles'
    },

    selectedNodeDetails: {
        'en-US': 'Selected node details',
        'fr-FR': 'Détails du noeud sélectionné'
    },

    expand: {
        'en-US': 'Expand',
        'fr-FR': 'Déplier'
    },

    collapse: {
        'en-US': 'Collapse',
        'fr-FR': 'Plier'
    },

    userDetails: {
        'en-US': 'User details',
        'fr-FR': 'Informations'
    },

    viewBy: {
        'en-US': 'View by',
        'fr-FR': 'Afficher par'
    },

    selectUser: {
        'en-US': 'Select a user',
        'fr-FR': 'Sélectionner un utilisateur'
    },

    userEmail: {
        'en-US': 'User email',
        'fr-FR': 'Email de l\'utilsateur'
    },

    selectValue: {
        'en-US': 'Select a value',
        'fr-FR': 'Sélectionner une valeur'
    },

    addFiles: {
        'en-US': 'Add files',
        'fr-FR': 'Ajouter des fichiers'
    },

    confirmUsersDisassociate: {
        'en-US': 'Are you sure you want to disassociate the selected user(s) from the current instance?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir désassocier l\'(les) utilisateur(s) sélectionné(s) de l\'instance ?'
    },

    confirmUsersDelete: {
        'en-US': 'Are you sure you want to delete the selected user(s)?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer l\'(les) utilisateur(s) sélectionné(s) ?'
    },

    confirmPermsetsDelete: {
        'en-US': 'Are you sure you want to delete the selected permission set(s)?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer le(s) groupe(s) de permissions sélectionné(s) ?'
    },

    permsetsDeleteSuccess: {
        'en-US': 'Permission set(s) deleted!',
        'fr-FR': 'Groupe(s) de permissions supprimés !'
    },

    permsetsDeleteFailure: {
        'en-US': 'permission set(s) not deleted',
        'fr-FR': 'groupe(s) de permissions non supprimé(s)'
    },

    usersDeleteSuccess: {
        'en-US': 'User(s) deleted!',
        'fr-FR': 'Utilisateur(s) supprimé(s) !'
    },

    usersDeleteFailure: {
        'en-US': 'user(s) not deleted',
        'fr-FR': 'utilisateur(s) non supprimé(s)'
    },

    usersDisassociateSuccess: {
        'en-US': 'User(s) disassociated!',
        'fr-FR': 'Utilisateur(s) désassocié(s) !'
    },

    usersDisassociateFailure: {
        'en-US': 'user(s) not disassociated',
        'fr-FR': 'utilisateur(s) non désassocié(s)'
    },

    records: {
        'en-US': 'Records',
        'fr-FR': 'Entrées'
    },

    noAvailableTables: {
        'en-US': 'No tables available.',
        'fr-FR': 'Aucune table disponible.'
    },

    selectTable: {
        'en-US': 'Select a table',
        'fr-FR': 'Sélectionner une table'
    },

    deleteTable: {
        'en-US': 'Delete this table',
        'fr-FR': 'Supprimer cette table'
    },

    deleteAllRecords: {
        'en-US': 'Delete all records',
        'fr-FR': 'Supprimer tout le contenu'
    },

    exportToExcel: {
        'en-US': 'Export to Excel',
        'fr-FR': 'Exporter vers Excel'
    },

    importData: {
        'en-US': 'Import data',
        'fr-FR': 'Importer des données'
    },

    addRecord: {
        'en-US': 'Add a new record',
        'fr-FR': 'Ajouter une entrée'
    },

    tableNameInvalid: {
        'en-US': 'Table name is empty or incorrect',
        'fr-FR': 'Le nom de la table est vide ou invalide'
    },

    tableFieldsError: {
        'en-US': 'No table fields added',
        'fr-FR': 'Aucun champ renseigné'
    },

    tableKeysError: {
        'en-US': 'No key found for the table',
        'fr-FR': 'Aucune clé renseignée'
    },

    tableInvalidValues: {
        'en-US': 'Invalid value(s) supplied for the table structure',
        'fr-FR': 'Valeur(s) invalide(s) fournie(s) pour définir la structure de la table'
    },

    nothingToSave: {
        'en-US': 'Nothing to save here!',
        'fr-FR': 'Rien à enregistrer !'
    },

    confirmRecordDelete: {
        'en-US': 'Are you sure you want to delete this record?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer cette entrée ?'
    },

    confirmAllRecordsDelete: {
        'en-US': 'Are you sure you want to delete all records in this table?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer toutes les données de cette table ?'
    },

    confirmDeleteTable: {
        'en-US': 'Are you sure you want to delete this table?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer cette table ?'
    },

    downloadWillStart: {
        'en-US': 'The dowload will start automatically',
        'fr-FR': 'Le téléchargement va démarrer automatiquement'
    },

    recordsProcessed: {
        'en-US': '{nbRecords} row(s) processed.',
        'fr-FR': '{nbRecords} enregistrement(s) traité(s).'
    },

    ok: {
        'en-US': 'OK',
        'fr-FR': 'OK'
    },

    confirmChangeWithoutSaving: {
        'en-US': 'There are unsaved changes. Are you sure you want to change the view and loose the changes?',
        'fr-FR': 'Le contenu a été changé. Êtes-vous sûr(e) de vouloir changer de vue et perdre ces changements ?'
    },

    confirmDeleteItem: {
        'en-US': 'Are you sure you want to delete this item?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer cet élément ?'
    },

    confirmReloadWithoutSaving: {
        'en-US': 'There are unsaved changes. Are you sure you want to reload this item?',
        'fr-FR': 'Le contenu a été changé. Êtes-vous sûr(e) de vouloir recharger cet élément ?'
    },

    confirmReprocess: {
        'en-US': 'Are you sure you want to reprocess this item?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir relancer cet élément ?'
    },

    confirmSaveAndReprocess: {
        'en-US': 'You have made some changes. Are you sure you want to save AND reprocess this item?',
        'fr-FR': 'Le contenu a été changé. Êtes-vous sûr(e) de vouloir sauvegarder ET relancer cet élément ?'
    },

    itemReprocessed: {
        'en-US': 'Item reprocessed',
        'fr-FR': 'Élément relancé'
    },

    itemReprocessFail: {
        'en-US': 'Item not reprocessed',
        'fr-FR': 'Élément non relancé'
    },

    itemReloaded: {
        'en-US': 'Item reloaded',
        'fr-FR': 'Élément rechargé'
    },

    itemReloadFail: {
        'en-US': 'Item not reloaded',
        'fr-FR': 'Élément non rechargé'
    },

    itemSaved: {
        'en-US': 'Item saved',
        'fr-FR': 'Élément enregistré'
    },

    itemSaveFail: {
        'en-US': 'Item not saved',
        'fr-FR': 'Élément non enregistré'
    },

    itemDeleteFail: {
        'en-US': 'Item not deleted',
        'fr-FR': 'Élément non supprimé'
    },

    resetChanges: {
        'en-US': 'Reset changes',
        'fr-FR': 'Annuler les changements'
    },

    errorOccured: {
        'en-US': 'An error occured',
        'fr-FR': 'Une erreur est survenue'
    },

    workItemConfirmTextStart: {
        'en-US': 'Are you sure you want to',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir'
    },

    workItemConfirmTextEnd: {
        'en-US': 'this work item?',
        'fr-FR': 'cette tâche ?'
    },

    workItemsConfirmTextEnd: {
        'en-US': 'those work items?',
        'fr-FR': 'ces tâches ?'
    },

    confirmTextStart: {
        'en-US': 'Are you sure you want to',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir'
    },

    workflowTaskConfirmTextEnd: {
        'en-US': 'this workflow task?',
        'fr-FR': 'cette tâche ?'
    },

    workflowTasksConfirmTextEnd: {
        'en-US': 'those workflow tasks?',
        'fr-FR': 'ces tâches ?'
    },

    frameFormTitleLanguageSsettings: {
        'en-US': 'Language settings',
        'fr-FR': 'Paramètre des langues'
    },

    frameFormTitle_add: {
        'en-US': 'Add frame',
        'fr-FR': 'Ajouter une frame'
    },

    frameFormTitle_edit: {
        'en-US': 'Update frame',
        'fr-FR': 'Mise à jour de la frame'
    },

    frameFormTitleForm: {
        'en-US': 'Frame in',
        'fr-FR': 'Frame en'
    },

    frameFormHelperEmpty: {
        'en-US': 'Field must be provided',
        'fr-FR': 'Ce champ doit être renseigné'
    },

    idUnique: {
        'en-US': 'Your ID must be unique',
        'fr-FR': 'Votre ID doit être unique'
    },

    frameFormHelperLanguageSelected: {
        'en-US': 'You can select the language to edit and remove the one you don\'t want anymore here. You must fill at least the EN language to be able to save your frame',
        'fr-FR': 'Vous pouvez sélectionner la langue à editer et supprimer celles dont vous n\'avez plus besoin ici. Vous devez renseigner au moins la langue EN pour pouvoir sauvegarder une frame'
    },

    frameFormGridLanguage: {
        'en-US': 'Language choice (ISO code)',
        'fr-FR': 'Choix de la langue (code ISO)'
    },

    frameFormGridLanguagesSelected: {
        'en-US': 'Languages selected',
        'fr-FR': 'Langues sélectionnées'
    },

    framemanagerDataLanguage: {
        'en-US': 'EN',
        'fr-FR': 'FR'
    },

    framemanagerTextEmpty: {
        'en-US': 'No frame to display',
        'fr-FR': 'Aucune frame à afficher'
    },

    frames: {
        'en-US': 'Frames',
        'fr-FR': 'Frames'
    },

    url: {
        'en-US': 'URL',
        'fr-FR': 'URL'
    },

    framemanagerButtonEdit: {
        'en-US': 'Edit frame',
        'fr-FR': 'Éditer la frame'
    },

    framemanagerButtonDelete: {
        'en-US': 'Delete frame',
        'fr-FR': 'Supprimer la frame'
    },

    framemanagerButtonPreview: {
        'en-US': 'Preview frame',
        'fr-FR': 'Aperçu de la frame'
    },

    refreshFrames: {
        'en-US': 'Refresh frames',
        'fr-FR': 'Actualiser les frames'
    },

    addFrame: {
        'en-US': 'Add frame',
        'fr-FR': 'Ajouter une frame'
    },

    cancelFrameEdit: {
        'en-US': 'Cancel frame edit',
        'fr-FR': 'Annuler l\'édition de la frame'
    },

    framemanagerButtonBack: {
        'en-US': 'Return to Home pages configuration',
        'fr-FR': 'Retour à la page de configuration des pages d\'accueil'
    },

    dataLanguage: {
        'en-US': 'EN',
        'fr-FR': 'FR'
    },

    framepreviewTitle: {
        'en-US': 'Frame preview',
        'fr-FR': 'Aperçu de la frame'
    },

    framepreviewTitleSettings: {
        'en-US': 'Select your language',
        'fr-FR': 'Sélection de la langue'
    },

    uniqueIdRequired: {
        'en-US': 'ID must be unique',
        'fr-FR': 'L\'ID doit être unique'
    },

    httpsUrlRequired: {
        'en-US': 'Must be a valid HTTPS URL',
        'fr-FR': 'URL HTTPS valide requise'
    },

    noModuleSelected: {
        'en-US': 'No module selected',
        'fr-FR': 'Aucun module sélectionné'
    },

    selected: {
        'en-US': 'Selected',
        'fr-FR': 'Sélectionné'
    },

    editownhomeHeaderLayoutTitle: {
        'en-US': 'Configure layout',
        'fr-FR': 'Configuration de la présentation'
    },

    editownhomeModulesAvailable: {
        'en-US': 'Modules available',
        'fr-FR': 'Modules disponibles'
    },

    editownhomeModulesSelected: {
        'en-US': 'Modules selected',
        'fr-FR': 'Modules sélectionnés'
    },

    editownhomeButtonConfigure: {
        'en-US': 'Configure layout',
        'fr-FR': 'Paramétrage de l\'affichage'
    },

    editownhomeButtonDefault: {
        'en-US': 'Restore default',
        'fr-FR': 'Paramètre par défaut'
    },

    editownhomeButtonSelect: {
        'en-US': 'Select modules',
        'fr-FR': 'Choix des modules'
    },

    editownhomeButtonBack: {
        'en-US': 'Back to Home page',
        'fr-FR': 'Retour à la page d\'accueil'
    },

    editownhomeSelectedEmpty: {
        'en-US': 'You didn\'t select any modules',
        'fr-FR': 'Vous n\'avez sélectionné aucun module'
    },

    editownhomeModulesEmpty: {
        'en-US': 'No modules available in this configuration',
        'fr-FR': 'Aucun module disponible dans cette configuration'
    },

    homePage: {
        'en-US': 'Home page',
        'fr-FR': 'Page d\'accueil'
    },

    homeNavigateDefault: {
        'en-US': 'Configure Home pages',
        'fr-FR': 'Configuration des pages d\'accueil'
    },

    homeNavigateOwn: {
        'en-US': 'Customize this Home page',
        'fr-FR': 'Configurer cette page d\'accueil'
    },

    homeStatusEmpty: {
        'en-US': 'You don\'t have any modules to display',
        'fr-FR': 'Vous n\'avez aucun module à afficher'
    },

    homeSelectNone: {
        'en-US': 'Select your Home page',
        'fr-FR': 'Choisissez votre page d\'accueil'
    },

    homedefaultsettingsHeaderAvailable: {
        'en-US': 'Modules available',
        'fr-FR': 'Modules disponibles'
    },

    homedefaultsettingsHeaderSelected: {
        'en-US': 'Modules selected',
        'fr-FR': 'Modules sélectionnés'
    },

    homedefaultsettingsHeaderConfiguration: {
        'en-US': 'Configured Home pages',
        'fr-FR': 'Pages d\'accueil configurables'
    },

    type: {
        'en-US': 'Type',
        'fr-FR': 'Type'
    },

    homedefaultsettingsEdit: {
        'en-US': 'Edit this Home page',
        'fr-FR': 'Modifier cette page d\'accueil'
    },

    homedefaultsettingsDuplicate: {
        'en-US': 'Duplicate this Home page',
        'fr-FR': 'Dupliquer cette page d\'accueil'
    },

    homedefaultsettingsDelete: {
        'en-US': 'Delete this Home page',
        'fr-FR': 'Supprimer cette page d\'accueil'
    },

    homedefaultsettingsConfigurelayout: {
        'en-US': 'Configure layout',
        'fr-FR': 'Personalisation de l\'affichage'
    },

    homedefaultsettingsSaveselection: {
        'en-US': 'Save your selection',
        'fr-FR': 'Sauvegarder votre sélection'
    },

    homedefaultsettingsAddDefault: {
        'en-US': 'Add Home page',
        'fr-FR': 'Ajouter une page d\'accueil'
    },

    homedefaultsettingsButtonBack: {
        'en-US': 'Back to Home page',
        'fr-FR': 'Retour à la page d\'accueil'
    },

    homedefaultsettingsFramespage: {
        'en-US': 'Frames manager',
        'fr-FR': 'Gestionnaire des Frames'
    },

    homedefaultsettingsTextEmpty: {
        'en-US': 'There is no modules available in your current configuration',
        'fr-FR': 'Il n\'y a aucun modules disponibles pour cette configuration'
    },

    homedefaultsettingsSelectDefaultvalue: {
        'en-US': 'Select home',
        'fr-FR': 'Choisissez la page d\'accueil'
    },

    homedefaultsettingsModalDelete: {
        'en-US': 'Are you sure about deleting this setting ?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer cette configuration ?'
    },

    homedefaultsettingsErrorInUse: {
        'en-US': 'The name `{name}`is already in use by another configuration, choose another one please',
        'fr-FR': 'Le nom `{name}` est déjà utilisé pour une autre configuration, veuillez en choisir un autre'
    },

    appLoaded: {
        'en-US': 'App loaded!',
        'fr-FR': 'App lancée !'
    },

    invalidPassword: {
        'en-US': 'Your password must be 8 to 32 characters long and contains at least 1 upper/lower case letter and 1 number',
        'fr-FR': 'Le mot de passe doit contenir entre 8 et 32 caractères et au moins 1 majuscule/minuscule et 1 chiffre'
    },

    cardTemplateFull: {
        'en-US': 'This area cannot contain more items',
        'fr-FR': 'Cet zone ne peut pas contenir plus d\'éléments'
    },

    invalidColorCode: {
        'en-US': 'Color code is invalid',
        'fr-FR': 'Code couleur invalide'
    },

    mandatoryValues: {
        'en-US': 'Mandatory value(s):',
        'fr-FR': 'Valeur(s) obligatoire(s) :'
    },

    passwordUpdated: {
        'en-US': 'Password updated',
        'fr-FR': 'Mot de passe mis à jour !'
    },

    detailsUpdated: {
        'en-US': 'Details updated!',
        'fr-FR': 'Détails mis à jour !'
    },

    settingsUpdated: {
        'en-US': 'Settings updated!',
        'fr-FR': 'Paramètres mis à jour !'
    },

    avatarUpdated: {
        'en-US': 'Avatar updated!',
        'fr-FR': 'Avatar mis à jour !'
    },

    userAssociated: {
        'en-US': 'User successfully associated!',
        'fr-FR': 'Utilisateur associé avec succès !'
    },

    userAssociateResend: {
        'en-US': 'Email sent',
        'fr-FR': 'Email envoyé !'
    },

    userDisassociated: {
        'en-US': 'User disassociated',
        'fr-FR': 'Utilisateur désassocié'
    },

    messageDeleted: {
        'en-US': 'Message(s) deleted',
        'fr-FR': 'Message(s) supprimés'
    },

    messageReprocessed: {
        'en-US': 'Sent message(s) for reprocessing',
        'fr-FR': 'Message(s) à relancer envoyés'
    },

    userAlreadyExists: {
        'en-US': 'The user you want to associate to this instance already exists on the system (and maybe already associated to other instances).',
        'fr-FR': 'L\'utilisateur que vous voulez associer sur cette instance existe déjà sur le système. Il est peut être également déjà associé à d\'autres instances.'
    },

    unexpectedError: {
        'en-US': 'An unexpected error occured. Please try again.',
        'fr-FR': 'Une erreur est survenue. Merci de réessayer.'
    },

    registrationUnavailable: {
        'en-US': 'Registration is not available.',
        'fr-FR': 'L\’enregistrement n\'est pas disponible.'
    },

    forgotPasswordTitle: {
        'en-US': 'Reset password',
        'fr-FR': 'Réinitialiser mot de passe'
    },

    forgotPasswordMessageSuccess: {
        'en-US': 'We\'ve sent you an email. Click the link in the email to reset your password.',
        'fr-FR': 'Nous vous avons envoyé un email. Cliquez sur le lien dans l\'email pour réinitialiser votre mot de passe.'
    },

    runningJobs: {
        'en-US': 'Running jobs',
        'fr-FR': 'Tâches en cours'
    },

    noRunningJob: {
        'en-US': 'No running job',
        'fr-FR': 'Aucune tâche en cours'
    },

    priority: {
        'en-US': 'Priority',
        'fr-FR': 'Priorité'
    },

    created: {
        'en-US': 'Created',
        'fr-FR': 'Créé le'
    },

    lastStatusModification: {
        'en-US': 'Last status modification',
        'fr-FR': 'Dernière modification du statut'
    },

    stacktrace: {
        'en-US': 'Stacktrace',
        'fr-FR': 'Stacktrace'
    },

    files: {
        'en-US': 'Files',
        'fr-FR': 'Fichiers'
    },

    viewLastMessages: {
        'en-US': 'View last messages',
        'fr-FR': 'Voir les derniers messages'
    },

    viewStacktrace: {
        'en-US': 'View stacktrace',
        'fr-FR': 'Voir la stacktrace'
    },

    priorityHigh: {
        'en-US': 'High',
        'fr-FR': 'Haute'
    },

    priorityMedium: {
        'en-US': 'Medium',
        'fr-FR': 'Moyenne'
    },

    priorityLow: {
        'en-US': 'Low',
        'fr-FR': 'Basse'
    },

    priorityVeryLow: {
        'en-US': 'Very low',
        'fr-FR': 'Très basse'
    },

    jobStatusComplete: {
        'en-US': 'Complete',
        'fr-FR': 'Terminé'
    },

    jobStatusQueued: {
        'en-US': 'Queued',
        'fr-FR': 'En attente'
    },

    jobStatusInError: {
        'en-US': 'In error',
        'fr-FR': 'Erreur'
    },

    jobStatusRunning: {
        'en-US': 'Running',
        'fr-FR': 'En cours'
    },

    markAsRead: {
        'en-US': 'Mark as read',
        'fr-FR': 'Marquer comme lu'
    },

    cancelJobConfirm: {
        'en-US': 'Are you sure you want to cancel this job?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir annuler cette tâche ?'
    },

    passwordEmpty: {
        'en-US': 'Please enter your password',
        'fr-FR': 'Merci de saisir votre mot de passe'
    },

    rememberMe: {
        'en-US': 'Keep me signed in',
        'fr-FR': 'Garder ma connexion'
    },

    forgotPassword: {
        'en-US': 'Forgot password?',
        'fr-FR': 'Mot de passe oublié ?'
    },

    notRegistered: {
        'en-US': 'Not already registered?',
        'fr-FR': 'Pas encore enregistré(e) ?'
    },

    invalidLoginUrl: {
        'en-US': 'Invalid login URL!',
        'fr-FR': 'URL de login invalide !'
    },

    userAlreadyRegistered: {
        'en-US': 'This user is already registered',
        'fr-FR': 'Utilisateur déjà enregistré'
    },

    userAlreadyRegisteredTestProd: {
        'en-US': ' on test or production environment',
        'fr-FR': ' sur un des environnements (test ou production)'
    },

    selectEnvironment: {
        'en-US': 'Select environment',
        'fr-FR': 'Sélectionner environnement'
    },

    test: {
        'en-US': 'Test',
        'fr-FR': 'Test'
    },

    prod: {
        'en-US': 'Production',
        'fr-FR': 'Production'
    },

    testAndProd: {
        'en-US': 'Test & Production',
        'fr-FR': 'Test & Production'
    },

    envError: {
        'en-US': 'Please select the registration environment',
        'fr-FR': 'Merci de sélectionner sur quel environnement vous souhaitez vous enregistrer'
    },


    logoutMessage: {
        'en-US': 'Logging out...',
        'fr-FR': 'Déconnexion...'
    },

    logoutSuccess: {
        'en-US': 'You have been signed out',
        'fr-FR': 'Vous êtes maintenant déconnecté'
    },

    logoutButtonLogin: {
        'en-US': 'Go to sign in page',
        'fr-FR': 'Aller à la page de connexion'
    },

    serverConnexionFail: {
        'en-US': 'Could not connect to the server for instance',
        'fr-FR': 'Problème lors de la connexion serveur pour l\'instance'
    },

    staleLoginSession: {
        'en-US': 'Your login session is expired. Please wait, it will be automatically refreshed in 5 seconds...',
        'fr-FR': 'Votre session de connexion a expiré. Merci de patienter, celle-ci sera automatiquement actualisée dans 5 secondes...'
    },

    wrongUsernamePassword: {
        'en-US': 'Invalid username/password!',
        'fr-FR': 'Email et/ou mot de passe invalide !'
    },

    userDisabled: {
        'en-US': 'This user account is disabled!',
        'fr-FR': 'Ce compte utilisateur est désactivé !'
    },

    membershipEexpired: {
        'en-US': 'Your company Membership expired on <strong>{expiryDate}</strong>. Please ask your company’s Community administrator<strong>{adminContact}</strong> to renew the Membership.',
        'fr-FR': 'Votre abonnement a expiré le <strong>{expiryDate}</strong>. Merci de contacter votre administrateur<strong>{adminContact}</strong> pour renouveler le service.'
    },

    unsubscribeFailed: {
        'en-US': 'Could not unsubscribe this account from this instance/community.',
        'fr-FR': 'Problème lors de la désassociation de ce compte sur cette instance/communauté.'
    },

    unsubscribeFailedB2auth: {
        'en-US': ' Impossible unsubscription: there is no subscription on instance (*).',
        'fr-FR': ' Impossible de se désinscrire: il n\'y a pas d\'inscription possible sur l\'instance (*).'
    },

    unsubscribeFailedInstanceNotFound: {
        'en-US': ' Could not find selected instance definition. Please reload the page and retry.',
        'fr-FR': ' Impossible de trouver les propriétés de l\'instance sélectionnée. Merci de recharger la page et de réessayer.'
    },

    unsubscribeFailedNoBaseUrl: {
        'en-US': ' Invalid baseUrl found for the current instance.',
        'fr-FR': ' URL de l\'instance sélectionnée invalide.'
    },

    userNotAssociated: {
        'en-US': ' User is not associated with this instance.',
        'fr-FR': ' Utilisateur non associé à cette instance.'
    },

    unsubscribeSuccess: {
        'en-US': 'User successfully unsubscribed from community',
        'fr-FR': 'L\'utilisateur a bien été désassocié de cette instance.'
    },

    noPermission: {
        'en-US': 'You don\'t have access to any instance! Please check your account settings with your administrator.',
        'fr-FR': 'Vous n\'avez aucun droit enregistré. Merci de vérifier le paramétrage de votre compte utilisateur avec votre administrateur.'
    },

    newVersionAvailable: {
        'en-US': 'The portal needs to be updated to a new version. Please save your current work, the update will be done automatically in 90 seconds...',
        'fr-FR': 'Le portail doit être mis à jour vers un nouvelle version. Merci de sauvegarder vos travaux en cours, la mise à jour se fera automatiquement dans 90 secondes...'
    },

    updateNow: {
        'en-US': 'Update now!',
        'fr-FR': 'Mettre à jour maintenant !'
    },

    notFoundTitle: {
        'en-US': 'Resource not found',
        'fr-FR': 'Ressource introuvable'
    },

    notFoundMessage: {
        'en-US': 'The requested resource was not found.',
        'fr-FR': 'La ressource demandée est introuvable.'
    },

    settings: {
        'en-US': 'Settings',
        'fr-FR': 'Paramètres'
    },

    others: {
        'en-US': 'Others',
        'fr-FR': 'Autres'
    },

    developmentTools: {
        'en-US': 'Development tools',
        'fr-FR': 'Outils de développement'
    },

    codeEditorConfiguration: {
        'en-US': 'Code editor configuration',
        'fr-FR': 'Configuration des éditeurs de code'
    },

    newPassword: {
        'en-US': 'New password',
        'fr-FR': 'Nouveau mot de passe'
    },

    confirmPassword: {
        'en-US': 'Confirm password',
        'fr-FR': 'Confirmer mot de passe'
    },

    refreshPermissions: {
        'en-US': `<div>Refresh<br />permissions</div>`,
        'fr-FR': `<div>Rafraîchir<br />permissions</div>`
    },

    ctyUnsubscribe: {
        'en-US': `<div>Unsubscribe from<br />this Community</div>`,
        'fr-FR': `<div>Me désinscrire<br />de cette Communauté</div>`
    },

    deleteAccount: {
        'en-US': `<div>Delete<br />my account</div>`,
        'fr-FR': `<div>Supprimer mon<br />compte utilisateur</div>`
    },

    exportPermissions: {
        'en-US': `<div>Export<br />permissions</div>`,
        'fr-FR': `<div>Exporter<br />permissions</div>`
    },

    messagesAutorefresh: {
        'en-US': 'Auto-refresh messages list delay',
        'fr-FR': 'Délai de rafraîchissement de la liste des messages'
    },

    disabled: {
        'en-US': 'disabled',
        'fr-FR': 'désactivé'
    },

    preferredLanguage: {
        'en-US': 'Preferred language',
        'fr-FR': 'Langue préférée'
    },

    userDeleteAccountConfirm: {
        'en-US': 'Are you sure you want to delete you account?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer votre compte utilisateur ?'
    },

    userDeleteAccountConfirmSure: {
        'en-US': `
            <p>
                <h3 class="danger-color bottom-margin text-xxlarge">WARNING</h3>
                <span>Are you <strong>REALLY</strong> sure you want to delete you account? You won't be able to access the portal anymore...</span>
            </p>
        `,
        'fr-FR': `
            <p>
                <h3 class="danger-color bottom-margin text-xxlarge">ATTENTION</h3>
                <span>Êtes-vous <strong>VRAIMENT</strong> sûr(e) de vouloir supprimer votre compte utilisateur ? Vous ne pourrez plus accéder au portail...</span>
            </p>
        `
    },

    userUnsubscribeConfirm: {
        'en-US': 'Are you sure you want to unsubscribe from this community?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer votre compte inscription à cette communauté ?'
    },

    setpasswordTitle: {
        'en-US': 'Set a new password',
        'fr-FR': 'Créer un nouveau mot de passe'
    },

    password: {
        'en-US': 'Password',
        'fr-FR': 'Mot de passe'
    },

    signIn: {
        'en-US': 'Sign in',
        'fr-FR': 'Se connecter'
    },

    setpasswordSuccess: {
        'en-US': 'Your password has been successfully set.',
        'fr-FR': 'Votre mot de passe a bien été enregistré.'
    },

    invalidPasswordConfirm: {
        'en-US': 'Passwords are not identical',
        'fr-FR': 'Les 2 mots de passe ne sont pas identiques'
    },

    confirmMultipleMessagesDelete: {
        'en-US': 'Are you sure you want to delete the selected messages?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer les messages sélectionnés ?'
    },

    confirmMultipleReprocess: {
        'en-US': 'Are you sure you want to reprocess the selected messages?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir relancer les messages sélectionnés ?'
    },

    multipleReprocessSuccess: {
        'en-US': 'Messages reprocessed',
        'fr-FR': 'Messages relancés'
    },

    multipleReprocessFailure: {
        'en-US': 'message(s) not reprocessed',
        'fr-FR': 'message(s) non relancé(s)'
    },

    fetchmsgFailure: {
        'en-US': 'Message cannot be loaded',
        'fr-FR': 'Le message ne peut être chargé'
    },

    messagesDeleted: {
        'en-US': 'Messages deleted',
        'fr-FR': 'Messages supprimés'
    },

    messageSaveDisplaySettings: {
        'en-US': `
            <div>
                <span>Do you want to save your modifications?</span><br/>
                <em class="text-medium">Your preferences (presence, width and order of columns, action related to “Search” and “Reset” buttons...) will be saved in your user profile. Note that you can save specific settings for each display mode (mobile, medium and large screen).</em>
            </div>
        `,
        'fr-FR': `
            <div>
                <span>Voulez-vous sauvegarder vos modifications ?</span><br/>
                <em class="text-medium">Vos préférences d'affichage (présence, largeur et ordre des colonnes, action des boutons “Rechercher” et “Réinitialiser”...) seront enregistrées dans votre profil utilisateur. Vous pouvez sauvegarder des paramètres spécifiques pour chaque mode d'affichage (mobile, moyen et grand écran).</em>
            </div>
        `
    },

    multipleDeleteFailure: {
        'en-US': 'message(s) not deleted',
        'fr-FR': 'message(s) non supprimés'
    },

    fetchdocFailure: {
        'en-US': 'Document cannot be loaded',
        'fr-FR': 'Le document ne peut être chargé'
    },

    confirmCloseMessageSubmit: {
        'en-US': 'Are you sure you want to close this message submission session?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir terminer cette session de création de message ?'
    },

    noViewAccess: {
        'en-US': 'You don\'t have access to any view on this page',
        'fr-FR': 'Vous n\'avez accès à aucune vue sur cette page'
    },

    noResults: {
        'en-US': 'No results found',
        'fr-FR': 'Aucun résultat'
    },

    refresh: {
        'en-US': 'Refresh',
        'fr-FR': 'Rafraîchir'
    },

    reprocess: {
        'en-US': 'Reprocess',
        'fr-FR': 'Relancer'
    },

    multipleMsgReprocessImpossible: {
        'en-US': 'One or more of the selected messages cannot be reprocessed. Please check your selection and retry!',
        'fr-FR': 'Un ou plusieurs des messages sélectionnés ne peuvent pas être relancés. Merci de verifier votre sélection et de réessayer !'
    },

    multipleMsgDeleteImpossible: {
        'en-US': 'One or more of the selected messages cannot be deleted. Please check your selection and retry!',
        'fr-FR': 'Un ou plusieurs des messages sélectionnés ne peuvent pas être supprimés. Merci de verifier votre sélection et de réessayer !'
    },

    confirmNodeDelete: {
        'en-US': 'Are you sure you want to delete this node?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer ce noeud ?'
    },

    rootTreeDisplay: {
        'en-US': 'Root tree displayed:',
        'fr-FR': 'Arbre racine affiché :'
    },

    organisationsConfirmDeleteLastPosition: {
        'en-US': 'This is the only organization position held by this user. If you delete it, you won\'t be able to re-assign this user anywhere in the tree. Are you sure you want to completely remove this user from the organization?',
        'fr-FR': 'Vous êtes sur le point de supprimer la seule position tenue par cet utilisateur dans l\'organisation. Si vous la supprimez, vous ne pourrez plus du tout réassigner cet utilisateur dans l\'arbre. Êtes-vous certain de vouloir supprimer complètement cet utilisateur de l\'organisation ?'
    },

    noAvailableReports: {
        'en-US': 'No reports available.',
        'fr-FR': 'Aucun rapport disponible.'
    },

    selectReport: {
        'en-US': 'Select a report',
        'fr-FR': 'Sélectionner un rapport'
    },

    print: {
        'en-US': 'Print',
        'fr-FR': 'Imprimer'
    },

    serviceConfirmLeaveWithoutSaving: {
        'en-US': 'There are unsaved changes. Are you sure you want to leave this page and lose your updates?',
        'fr-FR': 'Vous avez effectué des modifications sans les enregistrer. Êtes-vous sûr(e) de vouloir quitter cette page et perdre les données non sauvegardées ?'
    },

    serviceVersion: {
        'en-US': 'Service version:',
        'fr-FR': 'Version du service :'
    },

    batchOperationComplete: {
        'en-US': 'Operation complete',
        'fr-FR': 'Opération terminée'
    },

    batchOperationProcessedItems: {
        'en-US': 'Processed items',
        'fr-FR': 'Éléments traités'
    },

    errors: {
        'en-US': 'Errors',
        'fr-FR': 'Erreurs'
    },

    successes: {
        'en-US': 'Successes',
        'fr-FR': 'Réussis'
    },

    batchOperationAllGood: {
        'en-US': 'All items have been processed. Everything went well!',
        'fr-FR': 'Tous les éléments ont été traités !'
    },

    batchOperationErrorsOccured: {
        'en-US': 'Some errors occured during this operation.',
        'fr-FR': 'Des erreurs sont survenues lors des traitements.'
    },

    itemId: {
        'en-US': 'Item ID',
        'fr-FR': 'ID élément'
    },

    statusCode: {
        'en-US': 'Status code',
        'fr-FR': 'Code HTTP'
    },

    errorMessage: {
        'en-US': 'Error message',
        'fr-FR': 'Message d\'erreur'
    },

    itemProcessed: {
        'en-US': 'Item processed!',
        'fr-FR': 'Élément traitée !'
    },

    workItemProcessed: {
        'en-US': 'Work item processed!',
        'fr-FR': 'Tâche traitée !'
    },

    workflowTaskProcessed: {
        'en-US': 'Workflow taksk processed!',
        'fr-FR': 'Tâche traitée !'
    },

    view: {
        'en-US': 'View',
        'fr-FR': 'Afficher'
    },

    nameAlreadyUsed: {
        'en-US': 'This name is already used.',
        'fr-FR': 'Ce nom est déjà utilisé.'
    },

    unknown: {
        'en-US': 'Unknown',
        'fr-FR': 'Inconnu'
    },

    serviceStatusConfigChanged: {
        'en-US': 'Service configuration has changed since last start',
        'fr-FR': 'La configuration du service a changé depuis le dernier démarrage'
    },

    restartServiceForChanges: {
        'en-US': 'Restart the service to take changes into account',
        'fr-FR': 'Redémarrer le service pour prendre en compte les changements'
    },

    serviceStatus: {
        'en-US': 'Service status:',
        'fr-FR': 'État du service :'
    },

    portal: {
        'en-US': 'Portal',
        'fr-FR': 'Portail'
    },

    core: {
        'en-US': 'Core',
        'fr-FR': 'Core'
    },

    deleteInstance: {
        'en-US': 'Delete instance',
        'fr-fr': 'Supprimer l\'instance'
    },

    integrations: {
        'en-US': 'Integrations',
        'fr-FR': 'Intégrations'
    },
    integrationsSettings: {
        'en-US': 'App integration settings',
        'fr-FR': 'Paramètres d\n'
    },
    appSecret: {
        'en-US': 'App secret',
        'fr-FR': 'Scecret de l\'application '
    },
    redirectUriPath: {
        'en-US': 'Redirect URI',
        'fr-FR': 'Redirection URI'
    },
    refreshValidUntilRevoked: {
        'en-US': 'Refresh token(s) valid until revoked',
        'fr-FR': 'Rafraîchir les token(s) valid jusqu\'à la révocation'
    },

    editInstance: {
        'en-US': 'Edit instance',
        'fr-fr': 'Éditer l\'instance'
    },

    duplicateInstance: {
        'en-US': 'Create a new instance with prefilled data from this one',
        'fr-fr': 'Créer une nouvelle instance à partir de celle-ci'
    },

    createOrganization: {
        'en-US': 'Create organization',
        'fr-fr': 'Créer une organisation'
    },

    baseContext: {
        'en-US': 'Base context',
        'fr-fr': 'Contexte de base'
    },

    infoPath: {
        'en-US': 'Info path',
        'fr-fr': 'Chemin vers les informations'
    },

    communityPortalURL: {
        'en-US': 'Community portal URL',
        'fr-fr': 'URL du portail de la communauté'
    },

    organizationRootId: {
        'en-US': 'Organization (Root ID)',
        'fr-fr': 'ID de la racine de l\'organisation'
    },

    itemType: {
        'en-US': 'Item Type',
        'fr-fr': 'Type d\'élément'
    }
}