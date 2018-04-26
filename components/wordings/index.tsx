// Modules
import * as React from 'react'

export interface Wordings {
    [key: string]: {
        [lang: string]: string
    }
}

export const MULTILANGUAGE_WORDINGS: Wordings = {

    /** Common wordings. */

    save: {
        'en-US': 'Save',
        'fr-FR': 'Sauvegarder'
    },

    cancel: {
        'en-US': 'Cancel',
        'fr-FR': 'Annuler'
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

    itemsImported: {
        'en-US': 'Items imported',
        'fr-FR': 'Objets importés'
    },

    confirmItemsDelete: {
        'en-US': 'Are you sure you want to delete these items?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer ces objets ?'
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
        'fr-FR': 'Ajouter - Nouvel objet'
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

    properties: {
        'en-US': 'Properties',
        'fr-FR': 'Propriétés'
    },

    propertiesEmpty: {
        'en-US': 'You don\'t have any property',
        'fr-FR': 'Vous n\'avez aucune propriété'
    },

    keyUnique: {
        'en-US': 'Key must be unique',
        'fr-FR': 'La clé doit être unique'
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

    bundledResourceEmptyList: {
        'en-US': 'Bundled resource not found',
        'fr-FR': 'Aucune ressource groupée'
    },

    maxSize1GB: {
        'en-US': 'Maximum size allowed is 1GB',
        'fr-FR': 'La taille maximale authorisée est de 1GO'
    },

    invalidSizeMax1GB: {
        'en-US': 'File too big, maximum size allowed is 1GB',
        'fr-FR': 'Fichier trop lourd, la taille maximale authorisée est de 1GO'
    },

    bundledResourcesConfirmDelete: {
        'en-US': 'Are you sure you want to delete those bundled resources?',
        'fr-FR': 'Êtes vous sur(e) de vouloir supprimer ces ressources groupées ?'
    },

    bundledResourcesAdded: {
        'en-US': 'Bundled resource added',
        'fr-FR': 'Ressource groupée ajoutée'
    },

    bundledResourcesImported: {
        'en-US': 'Bundled resources imported',
        'fr-FR': 'Ressource groupées importés'
    },

    bundledResourcesUpdated: {
        'en-US': 'Bundled resource updated',
        'fr-FR': 'Ressource groupée mise à jour'
    },

    bundledResourcesRenamed: {
        'en-US': 'Bundled resource renamed',
        'fr-FR': 'Ressource groupée renommée'
    },

    bundledResourcesDuplicated: {
        'en-US': 'Bundled resource duplicated',
        'fr-FR': 'Ressource groupée dupliquée'
    },

    bundledResourcesDeleted: {
        'en-US': 'Bundled resource(s) deleted',
        'fr-FR': 'Ressource groupée(s) supprimée(s)'
    },

    bundledResourcesExported: {
        'en-US': 'Bundled resource(s) exported',
        'fr-FR': 'Ressources groupée(s) exportée(s)'
    },

    nameAlreadyExist: {
        'en-US': 'This name already exists',
        'fr-FR': 'Ce nom existe déjà'
    },

    resourceNotFound: {
        'en-US': 'No resource has been found',
        'fr-FR': 'Aucune ressource n\'a été trouvée'
    },

    resourcesAttached: {
        'en-US': 'Resource attached',
        'fr-FR': 'Ressource attachée'
    },

    bundledResourcesReadonly: {
        'en-US': 'These bundled resources are only readable. They can not be deleted.',
        'fr-FR': 'Ces ressources groupées ne sont éditables. Elles ne peuvent pas supprimés.'
    },

    confirmUpdateForConsistancy: {
        'en-US': 'It seems like your items are not synchronized with the server anymore, you should save your work and update the service.',
        'fr-FR': 'Il semblerait que vos objects ne sont plus synchronisés avec le serveur, vous devriez sauvegarder votre travail et mettre à jour le service.'
    },

    itemNotFound: {
        'en-US': 'Item not found.',
        'fr-US': 'Aucun objet trouvé.'
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
        'fr-FR': 'Ces objets ne sont éditables. Elles ne peuvent pas supprimés.'
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

    /** b2portal wordings. */
    'register.email.error': {
        'en-US': 'Please enter a valid email address',
        'fr-FR': 'Merci de saisir une adresse email valide'
    },

    'register.registrationType.label': {
        'en-US': 'Registration type',
        'fr-FR': 'Type d\'enregistrement'
    },

    'register.registrationType.error': {
        'en-US': 'Please select the type of registration',
        'fr-FR': 'Merci de sélectionner le type d\'enregistrement'
    },

    'register.registrationType.supplier': {
        'en-US': 'Supplier',
        'fr-FR': 'Fournisseur'
    },

    'register.registrationType.capitalProject': {
        'en-US': 'Capital Project',
        'fr-FR': 'Capital Project'
    },

    'register.registrationType.internalUser': {
        'en-US': 'Internal User',
        'fr-FR': 'Internal User'
    },

    'register.registration.intro1': {
        'en-US': 'This Community enables Chevron Suppliers, Chevron Internal Users and Chevron Major Capital Projects to perform electronic transactions with Chevron IT systems in a highly secure but very easy manner.',
        'fr-FR': 'Cette communauté permet aux fournisseurs, "Internal User" et "Capital Project" Chevron de réaliser des échanges électroniques avec les systèmes informatiques de Chevron de façon simple et sécurisée.'
    },

    'register.supplier.intro': {
        'en-US': 'To be part of the Chevron Community, you must have been invited and/or authorized by Chevron.',
        'fr-FR': 'Pour faire partie de la communauté Chevron, vous devez avoir reçu une invitation et/ou une autorisation de la part de Chevron.'
    },

    'register.pidxid.label': {
        'en-US': 'PIDX ID',
        'fr-FR': 'PIDX ID'
    },

    'register.pidxid.help': {
        'en-US': 'The Chevron PIDX ID is found in the invitation email sent by Chevron',
        'fr-FR': 'Le "PIDX ID" Chevron se trouve dans l\'email d\'invitation envoyé par Chevron'
    },

    'register.pidxid.error': {
        'en-US': 'Please enter the Chevron PIDX ID',
        'fr-FR': 'Merci de saisir le "PIDX ID" Chevron'
    },

    'register.vendorid.label': {
        'en-US': 'ERP Vendor ID',
        'fr-FR': 'ERP Vendor ID'
    },

    'register.vendorid.help': {
        'en-US': 'The Chevron ERP Vendor ID is found in the invitation email sent to you by Chevron',
        'fr-FR': 'Le "ERP Vendor ID" Chevron se trouve dans l\'email d\'invitation envoyé par Chevron'
    },

    'register.vendorid.error': {
        'en-US': 'Please enter the Chevron ERP Vendor ID',
        'fr-FR': 'Merci de saisir le "ERP Vendor ID" Chevron'
    },

    'register.agreement.intro': {
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

    'register.agreement.label': {
        'en-US': 'I have read and I accept the Terms and Conditions of this Agreement',
        'fr-FR': 'J\'ai lu et accepte les Conditions Générales de ce contrat'
    },

    'register.agreement.error': {
        'en-US': 'Please accept the Terms and Conditions',
        'fr-FR': 'Merci de valider les Conditions Générales'
    },

    'register.internalUser.intro1': {
        'en-US': 'You are a Chevron Internal User and have been authorized to use the Chevron Community to submit various business documents.',
        'fr-FR': 'Vous êtes un "Internal User" Chevron et avez été autorisé à utiliser la communauté Chevron pour soumettre différentes transactions.'
    },

    'register.internalUser.intro2': {
        'en-US': 'To get your registration accepted, please provide the appropriate PIDX ID and Chevron password.',
        'fr-FR': 'Pour poursuivre votre enregistrement, merci d\'entrer le "PIDX ID" et mot de passe Chevron puis valider.'
    },

    'register.password.label': {
        'en-US': 'Chevron password',
        'fr-FR': 'Mot de passe Chevron'
    },

    'register.password.help': {
        'en-US': 'The Chevron password is found in the invitation email sent by Chevron',
        'fr-FR': 'Le mot de passe Chevron se trouve dans l\'email d\'invitation envoyé par Chevron'
    },

    'register.password.error': {
        'en-US': 'Please enter the Chevron password',
        'fr-FR': 'Merci de saisir le mot de passe Chevron'
    },

    'register.capitalProject.intro': {
        'en-US': 'You are creating this account for a Chevron Major Capital Project.',
        'fr-FR': 'Vous créez ce compte pour un "Chevron Major Capital Project".'
    },

    'register.ps': {
        'en-US': 'Following your registration request, you will receive a registration confirmation email.',
        'fr-FR': 'Suite à votre demande d\'inscription, vous recevrez un email de confirmation.'
    },

    'register.pidxid.vendorid.error': {
        'en-US': 'PIDX ID / ERP Vendor ID are not correct. Please check the values you provided and retry.',
        'fr-FR': '"PIDX ID" / "ERP Vendor ID" incorrects. Merci de vérifier les valeurs saisies avant de réessayer.'
    },

    'register.pidxid.password.error': {
        'en-US': 'PIDX ID / Chevron Password are not correct. Please check the values you provided and retry.',
        'fr-FR': '"PIDX ID" / Mot de passe incorrects. Merci de vérifier les valeurs saisies avant de réessayer.'
    },


    'permissionset.tooltip.delete': {
        'en-US': 'Delete permission set',
        'fr-FR': 'Supprimer ce groupe de permissions'
    },

    'permissionset.tooltip.edit': {
        'en-US': 'Edit permission set',
        'fr-FR': 'Éditer ce groupe de permissions'
    },

    'permissionset.tooltip.clone': {
        'en-US': 'Create a new permission set with prefilled data from this one',
        'fr-FR': 'Créer un nouveau groupe de permissions avec les données de celui-ci'
    },

    'permissionset.data.id': {
        'en-US': 'ID',
        'fr-FR': 'ID'
    },

    'permissionset.tooltip.cross.instances': {
        'en-US': 'This is a global permission set',
        'fr-FR': 'Ce groupe de permissions est global'
    },

    'permissionsetform.button.update': {
        'en-US': 'Update',
        'fr-FR': 'Enregistrer modifications'
    },

    'permissionsetform.data.permissionset.name': {
        'en-US': 'Permission set name',
        'fr-FR': 'Nom de la permission'
    },

    'permissionsetform.data.permissionset.permissions': {
        'en-US': 'Permissions (scope strings)',
        'fr-FR': 'Permissions (scope strings)'
    },

    'permissionsetform.at.least.one.scope': {
        'en-US': 'At least one scope string is required',
        'fr-FR': 'Au moins un scope doit être renseigné'
    },

    'permissionsets.button.create.permissionset': {
        'en-US': 'Create permission set',
        'fr-FR': 'Créer groupe de permissions'
    },

    'permissionsets.delete.confirm': {
        'en-US': 'Are you sure you want to delete this permission set?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer ce groupe de permissions ?'
    },

    'user.tooltip.delete': {
        'en-US': 'Delete user',
        'fr-FR': 'Supprimer cet utilisateur'
    },

    'user.tooltip.edit': {
        'en-US': 'Edit user',
        'fr-FR': 'Éditer cet utilisateur'
    },

    'user.tooltip.disassociate': {
        'en-US': 'Disassociate user',
        'fr-FR': 'Désassocier cet utilisateur'
    },

    'user.data.realm': {
        'en-US': 'Realm',
        'fr-FR': 'Domaine'
    },

    'user.data.email.verified': {
        'en-US': 'Email verified',
        'fr-FR': 'Email confirmé'
    },

    'user.data.policies': {
        'en-US': 'Policies',
        'fr-FR': 'Droits d\'accès'
    },

    'user.data.org.positions': {
        'en-US': 'Organization positions',
        'fr-FR': 'Positions d\'organisation'
    },

    'user.reload.org.paths': {
        'en-US': 'Reload user organization positions',
        'fr-FR': 'Rafraîchir les positions d\'organisation'
    },

    'user.data.permissionset': {
        'en-US': 'Permission set name',
        'fr-FR': 'Groupe de permissions'
    },

    'user.resend.activation.email': {
        'en-US': 'Resend activation email',
        'fr-FR': 'Renvoyer l\'email d\'activation'
    },

    'user.get.org.positions.btn': {
        'en-US': 'Show user organization positions',
        'fr-FR': 'Voir les positions d\'organisation'
    },

    'userform.permissionset.section.title': {
        'en-US': 'Permission sets',
        'fr-FR': 'Groupes de permissions'
    },

    'userform.permissionset.select.message': {
        'en-US': 'Select an instance on the left sidebar to be able to set permissions for this user on this app!',
        'fr-FR': 'Sélectionner une instance dans la barre latérale pour y assigner des permissions à cet utilisateur !'
    },

    'userform.permissionset.section.title.app': {
        'en-US': 'Permission sets for instance',
        'fr-FR': 'Groupes de permissions pour l\'instance'
    },

    'userform.permissionset.required': {
        'en-US': 'At least one permission set must be selected',
        'fr-FR': 'Au moins un groupe de permissions doît être assigné à l\'utilisateur'
    },

    'userform.org.position': {
        'en-US': 'Organization position',
        'fr-FR': 'Position dans l\'organisation'
    },

    'userform.button.associate': {
        'en-US': 'Associate',
        'fr-FR': 'Associer'
    },

    'userform.button.update': {
        'en-US': 'Update',
        'fr-FR': 'Enregistrer modifications'
    },

    'users.email.placeholder': {
        'en-US': 'Email...',
        'fr-FR': 'Email...'
    },

    'users.search.by': {
        'en-US': 'Search by',
        'fr-FR': 'Rechercher par'
    },

    'users.tooltip.add.user': {
        'en-US': 'Type the email address of the new user you want to associate to this instance',
        'fr-FR': 'Entrer l\'adresse email du nouvel utilisateur que vous souhaitez associer à cette instance'
    },

    'users.button.associate.user': {
        'en-US': 'Associate new user',
        'fr-FR': 'Associer nouvel utilisateur'
    },

    'users.delete.confirm': {
        'en-US': 'Are you sure you want to delete this user?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer cet utilisateur ?'
    },

    'users.disassociate.confirm': {
        'en-US': 'Are you sure you want to disassociate this user from the current instance?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir désassocier cet utilisateur de l\'instance ?'
    },

    'users.show.all': {
        'en-US': 'Display users of all instances',
        'fr-FR': 'Afficher les utilisateurs de toutes les instances'
    },

    'users.show.scopeless': {
        'en-US': 'Only display users without any permission',
        'fr-FR': 'Afficher seulement les utilisateurs sans droits d\'accès'
    },

    'users.show.orgless': {
        'en-US': 'Only display users without any associated org node',
        'fr-FR': 'Afficher seulement les utilisateurs sans position d\'organisation'
    },

    'users.button.disassociate': {
        'en-US': 'Disassociate',
        'fr-FR': 'Désassocier'
    },

    'users.permission.set.name': {
        'en-US': 'Permission set name',
        'fr-FR': 'Groupe de permissions'
    },

    'permissionssearchform.permissions': {
        'en-US': 'Permission sets',
        'fr-FR': 'Groupes de permissions'
    },

    'admin.tab.title.users': {
        'en-US': 'Users',
        'fr-FR': 'Utilisateurs'
    },

    'admin.tab.title.permissionssets': {
        'en-US': 'Permission sets',
        'fr-FR': 'Groupes de permissions'
    },

    'admin.user.delete.confirm': {
        'en-US': 'Are you sure you want to delete this user?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer cet utilisateur ?'
    },

    'admin.user.disassociate.confirm': {
        'en-US': 'Are you sure you want to disassociate this user from the current instance?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir désassocier cet utilisateur de l\'instance ?'
    },

    'admin.permissionset.delete.confirm': {
        'en-US': 'Are you sure you want to delete this permission set?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer ce groupe de permissions ?'
    },

    'admin.button.disassociate': {
        'en-US': 'Disassociate',
        'fr-FR': 'Désassocier'
    },

    'admin.no.users.found': {
        'en-US': 'No users found!',
        'fr-FR': 'Aucun utilisateur trouvé !'
    },

    'crossrefrecord.tooltip.delete': {
        'en-US': 'Delete record',
        'fr-FR': 'Supprimer l\'entrée'
    },

    'crossrefrecord.tooltip.edit': {
        'en-US': 'Edit record',
        'fr-FR': 'Modifier l\'entrée'
    },

    'crossrefrecord.tooltip.cancel.edit': {
        'en-US': 'Cancel edit',
        'fr-FR': 'Annuler les modifications'
    },

    'crossrefrecord.tooltip.duplicate': {
        'en-US': 'Duplicate record',
        'fr-FR': 'Dupliquer l\'entrée'
    },

    'crossreftableform.fields': {
        'en-US': 'Fields',
        'fr-FR': 'Champs'
    },

    'crossreftableform.is.key': {
        'en-US': 'Key?',
        'fr-FR': 'Clé ?'
    },

    'crossreftableform.add.field': {
        'en-US': 'Add a field',
        'fr-FR': 'Ajouter un champ'
    },

    'crossreftableform.create.table': {
        'en-US': 'Create a new table',
        'fr-FR': 'Créer cette table'
    },

    'crossreftableform.edit.table': {
        'en-US': 'Update the table',
        'fr-FR': 'Modifier la table'
    },

    'crossreftableform.invalid.xml.tag': {
        'en-US': 'Invalid value. Allowed chars: a-z A-Z 0-9 _ : - .',
        'fr-FR': 'Valeur invalide. Caractères autorisés : a-z A-Z 0-9 _ : - .'
    },

    'draggablemodule.label.width': {
        'en-US': 'Width',
        'fr-FR': 'Largeur'
    },

    'draggablemodule.label.height': {
        'en-US': 'Height',
        'fr-FR': 'Hauteur'
    },

    'draggablemodule.size.small': {
        'en-US': 'Small',
        'fr-FR': 'Petit'
    },

    'draggablemodule.size.medium': {
        'en-US': 'Medium',
        'fr-FR': 'Moyen'
    },

    'draggablemodule.size.large': {
        'en-US': 'Large',
        'fr-FR': 'Grand'
    },

    'draggablemodule.size.full': {
        'en-US': 'Full',
        'fr-FR': 'Plein'
    },

    'tooltip.edit.document': {
        'en-US': 'Edit document',
        'fr-FR': 'Éditer le document'
    },

    'tooltip.view.document': {
        'en-US': 'View document',
        'fr-FR': 'Voir le document'
    },

    'tooltip.reprocess.document': {
        'en-US': 'Reprocess document',
        'fr-FR': 'Relancer le document'
    },

    'tooltip.reload.document': {
        'en-US': 'Reload document',
        'fr-FR': 'Recharger le document'
    },

    'tooltip.print.document': {
        'en-US': 'Print document',
        'fr-FR': 'Imprimer le document'
    },

    'tooltip.view.formjs': {
        'en-US': 'View the form',
        'fr-FR': 'Voir le formulaire'
    },

    'tooltip.edit.formjs': {
        'en-US': 'Edit using the form',
        'fr-FR': 'Editer à l\'aide du formulaire'
    },

    'tooltip.view.source': {
        'en-US': 'View the source',
        'fr-FR': 'Voir la source'
    },

    'tooltip.edit.message': {
        'en-US': 'Edit message',
        'fr-FR': 'Éditer le message'
    },

    'tooltip.view.message': {
        'en-US': 'View message',
        'fr-FR': 'Voir le message'
    },

    'tooltip.reprocess.message': {
        'en-US': 'Reprocess message',
        'fr-FR': 'Relancer le message'
    },

    'tooltip.reload.message': {
        'en-US': 'Reload message',
        'fr-FR': 'Recharger le message'
    },

    'tooltip.delete.message': {
        'en-US': 'Delete message',
        'fr-FR': 'Supprimer le message'
    },

    'tooltip.print.message': {
        'en-US': 'Print message',
        'fr-FR': 'Imprimer le message'
    },

    'tooltip.locked.message': {
        'en-US': 'This message is currently locked',
        'fr-FR': 'Ce message est verrouillé'
    },

    'framepreview.button.back': {
        'en-US': 'Return to list',
        'fr-FR': 'Retour à la liste'
    },

    'appkeyselector.empty.app': {
        'en-US': 'None',
        'fr-FR': 'Aucune'
    },

    'appkeyselector.no.app': {
        'en-US': 'No application selected',
        'fr-FR': 'Aucune application sélectionnée'
    },

    'appkeyselector.select.app': {
        'en-US': 'Select an application',
        'fr-FR': 'Sélectionner une application'
    },

    'profile.dropdown.logout': {
        'en-US': 'Sign out',
        'fr-FR': 'Déconnexion'
    },

    'counter.text.lastSyncDate': {
        'en-US': 'Last synchronization date',
        'fr-FR': 'Date de dernière synchronisation'
    },

    'defaultsettingsform.invalid.name': {
        'en-US': 'Invalid value. Authorized characters : a-z A-Z 0-9 _ : - .',
        'fr-FR': 'Valeur invalide. Caractères autorisés : a-z A-Z 0-9 _ : - .'
    },

    'defaultsettingsform.notification.create.error.in.use': {
        'en-US': 'The name `{name}`is already in use by another configuration, choose another one please',
        'fr-FR': 'Le nom `{name}` est déjà utilisé pour une autre configuration, veuillez en choisir un autre'
    },

    'appinstanceinput.message.change.disabled': {
        'en-US': 'Instance change isn\'t possible when you are editing users or permission sets',
        'fr-FR': 'Changer d\'instance est impossible pendant l\'édition d\'utilisateurs ou de groupes de permissions.'
    },

    'appinstanceinput.button.quit.edit': {
        'en-US': 'Quit edit',
        'fr-FR': 'Annuler édition'
    },

    'appinstanceinput.button.reload': {
        'en-US': 'Reload instances list',
        'fr-FR': 'Rafraîchir la liste des instances'
    },

    'appinstanceinput.tooltip.fetch.warning': {
        'en-US': 'App endpoints not loaded',
        'fr-FR': 'Les \'endpoints\' ne sont pas chargés'
    },

    'menu.title': {
        'en-US': 'Menu',
        'fr-FR': 'Menu'
    },

    'menu.entry.home': {
        'en-US': 'Home',
        'fr-FR': 'Accueil'
    },

    'menu.entry.reports': {
        'en-US': 'Reports',
        'fr-FR': 'Rapports'
    },

    'menu.entry.workflow': {
        'en-US': 'Work Items',
        'fr-FR': 'Tâches'
    },

    'menu.entry.crossref': {
        'en-US': 'Tables',
        'fr-FR': 'Tables'
    },

    'menu.title.documents': {
        'en-US': 'Documents',
        'fr-FR': 'Documents'
    },

    'menu.entry.oauth.settings': {
        'en-US': 'OAuth Settings',
        'fr-FR': 'Paramètres OAuth'
    },

    'menu.entry.organisations': {
        'en-US': 'Organizations',
        'fr-FR': 'Organisations'
    },

    'menu.entry.local.test': {
        'en-US': 'Local test',
        'fr-FR': 'Test local'
    },

    'menu.loading.error': {
        'en-US': 'Error loading menu...',
        'fr-FR': 'Erreur de chargement du menu...'
    },

    'menu.retry': {
        'en-US': 'Retry?',
        'fr-FR': 'Réessayer ?'
    },

    'menuitem.no.entry': {
        'en-US': 'No entry found',
        'fr-FR': 'Aucun menu accessible'
    },

    'filewrapper.created.message': {
        'en-US': 'Created message(s) ID(s):',
        'fr-FR': 'ID(s) du/des message(s) créé(s) :'
    },

    'tooltip.flag.message': {
        'en-US': 'Flag message',
        'fr-FR': 'Marquer le message'
    },

    'tooltip.workflow.view.details': {
        'en-US': 'View details',
        'fr-FR': 'Voir les détails'
    },

    'flags.title': {
        'en-US': 'Flags',
        'fr-FR': 'Marqueurs'
    },

    'messagetemplatebuilder.available.fields': {
        'en-US': 'Available fields',
        'fr-FR': 'Champs disponibles'
    },

    'messagetemplatebuilder.always.visible': {
        'en-US': 'Always visible',
        'fr-FR': 'Toujours visible'
    },

    'messagetemplatebuilder.open.visible': {
        'en-US': 'Visible if opened',
        'fr-FR': 'Visible si ouvert'
    },

    'messagetemplatebuilder.background.color': {
        'en-US': 'Background color',
        'fr-FR': 'Couleur du fond'
    },

    'messagetemplatebuilder.font.color': {
        'en-US': 'Default font color',
        'fr-FR': 'Couleur de base du texte'
    },

    'messagefiledroppanel.title.new.message': {
        'en-US': 'Create message',
        'fr-FR': 'Créer un message'
    },

    'messagefiledroppanel.title.file.upload': {
        'en-US': 'Upload files',
        'fr-FR': 'Envoyer des fichiers'
    },

    'messagefiledroppanel.button.end': {
        'en-US': 'Close',
        'fr-FR': 'Terminer'
    },

    'messagefiledroppanel.button.new.message': {
        'en-US': 'Create message',
        'fr-FR': 'Créer un message'
    },

    'messagefiledroppanel.button.file.upload': {
        'en-US': 'Upload files',
        'fr-FR': 'Envoyer des fichiers'
    },

    'messagefiledroppanel.button.close': {
        'en-US': 'Close',
        'fr-FR': 'Fermer'
    },

    'messagefiledroppanel.button.submit': {
        'en-US': 'Process',
        'fr-FR': 'Valider'
    },

    'messagefiledroppanel.drop.zone.title': {
        'en-US': 'Drop files here to upload them',
        'fr-FR': 'Déposer les fichiers à envoyer ici'
    },

    'messagefiledroppanel.drop.zone.subtitle': {
        'en-US': '(or click)',
        'fr-FR': '(ou cliquer)'
    },

    'messagefiledroppanel.file.totals.dropped': {
        'en-US': 'file(s) dropped',
        'fr-FR': 'fichier(s) déposé(s)'
    },

    'messagefiledroppanel.file.totals.uploaded': {
        'en-US': 'file(s) uploaded',
        'fr-FR': 'fichier(s) envoyé(s)'
    },

    'messagefiledroppanel.button.show.processed': {
        'en-US': 'Display successfully processed files',
        'fr-FR': 'Afficher les fichiers traités avec succès'
    },

    'messagefiledroppanel.button.hide.processed': {
        'en-US': 'Hide successfully processed files',
        'fr-FR': 'Masquer les fichiers traités avec succès'
    },

    'messagefiledroppanel.success.submit': {
        'en-US': 'Files successfully processed!',
        'fr-FR': 'Fichiers traités avec succès !'
    },

    'messageheaderitem.font.color': {
        'en-US': 'Font color',
        'fr-FR': 'Couleur texte'
    },

    'messageinlinetemplatebuilder.hidden.columns': {
        'en-US': 'Hidden columns',
        'fr-FR': 'Colonnes cachées'
    },

    'messageinlinetemplatebuilder.hidden.columns.tip': {
        'en-US': '(click to re-display)',
        'fr-FR': '(cliquer pour ré-afficher)'
    },

    'messageinlinetemplatebuilder.background.color': {
        'en-US': 'Background color',
        'fr-FR': 'Couleur du fond'
    },

    'messageinlinetemplatebuilder.font.color': {
        'en-US': 'Default font color',
        'fr-FR': 'Couleur de base du texte'
    },

    'messageinlinetemplatebuilder.all.visible': {
        'en-US': 'All columns are currently displayed. Hiddens columns can be found here and re-displayed.',
        'fr-FR': 'Toutes les colonnes sont actuellement visibles. Les colonnes cachées apparaitront ici et pourront être ré-affichées.'
    },

    'messagesearchfilter.date.from': {
        'en-US': 'From',
        'fr-FR': 'Début'
    },

    'messagesearchfilter.date.to': {
        'en-US': 'To',
        'fr-FR': 'Fin'
    },

    'messagesearchform.document.type': {
        'en-US': 'View',
        'fr-FR': 'Vue'
    },

    'messagesearchform.collapse.option': {
        'en-US': 'Collapse after search',
        'fr-FR': 'Réduire après recherche'
    },

    'messagesearchform.reset.search': {
        'en-US': 'Launch search after reset',
        'fr-FR': 'Lancer la recherche après réinitialisation'
    },

    'messagesubmitinterface.button.new.message': {
        'en-US': 'Create message',
        'fr-FR': 'Créer un message'
    },

    'messagesubmitinterface.button.file.upload': {
        'en-US': 'Upload files',
        'fr-FR': 'Envoyer des fichiers'
    },

    'messagetemplateitem.display.label': {
        'en-US': 'Display label',
        'fr-FR': 'Afficher label'
    },

    'messagetemplateitem.font.color': {
        'en-US': 'Font color',
        'fr-FR': 'Couleur texte'
    },

    'messagevalue.button.view': {
        'en-US': 'View',
        'fr-FR': 'Voir'
    },

    'messagevalue.workflow.in.progress': {
        'en-US': 'In a workflow',
        'fr-FR': 'Flux en cours'
    },

    'userassignform.assign.user': {
        'en-US': 'Assign user',
        'fr-FR': 'Assigner utilisateur'
    },

    'userassignform.assigned.users': {
        'en-US': 'Assigned user(s)',
        'fr-FR': 'Utilisateur(s) assigné(s)'
    },

    'userassignform.no.assigned.users': {
        'en-US': 'None',
        'fr-FR': 'Aucun'
    },

    'userassignform.assign.user.btn': {
        'en-US': 'Add this user to this position',
        'fr-FR': 'Ajouter cet utilisateur à cette position'
    },

    'userassignform.remove.user.position': {
        'en-US': 'Remove this user from this position',
        'fr-FR': 'Supprimer cet utilisateur de cette position'
    },

    'panelmanager.text.title': {
        'en-US': 'Frames manager',
        'fr-FR': 'Gestionnaire de frames'
    },

    'panelmanager.title.builder': {
        'en-US': 'Layout builder',
        'fr-FR': 'Personnaliser l\'affichage'
    },

    'templatebuilder.text.title': {
        'en-US': 'Layout builder',
        'fr-FR': 'Personnalisation de l\'affichage'
    },

    'templatebuilder.text.empty': {
        'en-US': 'All column are currently displayed. Hidden columns can be found here and re-displayed',
        'fr-FR': 'Toutes les colonnes sont affichées. Les colonnes cachés apparaitront ici et pourront être ré-affichées'
    },

    'templatebuilder.text.hidden.column': {
        'en-US': 'Hidden columns',
        'fr-FR': 'Colonnes cachées'
    },

    'templatebuilder.text.hidden.redisplay': {
        'en-US': '(click to re-display)',
        'fr-FR': '(cliquez pour ré-afficher)'
    },

    'aceconfigform.theme': {
        'en-US': 'Theme',
        'fr-FR': 'Thème'
    },

    'aceconfigform.font.size': {
        'en-US': 'Font size',
        'fr-FR': 'Taille caractères'
    },

    'aceconfigform.show.invisibles': {
        'en-US': 'Show invisibles',
        'fr-FR': 'Afficher les caractères invisibles'
    },

    'aceconfigform.show.gutter': {
        'en-US': 'Show gutter',
        'fr-FR': 'Afficher la marge'
    },

    'aceconfigform.show.indent': {
        'en-US': 'Show indent guides',
        'fr-FR': 'Afficher les guides d\'indentation'
    },

    'aceconfigform.wrap': {
        'en-US': 'Wrap',
        'fr-FR': 'Débordement'
    },

    'aceconfigform.preview': {
        'en-US': 'Preview',
        'fr-FR': 'Prévisualisation'
    },

    'aceconfigform.update': {
        'en-US': 'Save changes',
        'fr-FR': 'Enregistrer modifications'
    },

    'showHiddenColumns': {
        'en-US': 'Show hidden columns',
        'fr-FR': 'Afficher les colonnes cachées'
    },

    'resetDisplaySettings': {
        'en-US': 'Reset all display settings',
        'fr-FR': 'Réinitialiser les préférences d\'affichage'
    },

    'displayHiddenColumns': {
        'en-US': 'Hidden columns (click to re-display)',
        'fr-FR': 'Colonnes cachées (cliquer pour ré-afficher)'
    },

    'datagrid.all.visible': {
        'en-US': 'All columns are currently displayed. Hiddens columns can be found here and re-displayed.',
        'fr-FR': 'Toutes les colonnes sont actuellement visibles. Les colonnes cachées apparaitront ici et pourront être ré-affichées.'
    },

    'displaySettingsChanged': {
        'en-US': 'Display settings changed!',
        'fr-FR': 'Préférences d\'affichage modifiées !'
    },

    'datagridSaveDisplaySettings': {
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

    'displaySettingsResetConfirm': {
        'en-US': 'Are you sure you want to reset all your display settings?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir réinitialiser vos préférences d\'affichage ?'
    },

    'fontColor': {
        'en-US': 'Font color',
        'fr-FR': 'Couleur texte'
    },

    'displaymodebtn.panel.display.mode': {
        'en-US': 'Display mode:',
        'fr-FR': 'Affichage :'
    },

    'displaymodebtn.panel.display.laptop': {
        'en-US': 'Medium screen size',
        'fr-FR': 'Écran de taille moyenne'
    },

    'displaymodebtn.panel.display.desktop': {
        'en-US': 'Large screen size',
        'fr-FR': 'Écran de grande taille'
    },

    'errorcontainer.message': {
        'en-US': 'An unexpected error has occured. Please retry and check for the URL you requested or contact your system administrator.',
        'fr-FR': 'Une erreur est survenue. Merci de réessayer en vérifiant l\'URL ou contactez votre administrateur système.'
    },

    'errorcontainer.error.details': {
        'en-US': 'See error details',
        'fr-FR': 'Voir les détails de l\'erreur'
    },

    'errorcontainer.retry': {
        'en-US': 'Retry',
        'fr-FR': 'Réessayer'
    },

    'second': {
        'en-US': 'Second',
        'fr-FR': 'Seconde'
    },

    'minute': {
        'en-US': 'Minute',
        'fr-FR': 'Minute'
    },

    'hour': {
        'en-US': 'Hour',
        'fr-FR': 'Heure'
    },

    'dayOfMonth': {
        'en-US': 'Day of month',
        'fr-FR': 'Jour du mois'
    },

    'month': {
        'en-US': 'Month',
        'fr-FR': 'Mois'
    },

    'dayOfWeek': {
        'en-US': 'Day of week',
        'fr-FR': 'Jour de la semaine'
    },

    'year': {
        'en-US': 'Year',
        'fr-FR': 'Année'
    },

    'inputInvalid': {
        'en-US': 'Invalid input',
        'fr-FR': 'Champ invalide'
    },

    'importDataFromFile': {
        'en-US': 'Import data from a file',
        'fr-FR': 'Importer des données depuis un fichier'
    },

    'selectedFile': {
        'en-US': 'Selected file',
        'fr-FR': 'Fichier sélectionné'
    },

    'fileType': {
        'en-US': 'File type',
        'fr-FR': 'Type du fichier'
    },

    'fieldsSeparator': {
        'en-US': 'Fields separator',
        'fr-FR': 'Séparateur de colonnes'
    },

    'encoding': {
        'en-US': 'Encoding',
        'fr-FR': 'Encodage'
    },

    'quoteChar': {
        'en-US': 'Quote character',
        'fr-FR': 'Caractère de guillemet'
    },

    'headerOnFirstRow': {
        'en-US': 'Headers on first row',
        'fr-FR': 'Entêtes sur la première ligne'
    },

    'overwriteExistingData': {
        'en-US': 'Overwrite existing data',
        'fr-FR': 'Écraser les données existantes'
    },

    'dropZoneTitle': {
        'en-US': 'Drop files here to upload them',
        'fr-FR': 'Déposer les fichiers à envoyer ici'
    },

    'dropZoneSubtitle': {
        'en-US': '(or click)',
        'fr-FR': '(ou cliquer)'
    },

    'invalidFile': {
        'en-US': 'Invalid file(s)',
        'fr-FR': 'Fichier(s) invalide(s)'
    },

    'contentType': {
        'en-US': 'Accepted Content-types:',
        'fr-FR': 'Content-types acceptés :'
    },

    'maxSize': {
        'en-US': 'Max size:',
        'fr-FR': 'Taille max :'
    },

    'unknownFormat': {
        'en-US': 'unknown format',
        'fr-FR': 'unknown size'
    },

    'addTextProperty': {
        'en-US': 'Add a text property',
        'fr-FR': 'Ajouter une valeur de type texte'
    },

    'addFileProperty': {
        'en-US': 'Add a file property',
        'fr-FR': 'Ajouter un fichier'
    },

    'selectFile': {
        'en-US': 'Select a file:',
        'fr-FR': 'Ajouter un fichier :'
    },

    'download': {
        'en-US': 'Download',
        'fr-FR': 'Télécharger'
    },

    'uploadFile': {
        'en-US': 'Upload a file',
        'fr-FR': 'Envoyer un fichier'
    },

    'selectedLanguage': {
        'en-US': 'Selected language',
        'fr-FR': 'Langue sélectionnée'
    },

    'addLanguage': {
        'en-US': 'Add a language',
        'fr-FR': 'Ajouter une langue'
    },

    'removeLanguageSelected': {
        'en-US': 'Remove selected language',
        'fr-FR': 'Supprimer la langue sélectionnée'
    },

    'closeLanguageSelector': {
        'en-US': 'Close language selector',
        'fr-FR': 'Fermer la sélection de langue'
    },

    'searchLanguage': {
        'en-US': 'Search language...',
        'fr-FR': 'Rechercher une langue'
    },

    'page': {
        'en-US': 'Page',
        'fr-FR': 'Page'
    },

    'of': {
        'en-US': 'of',
        'fr-FR': 'sur'
    },

    'pdfLoadingError': {
        'en-US': 'PDF loading error',
        'fr-FR': 'Erreur de chargement du PDF'
    },

    'noFileChosen': {
        'en-US': 'No file chosen',
        'fr-FR': 'Aucun fichier choisi'
    },

    'fileUploaded': {
        'en-US': 'File uploaded',
        'fr-FR': 'Fichier téléchargé'
    },

    'previewLowerCase': {
        'en-US': 'preview',
        'fr-FR': 'aperçu'
    },

    'fileUploadFailed': {
        'en-US': 'File upload failed',
        'fr-FR': 'Échec du téléchargement du fichier'
    },

    'servicebuttonsbar.restart': {
        'en-US': 'Restart',
        'fr-FR': 'Redémarrer'
    },

    'servicebuttonsbar.show.status': {
        'en-US': 'Show status controls',
        'fr-FR': 'Afficher les contrôles de statut'
    },

    'servicebuttonsbar.hide.status': {
        'en-US': 'Hide status controls',
        'fr-FR': 'Cacher les contrôles de statut'
    },

    'servicebuttonsbar.status': {
        'en-US': 'Status',
        'fr-FR': 'Statut'
    },

    'servicebuttonsbar.status.refresh': {
        'en-US': 'Refresh status',
        'fr-FR': 'Rafraîchir statut'
    },

    'servicebuttonsbar.status.running': {
        'en-US': 'Running',
        'fr-FR': 'Actif'
    },

    'servicebuttonsbar.status.stopped': {
        'en-US': 'Stopped',
        'fr-FR': 'Arrêté'
    },

    'sortbycontrol.sort.by': {
        'en-US': 'Sort by',
        'fr-FR': 'Trier par'
    },

    'createChild': {
        'en-US': 'Create child',
        'fr-FR': 'Créer enfant'
    },

    'validate': {
        'en-US': 'Validate',
        'fr-FR': 'Valider'
    },

    'treeUpdate': {
        'en-US': 'Update',
        'fr-FR': 'Valider'
    },

    'id': {
        'en-US': 'ID',
        'fr-FR': 'ID'
    },

    'propertiesKey': {
        'en-US': 'Properties key(s)',
        'fr-FR': 'Clé(s) de propriétés'
    },

    'invalidUniqueNodeName': {
        'en-US': 'Node name must be unique among direct children',
        'fr-FR': 'Le nom du noeud doit être unique parmi les enfants directs'
    },

    'additionalProperties': {
        'en-US': 'Additional properties',
        'fr-FR': 'Propriétés additionnelles'
    },

    'selectedNodeDetails': {
        'en-US': 'Selected node details',
        'fr-FR': 'Détails du noeud sélectionné'
    },

    'expand': {
        'en-US': 'Expand',
        'fr-FR': 'Déplier'
    },

    'collapse': {
        'en-US': 'Collapse',
        'fr-FR': 'Plier'
    },

    'register.user.details.title': {
        'en-US': 'User details',
        'fr-FR': 'Informations'
    },

    'register.salutation.error': {
        'en-US': 'Please select your salutation',
        'fr-FR': 'Merci de choisir votre salutation'
    },

    'register.firstName.error': {
        'en-US': 'Please enter your first name',
        'fr-FR': 'Merci de saisir votre prénom'
    },

    'register.lastName.error': {
        'en-US': 'Please enter your last name',
        'fr-FR': 'Merci de saisir votre nom'
    },

    'register.title.error': {
        'en-US': 'Please enter your title',
        'fr-FR': 'Merci de saisir votre titre'
    },

    'register.company.label': {
        'en-US': 'Company',
        'fr-FR': 'Société'
    },

    'register.companyName.error': {
        'en-US': 'Please enter your company name',
        'fr-FR': 'Merci de saisir le nom de votre société'
    },

    'register.phone.error': {
        'en-US': 'Please enter your phone number',
        'fr-FR': 'Merci de saisir votre numéro de téléphone'
    },

    'register.mobile.error': {
        'en-US': 'Please enter your mobile phone number',
        'fr-FR': 'Merci de saisir votre numéro de mobile'
    },

    'register.webSite.error': {
        'en-US': 'Please enter your company\'s website address',
        'fr-FR': 'Merci de saisir l\'adresse du site web de votre société'
    },

    'register.street.error': {
        'en-US': 'Please enter the name and the number of the street',
        'fr-FR': 'Merci de saisir le nom de la rue ainsi que le numéro'
    },

    'register.city.error': {
        'en-US': 'Please enter the name of the city',
        'fr-FR': 'Merci de saisir le nom de la ville'
    },

    'register.state.error': {
        'en-US': 'Please enter the name of the state',
        'fr-FR': 'Merci de saisir le nom de l\'état'
    },

    'register.country.error': {
        'en-US': 'Please enter the name of the country',
        'fr-FR': 'Merci de saisir le nom du pays'
    },

    'register.zip.error': {
        'en-US': 'Please enter the zip code',
        'fr-FR': 'Merci de saisir le code postal'
    },

    'viewbycontrol.view.by': {
        'en-US': 'View by',
        'fr-FR': 'Afficher par'
    },

    'formdialog.select.user': {
        'en-US': 'Select a user',
        'fr-FR': 'Sélectionner un utilisateur'
    },

    'formdialog.user.email': {
        'en-US': 'User email',
        'fr-FR': 'Email de l\'utilsateur'
    },

    'selectValue': {
        'en-US': 'Select a value',
        'fr-FR': 'Sélectionner une valeur'
    },

    'addFiles': {
        'en-US': 'Add files',
        'fr-FR': 'Ajouter des fichiers'
    },

    'workitem.loading.error': {
        'en-US': 'Error loading work item',
        'fr-FR': 'Erreur de chargement de la tâche'
    },

    'confirm.multiple.users.disassociate': {
        'en-US': 'Are you sure you want to disassociate the selected user(s) from the current instance?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir désassocier l\'(les) utilisateur(s) sélectionné(s) de l\'instance ?'
    },

    'confirm.multiple.users.delete': {
        'en-US': 'Are you sure you want to delete the selected user(s)?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer l\'(les) utilisateur(s) sélectionné(s) ?'
    },

    'confirm.multiple.permsets.delete': {
        'en-US': 'Are you sure you want to delete the selected permission set(s)?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer le(s) groupe(s) de permissions sélectionné(s) ?'
    },

    'notification.multiple.permsets.delete.success': {
        'en-US': 'Permission set(s) deleted!',
        'fr-FR': 'Groupe(s) de permissions supprimés !'
    },

    'notification.multiple.permsets.delete.failure': {
        'en-US': 'permission set(s) not deleted',
        'fr-FR': 'groupe(s) de permissions non supprimé(s)'
    },

    'notification.multiple.users.delete.success': {
        'en-US': 'User(s) deleted!',
        'fr-FR': 'Utilisateur(s) supprimé(s) !'
    },

    'notification.multiple.users.delete.failure': {
        'en-US': 'user(s) not deleted',
        'fr-FR': 'utilisateur(s) non supprimé(s)'
    },

    'notification.multiple.users.disassociate.success': {
        'en-US': 'User(s) disassociated!',
        'fr-FR': 'Utilisateur(s) désassocié(s) !'
    },

    'notification.multiple.users.disassociate.failure': {
        'en-US': 'user(s) not disassociated',
        'fr-FR': 'utilisateur(s) non désassocié(s)'
    },

    'crossref.title.tables': {
        'en-US': 'Tables',
        'fr-FR': 'Tables'
    },

    'crossref.title.records': {
        'en-US': 'Records',
        'fr-FR': 'Entrées'
    },

    'crossref.no.available.tables': {
        'en-US': 'No tables available.',
        'fr-FR': 'Aucune table disponible.'
    },

    'crossref.select': {
        'en-US': 'Select a table',
        'fr-FR': 'Sélectionner une table'
    },

    'crossref.no.items': {
        'en-US': 'No records found!',
        'fr-FR': 'Aucune donnée trouvée !'
    },

    'crossref.button.delete.all.records': {
        'en-US': 'Delete all records',
        'fr-FR': 'Supprimer tout le contenu'
    },

    'crossref.button.save.changes': {
        'en-US': 'Save changes',
        'fr-FR': 'Enregistrer les modifications'
    },

    'crossref.button.add.table': {
        'en-US': 'Create a new table',
        'fr-FR': 'Créer une nouvelle table'
    },

    'crossref.button.export.records': {
        'en-US': 'Export to Excel',
        'fr-FR': 'Exporter vers Excel'
    },

    'crossref.button.import.data': {
        'en-US': 'Import data',
        'fr-FR': 'Importer des données'
    },

    'crossref.button.clone.table': {
        'en-US': 'Duplicate this table',
        'fr-FR': 'Dupliquer cette table'
    },

    'crossref.button.edit.table': {
        'en-US': 'Edit this table',
        'fr-FR': 'Modifier cette table'
    },

    'crossref.button.delete.table': {
        'en-US': 'Delete this table',
        'fr-FR': 'Supprimer cette table'
    },

    'crossref.button.add.record': {
        'en-US': 'Add a new record',
        'fr-FR': 'Ajouter une entrée'
    },

    'crossref.table.name.invalid': {
        'en-US': 'Table name is empty or incorrect',
        'fr-FR': 'Le nom de la table est vide ou invalide'
    },

    'crossref.table.fields.error': {
        'en-US': 'No table fields added',
        'fr-FR': 'Aucun champ renseigné'
    },

    'crossref.table.keys.error': {
        'en-US': 'No key found for the table',
        'fr-FR': 'Aucune clé renseignée'
    },

    'crossref.table.invalid.values': {
        'en-US': 'Invalid value(s) supplied for the table structure',
        'fr-FR': 'Valeur(s) invalide(s) fournie(s) pour définir la structure de la table'
    },

    'crossref.notification.nothing.to.save': {
        'en-US': 'Nothing to save here!',
        'fr-FR': 'Rien à enregistrer !'
    },

    'crossrefactions.confirm.delete': {
        'en-US': 'Are you sure you want to delete this record?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer cette entrée ?'
    },

    'crossrefactions.confirm.delete.all': {
        'en-US': 'Are you sure you want to delete all records in this table?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer toutes les données de cette table ?'
    },

    'crossrefactions.confirm.delete.table': {
        'en-US': 'Are you sure you want to delete this table?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer cette table ?'
    },

    'crossrefactions.notification.download.message': {
        'en-US': 'The dowload will start automatically',
        'fr-FR': 'Le téléchargement va démarrer automatiquement'
    },

    'crossrefactions.notification.records.created': {
        'en-US': '{nbRecords} row(s) processed.',
        'fr-FR': '{nbRecords} enregistrement(s) traité(s).'
    },

    'ok': {
        'en-US': 'OK',
        'fr-FR': 'OK'
    },

    'documentation': {
        'en-US': 'Components documentation',
        'fr-FR': 'Components documentation'
    },

    'confirm.change.mode.stale': {
        'en-US': 'There are unsaved changes. Are you sure you want to change the view and loose the changes?',
        'fr-FR': 'Le contenu a été changé. Êtes-vous sûr(e) de vouloir changer de vue et perdre ces changements ?'
    },

    'confirm.delete': {
        'en-US': 'Are you sure you want to delete this item?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer cet élément ?'
    },

    'confirm.reload.stale': {
        'en-US': 'There are unsaved changes.Are you sure you want to reload this item?',
        'fr-FR': 'Le contenu a été changé. Êtes-vous sûr(e) de vouloir recharger cet élément ?'
    },

    'confirm.reprocess': {
        'en-US': 'Are you sure you want to reprocess this item?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir relancer cet élément ?'
    },

    'confirm.reprocess.stale': {
        'en-US': 'There are unsaved changes. Are you sure you want to save AND reprocess this item?',
        'fr-FR': 'Le contenu a été changé. Êtes-vous sûr(e) de vouloir sauvegarder ET relancer cet élément ?'
    },

    'notification.reprocess.success': {
        'en-US': 'Item reprocessed',
        'fr-FR': 'Élément relancé'
    },

    'notification.reprocess.failure': {
        'en-US': 'Item not reprocessed',
        'fr-FR': 'Élément non relancé'
    },

    'notification.fetch.success': {
        'en-US': 'Item reloaded',
        'fr-FR': 'Élément rechargé'
    },

    'notification.fetch.failure': {
        'en-US': 'Item not reloaded',
        'fr-FR': 'Élément non rechargé'
    },

    'notification.save.success': {
        'en-US': 'Item saved',
        'fr-FR': 'Élément enregistré'
    },

    'notification.save.failure': {
        'en-US': 'Item not saved',
        'fr-FR': 'Élément non enregistré'
    },

    'notification.delete.success': {
        'en-US': 'Item deleted',
        'fr-FR': 'Élément supprimé'
    },

    'notification.delete.failure': {
        'en-US': 'Item not deleted',
        'fr-FR': 'Élément non supprimé'
    },

    'button.reset': {
        'en-US': 'Reset changes',
        'fr-FR': 'Annuler les changements'
    },

    'error.title': {
        'en-US': 'An error occured',
        'fr-FR': 'Une erreur est survenue'
    },

    'error.not.available': {
        'en-US': 'The message cannot be loaded',
        'fr-FR': 'Le message ne peut être chargé'
    },

    'workflow.title': {
        'en-US': 'Work items',
        'fr-FR': 'Tâches'
    },

    'workflow.modal.confirm.text': {
        'en-US': 'Are you sure you want to',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir'
    },

    'workflow.modal.this.item': {
        'en-US': 'this work item?',
        'fr-FR': 'cette tâche ?'
    },

    'workflow.retry': {
        'en-US': 'Retry?',
        'fr-FR': 'Réessayer ?'
    },

    'frameform.title.language.settings': {
        'en-US': 'Language settings',
        'fr-FR': 'Paramètre des langues'
    },

    'frameform.title.add': {
        'en-US': 'Add frame',
        'fr-FR': 'Ajouter une frame'
    },

    'frameform.title.edit': {
        'en-US': 'Update frame',
        'fr-FR': 'Mise à jour de la frame'
    },

    'frameform.title.form': {
        'en-US': 'Frame in',
        'fr-FR': 'Frame en'
    },

    'frameform.helper.invalid.url': {
        'en-US': 'URL must be valid and use HTTPS',
        'fr-FR': 'L\'URL doit être valide et utiliser HTTPS'
    },

    'frameform.helper.empty': {
        'en-US': 'Field must be provided',
        'fr-FR': 'Ce champ doit être renseigné'
    },

    'frameform.helper.id': {
        'en-US': 'Your ID must be unique',
        'fr-FR': 'Votre ID doit être unique'
    },

    'frameform.helper.language.selected': {
        'en-US': 'You can select the language to edit and remove the one you don\'t want anymore here. You must fill at least the EN language to be able to save your frame',
        'fr-FR': 'Vous pouvez sélectionner la langue à editer et supprimer celles dont vous n\'avez plus besoin ici. Vous devez renseigner au moins la langue EN pour pouvoir sauvegarder une frame'
    },

    'frameform.grid.language': {
        'en-US': 'Language choice (ISO code)',
        'fr-FR': 'Choix de la langue (code ISO)'
    },

    'frameform.grid.language.selected': {
        'en-US': 'Languages selected',
        'fr-FR': 'Langues sélectionnées'
    },

    'frameform.grid.id': {
        'en-US': 'Unique ID',
        'fr-FR': 'ID unique'
    },

    'frameform.grid.url': {
        'en-US': 'URL',
        'fr-FR': 'URL'
    },

    'frameform.button.lang': {
        'en-US': 'Language',
        'fr-FR': 'Langue'
    },

    'frameform.button.lang.EN': {
        'en-US': 'English',
        'fr-FR': 'Anglais'
    },

    'frameform.button.lang.FR': {
        'en-US': 'French',
        'fr-FR': 'Français'
    },

    'frameform.notification.submit.success': {
        'en-US': 'Successfully saved frame',
        'fr-FR': 'Sauvegarde de la frame réussie'
    },

    'frameform.notification.submit.failed': {
        'en-US': 'Failed to save the new frame. Some inputs are missing',
        'fr-FR': 'Échec de la sauvegarde de la nouvelle frame. Certains champs sont vides'
    },

    'framemanager.data.language': {
        'en-US': 'EN',
        'fr-FR': 'FR'
    },

    'framemanager.text.empty': {
        'en-US': 'No frame to display',
        'fr-FR': 'Aucune frame à afficher'
    },

    'framemanager.header.list': {
        'en-US': 'Frames',
        'fr-FR': 'Frames'
    },

    'framemanager.header.title.nagivate': {
        'en-US': 'Navigate',
        'fr-FR': 'Navigation'
    },

    'framemanager.grid.url': {
        'en-US': 'Url',
        'fr-FR': 'Url'
    },

    'framemanager.button.edit': {
        'en-US': 'Edit frame',
        'fr-FR': 'Éditer la frame'
    },

    'framemanager.button.duplicate': {
        'en-US': 'Duplicate frame',
        'fr-FR': 'Dupliquer la frame'
    },

    'framemanager.button.delete': {
        'en-US': 'Delete frame',
        'fr-FR': 'Supprimer la frame'
    },

    'framemanager.button.preview': {
        'en-US': 'Preview frame',
        'fr-FR': 'Aperçu de la frame'
    },

    'framemanager.button.refresh': {
        'en-US': 'Refresh frames',
        'fr-FR': 'Actualiser les frames'
    },

    'framemanager.button.add': {
        'en-US': 'Add frame',
        'fr-FR': 'Ajouter une frame'
    },

    'framemanager.button.cancel': {
        'en-US': 'Cancel frame edit',
        'fr-FR': 'Annuler l\'édition de la frame'
    },

    'framemanager.button.compress': {
        'en-US': 'Hide details',
        'fr-FR': 'Cacher les détails'
    },

    'framemanager.button.settings': {
        'en-US': 'Layout builder parameter',
        'fr-FR': 'Paramètre de gestion de l\'affichage'
    },

    'framemanager.button.back': {
        'en-US': 'Return to Home pages configuration',
        'fr-FR': 'Retour à la page de configuration des pages d\'accueil'
    },

    'framepreview.data.language': {
        'en-US': 'EN',
        'fr-FR': 'FR'
    },

    'framepreview.helper.invalid.url': {
        'en-US': 'URL must be valid and use HTTPS',
        'fr-FR': 'L\'URL doit être valide et utiliser HTTPS'
    },

    'framepreview.helper.empty': {
        'en-US': 'Field must be provided',
        'fr-FR': 'Ce champ doit être renseigné'
    },

    'framepreview.title.page': {
        'en-US': 'Frame preview',
        'fr-FR': 'Aperçu de la frame'
    },

    'framepreview.title.settings': {
        'en-US': 'Select your language',
        'fr-FR': 'Sélection de la langue'
    },


    'framepreview.button.lang': {
        'en-US': 'Language',
        'fr-FR': 'Langue'
    },

    'framepreview.button.lang.EN': {
        'en-US': 'English',
        'fr-FR': 'Anglais'
    },

    'framepreview.button.lang.FR': {
        'en-US': 'French',
        'fr-FR': 'Français'
    },

    'framesubmitform.label.id': {
        'en-US': 'ID',
        'fr-FR': 'ID'
    },

    'framesubmitform.label.url': {
        'en-US': 'URL',
        'fr-FR': 'URL'
    },

    'framesubmitform.helper.id': {
        'en-US': 'ID must be unique',
        'fr-FR': 'L\'ID doit être unique'
    },

    'framesubmitform.helper.url': {
        'en-US': 'Must be a valid HTTPS URL',
        'fr-FR': 'URL HTTPS valide requise'
    },

    'editdefaultorder.status.empty': {
        'en-US': 'No module selected',
        'fr-FR': 'Aucun module sélectionné'
    },

    'editdefaultorder.col.header.select': {
        'en-US': 'Selected',
        'fr-FR': 'Sélectionné'
    },

    'editdefaultorder.button.save': {
        'en-US': 'Save settings',
        'fr-FR': 'Sauvegarder les paramètres'
    },

    'editdefaultorder.button.backward': {
        'en-US': 'Back to list',
        'fr-FR': 'Retour à la liste'
    },

    'editownhome.header.title': {
        'en-US': 'Home settings',
        'fr-FR': 'Configuration de la page d\'accueil'
    },

    'editownhome.header.layout.title': {
        'en-US': 'Configure layout',
        'fr-FR': 'Configuration de la présentation'
    },

    'editownhome.header.modules.available': {
        'en-US': 'Modules available',
        'fr-FR': 'Modules disponibles'
    },

    'editownhome.header.modules.selected': {
        'en-US': 'Modules selected',
        'fr-FR': 'Modules sélectionnés'
    },

    'editownhome.headercolumn.selected': {
        'en-US': 'Selected',
        'fr-FR': 'Sélectionné'
    },

    'editownhome.headercolumn.type': {
        'en-US': 'Type',
        'fr-FR': 'Type'
    },

    'editownhome.button.configure': {
        'en-US': 'Configure layout',
        'fr-FR': 'Paramétrage de l\'affichage'
    },

    'editownhome.button.default': {
        'en-US': 'Restore default',
        'fr-FR': 'Paramètre par défaut'
    },

    'editownhome.button.select': {
        'en-US': 'Select modules',
        'fr-FR': 'Choix des modules'
    },

    'editownhome.button.back': {
        'en-US': 'Back to Home page',
        'fr-FR': 'Retour à la page d\'accueil'
    },

    'editownhome.selected.empty': {
        'en-US': 'You didn\'t select any modules',
        'fr-FR': 'Vous n\'avez sélectionné aucun module'
    },

    'editownhome.modules.empty': {
        'en-US': 'No modules available in this configuration',
        'fr-FR': 'Aucun module disponible dans cette configuration'
    },

    'home.page.title': {
        'en-US': 'Home page',
        'fr-FR': 'Page d\'accueil'
    },

    'home.header.title.toolbox': {
        'en-US': 'Home pages management',
        'fr-FR': 'Gestion des pages d\'accueil'
    },

    'home.button.navigate.default': {
        'en-US': 'Configure Home pages',
        'fr-FR': 'Configuration des pages d\'accueil'
    },

    'home.button.navigate.own': {
        'en-US': 'Customize this Home page',
        'fr-FR': 'Configurer cette page d\'accueil'
    },

    'home.status.empty': {
        'en-US': 'You don\'t have any modules to display',
        'fr-FR': 'Vous n\'avez aucun module à afficher'
    },

    'home.button.refresh': {
        'en-US': 'Refresh',
        'fr-FR': 'Rafraîchir'
    },

    'home.select.none': {
        'en-US': 'Select your Home page',
        'fr-FR': 'Choisissez votre page d\'accueil'
    },

    'homedefaultsettings.header.available': {
        'en-US': 'Modules available',
        'fr-FR': 'Modules disponibles'
    },

    'homedefaultsettings.header.selected': {
        'en-US': 'Modules selected',
        'fr-FR': 'Modules sélectionnés'
    },

    'homedefaultsettings.header.configuration': {
        'en-US': 'Configured Home pages',
        'fr-FR': 'Pages d\'accueil configurables'
    },

    'homedefaultsettings.headercolumn.selected': {
        'en-US': 'Selected',
        'fr-FR': 'Sélectionné'
    },

    'homedefaultsettings.headercolumn.type': {
        'en-US': 'Type',
        'fr-FR': 'Type'
    },

    'homedefaultsettings.button.edit': {
        'en-US': 'Edit this Home page',
        'fr-FR': 'Modifier cette page d\'accueil'
    },

    'homedefaultsettings.button.duplicate': {
        'en-US': 'Duplicate this Home page',
        'fr-FR': 'Dupliquer cette page d\'accueil'
    },

    'homedefaultsettings.button.delete': {
        'en-US': 'Delete this Home page',
        'fr-FR': 'Supprimer cette page d\'accueil'
    },

    'homedefaultsettings.button.unselectall': {
        'en-US': 'Unselect all',
        'fr-FR': 'Tout désélectionner'
    },

    'homedefaultsettings.button.configurelayout': {
        'en-US': 'Configure layout',
        'fr-FR': 'Personalisation de l\'affichage'
    },

    'homedefaultsettings.button.saveselection': {
        'en-US': 'Save your selection',
        'fr-FR': 'Sauvegarder votre sélection'
    },

    'homedefaultsettings.button.add.default': {
        'en-US': 'Add Home page',
        'fr-FR': 'Ajouter une page d\'accueil'
    },

    'homedefaultsettings.button.back': {
        'en-US': 'Back to Home page',
        'fr-FR': 'Retour à la page d\'accueil'
    },

    'homedefaultsettings.button.framespage': {
        'en-US': 'Frames manager',
        'fr-FR': 'Gestionnaire des Frames'
    },

    'homedefaultsettings.button.clear': {
        'en-US': 'Clear selection',
        'fr-FR': 'Tout désélectionner'
    },

    'homedefaultsettings.button.add': {
        'en-US': 'Add',
        'fr-FR': 'Ajouter'
    },

    'homedefaultsettings.text.empty': {
        'en-US': 'There is no modules available in your current configuration',
        'fr-FR': 'Il n\'y a aucun modules disponibles pour cette configuration'
    },

    'homedefaultsettings.select.defaultvalue': {
        'en-US': 'Select home',
        'fr-FR': 'Choisissez la page d\'accueil'
    },

    'homedefaultsettings.helper.invalid': {
        'en-US': 'Invalid value. Authorized characters : a-z A-Z 0-9 _ : - .',
        'fr-FR': 'Valeur invalide. Caractères autorisés : a-z A-Z 0-9 _ : - .'
    },

    'homedefaultsettings.modal.delete': {
        'en-US': 'Are you sure about deleting this setting ?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer cette configuration ?'
    },

    'homedefaultsettings.notification.create.error.in.use': {
        'en-US': 'The name `{name}`is already in use by another configuration, choose another one please',
        'fr-FR': 'Le nom `{name}` est déjà utilisé pour une autre configuration, veuillez en choisir un autre'
    },

    'notification.app.loaded': {
        'en-US': 'App loaded!',
        'fr-FR': 'App lancée !'
    },

    'notification.invalid.password': {
        'en-US': 'Your password must be 8 to 32 characters long and contains at least 1 upper/lower case letter and 1 number',
        'fr-FR': 'Le mot de passe doit contenir entre 8 et 32 caractères et au moins 1 majuscule/minuscule et 1 chiffre'
    },

    'notification.invalid.email': {
        'en-US': 'Please enter a valid email',
        'fr-FR': 'Merci d\'indiquer une adresse email valide'
    },

    'notification.card.template.full': {
        'en-US': 'This area cannot contain more items',
        'fr-FR': 'Cet zone ne peut pas contenir plus d\'éléments'
    },

    'invalidColorCode': {
        'en-US': 'Color code is invalid',
        'fr-FR': 'Code couleur invalide'
    },

    'notification.mandatory.values': {
        'en-US': 'Mandatory value(s):',
        'fr-FR': 'Valeur(s) obligatoire(s) :'
    },

    'notification.password.updated': {
        'en-US': 'Password updated',
        'fr-FR': 'Mot de passe mis à jour !'
    },

    'notification.details.updated': {
        'en-US': 'Details updated!',
        'fr-FR': 'Détails mis à jour !'
    },

    'notification.settings.updated': {
        'en-US': 'Settings updated!',
        'fr-FR': 'Paramètres mis à jour !'
    },

    'notification.avatar.updated': {
        'en-US': 'Avatar updated!',
        'fr-FR': 'Avatar mis à jour !'
    },

    'notification.user.associated': {
        'en-US': 'User successfully associated!',
        'fr-FR': 'Utilisateur associé avec succès !'
    },

    'notification.user.associate.resend': {
        'en-US': 'Email sent',
        'fr-FR': 'Email envoyé !'
    },

    'notification.user.disassociated': {
        'en-US': 'User disassociated',
        'fr-FR': 'Utilisateur désassocié'
    },

    'notification.message.deleted': {
        'en-US': 'Message(s) deleted',
        'fr-FR': 'Message(s) supprimés'
    },

    'notification.message.reprocessed': {
        'en-US': 'Sent message(s) for reprocessing',
        'fr-FR': 'Message(s) à relancer envoyés'
    },

    'notification.user.already.exists': {
        'en-US': 'The user you want to associate to this instance already exists on the system (and maybe already associated to other instances).',
        'fr-FR': 'L\'utilisateur que vous voulez associer sur cette instance existe déjà sur le système. Il est peut être également déjà associé à d\'autres instances.'
    },

    'notification.unexpected.error': {
        'en-US': 'An unexpected error occured. Please try again.',
        'fr-FR': 'Une erreur est survenue. Merci de réessayer.'
    },

    'notification.registration.unavailable': {
        'en-US': 'Registration is not available.',
        'fr-FR': 'L\’enregistrement n\'est pas disponible.'
    },

    'forgotpassword.panel.title': {
        'en-US': 'Reset password',
        'fr-FR': 'Réinitialiser mot de passe'
    },

    'forgotpassword.button.validate': {
        'en-US': 'OK',
        'fr-FR': 'Valider'
    },

    'forgotpassword.button.signin': {
        'en-US': 'Sign in',
        'fr-FR': 'Se connecter'
    },

    'forgotpassword.message.success': {
        'en-US': 'We\'ve sent you an email. Click the link in the email to reset your password.',
        'fr-FR': 'Nous vous avons envoyé un email. Cliquez sur le lien dans l\'email pour réinitialiser votre mot de passe.'
    },

    'forgotpassword.email.invalid': {
        'en-US': 'Invalid email',
        'fr-FR': 'Email invalide'
    },

    'jobcontrolpanel.close': {
        'en-US': 'Close',
        'fr-FR': 'Fermer'
    },

    'jobcontrolpanel.title': {
        'en-US': 'Running jobs',
        'fr-FR': 'Tâches en cours'
    },

    'jobcontrolpanel.no.data': {
        'en-US': 'No running job',
        'fr-FR': 'Aucune tâche en cours'
    },

    'jobcontrolpanel.job.email': {
        'en-US': 'Triggered by',
        'fr-FR': 'Lancé par'
    },

    'jobcontrolpanel.job.priority': {
        'en-US': 'Priority',
        'fr-FR': 'Priorité'
    },

    'jobcontrolpanel.job.status': {
        'en-US': 'Status',
        'fr-FR': 'Statut'
    },

    'jobcontrolpanel.job.created': {
        'en-US': 'Created',
        'fr-FR': 'Créé le'
    },

    'jobcontrolpanel.job.last.modified': {
        'en-US': 'Last status modification',
        'fr-FR': 'Dernière modification du statut'
    },

    'jobcontrolpanel.job.stacktrace': {
        'en-US': 'Stacktrace',
        'fr-FR': 'Stacktrace'
    },

    'jobcontrolpanel.job.view.last.messages': {
        'en-US': 'View last messages',
        'fr-FR': 'Voir les derniers messages'
    },

    'jobcontrolpanel.job.view.stacktrace': {
        'en-US': 'View stacktrace',
        'fr-FR': 'Voir la stacktrace'
    },

    'jobcontrolpanel.job.priority.high': {
        'en-US': 'High',
        'fr-FR': 'Haute'
    },

    'jobcontrolpanel.job.priority.medium': {
        'en-US': 'Medium',
        'fr-FR': 'Moyenne'
    },

    'jobcontrolpanel.job.priority.low': {
        'en-US': 'Low',
        'fr-FR': 'Basse'
    },

    'jobcontrolpanel.job.priority.very.low': {
        'en-US': 'Very low',
        'fr-FR': 'Très basse'
    },

    'jobcontrolpanel.job.status.complete': {
        'en-US': 'Complete',
        'fr-FR': 'Terminé'
    },

    'jobcontrolpanel.job.status.queued': {
        'en-US': 'Queued',
        'fr-FR': 'En attente'
    },

    'jobcontrolpanel.job.status.inerror': {
        'en-US': 'In error',
        'fr-FR': 'Erreur'
    },

    'jobcontrolpanel.job.status.running': {
        'en-US': 'Running',
        'fr-FR': 'En cours'
    },

    'jobcontrolpanel.job.mark.as.read': {
        'en-US': 'Mark as read',
        'fr-FR': 'Marquer comme lu'
    },

    'jobcontrolpanel.cancel.confirm': {
        'en-US': 'Are you sure you want to cancel this job?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir annuler cette tâche ?'
    },

    'login.email.invalid': {
        'en-US': 'Invalid email',
        'fr-FR': 'Email invalide'
    },

    'login.password': {
        'en-US': 'Password',
        'fr-FR': 'Mot de passe'
    },

    'login.password.invalid': {
        'en-US': 'Please enter your password',
        'fr-FR': 'Merci de saisir votre mot de passe'
    },

    'login.remember.me': {
        'en-US': 'Keep me signed in',
        'fr-FR': 'Garder ma connexion'
    },

    'login.forgot.password': {
        'en-US': 'Forgot password?',
        'fr-FR': 'Mot de passe oublié ?'
    },

    'login.sign.in': {
        'en-US': 'Sign in',
        'fr-FR': 'Se connecter'
    },

    'login.not.registered': {
        'en-US': 'Not already registered?',
        'fr-FR': 'Pas encore enregistré(e) ?'
    },

    'login.invalid.url': {
        'en-US': 'Invalid login URL!',
        'fr-FR': 'URL de login invalide !'
    },

    'login.message.already.registered': {
        'en-US': 'This user is already registered',
        'fr-FR': 'Utilisateur déjà enregistré'
    },

    'login.message.already.registered.test.prod': {
        'en-US': ' on test or production environment',
        'fr-FR': ' sur un des environnements (test ou production)'
    },

    'login.register.env.select': {
        'en-US': 'Select environment',
        'fr-FR': 'Sélectionner environnement'
    },

    'login.register.env.test': {
        'en-US': 'Test',
        'fr-FR': 'Test'
    },

    'login.register.env.prod': {
        'en-US': 'Production',
        'fr-FR': 'Production'
    },

    'login.register.env.test.and.prod': {
        'en-US': 'Test & Production',
        'fr-FR': 'Test & Production'
    },

    'login.register.env.error': {
        'en-US': 'Please select the registration environment',
        'fr-FR': 'Merci de sélectionner sur quel environnement vous souhaitez vous enregistrer'
    },


    'logout.message': {
        'en-US': 'Logging out...',
        'fr-FR': 'Déconnexion...'
    },

    'logout.success': {
        'en-US': 'You have been signed out',
        'fr-FR': 'Vous êtes maintenant déconnecté'
    },

    'logout.button.login': {
        'en-US': 'Go to sign in page',
        'fr-FR': 'Aller à la page de connexion'
    },

    'mainactions.notification.title.caution': {
        'en-US': 'Caution!',
        'fr-FR': 'Attention !'
    },

    'mainactions.notification.endpoints.error': {
        'en-US': 'Could not fetch endpoints for instance',
        'fr-FR': 'Problème lors de la récupération des \'endpoints\' pour l\'instance'
    },

    'mainactions.notification.stale.login.session': {
        'en-US': 'Your login session is expired. Please wait, it will be automatically refreshed in 5 seconds...',
        'fr-FR': 'Votre session de connexion a expiré. Merci de patienter, celle-ci sera automatiquement actualisée dans 5 secondes...'
    },

    'mainactions.notification.wrong.username.password': {
        'en-US': 'Invalid username/password!',
        'fr-FR': 'Email et/ou mot de passe invalide !'
    },

    'mainactions.notification.user.disabled': {
        'en-US': 'This user account is disabled!',
        'fr-FR': 'Ce compte utilisateur est désactivé !'
    },

    'mainactions.notification.membership.expired': {
        'en-US': 'Your company Membership expired on <strong>{expiryDate}</strong>. Please ask your company’s Community administrator<strong>{adminContact}</strong> to renew the Membership.',
        'fr-FR': 'Votre abonnement a expiré le <strong>{expiryDate}</strong>. Merci de contacter votre administrateur<strong>{adminContact}</strong> pour renouveler le service.'
    },

    'mainactions.notification.unsubscribe.failed': {
        'en-US': 'Could not unsubscribe this account from this instance/community.',
        'fr-FR': 'Problème lors de la désassociation de ce compte sur cette instance/communauté.'
    },

    'mainactions.notification.unsubscribe.failed.b2auth': {
        'en-US': ' Impossible unsubscription: there is no subscription on instance (*).',
        'fr-FR': ' Impossible de se désinscrire: il n\'y a pas d\'inscription possible sur l\'instance (*).'
    },

    'mainactions.notification.unsubscribe.failed.instance.not.found': {
        'en-US': ' Could not find selected instance definition. Please reload the page and retry.',
        'fr-FR': ' Impossible de trouver les propriétés de l\'instance sélectionnée. Merci de recharger la page et de réessayer.'
    },

    'mainactions.notification.unsubscribe.failed.no.baseurl': {
        'en-US': ' Invalid baseUrl found for the current instance.',
        'fr-FR': ' URL de l\'instance sélectionnée invalide.'
    },

    'mainactions.notification.unsubscribe.failed.no.user': {
        'en-US': ' User is not associated with this instance.',
        'fr-FR': ' Utilisateur non associé à cette instance.'
    },

    'mainactions.notification.unsubscribe.success': {
        'en-US': 'User successfully unsubscribed from community',
        'fr-FR': 'L\'utilisateur a bien été désassocié de cette instance.'
    },

    'mainactions.empty.scope.string': {
        'en-US': 'You don\'t have access to any instance! Please check your account settings with your administrator.',
        'fr-FR': 'Vous n\'avez aucun droit enregistré. Merci de vérifier le paramétrage de votre compte utilisateur avec votre administrateur.'
    },

    'mainactions.notification.new.version': {
        'en-US': 'The portal needs to be updated to a new version. Please save your current work, the update will be done automatically in 90 seconds...',
        'fr-FR': 'Le portail doit être mis à jour vers un nouvelle version. Merci de sauvegarder vos travaux en cours, la mise à jour se fera automatiquement dans 90 secondes...'
    },

    'mainactions.notification.new.version.btn': {
        'en-US': 'Update now!',
        'fr-FR': 'Mettre à jour maintenant !'
    },

    'nomatch.title': {
        'en-US': 'Resource not found',
        'fr-FR': 'Ressource introuvable'
    },

    'nomatch.message': {
        'en-US': 'The requested resource was not found.',
        'fr-FR': 'La ressource demandée est introuvable.'
    },

    'profile.settings': {
        'en-US': 'Settings',
        'fr-FR': 'Paramètres'
    },

    'profile.other': {
        'en-US': 'Others',
        'fr-FR': 'Autres'
    },

    'profile.development.tools': {
        'en-US': 'Development tools',
        'fr-FR': 'Outils de développement'
    },

    'profile.code.editor': {
        'en-US': 'Code editor configuration',
        'fr-FR': 'Configuration des éditeurs de code'
    },

    'profile.change.password': {
        'en-US': 'Password',
        'fr-FR': 'Mot de passe'
    },

    'profile.new.password': {
        'en-US': 'New password',
        'fr-FR': 'Nouveau mot de passe'
    },

    'profile.confirm.password': {
        'en-US': 'Confirm password',
        'fr-FR': 'Confirmer mot de passe'
    },

    'profile.button.update': {
        'en-US': 'Save changes',
        'fr-FR': 'Enregistrer modifications'
    },

    'profile.button.refresh.permissions': {
        'en-US': `<div>Refresh<br />permissions</div>`,
        'fr-FR': `<div>Rafraîchir<br />permissions</div>`
    },

    'profile.button.cty.unsubscribe': {
        'en-US': `<div>Unsubscribe from<br />this Community</div>`,
        'fr-FR': `<div>Me désinscrire<br />de cette Communauté</div>`
    },

    'profile.button.delete.account': {
        'en-US': `<div>Delete<br />my account</div>`,
        'fr-FR': `<div>Supprimer mon<br />compte utilisateur</div>`
    },

    'profile.button.export.permissions': {
        'en-US': `<div>Export<br />permissions</div>`,
        'fr-FR': `<div>Exporter<br />permissions</div>`
    },

    'profile.messages.autorefresh': {
        'en-US': 'Auto-refresh messages list delay',
        'fr-FR': 'Délai de rafraîchissement de la liste des messages'
    },

    'profile.messages.autorefresh.disabled': {
        'en-US': 'disabled',
        'fr-FR': 'désactivé'
    },

    'profile.messages.preferred.language': {
        'en-US': 'Preferred language',
        'fr-FR': 'Langue préférée'
    },

    'profile.user.delete.confirm': {
        'en-US': `<p>Are you sure you want to delete you account?</p>`,
        'fr-FR': `<p>Êtes-vous sûr(e) de vouloir supprimer votre compte utilisateur ?</p>`
    },

    'profile.user.delete.sure.confirm': {
        'en-US': `
            <p>
                <h3 className="danger-color bottom-margin text-xxlarge">WARNING</h3>
                <span>Are you <strong>REALLY</strong> sure you want to delete you account? You won't be able to access the portal anymore...</span>
            </p>
        `,
        'fr-FR': `
            <p>
                <h3 className="danger-color bottom-margin text-xxlarge">ATTENTION</h3>
                <span>Êtes-vous <strong>VRAIMENT</strong> sûr(e) de vouloir supprimer votre compte utilisateur ? Vous ne pourrez plus accéder au portail...</span>
            </p>
        `
    },

    'profile.user.unsubscribe.confirm': {
        'en-US': 'Are you sure you want to unsubscribe from this community?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer votre compte inscription à cette communauté ?'
    },

    'profile.invalid.password': {
        'en-US': 'Your password must be 8 to 32 characters long and contains at least 1 upper/lower case letter and 1 number',
        'fr-FR': 'Le mot de passe doit contenir entre 8 et 32 caractères et au moins 1 majuscule/minuscule et 1 chiffre'
    },

    'setpassword.panel.title': {
        'en-US': 'Set a new password',
        'fr-FR': 'Créer un nouveau mot de passe'
    },

    'setpassword.password': {
        'en-US': 'Password',
        'fr-FR': 'Mot de passe'
    },

    'setpassword.confirm.password': {
        'en-US': 'Confirm password',
        'fr-FR': 'Confirmer mot de passe'
    },

    'setpassword.button.validate.password': {
        'en-US': 'OK',
        'fr-FR': 'Valider'
    },

    'setpassword.button.signin': {
        'en-US': 'Sign in',
        'fr-FR': 'Se connecter'
    },

    'setpassword.message.success': {
        'en-US': 'Your password has been successfully set.',
        'fr-FR': 'Votre mot de passe a bien été enregistré.'
    },

    'setpassword.invalid.password': {
        'en-US': 'Your password must be 8 to 32 characters long and contains at least 1 upper/lower case letter and 1 number',
        'fr-FR': 'Le mot de passe doit contenir entre 8 et 32 caractères et au moins 1 majuscule/minuscule et 1 chiffre'
    },

    'setpassword.invalid.password.confirm': {
        'en-US': 'Passwords are not identical',
        'fr-FR': 'Les 2 mots de passe ne sont pas identiques'
    },

    'confirm.multiple.delete': {
        'en-US': 'Are you sure you want to delete the selected messages?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer les messages sélectionnés ?'
    },

    'confirm.multiple.reprocess': {
        'en-US': 'Are you sure you want to reprocess the selected messages?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir relancer les messages sélectionnés ?'
    },

    'notification.multiple.reprocess.success': {
        'en-US': 'Messages reprocessed',
        'fr-FR': 'Messages relancés'
    },

    'notification.multiple.reprocess.failure': {
        'en-US': 'message(s) not reprocessed',
        'fr-FR': 'message(s) non relancé(s)'
    },

    'notification.fetchmsg.failure': {
        'en-US': 'Message cannot be loaded',
        'fr-FR': 'Le message ne peut être chargé'
    },

    'notification.multiple.delete.success': {
        'en-US': 'Messages deleted',
        'fr-FR': 'Messages supprimés'
    },

    'notification.multiple.delete.failure': {
        'en-US': 'message(s) not deleted',
        'fr-FR': 'message(s) non supprimés'
    },

    'notification.fetchdoc.failure': {
        'en-US': 'Document cannot be loaded',
        'fr-FR': 'Le document ne peut être chargé'
    },

    'notification.download.message': {
        'en-US': 'The dowload will start automatically',
        'fr-FR': 'Le téléchargement va démarrer automatiquement'
    },

    'confirm.close.submit': {
        'en-US': 'Are you sure you want to close this message submission session?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir terminer cette session de création de message ?'
    },

    'messagesactions.no.views': {
        'en-US': 'You don\'t have access to any view on this page',
        'fr-FR': 'Vous n\'avez accès à aucune vue sur cette page'
    },

    'messageslist.panel.title.layout.builder': {
        'en-US': 'Layout builder',
        'fr-FR': 'Personnaliser l\'affichage'
    },

    'messageslist.panel.pagination.view.by': {
        'en-US': 'View by',
        'fr-FR': 'Afficher par'
    },

    'messageslist.panel.pagination.sort.by': {
        'en-US': 'Sort by',
        'fr-FR': 'Trier par'
    },

    'messageslist.panel.pagination.page': {
        'en-US': 'Page',
        'fr-FR': 'Page'
    },

    'messageslist.panel.pagination.page.of': {
        'en-US': 'of',
        'fr-FR': 'sur'
    },

    'messageslist.panel.actions.export.excel': {
        'en-US': 'Export to Excel',
        'fr-FR': 'Exporter vers Excel'
    },

    'messageslist.no.results': {
        'en-US': 'No results found',
        'fr-FR': 'Aucun résultat'
    },

    'messageslist.button.refresh': {
        'en-US': 'Refresh',
        'fr-FR': 'Rafraîchir'
    },

    'messageslist.button.reprocess': {
        'en-US': 'Reprocess',
        'fr-FR': 'Relancer'
    },

    'messageslist.flags.title': {
        'en-US': 'Flags',
        'fr-FR': 'Marqueurs'
    },

    'messageslist.multiple.reprocess.impossible': {
        'en-US': 'One or more of the selected messages cannot be reprocessed. Please check your selection and retry!',
        'fr-FR': 'Un ou plusieurs des messages sélectionnés ne peuvent pas être relancés. Merci de verifier votre sélection et de réessayer !'
    },

    'messageslist.multiple.delete.impossible': {
        'en-US': 'One or more of the selected messages cannot be deleted. Please check your selection and retry!',
        'fr-FR': 'Un ou plusieurs des messages sélectionnés ne peuvent pas être supprimés. Merci de verifier votre sélection et de réessayer !'
    },

    'messageslist.reset.display.settings': {
        'en-US': 'Reset display settings',
        'fr-FR': 'Revenir aux réglages par défaut'
    },

    'messageslist.display.settings.changed': {
        'en-US': 'Display settings changed!',
        'fr-FR': 'Préférences d\'affichage modifiées !'
    },

    'messageslist.save.display.settings': {
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

    'workflow.work.items': {
        'en-US': 'Work items',
        'fr-FR': 'Tâches'
    },

    'organisations.title': {
        'en-US': 'Organizations',
        'fr-FR': 'Organisations'
    },

    'organisations.tab.structure': {
        'en-US': 'Structure',
        'fr-FR': 'Structure'
    },

    'organisations.tab.users': {
        'en-US': 'Users positions',
        'fr-FR': 'Positions des utilisateurs'
    },

    'organisations.confirm.delete': {
        'en-US': 'Are you sure you want to delete this node?',
        'fr-FR': 'Êtes-vous sûr(e) de vouloir supprimer ce noeud ?'
    },

    'organisations.root.tree.display': {
        'en-US': 'Root tree displayed:',
        'fr-FR': 'Arbre racine affiché :'
    },

    'organisations.confirm.delete.last.position': {
        'en-US': 'This is the only organization position held by this user. If you delete it, you won\'t be able to re-assign this user anywhere in the tree. Are you sure you want to completely remove this user from the organization?',
        'fr-FR': 'Vous êtes sur le point de supprimer la seule position tenue par cet utilisateur dans l\'organisation. Si vous la supprimez, vous ne pourrez plus du tout réassigner cet utilisateur dans l\'arbre. Êtes-vous certain de vouloir supprimer complètement cet utilisateur de l\'organisation ?'
    },

    'reports.title': {
        'en-US': 'Reports',
        'fr-FR': 'Rapports'
    },

    'reports.no.available.reports': {
        'en-US': 'No reports available.',
        'fr-FR': 'Aucun rapport disponible.'
    },

    'reports.select': {
        'en-US': 'Select a report',
        'fr-FR': 'Sélectionner un rapport'
    },

    'reports.print': {
        'en-US': 'Print',
        'fr-FR': 'Imprimer'
    },

    'services.title': {
        'en-US': 'Service',
        'fr-FR': 'Service'
    },

    'services.no.data': {
        'en-US': 'No data',
        'fr-FR': 'Aucune donnée'
    },

    'services.stale.confirm.leave': {
        'en-US': 'There are unsaved changes. Are you sure you want to leave this page and lose your updates?',
        'fr-FR': 'Vous avez effectué des modifications sans les enregistrer. Êtes-vous sûr(e) de vouloir quitter cette page et perdre les données non sauvegardées ?'
    },

    'notification.work.item.processed': {
        'en-US': 'Work item processed!',
        'fr-FR': 'Tâche traitée !'
    },

    'frameactions.notification.upsert.success.message': {
        'en-US': 'Frame has been successfully updated',
        'fr-FR': 'Mise à jour de la frame effectuée'
    },

    // Generic wordings (to be used in services by external devs)
    'view': {
        'en-US': 'View',
        'fr-FR': 'Afficher'
    }
}