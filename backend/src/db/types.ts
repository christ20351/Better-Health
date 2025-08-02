import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Account = {
    id: string;
    userId: string;
    accountId: string;
    providerId: string;
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpiresAt: Timestamp | null;
    refreshTokenExpiresAt: Timestamp | null;
    scope: string | null;
    idToken: string | null;
    password: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type Appointment = {
    id: string;
    patientId: string;
    doctorId: string;
    dateAppointment: Timestamp;
    hourOfBegin: Timestamp;
    hourOfEnd: Timestamp;
};
export type Conversation = {
    id: string;
    patientId: string;
    IA: Generated<string>;
    message: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type Diagnostic = {
    id: string;
    isGivenByIA: Generated<boolean>;
    patientId: string;
    doctorId: string | null;
    symptomId: string;
    diagnostic: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type Doctor = {
    id: string;
    userId: string;
    city: string;
    specialisation: string;
    workspaceId: string;
};
export type messages = {
    id: string;
    conversationId: string;
    patientId: string;
    content: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type Patient = {
    id: string;
    userId: string;
    birthday: Timestamp;
    placeOfBirth: string;
    city: string;
    age: number;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type Session = {
    id: string;
    userId: string;
    token: string;
    expiresAt: Timestamp;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type Specialisation = {
    id: string;
    name: string;
    description: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type Symptom = {
    id: string;
    symptom: string[];
    patientId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type User = {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Generated<boolean>;
    image: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type Verification = {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Timestamp;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type Workspace = {
    id: string;
    name: string;
    description: string | null;
    address: string;
    phone: string;
    adminId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type DB = {
    account: Account;
    appointements: Appointment;
    conversations: Conversation;
    diagnostics: Diagnostic;
    doctors: Doctor;
    messages: messages;
    patients: Patient;
    session: Session;
    specialisations: Specialisation;
    symptoms: Symptom;
    user: User;
    verification: Verification;
    workspace: Workspace;
};
