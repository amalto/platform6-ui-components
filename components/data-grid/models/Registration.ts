export interface MemberStatus {
    communityName?: string;
    memberEmail?: string;
    membershipExpiry?: number;
    membershipStatus?: string;
    success?: boolean;
    message?: string;
    statusValue?: number;
    leadContactEmail?: string;
    leadContactPhone?: string;
    leadContactMobile?: string;
    leadContactSalutation?: string;
    leadContactLastName?: string;
    leadContactFirstName?: string;
}

export interface CtyAttributes {
    communityattribute1?: string;
    communityattribute2?: string;
    communityattribute3?: string;
    communityattribute4?: string;
    communityattribute5?: string;
    communityattribute6?: string;
}

export interface ExContactDetails {
    billingStreet?: string;
    billingCity?: string;
    billingState?: string;
    billingCountry?: string;
    billingZip?: string;
    phone?: string;
    mobile?: string;
    webSite?: string;
    companyName?: string;
}

export interface RegistrationState {
    isCheckingStatus?: boolean;
    registered?: boolean;
    memberStatus?: MemberStatus;
    isCheckingCredentials?: boolean;
    credentialsOk?: boolean;
    isRegistering?: boolean;
    registrationDone?: boolean;
    contactDetails?: ExContactDetails;
    message?: string;
}

export interface RegistrationData {
    salutation?: string;
    firstName?: string;
    lastName?: string;
    title?: string;
    communityAttribute1?: string;
    communityAttribute2?: string;
    communityAttribute3?: string;
    communityAttribute4?: string;
    communityAttribute5?: string;
    communityAttribute6?: string;
    companyName?: string;
    billingStreet?: string;
    billingCity?: string;
    billingState?: string;
    billingCountry?: string;
    billingZip?: string;
    phone?: string;
    mobile?: string;
    webSite?: string;
}